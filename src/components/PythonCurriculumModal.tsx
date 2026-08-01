import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function PythonCurriculumModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [openWeek, setOpenWeek] = useState<number | null>(1); // Default week 1 open

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const curriculum = [
    {
      week: 1,
      title: "Week 1 – Python Fundamentals (5 Hours)",
      content: (
        <div className="space-y-4">
          <div>
            <h5 className="font-bold text-[#1a1a2e] mb-2 uppercase text-xs tracking-wider">Basics</h5>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#1a1a2e]/70">
              <li>Introduction to Programming</li>
              <li>What is Python?</li>
              <li>Why Python?</li>
              <li>Real-world Applications of Python</li>
              <li>Installing Python</li>
              <li>Installing VS Code</li>
              <li>Running Your First Program</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[#1a1a2e] mb-2 uppercase text-xs tracking-wider">Fundamentals</h5>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#1a1a2e]/70">
              <li>Variables</li>
              <li>Data Types</li>
              <li>Type Conversion</li>
              <li>Comments</li>
              <li>Keywords</li>
              <li>Input()</li>
              <li>Print()</li>
              <li>String Formatting (f-strings)</li>
              <li>Basic Practice Questions</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[#1a1a2e] mb-2 flex items-center gap-2 uppercase text-xs tracking-wider">
              <span className="text-xl">👨‍💻</span> Hands-on Practice
            </h5>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#1a1a2e]/70">
              <li>Age Calculator</li>
              <li>Simple Calculator</li>
              <li>Student Information Program</li>
            </ul>
          </div>
          <div className="bg-[#f8f8fa] p-4 rounded-xl border border-black/5 mt-4">
            <h5 className="font-bold text-[#1a1a2e] mb-2 flex items-center gap-2 uppercase text-xs tracking-wider">
              <span className="text-xl">📝</span> Assignment 1
            </h5>
            <p className="text-sm text-[#1a1a2e]/70 mb-2">Build a Student Information System that asks the user for:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#1a1a2e]/70">
              <li>Name</li>
              <li>Age</li>
              <li>College</li>
              <li>Branch</li>
              <li>Displays formatted output.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      week: 2,
      title: "Week 2 – Programming Logic (5 Hours)",
      content: (
        <div className="space-y-4">
          <div>
            <h5 className="font-bold text-[#1a1a2e] mb-2 uppercase text-xs tracking-wider">Topics</h5>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#1a1a2e]/70">
              <li>Operators</li>
              <li>Comparison Operators</li>
              <li>Logical Operators</li>
              <li>Conditional Statements</li>
              <li>Nested if</li>
              <li>Loops (range(), break, continue, pass)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[#1a1a2e] mb-2 uppercase text-xs tracking-wider">Functions</h5>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#1a1a2e]/70">
              <li>Why Functions?</li>
              <li>Creating Functions</li>
              <li>Parameters</li>
              <li>Arguments</li>
              <li>Return Statement</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[#1a1a2e] mb-2 uppercase text-xs tracking-wider">Debugging Basics</h5>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#1a1a2e]/70">
              <li>Reading Errors</li>
              <li>Common Python Errors</li>
              <li>VS Code Debugger</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[#1a1a2e] mb-2 flex items-center gap-2 uppercase text-xs tracking-wider">
              <span className="text-xl">👨‍💻</span> Mini Project
            </h5>
            <p className="text-sm font-bold text-[#1a1a2e]">Student Grade Management System</p>
            <p className="text-xs text-[#1a1a2e]/60 mb-2 mt-1">Features: Enter Marks, Calculate Percentage, Grade, Pass/Fail, Multiple Students using Loop.</p>
            <p className="text-xs text-primary italic">This project teaches: Variables, Conditions, Loops, Functions.</p>
          </div>
          <div className="bg-[#f8f8fa] p-4 rounded-xl border border-black/5 mt-4">
            <h5 className="font-bold text-[#1a1a2e] mb-2 flex items-center gap-2 uppercase text-xs tracking-wider">
              <span className="text-xl">📝</span> Assignment 2
            </h5>
            <p className="text-sm text-[#1a1a2e]/70">Create a Multiplication Table Generator.</p>
          </div>
        </div>
      ),
    },
    {
      week: 3,
      title: "Week 3 – Working with Data (5 Hours)",
      content: (
        <div className="space-y-4">
          <div>
            <h5 className="font-bold text-[#1a1a2e] mb-2 uppercase text-xs tracking-wider">Topics</h5>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#1a1a2e]/70">
              <li>Lists</li>
              <li>Tuples</li>
              <li>Sets</li>
              <li>Dictionaries</li>
              <li>Nested Lists & Nested Dictionary</li>
              <li>String Methods</li>
              <li>File Handling (Read Files, Write Files, Append Files)</li>
              <li>Exception Handling (Try, Except, Finally)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[#1a1a2e] mb-2 flex items-center gap-2 uppercase text-xs tracking-wider">
              <span className="text-xl">👨‍💻</span> Mini Project
            </h5>
            <p className="text-sm font-bold text-[#1a1a2e]">Contact Book</p>
            <p className="text-xs text-[#1a1a2e]/60 mb-2 mt-1">Features: Add Contact, Search Contact, Delete Contact, Store Contacts in File.</p>
            <p className="text-xs text-primary italic">Students will now understand: ✔ Lists ✔ Dictionary ✔ File Handling ✔ Exception Handling</p>
          </div>
          <div className="bg-[#f8f8fa] p-4 rounded-xl border border-black/5 mt-4">
            <h5 className="font-bold text-[#1a1a2e] mb-2 flex items-center gap-2 uppercase text-xs tracking-wider">
              <span className="text-xl">📝</span> Assignment 3
            </h5>
            <p className="text-sm text-[#1a1a2e]/70">Expense Tracker</p>
          </div>
        </div>
      ),
    },
    {
      week: 4,
      title: "Week 4 – Object-Oriented Programming & Capstone Project (5 Hours)",
      content: (
        <div className="space-y-4">
          <div>
            <h5 className="font-bold text-[#1a1a2e] mb-2 uppercase text-xs tracking-wider">OOP</h5>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[#1a1a2e]/70">
              <li>Class</li>
              <li>Object</li>
              <li>Constructor</li>
              <li>Methods</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[#1a1a2e] mb-2 flex items-center gap-2 uppercase text-xs tracking-wider">
              <span className="text-xl">🚀</span> Capstone Project
            </h5>
            <p className="text-sm text-[#1a1a2e]/70 leading-relaxed">
              A <strong>Capstone Project</strong> is the final project where students combine everything they've learned throughout the course into one complete application. It's not just another assignment. It's their showcase project—something they can put on their resume, GitHub, or LinkedIn. For a beginner bootcamp, the capstone should be challenging but achievable.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-[#f8f8fa] p-4 rounded-xl border border-black/5">
              <h5 className="font-bold text-[#1a1a2e] mb-2 uppercase text-xs tracking-wider">Final Assessment</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm text-[#1a1a2e]/70">
                <li>30% MCQ Quiz</li>
                <li>30% Coding Questions</li>
                <li>40% Capstone Project</li>
              </ul>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <h5 className="font-bold text-emerald-800 mb-2 uppercase text-xs tracking-wider">Certificate Criteria</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm text-emerald-700">
                <li>Attendance ≥ 80%</li>
                <li>Assignment Submission</li>
                <li>Project Completion</li>
                <li>Final Assessment</li>
              </ul>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-4">
            <h5 className="font-bold text-blue-800 mb-2 uppercase text-xs tracking-wider">What Students Will Get</h5>
            <ul className="space-y-2 text-sm text-blue-700 font-medium">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">workspace_premium</span> AIR G International Certificate of Completion</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">code</span> 2 Mini Projects</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">rocket_launch</span> 1 Capstone Project</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">folder_open</span> GitHub Repository with all projects</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">analytics</span> Final Assessment Report</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">campaign</span> LinkedIn Certificate Announcement Template</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 md:px-8 flex items-center justify-between shrink-0 border-b border-black/5 bg-gray-50/50">
          <div>
            <h3 className="font-headline font-black text-xl md:text-2xl text-[#1a1a2e] uppercase tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">menu_book</span>
              Course Curriculum
            </h3>
            <p className="text-[#1a1a2e]/60 text-xs md:text-sm mt-1 flex items-center gap-3 font-medium">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> 20 Hours (1 Month)</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">event</span> Weekend Classes</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-black/10 text-[#1a1a2e]/50 hover:text-[#1a1a2e] hover:bg-gray-50 transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Body (Accordion) */}
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-6 md:p-8 bg-white">
          <div className="mb-6 flex flex-wrap gap-4 text-xs font-semibold text-[#1a1a2e]/70">
            <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 flex items-center gap-1.5">
              <span className="font-bold uppercase tracking-wider text-[10px]">Prepared By:</span>
              <span>Shravani Khanvilkar</span>
            </div>
            <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg border border-primary/20 flex items-center gap-1.5">
              <span className="font-bold uppercase tracking-wider text-[10px]">Prepared For:</span>
              <span>AIR G International</span>
            </div>
            <div className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg border border-purple-100 flex items-center gap-1.5">
              <span className="font-bold uppercase tracking-wider text-[10px]">Mode:</span>
              <span>Live Online</span>
            </div>
          </div>

          <div className="space-y-3">
            {curriculum.map((item) => (
              <div 
                key={item.week}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openWeek === item.week ? 'border-primary/30 shadow-md ring-1 ring-primary/10' : 'border-black/10 hover:border-black/20'}`}
              >
                <button
                  onClick={() => setOpenWeek(openWeek === item.week ? null : item.week)}
                  className={`w-full text-left px-6 py-4 flex items-center justify-between transition-colors ${openWeek === item.week ? 'bg-primary/5' : 'bg-white hover:bg-gray-50/50'}`}
                >
                  <span className="font-headline font-bold text-[#1a1a2e] text-sm md:text-base">{item.title}</span>
                  <span className={`material-symbols-outlined text-[#1a1a2e]/40 transition-transform duration-300 ${openWeek === item.week ? 'rotate-180 text-primary' : ''}`}>
                    expand_more
                  </span>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${openWeek === item.week ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} grid`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 border-t border-black/5 bg-white">
                      {item.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
