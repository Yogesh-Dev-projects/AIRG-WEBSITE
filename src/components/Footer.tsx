"use client";

import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-obsidian-base border-t border-glass-border">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap flex flex-col md:flex-row justify-between gap-16">
        <div className="space-y-6">
          <div className="font-heading text-4xl text-primary font-bold tracking-tighter">AIR G</div>
          <p className="max-w-xs font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant leading-relaxed">
            © 2026 AIR G INTERNATIONAL. SECURING THE FUTURE THROUGH INTELLIGENCE.
          </p>
          <div className="flex gap-6 items-center">
            <a href="https://youtube.com/@airguruji?si=y_hiDFi8YpiePL-v" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors" title="YouTube">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/gurujiair?igsh=bW8wNW5pcnIwcDU=" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors" title="Instagram">
              <svg className="w-[18px] h-[18px] fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://wa.me/919860779172" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-[#25D366] transition-colors flex items-center" title="WhatsApp">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/guruji-air/" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors" title="LinkedIn">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <h5 className="font-mono text-[11px] uppercase tracking-widest text-white">Company</h5>
            <ul className="space-y-2 font-body text-sm text-on-surface-variant">
              <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/careers" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="/press" className="hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="font-mono text-[11px] uppercase tracking-widest text-white">Community</h5>
            <ul className="space-y-2 font-body text-sm text-on-surface-variant">
              <li><a href="/instructor" className="hover:text-primary transition-colors">Become an Instructor</a></li>
              <li><a href="/affiliate" className="hover:text-primary transition-colors">Affiliate Program</a></li>
              <li><a href="/stories" className="hover:text-primary transition-colors">Student Stories</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="font-mono text-[11px] uppercase tracking-widest text-white">Support</h5>
            <ul className="space-y-2 font-body text-sm text-on-surface-variant">
              <li><a href="/help" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-glass-border/30 py-8 px-margin-mobile md:px-margin-desktop text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/50">
          TRANSFORMING HUMANITY THROUGH AUTONOMOUS EXCELLENCE.
        </span>
      </div>
    </footer>
  );
};

export default Footer;

