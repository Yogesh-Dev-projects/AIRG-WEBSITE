"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { CheckCircle, Info } from "lucide-react";

const Notifications = () => {
  const { notifications } = useAppContext();

  return (
    <div className="fixed bottom-8 right-8 z-[300] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {notifications.map((note, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="pointer-events-auto bg-[#0F172A] border border-white/5 rounded-2xl p-5 shadow-2xl flex items-center gap-4 min-w-[300px]"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">System Update</p>
              <p className="text-sm font-semibold text-white">{note}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
