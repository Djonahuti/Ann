import { useEffect, useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  Home,
  FileText,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Bus,
  Coins,
  Contact,
  Users
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { supabase } from '@/lib/supabase'
import { useEffect as useThemeEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Add Bus', href: '/admin/add-bus', icon: Bus },
  { name: 'Drivers', href: '/admin/drivers', icon: Contact },
  { name: 'View Users', href: '/admin/users', icon: Users },
  { name: 'Payments', href: '/admin/payments', icon: Coins },
  { name: 'Pages', href: '/admin/pages', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, role, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [settings, setSettings] = useState<any>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (!user || role !== 'admin') {
      navigate('/login') // or '/admin/login' if you want separate login
    }
  }, [user, role, navigate])

  const handleSignOut = async () => {
    await signOut()
    navigate('/login') // or '/admin/login'
  }

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/80">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 z-50 w-64">
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <div className="flex items-center space-x-2">
              <Link to="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
                <img src={logoUrl} alt="Annhurst Transport" className="h-10 w-auto" />
              </Link>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-6 px-3">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-red-50 text-primary border border-primary'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white transition-colors'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-600 px-6">
          <div className="flex h-16 items-center">
            <div className="flex items-center space-x-2">
              <Link to="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
                <img src={logoUrl} alt="Annhurst Transport" className="h-10 w-auto" />
              </Link>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                            isActive
                              ? 'bg-red-50 text-primary border border-primary'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white transition-colors'
                          }`}
                        >
                          <item.icon className="h-5 w-5 mr-3" />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                  <li className='mt-auto'><ThemeToggle/></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/90 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>{user?.email}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
