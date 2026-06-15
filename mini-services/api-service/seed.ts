import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Products data from mockData.js
const products = [
  {
    name: "GARE BHIM",
    slug: "gare-bhim",
    category: "Air Rifles",
    price: 55000,
    originalPrice: 58000,
    stock: 4,
    isFeatured: true,
    image: "/images/products/bhim.png",
    images: ["/images/products/bhim.png", "/images/products/falcon.png"],
    shortDescription: "Powerful PCP air rifle with synthetic stock for precision long-range shooting.",
    description: "The BHIM is a powerful PCP air rifle from GARE with synthetic stock. Designed for precision long-range shooting with consistent accuracy. Built for serious shooters who demand reliability and performance in every shot.",
    specifications: { Caliber: '0.177" (4.5mm)', Action: "PCP", Velocity: "200 mps", Weight: "3.2 kg", Stock: "Synthetic", Trigger: "2 Stage Adjustable" },
  },
  {
    name: "GARE Falcon",
    slug: "gare-falcon",
    category: "Air Rifles",
    price: 50000,
    originalPrice: 53000,
    stock: 5,
    isFeatured: true,
    image: "/images/products/falcon.png",
    images: ["/images/products/falcon.png", "/images/products/bhim.png"],
    shortDescription: "Fully regulated PCP air rifle with precision-engineered barrel for consistent accuracy.",
    description: "The Falcon is a fully regulated PCP air rifle from GARE. Features a precision-engineered barrel for consistent accuracy and a regulated action for shot-to-shot consistency. The beechwood stock provides a classic feel with modern performance.",
    specifications: { Caliber: '0.177" (4.5mm)', Action: "PCP (Regulated)", Velocity: "180 mps", Weight: "3.0 kg", Stock: "Beechwood", Trigger: "Adjustable" },
  },
  {
    name: "GARE PEEP SIGHT MODEL",
    slug: "gare-peep-sight-model",
    category: "Air Rifles",
    price: 42000,
    stock: 3,
    isFeatured: true,
    image: "/images/products/falcon.png",
    images: ["/images/products/falcon.png"],
    shortDescription: "Competition-grade air rifle with peep sight for precision target shooting.",
    description: "Competition-grade air rifle with peep sight for precision target shooting. Designed for competitive shooters who require the highest level of accuracy and consistency in their equipment.",
    specifications: { Caliber: '0.177" (4.5mm)', Action: "PCP", Sight: "Peep Sight", Weight: "3.4 kg", Stock: "Wooden", Trigger: "Adjustable Match" },
  },
  {
    name: "GM-10 Karbin Camo",
    slug: "gm-10-karbin-camo",
    category: "Air Rifles",
    price: 39000,
    stock: 8,
    isFeatured: true,
    image: "/images/products/gm10-camo.png",
    images: ["/images/products/gm10-camo.png"],
    shortDescription: "Durable synthetic stock with camouflage pattern for sports and target shooting.",
    description: "The GM-10 Karbin features a durable synthetic stock with camouflage pattern. A reliable PCP air rifle for sports and target shooting. Perfect for shooters who want a rugged, good-looking rifle that performs consistently.",
    specifications: { Caliber: '0.177" (4.5mm)', Action: "PCP", Velocity: "175 mps", Weight: "2.8 kg", Stock: "Synthetic Camo", Trigger: "2 Stage" },
  },
  {
    name: "PX100 Club Pro Junior",
    slug: "px100-club-pro-junior",
    category: "Air Rifles",
    price: 32500,
    stock: 6,
    isFeatured: true,
    image: "/images/products/px100.png",
    images: ["/images/products/px100.png"],
    shortDescription: "Ideal for young shooters entering competitive shooting with lightweight design.",
    description: "The PX100 Club Pro Junior is ideal for young shooters entering competitive shooting. Lightweight design with precision barrel ensures young athletes can develop their skills with proper equipment that fits their frame.",
    specifications: { Caliber: '0.177" (4.5mm)', Action: "PCP", Weight: "3.1 kg", Stock: "Wooden", Trigger: "Adjustable" },
  },
  {
    name: "SP60 Aries Air Pistol",
    slug: "sp60-aries-air-pistol",
    category: "Air Pistols",
    price: 32000,
    stock: 3,
    isFeatured: true,
    image: "/images/products/sp60.png",
    images: ["/images/products/sp60.png"],
    shortDescription: "Feature-packed air pistol for the best shooting experience in a compact package.",
    description: "The SP60 Aries air pistol is packed with features that will give you the best shooting experience in a compact package. Ideal for competitive pistol shooting and training sessions.",
    specifications: { Caliber: '0.177" (4.5mm)', Action: "PCP", Velocity: "150 mps", Weight: "1.1 kg", Trigger: "Adjustable" },
  },
  {
    name: "PX100 Achilles Air Pistol",
    slug: "px100-achilles-air-pistol",
    category: "Air Pistols",
    price: 28000,
    stock: 4,
    isFeatured: false,
    image: "/images/products/sp60.png",
    images: ["/images/products/sp60.png"],
    shortDescription: "Competition air pistol designed for precision and consistency.",
    description: "The PX100 Achilles is a competition-grade air pistol built for precision shooting. Features excellent balance and ergonomics for competitive pistol shooters.",
    specifications: { Caliber: '0.177" (4.5mm)', Action: "PCP", Weight: "1.2 kg", Trigger: "Adjustable Match" },
  },
  {
    name: "GARE Avenger",
    slug: "gare-avenger",
    category: "Air Rifles",
    price: 24500,
    stock: 7,
    isFeatured: false,
    image: "/images/products/avenger.png",
    images: ["/images/products/avenger.png"],
    shortDescription: "Entry model PCP air rifle with synthetic stock and steel reservoir.",
    description: "The Avenger is an entry model Pre-Charged Pneumatic Air Rifle from GARE with synthetic stock, steel reservoir and plastic trigger guard. A great starting point for shooters looking to get into PCP air rifles without breaking the bank.",
    specifications: { Caliber: '0.177" (4.5mm)', Action: "PCP", Weight: "2.8 kg", Stock: "Synthetic", Reservoir: "Steel", Trigger: "2 Stage" },
  },
  {
    name: "NX100 Club Elite Black",
    slug: "nx100-club-elite-black",
    category: "Air Rifles",
    price: 11799,
    stock: 10,
    isFeatured: false,
    image: "/images/products/scout.png",
    images: ["/images/products/scout.png"],
    shortDescription: "Nitro piston powered air rifle with 180 mps velocity and 7.5 Joules power.",
    description: "The NX100 Club Elite is a nitro piston powered air rifle. Caliber: 0.177, Max Velocity: 180 mps / 600 fps, Power: 7.5 Joules. Perfect for club-level shooting and regular practice sessions.",
    specifications: { Caliber: '0.177" (4.5mm)', Velocity: "180 mps / 600 fps", Power: "7.5 Joules", "Power Plant": "Nitro Piston", Stock: "Synthetic" },
  },
  {
    name: "GARE Scout",
    slug: "gare-scout",
    category: "Air Rifles",
    price: 8500,
    stock: 12,
    isFeatured: false,
    image: "/images/products/scout.png",
    images: ["/images/products/scout.png"],
    shortDescription: "Gas piston air rifle with 12-groove rifled barrel for consistent accuracy.",
    description: "Scout is a gas piston operated air rifle from GARE. The inert gas piston coupled with the 12-groove rifled barrel provides consistent shots with excellent accuracy. The stock is made of synthetic material. An excellent choice for shooters looking for reliability and performance at an accessible price point.",
    specifications: { Caliber: '0.177" (4.5mm)', Velocity: "750 fps", Energy: "16 Joules", Weight: "3.3 kg", Length: "1150 mm", Barrel: "480 mm, 12-groove rifled", Action: "Break Barrel", "Power Plant": "Nitro Piston", Stock: "Synthetic", Trigger: "2 Stage Adjustable", Safety: "Automatic", "Mounting Rail": '3/8" (11mm) Dovetail' },
  },
  {
    name: "GenNeX SDB",
    slug: "gennex-sdb",
    category: "Air Rifles",
    price: 5700,
    stock: 15,
    isFeatured: false,
    image: "/images/products/avenger.png",
    images: ["/images/products/avenger.png"],
    shortDescription: "Spring-powered air rifle for beginners — affordable yet reliable.",
    description: "Spring-powered air rifle for beginners. Affordable yet reliable for entry-level practice. The GenNeX SDB is the perfect first air rifle for anyone looking to get started in the sport of shooting.",
    specifications: { Caliber: '0.177" (4.5mm)', Action: "Spring Piston", Velocity: "550 fps", Weight: "2.9 kg", Stock: "Synthetic" },
  },
  {
    name: "JSB KnockOut Slugs",
    slug: "jsb-knockout-slugs",
    category: "Pellets",
    price: 1500,
    stock: 50,
    isFeatured: false,
    image: "/images/products/falcon.png",
    images: ["/images/products/falcon.png"],
    shortDescription: "Premium accuracy slugs for PCP rifles — JSB quality for consistent performance.",
    description: "Premium accuracy slugs for PCP rifles. JSB quality ensures consistent performance shot after shot. Trusted by competition shooters worldwide for their uniformity and precision.",
    specifications: { Caliber: '0.177" (4.5mm)', Type: "Slugs", Quantity: "200 per tin", Brand: "JSB" },
  },
  {
    name: "Target Pellets .177",
    slug: "target-pellets-177",
    category: "Pellets",
    price: 800,
    stock: 100,
    isFeatured: false,
    image: "/images/products/falcon.png",
    images: ["/images/products/falcon.png"],
    shortDescription: "Competition-grade target pellets in .177 caliber for precision shooting.",
    description: "Competition-grade target pellets in .177 caliber for precision shooting. Wadcutter design for clean holes in paper targets — ideal for 10m and competitive target shooting.",
    specifications: { Caliber: '0.177" (4.5mm)', Type: "Wadcutter", Weight: "8.02 grains", Quantity: "500 per tin" },
  },
  {
    name: "4x32 Rifle Scope",
    slug: "4x32-rifle-scope",
    category: "Accessories",
    price: 5500,
    stock: 7,
    isFeatured: false,
    image: "/images/products/falcon.png",
    images: ["/images/products/falcon.png"],
    shortDescription: "Fixed magnification rifle scope perfect for target shooting.",
    description: "Fixed 4x magnification rifle scope with 32mm objective lens. Ideal for target shooting and plinking. Features fully coated lenses for bright, clear images and windage/elevation adjustments.",
    specifications: { Magnification: "4x", "Objective Lens": "32mm", "Tube Diameter": "1 inch", Reticle: "Duplex", "Field of View": "28 ft @ 100 yds" },
  },
  {
    name: "Rifle Carrying Case",
    slug: "rifle-carrying-case",
    category: "Accessories",
    price: 3500,
    stock: 5,
    isFeatured: false,
    image: "/images/products/falcon.png",
    images: ["/images/products/falcon.png"],
    shortDescription: "Padded hard case for safe transport of your air rifle.",
    description: "Padded hard case for safe transport of your air rifle. Features foam interior, lockable latches, and carrying handle. Fits most standard air rifles up to 1100mm in length.",
    specifications: { Material: "ABS Hard Shell", Interior: "Egg-crate Foam", Length: "1150 mm", Lockable: "Yes — 2 latches" },
  },
  {
    name: "Cleaning Kit Pro",
    slug: "cleaning-kit-pro",
    category: "Accessories",
    price: 2200,
    stock: 12,
    isFeatured: false,
    image: "/images/products/falcon.png",
    images: ["/images/products/falcon.png"],
    shortDescription: "Complete cleaning and maintenance kit for air rifles and pistols.",
    description: "Complete cleaning and maintenance kit for air rifles and pistols. Includes cleaning rod, brushes, patches, oil, and carrying case. Keep your airgun in peak condition for consistent performance.",
    specifications: { Compatibility: ".177 and .22 cal", Includes: "Rod, Brushes, Patches, Oil, Case", Brand: "Erode Rifles" },
  },
  {
    name: "Aperture Sight Set",
    slug: "aperture-sight-set",
    category: "Accessories",
    price: 1800,
    stock: 8,
    isFeatured: false,
    image: "/images/products/falcon.png",
    images: ["/images/products/falcon.png"],
    shortDescription: "Precision aperture sight set for competition target shooting.",
    description: "Precision aperture sight set compatible with most competition air rifles. Micro-adjustable for windage and elevation. Essential for serious target shooters.",
    specifications: { Type: "Aperture / Peep Sight", Adjustment: "Micro-adjustable", Compatibility: "Most competition air rifles", Material: "Aluminum Alloy" },
  },
  {
    name: "Allen Key Set",
    slug: "allen-key-set",
    category: "Accessories",
    price: 450,
    stock: 25,
    isFeatured: false,
    image: "/images/products/falcon.png",
    images: ["/images/products/falcon.png"],
    shortDescription: "Essential maintenance tool set for air rifle adjustments.",
    description: "Complete Allen key set for air rifle and pistol maintenance. Includes metric and imperial sizes. Essential tool for every airgun owner.",
    specifications: { Type: "L-Shape Allen Key Set", Sizes: "9-piece metric set", Material: "Chrome Vanadium Steel" },
  },
];

const categories = [
  { name: "Air Rifles", slug: "air-rifles", count: 8, image: "/images/categories/air-rifles.png" },
  { name: "Air Pistols", slug: "air-pistols", count: 2, image: "/images/categories/air-pistols.png" },
  { name: "Pellets", slug: "pellets", count: 2, image: "/images/categories/pellets.png" },
  { name: "Accessories", slug: "accessories", count: 6, image: "/images/categories/accessories.png" },
];

const testimonials = [
  {
    name: "Kowtham R.",
    initials: "KR",
    avatarBg: "#B8D63C",
    rating: 5,
    comment: "Excellent shooting range in Erode district. The team gave detailed explanation about the purpose and importance of shooting sports. Great facility for beginners and experienced shooters alike.",
    date: "2 months ago",
    isVerified: true,
    title: "Shooting Enthusiast",
  },
  {
    name: "Dinesh V.",
    initials: "DV",
    avatarBg: "#111111",
    rating: 5,
    comment: "Best place to visit for shooting enthusiasts. Friendly staff and good guidance. The guns are in perfect condition and well maintained. Would definitely recommend to anyone interested in air rifle shooting.",
    date: "3 months ago",
    isVerified: true,
    title: "Verified Customer",
  },
  {
    name: "Saravanan T.",
    initials: "ST",
    avatarBg: "#B8D63C",
    rating: 5,
    comment: "Good place for purchasing air rifles and accessories. They also have a club attached for practice. The staff is very knowledgeable and helps you choose the right equipment.",
    date: "1 month ago",
    isVerified: true,
    title: "Regular Customer",
  },
  {
    name: "Priya M.",
    initials: "PM",
    avatarBg: "#111111",
    rating: 5,
    comment: "My son attended the beginner training camp here and loved it! The instructors are patient and professional. The facility is clean and well-organized. Highly recommend for families looking to get into shooting sports.",
    date: "3 weeks ago",
    isVerified: true,
    title: "Parent",
  },
  {
    name: "Arun K.",
    initials: "AK",
    avatarBg: "#B8D63C",
    rating: 4,
    comment: "Good collection of air rifles and pistols. Prices are competitive compared to other shops. The staff could be a bit more attentive during busy hours, but overall a great experience.",
    date: "5 months ago",
    isVerified: true,
    title: "Experienced Shooter",
  },
  {
    name: "Meena R.",
    initials: "MR",
    avatarBg: "#111111",
    rating: 5,
    comment: "Excellent customer service! They helped me choose the right air rifle for my skill level. The after-sales support is also very good. They even helped with the sight calibration. Truly professional.",
    date: "6 weeks ago",
    isVerified: true,
    title: "Verified Customer",
  },
];

const siteSettings = {
  siteName: "Erode Rifles",
  siteDescription: "Premium air rifles, air pistols, and shooting accessories in Erode, Tamil Nadu",
  phone1: "+91 9994893337",
  phone2: "+91 9842991959",
  email: "contact@eroderifles.com",
  address: "Opp SDS Gaden, Therku Pallam Road, Keel Thindal, Tamil Nadu 638012",
  hours: "Mon - Sat: 9:00 AM - 7:00 PM | Sunday: Closed",
  whatsapp: "919994893337",
  heroTitle: "Premium Air Rifles & Shooting Equipment",
  heroSubtitle: "Your trusted destination for quality air rifles, air pistols, pellets, and shooting accessories in Erode, Tamil Nadu.",
};

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.siteSetting.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.enquiry.deleteMany();
  await prisma.order.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@eroderifles.com",
      phone: "+91 9994893337",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin user created: ${admin.email}`);

  // Create a demo user
  const userPassword = await bcrypt.hash("user123", 10);
  const user = await prisma.user.create({
    data: {
      name: "Demo User",
      email: "user@example.com",
      phone: "+91 9876543210",
      password: userPassword,
      role: "USER",
    },
  });
  console.log(`✅ Demo user created: ${user.email}`);

  // Create products
  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice || null,
        stock: product.stock,
        isFeatured: product.isFeatured,
        image: product.image,
        images: JSON.stringify(product.images),
        shortDescription: product.shortDescription,
        description: product.description,
        specifications: JSON.stringify(product.specifications),
      },
    });
  }
  console.log(`✅ ${products.length} products created`);

  // Create categories
  for (const category of categories) {
    await prisma.category.create({
      data: {
        name: category.name,
        slug: category.slug,
        count: category.count,
        image: category.image,
      },
    });
  }
  console.log(`✅ ${categories.length} categories created`);

  // Create testimonials
  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }
  console.log(`✅ ${testimonials.length} testimonials created`);

  // Create sample orders
  const sampleOrders = [
    {
      orderNumber: "ER-2025-001",
      customerName: "Rahul Kumar",
      email: "rahul@example.com",
      phone: "+91 9876543210",
      address: "123 Main Street",
      city: "Erode",
      state: "Tamil Nadu",
      postalCode: "638001",
      items: [{ name: "GARE Falcon", qty: 1, price: 50000 }, { name: "JSB KnockOut Slugs", qty: 2, price: 1500 }],
      total: 53000,
      status: "DELIVERED",
    },
    {
      orderNumber: "ER-2025-002",
      customerName: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 9876543211",
      address: "456 Oak Avenue",
      city: "Coimbatore",
      state: "Tamil Nadu",
      postalCode: "641001",
      items: [{ name: "GM-10 Karbin Camo", qty: 1, price: 39000 }],
      total: 39000,
      status: "DISPATCHED",
    },
    {
      orderNumber: "ER-2025-003",
      customerName: "Arun Vijay",
      email: "arun@example.com",
      phone: "+91 9876543212",
      address: "789 Elm Road",
      city: "Salem",
      state: "Tamil Nadu",
      postalCode: "636001",
      items: [{ name: "Target Pellets .177", qty: 5, price: 800 }, { name: "Cleaning Kit Pro", qty: 1, price: 2200 }],
      total: 6200,
      status: "PACKED",
    },
  ];

  for (const order of sampleOrders) {
    await prisma.order.create({
      data: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        email: order.email,
        phone: order.phone,
        address: order.address,
        city: order.city,
        state: order.state,
        postalCode: order.postalCode,
        items: JSON.stringify(order.items),
        total: order.total,
        status: order.status as any,
      },
    });
  }
  console.log(`✅ ${sampleOrders.length} sample orders created`);

  // Create sample enquiries
  const sampleEnquiries = [
    { name: "Vikram S.", email: "vikram@example.com", phone: "+91 9123456789", subject: "Product Inquiry", message: "I'm interested in the GARE BHIM rifle. Can you provide more details about availability?", isRead: false },
    { name: "Lakshmi R.", email: "lakshmi@example.com", phone: "+91 9234567890", subject: "Training Program", message: "My son is 14 years old and interested in shooting. What training programs do you have for juniors?", isRead: true },
    { name: "Kumar M.", email: "kumar@example.com", phone: "+91 9345678901", subject: "Bulk Order", message: "We need 10 PX100 Club Pro Junior rifles for our shooting club. Can you offer a bulk discount?", isRead: false },
  ];

  for (const enquiry of sampleEnquiries) {
    await prisma.enquiry.create({ data: enquiry });
  }
  console.log(`✅ ${sampleEnquiries.length} sample enquiries created`);

  // Create gallery images
  const galleryImages = [
    { title: "Shooting Range", imageUrl: "/images/hero-banner.png", category: "Range" },
    { title: "Air Rifle Display", imageUrl: "/images/products/bhim.png", category: "Products" },
    { title: "Training Session", imageUrl: "/images/products/falcon.png", category: "Training" },
  ];

  for (const image of galleryImages) {
    await prisma.galleryImage.create({ data: image });
  }
  console.log(`✅ ${galleryImages.length} gallery images created`);

  // Create site settings
  for (const [key, value] of Object.entries(siteSettings)) {
    await prisma.siteSetting.create({
      data: { key, value },
    });
  }
  console.log(`✅ ${Object.keys(siteSettings).length} site settings created`);

  console.log("\n🎉 Database seeded successfully!");
  console.log("\n📋 Default credentials:");
  console.log("   Admin: admin@eroderifles.com / admin123");
  console.log("   User:  user@example.com / user123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
