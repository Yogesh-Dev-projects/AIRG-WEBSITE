"use client";

import React from "react";

// Premium SVG Logo - Recreated for "AIR GURUJI International" (Vertical Centered Layout)
const Logo = () => (
  <div className="flex items-center gap-2 group cursor-pointer py-1 select-none">
    <img 
      src="/aig-logo.png" 
      alt="AIR GURUJI International Logo" 
      className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-multiply" 
    />
  </div>
);

export function Footer() {
  return (
    <footer className="w-full border-t border-black/5 pt-16 pb-12 relative z-10 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 mb-12">
          <div className="space-y-4 sm:col-span-2 md:col-span-3 pr-0 md:pr-4 flex flex-col items-center md:items-start">
            <a href="/">
              <Logo />
            </a>
            <p className="text-[#1a1a2e]/40 text-xs font-light leading-relaxed max-w-xs font-body text-center md:text-left">
              Building the digital and physical infrastructure layer for decentralized intelligence hubs and autonomous ecosystems.
            </p>
            <div className="flex gap-4 pt-2 justify-center md:justify-start">
              <a href="https://youtube.com/@airguruji?si=y_hiDFi8YpiePL-v" target="_blank" rel="noopener noreferrer" className="text-[#1a1a2e]/40 hover:text-[#EB0028] transition-colors" title="YouTube">
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/gurujiair?igsh=bW8wNW5pcnIwcDU=" target="_blank" rel="noopener noreferrer" className="text-[#1a1a2e]/40 hover:text-[#EB0028] transition-colors" title="Instagram">
                <svg className="w-[18px] h-[18px] fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/guruji-air/" target="_blank" rel="noopener noreferrer" className="text-[#1a1a2e]/40 hover:text-[#EB0028] transition-colors" title="LinkedIn">
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-sans font-bold text-[#1a1a2e] mb-4 uppercase tracking-wider text-[11px]">Company</h4>
            <ul className="space-y-2 text-xs text-[#1a1a2e]/50 font-sans font-medium">
              <li><a href="/about" className="hover:text-[#EB0028] transition-colors">About Us</a></li>
              <li><a href="/careers" className="hover:text-[#EB0028] transition-colors">Careers</a></li>
              <li><a href="/blog" className="hover:text-[#EB0028] transition-colors">Blog</a></li>
              <li><a href="/press" className="hover:text-[#EB0028] transition-colors">Press</a></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-sans font-bold text-[#1a1a2e] mb-4 uppercase tracking-wider text-[11px]">Community</h4>
            <ul className="space-y-2 text-xs text-[#1a1a2e]/50 font-sans font-medium">
              <li><a href="/instructor" className="hover:text-[#EB0028] transition-colors">Become an Instructor</a></li>
              <li><a href="/affiliate" className="hover:text-[#EB0028] transition-colors">Affiliate Program</a></li>
              <li><a href="/stories" className="hover:text-[#EB0028] transition-colors">Student Stories</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-sans font-bold text-[#1a1a2e] mb-4 uppercase tracking-wider text-[11px]">Support</h4>
            <ul className="space-y-2 text-xs text-[#1a1a2e]/50 font-sans font-medium">
              <li><a href="/help" className="hover:text-[#EB0028] transition-colors">Help Center</a></li>
              <li><a href="/contact" className="hover:text-[#EB0028] transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-[#EB0028] transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-[#EB0028] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-sans font-bold text-[#1a1a2e] mb-4 uppercase tracking-wider text-[11px]">Mobile App</h4>
            <div className="flex flex-col gap-2">
              {/* App Store button */}
              <a href="#" className="flex items-center gap-2.5 bg-black hover:bg-black/90 text-white px-3.5 py-2 rounded-lg transition-all duration-300 border border-white/10 w-[150px] hover:scale-[1.02]">
                <svg viewBox="0 0 170 170" className="w-[18px] h-[18px] fill-white">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.9-14.3-6.08-3.57-2.9-7.22-7.44-10.95-13.62C13.43 115.17 6.1 90.7 6.1 65.86c0-15.16 3.73-27.42 11.2-36.78 7.46-9.36 16.56-14.13 27.27-14.3 5.37-.08 10.95 1.5 16.74 4.74 5.8 3.23 9.87 4.79 12.21 4.79 1.83 0 5.61-1.46 11.37-4.4 5.75-2.92 11.16-4.33 16.24-4.22 17.58.33 30.65 6.78 39.22 19.38-15.7 9.53-23.33 22.33-22.92 38.4.33 12.92 5.3 23.46 14.92 31.62 9.62 8.16 20.87 12.5 33.74 13.04.42-3.4 1.25-7.04 2.5-10.88zM119.22 26.24c0-7.72 2.76-14.88 8.29-21.49.92-1.09 1.83-2.01 2.75-2.75 1-.92 1.67-1.42 2-1.5.25-.08.5-.12.75-.12.58 0 1 .29 1.25.87.5.92.75 2.21.75 3.87 0 7.42-2.75 14.54-8.25 21.34-.83.92-1.75 1.88-2.75 2.88-1 .92-1.71 1.46-2.12 1.62-.34.17-.67.25-1 .25-.67 0-1.13-.37-1.38-1.12-.37-1.13-.54-2.46-.54-3.98z" />
                </svg>
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[6.5px] uppercase tracking-wider text-white/55">Download on the</span>
                  <span className="text-[10.5px] font-semibold text-white mt-0.5 font-sans">App Store</span>
                </div>
              </a>
              {/* Google Play button */}
              <a href="#" className="flex items-center gap-2.5 bg-black hover:bg-black/90 text-white px-3.5 py-2 rounded-lg transition-all duration-300 border border-white/10 w-[150px] hover:scale-[1.02]">
                <svg viewBox="0 0 512 512" className="w-[18px] h-[18px] fill-white">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58 33.3 60.1 60.1c11.9-19.1 11.9-42.5-2.1-53.4zM104.6 499l220.7-126.7-60.1-60.1-160.6 186.8z" />
                </svg>
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[6.5px] uppercase tracking-wider text-white/55">GET IT ON</span>
                  <span className="text-[10.5px] font-semibold text-white mt-0.5 font-sans">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[9px] text-[#1a1a2e]/30 tracking-widest uppercase">
          <div>© 2026 AIR G INTERNATIONAL. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#EB0028] transition-colors">Security Protocols</a>
            <span>/</span>
            <a href="#" className="hover:text-[#EB0028] transition-colors">Compliance Audits</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
