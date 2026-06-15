import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;
const JWT_SECRET = 'erode-rifles-jwt-secret-2025';

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));
app.use(express.json());

// =============================================================================
// AUTH MIDDLEWARE
// =============================================================================

interface JwtPayload {
  userId: number;
  role: string;
}

function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Access denied. No token provided.' });
    return;
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Invalid token.' });
  }
}

function adminMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const user = (req as any).user;
  if (!user || user.role !== 'ADMIN') {
    res.status(403).json({ success: false, error: 'Access denied. Admin only.' });
    return;
  }
  next();
}

// =============================================================================
// AUTH ROUTES
// =============================================================================

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ success: false, error: 'Name, email, and password are required.' });
      return;
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ success: false, error: 'Email already registered.' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, phone: phone || null, password: hashedPassword, role: 'USER' },
    });
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      success: true,
      data: {
        id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Email and password are required.' });
      return;
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid email or password.' });
      return;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).json({ success: false, error: 'Invalid email or password.' });
      return;
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      success: true,
      data: {
        id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/auth/google — Google OAuth sign-in
// Accepts a Google user profile (name, email) and creates/finds the user
app.post('/api/auth/google', async (req, res) => {
  try {
    const { name, email, googleId } = req.body;
    if (!email) {
      res.status(400).json({ success: false, error: 'Email is required for Google sign-in.' });
      return;
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Create a new user with a random password (they authenticate via Google)
      const randomPassword = await bcrypt.hash(Math.random().toString(36) + Date.now().toString(), 10);
      user = await prisma.user.create({
        data: {
          name: name || email.split('@')[0],
          email,
          phone: null,
          password: randomPassword,
          role: 'USER',
        },
      });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      success: true,
      data: {
        id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/auth/forgot-password
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ success: false, error: 'Email is required.' });
      return;
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Still return success to prevent email enumeration
      res.json({ success: true, data: { message: 'If an account with that email exists, a reset link has been sent.' } });
      return;
    }
    // In a real app, send an email with reset token
    res.json({ success: true, data: { message: 'If an account with that email exists, a reset link has been sent.' } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =============================================================================
// PRODUCT ROUTES
// =============================================================================

// GET /api/products
app.get('/api/products', async (req, res) => {
  try {
    const { category, search, featured } = req.query;
    const where: any = {};
    if (category) where.category = category as string;
    if (featured === 'true') where.isFeatured = true;
    if (search) {
      where.OR = [
        { name: { contains: search as string } },
        { shortDescription: { contains: search as string } },
        { category: { contains: search as string } },
      ];
    }
    const products = await prisma.product.findMany({ where, orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: products });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/products/:slug
app.get('/api/products/:slug', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ where: { slug: req.params.slug } });
    if (!product) {
      res.status(404).json({ success: false, error: 'Product not found.' });
      return;
    }
    res.json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/products (ADMIN)
app.post('/api/products', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, slug, category, price, originalPrice, stock, isFeatured, image, images, shortDescription, description, specifications } = req.body;
    if (!name || !slug || !category || price === undefined) {
      res.status(400).json({ success: false, error: 'Name, slug, category, and price are required.' });
      return;
    }
    const product = await prisma.product.create({
      data: {
        name, slug, category, price,
        originalPrice: originalPrice || null,
        stock: stock || 0,
        isFeatured: isFeatured || false,
        image: image || '',
        images: images ? JSON.stringify(images) : '[]',
        shortDescription: shortDescription || null,
        description: description || null,
        specifications: specifications ? JSON.stringify(specifications) : '{}',
      },
    });
    res.status(201).json({ success: true, data: product });
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(409).json({ success: false, error: 'Product with this slug already exists.' });
      return;
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/products/:id (ADMIN)
app.put('/api/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, error: 'Product not found.' });
      return;
    }
    const { name, slug, category, price, originalPrice, stock, isFeatured, image, images, shortDescription, description, specifications } = req.body;
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(slug !== undefined && { slug }),
        ...(category !== undefined && { category }),
        ...(price !== undefined && { price }),
        ...(originalPrice !== undefined && { originalPrice }),
        ...(stock !== undefined && { stock }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(image !== undefined && { image }),
        ...(images !== undefined && { images: JSON.stringify(images) }),
        ...(shortDescription !== undefined && { shortDescription }),
        ...(description !== undefined && { description }),
        ...(specifications !== undefined && { specifications: JSON.stringify(specifications) }),
      },
    });
    res.json({ success: true, data: product });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/products/:id (ADMIN)
app.delete('/api/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, error: 'Product not found.' });
      return;
    }
    await prisma.product.delete({ where: { id } });
    res.json({ success: true, data: { message: 'Product deleted.' } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =============================================================================
// CATEGORY ROUTES
// =============================================================================

// GET /api/categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    res.json({ success: true, data: categories });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/categories (ADMIN)
app.post('/api/categories', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, slug, count, image } = req.body;
    if (!name || !slug) {
      res.status(400).json({ success: false, error: 'Name and slug are required.' });
      return;
    }
    const category = await prisma.category.create({
      data: { name, slug, count: count || 0, image: image || null },
    });
    res.status(201).json({ success: true, data: category });
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(409).json({ success: false, error: 'Category with this slug already exists.' });
      return;
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/categories/:id (ADMIN)
app.put('/api/categories/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, error: 'Category not found.' });
      return;
    }
    const { name, slug, count, image } = req.body;
    const category = await prisma.category.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(slug !== undefined && { slug }),
        ...(count !== undefined && { count }),
        ...(image !== undefined && { image }),
      },
    });
    res.json({ success: true, data: category });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/categories/:id (ADMIN)
app.delete('/api/categories/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, error: 'Category not found.' });
      return;
    }
    await prisma.category.delete({ where: { id } });
    res.json({ success: true, data: { message: 'Category deleted.' } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =============================================================================
// TESTIMONIAL ROUTES
// =============================================================================

// GET /api/testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: testimonials });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/testimonials (ADMIN)
app.post('/api/testimonials', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, initials, avatarBg, rating, comment, date, isVerified, title } = req.body;
    if (!name || !comment) {
      res.status(400).json({ success: false, error: 'Name and comment are required.' });
      return;
    }
    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        initials: initials || name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2),
        avatarBg: avatarBg || '#B8D63C',
        rating: rating || 5,
        comment,
        date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        isVerified: isVerified || false,
        title: title || null,
      },
    });
    res.status(201).json({ success: true, data: testimonial });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/testimonials/:id (ADMIN)
app.put('/api/testimonials/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, error: 'Testimonial not found.' });
      return;
    }
    const { name, initials, avatarBg, rating, comment, date, isVerified, title } = req.body;
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(initials !== undefined && { initials }),
        ...(avatarBg !== undefined && { avatarBg }),
        ...(rating !== undefined && { rating }),
        ...(comment !== undefined && { comment }),
        ...(date !== undefined && { date }),
        ...(isVerified !== undefined && { isVerified }),
        ...(title !== undefined && { title }),
      },
    });
    res.json({ success: true, data: testimonial });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/testimonials/:id (ADMIN)
app.delete('/api/testimonials/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, error: 'Testimonial not found.' });
      return;
    }
    await prisma.testimonial.delete({ where: { id } });
    res.json({ success: true, data: { message: 'Testimonial deleted.' } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =============================================================================
// ORDER ROUTES
// =============================================================================

// POST /api/orders (public)
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, email, phone, address, city, state, postalCode, items, total } = req.body;
    if (!customerName || !email || !address || !city || !items || total === undefined) {
      res.status(400).json({ success: false, error: 'Missing required fields.' });
      return;
    }
    // Generate order number
    const orderCount = await prisma.order.count();
    const orderNumber = `ER-${new Date().getFullYear()}-${String(orderCount + 1).padStart(3, '0')}`;
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        email,
        phone: phone || null,
        address,
        city,
        state: state || null,
        postalCode: postalCode || null,
        items: JSON.stringify(items),
        total,
        status: 'PENDING',
      },
    });
    res.status(201).json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/orders (ADMIN)
app.get('/api/orders', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/orders/:id (ADMIN)
app.get('/api/orders/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      res.status(404).json({ success: false, error: 'Order not found.' });
      return;
    }
    res.json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/orders/:id/status (ADMIN)
app.put('/api/orders/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const validStatuses = ['PENDING', 'CONFIRMED', 'PACKED', 'DISPATCHED', 'DELIVERED', 'CANCELLED'];
    if (!status || !validStatuses.includes(status)) {
      res.status(400).json({ success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
      return;
    }
    const existing = await prisma.order.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, error: 'Order not found.' });
      return;
    }
    const order = await prisma.order.update({ where: { id }, data: { status } });
    res.json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =============================================================================
// ENQUIRY ROUTES
// =============================================================================

// POST /api/enquiries (public)
app.post('/api/enquiries', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      res.status(400).json({ success: false, error: 'Name, email, subject, and message are required.' });
      return;
    }
    const enquiry = await prisma.enquiry.create({
      data: { name, email, phone: phone || null, subject, message },
    });
    res.status(201).json({ success: true, data: enquiry });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/enquiries (ADMIN)
app.get('/api/enquiries', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: enquiries });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/enquiries/:id/read (ADMIN)
app.put('/api/enquiries/:id/read', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await prisma.enquiry.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, error: 'Enquiry not found.' });
      return;
    }
    const enquiry = await prisma.enquiry.update({ where: { id }, data: { isRead: true } });
    res.json({ success: true, data: enquiry });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =============================================================================
// GALLERY ROUTES
// =============================================================================

// GET /api/gallery
app.get('/api/gallery', async (req, res) => {
  try {
    const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: images });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/gallery (ADMIN)
app.post('/api/gallery', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, imageUrl, category } = req.body;
    if (!title || !imageUrl) {
      res.status(400).json({ success: false, error: 'Title and imageUrl are required.' });
      return;
    }
    const image = await prisma.galleryImage.create({
      data: { title, imageUrl, category: category || null },
    });
    res.status(201).json({ success: true, data: image });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE /api/gallery/:id (ADMIN)
app.delete('/api/gallery/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await prisma.galleryImage.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, error: 'Gallery image not found.' });
      return;
    }
    await prisma.galleryImage.delete({ where: { id } });
    res.json({ success: true, data: { message: 'Gallery image deleted.' } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =============================================================================
// SETTINGS ROUTES
// =============================================================================

// GET /api/settings
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach(s => { settingsMap[s.key] = s.value; });
    res.json({ success: true, data: settingsMap });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/settings (ADMIN)
app.put('/api/settings', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const settings = req.body; // expects { key: value, key2: value2, ... }
    if (!settings || typeof settings !== 'object') {
      res.status(400).json({ success: false, error: 'Settings object is required.' });
      return;
    }
    const results = [];
    for (const [key, value] of Object.entries(settings)) {
      const result = await prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
      results.push(result);
    }
    res.json({ success: true, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =============================================================================
// DASHBOARD ROUTES
// =============================================================================

// GET /api/dashboard/stats (ADMIN)
app.get('/api/dashboard/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const [totalProducts, totalOrders, totalUsers, totalEnquiries, pendingOrders, unreadEnquiries, totalRevenue] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count({ where: { role: 'USER' } }),
      prisma.enquiry.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.enquiry.count({ where: { isRead: false } }),
      prisma.order.aggregate({ _sum: { total: true } }),
    ]);

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    const recentEnquiries = await prisma.enquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    const ordersByStatus = await prisma.order.groupBy({
      by: ['status'],
      _count: { status: true },
    });

    res.json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalEnquiries,
        pendingOrders,
        unreadEnquiries,
        totalRevenue: totalRevenue._sum.total || 0,
        recentOrders,
        recentEnquiries,
        ordersByStatus: ordersByStatus.map(o => ({ status: o.status, count: o._count.status })),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =============================================================================
// HEALTH CHECK
// =============================================================================

app.get('/api/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok', timestamp: new Date().toISOString() } });
});

// =============================================================================
// START SERVER
// =============================================================================

app.listen(PORT, () => {
  console.log(`🚀 Erode Rifles API Server running on port ${PORT}`);
});

export default app;
