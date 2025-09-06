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

interface Bus {
  id: number;
  bus_code: string | null;
  plate_no: string | null;
  contract_date: string | null;
  start_date: string | null;
  date_collected: string | null;
  agreed_date: string | null;
  t_income: string | null;
  initial_owe: string | null;
  coordinator_name: string | null;
}

// Utility function to format number as Naira currency
const formatAsNaira = (value: string | null): string => {
  if (!value || isNaN(Number(value))) return '₦0';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(Number(value));
};

// Utility function to calculate amount left
const calculateAmountLeft = (initialOwe: string | null, tIncome: string | null): string => {
  const initial = Number(initialOwe) || 0;
  const income = Number(tIncome) || 0;
  return formatAsNaira((initial - income).toString());
};

export default function DriverProfile() {
  const [user, setUser] = useState<Driver | null>(null);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [busLoading, setBusLoading] = useState(true);
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
        // Fetch bus details for this driver
        const { data: busData, error: busError } = await supabase
          .from('buses')
          .select(`
            id,
            bus_code,
            plate_no,
            contract_date,
            start_date,
            date_collected,
            agreed_date,
            t_income,
            initial_owe,
            coordinator:coordinators!buses_coordinator_fkey(name)
          `)
          .eq('driver', driver.id);
        if (busError) {
          alert('Failed to fetch bus data');
        } else {
          // Map the data to include coordinator_name
          const formattedBuses = busData.map((bus: any) => ({
            id: bus.id,
            bus_code: bus.bus_code,
            plate_no: bus.plate_no,
            contract_date: bus.contract_date,
            start_date: bus.start_date,
            date_collected: bus.date_collected,
            agreed_date: bus.agreed_date,
            t_income: bus.t_income,
            initial_owe: bus.initial_owe,
            coordinator_name: bus.coordinator && bus.coordinator.name ? bus.coordinator.name : 'N/A'
          }));
          setBuses(formattedBuses);
        }
        setBusLoading(false);
      }
      setLoading(false);  
    };

    fetchUser();
  }, [navigate]);

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
        <div>
          <h3 className="text-xl font-semibold mt-6 mb-2">Bus Details</h3>
          {busLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            </div>
          ) : buses.length === 0 ? (
            <p className="text-gray-500">No buses assigned to this driver.</p>
          ) : (
            buses.map((bus) => (
              <div key={bus.id} className="border-t pt-2 mt-2">
                <div>
                  <span className="font-semibold">Bus Code:</span> {bus.bus_code || 'N/A'}
                </div>
                <div>
                  <span className="font-semibold">Plate Number:</span> {bus.plate_no || 'N/A'}
                </div>
                <div>
                  <span className="font-semibold">Coordinator:</span> {bus.coordinator_name}
                </div>
                <div>
                  <span className="font-semibold">Contract Date:</span> {bus.contract_date || 'N/A'}
                </div>
                <div>
                  <span className="font-semibold">Agreed Completion Date:</span> {bus.agreed_date || 'N/A'}
                </div>
                <div>
                  <span className="font-semibold">Start Date:</span> {bus.start_date || 'N/A'}
                </div>
                <div>
                  <span className="font-semibold">Date Collected:</span> {bus.date_collected || 'N/A'}
                </div>
                <div>
                  <span className="font-semibold">Bus Price:</span> {formatAsNaira(bus.initial_owe)}
                </div>
                <div>
                  <span className="font-semibold">Amount Paid:</span> {formatAsNaira(bus.t_income)}
                </div>
                <div>
                  <span className="font-semibold">Amount Left:</span> {calculateAmountLeft(bus.initial_owe, bus.t_income)}
                </div>
              </div>
            ))
          )}
        </div>        
      </div>
      <Button className="mt-8 w-full" onClick={handleLogout}>Logout</Button>
    </div>
  );
}
