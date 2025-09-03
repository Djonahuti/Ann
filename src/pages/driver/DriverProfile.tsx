import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

interface Driver {
  name: string;
  email: string;
  avatar: string;
  dob: string;
  nin: string;
  phone: string[];
  address: string[];
  kyc: boolean;
}

export default function DriverProfile() {
  const [user, setUser] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {data: { user } } = await supabase.auth.getUser();
      if (!user) return navigate('/login');
      const { data: driver, error } = await supabase
        .from('driver')
        .select('*')
        .eq('email', user.email)
        .single();
      if (error || !driver) {
        alert('Failed to fetch driver data');
        return navigate('/login');
      } else {
        setUser(driver as Driver);
      }
      setLoading(false);  
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6">Driver Profile</h2>
      <div className="space-y-4">
        <div>
          <span className="font-semibold">Name:</span> {user.name}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        <div>
          <span className="font-semibold">Date of Birth:</span> {user.dob}
        </div>
        <div>
          <span className="font-semibold">NIN:</span> {user.nin}
        </div>
        <div>
          <span className="font-semibold">Phone:</span> {user.phone.join(', ')}
        </div>
        <div>
          <span className="font-semibold">Address:</span> {user.address.join(', ')}
        </div>
        <div>
          <span className="font-semibold">KYC:</span> {user.kyc ? 'Verified' : 'Not Verified'}
        </div>
      </div>
      <Button className="mt-8 w-full" onClick={handleLogout}>Logout</Button>
    </div>
  );
}
