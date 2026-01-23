import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

interface UserSettings {
  notifications: boolean;
  darkMode: boolean;
}

const Settings = () => {
  const { token: authToken } = useAuth();
  const token = authToken || localStorage.getItem("token");

  const [settings, setSettings] = useState<UserSettings>({
    notifications: false,
    darkMode: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* -------------------- Load Settings -------------------- */
  useEffect(() => {
    if (!token) return;

    const fetchSettings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/settings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load settings");

        const data = await res.json();
        setSettings({
          notifications: Boolean(data.notifications),
          darkMode: Boolean(data.darkMode),
        });
      } catch (err) {
        console.error("Settings load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [token]);

  /* -------------------- Save Settings -------------------- */
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setSaving(true);
    try {
      const res = await fetch("http://localhost:5000/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save settings");

      alert("Settings saved successfully");
    } catch (err) {
      console.error("Settings save error:", err);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
      <Card className="w-full max-w-md p-8 rounded-lg space-y-6 bg-card border border-border shadow-md">
        <form onSubmit={handleSave} className="space-y-6 w-full">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              Settings
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Notifications */}
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                Enable Notifications
                <Checkbox
                  checked={settings.notifications}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: Boolean(checked),
                    }))
                  }
                />
              </Label>
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                Dark Mode
                <Checkbox
                  checked={settings.darkMode}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      darkMode: Boolean(checked),
                    }))
                  }
                />
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Settings"}
            </Button>

            {/* Navigation */}
            <h4 className="mt-4 mb-2 font-semibold">Other Settings</h4>
            <div className="flex flex-col items-start space-y-2">
              <a href="/account" className="text-blue-500 hover:underline">
                Account Settings
              </a>
              <a href="/profile" className="text-blue-500 hover:underline">
                Profile Settings
              </a>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default Settings;
