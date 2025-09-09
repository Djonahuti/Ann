import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabase } from '@/contexts/SupabaseContext';

interface Bus {
  id: number;
  bus_code: string | null;
  plate_no: string | null;
  driver_name: string | null;
}

export default function UserProfile() {
  const navigate = useNavigate()
  const { user, role, signOut } = useAuth()
  const { supabase } = useSupabase()

  const [buses, setBuses] = useState<Bus[]>([])
  const [loading, setLoading] = useState(true)
  const [coordinator, setCoordinator] = useState<any>(null)

  useEffect(() => {
    const fetchCoordinatorAndBuses = async () => {
      if (!user || role !== 'coordinator') {
        navigate('/login')
        return
      }

      // Find coordinator record by email
      const { data: coData, error: coError } = await supabase
        .from('coordinators')
        .select('*')
        .eq('email', user.email)
        .single()

      if (coError || !coData) {
        console.error('Coordinator not found:', coError)
        navigate('/login')
        return
      }
      setCoordinator(coData)

      // Fetch buses related to this coordinator
      const { data: busesData, error: busError } = await supabase
        .from('buses')
        .select(`
          id,
          bus_code,
          plate_no,
          driver:driver(name)
        `)
        .eq('coordinator', coData.id)

      if (busError) {
        console.error('Error fetching buses:', busError)
        setBuses([])
      } else {
        const formattedBuses = busesData.map((bus: any) => ({
          id: bus.id,
          bus_code: bus.bus_code,
          plate_no: bus.plate_no,
          driver_name: bus.driver?.name || 'N/A',
        }))
        setBuses(formattedBuses)
      }

      setLoading(false)
    }

    fetchCoordinatorAndBuses()
  }, [user, role, supabase, navigate])

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

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
          <CardTitle>
            Welcome, {coordinator?.name || user?.email}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Role: Coordinator</p>
          <p>Email: {coordinator?.email}</p>
          {coordinator?.phone && <p>Phone: {coordinator.phone.join(', ')}</p>}
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/payment/${bus.id}`)}
                      >
                        Make Payment
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}