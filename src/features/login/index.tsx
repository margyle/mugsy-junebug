import QRCode from 'qrcode';
import { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, Loader2 } from 'lucide-react';
import { authClient, useSession } from '@/lib/auth-client';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { loginSchema, type LoginForm } from './login.types';

type LoginParams = {
  isMobile?: boolean;
};

export const Login = ({ isMobile }: LoginParams) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { data: session, isPending: isSessionLoading } = useSession();

  useEffect(() => {
    if (session?.user) {
      navigate({ to: '/' });
    }
  }, [session, navigate]);

  const qrCodeUrl = import.meta.env.VITE_LOGIN_QR_CODE_URL;

  // Login form setup
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
        callbackURL: '/',
        rememberMe: data.rememberMe ?? true,
      });

      if (error) {
        const errorMessage = error.message || 'Login failed. Please try again.';
        setAuthError(errorMessage);
        toast.error(errorMessage);
        return;
      }

      if (authData) {
        toast.success('Login successful! Redirecting...');
      }
    } catch (err) {
      // TODO: Replace with proper logging
      // logger.error('Login failed', { error: err, email: data.email });
      void err; // TODO: Remove this once we have proper logging
      const errorMessage = 'An unexpected error occurred. Please try again.';
      setAuthError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const canvasCallbackRef = (canvas: HTMLCanvasElement | null) => {
    if (canvas && isMobile !== true && qrCodeUrl) {
      canvasRef.current = canvas; // Still keep the ref for other uses
      QRCode.toCanvas(canvas, qrCodeUrl, {
        width: 250,
        margin: 2,
        color: {
          dark: '#CB6441',
          light: '#FBF8F1',
        },
      })
        .then(() => {
          console.log('QR code generated successfully');
        })
        .catch((error) => {
          console.error('Error generating QR code:', error);
        });
    }
  };

  // Show loading state while checking session
  if (isSessionLoading) {
    return (
      <div className={isMobile ? 'w-full' : 'w-full max-w-4xl mx-auto'}>
        <Card className={isMobile ? '' : 'shadow-lg rounded-lg p-4'}>
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>Checking authentication...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {isMobile ? (
        // Mobile Layout - Full width form only (no card)
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
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
        </div>
      ) : (
        // Desktop Layout - Card with QR code + form
        <div className="w-full max-w-4xl mx-auto">
          <Card className="shadow-lg rounded-lg p-4">
            <CardContent>
              <div className="flex gap-8 items-start">
                <div className="flex flex-col items-center space-y-4 flex-shrink-0 shadow-lg">
                  <canvas ref={canvasCallbackRef} className="border rounded" />
                </div>

                <Separator orientation="vertical" className="h-64" />

                <div className="flex-1 space-y-4">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                      {errors.email && (
                        <p className="text-sm text-red-600">{errors.email.message}</p>
                      )}
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
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
