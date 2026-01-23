import { Link } from "react-router-dom";
import logo from "@/assets/markspace_logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start space-y-6 md:space-y-0">
        {/* Logo & Copyright */}
        <div className="w-full md:w-auto flex flex-col">
          <Link to="/" className="inline-block">
            <img src={logo} alt="PickCart Logo" className="h-12 w-12" />
          </Link>
          <p className="text-sm text-gray-400 mt-2 text-left">
            &copy; {new Date().getFullYear()} MarkerSpace. All rights reserved.
          </p>
        </div>

        {/* Services */}
        <div className="w-full md:w-auto flex flex-col">
          <p className="text-lg font-semibold text-left mb-2">Services</p>
          <div className="flex flex-col space-y-2 text-left">
            <Link to="/collections" className="text-md hover:underline">
              Collections
            </Link>
            <Link to="/insights" className="text-m hover:underline">
              Insights
            </Link>
            <Link to="/notes" className="text-md hover:underline">
              Notes
            </Link>
            <Link to="/focus" className="text-md hover:underline">
              Focus
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-auto flex flex-col">
          <p className="text-lg font-semibold text-left mb-2">Info</p>
          <div className="flex flex-col space-y-2 text-left">
            <Link to="/about" className="text-md hover:underline">
              About Us
            </Link>
            <Link to="/privacy-policy" className="text-md hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms-of-use" className="text-md hover:underline">
              Terms of Use
            </Link>
          </div>
        </div>

        {/* Contact Us */}
        <div className="w-full md:w-auto flex flex-col">
          <p className="text-lg font-semibold text-left mb-2">Contact Us</p>
          <div className="flex flex-col space-y-2 text-left">
            <Link to="/contact" className="text-md hover:underline">
              Keep in touch
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
