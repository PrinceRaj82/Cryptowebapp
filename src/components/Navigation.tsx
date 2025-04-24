
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

const Navigation = () => {
  return (
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-foreground">
              Crypto Tracker
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-foreground hover:text-primary">
                Home
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary">
                About
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
