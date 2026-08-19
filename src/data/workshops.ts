export interface Workshop {
  slug: string;
  title: string;
  category: string;
  desc: string;
  url: string;
  detailedDesc: string;
  location: string;
  date: string;
  techStack: string[];
  stats: { label: string; value: string }[];
  highlights: string[];
}

export const workshopsData: Workshop[] = [
  {
    slug: "international-students-1",
    title: "International Students AI & Hardware Workshop",
    category: "Global Training",
    desc: "Hands-on Artificial Intelligence, Robotics, and Hardware prototyping session for international students.",
    url: "/intl_student_1.jpg",
    detailedDesc: "Empowering international students with advanced AI hardware, microcontrollers, and edge computing kits. Students collaborate on building practical IoT and robotics projects.",
    location: "Global Centre, India",
    date: "Active Workshop",
    techStack: ["Edge AI Kits", "Microcontrollers", "Robotics Sensors", "Python Sandbox"],
    stats: [
      { label: "International Delegation", value: "Global Students" },
      { label: "Hardware Projects", value: "Hands-on Prototyping" },
      { label: "AI Integration", value: "Edge Compute Nodes" }
    ],
    highlights: [
      "Cross-border collaboration on AI and embedded systems",
      "Hands-on assembly of smart IoT and robotics modules",
      "Interactive coding and real-world hardware deployment"
    ]
  },
  {
    slug: "international-students-2",
    title: "International Students Hardware & Robotics Lab",
    category: "Global Training",
    desc: "International student group engaged in practical hardware engineering and deep-tech innovation.",
    url: "/intl_student_2.jpg",
    detailedDesc: "Interactive workshop for international delegation exploring next-generation robotics, microprocessors, and AI-driven automation systems.",
    location: "Global Centre, India",
    date: "Active Workshop",
    techStack: ["Embedded Systems", "Robotics Sensors", "3D Prototyping", "Edge Computing"],
    stats: [
      { label: "International Delegation", value: "Global Students" },
      { label: "Lab Projects", value: "Hardware Design" },
      { label: "Mentorship", value: "Senior AI Engineers" }
    ],
    highlights: [
      "In-depth hardware circuit design and microcontroller programming",
      "Practical experimentation with sensor networks and motor drivers",
      "Comprehensive exposure to AIR G International deep-tech infrastructure"
    ]
  },
  {
    slug: "rajendra-khandala-1",
    title: "AIRG Rajendra Khandala Lab",
    category: "School Lab",
    desc: "A future-ready learning space for Artificial Intelligence, Robotics, 3D printing, and Drone Technology.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00.jpg",
    detailedDesc: "Situated at Rajendra School in Khandala, this lab introduces students to aviation science. Through constructing model gliders, studying wind resistance, and mapping flight paths, physics concepts are made active and engaging.",
    location: "Khandala, Maharashtra",
    date: "Active Lab",
    techStack: ["Model Glider Kits", "Aero Simulation Software", "Electronic Sensors", "Physics Measurement Tools"],
    stats: [
      { label: "Gliders Assembled", value: "50+ Models" },
      { label: "Students Enrolled", value: "300+ Students" },
      { label: "Physics Experiments", value: "30+ Logged" }
    ],
    highlights: [
      "Designed and launched micro-gliders with optimal wing ratios",
      "Used software to simulate airflow over wings and understand lift",
      "Conducted outdoor flight competitions testing range and stability"
    ]
  },
  {
    slug: "rajendra-khandala-2",
    title: "AIRG Rajendra Khandala Lab",
    category: "School Lab",
    desc: "A future-ready learning space for Artificial Intelligence, Robotics, 3D printing, and Drone Technology.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(1).jpg",
    detailedDesc: "Situated at Rajendra School in Khandala, this lab introduces students to aviation science. Through constructing model gliders, studying wind resistance, and mapping flight paths, physics concepts are made active and engaging.",
    location: "Khandala, Maharashtra",
    date: "Active Lab",
    techStack: ["Model Glider Kits", "Aero Simulation Software", "Electronic Sensors", "Physics Measurement Tools"],
    stats: [
      { label: "Gliders Assembled", value: "50+ Models" },
      { label: "Students Enrolled", value: "300+ Students" },
      { label: "Physics Experiments", value: "30+ Logged" }
    ],
    highlights: [
      "Designed and launched micro-gliders with optimal wing ratios",
      "Used software to simulate airflow over wings and understand lift",
      "Conducted outdoor flight competitions testing range and stability"
    ]
  },
  {
    slug: "venurai-chavan-1",
    title: "AIRG Yashwantrao & Sou Venutai Chavan Lab",
    category: "School Lab",
    desc: "Experiential learning hub combining emerging technologies to inspire creative thinking and problem-solving.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(2).jpg",
    detailedDesc: "The Venurai Chavan Lab introduces water conservation tech. Students program ultrasonic depth sensors to read school water levels, building automatic pump cutoff switches to prevent overflow.",
    location: "Phaltan, Maharashtra",
    date: "Active Lab",
    techStack: ["Ultrasonic Depth Sensors", "Relay Cutoffs", "Arduino boards", "Water Flowmeters"],
    stats: [
      { label: "Systems Installed", value: "2 Campus Setups" },
      { label: "Active Classes", value: "300+ Students" },
      { label: "Gallons Conserved", value: "Estimated 1000+ Gal" }
    ],
    highlights: [
      "Programmed ultrasonic tank alarms warning of school tank overflows",
      "Constructed flowmeter sensors showing real-time water usage speeds",
      "Created classroom models explaining how residential pipes manage water flow"
    ]
  },
  {
    slug: "venurai-chavan-2",
    title: "AIRG Yashwantrao & Sou Venutai Chavan Lab",
    category: "School Lab",
    desc: "Experiential learning hub combining emerging technologies to inspire creative thinking and problem-solving.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(3).jpg",
    detailedDesc: "The Venurai Chavan Lab introduces water conservation tech. Students program ultrasonic depth sensors to read school water levels, building automatic pump cutoff switches to prevent overflow.",
    location: "Phaltan, Maharashtra",
    date: "Active Lab",
    techStack: ["Ultrasonic Depth Sensors", "Relay Cutoffs", "Arduino boards", "Water Flowmeters"],
    stats: [
      { label: "Systems Installed", value: "2 Campus Setups" },
      { label: "Active Classes", value: "300+ Students" },
      { label: "Gallons Conserved", value: "Estimated 1000+ Gal" }
    ],
    highlights: [
      "Programmed ultrasonic tank alarms warning of school tank overflows",
      "Constructed flowmeter sensors showing real-time water usage speeds",
      "Created classroom models explaining how residential pipes manage water flow"
    ]
  },
  {
    slug: "rajendra-khandala-3",
    title: "AIRG Rajendra Khandala Lab",
    category: "School Lab",
    desc: "A future-ready learning space for Artificial Intelligence, Robotics, 3D printing, and Drone Technology.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(4).jpg",
    detailedDesc: "Situated at Rajendra School in Khandala, this lab introduces students to aviation science. Through constructing model gliders, studying wind resistance, and mapping flight paths, physics concepts are made active and engaging.",
    location: "Khandala, Maharashtra",
    date: "Active Lab",
    techStack: ["Model Glider Kits", "Aero Simulation Software", "Electronic Sensors", "Physics Measurement Tools"],
    stats: [
      { label: "Gliders Assembled", value: "50+ Models" },
      { label: "Students Enrolled", value: "300+ Students" },
      { label: "Physics Experiments", value: "30+ Logged" }
    ],
    highlights: [
      "Designed and launched micro-gliders with optimal wing ratios",
      "Used software to simulate airflow over wings and understand lift",
      "Conducted outdoor flight competitions testing range and stability"
    ]
  },
  {
    slug: "rajendra-khandala-4",
    title: "AIRG Rajendra Khandala Lab",
    category: "School Lab",
    desc: "A future-ready learning space for Artificial Intelligence, Robotics, 3D printing, and Drone Technology.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(5).jpg",
    detailedDesc: "Situated at Rajendra School in Khandala, this lab introduces students to aviation science. Through constructing model gliders, studying wind resistance, and mapping flight paths, physics concepts are made active and engaging.",
    location: "Khandala, Maharashtra",
    date: "Active Lab",
    techStack: ["Model Glider Kits", "Aero Simulation Software", "Electronic Sensors", "Physics Measurement Tools"],
    stats: [
      { label: "Gliders Assembled", value: "50+ Models" },
      { label: "Students Enrolled", value: "300+ Students" },
      { label: "Physics Experiments", value: "30+ Logged" }
    ],
    highlights: [
      "Designed and launched micro-gliders with optimal wing ratios",
      "Used software to simulate airflow over wings and understand lift",
      "Conducted outdoor flight competitions testing range and stability"
    ]
  },
  {
    slug: "venurai-chavan-3",
    title: "AIRG Yashwantrao & Sou Venutai Chavan Lab",
    category: "School Lab",
    desc: "Experiential learning hub combining emerging technologies to inspire creative thinking and problem-solving.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(6).jpg",
    detailedDesc: "The Venurai Chavan Lab introduces water conservation tech. Students program ultrasonic depth sensors to read school water levels, building automatic pump cutoff switches to prevent overflow.",
    location: "Phaltan, Maharashtra",
    date: "Active Lab",
    techStack: ["Ultrasonic Depth Sensors", "Relay Cutoffs", "Arduino boards", "Water Flowmeters"],
    stats: [
      { label: "Systems Installed", value: "2 Campus Setups" },
      { label: "Active Classes", value: "300+ Students" },
      { label: "Gallons Conserved", value: "Estimated 1000+ Gal" }
    ],
    highlights: [
      "Programmed ultrasonic tank alarms warning of school tank overflows",
      "Constructed flowmeter sensors showing real-time water usage speeds",
      "Created classroom models explaining how residential pipes manage water flow"
    ]
  },
  {
    slug: "venurai-chavan-4",
    title: "AIRG Yashwantrao & Sou Venutai Chavan Lab",
    category: "School Lab",
    desc: "Experiential learning hub combining emerging technologies to inspire creative thinking and problem-solving.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(7).jpg",
    detailedDesc: "The Venurai Chavan Lab introduces water conservation tech. Students program ultrasonic depth sensors to read school water levels, building automatic pump cutoff switches to prevent overflow.",
    location: "Phaltan, Maharashtra",
    date: "Active Lab",
    techStack: ["Ultrasonic Depth Sensors", "Relay Cutoffs", "Arduino boards", "Water Flowmeters"],
    stats: [
      { label: "Systems Installed", value: "2 Campus Setups" },
      { label: "Active Classes", value: "300+ Students" },
      { label: "Gallons Conserved", value: "Estimated 1000+ Gal" }
    ],
    highlights: [
      "Programmed ultrasonic tank alarms warning of school tank overflows",
      "Constructed flowmeter sensors showing real-time water usage speeds",
      "Created classroom models explaining how residential pipes manage water flow"
    ]
  },
  {
    slug: "rajendra-khandala-5",
    title: "AIRG Rajendra Khandala Lab",
    category: "School Lab",
    desc: "A future-ready learning space for Artificial Intelligence, Robotics, 3D printing, and Drone Technology.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(8).jpg",
    detailedDesc: "Situated at Rajendra School in Khandala, this lab introduces students to aviation science. Through constructing model gliders, studying wind resistance, and mapping flight paths, physics concepts are made active and engaging.",
    location: "Khandala, Maharashtra",
    date: "Active Lab",
    techStack: ["Model Glider Kits", "Aero Simulation Software", "Electronic Sensors", "Physics Measurement Tools"],
    stats: [
      { label: "Gliders Assembled", value: "50+ Models" },
      { label: "Students Enrolled", value: "300+ Students" },
      { label: "Physics Experiments", value: "30+ Logged" }
    ],
    highlights: [
      "Designed and launched micro-gliders with optimal wing ratios",
      "Used software to simulate airflow over wings and understand lift",
      "Conducted outdoor flight competitions testing range and stability"
    ]
  },
  {
    slug: "rajendra-khandala-6",
    title: "AIRG Rajendra Khandala Lab",
    category: "School Lab",
    desc: "A future-ready learning space for Artificial Intelligence, Robotics, 3D printing, and Drone Technology.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(9).jpg",
    detailedDesc: "Situated at Rajendra School in Khandala, this lab introduces students to aviation science. Through constructing model gliders, studying wind resistance, and mapping flight paths, physics concepts are made active and engaging.",
    location: "Khandala, Maharashtra",
    date: "Active Lab",
    techStack: ["Model Glider Kits", "Aero Simulation Software", "Electronic Sensors", "Physics Measurement Tools"],
    stats: [
      { label: "Gliders Assembled", value: "50+ Models" },
      { label: "Students Enrolled", value: "300+ Students" },
      { label: "Physics Experiments", value: "30+ Logged" }
    ],
    highlights: [
      "Designed and launched micro-gliders with optimal wing ratios",
      "Used software to simulate airflow over wings and understand lift",
      "Conducted outdoor flight competitions testing range and stability"
    ]
  },
  {
    slug: "rajendra-khandala-7",
    title: "AIRG Rajendra Khandala Lab",
    category: "School Lab",
    desc: "A future-ready learning space for Artificial Intelligence, Robotics, 3D printing, and Drone Technology.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(10).jpg",
    detailedDesc: "Situated at Rajendra School in Khandala, this lab introduces students to aviation science. Through constructing model gliders, studying wind resistance, and mapping flight paths, physics concepts are made active and engaging.",
    location: "Khandala, Maharashtra",
    date: "Active Lab",
    techStack: ["Model Glider Kits", "Aero Simulation Software", "Electronic Sensors", "Physics Measurement Tools"],
    stats: [
      { label: "Gliders Assembled", value: "50+ Models" },
      { label: "Students Enrolled", value: "300+ Students" },
      { label: "Physics Experiments", value: "30+ Logged" }
    ],
    highlights: [
      "Designed and launched micro-gliders with optimal wing ratios",
      "Used software to simulate airflow over wings and understand lift",
      "Conducted outdoor flight competitions testing range and stability"
    ]
  },
  {
    slug: "eon-center-1",
    title: "AIRG Eon Center Lab",
    category: "School Lab",
    desc: "A futuristic innovation centre empowering students with AI, Python programming, robotics, and interactive hardware.",
    url: "/centres/gallery/photo-new-1.jpeg",
    detailedDesc: "Eon Center focuses on hands-on computer science, robotics, and artificial intelligence. Students build intelligent algorithms, wire up microcontrollers, and develop deep-tech applications.",
    location: "Maharashtra, India",
    date: "Active Lab",
    techStack: ["Python Programming", "AI Neural Kits", "Embedded Microcontrollers", "Robotics Sensors"],
    stats: [
      { label: "Students Certified", value: "300+ Students" },
      { label: "Lab Projects", value: "50+ Built" },
      { label: "Code Competitions", value: "12+ Hosted" }
    ],
    highlights: [
      "Hands-on AI algorithms and computer vision workshops",
      "Interactive breadboard wiring and robotic rover assembly",
      "Real-world coding and problem-solving hackathons"
    ]
  },
  {
    slug: "eon-center-2",
    title: "AIRG Eon Center Lab",
    category: "School Lab",
    desc: "A futuristic innovation centre empowering students with AI, Python programming, robotics, and interactive hardware.",
    url: "/centres/gallery/photo-new-2.jpeg",
    detailedDesc: "Eon Center focuses on hands-on computer science, robotics, and artificial intelligence. Students build intelligent algorithms, wire up microcontrollers, and develop deep-tech applications.",
    location: "Maharashtra, India",
    date: "Active Lab",
    techStack: ["Python Programming", "AI Neural Kits", "Embedded Microcontrollers", "Robotics Sensors"],
    stats: [
      { label: "Students Certified", value: "300+ Students" },
      { label: "Lab Projects", value: "50+ Built" },
      { label: "Code Competitions", value: "12+ Hosted" }
    ],
    highlights: [
      "Hands-on AI algorithms and computer vision workshops",
      "Interactive breadboard wiring and robotic rover assembly",
      "Real-world coding and problem-solving hackathons"
    ]
  },
  {
    slug: "eon-center-3",
    title: "AIRG Eon Center Lab",
    category: "School Lab",
    desc: "A futuristic innovation centre empowering students with AI, Python programming, robotics, and interactive hardware.",
    url: "/centres/gallery/photo-new-3.jpeg",
    detailedDesc: "Eon Center focuses on hands-on computer science, robotics, and artificial intelligence. Students build intelligent algorithms, wire up microcontrollers, and develop deep-tech applications.",
    location: "Maharashtra, India",
    date: "Active Lab",
    techStack: ["Python Programming", "AI Neural Kits", "Embedded Microcontrollers", "Robotics Sensors"],
    stats: [
      { label: "Students Certified", value: "300+ Students" },
      { label: "Lab Projects", value: "50+ Built" },
      { label: "Code Competitions", value: "12+ Hosted" }
    ],
    highlights: [
      "Hands-on AI algorithms and computer vision workshops",
      "Interactive breadboard wiring and robotic rover assembly",
      "Real-world coding and problem-solving hackathons"
    ]
  },
  {
    slug: "eon-center-4",
    title: "AIRG Eon Center Lab",
    category: "School Lab",
    desc: "A futuristic innovation centre empowering students with AI, Python programming, robotics, and interactive hardware.",
    url: "/centres/gallery/photo-new-4.jpeg",
    detailedDesc: "Eon Center focuses on hands-on computer science, robotics, and artificial intelligence. Students build intelligent algorithms, wire up microcontrollers, and develop deep-tech applications.",
    location: "Maharashtra, India",
    date: "Active Lab",
    techStack: ["Python Programming", "AI Neural Kits", "Embedded Microcontrollers", "Robotics Sensors"],
    stats: [
      { label: "Students Certified", value: "300+ Students" },
      { label: "Lab Projects", value: "50+ Built" },
      { label: "Code Competitions", value: "12+ Hosted" }
    ],
    highlights: [
      "Hands-on AI algorithms and computer vision workshops",
      "Interactive breadboard wiring and robotic rover assembly",
      "Real-world coding and problem-solving hackathons"
    ]
  },
  {
    slug: "eon-center-5",
    title: "AIRG Eon Center Lab",
    category: "School Lab",
    desc: "A futuristic innovation centre empowering students with AI, Python programming, robotics, and interactive hardware.",
    url: "/centres/gallery/photo-new-5.jpeg",
    detailedDesc: "Eon Center focuses on hands-on computer science, robotics, and artificial intelligence. Students build intelligent algorithms, wire up microcontrollers, and develop deep-tech applications.",
    location: "Maharashtra, India",
    date: "Active Lab",
    techStack: ["Python Programming", "AI Neural Kits", "Embedded Microcontrollers", "Robotics Sensors"],
    stats: [
      { label: "Students Certified", value: "300+ Students" },
      { label: "Lab Projects", value: "50+ Built" },
      { label: "Code Competitions", value: "12+ Hosted" }
    ],
    highlights: [
      "Hands-on AI algorithms and computer vision workshops",
      "Interactive breadboard wiring and robotic rover assembly",
      "Real-world coding and problem-solving hackathons"
    ]
  },
  {
    slug: "eon-center-6",
    title: "AIRG Eon Center Lab",
    category: "School Lab",
    desc: "A futuristic innovation centre empowering students with AI, Python programming, robotics, and interactive hardware.",
    url: "/centres/gallery/photo-new-6.jpeg",
    detailedDesc: "Eon Center focuses on hands-on computer science, robotics, and artificial intelligence. Students build intelligent algorithms, wire up microcontrollers, and develop deep-tech applications.",
    location: "Maharashtra, India",
    date: "Active Lab",
    techStack: ["Python Programming", "AI Neural Kits", "Embedded Microcontrollers", "Robotics Sensors"],
    stats: [
      { label: "Students Certified", value: "300+ Students" },
      { label: "Lab Projects", value: "50+ Built" },
      { label: "Code Competitions", value: "12+ Hosted" }
    ],
    highlights: [
      "Hands-on AI algorithms and computer vision workshops",
      "Interactive breadboard wiring and robotic rover assembly",
      "Real-world coding and problem-solving hackathons"
    ]
  },
  {
    slug: "eon-center-7",
    title: "AIRG Eon Center Lab",
    category: "School Lab",
    desc: "A futuristic innovation centre empowering students with AI, Python programming, robotics, and interactive hardware.",
    url: "/centres/gallery/photo-new-7.jpeg",
    detailedDesc: "Eon Center focuses on hands-on computer science, robotics, and artificial intelligence. Students build intelligent algorithms, wire up microcontrollers, and develop deep-tech applications.",
    location: "Maharashtra, India",
    date: "Active Lab",
    techStack: ["Python Programming", "AI Neural Kits", "Embedded Microcontrollers", "Robotics Sensors"],
    stats: [
      { label: "Students Certified", value: "300+ Students" },
      { label: "Lab Projects", value: "50+ Built" },
      { label: "Code Competitions", value: "12+ Hosted" }
    ],
    highlights: [
      "Hands-on AI algorithms and computer vision workshops",
      "Interactive breadboard wiring and robotic rover assembly",
      "Real-world coding and problem-solving hackathons"
    ]
  },
  {
    slug: "eon-center-8",
    title: "AIRG Eon Center Lab",
    category: "School Lab",
    desc: "A futuristic innovation centre empowering students with AI, Python programming, robotics, and interactive hardware.",
    url: "/centres/gallery/photo-new-8.jpeg",
    detailedDesc: "Eon Center focuses on hands-on computer science, robotics, and artificial intelligence. Students build intelligent algorithms, wire up microcontrollers, and develop deep-tech applications.",
    location: "Maharashtra, India",
    date: "Active Lab",
    techStack: ["Python Programming", "AI Neural Kits", "Embedded Microcontrollers", "Robotics Sensors"],
    stats: [
      { label: "Students Certified", value: "300+ Students" },
      { label: "Lab Projects", value: "50+ Built" },
      { label: "Code Competitions", value: "12+ Hosted" }
    ],
    highlights: [
      "Hands-on AI algorithms and computer vision workshops",
      "Interactive breadboard wiring and robotic rover assembly",
      "Real-world coding and problem-solving hackathons"
    ]
  },
  {
    slug: "eon-center-9",
    title: "AIRG Eon Center Lab",
    category: "School Lab",
    desc: "A futuristic innovation centre empowering students with AI, Python programming, robotics, and interactive hardware.",
    url: "/centres/gallery/photo-new-9.jpeg",
    detailedDesc: "Eon Center focuses on hands-on computer science, robotics, and artificial intelligence. Students build intelligent algorithms, wire up microcontrollers, and develop deep-tech applications.",
    location: "Maharashtra, India",
    date: "Active Lab",
    techStack: ["Python Programming", "AI Neural Kits", "Embedded Microcontrollers", "Robotics Sensors"],
    stats: [
      { label: "Students Certified", value: "300+ Students" },
      { label: "Lab Projects", value: "50+ Built" },
      { label: "Code Competitions", value: "12+ Hosted" }
    ],
    highlights: [
      "Hands-on AI algorithms and computer vision workshops",
      "Interactive breadboard wiring and robotic rover assembly",
      "Real-world coding and problem-solving hackathons"
    ]
  },
  {
    slug: "eon-center-10",
    title: "AIRG Eon Center Lab",
    category: "School Lab",
    desc: "A futuristic innovation centre empowering students with AI, Python programming, robotics, and interactive hardware.",
    url: "/centres/gallery/photo-new-10.jpeg",
    detailedDesc: "Eon Center focuses on hands-on computer science, robotics, and artificial intelligence. Students build intelligent algorithms, wire up microcontrollers, and develop deep-tech applications.",
    location: "Maharashtra, India",
    date: "Active Lab",
    techStack: ["Python Programming", "AI Neural Kits", "Embedded Microcontrollers", "Robotics Sensors"],
    stats: [
      { label: "Students Certified", value: "300+ Students" },
      { label: "Lab Projects", value: "50+ Built" },
      { label: "Code Competitions", value: "12+ Hosted" }
    ],
    highlights: [
      "Hands-on AI algorithms and computer vision workshops",
      "Interactive breadboard wiring and robotic rover assembly",
      "Real-world coding and problem-solving hackathons"
    ]
  },
  {
    slug: "eon-center-11",
    title: "AIRG Eon Center Lab",
    category: "School Lab",
    desc: "A futuristic innovation centre empowering students with AI, Python programming, robotics, and interactive hardware.",
    url: "/centres/gallery/photo-new-11.jpeg",
    detailedDesc: "Eon Center focuses on hands-on computer science, robotics, and artificial intelligence. Students build intelligent algorithms, wire up microcontrollers, and develop deep-tech applications.",
    location: "Maharashtra, India",
    date: "Active Lab",
    techStack: ["Python Programming", "AI Neural Kits", "Embedded Microcontrollers", "Robotics Sensors"],
    stats: [
      { label: "Students Certified", value: "300+ Students" },
      { label: "Lab Projects", value: "50+ Built" },
      { label: "Code Competitions", value: "12+ Hosted" }
    ],
    highlights: [
      "Hands-on AI algorithms and computer vision workshops",
      "Interactive breadboard wiring and robotic rover assembly",
      "Real-world coding and problem-solving hackathons"
    ]
  },
  {
    slug: "eon-center-12",
    title: "AIRG Eon Center Lab",
    category: "School Lab",
    desc: "A futuristic innovation centre empowering students with AI, Python programming, robotics, and interactive hardware.",
    url: "/centres/gallery/photo-new-12.jpeg",
    detailedDesc: "Eon Center focuses on hands-on computer science, robotics, and artificial intelligence. Students build intelligent algorithms, wire up microcontrollers, and develop deep-tech applications.",
    location: "Maharashtra, India",
    date: "Active Lab",
    techStack: ["Python Programming", "AI Neural Kits", "Embedded Microcontrollers", "Robotics Sensors"],
    stats: [
      { label: "Students Certified", value: "300+ Students" },
      { label: "Lab Projects", value: "50+ Built" },
      { label: "Code Competitions", value: "12+ Hosted" }
    ],
    highlights: [
      "Hands-on AI algorithms and computer vision workshops",
      "Interactive breadboard wiring and robotic rover assembly",
      "Real-world coding and problem-solving hackathons"
    ]
  },
  {
    slug: "eon-center-13",
    title: "AIRG Eon Center Lab",
    category: "School Lab",
    desc: "A futuristic innovation centre empowering students with AI, Python programming, robotics, and interactive hardware.",
    url: "/centres/gallery/photo-new-13.jpeg",
    detailedDesc: "Eon Center focuses on hands-on computer science, robotics, and artificial intelligence. Students build intelligent algorithms, wire up microcontrollers, and develop deep-tech applications.",
    location: "Maharashtra, India",
    date: "Active Lab",
    techStack: ["Python Programming", "AI Neural Kits", "Embedded Microcontrollers", "Robotics Sensors"],
    stats: [
      { label: "Students Certified", value: "300+ Students" },
      { label: "Lab Projects", value: "50+ Built" },
      { label: "Code Competitions", value: "12+ Hosted" }
    ],
    highlights: [
      "Hands-on AI algorithms and computer vision workshops",
      "Interactive breadboard wiring and robotic rover assembly",
      "Real-world coding and problem-solving hackathons"
    ]
  },
  {
    slug: "eon-center-14",
    title: "AIRG Eon Center Lab",
    category: "School Lab",
    desc: "Computational thinking and software engineering hub at Eon Center.",
    url: "/extracted-images/eon/eon_0.jpeg",
    detailedDesc: "Students learning logic architecture, debugging algorithms, and Python computing models at Eon Center.",
    location: "Maharashtra, India",
    date: "Active Lab",
    techStack: ["Python 3", "Visual Logic Puzzles", "Algorithms Training", "Jupyter Notebooks"],
    stats: [
      { label: "Students Enrolled", value: "180+ Learners" },
      { label: "Python Scripts", value: "90+ Completed" },
      { label: "Code Battles", value: "6 Hosted" }
    ],
    highlights: [
      "Helped every student code a basic command-line word puzzle game in Python",
      "Programmed sorting algorithms showing visual arrays rearrange themselves",
      "Conducted logic code battles that teach clean and efficient syntax"
    ]
  },
  {
    slug: "eon-center-15",
    title: "AIRG Eon Center Lab",
    category: "School Lab",
    desc: "Computational thinking and software engineering hub at Eon Center.",
    url: "/extracted-images/eon/eon_4.jpeg",
    detailedDesc: "Students learning logic architecture, debugging algorithms, and Python computing models at Eon Center.",
    location: "Maharashtra, India",
    date: "Active Lab",
    techStack: ["Python 3", "Visual Logic Puzzles", "Algorithms Training", "Jupyter Notebooks"],
    stats: [
      { label: "Students Enrolled", value: "180+ Learners" },
      { label: "Python Scripts", value: "90+ Completed" },
      { label: "Code Battles", value: "6 Hosted" }
    ],
    highlights: [
      "Helped every student code a basic command-line word puzzle game in Python",
      "Programmed sorting algorithms showing visual arrays rearrange themselves",
      "Conducted logic code battles that teach clean and efficient syntax"
    ]
  }
];
