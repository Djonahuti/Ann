import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useSupabase } from "@/contexts/SupabaseContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface Driver {
  id: number
  name: string
  email: string
  avatar: string
  dob: string
  nin: string
  phone: string[]
  address: string[]
  kyc: boolean
}

interface Bus {
  id: number
  bus_code: string | null
  plate_no: string | null
  contract_date: string | null
  start_date: string | null
  date_collected: string | null
  agreed_date: string | null
  t_income: string | null
  initial_owe: string | null
  coordinator_name: string | null
}

// Format number as Naira
const formatAsNaira = (value: string | null): string => {
  if (!value || isNaN(Number(value))) return '₦0'
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(Number(value))
}

// Calculate amount left
const calculateAmountLeft = (initialOwe: string | null, tIncome: string | null): string => {
  const initial = Number(initialOwe) || 0
  const income = Number(tIncome) || 0
  return formatAsNaira((initial - income).toString())
}

export default function TestPage() {
  const { user, role, signOut } = useAuth()
  const { supabase } = useSupabase()
  const navigate = useNavigate()

  const [driver, setDriver] = useState<Driver | null>(null)
  const [buses, setBuses] = useState<Bus[]>([])
  const [loading, setLoading] = useState(true)
  const [busLoading, setBusLoading] = useState(true)

  useEffect(() => {
    const fetchDriver = async () => {
      if (!user || role !== 'driver') {
        return navigate('/login')
      }

      // Fetch driver info
      const { data: driverData, error } = await supabase
        .from('driver')
        .select('*')
        .eq('email', user.email)
        .single()

      if (error || !driverData) {
        alert('Failed to fetch driver data')
        return navigate('/login')
      }

      setDriver(driverData as Driver)

      // Fetch buses assigned to driver
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
        .eq('driver', driverData.id)

      if (busError) {
        alert('Failed to fetch bus data')
      } else {
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
          coordinator_name: bus.coordinator?.name || 'N/A'
        }))
        setBuses(formattedBuses)
      }

      setBusLoading(false)
      setLoading(false)
    }

    fetchDriver()
  }, [user, role, supabase, navigate])

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!driver) return null

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <div>
          <h2>{driver.name}</h2>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Higher Purchase Plan</CardTitle>
          </CardHeader>
          <CardContent>
           {busLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            </div>
           ) : buses.length === 0 ? (
            <p className="text-gray-500">No buses assigned to this driver.</p>
           ) : (
            buses.map((bus) => (
              <div key={bus.id} className="border-t pt-2 mt-2">
                <div><span className="font-semibold">Bus Code:</span> {bus.bus_code || 'N/A'}</div>
                <div><span className="font-semibold">Plate Number:</span> {bus.plate_no || 'N/A'}</div>
                <div><span className="font-semibold">Coordinator:</span> {bus.coordinator_name}</div>
                <div><span className="font-semibold">Contract Date:</span> {bus.contract_date || 'N/A'}</div>
                <div><span className="font-semibold">Agreed Completion Date:</span> {bus.agreed_date || 'N/A'}</div>
                <div><span className="font-semibold">Start Date:</span> {bus.start_date || 'N/A'}</div>
                <div><span className="font-semibold">Date Collected:</span> {bus.date_collected || 'N/A'}</div>
                <div><span className="font-semibold">Bus Price:</span> {formatAsNaira(bus.initial_owe)}</div>
                <div><span className="font-semibold">Amount Paid:</span> {formatAsNaira(bus.t_income)}</div>
                <div><span className="font-semibold">Amount Left:</span> {calculateAmountLeft(bus.initial_owe, bus.t_income)}</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/payment/${bus.id}/history`)}
                >
                  View Payments
                </Button>
              </div>
        ))
           )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div><span className="font-semibold">Name:</span> {driver.name}</div>
            <div><span className="font-semibold">Email:</span> {driver.email}</div>
            <div><span className="font-semibold">Date of Birth:</span> {driver.dob}</div>
            <div><span className="font-semibold">NIN:</span> {driver.nin}</div>
            <div><span className="font-semibold">Phone:</span> {driver.phone.join(', ')}</div>
            <div><span className="font-semibold">Address:</span> {driver.address.join(', ')}</div>
            <div><span className="font-semibold">KYC:</span> {driver.kyc ? 'Verified' : 'Not Verified'}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Relax! You currently do not have Upcoming Payments</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Set Repeat Transfers</button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <select className="w-full mb-2">
              <option>Current And Savings</option>
            </select>
            <p>4481075992</p>
            <p>16 Sep 2025 REF: B05ZTM25Z5901U NGN 50.00 Dr</p>
            <p>15 Sep 2025 REF: B05Cdj252580097 VAT NIP TRANSFER IFO 322000155 Send Transport REF: ENG7815862028 Ref.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded">
              <span className="i-tabler-arrow-right mr-2" /> Transfer to saved Beneficiary
            </button>
            <button className="w-full flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded">
              <span className="i-tabler-phone mr-2" /> Buy Airtime
            </button>
            <button className="w-full flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded">
              <span className="i-tabler-heart mr-2" /> Favorites
            </button>
            <button className="w-full flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded">
              <span className="i-tabler-transfer mr-2" /> Transfer to saved Beneficiary
            </button>
            <button className="w-full flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded">
              <span className="i-tabler-receipt mr-2" /> Pay Bills
            </button>
            <button className="w-full flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded">
              <span className="i-tabler-data mr-2" /> Buy Data
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};