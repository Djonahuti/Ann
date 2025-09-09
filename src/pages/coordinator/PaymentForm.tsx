// src/pages/payment/PaymentForm.tsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { useSupabase } from "@/contexts/SupabaseContext";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// ✅ Define schema for validation based on payment table
const paymentSchema = z.object({
  week: z.string().nonempty("Week is required"), // ISO date string
  coordinator: z.string().nonempty("Coordinator is required"),
  bus: z.number().int().positive(),
  p_week: z.string().nullable(),
  receipt: z.string().nullable(),
  amount: z.coerce.number().int().nonnegative(),
  sender: z.string().nullable(),
  payment_day: z.string().nullable(),
  payment_date: z.string().nonempty("Payment date is required"), // ISO date
  pay_type: z.string().nonempty("Payment type is required"),
  pay_complete: z.boolean().default(false),
  issue: z.string().nullable(),
  inspection: z.boolean().default(false),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

export default function PaymentForm() {
  const { busId } = useParams<{ busId: string }>();
  const { user, role } = useAuth();
  const { supabase } = useSupabase();
  const navigate = useNavigate();

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      week: "",
      coordinator: user?.email ?? "",
      bus: Number(busId),
      p_week: "",
      receipt: "",
      amount: 0,
      sender: "",
      payment_day: "",
      payment_date: "",
      pay_type: "",
      pay_complete: false,
      issue: "",
      inspection: false,
    },
  });

  useEffect(() => {
    if (!user || role !== "coordinator") {
      navigate("/login");
    }
  }, [user, role, navigate]);

  const onSubmit = async (values: PaymentFormValues) => {
    const { error } = await supabase.from("payment").insert([values]);
    if (error) {
      console.error("Payment insert error:", error);
      return;
    }
    navigate(`/payment/${busId}/history`); // back to coordinator profile
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>New Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="week"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Week</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coordinator"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coordinator</FormLabel>
                    <FormControl>
                      <Input type="text" readOnly {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bus ID</FormLabel>
                    <FormControl>
                      <Input type="number" readOnly {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pay_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Cash, Transfer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payment_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Optional fields */}
              <FormField
                control={form.control}
                name="receipt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receipt</FormLabel>
                    <FormControl>
                      <Input placeholder="Receipt No." {...field} value={field.value ?? ""} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sender</FormLabel>
                    <FormControl>
                      <Input placeholder="Sender Name" {...field} value={field.value ?? ""} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payment_day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Day</FormLabel>
                    <FormControl>
                      <Input placeholder="Day of Week" {...field} value={field.value ?? ""} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue</FormLabel>
                    <FormControl>
                      <Input placeholder="Any issue?" {...field} value={field.value ?? ""} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pay_complete"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormLabel>Payment Complete</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inspection"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormLabel>Inspection Done</FormLabel>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit Payment
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
