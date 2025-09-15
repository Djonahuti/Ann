import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import ThemeToggle from './ThemeToggle'
import { useEffect as useThemeEffect } from 'react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation();
  const [settings, setSettings] = useState<any>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

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
    <header className="shadow-sm border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
            <img src={logoUrl} alt="Annhurst Transport" className="h-10 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-semibold leading-6 ${
                location.pathname === item.href
                  ? 'text-primary dark:text-primary-light'
                  : 'text-gray-900 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/contact">
            <Button variant="ghost" size="sm" className="border-2 flex-1 border-primary dark:border-primary-light text-primary dark:text-primary-light hover:bg-primary-dark dark:hover:bg-primary-light hover:text-gray-200 dark:hover:text-gray-100">
              Get Started
            </Button>
          </Link>
          <span className='ml-5'><ThemeToggle /></span>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/90">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
                <img src="/logo/ann.png" alt="Annhurst Transport" className="h-10 w-auto" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                        location.pathname === item.href
                          ? 'text-primary dark:text-primary-light bg-gray-50'
                          : 'text-gray-900 dark:text-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className='mt-auto'><ThemeToggle /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 