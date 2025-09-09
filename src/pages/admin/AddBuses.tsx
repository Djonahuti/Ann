import { useEffect, useState } from 'react'
import { useSupabase } from '@/contexts/SupabaseContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

export default function AddBusPage() {
  const { supabase } = useSupabase()

  const [drivers, setDrivers] = useState<any[]>([])
  const [coordinators, setCoordinators] = useState<any[]>([])

  // form state
  const [busCode, setBusCode] = useState('')
  const [plateNo, setPlateNo] = useState('')
  const [driverId, setDriverId] = useState('')
  const [coordinatorId, setCoordinatorId] = useState('')
  const [letterIssued, setLetterIssued] = useState<boolean | null>(null)
  const [expectedPayment, setExpectedPayment] = useState('')
  const [contractDate, setContractDate] = useState('')
  const [agreedDate, setAgreedDate] = useState('')
  const [dateCollected, setDateCollected] = useState('')
  const [startDate, setStartDate] = useState('')
  const [firstPay, setFirstPay] = useState('')
  const [initialOwe, setInitialOwe] = useState('')
  const [deposited, setDeposited] = useState('')
  const [tIncome, setTIncome] = useState('')
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
        letter: letterIssued,
        e_payment: expectedPayment ? Number(expectedPayment) : null,
        contract_date: contractDate || null,
        agreed_date: agreedDate || null,
        date_collected: dateCollected || null,
        start_date: startDate || null,
        first_pay: firstPay || null,
        initial_owe: initialOwe ? Number(initialOwe) : null,
        deposited: deposited ? Number(deposited) : null,
        t_income: tIncome ? Number(tIncome) : null,
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
      // reset form
      setBusCode('')
      setPlateNo('')
      setDriverId('')
      setCoordinatorId('')
      setLetterIssued(null)
      setExpectedPayment('')
      setContractDate('')
      setAgreedDate('')
      setDateCollected('')
      setStartDate('')
      setFirstPay('')
      setInitialOwe('')
      setDeposited('')
      setTIncome('')
    }
  }

  return (
    <Card className="max-w-3xl mx-auto">
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

          <div>
            <Label>Letter Issued</Label>
            <Select onValueChange={(val) => setLetterIssued(val === 'true')} value={letterIssued?.toString() || ''}>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Expected Payment</Label>
            <Input type="number" value={expectedPayment} onChange={(e) => setExpectedPayment(e.target.value)} />
          </div>
          <div>
            <Label>Contract Date</Label>
            <Input type="date" value={contractDate} onChange={(e) => setContractDate(e.target.value)} />
          </div>
          <div>
            <Label>Agreed Completion Date</Label>
            <Input type="date" value={agreedDate} onChange={(e) => setAgreedDate(e.target.value)} />
          </div>
          <div>
            <Label>Date Collected</Label>
            <Input type="date" value={dateCollected} onChange={(e) => setDateCollected(e.target.value)} />
          </div>
          <div>
            <Label>Start Date</Label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <Label>First Payment Date</Label>
            <Input type="date" value={firstPay} onChange={(e) => setFirstPay(e.target.value)} />
          </div>
          <div>
            <Label>Initial Amount Owed</Label>
            <Input type="number" value={initialOwe} onChange={(e) => setInitialOwe(e.target.value)} />
          </div>
          <div>
            <Label>Deposited</Label>
            <Input type="number" value={deposited} onChange={(e) => setDeposited(e.target.value)} />
          </div>
          <div>
            <Label>Total Income</Label>
            <Input type="number" value={tIncome} onChange={(e) => setTIncome(e.target.value)} />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Adding...' : 'Add Bus'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
