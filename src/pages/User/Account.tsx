import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Account: React.FC = () => {
  const handleUpdateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Account updated!");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password changed!");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      alert("Account deleted!");
    }
  };

  return (
    <div className="min-h-screen p-7 text-foreground">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Account Info */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Account Info</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleUpdateAccount} className="space-y-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input placeholder="Enter your username" />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input placeholder="Enter your email" />
              </div>

              <Button type="submit">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="Current password" />
              </div>

              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="New password" />
              </div>

              <Button type="submit" variant="secondary">
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>More Settings</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            <a href="/profile" className="text-primary hover:underline">
              Go to Profile Settings
            </a>
            <a href="/settings" className="text-primary hover:underline">
              Go to General Settings
            </a>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-500 bg-card">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Deleting your account is permanent and cannot be undone.
            </p>

            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Account;