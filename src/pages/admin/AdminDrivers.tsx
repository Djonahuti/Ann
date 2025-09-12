import { useEffect, useState } from "react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

interface Driver {
  id: number;
  name: string | null;
  email: string | null;
  phone: string[] | null;
  address: string[] | null;
  bus_code: string | null;
  plate_no: string | null;
}

const driverSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type DriverFormValues = z.infer<typeof driverSchema>;

export default function AdminDrivers() {
  const { supabase } = useSupabase();
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  const form = useForm<DriverFormValues>({
    resolver: zodResolver(driverSchema),
    defaultValues: { name: "", email: "", phone: "", address: "" },
  });

  useEffect(() => {
    if (!user || role !== "admin") {
      navigate("/login");
      return;
    }
    fetchDrivers();
  }, [user, role, navigate]);

  const fetchDrivers = async () => {
    const { data, error } = await supabase
      .from("driver")
      .select(`
        id, name, email, phone, address,
        buses: buses (bus_code, plate_no)
      `);

    if (error) {
      console.error("Error fetching drivers:", error);
      return;
    }

    const formatted = (data || []).map((d: any) => ({
      id: d.id,
      name: d.name,
      email: d.email,
      phone: d.phone,
      address: d.address,
      bus_code: d.buses?.bus_code || null,
      plate_no: d.buses?.plate_no || null,
    }));

    setDrivers(formatted);
    setLoading(false);
  };

  const handleEdit = (driver: Driver) => {
    setEditingDriver(driver);
    form.reset({
      name: driver.name || "",
      email: driver.email || "",
      phone: driver.phone?.[0] || "",
      address: driver.address?.[0] || "",
    });
  };

  const onSubmit = async (values: DriverFormValues) => {
    if (!editingDriver) return;

    const { error } = await supabase
      .from("driver")
      .update({
        name: values.name,
        email: values.email,
        phone: values.phone ? [values.phone] : null,
        address: values.address ? [values.address] : null,
      })
      .eq("id", editingDriver.id);

    if (error) {
      console.error("Update error:", error);
      return;
    }

    setEditingDriver(null);
    fetchDrivers();
  };

  if (loading) return <p className="p-6">Loading drivers...</p>;

  return (
    <div className="max-w-6xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Drivers & Assigned Buses</CardTitle>
        </CardHeader>
        <CardContent>
          {drivers.length === 0 ? (
            <p>No drivers found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Bus Code</TableHead>
                  <TableHead>Plate No</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>{d.name || "N/A"}</TableCell>
                    <TableCell>{d.email || "N/A"}</TableCell>
                    <TableCell>{d.phone?.join(", ") || "N/A"}</TableCell>
                    <TableCell>{d.bus_code || "Unassigned"}</TableCell>
                    <TableCell>{d.plate_no || "N/A"}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(d)}
                          >
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Driver</DialogTitle>
                          </DialogHeader>
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => setEditingDriver(null)}>
                                  Cancel
                                </Button>
                                <Button type="submit">Save</Button>
                              </div>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
