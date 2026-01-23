import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-background text-foreground transition-colors duration-300">
      <Card className="w-full max-w-4xl p-8 md:p-12 rounded-2xl shadow-lg border border-border">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center mb-6">About Us</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-left">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
            <p className="text-lg leading-relaxed">
              At <b>MarkerSpace</b>, we provide everything you need to manage, and organize your bookmarks. 
              Our platform offers essential features for anyone looking to manage bookmark in a 
              <b> simple and modern way</b>. Features include: 
              <b> Easy Bookmarks Creation, Manage Your Bookmarks, Add Tags, Add Collections, Add Notes, Track Bookmarks, WatchList, and much more.</b>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
            <ol className="list-decimal list-inside text-lg space-y-2">
              <li>
                Start organizing by <Link to="/signup" className="text-blue-500 hover:underline">Register/Sign Up</Link>.
              </li>
              <li>
                Explore and manage your needs in ways that suit you best.
              </li>
              <li>
                Keep track of your bookmarks with Statistics and WatchList.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
            <ol className="list-decimal list-inside text-lg space-y-2">
              <li>Create bookmarks, collections, and notes.</li>
              <li>View your Bookmarks in multiple ways.</li>
              <li>Track your WatchList Cart.</li>
              <li>View and track bookmarks, collections, and notes efficiently.</li>
              <li>Receive notifications and email updates about bookmarks, statistics, and WatchList.</li>
            </ol>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
