import { useEffect, useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// ✅ Define schema for validation based on payment table
const paymentSchema = z.object({
  week: z.string().nonempty("Week is required"), // ISO date string
  coordinator: z.enum(["Cleophas", "Emmanuel", "Roland", "Mukaila"], { required_error: "Coordinator is required" }),
  bus: z.number().int().positive(),
  p_week: z.string().nullable(),
  receipt: z.any().refine((file) => file?.length > 0, "Receipt is required"),
  amount: z.coerce.number().int().nonnegative(),
  sender: z.string().nullable(),
  payment_day: z.enum(["MON", "TUE", "WED", "THU", "FRIDAY", "SAT", "SUN"], { required_error: "Day of the Week is required" }),
  payment_date: z.string().nonempty("Payment date is required"), // ISO date
  pay_type: z.enum(["CASH", "ACCOUNT"], { required_error: "Payment type is required" }),
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
  const [busCode, setBusCode] = useState<string>("");  

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      week: "",
      coordinator: undefined,
      bus: Number(busId),
      p_week: "",
      receipt: "",
      amount: 0,
      sender: "",
      payment_day: undefined,
      payment_date: "",
      pay_type: "CASH",
      pay_complete: false,
      issue: "",
      inspection: false,
    },
  });

  useEffect(() => {
    if (!user || role !== "coordinator") {
      navigate("/login");
    }
    // fetch bus_code
    const fetchBusCode = async () => {
      const { data } = await supabase.from("buses").select("bus_code").eq("id", busId).single();
      setBusCode(data?.bus_code || `BUS${busId}`);
      form.setValue("bus", Number(busId)); // still keep the id for DB insert
    };
    fetchBusCode();
  }, [user, role, supabase, busId, navigate]);

  const onSubmit = async (values: PaymentFormValues) => {
    const file = values.receipt?.[0];
    if (!file) {
      alert("Receipt file is required");
      return;
    }

    // ✅ Generate filename
    const ext = file.name.split(".").pop();
    const formattedDate = values.payment_date.split("-").reverse().join(".");
    const newFileName = `${busCode},N${values.amount},${formattedDate},DR Receipt.${ext}`;

    // ✅ Upload to Supabase Storage bucket "receipts"
    const { error: uploadError } = await supabase.storage
      .from("receipts")
      .upload(newFileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return;
    }

    // ✅ Insert payment record (store only filename)
    const { error: insertError } = await supabase.from("payment").insert([
      {
        ...values,
        receipt: newFileName,
      },
    ]);

    if (insertError) {
      console.error("Insert error:", insertError);
      return;
    }

    navigate(`/payment/${busId}/history`);
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Coordinator" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Cleophas">Cleophas</SelectItem>
                        <SelectItem value="Emmanuel">Emmanuel</SelectItem>
                        <SelectItem value="Roland">Roland</SelectItem>
                        <SelectItem value="Mukaila">Mukaila</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Bus Code (read-only) */}
              <FormField
                control={form.control}
                name="bus"
                render={() => (
                  <FormItem>
                    <FormLabel>Bus Code</FormLabel>
                    <FormControl>
                      <Input type="text" value={busCode} readOnly />
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CASH">CASH</SelectItem>
                        <SelectItem value="ACCOUNT">ACCOUNT</SelectItem>
                      </SelectContent>
                    </Select>
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
              {/* Receipt Upload */}
              <FormField
                control={form.control}
                name="receipt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receipt (Image or PDF)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.jpeg,.jpg,.png,.avif"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Day of Week" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MON">MON</SelectItem>
                        <SelectItem value="TUE">TUE</SelectItem>
                        <SelectItem value="WED">WED</SelectItem>
                        <SelectItem value="THU">THU</SelectItem>
                        <SelectItem value="FRI">FRI</SelectItem>
                        <SelectItem value="SAT">SAT</SelectItem>
                        <SelectItem value="SUN">SUN</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
