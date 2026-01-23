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

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const confirmDelete = confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      alert("Account deleted!");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-10 bg-background text-foreground transition-colors duration-300">
      <Card className="w-full max-w-md p-8 rounded-lg space-y-6 bg-card text-card-foreground border border-border shadow-md transition-colors duration-300">
        <form onSubmit={handleUpdateAccount} className="space-y-4 w-full">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">Account</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" placeholder="Enter your username" />
            </div>

            <Button
              type="submit"
              className="w-full border border-border bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
            >
              Update Account
            </Button>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>

            <Button
              type="button"
              onClick={handleChangePassword}
              className="w-full border border-border bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors duration-300"
            >
              Change Password
            </Button>

            <h4 className="mt-4 mb-2 font-semibold">Other Settings:</h4>
            <div className="flex flex-col items-start space-y-2">
              <a href="/profile" className="text-blue-300 hover:underline">
                Go to Profile Settings
              </a>
              <a href="/settings" className="text-blue-300 hover:underline">
                Go to Settings
              </a>
            </div>

            <Button
              type="button"
              onClick={handleDeleteAccount}
              className="w-full border border-border bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 mt-4"
            >
              Delete Account
            </Button>

            <div className="text-sm text-gray-500 space-y-1 mt-2">
              <p>Deleting your account is permanent and cannot be undone.</p>
              <p>If you have any issues, please contact support.</p>
              <p>For security reasons, you will be logged out after deleting your account.</p>
              <p>You can always create a new account later if you change your mind.</p>
              <p>If you have any questions, please refer to our FAQ section.</p>
              <p>Thank you for using our service!</p>
              <p>We appreciate your support and hope to see you again soon.</p>
              <p>If you have any feedback, please let us know.</p>
              <p>Your feedback helps us improve our service and provide a better experience for all users.</p>
              <p>We value your privacy and security, and we take it seriously.</p>
              <p>If you have any concerns, please reach out to us.</p>
              <p>We are here to help you and ensure that your experience is smooth and enjoyable.</p>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default Account;
