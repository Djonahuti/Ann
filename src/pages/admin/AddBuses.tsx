import { useEffect, useState } from 'react'
import { useSupabase } from '@/contexts/SupabaseContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function AddBusPage() {
  const { supabase } = useSupabase()

  const [drivers, setDrivers] = useState<any[]>([])
  const [coordinators, setCoordinators] = useState<any[]>([])

  const [busCode, setBusCode] = useState('')
  const [plateNo, setPlateNo] = useState('')
  const [driverId, setDriverId] = useState('')
  const [coordinatorId, setCoordinatorId] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data: driverData } = await supabase.from('driver').select('id, name, email')
      const { data: coordinatorData } = await supabase.from('coordinators').select('id, name, email')

      if (driverData) setDrivers(driverData)
      if (coordinatorData) setCoordinators(coordinatorData)
    }
    fetchData()
  }, [supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('buses').insert([
      {
        bus_code: busCode,
        plate_no: plateNo,
        driver: driverId,
        coordinator: coordinatorId,
      }
    ])

    setLoading(false)

    if (error) {
      toast('Error adding bus', { description: error.message, className: 'destructive' })
    } else {
      toast(
        <div className='text-sm'>
            <strong>Bus added successfully</strong>
        </div>
      )
      setBusCode('')
      setPlateNo('')
      setDriverId('')
      setCoordinatorId('')
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Bus</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Bus Code</Label>
            <Input value={busCode} onChange={(e) => setBusCode(e.target.value)} required />
          </div>
          <div>
            <Label>Plate Number</Label>
            <Input value={plateNo} onChange={(e) => setPlateNo(e.target.value)} required />
          </div>
          <div>
            <Label>Assign Driver</Label>
            <select
              className="w-full border rounded p-2"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              required
            >
              <option value="">Select driver</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.email})
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Assign Coordinator</Label>
            <select
              className="w-full border rounded p-2"
              value={coordinatorId}
              onChange={(e) => setCoordinatorId(e.target.value)}
              required
            >
              <option value="">Select coordinator</option>
              {coordinators.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.email})
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Adding...' : 'Add Bus'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
