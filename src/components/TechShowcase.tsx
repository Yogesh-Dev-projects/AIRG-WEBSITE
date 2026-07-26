"use client";

import { motion } from "framer-motion";

const TechShowcase = () => {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row gap-16 items-end mb-16">
        <motion.h2 className="font-heading text-4xl md:text-6xl text-[#F5F5F7] shrink-0">
          Form. Function. <br />Fidelity.
        </motion.h2>
        <div className="h-[1px] w-full bg-glass-border mb-6 hidden md:block"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div className="relative group cursor-pointer overflow-hidden rounded-xl">
          <img 
            className="w-full h-[600px] object-cover rounded-xl brightness-50 group-hover:brightness-90 transition-all duration-700" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBquR1RiIz9xuWiq1Z8rbzAbJVYIanmn--atgYOVrbWMvceiwCxZ94TtTTTbSSC-AeFlAXg3Nwvl4ODt6Uxr5ZVReI12X2rEn4rC5cmEpRLoIx-n7-2f9lUIH93TU5u47MzoAtYYoUABYIObgMf1AZAtVKlFGOGlIVNBSVsg_wbXvDBy5P8NyRmUCZjZYxwBp02FGVxhlBAwiz4hL2MKxRodFSnZA2YCLmteLnYzY31v__YXCHMFPltUDt9NgDM38KDVduvh_RDFs1J"
            alt="G-CENTURION Unit"
          />
          <div className="absolute bottom-10 left-10 text-white">
            <p className="font-mono text-xs uppercase tracking-widest mb-2 opacity-70">Unit Type 01</p>
            <h3 className="font-heading text-4xl">G-CENTURION</h3>
          </div>
        </motion.div>

        <motion.div className="relative group cursor-pointer overflow-hidden rounded-xl">
          <img 
            className="w-full h-[600px] object-cover rounded-xl brightness-50 group-hover:brightness-90 transition-all duration-700" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgAZjuo1gobBkZWOso2Wzo9DIOV8oDPXDW7_uacpc_KXKE-_mKWw2zWqR1UDD46TSqEDhuwLD_Sp2K8cBa616fLDPzpITnR6uxmvWPesZMBKpCdZh3ZJ0vCSvgcE-dkPaq0VMw-qBJLlLx7uQ7VxXGW56nOzIAOX5ibo7LbKmI_-XQAFGkwta2uGLmANSf6ObQSEwsYSzk6ZPMIXF_g8wixzU7j72sqwvZCYEA9oWcqItRVIv1xsnEC-ZP8_HiXJjWeEefRrGYVeR-"
            alt="Autonomous Line"
          />
          <div className="absolute bottom-10 left-10 text-white">
            <p className="font-mono text-xs uppercase tracking-widest mb-2 opacity-70">Autonomous Line</p>
            <h3 className="font-heading text-4xl">SWIFT-CORE V2</h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechShowcase;


