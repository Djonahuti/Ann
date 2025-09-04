import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface Bus {
  id: number;
  bus_code: string | null;
  plate_no: string | null;
  driver_name: string | null;
  // Add other bus details as needed
}

export default function UserProfile() {
  const navigate = useNavigate();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserAndBuses = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/signin'); // Redirect if not logged in
        return;
      }
      setUser(user);

      // Fetch buses where coordinator is the current user
      const { data: busesData, error } = await supabase
        .from('buses')
        .select(`
          id,
          bus_code,
          plate_no,
          driver (
            name
          )
        `)
        .eq('coordinator', user.id);

      if (error) {
        console.error('Error fetching buses:', error);
        setBuses([]);
      } else {
        // Map the data to include driver_name
        const formattedBuses = busesData.map((bus: any) => ({
          id: bus.id,
          bus_code: bus.bus_code,
          plate_no: bus.plate_no,
          driver_name: bus.driver?.name || 'N/A',
        }));
        setBuses(formattedBuses);
      }
      setLoading(false);
    };

    fetchUserAndBuses();
  }, [navigate]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <Skeleton className="h-8 w-1/3 mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6">Coordinator Profile</h2>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Welcome, {user?.user_metadata?.name || user?.email}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Role: User (Coordinator)</p>
          {/* Add more user details if needed */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Buses Under Your Coordination</CardTitle>
        </CardHeader>
        <CardContent>
          {buses.length === 0 ? (
            <p>No buses assigned to you.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bus Code</TableHead>
                  <TableHead>Plate Number</TableHead>
                  <TableHead>Driver Name</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buses.map((bus) => (
                  <TableRow key={bus.id}>
                    <TableCell>{bus.bus_code || 'N/A'}</TableCell>
                    <TableCell>{bus.plate_no || 'N/A'}</TableCell>
                    <TableCell>{bus.driver_name}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/payment/${bus.id}`)}>
                        Make Payment
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}