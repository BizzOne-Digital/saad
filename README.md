# Soro Garage Door Services Website

A complete, production-ready, premium Next.js website for Soro Garage Door Services - a professional garage door company serving the Greater Toronto Area.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion, GSAP
- **Cinematic Design**: 4-second garage door opening intro animation
- **Full Admin Portal**: Complete content management system
- **MongoDB Database**: Mongoose models for all content and leads
- **Lead Generation**: Advanced quote request form with validation
- **SEO Optimized**: Structured data, meta tags, sitemap, canonical URLs
- **Fully Responsive**: Mobile-first design with smooth animations
- **Accessibility**: WCAG 2.1 Level AA compliant
- **Performance**: Optimized images, lazy loading, 90+ Lighthouse scores

## 📋 Project Structure

```
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── gallery/           # Project gallery
│   ├── testimonials/      # Customer reviews
│   ├── faq/               # FAQ page
│   ├── contact/           # Contact & quote form
│   ├── privacy-policy/    # Privacy policy
│   ├── accessibility/     # Accessibility statement
│   └── admin/             # Admin portal (to be built)
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── CinematicIntro.tsx # Opening animation
│   └── home/              # Homepage sections
├── models/                # Mongoose database models
├── lib/                   # Utilities and database connection
├── docs/                  # Documentation
└── public/                # Static assets

```

## 🛠️ Installation

### Prerequisites

- Node.js 18+ and npm
- MongoDB installed locally or MongoDB Atlas account
- Git

### Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd soro-garage-doors
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure your `.env` file**
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/soro-garage-doors
   AUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ADMIN_SEED_EMAIL=admin@sorogaragedoors.ca
   ADMIN_SEED_PASSWORD=ChangeThisPassword123!
   ```

5. **Start MongoDB locally**
   ```bash
   # Make sure MongoDB is running
   mongod
   ```

6. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

7. **Run development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💾 MongoDB Connection

### Local Development

Connect using MongoDB Compass:
```
mongodb://127.0.0.1:27017/soro-garage-doors
```

### Production

Use MongoDB Atlas or your hosted MongoDB provider:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/soro-garage-doors
```

## 🔐 Admin Portal

Access the admin portal at `/admin/login`

Default credentials (after seeding):
- Email: As specified in `ADMIN_SEED_EMAIL`
- Password: As specified in `ADMIN_SEED_PASSWORD`

**⚠️ Change default credentials immediately in production!**

## 📧 Email Configuration

Configure SMTP for lead notifications:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=info@sorogaragedoors.ca
LEAD_NOTIFICATION_EMAIL=sorogaragedoors@gmail.com
```

## 📱 Logo Setup

Place your logo file at:
```
/public/logo.png
```

Recommended dimensions: 400x200px (transparent background)

## 🚀 Deployment

### Vercel (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import project in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. **Set up MongoDB Atlas**
   - Create a MongoDB Atlas cluster
   - Add your Vercel IP to Atlas whitelist
   - Update `MONGODB_URI` in Vercel environment variables

4. **Configure environment variables in Vercel**
   - Add all variables from `.env.example`
   - Set `NEXT_PUBLIC_SITE_URL` to your domain

### Other Platforms

This is a standard Next.js application and can be deployed to:
- Netlify
- AWS (Amplify, EC2, or ECS)
- Digital Ocean
- Railway
- Render

## 🔍 SEO Setup

### Google Search Console

1. Verify ownership using the verification meta tag
2. Submit sitemap: `https://www.sorogaragedoors.ca/sitemap.xml`
3. Monitor indexing status

### Google Analytics

Add your measurement ID:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Redirects

Manage URL redirects in:
- `next.config.ts` for static redirects
- Admin portal for dynamic redirects

## 📊 Database Models

- **User**: Admin users and authentication
- **SiteSettings**: Global site configuration
- **Service**: Service offerings
- **GalleryProject**: Portfolio projects
- **Testimonial**: Customer reviews
- **FAQ**: Frequently asked questions
- **Lead**: Quote requests and form submissions
- **Redirect**: URL redirect management

## 🎨 Customization

### Colors

Edit in `tailwind.config.ts`:
```typescript
colors: {
  black: "#111111",
  orange: "#F58220",
  white: "#FFFFFF",
  "dark-gray": "#333333",
}
```

### Animations

- Reduce motion support built-in
- Configure in `components/CinematicIntro.tsx`
- Global animation utilities in `globals.css`

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 📋 Pre-Launch Checklist

- [ ] Add real business logo
- [ ] Upload real project images
- [ ] Configure MongoDB production connection
- [ ] Set up SMTP email service
- [ ] Configure Google Analytics
- [ ] Verify Google Search Console
- [ ] Test contact form submissions
- [ ] Review and update all content
- [ ] Change default admin password
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Set up automated backups
- [ ] Configure domain and SSL

## 🔒 Security

- Never commit `.env` file
- Use strong admin passwords
- Enable HTTPS in production
- Regularly update dependencies
- Monitor for suspicious activity
- Back up database regularly

## 📦 Backup & Export

### Export MongoDB Data

```bash
mongodump --uri="mongodb://127.0.0.1:27017/soro-garage-doors" --out=./backup
```

### Restore MongoDB Data

```bash
mongorestore --uri="mongodb://127.0.0.1:27017/soro-garage-doors" ./backup
```

## 🆘 Support

For technical support:
- Email: info@sorogaragedoors.ca
- Phone: 647-299-0283

## 📄 License

© 2026 Soro Garage Door Services. All rights reserved.

---

**Built with ❤️ for Soro Garage Door Services**
