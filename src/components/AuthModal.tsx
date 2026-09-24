import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, Loader2, AlertCircle, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useAppContext } from "@/context/AppContext";

const AuthModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const { addNotification } = useAppContext();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuickDemoLogin = async (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: demoEmail, password: demoPass })
      });
      const data = await res.json();
      if (data.success && data.user) {
        localStorage.setItem("airg_user_session", JSON.stringify(data.user));
        window.dispatchEvent(new Event("airg_auth_change"));
        addNotification(`Welcome back, ${data.user.name} (${data.user.role})!`);
        onClose();
        if (window.location.pathname === "/lab-setup") {
          window.location.reload();
        }
      } else {
        await login(demoEmail, demoPass);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || "Failed to log in with demo account.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success && data.user) {
        localStorage.setItem("airg_user_session", JSON.stringify(data.user));
        window.dispatchEvent(new Event("airg_auth_change"));
        addNotification(`Welcome back, ${data.user.name} (${data.user.role})!`);
        onClose();
        if (window.location.pathname === "/lab-setup") {
          window.location.reload();
        }
        return;
      }

      if (isSignUp) {
        await signup(email, password, name);
        addNotification(`Welcome, ${name || 'User'}! Successfully signed up.`);
      } else {
        await login(email, password);
        addNotification(`Welcome back! Successfully logged in.`);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || `${isSignUp ? 'Signup' : 'Login'} failed. Please check your credentials.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#0F172A] rounded-[2rem] border border-white/10 p-8 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] text-white"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold text-primary tracking-wide uppercase">AIR G Portal Access</span>
              </div>
              <h2 className="text-2xl font-bold mb-1 tracking-tight text-white">
                {isSignUp ? "Create an Account" : "Sign In to AIR G Portal"}
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                {isSignUp ? "Sign up to join the AIR G ecosystem." : "Sign in with your team role credentials."}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900/80 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary transition-all text-xs text-white"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary transition-all text-xs text-white"
                    placeholder="name@airginternational.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl py-3 pl-11 pr-10 focus:outline-none focus:border-primary transition-all text-xs text-white"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                disabled={isLoading}
                className="w-full py-3.5 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-blue-600 shadow-lg shadow-blue-500/10 disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    <span>Signing in…</span>
                  </>
                ) : (
                  <span>{isSignUp ? "Sign Up" : "Sign In"}</span>
                )}
              </button>
            </form>


          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
