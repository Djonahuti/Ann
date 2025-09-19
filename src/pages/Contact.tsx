import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSupabase } from "@/contexts/SupabaseContext";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface ContactProps {
  coordinatorId?: number | null;
  driverId?: number | null;
  onSuccess?: () => void;
}

interface Subject {
  id: number;
  subject: string;
}

export default function Contact({ coordinatorId, driverId, onSuccess }: ContactProps) {
  const { user, role } = useAuth();
  const { supabase } = useSupabase();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Load subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      const { data, error } = await supabase.from("subject").select("*");
      if (!error && data) setSubjects(data as Subject[]);
    };
    fetchSubjects();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !message.trim()) {
      alert("Please select subject and enter message.");
      return;
    }

    setLoading(true);

    const payload: any = {
      subject: selectedSubject,
      message,
    };

    if (role === "driver") {
      payload.driver = await getDriverId();
      payload.coordinator = coordinatorId;
    } else if (role === "coordinator") {
      payload.coordinator = await getCoordinatorId();
      payload.driver = driverId;
    }

    const { error } = await supabase.from("contact").insert(payload);

    setLoading(false);

    if (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message.");
    } else {
      alert("Message sent!");
      setMessage("");
      setSelectedSubject(null);
      if (onSuccess) onSuccess();
    }
  };

  const getDriverId = async () => {
    if (!user) return null;
    const { data } = await supabase
      .from("driver")
      .select("id")
      .eq("email", user.email)
      .single();
    return data?.id || null;
  };

  const getCoordinatorId = async () => {
    if (!user) return null;
    const { data } = await supabase
      .from("coordinators")
      .select("id")
      .eq("email", user.email)
      .single();
    return data?.id || null;
  };

  return (
    <Card className="w-full max-w-md space-y-8 p-4">
    <CardContent>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="block text-sm font-medium mb-1">Subject</Label>
        <Select onValueChange={(val) => setSelectedSubject(Number(val))}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subj) => (
              <SelectItem
               key={subj.id} 
               value={String(subj.id)}
               className="data-[state=checked]:bg-primary data-[state=checked]:text-gray-200 data-[highlighted]:bg-primary-light data-[highlighted]:text-gray-200"
              >
                {subj.subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="block text-sm font-medium mb-1">Message</Label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          rows={4}
        />
      </div>

      <Button type="submit" disabled={loading} className="text-gray-200">
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
    </CardContent>
    </Card>
  );
}
