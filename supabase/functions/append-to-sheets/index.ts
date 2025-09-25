import { serve } from "https://deno.land/std@0.208.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GoogleSheetsCredentials {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

// Function to get Google Sheets access token
async function getAccessToken(credentials: GoogleSheetsCredentials): Promise<string> {
  const scope = "https://www.googleapis.com/auth/spreadsheets"
  
  const header = {
    alg: "RS256",
    typ: "JWT",
  }
  
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: credentials.client_email,
    scope: scope,
    aud: credentials.token_uri,
    exp: now + 3600,
    iat: now,
  }
  
  const encoder = new TextEncoder()
  const headerB64 = btoa(JSON.stringify(header)).replace(/[+/]/g, (m) => ({ '+': '-', '/': '_' }[m as '+' | '/']!)).replace(/=/g, '')
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/[+/]/g, (m) => ({ '+': '-', '/': '_' }[m as '+' | '/']!)).replace(/=/g, '')
  
  const unsignedToken = `${headerB64}.${payloadB64}`
  
  // Import the private key
  const privateKey = credentials.private_key.replace(/\\n/g, '\n')
  const key = await crypto.subtle.importKey(
    'pkcs8',
    encoder.encode(privateKey),
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  )
  
  // Sign the token
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    encoder.encode(unsignedToken)
  )
  
  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/[+/]/g, (m) => ({ '+': '-', '/': '_' }[m as '+' | '/']!))
    .replace(/=/g, '')
  
  const jwt = `${unsignedToken}.${signatureB64}`
  
  // Exchange JWT for access token
  const tokenResponse = await fetch(credentials.token_uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })
  
  const tokenData = await tokenResponse.json()
  return tokenData.access_token
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { sheetName, data } = await req.json()
    
    console.log('Appending to sheet:', sheetName, 'with data:', data)
    
    // Get the Google service account credentials
    const credentialsJson = Deno.env.get('GOOGLE_SERVICE_ACCOUNT')
    if (!credentialsJson) {
      throw new Error('Google service account credentials not found')
    }
    
    const credentials: GoogleSheetsCredentials = JSON.parse(credentialsJson)
    
    // Get the spreadsheet ID
    const spreadsheetId = Deno.env.get('GOOGLE_SHEETS_SPREADSHEET_ID')
    if (!spreadsheetId) {
      throw new Error('Google Sheets Spreadsheet ID not found')
    }

    // Get access token
    const accessToken = await getAccessToken(credentials)
    
    // Prepare the values array
    const values = [Object.values(data)]
    
    // Append to Google Sheets
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`
    
    const response = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: values,
      }),
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Sheets API error:', errorText)
      throw new Error(`Google Sheets API error: ${response.status} - ${errorText}`)
    }
    
    const result = await response.json()
    console.log('Successfully appended to Google Sheets:', result)
    
    return new Response(
      JSON.stringify({ success: true, result }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'An unknown error occurred' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})