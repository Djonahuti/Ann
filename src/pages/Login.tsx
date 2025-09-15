import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useEffect as useThemeEffect } from 'react';

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [settings, setSettings] = useState<any>(null); 

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase.from("settings").select("*").single();
      if (!error) setSettings(data);
    };
    fetchSettings();
  }, []);

  // Listen for theme changes
  useThemeEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    updateTheme();
    mq.addEventListener('change', updateTheme);
    // Listen for class changes (ThemeToggle likely toggles 'dark' class)
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      mq.removeEventListener('change', updateTheme);
      observer.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { error, role } = await signIn(email, password)
      if (error) {
        toast(
          <div>
            <strong>Login failed</strong>
            <div>{error.message || "Invalid credentials. Please try again."}</div>
          </div>,
          { className: "destructive" }
        )
        setError(error.message)
        setIsLoading(false)
        return
      }
      toast(
        <div>
          <strong>Login successful</strong>
          <div>Welcome!</div>
        </div>
      )
      if (role === 'driver') navigate('/profile')
      else if (role === 'admin') navigate('/admin')
      else if (role === 'coordinator') navigate('/user')
      else {
        setError('No role assigned to this user')
        setIsLoading(false)
      }
    } catch (err: any) {
      toast(
        <div>
          <strong>Login failed</strong>
          <div>{err?.message || "Unexpected error. Please try again."}</div>
        </div>,
        { className: "destructive" }
      )
      setError(err?.message || 'Unexpected error')
    } finally {
      setIsLoading(false)
    }
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Choose logo based on theme
  const logoKey = theme === 'dark' ? 'logo_blk' : 'logo';
  const logoPath = settings[logoKey] || settings.logo || 'logo.png';
  const logoUrl = logoPath
    ? supabase.storage.from("receipts").getPublicUrl(logoPath).data.publicUrl
    : "/logo/logo.png"; // fallback

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 bg-gradient-to-r dark:from-gray-400 dark:to-red-300">
      <Card className="w-full max-w-md space-y-8 p-4">
        <CardContent>
        <div className="text-center mb-3">
          <div className="mx-auto h-16 w-16 rounded-lg flex items-center justify-center">
            <Link to="/">
             <img src={logoUrl} alt="Annhurst Transport" className="h-10 w-auto" />
            </Link>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
            Login
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Welcome Back
          </p>
        </div>

          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            <Button type="submit" className="w-full text-gray-200" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You Have a Bus, but don't have Login Credentials?{' '}
            <Link to="/contact" className="text-primary hover:underline">
              Contact your coordinator
            </Link>
          </p>
        </CardFooter>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} {settings.bottom_left || "Company"}
        </p>
      </div>        
      </Card>
    </div>
  )
}
