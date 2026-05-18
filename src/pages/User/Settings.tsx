import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";

export default function Settings() {
  return (
    <div className="p-7 space-y-6 max-w-3xl mx-auto">
      
      {/* Theme */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <span>Theme Mode</span>
          <ModeToggle showLabel />
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          <div className="flex items-center justify-between">
            <Label>Email Notifications</Label>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <Label>Push Notifications</Label>
            <Switch />
          </div>

        </CardContent>
      </Card>

      {/* Privacy */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          <div className="flex items-center justify-between">
            <Label>Make profile public</Label>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <Label>Show activity</Label>
            <Switch />
          </div>

        </CardContent>
      </Card>
    </div>
  );
}