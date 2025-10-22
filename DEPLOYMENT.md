# Likhavat Printing Press Deployment Guide

## Domain Setup (likhavatprintingpress.com)

### Prerequisites
✅ Domain purchased from Namecheap
✅ Cloudflare DNS configured
✅ GitHub repository with correct settings
✅ Build process optimized

### Cloudflare DNS Configuration

Configure these DNS records in your Cloudflare dashboard (Root apex canonical, optional www redirect):

```
Type: CNAME
Name: @ (apex / likhavatprintingpress.com)
Target: gautamanand22.github.io
Proxy status: DNS only (gray cloud)

Type: CNAME (optional)
Name: www
Target: likhavatprintingpress.com
Proxy status: DNS only
```

**Important:** Make sure proxy is disabled (gray cloud) for GitHub Pages to work properly.

### GitHub Pages Configuration

1. **Repository Settings**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"
   - Custom domain: `likhavatprintingpress.com`
   - Enable "Enforce HTTPS" (after DNS propagation)

### Deployment Commands

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Deploy**: GitHub Actions on push to `main` (no manual command required)

### Files Added/Modified for Domain Deployment

1. **public/CNAME** - Domain configuration (likhavatprintingpress.com)
2. **public/robots.txt** - SEO configuration
3. **public/404.html** - SPA routing support
4. **vite.config.js** - Updated base path and build optimization
5. **index.html** - Enhanced SEO meta tags
6. **package.json** - Added deployment scripts

### Build Optimization Features

- Code splitting (vendor, GSAP, animations)
- Terser minification
- Asset optimization
- Source map disabled for production

### Verification Steps

1. Build the project: `npm run build`
2. Check dist folder contains CNAME file with `likhavatprintingpress.com`
3. Verify all assets are properly referenced
4. Test locally: `npm run preview`
5. Push to main branch for auto-deployment

### DNS Propagation Timeline

- **Cloudflare**: Usually instant to 5 minutes
- **Global DNS**: Up to 24-48 hours
- **GitHub Pages**: 10-15 minutes after DNS is active

### Troubleshooting

#### If you get "InvalidCNAMEError":
1. Ensure CNAME record points to `gautamanand22.github.io`
2. Disable Cloudflare proxy (gray cloud)
3. Wait for DNS propagation
4. Remove and re-add custom domain in GitHub Pages

#### If domain doesn't work:
1. Check DNS records in Cloudflare
2. Verify CNAME file contains `www.cetmeds.com`
3. Check GitHub Actions deployment logs
4. Ensure "Enforce HTTPS" is enabled after setup

#### If www subdomain not redirecting:
1. Add CNAME `www -> likhavatprintingpress.com`
2. Optionally add Cloudflare page rule 301 `www.likhavatprintingpress.com/* -> https://likhavatprintingpress.com/$1`

### Performance Features

- Chunked bundle loading
- Optimized asset delivery
- Compressed static assets
- SEO-friendly structure

### Expected URLs after setup:
- Primary: https://likhavatprintingpress.com
- Optional: https://www.likhavatprintingpress.com → https://likhavatprintingpress.com
