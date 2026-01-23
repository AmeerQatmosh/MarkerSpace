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

  // Load profile
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

  // const handleSave = async () => {
  //   try {
  //     const res = await fetch("http://localhost:5000/api/profile", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //       body: JSON.stringify({ username, avatar }),
  //     });

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.message);

  //     alert("Profile updated successfully");
  //   } catch (err: any) {
  //     alert(err.message || "Failed to update profile");
  //   }
  // };

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

    // 🔹 Minimal addition: save updated avatar & username to localStorage
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    localStorage.setItem(
      "user",
      JSON.stringify({ ...storedUser, avatar, fullName: username })
    );
    // After localStorage.setItem(...)
    window.dispatchEvent(new Event("userUpdated"));


  } catch (err: any) {
    alert(err.message || "Failed to update profile");
  }
};


  if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="min-h-screen flex justify-center p-6">
      <Card className="w-2xl h-full">
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {avatar && (
            <img
              src={avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full mx-auto object-cover"
            />
          )}

          <Input
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />

          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input value={email} disabled />

          <Button className="w-full" onClick={handleSave}>
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
