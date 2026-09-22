export interface PurchaseItemData {
  sr_no: number;
  category: string;
  inventory_item: string;
  description: string;
  expected_qty: string;
  actual_qty?: string;
  is_purchased?: boolean;
  status?: 'Purchased' | 'Pending' | 'In Stock' | 'N/A' | string;
  remarks?: string;
}

export const MASTER_PURCHASE_INVENTORY: PurchaseItemData[] = [
  // 1. Furniture & Setup
  { sr_no: 1, category: "Furniture & Setup", inventory_item: "Octagon Table", description: "Lab work table", expected_qty: "4" },
  { sr_no: 2, category: "Furniture & Setup", inventory_item: "Side Table", description: "Support tables", expected_qty: "4" },
  { sr_no: 3, category: "Furniture & Setup", inventory_item: "Chair", description: "Student seating", expected_qty: "30" },
  { sr_no: 4, category: "Furniture & Setup", inventory_item: "Cupboard", description: "Storage unit", expected_qty: "1" },
  { sr_no: 5, category: "Furniture & Setup", inventory_item: "Welcome Stand", description: "Welcome furniture", expected_qty: "1" },
  { sr_no: 6, category: "Furniture & Setup", inventory_item: "Bean Bag", description: "XXXL size", expected_qty: "2" },
  { sr_no: 7, category: "Furniture & Setup", inventory_item: "Writing Board", description: "3 x 2 feet", expected_qty: "1" },
  { sr_no: 8, category: "Furniture & Setup", inventory_item: "Podcast Table", description: "Small podcasting desk", expected_qty: "1" },
  { sr_no: 9, category: "Furniture & Setup", inventory_item: "TV Wall Mount", description: "Mount for TV", expected_qty: "1" },
  { sr_no: 10, category: "Furniture & Setup", inventory_item: "Webcam Stand", description: "Support stand for setup", expected_qty: "1" },
  { sr_no: 11, category: "Furniture & Setup", inventory_item: "Hanging Wall Mount", description: "U-shape type", expected_qty: "1" },
  { sr_no: 12, category: "Furniture & Setup", inventory_item: "Flexible Flight Bot", description: "Flying educational bots", expected_qty: "2" },

  // 2. Branding & Display (Acrylic)
  { sr_no: 13, category: "Branding & Display (Acrylic)", inventory_item: "Acrylic Red Letters", description: "AIR G LAB", expected_qty: "1" },
  { sr_no: 14, category: "Branding & Display (Acrylic)", inventory_item: "Acrylic Blue Letters", description: "INDIA", expected_qty: "1" },
  { sr_no: 15, category: "Branding & Display (Acrylic)", inventory_item: "Acrylic Welcome Board", description: "AIR G Welcome", expected_qty: "1" },
  { sr_no: 16, category: "Branding & Display (Acrylic)", inventory_item: "Acrylic A3 Display Frames", description: "Project/Poster display", expected_qty: "10" },
  { sr_no: 17, category: "Branding & Display (Acrylic)", inventory_item: "3D Printed Studs", description: "Mounting support", expected_qty: "50" },
  { sr_no: 18, category: "Branding & Display (Acrylic)", inventory_item: "3D Printed Dragon", description: "Decor piece", expected_qty: "1" },

  // 3. Vinyl Prints
  { sr_no: 19, category: "Vinyl Prints", inventory_item: "AIRG International Banner", description: "20 x 4 ft", expected_qty: "1" },
  { sr_no: 20, category: "Vinyl Prints", inventory_item: "Robot TV Wall Prints", description: "4 x 4 ft", expected_qty: "2" },
  { sr_no: 21, category: "Vinyl Prints", inventory_item: "Foundation Lab Banner", description: "6 x 1.5 ft", expected_qty: "1" },
  { sr_no: 22, category: "Vinyl Prints", inventory_item: "A3 Educational Prints", description: "Various", expected_qty: "8" },
  { sr_no: 23, category: "Vinyl Prints", inventory_item: "Certificate & Message Prints", description: "A3 size", expected_qty: "2" },
  { sr_no: 24, category: "Vinyl Prints", inventory_item: "Global Presence Poster", description: "4 x 4 ft", expected_qty: "1" },
  { sr_no: 25, category: "Vinyl Prints", inventory_item: "SDG Poster", description: "4 x 4 ft", expected_qty: "1" },
  { sr_no: 26, category: "Vinyl Prints", inventory_item: "Drone 3D Poster", description: "4 x 4 ft", expected_qty: "1" },
  { sr_no: 27, category: "Vinyl Prints", inventory_item: "Corner Prints", description: "2 x 4 ft", expected_qty: "2" },
  { sr_no: 28, category: "Vinyl Prints", inventory_item: "AI/IoT Section Sticker", description: "4 x 4 ft", expected_qty: "1" },
  { sr_no: 29, category: "Vinyl Prints", inventory_item: "Sponsored A3 Sticker", description: "Sponsorship display", expected_qty: "1" },

  // 4. Lighting & Ambience
  { sr_no: 30, category: "Lighting & Ambience", inventory_item: "Round Hanging Light", description: "Ceiling decor", expected_qty: "1" },
  { sr_no: 31, category: "Lighting & Ambience", inventory_item: "Cycle Hanging Lights", description: "Decor lighting", expected_qty: "2" },
  { sr_no: 32, category: "Lighting & Ambience", inventory_item: "Glass Hanging Lights", description: "Ceiling lights", expected_qty: "2" },
  { sr_no: 33, category: "Lighting & Ambience", inventory_item: "Lighting Bulbs", description: "LED bulbs", expected_qty: "8" },
  { sr_no: 34, category: "Lighting & Ambience", inventory_item: "Amazon Light Standee", description: "Decor light", expected_qty: "1" },
  { sr_no: 35, category: "Lighting & Ambience", inventory_item: "Smart Fan", description: "WiFi enabled", expected_qty: "1" },

  // 5. Electronics & Tech
  { sr_no: 36, category: "Electronics & Tech", inventory_item: "Smart TV", description: "55 inch", expected_qty: "1" },
  { sr_no: 37, category: "Electronics & Tech", inventory_item: "Webcam", description: "For video sessions", expected_qty: "1" },
  { sr_no: 38, category: "Electronics & Tech", inventory_item: "Laptop / Chromebook", description: "For lab use", expected_qty: "1" },
  { sr_no: 39, category: "Electronics & Tech", inventory_item: "Alexa", description: "Voice assistant", expected_qty: "1" },
  { sr_no: 40, category: "Electronics & Tech", inventory_item: "Alexa Hanger", description: "Support for Alexa", expected_qty: "1" },
  { sr_no: 41, category: "Electronics & Tech", inventory_item: "Speaker", description: "Audio output", expected_qty: "1" },
  { sr_no: 42, category: "Electronics & Tech", inventory_item: "Keyboard & Mouse", description: "Input devices", expected_qty: "1 Set" },
  { sr_no: 43, category: "Electronics & Tech", inventory_item: "Keyboard Pad", description: "For keyboard comfort", expected_qty: "1" },
  { sr_no: 44, category: "Electronics & Tech", inventory_item: "Pendrive", description: "64 GB", expected_qty: "1" },
  { sr_no: 45, category: "Electronics & Tech", inventory_item: "HDMI Cable", description: "Connectivity", expected_qty: "1" },

  // 6. Gadgets & Robotics
  { sr_no: 46, category: "Gadgets & Robotics", inventory_item: "VR Oculus", description: "Virtual reality", expected_qty: "1" },
  { sr_no: 47, category: "Gadgets & Robotics", inventory_item: "3D Printer", description: "For prototyping", expected_qty: "1" },
  { sr_no: 48, category: "Gadgets & Robotics", inventory_item: "Drones", description: "Flying drones", expected_qty: "2" },
  { sr_no: 49, category: "Gadgets & Robotics", inventory_item: "Robots", description: "Educational robots", expected_qty: "3" },
  { sr_no: 50, category: "Gadgets & Robotics", inventory_item: "Rover Robot", description: "Terrain bot", expected_qty: "1" },

  // 7. Tools & Electronics
  { sr_no: 51, category: "Tools & Electronics", inventory_item: "Soldering Gun", description: "For circuit building", expected_qty: "1" },
  { sr_no: 52, category: "Tools & Electronics", inventory_item: "Soldering Stand", description: "Gun holder", expected_qty: "1" },
  { sr_no: 53, category: "Tools & Electronics", inventory_item: "Wheel BO", description: "Basic structure wheel", expected_qty: "1" },
  { sr_no: 54, category: "Tools & Electronics", inventory_item: "BO Motors", description: "Drive motors", expected_qty: "Multiple" },
  { sr_no: 55, category: "Tools & Electronics", inventory_item: "LED Box", description: "Assorted LEDs", expected_qty: "1" },
  { sr_no: 56, category: "Tools & Electronics", inventory_item: "Arduino Boards", description: "Microcontrollers", expected_qty: "Multiple" },
  { sr_no: 57, category: "Tools & Electronics", inventory_item: "Arduino Shields", description: "Extension modules", expected_qty: "Multiple" },
  { sr_no: 58, category: "Tools & Electronics", inventory_item: "PIR Sensor", description: "Motion detection", expected_qty: "1" },
  { sr_no: 59, category: "Tools & Electronics", inventory_item: "Ultrasonic Sensor", description: "Distance sensing", expected_qty: "1" },
  { sr_no: 60, category: "Tools & Electronics", inventory_item: "IR Sensor", description: "Obstacle detection", expected_qty: "1" },
  { sr_no: 61, category: "Tools & Electronics", inventory_item: "DHT11 Sensor", description: "Humidity & Temp", expected_qty: "1" },
  { sr_no: 62, category: "Tools & Electronics", inventory_item: "Jumper Wires", description: "M-M, F-F", expected_qty: "Multiple" },
  { sr_no: 63, category: "Tools & Electronics", inventory_item: "Digital Multimeter", description: "Testing tool", expected_qty: "1" },
  { sr_no: 64, category: "Tools & Electronics", inventory_item: "Raspberry Pi", description: "Micro PC", expected_qty: "1" },

  // 8. Flooring & Decoration / Stationery
  { sr_no: 65, category: "Flooring & Decoration / Stationery", inventory_item: "Grey Floor Mat", description: "500 sq. ft.", expected_qty: "1" },
  { sr_no: 66, category: "Flooring & Decoration / Stationery", inventory_item: "Artificial Green Grass", description: "30 sq. ft.", expected_qty: "1" },
  { sr_no: 67, category: "Flooring & Decoration / Stationery", inventory_item: "White 3D Wall Stickers", description: "Decor", expected_qty: "10" },
  { sr_no: 68, category: "Flooring & Decoration / Stationery", inventory_item: "Blue 3D Wall Stickers", description: "Decor", expected_qty: "10" },
  { sr_no: 69, category: "Flooring & Decoration / Stationery", inventory_item: "Document Files", description: "Storage", expected_qty: "2" },

  // 9. Component List
  { sr_no: 70, category: "Component List", inventory_item: "OLED Display", description: "Visual output display", expected_qty: "12" },
  { sr_no: 71, category: "Component List", inventory_item: "Soldering Gun", description: "Assembly tool", expected_qty: "2" },
  { sr_no: 72, category: "Component List", inventory_item: "Soldering Stand", description: "Safety stand", expected_qty: "2" },
  { sr_no: 73, category: "Component List", inventory_item: "Switch", description: "Toggle & push switches", expected_qty: "12" },
  { sr_no: 74, category: "Component List", inventory_item: "LED BOX", description: "LED component set", expected_qty: "1" },
  { sr_no: 75, category: "Component List", inventory_item: "Arduino Boards", description: "Microcontroller units", expected_qty: "12" },
  { sr_no: 76, category: "Component List", inventory_item: "Arduino Shields/Motor Driver", description: "Motor driver shields", expected_qty: "12" },
  { sr_no: 77, category: "Component List", inventory_item: "Soil Sensor Module", description: "Moisture sensing", expected_qty: "12" },
  { sr_no: 78, category: "Component List", inventory_item: "Ultrasonic Sensor", description: "Range finder", expected_qty: "12" },
  { sr_no: 79, category: "Component List", inventory_item: "IR Sensor", description: "Infrared sensor", expected_qty: "12" },
  { sr_no: 80, category: "Component List", inventory_item: "DHT11 Sensor", description: "Temp/Humidity sensor", expected_qty: "12" },
  { sr_no: 81, category: "Component List", inventory_item: "LDR (Light Dependent Resistor)", description: "Light sensor", expected_qty: "12" },
  { sr_no: 82, category: "Component List", inventory_item: "5V Relay", description: "Electromechanical switch", expected_qty: "12" },
  { sr_no: 83, category: "Component List", inventory_item: "Buzzer", description: "Sound output", expected_qty: "12" },
  { sr_no: 84, category: "Component List", inventory_item: "Caster Wheel", description: "Robot wheels", expected_qty: "12" },
  { sr_no: 85, category: "Component List", inventory_item: "Arduino Cable", description: "USB communication", expected_qty: "12" },
  { sr_no: 86, category: "Component List", inventory_item: "Soldering Stand", description: "Secondary stand", expected_qty: "2" },
  { sr_no: 87, category: "Component List", inventory_item: "Rain Sensor Module", description: "Precipitation detection", expected_qty: "12" },
  { sr_no: 88, category: "Component List", inventory_item: "Digital Multimeter", description: "Multimeter tool", expected_qty: "2" },
  { sr_no: 89, category: "Component List", inventory_item: "Jumper Wires", description: "Wire jumper sets", expected_qty: "3 sets" }
];

export function getDefaultPurchaseChecklist(): PurchaseItemData[] {
  return MASTER_PURCHASE_INVENTORY.map(item => ({
    ...item,
    actual_qty: item.expected_qty,
    is_purchased: false,
    status: 'Pending',
    remarks: 'Standard lab setup inventory item'
  }));
}
