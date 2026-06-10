export const products = [
  {
    id: 1, name: "GARE Falcon", slug: "gare-falcon", category: "Air Rifles",
    price: 50000, stock: 5, isFeatured: true,
    image: "https://picsum.photos/seed/rifle1/600/400",
    images: [
      "https://picsum.photos/seed/rifle1/600/400",
      "https://picsum.photos/seed/rifle1b/600/400",
      "https://picsum.photos/seed/rifle1c/600/400",
    ],
    description: "Premium competition-grade air rifle designed for precision shooting. The GARE Falcon delivers exceptional accuracy and consistency for competitive shooters.",
    specifications: { Caliber: "0.177", Velocity: "180 mps", Action: "PCP", Weight: "3.2 kg", Length: "1050mm" }
  },
  {
    id: 2, name: "SP60 Air Pistol", slug: "sp60-air-pistol", category: "Air Pistols",
    price: 60000, stock: 3, isFeatured: true,
    image: "https://picsum.photos/seed/pistol1/600/400",
    images: [
      "https://picsum.photos/seed/pistol1/600/400",
      "https://picsum.photos/seed/pistol1b/600/400",
      "https://picsum.photos/seed/pistol1c/600/400",
    ],
    description: "Compact, high-performance air pistol perfect for competitive shooting and training.",
    specifications: { Caliber: "0.177", Velocity: "128 mps", Action: "Break Barrel", Weight: "1.1 kg" }
  },
  {
    id: 3, name: "GM-10 Karbin Camo", slug: "gm-10-karbin-camo", category: "Air Rifles",
    price: 39000, stock: 8, isFeatured: true,
    image: "https://picsum.photos/seed/rifle2/600/400",
    images: [
      "https://picsum.photos/seed/rifle2/600/400",
      "https://picsum.photos/seed/rifle2b/600/400",
    ],
    description: "Tactical camo air rifle for sports shooters. Features a durable synthetic stock with camouflage pattern.",
    specifications: { Caliber: "0.177", Velocity: "175 mps", Action: "PCP", Weight: "2.8 kg" }
  },
  {
    id: 4, name: "JSB KnockOut Slugs", slug: "jsb-knockout-slugs", category: "Pellets",
    price: 1500, stock: 50, isFeatured: true,
    image: "https://picsum.photos/seed/pellet1/600/400",
    images: [
      "https://picsum.photos/seed/pellet1/600/400",
    ],
    description: "Premium accuracy slugs for PCP rifles. JSB quality ensures consistent performance shot after shot."
  },
  {
    id: 5, name: "GM-10XSM", slug: "gm-10xsm", category: "Air Rifles",
    price: 30000, stock: 6, isFeatured: true,
    image: "https://picsum.photos/seed/rifle3/600/400",
    images: [
      "https://picsum.photos/seed/rifle3/600/400",
      "https://picsum.photos/seed/rifle3b/600/400",
    ],
    description: "Lightweight sports air rifle ideal for beginners and intermediate shooters."
  },
  {
    id: 6, name: "NX100 Club Elite", slug: "nx100-club-elite", category: "Air Rifles",
    price: 11799, stock: 10, isFeatured: false,
    image: "https://picsum.photos/seed/rifle4/600/400",
    images: [
      "https://picsum.photos/seed/rifle4/600/400",
    ],
    description: "Club-level training air rifle. Affordable yet reliable for regular practice sessions."
  },
  {
    id: 7, name: "BHIM Air Rifle", slug: "bhim-air-rifle", category: "Air Rifles",
    price: 45000, stock: 4, isFeatured: true,
    image: "https://picsum.photos/seed/rifle5/600/400",
    images: [
      "https://picsum.photos/seed/rifle5/600/400",
      "https://picsum.photos/seed/rifle5b/600/400",
    ],
    description: "The BHIM is a powerful, precision-engineered air rifle built for serious shooters.",
    specifications: { Caliber: "0.177", Velocity: "185 mps", Action: "PCP", Weight: "3.5 kg" }
  },
  {
    id: 8, name: "Target Pellets .177", slug: "target-pellets-177", category: "Pellets",
    price: 800, stock: 100, isFeatured: false,
    image: "https://picsum.photos/seed/pellet2/600/400",
    images: [
      "https://picsum.photos/seed/pellet2/600/400",
    ],
    description: "Competition-grade target pellets in .177 caliber for precision shooting."
  },
  {
    id: 9, name: "4x32 Rifle Scope", slug: "4x32-rifle-scope", category: "Sights",
    price: 5500, stock: 7, isFeatured: false,
    image: "https://picsum.photos/seed/scope1/600/400",
    images: [
      "https://picsum.photos/seed/scope1/600/400",
    ],
    description: "Fixed magnification rifle scope perfect for target shooting."
  },
  {
    id: 10, name: "Rifle Carrying Case", slug: "rifle-carrying-case", category: "Cases & Holsters",
    price: 3500, stock: 5, isFeatured: false,
    image: "https://picsum.photos/seed/case1/600/400",
    images: [
      "https://picsum.photos/seed/case1/600/400",
    ],
    description: "Padded hard case for safe transport of your air rifle."
  },
  {
    id: 11, name: "Cleaning Kit Pro", slug: "cleaning-kit-pro", category: "Maintenance",
    price: 2200, stock: 12, isFeatured: false,
    image: "https://picsum.photos/seed/clean1/600/400",
    images: [
      "https://picsum.photos/seed/clean1/600/400",
    ],
    description: "Complete cleaning and maintenance kit for air rifles and pistols."
  },
  {
    id: 12, name: "Bipod Adapter Mount", slug: "bipod-adapter-mount", category: "Accessories",
    price: 1800, stock: 8, isFeatured: false,
    image: "https://picsum.photos/seed/mount1/600/400",
    images: [
      "https://picsum.photos/seed/mount1/600/400",
    ],
    description: "Universal bipod adapter mount for air rifles with Picatinny rail."
  },
];

export const categories = [
  { id: 1, name: "Air Rifles", slug: "air-rifles", count: 10, image: "https://picsum.photos/seed/cat1/400/300" },
  { id: 2, name: "Air Pistols", slug: "air-pistols", count: 2, image: "https://picsum.photos/seed/cat2/400/300" },
  { id: 3, name: "Pellets", slug: "pellets", count: 12, image: "https://picsum.photos/seed/cat3/400/300" },
  { id: 4, name: "Accessories", slug: "accessories", count: 8, image: "https://picsum.photos/seed/cat4/400/300" },
  { id: 5, name: "Spare Parts", slug: "spare-parts", count: 15, image: "https://picsum.photos/seed/cat5/400/300" },
  { id: 6, name: "Sights", slug: "sights", count: 4, image: "https://picsum.photos/seed/cat6/400/300" },
  { id: 7, name: "Cases & Holsters", slug: "cases-holsters", count: 3, image: "https://picsum.photos/seed/cat7/400/300" },
  { id: 8, name: "Maintenance", slug: "maintenance", count: 5, image: "https://picsum.photos/seed/cat8/400/300" },
];

export const reviews = [
  {
    id: 1, name: "Kowtham Ravichandran", initials: "KR", rating: 5,
    comment: "Excellent shooting range in Erode district. Mr. Thiyagu and Mr. Saravanan gave detailed explanation about the purpose and importance of shooting sports.",
    date: "2 months ago", isVerified: true
  },
  {
    id: 2, name: "Dinesh Venkatachalam", initials: "DV", rating: 5,
    comment: "Best place to visit. Friendly staff and good guidance. Guns are in perfect condition.",
    date: "3 months ago", isVerified: true
  },
  {
    id: 3, name: "Saravanan Thangaraj", initials: "ST", rating: 5,
    comment: "Good place for purchasing air rifles. Also they have club attached for practice.",
    date: "1 month ago", isVerified: true
  },
];

export const events = [
  {
    id: 1, title: "Tamil Nadu State Shooting Championship 2025",
    type: "Competition", date: "Aug 15, 2025", time: "9:00 AM - 5:00 PM",
    location: "Erode Shooting Range, Keel Thindal", isFeatured: true,
    description: "Compete with the best shooters in Tamil Nadu. Open to all registered shooters."
  },
  {
    id: 2, title: "Beginner Air Rifle Training Camp",
    type: "Training", date: "Jul 20, 2025", time: "8:00 AM - 12:00 PM",
    location: "Erode Rifles Training Center", isFeatured: true,
    description: "3-day intensive training camp for beginners. All equipment provided."
  },
  {
    id: 3, title: "Monthly Target Practice Meet",
    type: "Event", date: "Jul 5, 2025", time: "3:00 PM - 6:00 PM",
    location: "Erode Rifles Range", isFeatured: false,
    description: "Monthly practice session for all levels. Come sharpen your skills."
  },
  {
    id: 4, title: "Advanced Marksmanship Workshop",
    type: "Workshop", date: "Sep 10, 2025", time: "10:00 AM - 4:00 PM",
    location: "Erode Rifles Training Center", isFeatured: true,
    description: "Expert-led workshop on advanced shooting techniques and competition preparation."
  },
];

export const teamMembers = [
  {
    id: 1, name: "Mr. Thiyagu", designation: "Owner & Head Coach",
    description: "Passionate shooting sports expert with years of experience in training national-level shooters.",
    image: "https://picsum.photos/seed/team1/300/300"
  },
  {
    id: 2, name: "Mr. Saravanan", designation: "Senior Trainer",
    description: "Certified instructor and national-level shooting enthusiast with a passion for developing new talent.",
    image: "https://picsum.photos/seed/team2/300/300"
  },
];

export const achievements = [
  { id: 1, title: "State Level Champions", year: "2023", description: "Won Tamil Nadu State Shooting Championship" },
  { id: 2, title: "Best Shooting Club Award", year: "2022", description: "Recognized as best shooting club in Erode district" },
  { id: 3, title: "National Level Participation", year: "2024", description: "Athletes trained at our facility participated in National Championships" },
];

export const whyChooseUs = [
  { icon: "Shield", title: "Secure Online Shopping", desc: "Shop with confidence on our secure platform. Your data and transactions are always protected." },
  { icon: "Award", title: "Expert Guidance", desc: "Knowledgeable professionals passionate about shooting. Get expert advice on every purchase." },
  { icon: "Tag", title: "Competitive Pricing", desc: "Top-quality products at unbeatable prices. Best value for your investment." },
  { icon: "Heart", title: "Customer Satisfaction", desc: "Your satisfaction is our first priority. We go above and beyond for every customer." },
  { icon: "Check", title: "Genuine Products", desc: "Every product is handpicked and verified. No counterfeits, guaranteed authenticity." },
];

export const orders = [
  {
    id: "ER-2025-001", date: "Jun 15, 2025", items: [
      { name: "GARE Falcon", qty: 1, price: 50000 },
      { name: "JSB KnockOut Slugs", qty: 2, price: 1500 }
    ],
    total: 53000, status: "Delivered",
    timeline: [
      { step: "Order Placed", date: "Jun 15", completed: true },
      { step: "Payment Verified", date: "Jun 15", completed: true },
      { step: "Packed", date: "Jun 16", completed: true },
      { step: "Dispatched", date: "Jun 17", completed: true },
      { step: "Out for Delivery", date: "Jun 18", completed: true },
      { step: "Delivered", date: "Jun 18", completed: true },
    ]
  },
  {
    id: "ER-2025-002", date: "Jul 2, 2025", items: [
      { name: "GM-10XSM", qty: 1, price: 30000 }
    ],
    total: 30000, status: "Dispatched",
    timeline: [
      { step: "Order Placed", date: "Jul 2", completed: true },
      { step: "Payment Verified", date: "Jul 2", completed: true },
      { step: "Packed", date: "Jul 3", completed: true },
      { step: "Dispatched", date: "Jul 4", completed: true },
      { step: "Out for Delivery", date: "-", completed: false },
      { step: "Delivered", date: "-", completed: false },
    ]
  },
  {
    id: "ER-2025-003", date: "Jul 10, 2025", items: [
      { name: "Target Pellets .177", qty: 5, price: 800 },
      { name: "Cleaning Kit Pro", qty: 1, price: 2200 }
    ],
    total: 6200, status: "Packed",
    timeline: [
      { step: "Order Placed", date: "Jul 10", completed: true },
      { step: "Payment Verified", date: "Jul 10", completed: true },
      { step: "Packed", date: "Jul 11", completed: true },
      { step: "Dispatched", date: "-", completed: false },
      { step: "Out for Delivery", date: "-", completed: false },
      { step: "Delivered", date: "-", completed: false },
    ]
  },
];

export const trainingApplications = [
  { id: 1, name: "Rahul Kumar", phone: "9876543210", program: "Beginner", date: "Jul 1, 2025", status: "Approved" },
  { id: 2, name: "Priya Sharma", phone: "9876543211", program: "Intermediate", date: "Jul 3, 2025", status: "Pending" },
  { id: 3, name: "Arun Vijay", phone: "9876543212", program: "Advanced", date: "Jul 5, 2025", status: "Pending" },
];

export const storeInfo = {
  phone1: "+91 9994893337",
  phone2: "+91 9842991959",
  email: "contact@eroderifles.com",
  address: "Opp SDS Gaden, Therku Pallam Road, Keel Thindal, Tamil Nadu 638012",
  hours: "Mon - Sat: 9:00 AM - 7:00 PM | Sunday: Closed",
  whatsapp: "919994893337",
};
