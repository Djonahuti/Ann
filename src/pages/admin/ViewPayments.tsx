import { useEffect, useState } from 'react'
import { useSupabase } from '@/contexts/SupabaseContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

interface Payment {
  id: number
  amount: number | null
  pay_type: string | null
  pay_complete: string | null   // ✅ text now
  bus: { bus_code: string | null, plate_no: string | null, e_payment: number | null } | null
  coordinator: string | null
  created_at: string
}

export default function ViewPayments() {
  const { supabase } = useSupabase()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPayments = async () => {
      const { data, error } = await supabase
        .from('payment')
        .select(`
          id,
          amount,
          pay_type,
          pay_complete,
          created_at,
          coordinator,
          bus:buses(bus_code, plate_no, e_payment)
        `)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setPayments(
          data.map((p: any) => ({
            ...p,
            bus: Array.isArray(p.bus) ? p.bus[0] ?? null : p.bus
          }))
        )
      }
      setLoading(false)
    }

    fetchPayments()
  }, [supabase])

  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle>Payments</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-64 w-full" />
        ) : payments.length === 0 ? (
          <p>No payments found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Bus</TableHead>
                <TableHead>Coordinator</TableHead>
                <TableHead>Expected Amount</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell>{p.bus?.bus_code} ({p.bus?.plate_no})</TableCell>
                  <TableCell>{p.coordinator || 'N/A'}</TableCell>

                  {/* ✅ Editable Expected Payment */}
                  <TableCell>
                    <input
                      type="number"
                      defaultValue={p.bus?.e_payment || 0}
                      onBlur={async (e) => {
                        const value = Number(e.target.value);
                        await supabase
                          .from("buses")
                          .update({ e_payment: value })
                          .eq("bus_code", p.bus?.bus_code);
                      }}
                      className="border rounded px-2 py-1 w-24"
                    />
                  </TableCell>

                  <TableCell>₦{p.amount?.toLocaleString() || 0}</TableCell>
                  <TableCell>{p.pay_type || 'N/A'}</TableCell>

                  {/* ✅ Editable Pay Status */}
                  <TableCell>
                    <select
                      defaultValue={p.pay_complete || 'Pending'}
                      onChange={async (e) => {
                        const status = e.target.value
                        await supabase
                          .from('payment')
                          .update({ pay_complete: status })
                          .eq('id', p.id)
                      }}
                      className="border rounded px-2 py-1"
                    >
                      <option value="YES">YES</option>
                      <option value="INCOMPLETE">INCOMPLETE</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </TableCell>

                  <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
