import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Dummy user data, replace with actual API/user context
const user = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '',
  dob: '1990-01-01',
  nin: '12345678',
  phone: ['08012345678'],
  address: ['123 Business District, Victoria Island, Lagos'],
  kyc: true,
  role: 'driver',
};

export default function DriverProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    // If not logged in, redirect to login
    // Replace with actual auth check
    if (!user) {
      navigate('/driver/login');
    }
  }, [navigate]);

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
          <span className="font-semibold">Role:</span> {user.role}
        </div>
      </div>
      <Button className="mt-8 w-full" onClick={() => navigate('/driver/login')}>Logout</Button>
    </div>
  );
}
