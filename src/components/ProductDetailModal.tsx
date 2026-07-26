"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Product {
  name: string;
  price: string;
  img: string;
  tag: string;
  desc: string;
}

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToBag: (product: any) => void;
}

// Authentic product data mapping based on the exact PDFs from the "kits info" downloads folder
const productDataMap: Record<string, {
  cleanDesc: string;
  objectives: string[];
  components: { name: string; qty: number }[];
}> = {
  "Touchless Hand Dispenser Kit": {
    cleanDesc: "A Touchless Hand Sanitizer Dispenser is an automatic hygiene system designed to dispense sanitizer without physical contact. Using sensors and a microcontroller, the device detects the presence of a hand and activates the dispenser automatically, ensuring safe, hygienic, and efficient sanitization.",
    objectives: [
      "Promote hygiene and safety",
      "Reduce physical contact",
      "Learn sensor automation",
      "Understand Arduino interfacing",
      "Create smart automation system"
    ],
    components: [
      { name: "IR Sensor", qty: 1 },
      { name: "Relay Module", qty: 1 },
      { name: "Water Pump", qty: 1 },
      { name: "Battery Pack", qty: 1 },
      { name: "Breadboard", qty: 1 },
      { name: "Jumper Wires", qty: 20 },
      { name: "Pipe", qty: 1 }
    ]
  },
  "Smart Notice Board": {
    cleanDesc: "The Smart Notice Board is an IoT-based communication system that allows messages and notices to be displayed digitally using a microcontroller and wireless communication technology. Notices can be updated remotely through Wi-Fi, Bluetooth, or mobile applications without manually changing the display.",
    objectives: [
      "To display notices and messages digitally in real time",
      "To reduce manual effort and paper usage",
      "To understand wireless communication and IoT concepts",
      "To learn interfacing of displays with microcontrollers",
      "To develop a remote message updating system"
    ],
    components: [
      { name: "NodeMCU ESP8266", qty: 1 },
      { name: "LCD Display (16x2)", qty: 1 },
      { name: "Breadboard", qty: 1 },
      { name: "Jumper Wires", qty: 20 },
      { name: "USB Cable", qty: 1 }
    ]
  },
  "Smart Traffic Light System": {
    cleanDesc: "The Smart Traffic Light System is an automation-based traffic management project that controls traffic signals intelligently using sensors and a microcontroller. The system monitors vehicle density on roads and adjusts the timing of traffic lights automatically to improve traffic flow and reduce congestion.",
    objectives: [
      "To automate traffic signal control based on vehicle movement",
      "To reduce traffic congestion and waiting time",
      "To understand sensor interfacing with microcontrollers",
      "To learn automation and embedded system concepts",
      "To improve efficient traffic management techniques",
      "To develop a smart and intelligent traffic control system"
    ],
    components: [
      { name: "Arduino Uno", qty: 1 },
      { name: "LED", qty: 3 },
      { name: "Resistor", qty: 3 },
      { name: "Breadboard", qty: 1 },
      { name: "Jumper Wires", qty: 20 },
      { name: "Battery Pack", qty: 1 },
      { name: "USB Cable", qty: 1 }
    ]
  },
  "Temperature Monitoring System": {
    cleanDesc: "A real-time environmental climate tracking setup designed to measure ambient temperature and relative humidity using sensors, processing raw data for logging, status output, and alert triggering.",
    objectives: [
      "To measure and monitor temperature/humidity levels accurately",
      "To learn interfacing of temperature/humidity sensors",
      "To understand signal conversion and display output systems",
      "To build threshold-based alarm systems"
    ],
    components: [
      { name: "NodeMCU ESP8266 / Arduino", qty: 1 },
      { name: "DHT11 Temperature & Humidity Sensor", qty: 1 },
      { name: "LCD Display (16x2)", qty: 1 },
      { name: "Buzzer", qty: 1 },
      { name: "Breadboard", qty: 1 },
      { name: "Jumper Wires", qty: 20 }
    ]
  },
  "Soil Moisture Monitoring System": {
    cleanDesc: "The Soil Moisture Monitoring System is an automation and environmental monitoring project used to measure the moisture level present in soil. It uses a soil moisture sensor to detect the water content in the soil and sends the data to a microcontroller for monitoring and control.",
    objectives: [
      "To measure and monitor soil moisture levels accurately",
      "To improve efficient water usage in agriculture",
      "To understand the working of soil moisture sensors",
      "To learn sensor interfacing with Arduino and embedded systems",
      "To automate irrigation monitoring processes",
      "To prevent overwatering and underwatering of plants",
      "To develop a smart farming and environmental monitoring system"
    ],
    components: [
      { name: "NodeMCU ESP8266", qty: 1 },
      { name: "Soil Moisture Sensor", qty: 1 },
      { name: "Breadboard", qty: 1 },
      { name: "Jumper Wires", qty: 20 },
      { name: "USB Cable", qty: 1 }
    ]
  },
  "Smart Dustbin System": {
    cleanDesc: "The Smart Dustbin System is an automatic waste management project that uses sensors and a microcontroller to open the dustbin lid without physical contact. When a person’s hand approaches the sensor, the system detects the motion and automatically opens the lid using a servo motor.",
    objectives: [
      "To develop a touchless and automatic dustbin system",
      "To promote cleanliness and hygiene in public and private places",
      "To reduce human contact with waste materials",
      "To understand sensor and servo motor interfacing with Arduino",
      "To improve smart waste management techniques"
    ],
    components: [
      { name: "Arduino Uno", qty: 1 },
      { name: "Ultrasonic Sensor", qty: 1 },
      { name: "Servo Motor", qty: 1 },
      { name: "Battery Pack", qty: 1 },
      { name: "Dustbin Model", qty: 1 },
      { name: "Jumper Wires", qty: 20 }
    ]
  },
  "Rain Detection System Kit": {
    cleanDesc: "The Rain Detection System is an automatic weather monitoring project that detects the presence of rain using a rain sensor module. When raindrops fall on the sensor surface, the system senses moisture and sends a signal to the microcontroller, which can activate alarms, motors, or notifications automatically.",
    objectives: [
      "To detect rainwater or moisture on the sensing surface automatically",
      "To understand rain sensor module interfacing",
      "To trigger automated responses like buzzers or alarm indicators",
      "To develop weather-responsive automated home systems"
    ],
    components: [
      { name: "Rain Sensor Module", qty: 1 },
      { name: "Buzzer", qty: 1 },
      { name: "LED", qty: 2 },
      { name: "Battery Pack", qty: 1 },
      { name: "Breadboard", qty: 1 },
      { name: "Jumper Wires", qty: 20 }
    ]
  },
  "Smart Parking System": {
    cleanDesc: "The Smart Car Parking System is an automation and monitoring project designed to manage vehicle parking efficiently using sensors and a microcontroller. The system detects the availability of parking slots and provides real-time information through displays, LEDs, or IoT platforms.",
    objectives: [
      "To detect available and occupied parking spaces automatically",
      "To reduce vehicle congestion and parking time",
      "To understand sensor interfacing and automation systems",
      "To learn microcontroller and IoT-based monitoring techniques",
      "To improve efficient parking space management",
      "To provide real-time parking status indication"
    ],
    components: [
      { name: "NodeMCU ESP8266", qty: 1 },
      { name: "IR Sensor", qty: 1 },
      { name: "LED", qty: 1 },
      { name: "Breadboard", qty: 1 },
      { name: "Jumper Wires", qty: 20 },
      { name: "USB Cable", qty: 1 }
    ]
  },
  "Motion Detection Alert System": {
    cleanDesc: "The Motion Detection Alert System is a security and automation project that detects human movement using a motion sensor and generates an alert through a buzzer, LED, or notification system. The sensor continuously monitors the surrounding area, and when motion is detected, the microcontroller activates the alert system automatically.",
    objectives: [
      "To detect human motion automatically using sensors",
      "To provide security alerts for unauthorized movement",
      "To understand the working of motion detection sensors",
      "To learn sensor interfacing with Arduino and embedded systems",
      "To develop a smart security and monitoring system"
    ],
    components: [
      { name: "NodeMCU ESP8266", qty: 1 },
      { name: "PIR Sensor", qty: 1 },
      { name: "Buzzer", qty: 1 },
      { name: "LED", qty: 1 },
      { name: "Breadboard", qty: 1 },
      { name: "Jumper Wires", qty: 20 }
    ]
  },
  "Gas Leakage Detection System": {
    cleanDesc: "The Gas Leakage Detection System is a safety and monitoring project designed to detect the presence of harmful or combustible gases in the environment. It uses a gas sensor to continuously monitor gas levels and alerts users through a buzzer, LED, or notification system when gas concentration exceeds a safe limit.",
    objectives: [
      "To detect harmful or combustible gas leakage automatically",
      "To provide early warning alerts using buzzer or LEDs",
      "To improve safety in homes and industrial environments",
      "To understand the working of gas sensors and embedded systems",
      "To learn sensor interfacing with Arduino or microcontrollers",
      "To develop a real-time gas monitoring and alert system",
      "To reduce the risk of fire hazards and accidents"
    ],
    components: [
      { name: "NodeMCU ESP8266", qty: 1 },
      { name: "MQ-2 Gas Sensor", qty: 1 },
      { name: "Buzzer", qty: 1 },
      { name: "LED", qty: 1 },
      { name: "Breadboard", qty: 1 },
      { name: "Jumper Wires", qty: 20 }
    ]
  },
  "Automatic Street Light System": {
    cleanDesc: "The Automatic Street Light System is a smart lighting project that automatically controls street lights based on surrounding light intensity. It uses an LDR (Light Dependent Resistor) sensor to detect daylight and darkness. When the environment becomes dark, the system automatically turns ON the street lights, and during daylight, the lights turn OFF automatically.",
    objectives: [
      "To automatically control street lights based on surrounding light conditions",
      "To reduce unnecessary power consumption and save energy",
      "To understand the working of LDR sensors and automation systems",
      "To learn sensor interfacing with Arduino or electronic circuits",
      "To develop a smart and efficient lighting system",
      "To minimize manual operation of street lights"
    ],
    components: [
      { name: "LDR Sensor", qty: 1 },
      { name: "Relay Module", qty: 1 },
      { name: "LED / Light", qty: 1 },
      { name: "Resistor", qty: 1 },
      { name: "Battery Pack", qty: 1 },
      { name: "Breadboard", qty: 1 },
      { name: "Jumper Wires", qty: 20 }
    ]
  },
  "Water Level Indicator Kit": {
    cleanDesc: "The Water Level Indicator is an electronic monitoring system used to detect and indicate the level of water in a tank or container. It uses sensors and a microcontroller to monitor different water levels and provides alerts through LEDs, buzzers, or displays when the water reaches specific levels.",
    objectives: [
      "To monitor the water level in tanks and containers",
      "To prevent water overflow and wastage",
      "To understand water sensing and level detection techniques",
      "To learn sensor interfacing with Arduino",
      "To provide automatic alerts using LEDs or buzzers",
      "To improve efficient water management systems"
    ],
    components: [
      { name: "Water Level Sensor", qty: 1 },
      { name: "Buzzer", qty: 1 },
      { name: "LED", qty: 3 },
      { name: "Resistors", qty: 3 },
      { name: "Battery Pack", qty: 1 },
      { name: "Breadboard", qty: 1 },
      { name: "Jumper Wires", qty: 20 }
    ]
  },
  "Bluetooth Controlled Car": {
    cleanDesc: "The Bluetooth Controlled Car is a wireless robotic vehicle that can be controlled remotely using a smartphone or Bluetooth-enabled device. The system uses a Bluetooth module and a microcontroller to receive commands and control the movement of the motors in different directions.",
    objectives: [
      "To build a smartphone-controlled robotic car",
      "To learn wireless communication using Bluetooth protocols",
      "To control DC motors via L298N driver module",
      "To understand autonomous and manual robotic drive states"
    ],
    components: [
      { name: "Arduino Uno", qty: 1 },
      { name: "Bluetooth Module HC-05", qty: 1 },
      { name: "Motor Driver L298N", qty: 1 },
      { name: "Chassis", qty: 1 },
      { name: "Batteries", qty: 4 },
      { name: "Jumper Wires", qty: 20 }
    ]
  },
  "Obstacle Avoiding Robot": {
    cleanDesc: "The Obstacle Avoiding Robot is an autonomous robotic system that detects and avoids obstacles automatically using sensors and a microcontroller. The robot continuously monitors its surroundings with an ultrasonic sensor, and when an obstacle is detected, it changes direction to avoid collision.",
    objectives: [
      "To develop an autonomous robot capable of avoiding obstacles",
      "To understand the working of ultrasonic sensors and motor control",
      "To learn robotics and embedded system concepts",
      "To implement automatic navigation and movement control"
    ],
    components: [
      { name: "Arduino Uno", qty: 1 },
      { name: "Ultrasonic Sensor", qty: 1 },
      { name: "Servo Motor", qty: 1 },
      { name: "Motor Driver L298N", qty: 1 },
      { name: "Chassis", qty: 1 },
      { name: "Batteries", qty: 4 },
      { name: "Jumper Wires", qty: 20 }
    ]
  },
  "Line Following Robot": {
    cleanDesc: "The Line Following Robot is an autonomous robotic system designed to follow a predefined path or line using IR sensors and a microcontroller. The robot continuously detects the position of the line and controls the motors accordingly to stay on the path.",
    objectives: [
      "To develop an autonomous robot capable of following a path automatically",
      "To understand the working of IR sensors and motor control systems",
      "To learn robotics and embedded system concepts",
      "To implement automatic navigation and path detection techniques",
      "To improve knowledge of Arduino programming and sensor interfacing",
      "To demonstrate real-time line detection and movement control"
    ],
    components: [
      { name: "Arduino Uno", qty: 1 },
      { name: "IR Sensor", qty: 2 },
      { name: "Motor Driver L298N", qty: 1 },
      { name: "Chassis", qty: 1 },
      { name: "Batteries", qty: 4 },
      { name: "Jumper Wires", qty: 20 }
    ]
  }
};

export default function ProductDetailModal({ product, isOpen, onClose, onAddToBag }: ProductDetailModalProps) {
  const [added, setAdded] = useState(false);

  // Prevent body scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!product) return null;

  // Retrieve matching specs or fall back
  const kitInfo = productDataMap[product.name] || {
    cleanDesc: product.desc,
    objectives: [
      "Understand standard hardware components and wiring layouts",
      "Learn microcontroller interfacing and driver calibration",
      "Develop diagnostic logic and testing methodologies"
    ],
    components: [
      { name: "Primary Sensor Module", qty: 1 },
      { name: "Controller Interconnect board", qty: 1 },
      { name: "Hookup Jumper wire set", qty: 1 },
      { name: "Step-by-step schematic manual", qty: 1 }
    ]
  };

  const handleAddClick = () => {
    onAddToBag(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/65 backdrop-blur-md">
          {/* Backdrop click closer */}
          <div className="absolute inset-0 cursor-default" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-[950px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden z-10 border border-black/10 flex flex-col my-auto max-h-[90vh] md:max-h-[85vh]"
          >
            {/* Header controls */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-black/5 bg-[#fafafa]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">precision_manufacturing</span>
                <span className="font-mono text-xs font-black uppercase tracking-widest text-[#1a1a2e]">
                  Product Specifications & Documentation
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-black/5 hover:border-primary/25 hover:text-primary flex items-center justify-center transition-all bg-white shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                
                {/* Left Side: Product Image & Badges */}
                <div className="md:col-span-5 flex flex-col gap-6">
                  <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-black/5 p-8 flex items-center justify-center shadow-inner group">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary/10 border border-primary/25 rounded-full text-[8px] font-black font-mono text-primary uppercase tracking-widest">
                      {product.tag}
                    </span>
                  </div>

                  {/* Trust badges */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="glass-premium p-3 rounded-2xl border border-black/5 flex flex-col items-center text-center gap-1">
                      <span className="material-symbols-outlined text-primary text-lg">verified</span>
                      <span className="text-[8px] font-bold font-mono text-[#1a1a2e]/60 uppercase tracking-tight">Certified Kit</span>
                    </div>
                    <div className="glass-premium p-3 rounded-2xl border border-black/5 flex flex-col items-center text-center gap-1">
                      <span className="material-symbols-outlined text-primary text-lg">school</span>
                      <span className="text-[8px] font-bold font-mono text-[#1a1a2e]/60 uppercase tracking-tight">Curriculum Sync</span>
                    </div>
                    <div className="glass-premium p-3 rounded-2xl border border-black/5 flex flex-col items-center text-center gap-1">
                      <span className="material-symbols-outlined text-primary text-lg">local_shipping</span>
                      <span className="text-[8px] font-bold font-mono text-[#1a1a2e]/60 uppercase tracking-tight">Maharashtra Wide</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Product Details & Specs */}
                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-headline font-black text-[#1a1a2e] uppercase tracking-tight leading-tight">
                        {product.name}
                      </h3>
                      <div className="text-xl font-mono font-bold text-primary mt-2">
                        {product.price}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold font-mono text-primary uppercase tracking-widest">Project Overview</h4>
                      <p className="text-xs sm:text-sm text-[#1a1a2e]/70 leading-relaxed font-body font-light">
                        {kitInfo.cleanDesc}
                      </p>
                    </div>

                    {/* Project Objectives */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold font-mono text-primary uppercase tracking-widest">Project Objectives</h4>
                      <ul className="list-disc list-inside text-xs text-[#1a1a2e]/70 space-y-1 font-body font-light">
                        {kitInfo.objectives.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Components Required */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-[10px] font-bold font-mono text-primary uppercase tracking-widest">Components Included</h4>
                      <div className="border border-black/5 rounded-2xl overflow-hidden divide-y divide-black/5 bg-[#fafafa]">
                        {kitInfo.components.map((comp, i) => (
                          <div key={i} className="grid grid-cols-12 p-3 text-[11px] gap-2 items-center">
                            <span className="col-span-8 font-mono font-bold text-[#1a1a2e]/80 uppercase tracking-wider">{comp.name}</span>
                            <span className="col-span-4 text-right text-[#1a1a2e]/50 font-sans font-bold">Qty: {comp.qty}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add to Bag and Checkout Info */}
                  <div className="pt-8 mt-6 border-t border-black/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col text-left w-full sm:w-auto">
                      <span className="text-[9px] font-bold font-mono text-[#1a1a2e]/30 uppercase tracking-widest">Availability</span>
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                        In Stock (Ready to dispatch)
                      </span>
                    </div>
                    <button
                      onClick={handleAddClick}
                      className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all font-mono flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
                        added 
                          ? "bg-emerald-600 text-white hover:bg-emerald-700" 
                          : "bg-primary text-[#1a1a2e] hover:bg-[#eb0028]/95 hover:scale-[1.02] active:scale-[0.98] glow-red"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {added ? "done" : "shopping_bag"}
                      </span>
                      {added ? "Added to Bag!" : "Add to Bag"}
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
