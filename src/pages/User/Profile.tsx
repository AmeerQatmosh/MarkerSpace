import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { token } = useAuth();
  const authToken = token || localStorage.getItem("token");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);

  /* -------------------- Load profile -------------------- */
  useEffect(() => {
    if (!authToken) return;

    fetch("http://localhost:5000/api/profile", {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);
        setEmail(data.email);
        setAvatar(data.avatar || "");
        setLoading(false);
      });
  }, [authToken]);

  /* -------------------- Save -------------------- */
  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ username, avatar }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Profile updated successfully");

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...storedUser, avatar, fullName: username })
      );

      window.dispatchEvent(new Event("userUpdated"));
    } catch (err: any) {
      alert(err.message || "Failed to update profile");
    }
  };

  if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="min-h-screen p-7 text-foreground">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Profile Info */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Profile Info</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              placeholder="Email"
              value={email}
              disabled
            />

            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Avatar */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>

            <Input
              placeholder="Paste avatar URL..."
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Profile;