# CETMEDS Deployment Guide

## Domain Setup (cetmeds.com)

### Prerequisites
✅ Domain purchased and configured
✅ GitHub repository with correct settings
✅ Build process optimized

### GitHub Pages Configuration

1. **Repository Settings**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"
   - Custom domain: `cetmeds.com`

2. **DNS Configuration**
   Configure your domain's DNS records:
   ```
   Type: CNAME
   Name: www
   Value: gautamanand22.github.io
   
   Type: A (for apex domain)
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

### Deployment Commands

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Deploy**: `npm run deploy:domain`

### Files Added/Modified for Domain Deployment

1. **public/CNAME** - Domain configuration
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
2. Check dist folder contains CNAME file
3. Verify all assets are properly referenced
4. Test locally: `npm run preview`
5. Push to main branch for auto-deployment

### Troubleshooting

- If custom domain doesn't work, check DNS propagation (24-48 hours)
- Ensure HTTPS is enforced in GitHub Pages settings
- Verify CNAME file is in the dist output
- Check GitHub Actions logs for deployment issues

### Performance Features

- Chunked bundle loading
- Optimized asset delivery
- Compressed static assets
- SEO-friendly structure
