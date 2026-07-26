"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Menu, X, User } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import AuthModal from "./AuthModal";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthModalOpen, setAuthModalOpen, addNotification } = useAppContext();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    if (addNotification) addNotification("Logged out successfully.");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "Labs", 
      href: "/#labs",
      dropdown: [
        { name: "School Labs", href: "/learning/school-labs" },
        { name: "Institute Labs", href: "/learning/pdet-lab" },
        { name: "Grampanchayat AI Lab", href: "/learning/grampanchayat-ai-lab" },
        { name: "AI Infrastructure", href: "/learning/ai-infrastructures" },
        { name: "Courses", href: "/#learning" },
        { name: "Workshops", href: "/#workshops" }
      ]
    },
    { name: "Store", href: "/#store" },
    { name: "Airg Labs", href: "/#labs" },
    { name: "AI Infra", href: "/learning/ai-infrastructures" },
    { name: "Global Centres", href: "/#centres" }
  ];

  return (
    <>
      {/* Import Material Symbols for icons matching home page */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      
      <header className="fixed top-0 w-full z-[100] glass-premium border-b border-black/5">
        <nav className="flex justify-between items-center max-w-[1440px] mx-auto px-5 h-20 md:px-20">
          <Link href="/" className="mr-4 shrink-0">
            <div className="flex items-center gap-2 group cursor-pointer py-1 select-none">
              <img 
                src="/aig-logo.png" 
                alt="AIR GURUJI International Logo" 
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex flex-1 items-center justify-evenly px-6 xl:px-12">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group py-6">
                <Link 
                  href={link.href} 
                  className="nav-link font-semibold transition-colors text-xs uppercase tracking-widest text-[#1a1a2e]/40 hover:text-[#1a1a2e] flex items-center"
                >
                  {link.name}
                  {link.dropdown && (
                    <span className="material-symbols-outlined ml-1 text-[16px]">expand_more</span>
                  )}
                </Link>
                {link.dropdown && (
                  <div className="absolute left-0 top-full mt-0 hidden group-hover:flex flex-col bg-white/95 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-xl border border-black/5 overflow-hidden w-56 z-50 transition-all">
                    {link.dropdown.map((sublink) => (
                      <Link
                        key={sublink.name}
                        href={sublink.href}
                        className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-[#1a1a2e]/60 hover:text-primary hover:bg-black/5 transition-colors whitespace-nowrap"
                      >
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Shopping Cart Button */}
            <Link 
              href="/#store"
              className="relative p-3 rounded-xl border border-black/10 bg-white/40 backdrop-blur-md hover:border-primary/50 transition-all duration-300 flex items-center justify-center text-[#1a1a2e]/80 hover:text-primary shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_20px_rgba(238,44,60,0.15)] group"
            >
              <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-300">shopping_bag</span>
            </Link>

            {/* User Profile Button */}
            <button 
              onClick={() => {
                if (user) {
                  // Direct to dashboard or homepage profile
                  window.location.href = "/#profile";
                } else {
                  setAuthModalOpen(true);
                }
              }}
              className="relative p-3 rounded-xl border border-black/10 bg-white/40 backdrop-blur-md hover:border-primary/50 transition-all duration-300 flex items-center justify-center text-[#1a1a2e]/80 hover:text-primary shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_0_20px_rgba(238,44,60,0.15)] group"
            >
              <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-300">person</span>
            </button>

            {/* Social Media Links */}
            <div className="hidden xl:flex items-center gap-2 border-l border-black/10 pl-3 mr-1">
              <a href="https://youtube.com/@airguruji?si=y_hiDFi8YpiePL-v" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-[#FF0000] hover:bg-black/5 transition-all flex items-center justify-center hover:scale-115" title="YouTube">
                <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/gurujiair?igsh=bW8wNW5pcnIwcDU=" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-[#E1306C] hover:bg-black/5 transition-all flex items-center justify-center hover:scale-115" title="Instagram">
                <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a href="https://wa.me/919860779172" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-[#25D366] hover:bg-black/5 transition-all flex items-center justify-center hover:scale-115" title="WhatsApp">
                <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/guruji-air/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-[#0077B5] hover:bg-black/5 transition-all flex items-center justify-center hover:scale-115" title="LinkedIn">
                <svg className="w-[16px] h-[16px] fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>

            {user ? (
              <button 
                onClick={handleLogout}
                className="hidden md:block bg-primary text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest glow-red hover:scale-105 transition-all"
              >
                Logout
              </button>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
                className="hidden md:block bg-primary text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest glow-red hover:scale-105 transition-all"
              >
                Login
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl border border-black/10 bg-white/40 backdrop-blur-md hover:border-primary/50 transition-all duration-300 flex items-center justify-center text-[#1a1a2e]/80 hover:text-primary shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            >
              <span className="material-symbols-outlined text-lg">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-20 z-[99] lg:hidden bg-white/95 backdrop-blur-lg border-b border-black/5 shadow-lg p-6 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <div key={link.name} className="flex flex-col border-b border-black/5">
                    <Link
                      href={link.href}
                      className="py-3 font-bold text-sm uppercase tracking-widest transition-colors text-[#1a1a2e]/60 hover:text-[#1a1a2e]"
                      onClick={() => !link.dropdown && setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <div className="flex flex-col pl-4 pb-2 gap-2 border-l-2 border-primary/20 ml-2 mb-2">
                        {link.dropdown.map((sublink) => (
                          <Link
                            key={sublink.name}
                            href={sublink.href}
                            className="py-2 text-xs font-bold uppercase tracking-widest text-[#1a1a2e]/50 hover:text-[#1a1a2e]"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {sublink.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {user ? (
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest glow-red text-center"
                >
                  Logout
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-primary text-[#1a1a2e] py-4 rounded-xl font-bold text-xs uppercase tracking-widest glow-red text-center"
                >
                  Login
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Integrate global AuthModal inside subpages header */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
