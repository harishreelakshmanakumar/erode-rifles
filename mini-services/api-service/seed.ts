import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Products data verified against eroderifles.com
const products = [
  { name: "BHIM", slug: "bhim", category: "Air Rifles", price: 55000, stock: 4, isFeatured: true, image: "/images/products/bhim.png", images: ["/images/products/bhim.png"], shortDescription: "Powerful PCP air rifle — the flagship model from GARE for precision long-range shooting.", description: "The BHIM is a powerful PCP air rifle from GARE. Designed for precision long-range shooting with consistent accuracy.", specifications: { Caliber: '0.177" (4.5mm)', Action: "PCP", Stock: "Synthetic" } },
  { name: "GARE Falcon", slug: "gare-falcon", category: "Air Rifles", price: 50000, stock: 5, isFeatured: true, image: "/images/products/falcon.png", images: ["/images/products/falcon.png"], shortDescription: "Fully regulated PCP air rifle with precision-engineered barrel for consistent accuracy.", description: "The Falcon is a fully regulated PCP air rifle from GARE. Features a precision-engineered barrel for consistent accuracy.", specifications: { Caliber: '0.177" (4.5mm)', Action: "PCP (Regulated)" } },
  { name: "GARE PEEP SIGHT MODEL", slug: "gare-peep-sight-model", category: "Air Rifles", price: 42000, stock: 3, isFeatured: true, image: "/images/products/falcon.png", images: ["/images/products/falcon.png"], shortDescription: "Competition-grade air rifle with peep sight for precision target shooting.", description: "Competition-grade air rifle with peep sight for precision target shooting.", specifications: { Caliber: '0.177" (4.5mm)', Action: "PCP", Sight: "Peep Sight" } },
  { name: "GM-10 Karbin Camo", slug: "gm-10-karbin-camo", category: "Air Rifles", price: 39000, stock: 8, isFeatured: true, image: "/images/products/gm10-camo.png", images: ["/images/products/gm10-camo.png"], shortDescription: "Durable synthetic stock with camouflage pattern for sports and target shooting.", description: "The GM-10 Karbin features a durable synthetic stock with camouflage pattern.", specifications: { Caliber: '0.177" (4.5mm)', Action: "PCP", Stock: "Synthetic Camo" } },
  { name: "PX100 Club Pro Junior", slug: "px100-club-pro-junior", category: "Air Rifles", price: 32500, stock: 6, isFeatured: true, image: "/images/products/px100.png", images: ["/images/products/px100.png"], shortDescription: "Ideal for young shooters entering competitive shooting with lightweight design.", description: "The PX100 Club Pro Junior is ideal for young shooters entering competitive shooting.", specifications: { Caliber: '0.177" (4.5mm)', Action: "PCP" } },
  { name: "GARE Avenger", slug: "gare-avenger", category: "Air Rifles", price: 24500, stock: 7, isFeatured: false, image: "/images/products/avenger.png", images: ["/images/products/avenger.png"], shortDescription: "Entry model PCP air rifle with synthetic stock and steel reservoir.", description: "The Avenger is an entry model PCP Air Rifle from GARE with synthetic stock, steel reservoir.", specifications: { Caliber: '0.177" (4.5mm)', Action: "PCP", Stock: "Synthetic", Reservoir: "Steel" } },
  { name: "NX100 Club Elite Black", slug: "nx100-club-elite-black", category: "Air Rifles", price: 11799, stock: 10, isFeatured: false, image: "/images/products/scout.png", images: ["/images/products/scout.png"], shortDescription: "Nitro piston powered air rifle with standard black stock.", description: "The NX100 Club Elite Black is a nitro piston powered air rifle with standard black stock.", specifications: { Caliber: '0.177" (4.5mm)', "Power Plant": "Nitro Piston", Stock: "Synthetic Black" } },
  { name: "GARE Scout", slug: "gare-scout", category: "Air Rifles", price: 8500, stock: 12, isFeatured: false, image: "/images/products/scout.png", images: ["/images/products/scout.png"], shortDescription: "Gas piston air rifle with 12-groove rifled barrel for consistent accuracy.", description: "Scout is a gas piston operated air rifle from GARE with 12-groove rifled barrel.", specifications: { Caliber: '0.177" (4.5mm)', Barrel: "480 mm, 12-groove rifled", Action: "Break Barrel", "Power Plant": "Nitro Piston", Stock: "Synthetic" } },
  { name: "GenNeX SDB", slug: "gennex-sdb", category: "Air Rifles", price: 5700, stock: 15, isFeatured: false, image: "/images/products/avenger.png", images: ["/images/products/avenger.png"], shortDescription: "Spring-powered air rifle for beginners — affordable yet reliable.", description: "Spring-powered air rifle for beginners. Affordable yet reliable for entry-level practice.", specifications: { Caliber: '0.177" (4.5mm)', Action: "Spring Piston", Stock: "Synthetic" } },
  { name: "SPORTS SDB", slug: "sports-sdb", category: "Air Rifles", price: 5000, stock: 10, isFeatured: false, image: "/images/products/avenger.png", images: ["/images/products/avenger.png"], shortDescription: "Spring-powered air rifle for sports and practice.", description: "The SPORTS SDB is a spring-powered air rifle designed for sports shooting and practice sessions.", specifications: { Caliber: '0.177" (4.5mm)', Action: "Spring Piston" } },
  { name: "SP60 Aries Air Pistol", slug: "sp60-aries-air-pistol", category: "Air Pistols", price: 60000, stock: 3, isFeatured: true, image: "/images/products/sp60.png", images: ["/images/products/sp60.png"], shortDescription: "Feature-packed air pistol for the best shooting experience in a compact package.", description: "The SP60 Aries air pistol is packed with features. Caliber: 0.177, Max Velocity: 128 mps / 420 fps, Power: Upto 4.2 Joules.", specifications: { Caliber: '0.177" (4.5mm)', "Max Velocity": "128 mps / 420 fps", Power: "Upto 4.2 Joules", Action: "Break Barrel" } },
  { name: "NP60 Draco Air Pistol", slug: "np60-draco-air-pistol", category: "Air Pistols", price: 50000, stock: 4, isFeatured: true, image: "/images/products/sp60.png", images: ["/images/products/sp60.png"], shortDescription: "India's 1st Nitro Spring pistol for smoothness & long life.", description: "NP60 Draco is India's 1st Nitro Spring pistol for smoothness & long life.", specifications: { Caliber: '0.177" (4.5mm)', "Max Velocity": "128 mps / 420 fps", Power: "Upto 4.3 Joules", "Power Plant": "Nitro Spring" } },
  { name: "JSB KnockOut Slugs", slug: "jsb-knockout-slugs", category: "Pellets", price: 1500, stock: 50, isFeatured: false, image: "/images/products/falcon.png", images: ["/images/products/falcon.png"], shortDescription: "Premium accuracy slugs for PCP rifles — JSB quality for consistent performance.", description: "Premium accuracy slugs for PCP rifles. JSB quality ensures consistent performance.", specifications: { Caliber: '0.177" (4.5mm)', Type: "Slugs", Brand: "JSB" } },
  { name: "JSB Exact Monster", slug: "jsb-exact-monster", category: "Pellets", price: 1500, stock: 40, isFeatured: false, image: "/images/products/falcon.png", images: ["/images/products/falcon.png"], shortDescription: "Heavyweight precision pellets for long-range accuracy.", description: "JSB Exact Monster pellets are heavyweight precision pellets designed for long-range accuracy.", specifications: { Caliber: '0.177" (4.5mm)', Type: "Domed", Brand: "JSB" } },
  { name: "JSB Exact Beast", slug: "jsb-exact-beast", category: "Pellets", price: 1450, stock: 35, isFeatured: false, image: "/images/products/falcon.png", images: ["/images/products/falcon.png"], shortDescription: "High-impact pellets designed for maximum energy transfer.", description: "JSB Exact Beast pellets are designed for maximum energy transfer.", specifications: { Caliber: '0.177" (4.5mm)', Type: "Domed", Brand: "JSB" } },
  { name: "JSB Express", slug: "jsb-express", category: "Pellets", price: 1200, stock: 45, isFeatured: false, image: "/images/products/falcon.png", images: ["/images/products/falcon.png"], shortDescription: "Lightweight high-velocity pellets for consistent performance.", description: "JSB Express pellets are lightweight high-velocity pellets for consistent performance.", specifications: { Caliber: '0.177" (4.5mm)', Type: "Domed", Brand: "JSB" } },
  { name: "G Smith & Co. Airgun Slug", slug: "g-smith-airgun-slug", category: "Pellets", price: 1100, stock: 30, isFeatured: false, image: "/images/products/falcon.png", images: ["/images/products/falcon.png"], shortDescription: "Quality airgun slugs from G Smith & Co. for consistent accuracy.", description: "Quality airgun slugs from G Smith & Co. Designed for consistent accuracy.", specifications: { Caliber: '0.177" (4.5mm)', Type: "Slugs", Brand: "G Smith & Co." } },
  { name: "RIFLE PREMIUM PELLET", slug: "rifle-premium-pellet", category: "Pellets", price: 700, stock: 60, isFeatured: false, image: "/images/products/falcon.png", images: ["/images/products/falcon.png"], shortDescription: "Premium quality pellets for consistent accuracy at an affordable price.", description: "RIFLE PREMIUM PELLET — quality pellets for consistent accuracy at an affordable price.", specifications: { Caliber: '0.177" (4.5mm)', Type: "Domed", Brand: "Rifle" } },
  { name: "Aperture Sight Set", slug: "aperture-sight-set", category: "Accessories", price: 2699, stock: 8, isFeatured: false, image: "/images/products/falcon.png", images: ["/images/products/falcon.png"], shortDescription: "Precision aperture sight set for competition target shooting.", description: "Precision aperture sight set compatible with most competition air rifles. Verified product from eroderifles.com.", specifications: { Type: "Aperture / Peep Sight", Adjustment: "Micro-adjustable" } },
  { name: "3rd Stage O-Ring (Set of 3 pcs)", slug: "3rd-stage-o-ring-set", category: "Accessories", price: 945, stock: 20, isFeatured: false, image: "/images/products/falcon.png", images: ["/images/products/falcon.png"], shortDescription: "Replacement O-ring set for 3rd stage — set of 3 pieces.", description: "3rd Stage O-Ring Set of 3 pieces. Verified product from eroderifles.com.", specifications: { Type: "O-Ring", Quantity: "3 pieces" } },
  { name: "Allen Key Set", slug: "allen-key-set", category: "Accessories", price: 250, stock: 25, isFeatured: false, image: "/images/products/falcon.png", images: ["/images/products/falcon.png"], shortDescription: "Essential maintenance tool set for air rifle adjustments.", description: "Complete Allen key set for air rifle and pistol maintenance. Verified product from eroderifles.com.", specifications: { Type: "L-Shape Allen Key Set", Material: "Chrome Vanadium Steel" } },
  { name: "SUPER IMPACT G. Smith", slug: "super-impact-g-smith", category: "Accessories", price: 550, stock: 15, isFeatured: false, image: "/images/products/falcon.png", images: ["/images/products/falcon.png"], shortDescription: "G. Smith Super Impact accessory for air rifles.", description: "SUPER IMPACT by G. Smith. Verified product from eroderifles.com.", specifications: { Brand: "G. Smith", Type: "Impact Accessory" } },
  { name: "Butt Pad", slug: "butt-pad", category: "Accessories", price: 89, stock: 30, isFeatured: false, image: "/images/products/falcon.png", images: ["/images/products/falcon.png"], shortDescription: "Replacement butt pad for air rifles.", description: "Replacement butt pad for air rifles. Verified product from eroderifles.com.", specifications: { Type: "Butt Pad", Compatibility: "Most air rifles" } },
  { name: "Butt Cap", slug: "butt-cap", category: "Accessories", price: 46, stock: 30, isFeatured: false, image: "/images/products/falcon.png", images: ["/images/products/falcon.png"], shortDescription: "Replacement butt cap for air rifles.", description: "Replacement butt cap for air rifles. Verified product from eroderifles.com.", specifications: { Type: "Butt Cap" } },
];

const categories = [
  { name: "Air Rifles", slug: "air-rifles", count: 10, image: "/images/categories/air-rifles.png" },
  { name: "Air Pistols", slug: "air-pistols", count: 2, image: "/images/categories/air-pistols.png" },
  { name: "Pellets", slug: "pellets", count: 6, image: "/images/categories/pellets.png" },
  { name: "Accessories", slug: "accessories", count: 6, image: "/images/categories/accessories.png" },
];

// Reviews verified from eroderifles.com - NO Google branding
const testimonials = [
  { name: "Kowtham R.", initials: "KR", avatarBg: "#B8D63C", rating: 5, comment: "First of all happy to see such an Excellent shooting range in Erode district. Mr. Thiyagu and Mr. Saravanan gave detailed explanation about the purpose and importance of shooting sports. They provide Excellent rifles for practice.", date: "Customer Review", isVerified: true, title: "Shooting Enthusiast" },
  { name: "Dinesh V.", initials: "DV", avatarBg: "#111111", rating: 5, comment: "Best place to visit. Friendly staff and good guidance. The guns are in perfect condition and well maintained.", date: "Customer Review", isVerified: true, title: "Verified Customer" },
  { name: "Saravanan T.", initials: "ST", avatarBg: "#B8D63C", rating: 5, comment: "Good place for purchasing air rifles. Also they have a club attached for practice.", date: "Customer Review", isVerified: true, title: "Regular Customer" },
];

const siteSettings = {
  siteName: "Erode Rifles",
  siteDescription: "Premium air rifles, air pistols, and shooting accessories in Erode, Tamil Nadu",
  phone1: "+91 9994893337",
  phone2: "+91 9842991959",
  email: "contact@eroderifles.com",
  address: "Opp SDS Gaden, Therku Pallam Road, Keel Thindal, Tamil Nadu 638012",
  hours: "Mon - Sun: 9:00 AM - 9:00 PM",
  sundayHours: "Sunday: Open",
  whatsapp: "919994893337",
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
        originalPrice: null,
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
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log(`✅ ${testimonials.length} testimonials created`);

  // Create sample orders
  const sampleOrders = [
    { orderNumber: "ER-2025-001", customerName: "Rahul Kumar", email: "rahul@example.com", phone: "+91 9876543210", address: "123 Main Street", city: "Erode", state: "Tamil Nadu", postalCode: "638001", items: [{ name: "GARE Falcon", qty: 1, price: 50000 }, { name: "JSB KnockOut Slugs", qty: 2, price: 1500 }], total: 53000, status: "DELIVERED" },
    { orderNumber: "ER-2025-002", customerName: "Priya Sharma", email: "priya@example.com", phone: "+91 9876543211", address: "456 Oak Avenue", city: "Coimbatore", state: "Tamil Nadu", postalCode: "641001", items: [{ name: "GM-10 Karbin Camo", qty: 1, price: 39000 }], total: 39000, status: "DISPATCHED" },
    { orderNumber: "ER-2025-003", customerName: "Arun Vijay", email: "arun@example.com", phone: "+91 9876543212", address: "789 Elm Road", city: "Salem", state: "Tamil Nadu", postalCode: "636001", items: [{ name: "JSB Express", qty: 5, price: 1200 }, { name: "Allen Key Set", qty: 1, price: 250 }], total: 6250, status: "PACKED" },
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
    await prisma.siteSetting.create({ data: { key, value } });
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
