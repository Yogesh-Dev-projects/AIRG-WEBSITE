"use client";

import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const { isAuthModalOpen, setAuthModalOpen } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Ecosystem", href: "#" },
    { name: "Robotics", href: "#" },
    { name: "Classrooms", href: "#" },
    { name: "Impact", href: "#" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? "bg-charcoal-surface/70 backdrop-blur-xl border-glass-border py-4" 
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center">
          {/* Logo */}
          <div className="font-heading text-2xl md:text-3xl font-bold text-primary tracking-tighter hover:scale-105 transition-transform duration-300 cursor-pointer">
            AIR G
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className={`font-body text-sm font-medium transition-colors ${
                  i === 0 ? "text-primary border-b border-primary" : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setAuthModalOpen(true)}
              className="bg-[#F5F5F7] text-black px-6 py-2 rounded-full font-semibold text-sm hover:scale-105 transition-transform duration-300"
            >
              Connect
            </button>
            
            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-charcoal-surface/95 backdrop-blur-2xl border-b border-glass-border overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6">
                {navLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="font-body text-lg text-on-surface-variant hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;

