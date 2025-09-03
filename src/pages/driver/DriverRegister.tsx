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
  nin: z.string().min(11, 'NIN is required'),
  phones: z.array(z.string().min(11, 'Phone number must be at least 7 characters')).min(1, 'At least one phone number is required'),
  addresses: z.array(z.string().min(4, 'Address must be at least 4 characters')).min(1, 'At least one address is required'),
});

type DriverRegisterForm = z.infer<typeof schema>;

export default function DriverRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [phoneInputs, setPhoneInputs] = useState(['']);
  const [addressInputs, setAddressInputs] = useState(['']);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DriverRegisterForm>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      phones: [''],
      addresses: [''],
    }
  });

  const addPhoneInput = () => {
    setPhoneInputs([...phoneInputs, '']);
    setValue('phones', [...phoneInputs, '']);
  };

  const removePhoneInput = (index: number) => {
    const newPhones = phoneInputs.filter((_, i) => i !== index);
    setPhoneInputs(newPhones);
    setValue('phones', newPhones);
  };

  const updatePhoneInput = (index: number, value: string) => {
    const newPhones = [...phoneInputs];
    newPhones[index] = value;
    setPhoneInputs(newPhones);
    setValue('phones', newPhones);
  };

  const addAddressInput = () => {
    setAddressInputs([...addressInputs, '']);
    setValue('addresses', [...addressInputs, '']);
  };

  const removeAddressInput = (index: number) => {
    const newAddresses = addressInputs.filter((_, i) => i !== index);
    setAddressInputs(newAddresses);
    setValue('addresses', newAddresses);
  };

  const updateAddressInput = (index: number, value: string) => {
    const newAddresses = [...addressInputs];
    newAddresses[index] = value;
    setAddressInputs(newAddresses);
    setValue('addresses', newAddresses);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // 1. Create auth user
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: { name: data.name } },
      });
      if (signUpError) throw signUpError;
      if (!user) throw new Error("User not created");

      // 2. Insert into driver table
      const { error: driverError } = await supabase.from('driver').insert({
        email: data.email,
        password: data.password,
        name: data.name,
        dob: data.dob,
        nin: data.nin,
        phone: data.phones,
        address: data.addresses,
        kyc: false,
      });
      if (driverError) throw driverError;

      // 3. Insert into users table with role 'driver'
      const { error: userError } = await supabase.from('users').insert({
        email: data.email,
        name: data.name,
        avatar: null,
        role: 'driver',
      });
      if (userError) throw userError;

      setLoading(false);
      navigate('/profile');
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
          <Label>Phone Numbers</Label>
          {phoneInputs.map((phone, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                id={`phone-${index}`}
                value={phone}
                onChange={(e) => updatePhoneInput(index, e.target.value)}
                placeholder={`Phone number ${index + 1}`}
              />
              {phoneInputs.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removePhoneInput(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addPhoneInput} className="mt-2">
            Add Phone Number
          </Button>
          {errors.phones?.message && typeof errors.phones.message === 'string' && (
            <p className="text-red-500 text-sm">{errors.phones.message}</p>
          )}
          {errors.phones?.[0]?.message && (
            <p className="text-red-500 text-sm">{errors.phones[0].message}</p>
          )}
        </div>
        <div>
          <Label>Addresses</Label>
          {addressInputs.map((address, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                id={`address-${index}`}
                value={address}
                onChange={(e) => updateAddressInput(index, e.target.value)}
                placeholder={`Address ${index + 1}`}
              />
              {addressInputs.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeAddressInput(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addAddressInput} className="mt-2">
            Add Address
          </Button>
          {errors.addresses?.message && typeof errors.addresses.message === 'string' && (
            <p className="text-red-500 text-sm">{errors.addresses.message}</p>
          )}
          {errors.addresses?.[0]?.message && (
            <p className="text-red-500 text-sm">{errors.addresses[0].message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </div>
  );
}