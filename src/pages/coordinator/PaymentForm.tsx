import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const schema = z.object({
  week: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' }),
  p_week: z.string().min(1, 'Payment week is required'),
  receipt: z.string().min(1, 'Receipt is required'),
  amount: z.number().positive('Amount must be positive'),
  sender: z.string().min(1, 'Sender is required'),
  payment_day: z.string().min(1, 'Payment day is required'),
  payment_date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' }),
  pay_type: z.string().min(1, 'Payment type is required'),
  pay_complete: z.boolean(),
  issue: z.string().optional(),
  inspection: z.boolean(),
});

export default function PaymentForm() {
  const { busId } = useParams<{ busId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [busCode, setBusCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    const fetchBus = async () => {
      try {
        // Fetch authenticated user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          console.error('Auth error:', authError?.message);
          navigate('/signin');
          return;
        }
        console.log('Authenticated user:', user.id, user.email);

        if (!busId) {
          console.error('No busId provided');
          setError('Invalid bus ID');
          navigate('/user');
          return;
        }

        // Fetch bus details
        const { data: busData, error: busError } = await supabase
          .from('buses')
          .select('bus_code, coordinator')
          .eq('id', busId)
          .single();

        if (busError || !busData) {
          console.error('Bus fetch error:', busError?.message);
          setError('Bus not found');
          navigate('/user');
          return;
        }

        // Verify coordinator
        if (busData.coordinator !== user.id) {
          console.error('User is not the coordinator for bus:', busId);
          setError('You are not authorized to make payments for this bus');
          navigate('/user');
          return;
        }

        setBusCode(busData.bus_code);
      } catch (err: any) {
        console.error('Unexpected error:', err.message);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBus();
  }, [busId, navigate]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('User not authenticated');
      }

      const paymentData = {
        week: new Date(data.week),
        coordinator: user.email || user.user_metadata?.name || 'Unknown',
        user_id: user.id,
        bus: parseInt(busId || '0', 10),
        p_week: data.p_week,
        receipt: data.receipt,
        amount: data.amount,
        sender: data.sender,
        payment_day: data.payment_day,
        payment_date: new Date(data.payment_date),
        pay_type: data.pay_type,
        pay_complete: data.pay_complete,
        issue: data.issue || null,
        inspection: data.inspection,
      };

      const { error } = await supabase.from('payment').insert([paymentData]);
      if (error) {
        console.error('Payment insert error:', error.message);
        throw error;
      }

      alert('Payment submitted successfully');
      navigate('/user');
    } catch (e: any) {
      console.error('Submission error:', e.message);
      setError(e.message || 'Payment submission failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="max-w-md mx-auto py-12">Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error}</p>
            <Button onClick={() => navigate('/user')} className="mt-4">
              Back to Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!busCode) {
    return <div className="max-w-md mx-auto py-12">Loading bus details...</div>;
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Payment Form for Bus {busCode}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="week">Week (Date)</Label>
              <Input id="week" type="date" {...register('week')} />
              {errors.week?.message && typeof errors.week.message === 'string' && (
                <p className="text-red-500 text-sm">{errors.week.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="p_week">Payment Week</Label>
              <Input id="p_week" {...register('p_week')} />
              {errors.p_week?.message && typeof errors.p_week.message === 'string' && (
                <p className="text-red-500 text-sm">{errors.p_week.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="receipt">Receipt</Label>
              <Input id="receipt" {...register('receipt')} />
              {errors.receipt?.message && typeof errors.receipt.message === 'string' && (
                <p className="text-red-500 text-sm">{errors.receipt.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" {...register('amount', { valueAsNumber: true })} />
              {errors.amount?.message && typeof errors.amount.message === 'string' && (
                <p className="text-red-500 text-sm">{errors.amount.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="sender">Sender</Label>
              <Input id="sender" {...register('sender')} />
              {errors.sender?.message && typeof errors.sender.message === 'string' && (
                <p className="text-red-500 text-sm">{errors.sender.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="payment_day">Payment Day</Label>
              <Input id="payment_day" {...register('payment_day')} />
              {errors.payment_day?.message && typeof errors.payment_day.message === 'string' && (
                <p className="text-red-500 text-sm">{errors.payment_day.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="payment_date">Payment Date</Label>
              <Input id="payment_date" type="date" {...register('payment_date')} />
              {errors.payment_date?.message && typeof errors.payment_date.message === 'string' && (
                <p className="text-red-500 text-sm">{errors.payment_date.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="pay_type">Payment Type</Label>
              <Select onValueChange={(value) => setValue('pay_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                </SelectContent>
              </Select>
              {errors.pay_type?.message && typeof errors.pay_type.message === 'string' && (
                <p className="text-red-500 text-sm">{errors.pay_type.message}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="pay_complete" {...register('pay_complete')} />
              <Label htmlFor="pay_complete">Payment Complete</Label>
            </div>
            <div>
              <Label htmlFor="issue">Issue (Optional)</Label>
              <Input id="issue" {...register('issue')} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="inspection" {...register('inspection')} />
              <Label htmlFor="inspection">Inspection</Label>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Payment'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}