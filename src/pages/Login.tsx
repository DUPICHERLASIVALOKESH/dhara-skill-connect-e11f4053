
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, signInWithGoogle } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // We'll use Google authentication here as it's available in AuthContext
      await signInWithGoogle();
      toast({ 
        title: "Login successful", 
        description: "Welcome back to DHARA Consultants"
      });
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If user is already logged in, redirect to home page
  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            placeholder="Enter your email"
                            className="pl-10"
                            {...field}
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            type={isPasswordVisible ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="pl-10"
                            {...field}
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1.5 h-8 w-8 p-0"
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                          >
                            {isPasswordVisible ? (
                              <EyeOff className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <Eye className="h-5 w-5 text-muted-foreground" />
                            )}
                            <span className="sr-only">
                              {isPasswordVisible ? 'Hide password' : 'Show password'}
                            </span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-dhara-blue hover:bg-dhara-blue/90" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </Form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={signInWithGoogle}
              disabled={isLoading}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="h-5 w-5 mr-2" />
              Sign in with Google
            </Button>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-dhara-blue hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </>
  );
};

export default Login;
