import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

// Import models
import User from "../models/User";
import Service from "../models/Service";
import SiteSettings from "../models/SiteSettings";
import FAQ from "../models/FAQ";
import GalleryProject from "../models/GalleryProject";
import Testimonial from "../models/Testimonial";
import Page from "../models/Page";
import PageSection from "../models/PageSection";
import { PAGE_CONTENT_SEED } from "../lib/page-content-seed";
import { SERVICES_SEED } from "../lib/services-seed";
import { FAQS_SEED } from "../lib/faqs-seed";
import { GALLERY_SEED } from "../lib/gallery-seed";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/soro-garage-doors";

async function seed() {
  try {
    console.log("🌱 Starting database seed...");
    console.log(`📡 Connecting to MongoDB: ${MONGODB_URI}`);

    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await User.deleteMany({});
    await Service.deleteMany({});
    await SiteSettings.deleteMany({});
    await FAQ.deleteMany({});
    await GalleryProject.deleteMany({});
    await Testimonial.deleteMany({});
    await Page.deleteMany({});
    await PageSection.deleteMany({});

    // Create admin user
    console.log("👤 Creating admin user...");
    const adminEmail = process.env.ADMIN_SEED_EMAIL || "admin@sorogaragedoors.ca";
    const adminPassword = process.env.ADMIN_SEED_PASSWORD || "Admin123!";
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      email: adminEmail,
      password: hashedPassword,
      name: "Admin User",
      role: "admin",
      isActive: true,
    });
    console.log(`✅ Admin user created: ${adminEmail}`);

    // Create site settings
    console.log("⚙️  Creating site settings...");
    await SiteSettings.create({
      businessName: "Soro Garage Door Services",
      phone: "647-299-0283",
      smsNumber: "647-299-0283",
      publicEmail: "info@sorogaragedoors.ca",
      businessEmail: "info@sorogaragedoors.ca",
      serviceArea: "Greater Toronto Area",
      hours: {
        days: "Monday–Sunday",
        time: "8:00 AM–8:00 PM",
      },
      emergencyServiceEnabled: true,
      seoDefaults: {
        title: "Soro Garage Door Services | Professional Repair & Installation - GTA",
        description: "Trusted garage door repair and installation across the Greater Toronto Area. Same-day service available.",
      },
    });

    // Create services (full detail pages)
    console.log("🛠️  Creating services...");
    for (const service of SERVICES_SEED) {
      await Service.create(service);
    }
    console.log(`✅ Created ${SERVICES_SEED.length} services with detail pages`);

    // Create FAQs
    console.log("❓ Creating FAQs...");
    for (const faq of FAQS_SEED) {
      await FAQ.create(faq);
    }
    console.log(`✅ Created ${FAQS_SEED.length} FAQs`);

    // Create gallery projects
    console.log("🖼️  Creating gallery projects...");
    for (const project of GALLERY_SEED) {
      await GalleryProject.create(project);
    }
    console.log(`✅ Created ${GALLERY_SEED.length} gallery projects`);

    // Create testimonials
    console.log("⭐ Creating testimonials...");
    const testimonials = [
      {
        customerName: "Michael R.",
        city: "Toronto",
        rating: 5,
        reviewText: "Excellent service from start to finish. The team was professional, on time, and the new door looks amazing. Highly recommend!",
        source: "Google",
        date: new Date(),
        featured: true,
        published: true,
        verified: true,
        order: 1,
      },
      {
        customerName: "Sarah L.",
        city: "Mississauga",
        rating: 5,
        reviewText: "Fast emergency repair when our spring broke. They came the same day and had us back up and running in no time. Great pricing too.",
        source: "Google",
        date: new Date(),
        featured: true,
        published: true,
        verified: true,
        order: 2,
      },
    ];

    for (const testimonial of testimonials) {
      await Testimonial.create(testimonial);
    }
    console.log(`✅ Created ${testimonials.length} testimonials`);

    // Seed all page sections (CMS content)
    console.log("📄 Creating page sections...");
    let sectionCount = 0;
    for (const page of PAGE_CONTENT_SEED) {
      await Page.create({
        slug: page.slug,
        name: page.name,
        path: page.path,
        icon: page.icon,
        order: page.order,
        published: true,
        seo: page.seo,
      });
      for (const section of page.sections) {
        await PageSection.create({
          pageSlug: page.slug,
          key: section.key,
          title: section.title,
          order: section.order,
          published: true,
          fields: section.fields,
          images: section.images,
          items: section.items,
        });
        sectionCount += 1;
      }
    }
    console.log(
      `✅ Created ${PAGE_CONTENT_SEED.length} pages with ${sectionCount} sections`
    );

    console.log("\n✅ Database seeded successfully!");
    console.log("\n📋 Summary:");
    console.log(`   - Admin User: ${adminEmail}`);
    console.log(`   - Password: ${adminPassword}`);
    console.log(`   - Services: ${SERVICES_SEED.length}`);
    console.log(`   - FAQs: ${FAQS_SEED.length}`);
    console.log(`   - Gallery Projects: ${GALLERY_SEED.length}`);
    console.log(`   - Testimonials: ${testimonials.length}`);
    console.log(`   - Pages: ${PAGE_CONTENT_SEED.length}`);
    console.log(`   - Page Sections: ${sectionCount}`);
    console.log("\n⚠️  IMPORTANT: Change the admin password after first login!\n");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("👋 Database connection closed");
    process.exit(0);
  }
}

seed();
