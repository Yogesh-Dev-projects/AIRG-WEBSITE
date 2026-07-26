export interface Lab {
  slug: string;
  name: string;
  icon: string;
  sIcon: string;
  desc: string;
  detailedDesc: string;
  status: string;
  img: string;
  images: string[];
  techStack: string[];
  stats: { label: string; value: string }[];
  highlights: string[];
}

export const labsData: Lab[] = [
  {
    "slug": "rajendra-khandala",
    "name": "AIRG Rajendra Khandala Lab",
    "icon": "rocket_launch",
    "sIcon": "flight_takeoff",
    "desc": "The AIR G Innovation Lab at our school is a future-ready learning space where students explore Artificial Intelligence, Robotics, IoT, Drone Technology, 3D Printing, Virtual Reality, Coding, and Electronics through hands-on innovation and project-based learning.",
    "detailedDesc": "Situated at Rajendra School in Khandala, this lab introduces students to aviation science. Through constructing model gliders, studying wind resistance, and mapping flight paths, physics concepts are made active and engaging.",
    "status": "Active Lab Center",
    "img": "/centres/rajendra/PHOTO-2026-07-14-21-26-46.jpg",
    "images": [
      "/centres/rajendra/PHOTO-2026-07-14-21-26-46.jpg",
      "/centres/rajendra/PHOTO-2026-07-14-21-26-46(1).jpg",
      "/centres/rajendra/PHOTO-2026-07-14-21-26-46(2).jpg",
      "/centres/rajendra/PHOTO-2026-07-14-21-26-47.jpg",
      "/centres/rajendra/PHOTO-2026-07-14-21-26-47(1).jpg",
      "/centres/rajendra/PHOTO-2026-07-14-21-26-47(2).jpg",
      "/centres/rajendra/PHOTO-2026-07-14-21-26-47(3).jpg"
    ],
    "techStack": [
      "Model Glider Kits",
      "Aero Simulation Software",
      "Electronic Sensors",
      "Physics Measurement Tools"
    ],
    "stats": [
      {
        "label": "Gliders Assembled",
        "value": "50+ Models"
      },
      {
        "label": "Students Enrolled",
        "value": "300+ Students"
      },
      {
        "label": "Physics Experiments",
        "value": "30+ Logged"
      }
    ],
    "highlights": [
      "Designed and launched micro-gliders with optimal wing ratios",
      "Used software to simulate airflow over wings and understand lift",
      "Conducted outdoor flight competitions testing range and stability"
    ]
  },
  {
    "slug": "venurai-chavan",
    "name": "AIRG Yashwantrao & Sou Venutai Chavan Lab",
    "icon": "air",
    "sIcon": "waves",
    "desc": "Our AIR G Innovation Lab inspires students to become creative thinkers, problem solvers, and future innovators by integrating emerging technologies with experiential learning.",
    "detailedDesc": "The Venurai Chavan Lab introduces water conservation tech. Students program ultrasonic depth sensors to read school water levels, building automatic pump cutoff switches to prevent overflow.",
    "status": "Active Lab Center",
    "img": "/centres/yashwantrao/PHOTO-2026-07-14-21-45-32.jpg",
    "images": [
      "/centres/yashwantrao/PHOTO-2026-07-14-21-45-32.jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-45-33.jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-32.jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-32(1).jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-33.jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-33(1).jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-33(2).jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-33(3).jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-34.jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-34(1).jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-34(2).jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-34(3).jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-35.jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-35(1).jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-35(2).jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-36.jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-36(1).jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-36(2).jpg",
      "/centres/yashwantrao/PHOTO-2026-07-14-21-41-36(3).jpg"
    ],
    "techStack": [
      "Ultrasonic Depth Sensors",
      "Relay Cutoffs",
      "Arduino boards",
      "Water Flowmeters"
    ],
    "stats": [
      {
        "label": "Systems Installed",
        "value": "2 Campus Setups"
      },
      {
        "label": "Active Classes",
        "value": "300+ Students"
      },
      {
        "label": "Gallons Conserved",
        "value": "Estimated 1000+ Gal"
      }
    ],
    "highlights": [
      "Programmed ultrasonic tank alarms warning of school tank overflows",
      "Constructed flowmeter sensors showing real-time water usage speeds",
      "Created classroom models explaining how residential pipes manage water flow"
    ]
  },
  {
    "slug": "birla-innovation",
    "name": "AIRG Birla Innovation Lab",
    "icon": "home_work",
    "sIcon": "architecture",
    "desc": "Designed to prepare students for the digital future, the AIR G Innovation Lab provides practical exposure to AI, Robotics, IoT, Drones, VR, 3D Printing, and smart technologies in an engaging environment.",
    "detailedDesc": "Birla Innovation Lab combines structural arts with physics. Students create bridge and dome models using 3D CAD design tools, testing their strength under weights to study compression, tension, and load limits.",
    "status": "Active Lab Center",
    "img": "/extracted-hi/428fac04-8639-484f-bfe1-625d489fdaa1.jpeg",
    "images": [
      "/extracted-hi/428fac04-8639-484f-bfe1-625d489fdaa1.jpeg",
      "/extracted-hi/f4a4c6c9-c67c-4e32-825b-87dac1c4b72b.jpeg"
    ],
    "techStack": [
      "3D CAD Design",
      "3D Printing Filament",
      "Bridge Model Testers",
      "Structural Blueprints"
    ],
    "stats": [
      {
        "label": "Bridges Tested",
        "value": "30+ Models"
      },
      {
        "label": "Student Designers",
        "value": "300+ Students"
      },
      {
        "label": "CAD Designs Saved",
        "value": "85+ Models"
      }
    ],
    "highlights": [
      "Built truss bridge structures that carried 5x their own weight",
      "Created customized 3D models of historical monuments in CAD classes",
      "Analyzed structural support failures using weight testing frames"
    ]
  },
  {
    "slug": "eon-hub",
    "name": "AIRG Eon Lab",
    "icon": "psychology",
    "sIcon": "neurology",
    "desc": "The AIR G Innovation Lab transforms classroom learning into real-world experiences by enabling students to design, build, experiment, and innovate using advanced technologies.",
    "detailedDesc": "EON Hub focuses on computer programming fundamentals. Through solving logic puzzles, writing basic Python algorithms, and sorting lists, students develop strong computational thinking skills.",
    "status": "Active Lab Center",
    "img": "/extracted-images/eon/eon_0.jpeg",
    "images": [
      "/extracted-images/eon/eon_0.jpeg",
      "/extracted-images/eon/eon_1.jpeg",
      "/extracted-images/eon/eon_2.jpeg",
      "/extracted-images/eon/eon_3.jpeg",
      "/extracted-images/eon/eon_4.jpeg"
    ],
    "techStack": [
      "Python 3",
      "Visual Logic Puzzles",
      "Algorithms Training",
      "Jupyter Notebooks"
    ],
    "stats": [
      {
        "label": "Python Projects",
        "value": "90+ Scripts"
      },
      {
        "label": "Students Certified",
        "value": "180+ Learners"
      },
      {
        "label": "Code Competitions",
        "value": "6 Hosted"
      }
    ],
    "highlights": [
      "Helped every student code a basic command-line word puzzle game in Python",
      "Programmed sorting algorithms showing visual arrays rearrange themselves",
      "Conducted logic code battles that teach clean and efficient syntax"
    ]
  },
  {
    "slug": "holy-convent",
    "name": "AIRG Holy Convent Lab",
    "icon": "vrpano",
    "sIcon": "visibility",
    "desc": "Our school's AIR G Innovation Lab empowers young minds with future skills through hands-on activities, engineering design, coding, automation, and intelligent technology solutions.",
    "detailedDesc": "Located at Holy Convent in Karad, this lab utilizes VR to teach complex sciences. Students take virtual field trips to space, examine microscopic cells, and manipulate virtual organs to bring textbooks to life.",
    "status": "Active Lab Center",
    "img": "/extracted-images/holy_convent/holy_convent_1.jpeg",
    "images": [
      "/extracted-images/holy_convent/holy_convent_1.jpeg",
      "/extracted-images/holy_convent/holy_convent_2.jpeg",
      "/extracted-images/holy_convent/holy_convent_3.jpeg",
      "/extracted-images/holy_convent/holy_convent_4.jpeg"
    ],
    "techStack": [
      "Meta Quest VR Headsets",
      "Spatial WebXR Software",
      "3D Solar System Map VR",
      "Human Anatomy VR Suite",
      "VR Controller Charging Docks",
      "Sanitized Headset Covers",
      "Interactive Classroom Display"
    ],
    "stats": [
      {
        "label": "VR Headsets",
        "value": "8 Setups"
      },
      {
        "label": "Interactive Trips",
        "value": "12 Modules"
      },
      {
        "label": "Engaged Learners",
        "value": "300+ Students"
      }
    ],
    "highlights": [
      "Guided students through a shared virtual tour inside a human blood vessel",
      "Configured web-based astronomy maps so students could select stars",
      "Conducted class-wide science lessons using immersive VR anatomy models"
    ]
  },
  {
    "slug": "shauryasaihiki",
    "name": "AIRG Shaurya Sainiki Lab",
    "icon": "shield",
    "sIcon": "policy",
    "desc": "The AIR G Innovation Lab creates an ecosystem of innovation where students develop technical knowledge, creativity, collaboration, and leadership using next-generation technologies.",
    "detailedDesc": "Shauryasaihiki Lab teaches students HTML/CSS essentials and basic internet hygiene. Topics include strong password creation, identifying phishing emails, and building personal static website portfolios.",
    "status": "Active Lab Center",
    "img": "/extracted-hi/2b5a45d0-4af7-4af0-9ce7-050df50662f4.jpeg",
    "images": [
      "/extracted-hi/2b5a45d0-4af7-4af0-9ce7-050df50662f4.jpeg",
      "/extracted-hi/dad8acc1-522d-4606-9fb3-2523bb7e3fbd.jpeg"
    ],
    "techStack": [
      "HTML5",
      "CSS3 Layouts",
      "Local Web Servers",
      "Browser Security Tools"
    ],
    "stats": [
      {
        "label": "Websites Deployed",
        "value": "80+ Portfolios"
      },
      {
        "label": "Students Certified",
        "value": "300+ Students"
      },
      {
        "label": "Safety Seminars",
        "value": "12 Conducted"
      }
    ],
    "highlights": [
      "Helped every student build and run their own local HTML biography page",
      "Conducted school-wide training on password management and safety",
      "Trained student ambassadors on checking website SSL certificates"
    ]
  },
  {
    "slug": "mudhoji-lab",
    "name": "AIRG Mudhoji Lab",
    "icon": "precision_manufacturing",
    "sIcon": "radar",
    "desc": "Built on the principles of experiential learning, the AIR G Innovation Lab encourages students to explore, invent, and solve real-world challenges using AI, Robotics, IoT, and emerging technologies.",
    "detailedDesc": "Mudhoji Lab, located at Mudhoji High School in Phaltan, is a dedicated space for hands-on learning. Students learn to program Arduino boards, build block-based and C++ robotics models, and design parts using 3D printers, fostering early interest in engineering and computer science.",
    "status": "Active Lab Center",
    "img": "/centres/mudhoji/PHOTO-2026-07-14-21-09-31.jpg",
    "images": [
      "/centres/mudhoji/PHOTO-2026-07-14-21-09-31.jpg",
      "/centres/mudhoji/PHOTO-2026-07-14-21-09-32.jpg",
      "/centres/mudhoji/PHOTO-2026-07-14-21-45-33.jpg"
    ],
    "techStack": [
      "Arduino UNO",
      "Scratch Programming",
      "3D Printing",
      "STEM Robotics Kits",
      "Tinkercad"
    ],
    "stats": [
      {
        "label": "Students Trained",
        "value": "300+ Students"
      },
      {
        "label": "Robotics Kits",
        "value": "25+ Active Kits"
      },
      {
        "label": "Completed Projects",
        "value": "65+ Projects"
      }
    ],
    "highlights": [
      "Built autonomous line-following robot models for regional exhibitions",
      "Designed and 3D-printed custom mechanical gears in class",
      "Hosted weekly block-coding bootcamps for middle school grades"
    ]
  },
  {
    "slug": "sakharwadi-lab",
    "name": "AIRG Sakharwadi Lab",
    "icon": "agriculture",
    "sIcon": "potted_plant",
    "desc": "The AIR G Innovation Lab nurtures curiosity and innovation by combining technology, creativity, and practical learning to prepare students for Industry 4.0 and beyond.",
    "detailedDesc": "Located at Sakharwadi High School, this lab leverages technology to understand local agriculture. Students write code to interface soil sensors with automated water pumps, building practical smart-watering systems and weather monitoring stations.",
    "status": "Active Lab Center",
    "img": "/centres/sakharwadi/PHOTO-2026-07-14-21-14-30.jpg",
    "images": [
      "/centres/sakharwadi/PHOTO-2026-07-14-21-14-30.jpg",
      "/centres/sakharwadi/PHOTO-2026-07-14-21-14-30(1).jpg",
      "/centres/sakharwadi/PHOTO-2026-07-14-21-14-31.jpg",
      "/centres/sakharwadi/PHOTO-2026-07-14-21-14-48.jpg",
      "/centres/sakharwadi/PHOTO-2026-07-14-21-16-55.jpg",
      "/centres/sakharwadi/PHOTO-2026-07-14-21-16-55(1).jpg",
      "/centres/sakharwadi/PHOTO-2026-07-14-21-16-56.jpg",
      "/centres/sakharwadi/PHOTO-2026-07-14-21-16-56(1).jpg"
    ],
    "techStack": [
      "Soil Moisture Sensors",
      "Arduino ESP32",
      "Micro-Pump Actuators",
      "LED Displays"
    ],
    "stats": [
      {
        "label": "Active Learners",
        "value": "300+ Students"
      },
      {
        "label": "Soil Telemetry Kits",
        "value": "15+ Workstations"
      },
      {
        "label": "School Greenhouses",
        "value": "2 Monitored Zones"
      }
    ],
    "highlights": [
      "Programmed soil sensor kits to automatically water school plants",
      "Created digital temperature alarms for classroom weather monitoring",
      "Conducted agricultural science workshops using real-time data kits"
    ]
  },
  {
    "slug": "sant-tukaram",
    "name": "AIRG Sant Tukaram Lab",
    "icon": "hub",
    "sIcon": "lan",
    "desc": "Our AIR G Innovation Lab enables students to transform ideas into impactful projects through Artificial Intelligence, Robotics, Drone Technology, IoT, Electronics, and Digital Fabrication.",
    "detailedDesc": "The Sant Tukaram Lab provides a solid foundation in electronics. Students learn to assemble fundamental logic gates on breadboards, utilize resistors, transistors, and LEDs, and understand the core hardware components that make up modern computers.",
    "status": "Active Lab Center",
    "img": "/centres/sant-tukaram/PHOTO-2026-07-14-21-37-23(2).jpg",
    "images": [
      "/centres/sant-tukaram/PHOTO-2026-07-14-21-28-28.jpg",
      "/centres/sant-tukaram/PHOTO-2026-07-14-21-28-28(1).jpg",
      "/centres/sant-tukaram/PHOTO-2026-07-14-21-37-23.jpg",
      "/centres/sant-tukaram/PHOTO-2026-07-14-21-37-23(1).jpg",
      "/centres/sant-tukaram/PHOTO-2026-07-14-21-37-23(2).jpg",
      "/centres/sant-tukaram/PHOTO-2026-07-14-21-37-24.jpg"
    ],
    "techStack": [
      "Breadboards",
      "Logic Gate ICs (AND/OR/NOT)",
      "Multimeters",
      "LED Arrays",
      "Resistors & Capacitors"
    ],
    "stats": [
      {
        "label": "Students Guided",
        "value": "300+ Students"
      },
      {
        "label": "Electronic Benches",
        "value": "12 Stations"
      },
      {
        "label": "Logic Circuits Built",
        "value": "80+ Designs"
      }
    ],
    "highlights": [
      "Built full adder circuits on breadboards using discrete ICs",
      "Designed light-sensing night lights using photoresistors",
      "Programmed simple blinking pattern matrices using 555 timers"
    ]
  },
  {
    "slug": "swami-ramanand",
    "name": "AIRG Swami Ramanand Lab",
    "icon": "biotech",
    "sIcon": "vital_signs",
    "desc": "The AIR G Innovation Lab equips students with future-ready skills by providing an interactive environment for innovation, research, experimentation, and technology-driven learning.",
    "detailedDesc": "At Swami Ramanand Lab, biology meets technology. Students use heart-rate monitors, temperature probes, and respiratory telemetry kits to map physical responses during exercise, learning biological systems through interactive sensor data.",
    "status": "Active Lab Center",
    "img": "/extracted-hi/15bb553a-5336-4d36-8c55-818efdfbac5f.jpeg",
    "images": [
      "/extracted-hi/15bb553a-5336-4d36-8c55-818efdfbac5f.jpeg",
      "/extracted-hi/d2e24064-920f-4c3d-9542-8c43a0bcb403.jpeg"
    ],
    "techStack": [
      "Heart Rate Monitors",
      "Temperature Probes",
      "Python Data Science",
      "Scratch UI Builder"
    ],
    "stats": [
      {
        "label": "Sensor Workstations",
        "value": "10 Active Setups"
      },
      {
        "label": "Active Classrooms",
        "value": "300+ Students"
      },
      {
        "label": "Anatomy Projects",
        "value": "25+ Completed"
      }
    ],
    "highlights": [
      "Mapped classmates' heart recovery times using digital sensor graphs",
      "Programmed interactive scratch animations responsive to temperature sensors",
      "Conducted educational biology workshops during science fair week"
    ]
  },
  {
    "slug": "koteshwar-vidyaly",
    "name": "AIRG Koteshwar Vidyaly Lab",
    "icon": "memory",
    "sIcon": "microchip",
    "desc": "The AIR G Innovation Lab bridges academic knowledge with practical application, helping students develop confidence, critical thinking, and innovation through advanced technologies.",
    "detailedDesc": "Koteshwar Vidyaly Lab in Wai focuses on embedded software. Students connect microchips with LED matrices, programming basic snake games, countdown timers, and scrolling message displays.",
    "status": "Active Lab Center",
    "img": "/centres/koteshwar/PHOTO-2026-07-14-21-46-58.jpg",
    "images": [
      "/centres/koteshwar/PHOTO-2026-07-14-21-46-58.jpg",
      "/centres/koteshwar/PHOTO-2026-07-14-21-46-59.jpg",
      "/centres/koteshwar/PHOTO-2026-07-14-21-46-59(1).jpg",
      "/centres/koteshwar/PHOTO-2026-07-14-21-47-00.jpg",
      "/centres/koteshwar/PHOTO-2026-07-14-21-47-00(1).jpg",
      "/centres/koteshwar/PHOTO-2026-07-14-21-47-00(2).jpg",
      "/centres/koteshwar/PHOTO-2026-07-14-21-47-00(3).jpg",
      "/centres/koteshwar/PHOTO-2026-07-14-21-47-01.jpg",
      "/centres/koteshwar/PHOTO-2026-07-14-21-47-01(1).jpg",
      "/centres/koteshwar/PHOTO-2026-07-14-21-47-01(2).jpg"
    ],
    "techStack": [
      "Arduino Nano",
      "8x8 LED Matrices",
      "LCD Character Screens",
      "C++ Coding",
      "Buzzer Sounds"
    ],
    "stats": [
      {
        "label": "Microchip Kits",
        "value": "20+ Boards"
      },
      {
        "label": "Students Engaged",
        "value": "300+ Students"
      },
      {
        "label": "Game Code Programs",
        "value": "45+ Uploaded"
      }
    ],
    "highlights": [
      "Programmed a school bell countdown timer displayed on LCD screens",
      "Designed and coded retro 2D games using tactile buttons and LED grids",
      "Conducted inter-school programming competitions on Arduino IDE"
    ]
  },
  {
    "slug": "kshitij-hub",
    "name": "AIRG Kshitij Lab",
    "icon": "eco",
    "sIcon": "solar_power",
    "desc": "Our AIR G Innovation Lab provides students with opportunities to create intelligent solutions using AI, Robotics, IoT, Drone Technology, 3D Printing, VR, and Coding in a collaborative learning environment.",
    "detailedDesc": "Kshitij Hub focuses on ecological science. Students build mini solar panels that follow the light, assemble wind turbine toys, and track daily energy generated by clean models around the classroom.",
    "status": "Active Lab Center",
    "img": "/extracted-hi/2dedec70-5df7-4417-a08f-16a09e3ba02a.jpeg",
    "images": [
      "/extracted-hi/2dedec70-5df7-4417-a08f-16a09e3ba02a.jpeg",
      "/extracted-hi/e6ae9a91-8e6f-4f86-934e-95601aef7e25.jpeg"
    ],
    "techStack": [
      "Mini Solar Panels",
      "Light Dependent Resistors (LDR)",
      "Servomotors",
      "Clean Energy Kits"
    ],
    "stats": [
      {
        "label": "Solar Trackers",
        "value": "14 Built"
      },
      {
        "label": "Active Students",
        "value": "130+ Learners"
      },
      {
        "label": "Green Experiments",
        "value": "35 Completed"
      }
    ],
    "highlights": [
      "Built working solar tracking mounts using light sensors and motors",
      "Assembled mini-wind generators that light up LEDs when spun",
      "Compiled daily school solar radiation charts to locate optimum panel spots"
    ]
  },
  {
    "slug": "shivtej-aare",
    "name": "AIRG Shivtej Aare Lab",
    "icon": "directions_car",
    "sIcon": "sensors",
    "desc": "The AIR G Innovation Lab promotes innovation, entrepreneurship, and technological excellence by encouraging students to build, test, and present real-world technology projects.",
    "detailedDesc": "Shivtej Aare Lab teaches spatial mechanics. Students mount ultrasonic rangefinders to miniature smart cars, programming them to navigate around walls and complete small maze courses without crashing.",
    "status": "Active Lab Center",
    "img": "/extracted-hi/36ce59c9-c73c-4415-9b0b-9b3453af7866.jpeg",
    "images": [
      "/extracted-hi/36ce59c9-c73c-4415-9b0b-9b3453af7866.jpeg",
      "/extracted-hi/eb25e183-eb9d-482d-ae58-03d3f64f9d90.jpeg"
    ],
    "techStack": [
      "Smart Car Chassis",
      "Ultrasonic Sensors",
      "Infrared Line Trackers",
      "Arduino Code"
    ],
    "stats": [
      {
        "label": "Navigating Cars",
        "value": "18 Smart Cars"
      },
      {
        "label": "Classroom Enrollees",
        "value": "300+ Students"
      },
      {
        "label": "Maze Runs Logged",
        "value": "110+ Runs"
      }
    ],
    "highlights": [
      "Successfully coded smart cars to solve simple cardboard mazes",
      "Programmed emergency brake features responsive to ultrasonic distance",
      "Hosted line-following racing challenges on track sheets in the hallway"
    ]
  },
  {
    "slug": "ss-nikam",
    "name": "AIRG S.S. Nikam Lab",
    "icon": "settings_input_component",
    "sIcon": "factory",
    "desc": "The AIR G Innovation Lab prepares students for future careers by integrating modern technologies with design thinking, problem-solving, teamwork, and experiential education.",
    "detailedDesc": "S.S. Nikam Lab introduces internet-connected devices. Middle schoolers configure temperature, humidity, and barometric sensors, uploading live local weather charts to a shared campus web page.",
    "status": "Active Lab Center",
    "img": "/centres/ss-nikam/PHOTO-2026-07-14-21-47-36.jpg",
    "images": [
      "/centres/ss-nikam/PHOTO-2026-07-14-21-47-36.jpg",
      "/centres/ss-nikam/PHOTO-2026-07-14-21-47-37.jpg",
      "/centres/ss-nikam/PHOTO-2026-07-14-21-47-37(1).jpg",
      "/centres/ss-nikam/PHOTO-2026-07-14-21-47-38.jpg"
    ],
    "techStack": [
      "DHT11 Temperature Sensor",
      "Wi-Fi ESP8266 Microchips",
      "IoT dashboards",
      "Weather APIs"
    ],
    "stats": [
      {
        "label": "Weather Nodes",
        "value": "8 Connected Stations"
      },
      {
        "label": "Logs Streamed",
        "value": "5000+ Records"
      },
      {
        "label": "Enrolled Students",
        "value": "140+ Learners"
      }
    ],
    "highlights": [
      "Connected school weather arrays to broadcast local heat indexes",
      "Programmed Wi-Fi chips to email daily classroom humidity summaries",
      "Coded web-dashboards that show daily climate patterns to all teachers"
    ]
  },
  {
    "slug": "shoran-tech",
    "name": "AIRG Shoran Tech Lab",
    "icon": "translate",
    "sIcon": "record_voice_over",
    "desc": "The AIR G Innovation Lab is a world-class innovation ecosystem that empowers students with the knowledge, skills, and confidence to become future innovators, creators, entrepreneurs, and technology leaders through hands-on learning.",
    "detailedDesc": "Shoran Tech Lab teaches computer software integration with languages. Students build voice translation apps, regional language dictionaries, and interactive scratch games that speak Marathi and Hindi.",
    "status": "Active Lab Center",
    "img": "/extracted-hi/4fa71794-9da2-4237-bce5-5ab472591b79.jpeg",
    "images": [
      "/extracted-hi/4fa71794-9da2-4237-bce5-5ab472591b79.jpeg",
      "/extracted-hi/fb8255e5-dfd3-4eb7-bd23-f0027f2c99ff.jpeg"
    ],
    "techStack": [
      "Scratch Audio Blocks",
      "Block Translation APIs",
      "Voice Recording Tools",
      "Storytelling Software"
    ],
    "stats": [
      {
        "label": "Apps Developed",
        "value": "35+ Scratch Apps"
      },
      {
        "label": "Middle Schoolers",
        "value": "300+ Students"
      },
      {
        "label": "Language Modules",
        "value": "3 Dialects Mapped"
      }
    ],
    "highlights": [
      "Coded interactive bilingual vocabulary cards using Scratch text-to-speech",
      "Designed regional storytelling games with voice-activated paths",
      "Conducted educational game showcases during parent-teacher meetings"
    ]
  }
];
