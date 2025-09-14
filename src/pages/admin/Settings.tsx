import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Settings() {
  const [settings, setSettings] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase.from("settings").select("*").single();
    if (error) {
      toast.error("Error fetching settings");
    } else {
      setSettings(data);
    }
  };

  if (!settings) return <p className="p-8">Loading settings...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings.logo && (
            <div>
              <p className="font-medium">Logo</p>
              <img src={supabase.storage.from("receipts").getPublicUrl(settings.logo).data.publicUrl} alt="Logo" className="h-16" />
            </div>
          )}
          {settings.logo_blk && (
            <div>
              <p className="font-medium">Logo (Black)</p>
              <img src={supabase.storage.from("receipts").getPublicUrl(settings.logo_blk).data.publicUrl} alt="Logo Black" className="h-16" />
            </div>
          )}
          <p><strong>Address:</strong> {settings.address}</p>
          <p><strong>Phone:</strong> {settings.phone?.join(", ")}</p>
          <p><strong>Email:</strong> {settings.email?.join(", ")}</p>
          <p><strong>Footer Write:</strong> {settings.footer_write}</p>
          <p><strong>Footer Head:</strong> {settings.footer_head}</p>
          <p><strong>Footer Head 2:</strong> {settings.footer_head2}</p>
          <p><strong>Services:</strong> {settings.services?.join(", ")}</p>
          <p><strong>Bottom Left:</strong> {settings.bottom_left}</p>
          <p><strong>Bottom Right:</strong> {settings.bottom_right?.join(", ")}</p>
        </CardContent>
      </Card>

      <Button onClick={() => navigate("/admin/settings/edit/1")}>Edit Settings</Button>
    </div>
  );
}
