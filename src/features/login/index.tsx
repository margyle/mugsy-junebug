import QRCode from 'qrcode';
import { useRef, useEffect, useState } from 'react';
import { useSearch } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, Loader2, Lightbulb } from 'lucide-react';
import { authClient, useSession } from '@/lib/auth-client';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

// Form validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const search = useSearch({ strict: false }) as { mobile?: string };
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { data: session, isPending: isSessionLoading } = useSession();

  // Check if mobile parameter is true to hide QR code
  const isMobile = search?.mobile === 'true';

  // Redirect if already logged in
  useEffect(() => {
    if (session?.user) {
      console.log('User already logged in:', session.user);
      navigate({ to: '/recipes' }); // Redirect to recipes page for now
    }
  }, [session, navigate]);

  // Updated login URL
  const loginUrl = 'http://192.168.1.15:5173/login';

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: true,
    },
  });

  // Handle login submission
  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const { data: authData, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: '/recipes', // Redirect to recipes page after login
        rememberMe: data.rememberMe ?? true, // Using httpOnly cookies for security
      });

      if (error) {
        console.error('Login error:', error);
        const errorMessage = error.message || 'Login failed. Please try again.';
        setAuthError(errorMessage);
        toast.error(errorMessage);
        return;
      }

      if (authData) {
        console.log('Login successful! User data:', authData);
        toast.success('Login successful! Redirecting...');
        // Better Auth will handle the redirect automatically with callbackURL
      }
    } catch (err) {
      console.error('Unexpected error during login:', err);
      const errorMessage = 'An unexpected error occurred. Please try again.';
      setAuthError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loginUrl && canvasRef.current && !isMobile) {
      QRCode.toCanvas(canvasRef.current, loginUrl, {
        width: 250,
        margin: 2,
        color: {
          dark: '#CB6441',
          light: '#FBF8F1',
        },
      });
    }
  }, [loginUrl, isMobile]);

  // Show loading state while checking session
  if (isSessionLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card className="shadow-lg rounded-lg p-4">
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>Checking authentication...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-lg rounded-lg p-4">
        <CardContent>
          <div className="flex gap-8 items-start">
            {/* QR Code Section */}
            {!isMobile && (
              <>
                <div className="flex flex-col items-center space-y-4 flex-shrink-0 shadow-lg">
                  <canvas ref={canvasRef} className="border rounded" />
                </div>

                {/* Vertical Separator */}
                <Separator orientation="vertical" className="h-64" />
              </>
            )}

            {/* Form Section */}
            <div className="flex-1 space-y-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Global Error Message */}
                {authError && (
                  <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    <AlertCircle className="w-4 h-4" />
                    <span>{authError}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register('email')}
                    disabled={isLoading}
                  />
                  {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...register('password')}
                    disabled={isLoading}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="rememberMe" {...register('rememberMe')} disabled={isLoading} />
                  <Label htmlFor="rememberMe" className="text-sm">
                    Remember me for 30 days
                  </Label>
                </div>

                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <Separator orientation="horizontal" className="h-64" />
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-3">
                <Lightbulb className="w-4 h-4" />
                <span>Scan the QR code to login on your mobile device</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
