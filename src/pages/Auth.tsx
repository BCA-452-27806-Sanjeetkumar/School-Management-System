import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { useFormValidation } from '@/hooks/useFormValidation';
import { FormInput } from '@/components/FormInput';
import { validateAuthForm, validateEmail, validatePassword } from '@/lib/validation';

export default function Auth() {
  const { user, loading, signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const { errors, setError, clearErrors } = useFormValidation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setLoginEmail(email);
    // Real-time validation
    const error = validateEmail(email);
    setError('email', error);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setLoginPassword(password);
    // Real-time validation
    const error = validatePassword(password);
    setError('password', error);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateAuthForm(loginEmail, loginPassword);
    if (!validation.isValid) {
      setError('email', validation.errors.find(err => err.field === 'email')?.message || null);
      setError('password', validation.errors.find(err => err.field === 'password')?.message || null);
      return;
    }
    
    clearErrors();
    setIsSubmitting(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setIsSubmitting(false);
    
    if (error) {
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-glow mb-4">
            <BookOpen className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">EduManager</h1>
          <p className="text-muted-foreground mt-1">School Management System</p>
        </div>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <FormInput
                id="login-email"
                label="Email"
                type="email"
                placeholder="admin@school.edu"
                value={loginEmail}
                onChange={handleEmailChange}
                error={errors.email}
                icon={<Mail className="h-4 w-4" />}
                required
              />
              <FormInput
                id="login-password"
                label="Password"
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={handlePasswordChange}
                error={errors.password}
                icon={<Lock className="h-4 w-4" />}
                required
              />
              <Button
                type="submit"
                className="w-full shadow-glow"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
