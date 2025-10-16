import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import Button from "./Button";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate(); // ✅ Correct hook

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Deploy", href: "/dashboard" },
    { name: "Features", href: "#features" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "backdrop-blur-xl bg-white/10 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-full glow" />
          <span className="text-2xl font-bold text-white">
            Intra<span className="text-indigo-400">Network</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-12">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-200 hover:text-indigo-400 font-semibold text-lg transition"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Buttons */}
        <div className="hidden md:flex space-x-5">
          <Button text="Sign In" color="green" onClick={() => navigate("/signin")} />
          <Button text="Sign Up" color="indigo" onClick={() => navigate("/signup")} />
        </div>
      </div>
    </motion.nav>
  );
}
