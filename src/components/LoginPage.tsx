import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Globe, Languages, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoginPageProps {
  language: 'english' | 'tamil';
  setLanguage: (lang: 'english' | 'tamil') => void;
}

const translations = {
  english: {
    title: 'Kalnadai Portal',
    subtitle: 'Digital Livestock Antimicrobial Monitoring System',
    loginTab: 'Login',
    signupTab: 'Sign Up',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    role: 'Role',
    district: 'District',
    farmName: 'Farm Name',
    licenseNumber: 'License Number',
    department: 'Department',
    phone: 'Phone Number',
    loginButton: 'Login',
    signupButton: 'Sign Up',
    farmer: 'Farmer',
    veterinarian: 'Veterinarian',
    government: 'Government Official',
    language: 'Language',
    selectRole: 'Select your role',
    selectDistrict: 'Select district',
    loginSuccess: 'Login successful!',
    signupSuccess: 'Account created successfully!',
    loginError: 'Login failed. Please check your credentials.',
    signupError: 'Sign up failed. Please try again.'
  },
  tamil: {
    title: 'கல்நடை போர்ட்டல்',
    subtitle: 'டிஜிட்டல் கால்நடை ஆன்டிபயாடிக் கண்காணிப்பு அமைப்பு',
    loginTab: 'உள்நுழைவு',
    signupTab: 'பதிவு செய்க',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    fullName: 'முழு பெயர்',
    role: 'பதவி',
    district: 'மாவட்டம்',
    farmName: 'பண்ணையின் பெயர்',
    licenseNumber: 'உரிம எண்',
    department: 'துறை',
    phone: 'தொலைபேசி எண்',
    loginButton: 'உள்நுழைய',
    signupButton: 'பதிவு செய்க',
    farmer: 'விவசாயி',
    veterinarian: 'கால்நடை மருத்துவர்',
    government: 'அரசு அதிகாரி',
    language: 'மொழி',
    selectRole: 'உங்கள் பதவியைத் தேர்ந்தெடுக்கவும்',
    selectDistrict: 'மாவட்டத்தைத் தேர்ந்தெடுக்கவும்',
    loginSuccess: 'வெற்றிகரமாக உள்நுழைந்துள்ளீர்கள்!',
    signupSuccess: 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!',
    loginError: 'உள்நுழைவு தோல்வி. உங்கள் விவரங்களைச் சரிபார்க்கவும்.',
    signupError: 'பதிவு தோல்வி. மீண்டும் முயற்சிக்கவும்.'
  }
};

const districts = [
  'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 
  'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Karur', 'Krishnagiri', 
  'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur',
  'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi',
  'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur',
  'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'
];

export const LoginPage: React.FC<LoginPageProps> = ({ language, setLanguage }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    full_name: '',
    role: '' as '' | 'farmer' | 'veterinarian' | 'government',
    district: '',
    phone: '',
    farm_name: '',
    license_number: '',
    department: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const t = translations[language];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(loginData.email, loginData.password);
    
    if (error) {
      toast({
        title: t.loginError,
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: t.loginSuccess,
        variant: 'default'
      });
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupData.role) {
      toast({
        title: t.signupError,
        description: "Please select a role",
        variant: 'destructive'
      });
      return;
    }
    
    setLoading(true);
    
    const { error } = await signUp(signupData.email, signupData.password, {
      full_name: signupData.full_name,
      role: signupData.role as 'farmer' | 'veterinarian' | 'government',
      district: signupData.district,
      phone: signupData.phone,
      farm_name: signupData.farm_name,
      license_number: signupData.license_number,
      department: signupData.department,
      preferred_language: language
    });
    
    if (error) {
      toast({
        title: t.signupError,
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: t.signupSuccess,
        variant: 'default'
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-start mb-4">
          <Button variant="ghost" asChild size="sm">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="gradient-primary w-16 h-16 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🌾</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.title}</h1>
          <p className="text-muted-foreground text-sm">{t.subtitle}</p>
          
          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'english' ? 'tamil' : 'english')}
              className="gap-2"
            >
              <Languages className="h-4 w-4" />
              {language === 'english' ? 'தமிழ்' : 'English'}
            </Button>
          </div>
        </div>

        <Card className="shadow-elegant">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t.loginTab}</TabsTrigger>
              <TabsTrigger value="signup">{t.signupTab}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <CardHeader>
                <CardTitle>{t.loginTab}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">{t.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">{t.password}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Loading...' : t.loginButton}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>{t.signupTab}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-email">{t.email}</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">{t.password}</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="full-name">{t.fullName}</Label>
                    <Input
                      id="full-name"
                      value={signupData.full_name}
                      onChange={(e) => setSignupData({...signupData, full_name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label>{t.role}</Label>
                    <Select 
                      value={signupData.role || ''} 
                      onValueChange={(value: 'farmer' | 'veterinarian' | 'government') => setSignupData({...signupData, role: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectRole} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="farmer">{t.farmer}</SelectItem>
                        <SelectItem value="veterinarian">{t.veterinarian}</SelectItem>
                        <SelectItem value="government">{t.government}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{t.district}</Label>
                    <Select value={signupData.district} onValueChange={(value) => setSignupData({...signupData, district: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectDistrict} />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map(district => (
                          <SelectItem key={district} value={district}>{district}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {signupData.role === 'farmer' && (
                    <div>
                      <Label>{t.farmName}</Label>
                      <Input
                        value={signupData.farm_name}
                        onChange={(e) => setSignupData({...signupData, farm_name: e.target.value})}
                      />
                    </div>
                  )}
                  
                  {signupData.role === 'veterinarian' && (
                    <div>
                      <Label>{t.licenseNumber}</Label>
                      <Input
                        value={signupData.license_number}
                        onChange={(e) => setSignupData({...signupData, license_number: e.target.value})}
                      />
                    </div>
                  )}
                  
                  {signupData.role === 'government' && (
                    <div>
                      <Label>{t.department}</Label>
                      <Input
                        value={signupData.department}
                        onChange={(e) => setSignupData({...signupData, department: e.target.value})}
                      />
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Loading...' : t.signupButton}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};