// =============================================================================
// Erode Rifles - Real Product Data from eroderifles.com
// =============================================================================

export const heroImage = "/images/hero-banner.png";

export const products = [
  {
    id: 1,
    name: "GARE BHIM",
    slug: "gare-bhim",
    category: "Air Rifles",
    price: 55000,
    originalPrice: 58000,
    stock: 4,
    isFeatured: true,
    image: "/images/products/bhim.png",
    images: [
      "/images/products/bhim.png",
      "/images/products/falcon.png",
    ],
    shortDescription: "Powerful PCP air rifle with synthetic stock for precision long-range shooting.",
    description:
      "The BHIM is a powerful PCP air rifle from GARE with synthetic stock. Designed for precision long-range shooting with consistent accuracy. Built for serious shooters who demand reliability and performance in every shot.",
    specifications: {
      Caliber: '0.177" (4.5mm)',
      Action: "PCP",
      Velocity: "200 mps",
      Weight: "3.2 kg",
      Stock: "Synthetic",
      Trigger: "2 Stage Adjustable",
    },
  },
  {
    id: 2,
    name: "GARE Falcon",
    slug: "gare-falcon",
    category: "Air Rifles",
    price: 50000,
    originalPrice: 53000,
    stock: 5,
    isFeatured: true,
    image: "/images/products/falcon.png",
    images: [
      "/images/products/falcon.png",
      "/images/products/bhim.png",
    ],
    shortDescription: "Fully regulated PCP air rifle with precision-engineered barrel for consistent accuracy.",
    description:
      "The Falcon is a fully regulated PCP air rifle from GARE. Features a precision-engineered barrel for consistent accuracy and a regulated action for shot-to-shot consistency. The beechwood stock provides a classic feel with modern performance.",
    specifications: {
      Caliber: '0.177" (4.5mm)',
      Action: "PCP (Regulated)",
      Velocity: "180 mps",
      Weight: "3.0 kg",
      Stock: "Beechwood",
      Trigger: "Adjustable",
    },
  },
  {
    id: 3,
    name: "GARE PEEP SIGHT MODEL",
    slug: "gare-peep-sight-model",
    category: "Air Rifles",
    price: 42000,
    stock: 3,
    isFeatured: true,
    image: "/images/products/falcon.png",
    images: [
      "/images/products/falcon.png",
    ],
    shortDescription: "Competition-grade air rifle with peep sight for precision target shooting.",
    description:
      "Competition-grade air rifle with peep sight for precision target shooting. Designed for competitive shooters who require the highest level of accuracy and consistency in their equipment.",
    specifications: {
      Caliber: '0.177" (4.5mm)',
      Action: "PCP",
      Sight: "Peep Sight",
      Weight: "3.4 kg",
      Stock: "Wooden",
      Trigger: "Adjustable Match",
    },
  },
  {
    id: 4,
    name: "GM-10 Karbin Camo",
    slug: "gm-10-karbin-camo",
    category: "Air Rifles",
    price: 39000,
    stock: 8,
    isFeatured: true,
    image: "/images/products/gm10-camo.png",
    images: [
      "/images/products/gm10-camo.png",
    ],
    shortDescription: "Durable synthetic stock with camouflage pattern for sports and target shooting.",
    description:
      "The GM-10 Karbin features a durable synthetic stock with camouflage pattern. A reliable PCP air rifle for sports and target shooting. Perfect for shooters who want a rugged, good-looking rifle that performs consistently.",
    specifications: {
      Caliber: '0.177" (4.5mm)',
      Action: "PCP",
      Velocity: "175 mps",
      Weight: "2.8 kg",
      Stock: "Synthetic Camo",
      Trigger: "2 Stage",
    },
  },
  {
    id: 5,
    name: "PX100 Club Pro Junior",
    slug: "px100-club-pro-junior",
    category: "Air Rifles",
    price: 32500,
    stock: 6,
    isFeatured: true,
    image: "/images/products/px100.png",
    images: [
      "/images/products/px100.png",
    ],
    shortDescription: "Ideal for young shooters entering competitive shooting with lightweight design.",
    description:
      "The PX100 Club Pro Junior is ideal for young shooters entering competitive shooting. Lightweight design with precision barrel ensures young athletes can develop their skills with proper equipment that fits their frame.",
    specifications: {
      Caliber: '0.177" (4.5mm)',
      Action: "PCP",
      Weight: "3.1 kg",
      Stock: "Wooden",
      Trigger: "Adjustable",
    },
  },
  {
    id: 6,
    name: "SP60 Aries Air Pistol",
    slug: "sp60-aries-air-pistol",
    category: "Air Pistols",
    price: 32000,
    stock: 3,
    isFeatured: true,
    image: "/images/products/sp60.png",
    images: [
      "/images/products/sp60.png",
    ],
    shortDescription: "Feature-packed air pistol for the best shooting experience in a compact package.",
    description:
      "The SP60 Aries air pistol is packed with features that will give you the best shooting experience in a compact package. Ideal for competitive pistol shooting and training sessions.",
    specifications: {
      Caliber: '0.177" (4.5mm)',
      Action: "PCP",
      Velocity: "150 mps",
      Weight: "1.1 kg",
      Trigger: "Adjustable",
    },
  },
  {
    id: 7,
    name: "PX100 Achilles Air Pistol",
    slug: "px100-achilles-air-pistol",
    category: "Air Pistols",
    price: 28000,
    stock: 4,
    isFeatured: false,
    image: "/images/products/sp60.png",
    images: [
      "/images/products/sp60.png",
    ],
    shortDescription: "Competition air pistol designed for precision and consistency.",
    description:
      "The PX100 Achilles is a competition-grade air pistol built for precision shooting. Features excellent balance and ergonomics for competitive pistol shooters.",
    specifications: {
      Caliber: '0.177" (4.5mm)',
      Action: "PCP",
      Weight: "1.2 kg",
      Trigger: "Adjustable Match",
    },
  },
  {
    id: 8,
    name: "GARE Avenger",
    slug: "gare-avenger",
    category: "Air Rifles",
    price: 24500,
    stock: 7,
    isFeatured: false,
    image: "/images/products/avenger.png",
    images: [
      "/images/products/avenger.png",
    ],
    shortDescription: "Entry model PCP air rifle with synthetic stock and steel reservoir.",
    description:
      "The Avenger is an entry model Pre-Charged Pneumatic Air Rifle from GARE with synthetic stock, steel reservoir and plastic trigger guard. A great starting point for shooters looking to get into PCP air rifles without breaking the bank.",
    specifications: {
      Caliber: '0.177" (4.5mm)',
      Action: "PCP",
      Weight: "2.8 kg",
      Stock: "Synthetic",
      Reservoir: "Steel",
      Trigger: "2 Stage",
    },
  },
  {
    id: 9,
    name: "NX100 Club Elite Black",
    slug: "nx100-club-elite-black",
    category: "Air Rifles",
    price: 11799,
    stock: 10,
    isFeatured: false,
    image: "/images/products/scout.png",
    images: [
      "/images/products/scout.png",
    ],
    shortDescription: "Nitro piston powered air rifle with 180 mps velocity and 7.5 Joules power.",
    description:
      "The NX100 Club Elite is a nitro piston powered air rifle. Caliber: 0.177, Max Velocity: 180 mps / 600 fps, Power: 7.5 Joules. Perfect for club-level shooting and regular practice sessions.",
    specifications: {
      Caliber: '0.177" (4.5mm)',
      Velocity: "180 mps / 600 fps",
      Power: "7.5 Joules",
      "Power Plant": "Nitro Piston",
      Stock: "Synthetic",
    },
  },
  {
    id: 10,
    name: "GARE Scout",
    slug: "gare-scout",
    category: "Air Rifles",
    price: 8500,
    stock: 12,
    isFeatured: false,
    image: "/images/products/scout.png",
    images: [
      "/images/products/scout.png",
    ],
    shortDescription: "Gas piston air rifle with 12-groove rifled barrel for consistent accuracy.",
    description:
      "Scout is a gas piston operated air rifle from GARE. The inert gas piston coupled with the 12-groove rifled barrel provides consistent shots with excellent accuracy. The stock is made of synthetic material. An excellent choice for shooters looking for reliability and performance at an accessible price point.",
    specifications: {
      Caliber: '0.177" (4.5mm)',
      Velocity: "750 fps",
      Energy: "16 Joules",
      Weight: "3.3 kg",
      Length: "1150 mm",
      Barrel: "480 mm, 12-groove rifled",
      Action: "Break Barrel",
      "Power Plant": "Nitro Piston",
      Stock: "Synthetic",
      Trigger: "2 Stage Adjustable",
      Safety: "Automatic",
      "Mounting Rail": '3/8" (11mm) Dovetail',
    },
  },
  {
    id: 11,
    name: "GenNeX SDB",
    slug: "gennex-sdb",
    category: "Air Rifles",
    price: 5700,
    stock: 15,
    isFeatured: false,
    image: "/images/products/avenger.png",
    images: [
      "/images/products/avenger.png",
    ],
    shortDescription: "Spring-powered air rifle for beginners — affordable yet reliable.",
    description:
      "Spring-powered air rifle for beginners. Affordable yet reliable for entry-level practice. The GenNeX SDB is the perfect first air rifle for anyone looking to get started in the sport of shooting.",
    specifications: {
      Caliber: '0.177" (4.5mm)',
      Action: "Spring Piston",
      Velocity: "550 fps",
      Weight: "2.9 kg",
      Stock: "Synthetic",
    },
  },
  {
    id: 12,
    name: "JSB KnockOut Slugs",
    slug: "jsb-knockout-slugs",
    category: "Pellets",
    price: 1500,
    stock: 50,
    isFeatured: false,
    image: "/images/products/falcon.png",
    images: [
      "/images/products/falcon.png",
    ],
    shortDescription: "Premium accuracy slugs for PCP rifles — JSB quality for consistent performance.",
    description:
      "Premium accuracy slugs for PCP rifles. JSB quality ensures consistent performance shot after shot. Trusted by competition shooters worldwide for their uniformity and precision.",
    specifications: {
      Caliber: '0.177" (4.5mm)',
      Type: "Slugs",
      Quantity: "200 per tin",
      Brand: "JSB",
    },
  },
  {
    id: 13,
    name: "Target Pellets .177",
    slug: "target-pellets-177",
    category: "Pellets",
    price: 800,
    stock: 100,
    isFeatured: false,
    image: "/images/products/falcon.png",
    images: [
      "/images/products/falcon.png",
    ],
    shortDescription: "Competition-grade target pellets in .177 caliber for precision shooting.",
    description:
      "Competition-grade target pellets in .177 caliber for precision shooting. Wadcutter design for clean holes in paper targets — ideal for 10m and competitive target shooting.",
    specifications: {
      Caliber: '0.177" (4.5mm)',
      Type: "Wadcutter",
      Weight: "8.02 grains",
      Quantity: "500 per tin",
    },
  },
  {
    id: 14,
    name: "4x32 Rifle Scope",
    slug: "4x32-rifle-scope",
    category: "Sights",
    price: 5500,
    stock: 7,
    isFeatured: false,
    image: "/images/products/falcon.png",
    images: [
      "/images/products/falcon.png",
    ],
    shortDescription: "Fixed magnification rifle scope perfect for target shooting.",
    description:
      "Fixed 4x magnification rifle scope with 32mm objective lens. Ideal for target shooting and plinking. Features fully coated lenses for bright, clear images and windage/elevation adjustments.",
    specifications: {
      Magnification: "4x",
      "Objective Lens": "32mm",
      "Tube Diameter": "1 inch",
      Reticle: "Duplex",
      "Field of View": "28 ft @ 100 yds",
    },
  },
  {
    id: 15,
    name: "Rifle Carrying Case",
    slug: "rifle-carrying-case",
    category: "Cases & Holsters",
    price: 3500,
    stock: 5,
    isFeatured: false,
    image: "/images/products/falcon.png",
    images: [
      "/images/products/falcon.png",
    ],
    shortDescription: "Padded hard case for safe transport of your air rifle.",
    description:
      "Padded hard case for safe transport of your air rifle. Features foam interior, lockable latches, and carrying handle. Fits most standard air rifles up to 1100mm in length.",
    specifications: {
      Material: "ABS Hard Shell",
      Interior: "Egg-crate Foam",
      Length: "1150 mm",
      Lockable: "Yes — 2 latches",
    },
  },
  {
    id: 16,
    name: "Cleaning Kit Pro",
    slug: "cleaning-kit-pro",
    category: "Maintenance",
    price: 2200,
    stock: 12,
    isFeatured: false,
    image: "/images/products/falcon.png",
    images: [
      "/images/products/falcon.png",
    ],
    shortDescription: "Complete cleaning and maintenance kit for air rifles and pistols.",
    description:
      "Complete cleaning and maintenance kit for air rifles and pistols. Includes cleaning rod, brushes, patches, oil, and carrying case. Keep your airgun in peak condition for consistent performance.",
    specifications: {
      Compatibility: ".177 and .22 cal",
      Includes: "Rod, Brushes, Patches, Oil, Case",
      Brand: "Erode Rifles",
    },
  },
  {
    id: 17,
    name: "Bipod Adapter Mount",
    slug: "bipod-adapter-mount",
    category: "Mounts",
    price: 1800,
    stock: 8,
    isFeatured: false,
    image: "/images/products/falcon.png",
    images: [
      "/images/products/falcon.png",
    ],
    shortDescription: "Universal bipod adapter mount for air rifles with Picatinny rail.",
    description:
      "Universal bipod adapter mount for air rifles with Picatinny rail. Sturdy aluminum construction with quick-detach lever. Compatible with most popular bipod brands.",
    specifications: {
      Material: "Aluminum Alloy",
      "Rail Type": "Picatinny / Weaver",
      Attachment: "Quick Detach Lever",
      Weight: "85 g",
    },
  },
  {
    id: 18,
    name: "Erode Rifles Cap",
    slug: "erode-rifles-cap",
    category: "Merchandise",
    price: 750,
    stock: 20,
    isFeatured: false,
    image: "/images/products/falcon.png",
    images: [
      "/images/products/falcon.png",
    ],
    shortDescription: "Official Erode Rifles embroidered cap — show your shooting pride.",
    description:
      "Official Erode Rifles embroidered cap. Adjustable strap, breathable mesh back, one size fits all. Show your shooting pride with the Erode Rifles logo front and center.",
    specifications: {
      Material: "Cotton / Polyester Blend",
      Size: "Adjustable — One Size",
      Color: "Military Green / Black",
      Logo: "Embroidered",
    },
  },
];

export const categories = [
  { id: 1, name: "Air Rifles", slug: "air-rifles", count: 10, image: "/images/categories/air-rifles.png" },
  { id: 2, name: "Air Pistols", slug: "air-pistols", count: 2, image: "/images/categories/air-pistols.png" },
  { id: 3, name: "Pellets", slug: "pellets", count: 12, image: "/images/categories/pellets.png" },
  { id: 4, name: "Accessories", slug: "accessories", count: 8, image: "/images/categories/accessories.png" },
  { id: 5, name: "Spare Parts", slug: "spare-parts", count: 15, image: "/images/categories/accessories.png" },
  { id: 6, name: "Sights", slug: "sights", count: 4, image: "/images/categories/accessories.png" },
  { id: 7, name: "Cases & Holsters", slug: "cases-holsters", count: 3, image: "/images/categories/accessories.png" },
  { id: 8, name: "Maintenance", slug: "maintenance", count: 5, image: "/images/categories/accessories.png" },
  { id: 9, name: "Mounts", slug: "mounts", count: 4, image: "/images/categories/accessories.png" },
  { id: 10, name: "Merchandise", slug: "merchandise", count: 3, image: "/images/categories/accessories.png" },
  { id: 11, name: "Others", slug: "others", count: 6, image: "/images/categories/accessories.png" },
];

export const reviews = [
  {
    id: 1,
    name: "Kowtham Ravichandran",
    initials: "KR",
    avatarBg: "#4285F4",
    rating: 5,
    comment:
      "Excellent shooting range in Erode district. Mr. Thiyagu and Mr. Saravanan gave detailed explanation about the purpose and importance of shooting sports. Great facility for beginners and experienced shooters alike.",
    date: "2 months ago",
    isVerified: true,
    googleLocalGuide: "Local Guide",
    reviewCount: 24,
  },
  {
    id: 2,
    name: "Dinesh Venkatachalam",
    initials: "DV",
    avatarBg: "#DB4437",
    rating: 5,
    comment:
      "Best place to visit for shooting enthusiasts. Friendly staff and good guidance. The guns are in perfect condition and well maintained. Would definitely recommend to anyone interested in air rifle shooting.",
    date: "3 months ago",
    isVerified: true,
    googleLocalGuide: null,
    reviewCount: 8,
  },
  {
    id: 3,
    name: "Saravanan Thangaraj",
    initials: "ST",
    avatarBg: "#0F9D58",
    rating: 5,
    comment:
      "Good place for purchasing air rifles and accessories. They also have a club attached for practice. The staff is very knowledgeable and helps you choose the right equipment.",
    date: "1 month ago",
    isVerified: true,
    googleLocalGuide: "Local Guide",
    reviewCount: 15,
  },
  {
    id: 4,
    name: "Priya Mohan",
    initials: "PM",
    avatarBg: "#F4B400",
    rating: 5,
    comment:
      "My son attended the beginner training camp here and loved it! The instructors are patient and professional. The facility is clean and well-organized. Highly recommend for families looking to get into shooting sports.",
    date: "3 weeks ago",
    isVerified: true,
    googleLocalGuide: null,
    reviewCount: 3,
  },
  {
    id: 5,
    name: "Arun Kumar Subramanian",
    initials: "AK",
    avatarBg: "#4285F4",
    rating: 4,
    comment:
      "Good collection of air rifles and pistols. Prices are competitive compared to other shops. The staff could be a bit more attentive during busy hours, but overall a great experience.",
    date: "5 months ago",
    isVerified: true,
    googleLocalGuide: "Local Guide",
    reviewCount: 42,
  },
  {
    id: 6,
    name: "Meena Rajesh",
    initials: "MR",
    avatarBg: "#DB4437",
    rating: 5,
    comment:
      "Excellent customer service! They helped me choose the right air rifle for my skill level. The after-sales support is also very good. They even helped with the sight calibration. Truly professional.",
    date: "6 weeks ago",
    isVerified: true,
    googleLocalGuide: null,
    reviewCount: 6,
  },
];

export const events = [
  {
    id: 1,
    title: "Tamil Nadu State Shooting Championship 2025",
    type: "Competition",
    date: "Aug 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Erode Shooting Range, Keel Thindal",
    isFeatured: true,
    description:
      "Compete with the best shooters in Tamil Nadu. Open to all registered shooters.",
  },
  {
    id: 2,
    title: "Beginner Air Rifle Training Camp",
    type: "Training",
    date: "Jul 20, 2025",
    time: "8:00 AM - 12:00 PM",
    location: "Erode Rifles Training Center",
    isFeatured: true,
    description:
      "3-day intensive training camp for beginners. All equipment provided.",
  },
  {
    id: 3,
    title: "Monthly Target Practice Meet",
    type: "Event",
    date: "Jul 5, 2025",
    time: "3:00 PM - 6:00 PM",
    location: "Erode Rifles Range",
    isFeatured: false,
    description: "Monthly practice session for all levels. Come sharpen your skills.",
  },
  {
    id: 4,
    title: "Advanced Marksmanship Workshop",
    type: "Workshop",
    date: "Sep 10, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Erode Rifles Training Center",
    isFeatured: true,
    description:
      "Expert-led workshop on advanced shooting techniques and competition preparation.",
  },
];

export const teamMembers = [
  {
    id: 1,
    name: "Mr. Thiyagu",
    designation: "Owner & Head Coach",
    description:
      "Passionate shooting sports expert with years of experience in training national-level shooters.",
    image: "/images/products/falcon.png",
  },
  {
    id: 2,
    name: "Mr. Saravanan",
    designation: "Senior Trainer",
    description:
      "Certified instructor and national-level shooting enthusiast with a passion for developing new talent.",
    image: "/images/products/falcon.png",
  },
];

export const achievements = [
  {
    id: 1,
    title: "State Level Champions",
    year: "2023",
    description: "Won Tamil Nadu State Shooting Championship",
  },
  {
    id: 2,
    title: "Best Shooting Club Award",
    year: "2022",
    description: "Recognized as best shooting club in Erode district",
  },
  {
    id: 3,
    title: "National Level Participation",
    year: "2024",
    description:
      "Athletes trained at our facility participated in National Championships",
  },
];

export const aboutInfo = {
  mission:
    "At Erode Rifles, our mission is simple: to provide our customers with the finest selection of air rifles, air pistols, and accessories while delivering an outstanding shopping experience.",
  quality:
    "We handpick each product in our inventory, ensuring that only the highest quality airguns, accessories, spares, and pellets make it to our shelves.",
  team: "Our team consists of knowledgeable professionals who are passionate about airgun shooting.",
};

export const whyChooseUs = [
  {
    icon: "Shield",
    title: "Secure Online Shopping",
    desc: "Shop with confidence on our secure platform. Your data and transactions are always protected.",
  },
  {
    icon: "Award",
    title: "Expert Guidance",
    desc: "Knowledgeable professionals passionate about shooting. Get expert advice on every purchase.",
  },
  {
    icon: "Tag",
    title: "Competitive Pricing",
    desc: "Top-quality products at unbeatable prices. Best value for your investment.",
  },
  {
    icon: "Heart",
    title: "Customer Satisfaction",
    desc: "Your satisfaction is our first priority. We go above and beyond for every customer.",
  },
  {
    icon: "Check",
    title: "Genuine Products",
    desc: "Every product is handpicked and verified. No counterfeits, guaranteed authenticity.",
  },
];

export const orders = [
  {
    id: "ER-2025-001",
    date: "Jun 15, 2025",
    items: [
      { name: "GARE Falcon", qty: 1, price: 50000 },
      { name: "JSB KnockOut Slugs", qty: 2, price: 1500 },
    ],
    total: 53000,
    status: "Delivered",
    timeline: [
      { step: "Order Placed", date: "Jun 15", completed: true },
      { step: "Payment Verified", date: "Jun 15", completed: true },
      { step: "Packed", date: "Jun 16", completed: true },
      { step: "Dispatched", date: "Jun 17", completed: true },
      { step: "Out for Delivery", date: "Jun 18", completed: true },
      { step: "Delivered", date: "Jun 18", completed: true },
    ],
  },
  {
    id: "ER-2025-002",
    date: "Jul 2, 2025",
    items: [{ name: "GM-10 Karbin Camo", qty: 1, price: 39000 }],
    total: 39000,
    status: "Dispatched",
    timeline: [
      { step: "Order Placed", date: "Jul 2", completed: true },
      { step: "Payment Verified", date: "Jul 2", completed: true },
      { step: "Packed", date: "Jul 3", completed: true },
      { step: "Dispatched", date: "Jul 4", completed: true },
      { step: "Out for Delivery", date: "-", completed: false },
      { step: "Delivered", date: "-", completed: false },
    ],
  },
  {
    id: "ER-2025-003",
    date: "Jul 10, 2025",
    items: [
      { name: "Target Pellets .177", qty: 5, price: 800 },
      { name: "Cleaning Kit Pro", qty: 1, price: 2200 },
    ],
    total: 6200,
    status: "Packed",
    timeline: [
      { step: "Order Placed", date: "Jul 10", completed: true },
      { step: "Payment Verified", date: "Jul 10", completed: true },
      { step: "Packed", date: "Jul 11", completed: true },
      { step: "Dispatched", date: "-", completed: false },
      { step: "Out for Delivery", date: "-", completed: false },
      { step: "Delivered", date: "-", completed: false },
    ],
  },
];

export const trainingApplications = [
  {
    id: 1,
    name: "Rahul Kumar",
    phone: "9876543210",
    program: "Beginner",
    date: "Jul 1, 2025",
    status: "Approved",
  },
  {
    id: 2,
    name: "Priya Sharma",
    phone: "9876543211",
    program: "Intermediate",
    date: "Jul 3, 2025",
    status: "Pending",
  },
  {
    id: 3,
    name: "Arun Vijay",
    phone: "9876543212",
    program: "Advanced",
    date: "Jul 5, 2025",
    status: "Pending",
  },
];

export const storeInfo = {
  phone1: "(+91) 9994893337",
  phone2: "(+91) 9842991959",
  email: "contact@eroderifles.com",
  address:
    "Opp SDS Gaden, Therku Pallam Road, Keel Thindal, Tamil Nadu 638012",
  hours: "Mon - Sat: 9:00 AM - 7:00 PM | Sunday: Closed",
  whatsapp: "919994893337",
};
