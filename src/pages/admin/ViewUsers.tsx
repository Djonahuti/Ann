import { useEffect, useState } from "react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function ViewUsers() {
  const { supabase } = useSupabase();
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState<any[]>([]);
  const [coordinators, setCoordinators] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || role !== "admin") {
      navigate("/login");
      return;
    }
    fetchAllUsers();
  }, [user, role, navigate, supabase]);

  const fetchAllUsers = async () => {
    setLoading(true);
    const { data: driverData } = await supabase.from("driver").select("id, name, email, phone, address, kyc");
    const { data: coordinatorData } = await supabase.from("coordinators").select("id, name, email, phone");
    const { data: adminData } = await supabase.from("admins").select("id, name, email, role");
    setDrivers(driverData || []);
    setCoordinators(coordinatorData || []);
    setAdmins(adminData || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <Accordion type="multiple" defaultValue={["drivers", "coordinators", "admins"]}>
        <AccordionItem value="drivers">
          <AccordionTrigger className="text-2xl">Drivers</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>KYC</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell>{d.name}</TableCell>
                    <TableCell>{d.email}</TableCell>
                    <TableCell>{Array.isArray(d.phone) ? d.phone.join(", ") : d.phone}</TableCell>
                    <TableCell>{Array.isArray(d.address) ? d.address.join(", ") : d.address}</TableCell>
                    <TableCell>{d.kyc ? "Verified" : "Not Verified"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="coordinators">
          <AccordionTrigger className="text-2xl">Coordinators</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coordinators.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{Array.isArray(c.phone) ? c.phone.join(", ") : c.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="admins">
          <AccordionTrigger className="text-2xl">Admins</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>{a.name}</TableCell>
                    <TableCell>{a.email}</TableCell>
                    <TableCell>{a.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
