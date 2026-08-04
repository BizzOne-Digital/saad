# URL Redirect Map - Soro Garage Door Services

## Migration Date
TBD - Pending Launch

## Redirect Strategy
Since the old site structure could not be crawled, this document will be updated once:
1. Old site structure is confirmed
2. New site is built and tested
3. URL mappings are finalized

## New Site Structure

### Primary Pages
| New URL | Page Title | Status |
|---------|-----------|--------|
| `/` | Homepage | ✅ Built |
| `/about` | About Us | ✅ Built |
| `/services` | Services | ✅ Built |
| `/gallery` | Gallery | ✅ Built |
| `/testimonials` | Testimonials | ✅ Built |
| `/faq` | FAQ | ✅ Built |
| `/contact` | Contact | ✅ Built |

### Legal Pages
| New URL | Page Title | Status |
|---------|-----------|--------|
| `/privacy-policy` | Privacy Policy | ✅ Built |
| `/accessibility` | Accessibility | ✅ Built |

### Admin Portal
| New URL | Page Title | Access |
|---------|-----------|--------|
| `/admin/login` | Admin Login | Public |
| `/admin` | Dashboard | Protected |
| `/admin/*` | Admin Pages | Protected |

## Permanent Redirects (301)

### To Be Added After Old Site Analysis
```
# Example format:
# Old URL → New URL (Redirect Type)
# /old-services.html → /services (301)
# /contact-us.php → /contact (301)
```

## Redirect Rules in next.config.ts
Currently configured for custom redirects as needed.

## Implementation Checklist
- [ ] Document all old URLs
- [ ] Map old URLs to new structure
- [ ] Implement redirects in next.config.ts
- [ ] Test all redirects
- [ ] Verify no redirect chains
- [ ] Verify no redirect loops
- [ ] Submit updated sitemap to Search Console
- [ ] Monitor 404 errors post-launch
- [ ] Set up Google Analytics event tracking for redirects

## Canonical URLs
All pages use canonical URLs pointing to:
- Production: https://www.sorogaragedoors.ca/[path]
- Includes trailing slash handling
- Prevents duplicate content issues

## Notes
- Old site homepage at `/` will remain at `/`
- All redirects will be 301 (permanent)
- Redirects will be tested before launch
- Client will review and approve final mapping
