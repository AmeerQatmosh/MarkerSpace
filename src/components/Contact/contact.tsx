import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Contact Info */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">
              Our Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Email:</strong> contact@markerspace.com
            </p>
            <p>
              <strong>Phone:</strong> (213) 456-0987
            </p>
            <p>
              <strong>Address:</strong> 523 Main St, Starbury, San Escobar
            </p>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              Contact Us
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  rows={4}
                />
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full">
                Contact Us
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Contact;
