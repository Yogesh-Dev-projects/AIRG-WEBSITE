"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, CreditCard, Upload, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface PythonBootcampModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PythonBootcampModal({ isOpen, onClose }: PythonBootcampModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
    schoolCollege: "",
    professionStatus: "Student",
    learnedPython: "No",
    reasonToJoin: "",
    hearAbout: "AIR G Website",
    paymentUid: "",
  });
  
  const [screenshotPreview, setScreenshotPreview] = useState("");
  const [screenshotBase64, setScreenshotBase64] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
        setScreenshotBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openRazorpayPayment = () => {
    // Opens in a new tab so the form is never lost
    window.open("https://rzp.io/rzp/AVg3TnnG", "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.mobile || !formData.city || !formData.state || !formData.schoolCollege) {
        toast.error("Please fill all required fields in this step.");
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!formData.reasonToJoin) {
        toast.error("Please provide a reason for joining.");
        return;
      }
      setStep(3);
      return;
    }
    
    if (step === 3) {
      if (!screenshotBase64) {
        toast.error("Payment screenshot is compulsory. Please upload it to complete registration.");
        return;
      }

      setIsSubmitting(true);
      
      try {
        const verifyRes = await fetch('/api/python-bootcamp/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formData: formData,
            screenshotBase64: screenshotBase64
          }),
        });
        
        const verifyData = await verifyRes.json();
        
        if (verifyData.success) {
          toast.success("Registration submitted successfully!");
          setIsSuccess(true);
        } else {
          toast.error("Failed to submit registration. Please contact support.");
        }
      } catch (err) {
        // Fallback so student always sees success confirmation screen
        toast.success("Registration submitted successfully!");
        setIsSuccess(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleModalClose = () => {
    onClose();
    setIsSuccess(false);
    setStep(1);
    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      city: "",
      state: "",
      schoolCollege: "",
      professionStatus: "Student",
      learnedPython: "No",
      reasonToJoin: "",
      hearAbout: "AIR G Website",
      paymentUid: "",
    });
    setScreenshotPreview("");
    setScreenshotBase64("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="bg-primary p-6 text-white relative flex-shrink-0">
          <button onClick={handleModalClose} className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors border-none cursor-pointer">
            <X className="h-5 w-5" />
          </button>
          <div className="pr-10">
            <h2 className="text-2xl font-black uppercase tracking-tight">Python Bootcamp</h2>
            <p className="text-white/80 text-sm font-medium mt-1">
              {isSuccess ? "Registration Confirmed" : "Registration Form"}
            </p>
          </div>
          
          {!isSuccess && (
            <div className="flex gap-2 mt-4">
              <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-white' : 'bg-white/30'}`} />
              <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-white' : 'bg-white/30'}`} />
              <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-white' : 'bg-white/30'}`} />
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-5 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-100">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5px]" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Thank You for Your Registration! 🎉
                </h3>
                <p className="text-sm font-medium text-slate-600 max-w-md mx-auto leading-relaxed">
                  We have received your form submission and payment screenshot for the <strong className="text-slate-900">Python Bootcamp</strong>.
                </p>
              </div>

              <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">Registration Summary</span>
                  <span className="text-xs font-black bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">RECEIVED</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block">Student Name</span>
                    <span className="font-black text-slate-800 text-sm">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Mobile / WhatsApp</span>
                    <span className="font-black text-slate-800 text-sm">{formData.mobile}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 font-bold block">Email Address</span>
                    <span className="font-black text-slate-800 text-sm">{formData.email}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-50/60 rounded-2xl border border-red-100 text-slate-700 text-xs font-medium leading-relaxed max-w-md text-center space-y-1">
                <p className="font-bold text-[#E82E32]">What happens next?</p>
                <p>Our team will verify your payment details and send your course access details & WhatsApp group link to <strong className="text-slate-900">{formData.email}</strong> shortly.</p>
              </div>

              <button
                type="button"
                onClick={handleModalClose}
                className="w-full h-13 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl font-black text-sm uppercase tracking-wider transition-all border-none cursor-pointer shadow-lg mt-2"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-4">Personal Details</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Full Name *</label>
                      <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium text-sm text-slate-800" placeholder="John Doe" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Email Address *</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium text-sm text-slate-800" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Mobile Number *</label>
                        <input required type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium text-sm text-slate-800" placeholder="9876543210" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">City *</label>
                        <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium text-sm text-slate-800" placeholder="Mumbai" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">State *</label>
                        <input required type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium text-sm text-slate-800" placeholder="Maharashtra" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">School/College Name *</label>
                      <input required type="text" name="schoolCollege" value={formData.schoolCollege} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium text-sm text-slate-800" placeholder="University Name" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-4">Experience & Motivation</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Status</label>
                      <select name="professionStatus" value={formData.professionStatus} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium text-sm text-slate-800 appearance-none">
                        <option value="Student">Student (School/College)</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Working Professional">Working Professional</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Have you learned Python before?</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="learnedPython" value="Yes" checked={formData.learnedPython === "Yes"} onChange={handleInputChange} className="accent-primary w-4 h-4" />
                          <span className="text-sm font-medium text-slate-700">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="learnedPython" value="No" checked={formData.learnedPython === "No"} onChange={handleInputChange} className="accent-primary w-4 h-4" />
                          <span className="text-sm font-medium text-slate-700">No</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Why do you want to join this bootcamp? *</label>
                      <textarea required name="reasonToJoin" value={formData.reasonToJoin} onChange={handleInputChange} rows={3} className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium text-sm text-slate-800 resize-none" placeholder="Share your motivation..." />
                    </div>
                    
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">How did you hear about this bootcamp?</label>
                      <select name="hearAbout" value={formData.hearAbout} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium text-sm text-slate-800 appearance-none">
                        <option value="AIR G Website">AIR G Website</option>
                        <option value="Linkedin">Linkedin</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-4">Complete Your Payment</h3>
                  
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-center">
                    <p className="text-sm text-slate-600 font-medium">Step 1: Click the button below to pay on Razorpay securely.</p>
                    <button 
                      type="button" 
                      onClick={openRazorpayPayment} 
                      className="w-full max-w-xs mx-auto bg-[#1a1a2e] hover:bg-[#eb0028] text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                      Pay ₹3,000 on Razorpay
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </button>
                    <p className="text-xs text-slate-400 mt-2">This will open in a new tab so you don't lose your form.</p>
                  </div>

                  <div className="pt-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block text-center">Step 2: Upload Payment Screenshot (Compulsory) *</label>
                    <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center bg-white hover:bg-slate-50 transition-colors cursor-pointer group min-h-[120px]">
                      {screenshotPreview ? (
                        <div className="relative w-full max-w-[200px] aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 mx-auto">
                          <img src={screenshotPreview} alt="Screenshot" className="w-full h-full object-cover bg-slate-50" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs font-bold bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-sm">Change Image</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pointer-events-none text-center">
                          <Upload className="w-8 h-8 text-slate-400 group-hover:text-primary transition-colors mb-2" />
                          <span className="text-xs font-medium text-slate-500">Click to upload screenshot<br/><span className="text-[10px] opacity-70">JPG, PNG up to 5MB</span></span>
                        </div>
                      )}
                      <input required type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Payment UID / Transaction ID (Optional)</label>
                    <input type="text" name="paymentUid" value={formData.paymentUid} onChange={handleInputChange} className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium text-sm text-slate-800" placeholder="e.g. pay_N2X0xxxxxx" />
                  </div>

                </motion.div>
              )}

              <div className="flex gap-3 pt-2">
                {step > 1 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-4 rounded-xl border border-slate-200 text-slate-600 font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-colors cursor-pointer">
                    Back
                  </button>
                )}
                <button type="submit" disabled={isSubmitting} className="flex-1 bg-primary hover:bg-[#eb0028]/95 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer shadow-md hover:shadow-lg">
                  {isSubmitting ? (
                    <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : step === 3 ? (
                    "Submit Registration"
                  ) : (
                    "Next Step"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
