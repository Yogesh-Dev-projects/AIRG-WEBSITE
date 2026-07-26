"use client";

import { Navbar } from "@/components/demo-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function SchoolLabsPage() {
  const [activeZone, setActiveZone] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState("1");
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [videoLang, setVideoLang] = useState<'en' | 'mr'>('en');
  const schoolVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (schoolVideoRef.current) {
      schoolVideoRef.current.load();
    }
  }, [videoLang]);

  const gradesList = [
    { 
      id: "1", 
      label: "Grade 1", 
      file: "Grade 1 Book.pdf", 
      driveLink: "https://drive.google.com/file/d/1uK3QDsEhlrG-mqZ_7L8k3MevThlW1AoT/view?usp=sharing",
      active: true, 
      desc: "Introduction to visual block coding (Scratch Jr), simple structural robotics assemblies, and understanding fundamental mechanical concepts like gears, axles, and levers.", 
      kitName: "AIR Junior Starter Kit", 
      previews: ["/extracted-images/page_10_img_1_69.png", "/extracted-images/page_12_img_2_79.png"],
      projects: ["Animating Sprites (Scratch Jr)", "Gear-Driven Spinning Top", "Mechanical Seesaw & Pivot"],
      hardware: ["AIR Junior Blocks & Connectors", "Spur Gears & Turning Axles", "Pulleys & Wheel Hub Units"]
    },
    { 
      id: "2", 
      label: "Grade 2", 
      file: "Grade 2 Book.pdf", 
      driveLink: "https://drive.google.com/file/d/1t5UaCUuGiaGPsJFBvwXNRFoSFr0QbN4w/view?usp=sharing",
      active: true, 
      desc: "Exploring electrical circuits, basic sensor integrations (such as IR obstacle sensors), active block-programming, and building simple autonomous model systems.", 
      kitName: "AIR Robotics Explorer Kit", 
      previews: ["/extracted-images/page_15_img_1_88.jpeg", "/extracted-images/page_16_img_1_91.jpeg"],
      projects: ["Simple LED Flashlight", "Traffic Light Signal Controller", "IR Obstacle Detection Buggy"],
      hardware: ["Robotics Controller Board", "IR Obstacle Sensor", "Battery Pack & Jumper Cables"]
    },
    { 
      id: "3", 
      label: "Grade 3", 
      file: "Grade 3 Book.pdf", 
      driveLink: "https://drive.google.com/file/d/1gZyrsUz9cnz7yPJRYtpz-9zKltWxoXl2/view?usp=sharing",
      active: true, 
      desc: "Advanced block coding with Scratch, building light-sensing circuits, constructing simple mechanical arms, and understanding levers, pulleys, and wheel-axle systems in real devices.", 
      kitName: "AIR Smart Builder Kit", 
      previews: [], 
      projects: ["Light-Sensing Night Lamp", "Mechanical Robotic Arm", "Scratch Animated Stories"], 
      hardware: ["Light Dependent Resistors (LDR)", "AIR Arm Construction Frames", "LED Array & Resistor Pack"]
    },
    { 
      id: "4", 
      label: "Grade 4", 
      file: "Grade 4 Book.pdf", 
      driveLink: "https://drive.google.com/file/d/1Sh9kxN0ntGfRbPdowbIsyOAIuYaWPFKm/view?usp=sharing",
      active: true, 
      desc: "Algorithmic thinking through programmable loops and conditionals, introduction to servo motors, building smart input-output systems, and hands-on electronics with basic circuit boards.", 
      kitName: "AIR Logic & Servo Kit", 
      previews: [], 
      projects: ["Servo-Controlled Door Lock", "Button-Triggered Alarm System", "Multi-LED Pattern Display"], 
      hardware: ["Servo Motor Modules", "Push-Button Input Arrays", "Breadboard & Jumper Wire Sets"]
    },
    { 
      id: "5", 
      label: "Grade 5", 
      file: "Grade 5 Book.pdf", 
      driveLink: "https://drive.google.com/file/d/1Ygv5nvNmjfaOxWOf8L3OHYHub8CqNyYa/view?usp=sharing",
      active: true, 
      desc: "Transition to physical computing with Arduino, interfacing multiple sensor matrices (ultrasonic, temperature), learning structural 3D design, and printing custom shapes.", 
      kitName: "AIR IoT & Creator 3D Kit", 
      previews: ["/extracted-images/page_18_img_1_99.jpeg", "/extracted-images/page_19_img_1_105.jpeg"],
      projects: ["Automatic Hand Sanitizer Stand", "Smart Soil Moisture Monitor", "3D Custom Pen Cup Model"],
      hardware: ["Arduino Microcontroller Board", "Ultrasonic & Soil Sensors", "PLA 3D Printing Filament"]
    },
    { 
      id: "6", 
      label: "Grade 6", 
      file: "Grade 6 Book.pdf", 
      driveLink: "https://drive.google.com/file/d/1dZAcM0DdiKi0J1hL6LsVnK3Nrss-w5xT/view?usp=sharing",
      active: true, 
      desc: "Edge AI fundamentals using Raspberry Pi, smart city prototypes with IoT sensor networks, wireless communication modules, and introductory Python programming for hardware control.", 
      kitName: "AIR Edge AI & IoT Kit", 
      previews: [], 
      projects: ["Smart Traffic Controller", "Air Quality Monitor Station", "Wireless Home Automation"], 
      hardware: ["Raspberry Pi Zero W", "MQ Gas & Dust Sensors", "Wi-Fi & Bluetooth Modules"]
    },
    { 
      id: "7", 
      label: "Grade 7", 
      file: "Grade 7 Book.pdf", 
      driveLink: "https://drive.google.com/file/d/1cyR3Y8TROJKW00OUbyIBLubzVaBtacA9/view?usp=sharing",
      active: true, 
      desc: "Agricultural drone mechanics, telemetry and GPS tracking, autonomous navigation algorithms, remote sensing with camera modules, and field data collection systems.", 
      kitName: "AIR Drone & Telemetry Kit", 
      previews: [], 
      projects: ["GPS-Tracked Mini Drone", "Crop Health Scanner", "Autonomous Line-Following Drone"], 
      hardware: ["Quadcopter Frame & Motors", "GPS & Telemetry Modules", "FPV Camera & OSD Board"]
    },
    { 
      id: "8", 
      label: "Grade 8", 
      file: "Grade 8 Book.pdf", 
      driveLink: "https://drive.google.com/file/d/1znhR5x89opHNO_s5FcuZq3YLZXzBty9V/view?usp=sharing",
      active: true, 
      desc: "Python scripting for data analysis, computer vision with OpenCV, training and deploying simple AI models on edge devices, and building intelligent vision-enabled robotic systems.", 
      kitName: "AIR Python Vision AI Kit", 
      previews: [], 
      projects: ["Face Detection Security Camera", "Object Classifier with OpenCV", "Python Data Dashboard"], 
      hardware: ["Raspberry Pi 4 (4GB)", "Pi Camera Module v3", "OpenCV Vision AI Software Pack"]
    },
    { 
      id: "9", 
      label: "Grade 9", 
      file: "Grade 9 Book.pdf", 
      driveLink: "https://drive.google.com/file/d/1v2vEoswcbmEb1En_anDwTiLh3Oo3Jpta/view?usp=sharing",
      active: true, 
      desc: "Advanced mechanical design with CAD software, aerodynamics and flight mechanics, constructing and programming 4WD rovers, and applying physics principles to autonomous systems.", 
      kitName: "AIR Rover & Flight Design Kit", 
      previews: [], 
      projects: ["CAD-Designed Rover Chassis", "Aerodynamic Glider Build", "Terrain-Mapping 4WD Robot"], 
      hardware: ["4WD Robot Chassis Kit", "Fusion 360 CAD License", "IMU & Compass Navigation Sensors"]
    },
    { id: "10", label: "Grade 10", active: false, desc: "Curriculum expansion for machine learning models and industrial IoT meshes.", kitName: "Coming Soon", previews: [], projects: [], hardware: [] }
  ];

  const labImages = [
    "/pratham/PHOTO-2026-07-14-20-49-29.jpg",
    "/pratham/PHOTO-2026-07-14-20-49-29 (1).jpg",
    "/pratham/PHOTO-2026-07-14-20-49-30.jpg",
    "/pratham/PHOTO-2026-07-14-20-49-30 (1).jpg",
    "/pratham/PHOTO-2026-07-14-20-49-30 (2).jpg",
    "/pratham/PHOTO-2026-07-14-20-49-31.jpg",
    "/pratham/PHOTO-2026-07-14-20-49-32.jpg",
    "/pratham/PHOTO-2026-07-14-20-50-11.jpg",
    "/pratham/PHOTO-2026-07-14-20-50-11 (1).jpg"
  ];

  useEffect(() => {
    if (labImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % labImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [labImages.length]);

  // Initialize state with default items and quantities matching the PDF proposal
  const [zones, setZones] = useState([
    {
      name: "AI Computing & Software Department",
      shortName: "AI & Computing",
      icon: "memory",
      image: "/lab-ai.png",
      photos: ["/attachments/PHOTO-2026-07-10-14-56-31_2.jpg", "/attachments/PHOTO-2026-07-10-14-56-31.jpg"],
      items: [
        { name: "Bharat AI Engine (Education Edition) AI Platform with models, Local Server, LMS, Coding, Vision AI (10 System Software)", qty: 0, unitCost: 400000, isLot: false },
        { name: "Computer Systems (Intel Core i7, 8GB RAM, 512GB SSD, 22\" LED, Keyboard & Mouse)", qty: 0, unitCost: 50000, isLot: false },
        { name: "Smart TV (55\" 4K Samsung Vision AI)", qty: 0, unitCost: 55000, isLot: false },
        { name: "HD Webcam (Full HD)", qty: 0, unitCost: 2500, isLot: false },
        { name: "Pendrive (64GB)", qty: 0, unitCost: 800, isLot: false }
      ]
    },
    {
      name: "Robotics & Electronics Department",
      shortName: "Robotics",
      icon: "precision_manufacturing",
      image: "/lab-robotics.png",
      photos: ["/attachments/PHOTO-2026-07-10-14-56-30_2.jpg", "/attachments/PHOTO-2026-07-10-14-56-32_3.jpg", "/attachments/PHOTO-2026-07-10-14-56-31.jpg"],
      items: [
        { name: "AIR Robotics Learning Kits", qty: 0, unitCost: 4000, isLot: false },
        { name: "Arduino UNO Boards (Controller Board)", qty: 0, unitCost: 400, isLot: false },
        { name: "Breadboards", qty: 0, unitCost: 100, isLot: false },
        { name: "Jumper Wire Kits", qty: 0, unitCost: 100, isLot: false },
        { name: "Digital Multimeters", qty: 0, unitCost: 900, isLot: false },
        { name: "Soldering Gun", qty: 0, unitCost: 250, isLot: false },
        { name: "Tool Kit (sockets, ratchets, wrenches, screwdrivers)", qty: 0, unitCost: 1000, isLot: false },
        { name: "Motor Driver Modules", qty: 0, unitCost: 200, isLot: false }
      ]
    },
    {
      name: "Electronic Sensors Subcategory",
      shortName: "Sensors",
      icon: "sensors",
      image: "/lab-electronics.png",
      photos: ["/attachments/PHOTO-2026-07-10-14-56-32_3.jpg"],
      items: [
        { name: "Ultrasonic Sensors", qty: 0, unitCost: 100, isLot: false },
        { name: "PIR Sensors", qty: 0, unitCost: 100, isLot: false },
        { name: "IR Sensors", qty: 0, unitCost: 100, isLot: false },
        { name: "DHT11 Sensors", qty: 0, unitCost: 100, isLot: false },
        { name: "Soil Moisture Sensors", qty: 0, unitCost: 100, isLot: false },
        { name: "Rain Sensors", qty: 0, unitCost: 100, isLot: false },
        { name: "RFID Modules", qty: 0, unitCost: 100, isLot: false },
        { name: "Relay Modules", qty: 0, unitCost: 150, isLot: false },
        { name: "LDR Sensors", qty: 0, unitCost: 100, isLot: false },
        { name: "Buzzers", qty: 0, unitCost: 50, isLot: false },
        { name: "LED Kit (500+ LEDs)", qty: 0, unitCost: 1500, isLot: false },
        { name: "Resistor Kit (500+ Resistors)", qty: 0, unitCost: 1000, isLot: false },
        { name: "Capacitor Kit (500+ Capacitors)", qty: 0, unitCost: 1000, isLot: false }
      ]
    },
    {
      name: "Drone & VR Technologies",
      shortName: "Drone & VR",
      icon: "flight",
      image: "/lab-drone.png",
      photos: ["/attachments/PHOTO-2026-07-10-14-56-32_2.jpg"],
      items: [
        { name: "Drone Simulator Software with TX-RX Remote", qty: 0, unitCost: 6000, isLot: false },
        { name: "Meta Oculus Quest 3s (VR Technology)", qty: 0, unitCost: 45000, isLot: false }
      ]
    },
    {
      name: "3D Printing Technology",
      shortName: "3D Printing",
      icon: "print",
      image: "/lab-3dprinting.png",
      photos: ["/attachments/PHOTO-2026-07-10-14-56-32.jpg", "/attachments/PHOTO-2026-07-10-14-56-32_1.jpg", "/attachments/PHOTO-2026-07-10-14-56-30_1.jpg"],
      items: [
        { name: "Bamboo Labs A1 multicolor Printer", qty: 0, unitCost: 60000, isLot: false },
        { name: "Bambu Lab A1 Printer with Assembly", qty: 0, unitCost: 35000, isLot: false },
        { name: "Anycubic Printer with Assembly", qty: 0, unitCost: 25000, isLot: false },
        { name: "Filament PLA Pro+", qty: 0, unitCost: 1000, isLot: false }
      ]
    },
    {
      name: "Setup & Display Department",
      shortName: "Setup",
      icon: "stars",
      image: "/lab-smartlearning.png",
      photos: ["/attachments/PHOTO-2026-07-10-14-56-30.jpg", "/attachments/PHOTO-2026-07-10-14-56-31_1.jpg"],
      items: [
        { name: "Electrician Work", qty: 0, unitCost: 60000, isLot: true },
        { name: "Lab Setup/Installation", qty: 0, unitCost: 70000, isLot: true },
        { name: "Light Bundle", qty: 0, unitCost: 10000, isLot: true },
        { name: "Acrylic Lab Name (Entry)", qty: 0, unitCost: 6000, isLot: false },
        { name: "Acrylic Names, Stickers for Dept.", qty: 0, unitCost: 1200, isLot: false },
        { name: "Technology Acrylic Posters", qty: 0, unitCost: 2000, isLot: false },
        { name: "Information Boards PVC Foam", qty: 0, unitCost: 2000, isLot: false },
        { name: "Information Books Set", qty: 0, unitCost: 200, isLot: false }
      ]
    },
    {
      name: "Display Technology Models",
      shortName: "Models",
      icon: "smart_toy",
      image: "/lab-robotics.png",
      photos: ["/attachments/PHOTO-2026-07-10-14-56-30_2.jpg"],
      items: [
        { name: "Height Meter", qty: 0, unitCost: 8000, isLot: false },
        { name: "Smart Irrigation System", qty: 0, unitCost: 12000, isLot: false },
        { name: "Human Following Robot", qty: 0, unitCost: 6000, isLot: false },
        { name: "Touchless Sanitizer", qty: 0, unitCost: 4000, isLot: false },
        { name: "Obstacle Avoiding Robot", qty: 0, unitCost: 6000, isLot: false },
        { name: "Line Following Robot", qty: 0, unitCost: 6000, isLot: false },
        { name: "WiFi Controlled Robot", qty: 0, unitCost: 6000, isLot: false },
        { name: "Robotics ARM", qty: 0, unitCost: 6000, isLot: false }
      ]
    },
    {
      name: "Furniture Department",
      shortName: "Furniture",
      icon: "table_restaurant",
      image: "/lab-smartlearning.png",
      photos: ["/attachments/PHOTO-2026-07-10-14-56-31.jpg"],
      items: [
        { name: "Octagon Table", qty: 0, unitCost: 10000, isLot: false },
        { name: "Site Table", qty: 0, unitCost: 6000, isLot: false },
        { name: "Chair", qty: 0, unitCost: 2000, isLot: false }
      ]
    }
  ]);

  const updateQuantity = (zoneIdx: number, itemIdx: number, delta: number) => {
    setZones(prevZones => {
      const newZones = JSON.parse(JSON.stringify(prevZones));
      const item = newZones[zoneIdx].items[itemIdx];
      item.qty = Math.max(0, item.qty + delta);
      return newZones;
    });
  };

  const calculateZoneTotal = (zoneIdx: number) => {
    return zones[zoneIdx].items.reduce((sum, item) => sum + (item.qty * item.unitCost), 0);
  };

  const calculateBaseCost = () => {
  return zones.reduce((sum, _, zoneIdx) => sum + calculateZoneTotal(zoneIdx), 0);
};

const calculateGST = () => {
  return Math.round(calculateBaseCost() * 0.18);
};

const calculateGrandTotal = () => {
  return calculateBaseCost() + calculateGST();
};

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-IN");
  };

  const processSteps = [
    {
      step: "01",
      title: "Consultation & Architecture",
      desc: "Our engineering leads work with your academic team to survey school space and architect a customized lab floorplan.",
      icon: "architecture"
    },
    {
      step: "02",
      title: "Procurement & Delivery",
      desc: "AIR G sources industry-standard development boards, robotics, sensors, and 3D printing tech for dispatch.",
      icon: "local_shipping"
    },
    {
      step: "03",
      title: "Deployment & Commissioning",
      desc: "Certified field engineers complete physical installations, configuration of local servers, software, and LMS.",
      icon: "construction"
    },
    {
      step: "04",
      title: "Faculty Training & Curriculums",
      desc: "We run deep-dive bootcamps for your teaching faculty and supply complete books and classroom project sets.",
      icon: "school"
    }
  ];

  const outcomes = [
    "Artificial Intelligence & LLMs",
    "Prompt Engineering (Bharat AI)",
    "Python & C++ Coding",
    "Robotics Engineering",
    "IoT & Embedded Telemetry",
    "Computer Vision Models",
    "Drone Flying & Assembly",
    "3D Designing & Printing"
  ];

  const projectDetails: Record<string, { desc: string; components: string[]; difficulty: string; learning: string; impact: string }> = {
    "AI Smart Dustbin": {
      desc: "An automated waste management bin that detects approach using ultrasonic telemetry and automatically sorts dry/wet garbage using AI vision classification.",
      components: ["Arduino Uno", "Servo Motors", "Ultrasonic Sensor", "Camera Module"],
      difficulty: "Intermediate",
      learning: "Edge computing, Servo angle controls, Ultrasonic distance calculations.",
      impact: "Reduces manual waste sorting by 80% using localized vision AI."
    },
    "Human Following Robot": {
      desc: "An autonomous mobile rover that tracks and follows a specific human path using smart dual IR sensors and an ultrasonic collision avoidance module.",
      components: ["Geared DC Motors", "IR Sensor Array", "Motor Driver", "Arduino UNO"],
      difficulty: "Advanced",
      learning: "Sensor calibration, feedback loop tuning, differential drive logic.",
      impact: "Autonomous transport assistance in indoor workspaces."
    },
    "RFID Attendance System": {
      desc: "A contact-free identity logging device that verifies student credentials via 13.56MHz RFID cards and writes logs to a local Google Sheets database.",
      components: ["RC522 RFID Module", "ESP8266 Wi-Fi Chip", "OLED Display", "Buzzer"],
      difficulty: "Beginner",
      learning: "Serial communication, database logging, Wi-Fi networking.",
      impact: "Eliminates paper registers and speeds up attendance entry by 90%."
    },
    "Smart Irrigation System": {
      desc: "A self-watering agriculture grid that measures soil hydration and triggers a mini submersible pump to water plants only when moisture falls below 40%.",
      components: ["Soil Moisture Sensor", "5V Relay Module", "Water Pump", "ESP32 Controller"],
      difficulty: "Intermediate",
      learning: "Analog sensor reading, relay switching, micro-irrigation layout.",
      impact: "Saves up to 60% water usage in smart greenhouse deployments."
    },
    "Automatic Street Lights": {
      desc: "A smart grid simulator that automatically controls high-efficiency LED lights based on ambient illumination levels using LDR photo-resistors.",
      components: ["LDR Phototransistor", "Transistors", "Power LEDs", "Breadboard Core"],
      difficulty: "Beginner",
      learning: "Voltage divider circuits, transistor switching, energy conservation.",
      impact: "Minimizes civic electricity wastage by automating city lighting grids."
    },
    "AI Face Attendance": {
      desc: "A high-precision face recognition scanner running local OpenCV models on a Raspberry Pi to authenticate and register student attendance.",
      components: ["Raspberry Pi 4", "HQ Camera Module", "LCD Display Module", "Google Drive API"],
      difficulty: "Advanced",
      learning: "Computer vision, Python libraries (OpenCV), cloud API sync.",
      impact: "Ensures secure, tamper-proof student entry logs with 99% accuracy."
    },
    "Laser Security System": {
      desc: "An intruder detection grid that triggers a high-decibel alarm and sends a push notification to mobile devices if a laser beam path is broken.",
      components: ["Red Laser Diode", "Photo-resistor", "Active Buzzer", "Wi-Fi Telemetry Controller"],
      difficulty: "Beginner",
      learning: "Laser path alignments, buzzer frequencies, push alert triggers.",
      impact: "Affordable home/lab security grid with instant smart notification."
    },
    "Voice Controlled Robot": {
      desc: "A voice-activated robotic vehicle that processes natural speech commands over a Bluetooth interface to execute forward, reverse, and turn maneuvers.",
      components: ["Chassis & DC Motors", "HC-05 Bluetooth Module", "Android Speech App", "Microcontroller"],
      difficulty: "Intermediate",
      learning: "Bluetooth communication protocols, string command processing, motor driver wiring.",
      impact: "Hands-free mobility support and human-robot interface experience."
    }
  };

  const sampleProjects = [
    "AI Smart Dustbin",
    "Human Following Robot",
    "RFID Attendance System",
    "Smart Irrigation System",
    "Automatic Street Lights",
    "AI Face Attendance",
    "Laser Security System",
    "Voice Controlled Robot"
  ];

  return (
    <main className="relative min-h-screen bg-white selection:bg-primary/20 selection:text-primary overflow-x-hidden text-[#111827]">
      <Navbar />

      {/* Modern High-Tech CSS Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatUp {
          0% { transform: translateY(120px) rotate(0deg); opacity: 0; }
          20% { opacity: 0.25; }
          80% { opacity: 0.25; }
          100% { transform: translateY(-120px) rotate(360deg); opacity: 0; }
        }
        .animate-float-slow {
          animation: floatUp 15s linear infinite;
        }
        .animate-float-medium {
          animation: floatUp 10s linear infinite;
        }
        .animate-float-fast {
          animation: floatUp 7s linear infinite;
        }
        @keyframes scanLine {
          0% { top: -2%; }
          50% { top: 102%; }
          100% { top: -2%; }
        }
        .animate-scan {
          animation: scanLine 6s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .book-transform {
          transition: transform 0.6s cubic-bezier(0.2, 1, 0.3, 1), box-shadow 0.6s ease;
          transform-style: preserve-3d;
        }
        .group-hover-book:hover .book-transform {
          transform: rotateY(-32deg) rotateX(8deg) translateZ(20px);
          box-shadow: -20px 20px 40px rgba(0, 0, 0, 0.6), 0 0 40px rgba(238, 44, 60, 0.2);
        }
      `}} />

      <div id="pdet-page-content-wrapper" className="print:hidden">

        {/* Redesigned Premium Cyberpunk Hero Section with Indian Flag Theme */}
        <div 
          className="pt-40 pb-28 relative overflow-hidden border-b border-white/[0.04]"
          style={{
            background: 'radial-gradient(circle at 20% 20%, rgba(255, 103, 31, 0.35), transparent 60%), radial-gradient(circle at 80% 80%, rgba(19, 136, 8, 0.35), transparent 60%), radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15), transparent 45%), #0B0F19'
          }}
        >
          {/* Cyberpunk Grid Background Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* Floating High-Tech Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            <span className="absolute text-[8px] font-mono text-[#FF9933]/15 animate-float-slow left-[10%] top-[40%]">01</span>
            <span className="absolute text-[9px] font-mono text-white/10 animate-float-medium left-[25%] top-[80%]">&lt;AI&gt;</span>
            <span className="absolute text-[8px] font-mono text-[#138808]/20 animate-float-fast left-[80%] top-[30%]">+</span>
            <span className="absolute text-[10px] font-mono text-white/10 animate-float-slow left-[70%] top-[70%]">10</span>
            <span className="absolute text-[8px] font-mono text-[#FF9933]/20 animate-float-medium left-[85%] top-[60%]">[ROS2]</span>
            <span className="absolute text-[9px] font-mono text-[#138808]/15 animate-float-fast left-[15%] top-[20%]">IOT</span>
            <span className="absolute text-[8px] font-mono text-white/10 animate-float-slow left-[40%] top-[85%]">0</span>
            <span className="absolute text-[10px] font-mono text-primary/10 animate-float-medium left-[90%] top-[10%]">1</span>
          </div>

          {/* Rotating Ashoka Chakra Watermark */}
          <svg 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] opacity-[0.18] text-[#0038A8] pointer-events-none animate-[spin_180s_linear_infinite]" 
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.4" fill="none" />
            <circle cx="50" cy="50" r="8" stroke="currentColor" strokeWidth="1.2" fill="none" />
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24;
              return (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 42 * Math.cos((angle * Math.PI) / 180)}
                  y2={50 + 42 * Math.sin((angle * Math.PI) / 180)}
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
              );
            })}
          </svg>

          <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              
              {/* Left Content */}
              <div className="flex-1 w-full text-left">
                <div>
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/90 text-xs font-mono uppercase tracking-widest mb-8"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#FF9933] animate-pulse" />
                    <span>FUTURE READY EDUCATION</span>
                  </motion.div>
                  
                  <h1 className="font-headline text-5xl md:text-6xl lg:text-[76px] font-black tracking-tighter leading-[0.95] mb-8 uppercase text-left">
                    <span className="block overflow-hidden py-1">
                      <motion.span 
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="block bg-gradient-to-r from-[#FF9933] to-[#FF671F] text-transparent bg-clip-text"
                      >
                        AIR G
                      </motion.span>
                    </span>
                    <span className="block overflow-hidden py-1.5">
                      <motion.span 
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        className="block bg-gradient-to-r from-white via-slate-100 to-[#138808] text-transparent bg-clip-text"
                      >
                        INNOVATION LAB
                      </motion.span>
                    </span>
                  </h1>
                  
                  <div className="overflow-hidden mb-10 max-w-xl">
                    <motion.p 
                       initial={{ y: "100%", opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                       className="text-lg md:text-xl text-white/60 font-light leading-relaxed"
                    >
                      Complete AI, Robotics, IoT &amp; Emerging Technology Lab Proposal. Build your custom deployment quotation below.
                    </motion.p>
                  </div>

                  {/* Left Column Stats Cards */}
                  <div className="grid grid-cols-3 gap-4 max-w-xl">
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 text-left backdrop-blur-md">
                      <span className="text-[9px] text-[#FF9933] font-mono uppercase tracking-widest block mb-1">State Nodes</span>
                      <span className="text-xl md:text-2xl font-black font-headline text-white">50+ Labs</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 text-left backdrop-blur-md">
                      <span className="text-[9px] text-white/60 font-mono uppercase tracking-widest block mb-1">Empowered</span>
                      <span className="text-xl md:text-2xl font-black font-headline text-white">50k+ Kids</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 text-left backdrop-blur-md">
                      <span className="text-[9px] text-[#138808] font-mono uppercase tracking-widest block mb-1">Curriculums</span>
                      <span className="text-xl md:text-2xl font-black font-headline text-white">Grades 1-10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Hero Premium Image Card with 3D Tilt Hover Effect */}
              <div className="flex-1 w-full relative">
                {/* Backing Glows */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#138808]/20 via-[#0038A8]/10 to-[#FF9933]/25 rounded-[2.5rem] blur-2xl opacity-75 pointer-events-none" />
                
                {/* 3D tilt card */}
                <motion.div 
                  whileHover={{ rotateY: -6, rotateX: 6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative p-[2px] rounded-[2.5rem] bg-gradient-to-tr from-[#138808]/40 via-white/10 to-[#FF9933]/50 shadow-2xl cursor-pointer"
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                >
                  <div className="aspect-[4/3] rounded-[2.4rem] bg-slate-950/90 overflow-hidden relative group">
                    <img 
                      src={labImages[currentImageIndex]} 
                      alt="AIR G Innovation Lab" 
                      className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    
                    {/* Glowing scanning laser line */}
                    <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF9933] to-transparent opacity-90 animate-scan pointer-events-none z-20" />
                    {/* Matrix Scan lines overlay */}
                    <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(18,185,129,0)_50%,rgba(18,185,129,0.25)_50%)] bg-[size:100%_4px] pointer-events-none" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        {/* NEW SECTION: Video Tour */}
        <div className="py-16 bg-[#0B0F19] relative overflow-hidden text-left border-b border-white/[0.04]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
          <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Video on the Left */}
              <div className="lg:col-span-7">
                <div className="relative p-[2px] rounded-[2rem] bg-gradient-to-tr from-[#138808]/30 via-white/10 to-[#FF9933]/40 shadow-2xl">
                  <div className="aspect-video rounded-[1.9rem] bg-slate-950 overflow-hidden relative z-10 group pointer-events-auto">
                    {/* Floating Language Selector */}
                    <div className="absolute top-4 right-4 z-30 flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10 select-none">
                      <button
                        onClick={() => setVideoLang('en')}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                          videoLang === 'en'
                            ? 'bg-[#EE2C3C] text-white shadow-lg'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => setVideoLang('mr')}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                          videoLang === 'mr'
                            ? 'bg-[#EE2C3C] text-white shadow-lg'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        मराठी
                      </button>
                    </div>
                    <video
                      ref={schoolVideoRef}
                      src={videoLang === 'en' ? "/video/airg_labs_overview_compressed.mp4" : "/video/airg_labs_overview_marathi.mp4"}
                      controls
                      poster="/attachments/thumbnail.png"
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover pointer-events-auto cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              {/* Text on the Right */}
              <div className="lg:col-span-5 space-y-6 lg:pl-8">
                <span className="text-primary text-xs font-bold uppercase tracking-widest block font-mono">// EXPERIENCE AIR G LABS</span>
                <h2 className="text-4xl md:text-5xl font-headline font-black text-white uppercase tracking-tight leading-none">
                  Inside the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-white to-[#138808]">AIR G International</span> Labs
                </h2>
                <p className="text-white/60 text-lg font-light leading-relaxed">
                  Take a visual tour inside our state-of-the-art facilities. See where students build next-generation robotics, code custom AI models, print 3D prototypes, and master drone telemetry.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-white/70 bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933] animate-pulse" />
                    <span>Real-World Projects</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70 bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>Edge AI Platform</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70 bg-white/[0.03] border border-white/[0.08] px-4 py-2.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#138808] animate-pulse" />
                    <span>Hands-On Kits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        {/* Customization Workspace Section */}
        <div className="py-24 relative overflow-hidden border-b border-slate-100 bg-[#FAFAFA]">
          {/* Flag-inspired subtle glowing ambient blobs (soft light tints) */}
          <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-[#FF9933]/4 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-[#138808]/4 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-4">[ Live Calculator ]</span>
              <h2 className="text-4xl md:text-5xl font-headline font-black text-[#111827] uppercase tracking-tight">Configure Your School Lab</h2>
              <p className="text-slate-500 text-lg mt-4">Select items to dynamically estimate base costs, GST (18%), and compile a downloadable official quotation proposal.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Department List & Items Editor */}
              <div className="lg:col-span-7 space-y-6">
                {/* Zone Select Tabs Container */}
                <div className="relative">
                  {/* Fade overlays for scrolling indicator */}
                  <div className="absolute right-0 top-0 bottom-5 w-12 bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none z-10 block lg:hidden" />
                  
                  {/* Zone Select Tabs (Wrapped with no horizontal scroll) */}
                  <div className="flex flex-wrap gap-2 pb-5 border-b border-slate-200/60 pr-12 lg:pr-0">
                    {zones.map((zone, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveZone(idx)}
                        className={`px-3 py-2.5 md:px-5 md:py-3.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 border shrink-0 ${
                          activeZone === idx 
                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]" 
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                        style={{ 
                          backgroundColor: activeZone === idx ? '#EE2C3C' : '#ffffff',
                          borderColor: activeZone === idx ? '#EE2C3C' : '#e2e8f0',
                          color: activeZone === idx ? '#ffffff' : '#475569' 
                        }}
                      >
                        {zone.shortName}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Department Panel */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 text-left shadow-sm">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">{zones[activeZone].icon}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-primary font-mono uppercase tracking-widest block">Selected Sector</span>
                      <h3 className="font-headline text-2xl font-black text-[#111827] uppercase tracking-tight">{zones[activeZone].name}</h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {zones[activeZone].items.map((item, idx) => (
                      <div key={idx} className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-white hover:shadow-md hover:border-[#FF9933]/30 transition-all">
                        <div className="flex-1">
                          <h4 className="font-bold text-[#111827] text-sm md:text-base leading-snug">{item.name}</h4>
                          <span className="text-xs text-slate-500 mt-1 block">Unit Price: ₹{formatCurrency(item.unitCost)}</span>
                        </div>
                        <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(activeZone, idx, -1)}
                              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 font-bold transition-colors"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-bold text-slate-800 text-sm tabular-nums">{item.qty}</span>
                            <button 
                              onClick={() => updateQuantity(activeZone, idx, 1)}
                              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 font-bold transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right min-w-[90px]">
                            <span className="text-xs text-slate-500 block">Subtotal</span>
                            <span className="font-extrabold text-slate-900 text-sm md:text-base tabular-nums">
                              ₹{formatCurrency(item.qty * item.unitCost)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Summary & Checkout */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl border border-white/[0.04] text-left">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                  
                  <div className="relative z-10 space-y-6">
                    <h3 className="font-headline text-2xl font-black uppercase tracking-tight border-b border-white/[0.08] pb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">analytics</span>
                      Quotation Summary
                    </h3>

                    {/* Department subtotals breakdown */}
                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                      {zones.map((zone, idx) => {
                        const total = calculateZoneTotal(idx);
                        if (total === 0) return null;
                        return (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="text-white/60 truncate mr-4">{zone.name}</span>
                            <span className="font-mono text-white/90 shrink-0 font-bold">₹{formatCurrency(total)}</span>
                          </div>
                        );
                      })}
                      {calculateGrandTotal() === 0 && (
                        <div className="text-xs text-white/40 italic py-4 text-center">No items selected yet. Adjust quantities to calculate.</div>
                      )}
                    </div>

                    {/* Pricing Totals */}
                    <div className="border-t border-white/[0.08] pt-6 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/50">Base Price (Exclusive of GST)</span>
                        <span className="font-mono font-bold text-white/90">₹{formatCurrency(calculateBaseCost())}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white/50">GST (18%)</span>
                        <span className="font-mono font-bold text-white/90">₹{formatCurrency(calculateGST())}</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-white/[0.08] pt-4">
                        <div>
                          <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest block">Grand Total Cost</span>
                        </div>
                        <span className="text-2xl font-extrabold font-headline tracking-tighter text-primary tabular-nums">
                          ₹{formatCurrency(calculateGrandTotal())}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        const hasItems = zones.some(z => z.items.some(item => item.qty > 0));
                        if (!hasItems) {
                          alert("Please add at least one item before generating a quotation.");
                          return;
                        }
                        window.print();
                      }}
                      className="w-full py-4 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-primary/95 transition-all duration-300 shadow-lg shadow-primary/25 flex items-center justify-center gap-3 select-none hover:scale-[1.02] active:scale-95 mt-6"
                    >
                      <span>Download Quotation</span>
                      <span className="material-symbols-outlined text-sm">download</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* REDESIGNED SECTION: Premium Class Wise Curriculum & Book Downloads */}
        <div className="py-24 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 text-left overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16">
            <div className="max-w-3xl mb-16">
              <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-4">[ Class Wise Curriculum ]</span>
              <h2 className="text-4xl md:text-5xl font-headline font-black text-[#111827] uppercase tracking-tight">Academic Lab Publications</h2>
              <p className="text-[#111827]/60 text-lg mt-4">Select a standard grade below to preview curriculum focal points, associate hardware kits, and download official textbook publications.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Left Column: Futuristic Grade Selector Cards Grid */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3.5">
                  {gradesList.map((grade) => (
                    <button
                      key={grade.id}
                      onClick={() => {
                        if (grade.active) {
                          setSelectedGrade(grade.id);
                        }
                      }}
                      className={`relative overflow-hidden group p-5 rounded-[1.5rem] border text-left transition-all duration-500 flex flex-col justify-between min-h-[110px] select-none ${
                        !grade.active 
                          ? "bg-slate-50/60 border-slate-200/40 opacity-55 cursor-not-allowed" 
                          : selectedGrade === grade.id 
                            ? "bg-gradient-to-br from-primary to-[#9B1C26] border-primary shadow-xl shadow-primary/20 text-white scale-[1.02]" 
                            : "bg-white border-slate-200/80 text-slate-700 hover:border-primary/40 hover:shadow-md hover:scale-[1.01]"
                      }`}
                      disabled={!grade.active}
                      style={{
                        backgroundColor: !grade.active ? '#fafafa' : undefined,
                        borderColor: selectedGrade === grade.id ? '#EE2C3C' : undefined
                      }}
                    >
                      {/* Decorative corner tag for active state */}
                      {selectedGrade === grade.id && grade.active && (
                        <span className="absolute top-0 right-0 w-8 h-8 bg-white/10 rounded-bl-3xl flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        </span>
                      )}

                      <div className="flex items-center justify-between w-full">
                        <span className={`text-[10px] font-mono uppercase tracking-widest ${
                          !grade.active 
                            ? "text-slate-400" 
                            : selectedGrade === grade.id 
                              ? "text-white/70" 
                              : "text-primary font-bold"
                        }`}>
                          {!grade.active ? "Pipeline" : "Active Syllabus"}
                        </span>
                        {!grade.active && (
                          <span className="material-symbols-outlined text-[14px] text-slate-300">lock</span>
                        )}
                      </div>

                      <div className="mt-4">
                        <h4 className={`font-headline text-xl font-black uppercase tracking-tight ${
                          selectedGrade === grade.id && grade.active ? "text-white" : "text-slate-800"
                        }`}>
                          {grade.label}
                        </h4>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Immersive Glassmorphic Preview Dashboard */}
              <div className="lg:col-span-7 bg-slate-950 text-white rounded-[3rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between border border-white/[0.04] shadow-2xl">
                {/* Background glow effects */}
                <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
                
                {(() => {
                  const currentGrade = gradesList.find(g => g.id === selectedGrade) || gradesList[0];
                  
                  // Extract tech badges dynamically for visual premium feel
                  const badges = currentGrade.id === "1" 
                    ? ["Block Coding", "Scratch Jr", "Assemblies", "Gears", "Mechanics"]
                    : currentGrade.id === "2"
                      ? ["Circuits", "Sensors", "Automation", "LogicGates", "Robotics"]
                      : ["Arduino", "Python", "IoT", "3D Printing", "Telemetry"];

                  return (
                    <div className="h-full flex flex-col justify-between gap-8 relative z-10">
                      
                      {/* Top Row: Title, Badge, Description */}
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                          <div>
                            <span className="text-[10px] text-primary font-mono uppercase tracking-widest block font-bold">// Standard Syllabus Profile</span>
                            <h3 className="font-headline text-3xl font-black uppercase tracking-tight text-white mt-1">
                              {currentGrade.label} Publications
                            </h3>
                          </div>
                        </div>

                        {/* Enlarged Book mockup (Centered Layout) */}
                        <div className="flex justify-center items-center w-full py-8">
                          
                          {/* 3D-Like Enlarged CSS Book Cover Mockup */}
                          <div className="relative group/book shrink-0 group-hover-book perspective-1000">
                            {/* Book shadow glow */}
                            <div className="absolute inset-0 bg-primary/20 rounded-r-[2.5rem] blur-3xl group-hover/book:scale-110 transition-transform duration-500" />
                            
                            {/* Realistic Book structure */}
                            <div 
                              className="w-80 h-[26rem] rounded-r-[2.5rem] relative overflow-hidden flex flex-col justify-between p-8 border-l-[8px] border-primary shadow-2xl book-transform border border-white/[0.08]"
                              style={{ 
                                backgroundImage: 'url(/book-cover-template.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            >
                              {/* 3D Page edges stack simulation */}
                              <div className="absolute right-0 top-[3px] bottom-[3px] w-[24px] bg-slate-100 shadow-inner origin-right transition-transform duration-500"
                                   style={{ 
                                     transform: 'rotateY(90deg) translateZ(12px)',
                                     background: 'repeating-linear-gradient(to right, #eaeaea 0px, #eaeaea 2px, transparent 2px, transparent 4px)',
                                     borderRadius: '0 4px 4px 0'
                                   }} 
                              />
                              
                              {/* Book Spine reflection */}
                              <div className="absolute left-0 top-0 bottom-0 w-[16px] bg-white/5" />
                              
                              {/* Embossed Corner Borders */}
                              <div className="border border-white/10 rounded-[2rem] p-6 h-full flex flex-col justify-between items-center text-center relative z-10 bg-slate-950/40 backdrop-blur-[1px]">
                                
                                <div className="space-y-1.5">
                                  <div className="text-[10px] font-mono text-primary font-bold tracking-[0.25em]">AIR G LABS</div>
                                  <div className="text-[8px] text-white/60 uppercase tracking-widest">Official Curriculum</div>
                                </div>

                                <div className="my-auto flex flex-col items-center">
                                  <h4 className="text-4xl font-headline font-black text-white uppercase tracking-tight leading-none text-glow-red">
                                    {currentGrade.label}
                                  </h4>
                                </div>

                                <div className="w-full border-t border-white/15 pt-4 flex justify-end items-center">
                                  <span className="text-[8px] font-bold bg-primary/20 text-primary border border-primary/30 px-2.5 py-1 rounded-md uppercase tracking-widest">
                                    ACTIVE
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Bottom Row: Download Button */}
                      <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row gap-4">
                        <a 
                          href={currentGrade.driveLink || `#`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 py-4 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-primary/25 select-none hover:scale-[1.02] active:scale-95 shrink-0"
                        >
                          <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                          <span>View {currentGrade.label} Book (PDF)</span>
                        </a>
                      </div>

                    </div>
                  );
                })()}
              </div>

            </div>
          </div>
        </div>

        {/* NEW SECTION: Deployed Lab Infrastructure Moving Track (Dark Cinematic Theme) */}
        <div className="py-24 bg-[#0B0F19] border-y border-white/[0.04] overflow-hidden relative text-left">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16 mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-4">[ Live Deployments ]</span>
            <h2 className="text-4xl md:text-5xl font-headline font-black text-white uppercase tracking-tight">Ecosystem Spotlight</h2>
            <p className="text-white/60 text-lg mt-4">Actual photos of physical laboratory assets and students actively building Industry 4.0 innovations. Hover to focus.</p>
          </div>

          {/* Scrolling Track bounded by two borders */}
          <div className="w-full relative overflow-x-hidden border-y border-primary/50 py-12 bg-slate-950">
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes marquee-left {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee-left {
                display: flex;
                width: max-content;
                animation: marquee-left 45s linear infinite;
              }
              .animate-marquee-left:hover {
                animation-play-state: paused;
              }
            `}} />

            {/* Slide Row Container (duplicated to loop infinitely) */}
            <div className="animate-marquee-left gap-8 py-6">
              {labImages.concat(labImages).map((imgUrl, idx) => (
                <div 
                  key={idx}
                  className="w-[300px] sm:w-[420px] aspect-[4/3] rounded-[2.5rem] bg-white border border-slate-200/80 shadow-md hover:shadow-2xl overflow-hidden relative shrink-0 transition-all duration-500 hover:-translate-y-3 hover:border-primary/20 group cursor-pointer mr-8"
                >
                  <img 
                    src={imgUrl} 
                    alt="AIR G Setup" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BRAND NEW SECTION: Learning Outcomes & Projects Showcase (Warm Linen Theme) */}
        <div className="py-24 bg-gradient-to-b from-[#FAF6F0] to-white text-left border-b border-slate-100">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              {/* Left Column: Learning Outcomes list */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-4">[ Syllabus &amp; Outcomes ]</span>
                  <h2 className="text-4xl font-headline font-black text-[#111827] uppercase tracking-tight">Student Learning Outcomes</h2>
                  <p className="text-slate-500 mt-4">Setting up an AIR G lab provides students with structured, hand-on engineering pathways:</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                      <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                      <span className="text-[#111827] font-bold text-sm">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Sample projects students can build */}
              <div className="lg:col-span-7 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-xl border border-white/[0.04]">
                <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10">
                  <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-4">[ Build 50+ Projects ]</span>
                  <h3 className="text-3xl font-headline font-black uppercase tracking-tight mb-6">Real-World Student Inventions</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                    {sampleProjects.map((project, idx) => {
                      const isHovered = hoveredProject === project;
                      const details = projectDetails[project];
                      return (
                        <div 
                          key={idx} 
                          className={`flex flex-col bg-white/[0.03] border border-white/[0.06] p-5 rounded-2xl transition-all cursor-pointer text-left ${
                            isHovered 
                              ? "bg-white/[0.08] border-primary/50 shadow-lg" 
                              : "hover:bg-white/[0.05]"
                          }`}
                          onMouseEnter={() => setHoveredProject(project)}
                          onMouseLeave={() => setHoveredProject(null)}
                          onClick={() => setHoveredProject(hoveredProject === project ? null : project)}
                        >
                          <div className="flex items-center gap-4 w-full">
                            <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-all ${
                              isHovered ? "bg-primary text-white" : "bg-primary/20 text-primary"
                            }`}>
                              {idx + 1}
                            </span>
                            <span className={`font-bold text-sm transition-colors flex-1 ${
                              isHovered ? "text-white" : "text-white/80"
                            }`}>{project}</span>
                            {details && (
                              <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider ${
                                details.difficulty === "Beginner" ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" :
                                details.difficulty === "Intermediate" ? "bg-amber-500/10 border border-amber-500/30 text-amber-400" :
                                "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                              }`}>
                                {details.difficulty}
                              </span>
                            )}
                          </div>

                          <AnimatePresence>
                            {isHovered && details && (
                              <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden border-t border-white/10 pt-4 space-y-3"
                              >
                                <p className="text-xs text-white/70 font-light leading-relaxed">
                                  {details.desc}
                                </p>
                                
                                <div className="space-y-2 text-[11px] text-white/60">
                                  <div>
                                    <span className="font-semibold text-[#FF9933]">Key Learning:</span> {details.learning}
                                  </div>
                                  <div>
                                    <span className="font-semibold text-[#138808]">Real-World Impact:</span> {details.impact}
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-1.5 items-center pt-2">
                                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest mr-1">Hardware:</span>
                                  {details.components.map((comp, cIdx) => (
                                    <span key={cIdx} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[9px] text-white/60">
                                      {comp}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BRAND NEW SECTION: Implant Faculty Training Program (Redesigned & Positioned at the End) */}
        <div className="py-24 bg-[#0a0d16] border-t border-white/[0.04] text-left relative overflow-hidden">
          {/* Cyberpunk Grid Background Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
          <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-[1600px] mx-auto px-6 md:px-16 relative z-10">
            <div className="max-w-3xl mb-16">
              <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-4">[ Faculty Accreditation ]</span>
              <h2 className="text-4xl md:text-5xl font-headline font-black text-white uppercase tracking-tight">Implant Training Program 2026</h2>
              <p className="text-white/60 text-lg mt-4">
                Ensure your teaching faculty are fully certified to instruct. Register for the official teacher training program. Secure slots by paying half fee, or clear full fee for lifetime curriculum access and physical lab hardware kits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
              
              {/* Option 1: Half Fee Card */}
              <div className="bg-slate-950/60 border border-white/10 rounded-[2rem] p-8 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all duration-300">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest block">// SECURE SLOT</span>
                  <h4 className="text-2xl font-headline font-black text-white uppercase tracking-tight">Phase 1 (Half Fee)</h4>
                  <p className="text-white/50 text-sm leading-relaxed font-light">
                    Secure your batch slot immediately and get instant access to the phase 1 curriculum modules, live coaching sessions, and online hardware simulator workspaces.
                  </p>
                  <div className="pt-4">
                    <span className="text-3xl font-headline font-black text-white">₹3,000</span>
                    <span className="text-white/40 text-xs font-mono ml-2">/ Half Registration</span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/15">
                  <a 
                    href="https://wa.me/919860779172?text=Hello%2C%20I%20want%20to%20register%20for%20the%20AIR%20G%20Implant%20Training%20Program%20by%20paying%20the%20Half%20Fee%20(₹3%2C000)."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 border border-white/25 hover:scale-[1.02] active:scale-95 text-center"
                  >
                    <span className="material-symbols-outlined text-sm">payments</span>
                    <span>Register Half Fee</span>
                  </a>
                </div>
              </div>

              {/* Option 2: Full Fee Card */}
              <div className="bg-slate-950 border border-primary/50 rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl shadow-primary/10 relative hover:border-primary transition-all duration-300">
                <div className="absolute top-6 right-6">
                  <span className="text-[8px] font-bold bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded uppercase tracking-widest">RECOMMENDED</span>
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest block">// FULL PROGRAM ACCREDITATION</span>
                  <h4 className="text-2xl font-headline font-black text-white uppercase tracking-tight">Lifetime Access (Full Fee)</h4>
                  <p className="text-white/50 text-sm leading-relaxed font-light">
                    Get unrestricted lifetime access to all advanced curriculum phases, official training physical hardware kits dispatched to your location, priority doubt solving, and certified completions.
                  </p>
                  <div className="pt-4">
                    <span className="text-3xl font-headline font-black text-white">₹6,000</span>
                    <span className="text-white/40 text-xs font-mono ml-2">/ Complete Course</span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/15">
                  <a 
                    href="https://wa.me/919860779172?text=Hello%2C%20I%20want%20to%20register%20for%20the%20AIR%20G%20Implant%20Training%20Program%20by%20paying%20the%20Full%20Fee%20(₹6%2C000)."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-95 text-center"
                  >
                    <span className="material-symbols-outlined text-sm">workspace_premium</span>
                    <span>Register Full Fee</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* PRINT-ONLY QUOTATION TEMPLATE */}
      <div id="pdet-receipt-print-root" style={{ display: 'none' }}>
        <style dangerouslySetInnerHTML={{__html: `
          @page {
            size: A4;
            margin: 15mm;
          }
          @media print {
            #pdet-page-content-wrapper,
            nav,
            .print\\:hidden {
              display: none !important;
            }
            #pdet-receipt-print-root {
              display: block !important;
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              background: white !important;
              color: black !important;
              font-family: Arial, Helvetica, sans-serif !important;
              font-size: 11px !important;
              line-height: 1.5 !important;
            }
            #pdet-receipt-print-root * {
              color-adjust: exact !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        `}} />
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '3px solid #EE2C3C', paddingBottom: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#EE2C3C', letterSpacing: '-0.5px' }}>AIR G INTERNATIONAL</div>
            <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>AI, Robotics, IoT &amp; Emerging Technology Lab Setup (NGO Proposal)</div>
            <div style={{ fontSize: '10px', color: '#666' }}>Official Infrastructure Setup Proposal &amp; Quotation</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#333' }}>LAB SETUP QUOTATION</div>
            <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Date: {new Date().toLocaleDateString("en-IN")}</div>
          </div>
        </div>

        {/* Zone Tables */}
        {zones.map((zone, zIdx) => {
          const selectedItems = zone.items.filter(item => item.qty > 0);
          if (selectedItems.length === 0) return null;

          return (
            <div key={zIdx} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px', marginBottom: '16px', pageBreakInside: 'avoid' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#EE2C3C', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '8px' }}>
                Department {String(zIdx + 1).padStart(2, '0')}: {zone.name}
              </div>
              <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ccc' }}>
                    <th style={{ textAlign: 'left', paddingBottom: '6px', color: '#555', fontWeight: 600 }}>Equipment Item</th>
                    <th style={{ width: '60px', textAlign: 'center', paddingBottom: '6px', color: '#555', fontWeight: 600 }}>Qty</th>
                    <th style={{ width: '100px', textAlign: 'right', paddingBottom: '6px', color: '#555', fontWeight: 600 }}>Unit Price</th>
                    <th style={{ width: '110px', textAlign: 'right', paddingBottom: '6px', color: '#555', fontWeight: 600 }}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item, iIdx) => (
                    <tr key={iIdx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '6px 0', color: '#333' }}>{item.name}</td>
                      <td style={{ padding: '6px 0', textAlign: 'center', color: '#444' }}>{item.isLot ? `${item.qty} Lot` : item.qty}</td>
                      <td style={{ padding: '6px 0', textAlign: 'right', color: '#444' }}>₹{formatCurrency(item.unitCost)}</td>
                      <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600, color: '#222' }}>₹{formatCurrency(item.qty * item.unitCost)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ textAlign: 'right', marginTop: '8px', fontSize: '12px', fontWeight: 700, color: '#333' }}>
                Department Subtotal: ₹{formatCurrency(calculateZoneTotal(zIdx))}
              </div>
            </div>
          );
        })}

        {/* ═══════ GRAND TOTAL ═══════ */}
        <div style={{ marginTop: '24px', borderTop: '3px solid #EE2C3C', paddingTop: '20px', pageBreakInside: 'avoid' }}>
          <table style={{ width: '100%', fontSize: '12px' }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, fontSize: '12px', color: '#111' }}>BASE COST (EXCL. GST)</td>
                <td style={{ textAlign: 'right', fontWeight: 700, fontSize: '14px', color: '#555' }}>
                  ₹{formatCurrency(calculateBaseCost())}
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, fontSize: '12px', color: '#111' }}>GST (18%)</td>
                <td style={{ textAlign: 'right', fontWeight: 700, fontSize: '14px', color: '#555' }}>
                  ₹{formatCurrency(calculateGST())}
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, fontSize: '16px', color: '#111', paddingTop: '10px' }}>GRAND TOTAL COST (INCL. GST)</td>
                <td style={{ textAlign: 'right', fontWeight: 900, fontSize: '28px', color: '#EE2C3C', letterSpacing: '-1px', paddingTop: '10px' }}>
                  ₹{formatCurrency(calculateGrandTotal())}
                </td>
              </tr>
              <tr>
                <td style={{ color: '#888', fontSize: '10px' }}>All configured department(s) included</td>
                <td style={{ textAlign: 'right', color: '#888', fontSize: '10px' }}></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Terms & Footer */}
        <div style={{ marginTop: '24px', paddingTop: '12px', borderTop: '1px solid #eee', fontSize: '9px', color: '#999', pageBreakInside: 'avoid' }}>
          <div style={{ fontWeight: 700, color: '#555', marginBottom: '4px' }}>Terms & Conditions:</div>
          <div>1. This PDF quotation is generated based on selected lab customizations.</div>
          <div>2. Pricing includes 18% GST as per statutory guidelines for NGO/educational projects.</div>
          <div>3. Valid for 30 days from generation date.</div>
        </div>

        <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #eee', textAlign: 'center', fontSize: '9px', color: '#aaa' }}>
          <div>AIR G International — Designing, Building, and Empowering Industry 4.0 Ecosystems Globally.</div>
          <div style={{ marginTop: '2px' }}>For support or proposal requests, contact: support@airg.international</div>
        </div>
      </div>
    </main>
  );
}
