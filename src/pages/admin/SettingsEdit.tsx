import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function SettingsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({});

  const BUCKET = "receipts"; // 👈 replace with your Supabase bucket name

  useEffect(() => {
    if (id) fetchSettings();
  }, [id]);

  const fetchSettings = async () => {
    const { data, error } = await supabase.from("settings").select("*").eq("id", id).single();
    if (error) toast.error("Error fetching settings");
    else setFormData(data);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (field: string, file: File) => {
    try {
      // delete old file if exists
      if (formData[field]) {
        const { error: delErr } = await supabase.storage.from(BUCKET).remove([formData[field]]);
        if (delErr) {
          console.warn("Could not delete old file:", delErr.message);
        }
      }

      // upload new file
      const filePath = `settings/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

      if (uploadError) {
        toast.error("Error uploading file");
        return;
      }

      handleChange(field, filePath);
      toast.success(`${field === "logo" ? "Logo" : "Logo Black"} updated`);
    } catch (err) {
      console.error("File upload error:", err);
      toast.error("Unexpected error during file upload");
    }
  };

  const handleSave = async () => {
    const { error } = await supabase.from("settings").update(formData).eq("id", id);
    if (error) toast.error("Error updating settings");
    else {
      toast.success("Settings updated successfully");
      navigate("/admin/settings");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">Edit Settings</h1>

      <div className="space-y-4">
        <Textarea
          placeholder="Address"
          value={formData.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
        />
        <Input
          placeholder="Phone (comma separated)"
          value={formData.phone?.join(", ") || ""}
          onChange={(e) => handleChange("phone", e.target.value.split(","))}
        />
        <Input
          placeholder="Email (comma separated)"
          value={formData.email?.join(", ") || ""}
          onChange={(e) => handleChange("email", e.target.value.split(","))}
        />
        <Textarea
          placeholder="Footer Write"
          value={formData.footer_write || ""}
          onChange={(e) => handleChange("footer_write", e.target.value)}
        />
        <Input
          placeholder="Footer Head"
          value={formData.footer_head || ""}
          onChange={(e) => handleChange("footer_head", e.target.value)}
        />
        <Input
          placeholder="Footer Head 2"
          value={formData.footer_head2 || ""}
          onChange={(e) => handleChange("footer_head2", e.target.value)}
        />
        <Input
          placeholder="Services (comma separated)"
          value={formData.services?.join(", ") || ""}
          onChange={(e) => handleChange("services", e.target.value.split(","))}
        />
        <Textarea
          placeholder="Bottom Left"
          value={formData.bottom_left || ""}
          onChange={(e) => handleChange("bottom_left", e.target.value)}
        />
        <Input
          placeholder="Bottom Right (comma separated)"
          value={formData.bottom_right?.join(", ") || ""}
          onChange={(e) => handleChange("bottom_right", e.target.value.split(","))}
        />

        {/* Logo Upload */}
        <div>
          <label className="block font-medium">Logo</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFileUpload("logo", e.target.files[0])}
          />
          {formData.logo && (
            <img
              src={supabase.storage.from(BUCKET).getPublicUrl(formData.logo).data.publicUrl}
              alt="Logo"
              className="h-16 mt-2"
            />
          )}
        </div>

        {/* Logo Black Upload */}
        <div>
          <label className="block font-medium">Logo (Black)</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFileUpload("logo_blk", e.target.files[0])}
          />
          {formData.logo_blk && (
            <img
              src={supabase.storage.from(BUCKET).getPublicUrl(formData.logo_blk).data.publicUrl}
              alt="Logo Black"
              className="h-16 mt-2"
            />
          )}
        </div>
      </div>

      <div className="flex space-x-4 pt-6">
        <Button variant="outline" onClick={() => navigate("/admin/settings")}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}
