import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  dob: z.string().min(4, 'Date of birth is required'),
  nin: z.string().min(8, 'NIN is required'),
  phone: z.string().min(7, 'Phone is required'),
  address: z.string().min(4, 'Address is required'),
});

export default function DriverRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Insert into driver table
      const { error: driverError } = await supabase.from('driver').insert({
        email: data.email,
        password: data.password,
        name: data.name,
        dob: data.dob,
        nin: data.nin,
        phone: [data.phone],
        address: [data.address],
        kyc: false,
      });
      if (driverError) throw driverError;

      // Insert into users table with role 'driver'
      const { error: userError } = await supabase.from('users').insert({
        email: data.email,
        name: data.name,
        avatar: null,
        role: 'driver',
      });
      if (userError) throw userError;

      setLoading(false);
      navigate('/driver/profile');
    } catch (e: any) {
      setLoading(false);
      alert(e.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6">Driver Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...register('name')} />
          {errors.name?.message && typeof errors.name.message === 'string' && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email?.message && typeof errors.email.message === 'string' && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register('password')} />
          {errors.password?.message && typeof errors.password.message === 'string' && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" type="date" {...register('dob')} />
          {errors.dob?.message && typeof errors.dob.message === 'string' && (
            <p className="text-red-500 text-sm">{errors.dob.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="nin">NIN</Label>
          <Input id="nin" {...register('nin')} />
          {errors.nin?.message && typeof errors.nin.message === 'string' && (
            <p className="text-red-500 text-sm">{errors.nin.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register('phone')} />
          {errors.phone?.message && typeof errors.phone.message === 'string' && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input id="address" {...register('address')} />
          {errors.address?.message && typeof errors.address.message === 'string' && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </div>
  );
}
