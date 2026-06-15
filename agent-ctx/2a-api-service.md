# Task 2a - API Service Builder

## Task
Build Express.js + Node.js backend mini-service for the Erode Rifles e-commerce website at `/home/z/my-project/mini-services/api-service/`

## What Was Created

### Directory Structure
```
mini-services/api-service/
├── package.json           # Dependencies and scripts
├── index.ts               # Express.js server with all routes
├── seed.ts                # Database seed script
├── daemon.js              # Daemon starter (alternative)
├── daemon-start.js        # Alternative daemon approach
├── run-daemon.sh          # Persistent runner with auto-restart
├── launcher.sh            # Simple launcher
├── start.sh               # Basic start script
└── prisma/
    ├── schema.prisma      # Database schema (8 models)
    └── api-service.db     # SQLite database file
```

### Database Schema (8 Models)
1. **User** - id, name, email, phone, password, role [USER/ADMIN], timestamps
2. **Product** - id, name, slug, category, price, originalPrice, stock, isFeatured, image, images (JSON), shortDescription, description, specifications (JSON), timestamps
3. **Category** - id, name, slug, count, image, timestamps
4. **Testimonial** - id, name, initials, avatarBg, rating, comment, date, isVerified, title, timestamps
5. **Order** - id, orderNumber, customerName, email, phone, address, city, state, postalCode, items (JSON), total, status [PENDING/CONFIRMED/PACKED/DISPATCHED/DELIVERED/CANCELLED], timestamps
6. **Enquiry** - id, name, email, phone, subject, message, isRead, timestamps
7. **GalleryImage** - id, title, imageUrl, category, timestamps
8. **SiteSetting** - id, key, value, timestamps

### API Endpoints (25 routes)
- **AUTH**: POST /api/auth/register, POST /api/auth/login, POST /api/auth/forgot-password
- **PRODUCTS**: GET /api/products, GET /api/products/:slug, POST /api/products (ADMIN), PUT /api/products/:id (ADMIN), DELETE /api/products/:id (ADMIN)
- **CATEGORIES**: GET /api/categories, POST /api/categories (ADMIN), PUT /api/categories/:id (ADMIN), DELETE /api/categories/:id (ADMIN)
- **TESTIMONIALS**: GET /api/testimonials, POST /api/testimonials (ADMIN), PUT /api/testimonials/:id (ADMIN), DELETE /api/testimonials/:id (ADMIN)
- **ORDERS**: POST /api/orders (public), GET /api/orders (ADMIN), GET /api/orders/:id (ADMIN), PUT /api/orders/:id/status (ADMIN)
- **ENQUIRIES**: POST /api/enquiries (public), GET /api/enquiries (ADMIN), PUT /api/enquiries/:id/read (ADMIN)
- **GALLERY**: GET /api/gallery, POST /api/gallery (ADMIN), DELETE /api/gallery/:id (ADMIN)
- **SETTINGS**: GET /api/settings, PUT /api/settings (ADMIN)
- **DASHBOARD**: GET /api/dashboard/stats (ADMIN)
- **HEALTH**: GET /api/health

### Seed Data
- 18 products (real Erode Rifles data)
- 4 categories (Air Rifles, Air Pistols, Pellets, Accessories)
- 6 testimonials/reviews
- 3 sample orders
- 3 sample enquiries
- 3 gallery images
- 10 site settings
- Default admin: admin@eroderifles.com / admin123
- Demo user: user@example.com / user123

### Verification
All 25 test cases pass:
- Health check ✓
- Admin/User login ✓
- Product CRUD with filters (category, search, featured) ✓
- Category CRUD ✓
- Testimonial CRUD ✓
- Order creation (public) and management (admin) ✓
- Enquiry submission (public) and management (admin) ✓
- Gallery management ✓
- Settings management ✓
- Dashboard stats with aggregated metrics ✓
- Auth middleware (unauthorized access blocked) ✓
- Admin middleware (non-admin access blocked) ✓
- Invalid credentials properly rejected ✓
- New user registration ✓

## Service Status
- Running on port 3001
- Started with `setsid run-daemon.sh` for persistence
- Auto-starts via start.sh's mini-services scanner on container restart
- Access via gateway: `/api/...?XTransformPort=3001`
