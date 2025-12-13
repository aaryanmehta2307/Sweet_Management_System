import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-10 shadow-md backdrop-blur"
      style={{ backgroundColor: "rgba(250,247,230,0.9)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold">
          🍰 Sweet Shop 
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          <li>
            <a href="#about" className="hover:text-[var(--color-primary)] transition">
              About
            </a>
          </li>
          <li>
            <a href="#sweets" className="hover:text-[var(--color-primary)] transition">
              Sweets
            </a>
          </li>
          <li>
            <Link to="/login" className="hover:text-[var(--color-primary)] transition">
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="
                px-5 py-2 rounded-full shadow
                transition-all duration-200
                active:scale-95
              "
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-dark)"
              }}
              onMouseEnter={e => e.target.style.backgroundColor = "var(--color-soft)"}
              onMouseLeave={e => e.target.style.backgroundColor = "var(--color-primary)"}
            >
              Sign Up
            </Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-6"
          style={{ backgroundColor: "var(--color-base)" }}
        >
          <ul className="flex flex-col gap-4 font-medium">
            <li><a href="#about">About</a></li>
            <li><a href="#sweets">Sweets</a></li>
            <li><Link to="/login">Login</Link></li>
            <li>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-full inline-block shadow"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
