# Deploying to www.swethapriya.com

This guide will help you deploy your portfolio to your custom domain.

## Option 1: Netlify (Recommended - Easiest)

### Step 1: Deploy to Netlify

1. **Sign up/Login to Netlify**
   - Go to https://www.netlify.com
   - Sign up or login with GitHub

2. **Deploy Your Site**
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository (or drag & drop the project folder)
   - Netlify will auto-detect the settings from `netlify.toml`
   - Click "Deploy site"

3. **Add Custom Domain**
   - Once deployed, go to "Site settings" → "Domain management"
   - Click "Add custom domain"
   - Enter: `www.swethapriya.com`
   - Click "Verify"

### Step 2: Configure DNS

You need to update your domain's DNS settings. Go to your domain registrar (where you bought swethapriya.com):

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `your-site-name.netlify.app` (Netlify will provide this)
- TTL: `3600` (or auto)

**For root domain (optional, to redirect swethapriya.com → www.swethapriya.com):**
- Type: `A`
- Name: `@` or leave empty
- Value: `75.2.60.5` (Netlify's load balancer)
- TTL: `3600`

### Step 3: Enable HTTPS
- Netlify will automatically provision a free SSL certificate
- This usually takes a few minutes after DNS propagation
- Your site will be available at https://www.swethapriya.com

---

## Option 2: Vercel

### Step 1: Deploy to Vercel

1. **Sign up/Login to Vercel**
   - Go to https://vercel.com
   - Sign up or login with GitHub

2. **Deploy Your Site**
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

3. **Add Custom Domain**
   - Go to project settings → "Domains"
   - Add domain: `www.swethapriya.com`
   - Vercel will provide DNS instructions

### Step 2: Configure DNS

Go to your domain registrar:

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: `3600`

**For root domain (optional):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`
- TTL: `3600`

---

## Option 3: GitHub Pages (Free)

### Step 1: Prepare Repository

1. Create a GitHub repository for your project
2. Push your code to the repository

### Step 2: Add GitHub Pages Configuration

Add to `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

Install gh-pages:
```bash
npm install --save-dev gh-pages
```

### Step 3: Configure Custom Domain

1. Create a `public/CNAME` file with:
   ```
   www.swethapriya.com
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```

3. Go to repository settings → Pages
4. Set custom domain to `www.swethapriya.com`

### Step 4: Configure DNS

At your domain registrar:

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `your-username.github.io`
- TTL: `3600`

---

## Quick Start (Recommended Path)

1. **Use Netlify** - it's the easiest and most reliable
2. **Drag & Drop Method**:
   - Build your project: `npm run build`
   - Go to https://app.netlify.com/drop
   - Drag the `dist` folder
   - Add custom domain in settings
   - Update DNS as instructed above

## DNS Propagation

- DNS changes can take 5 minutes to 48 hours to propagate
- Usually completes within 1-2 hours
- Check status at: https://dnschecker.org

## Troubleshooting

**Site not loading after DNS change:**
- Wait for DNS propagation (check with `nslookup www.swethapriya.com`)
- Clear browser cache
- Try incognito mode

**SSL certificate not working:**
- Wait a few hours for automatic provisioning
- Verify DNS is pointing correctly
- Contact hosting support if needed

## Support

- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs
- DNS Help: Contact your domain registrar
