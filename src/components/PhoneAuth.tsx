import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Phone, Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PhoneAuthProps {
  onSuccess: () => void;
}

export const PhoneAuth: React.FC<PhoneAuthProps> = ({ onSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('farmer');
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      toast({
        title: 'Error',
        description: 'Please enter your phone number',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      // Format phone number for India (+91)
      const formattedPhone = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
      
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (error) throw error;

      setIsOtpSent(true);
      toast({
        title: 'OTP Sent',
        description: 'Please check your phone for the verification code',
        variant: 'default'
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send OTP',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast({
        title: 'Error',
        description: 'Please enter the OTP',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      const formattedPhone = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
      
      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms'
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Phone verified successfully!',
        variant: 'default'
      });
      
      onSuccess();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to verify OTP',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: fullName,
              role: role
            }
          }
        });

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Account created! Please check your email to verify.',
          variant: 'default'
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Signed in successfully!',
          variant: 'default'
        });
        
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Authentication failed',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <Card className="shadow-elegant">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg text-center py-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center p-3">
                <img 
                  src="/kalnadai-logo.png" 
                  alt="Kalnadai Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-black">Kalnadai AMR Portal</CardTitle>
            <CardDescription className="text-black text-lg">
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="email" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <div className="flex justify-center mb-4">
                  <Button
                    variant="ghost"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                  </Button>
                </div>

                {isSignUp && (
                  <>
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-input bg-background rounded-md"
                      >
                        <option value="farmer">Farmer</option>
                        <option value="veterinarian">Veterinarian</option>
                        <option value="government">Government Official</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Button 
                  onClick={handleEmailAuth} 
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                </Button>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4">
                {!isOtpSent ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your 10-digit phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        We'll send you an OTP to verify your number
                      </p>
                    </div>
                    <Button 
                      onClick={handleSendOtp} 
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {loading ? 'Sending...' : 'Send OTP'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="mt-1"
                        maxLength={6}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        OTP sent to {phoneNumber}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsOtpSent(false)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button 
                        onClick={handleVerifyOtp} 
                        disabled={loading}
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};