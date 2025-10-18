#!/usr/bin/env node
/*
 * Generate sitemap.xml from live Tebex Headless API data + free/private DB entries.
 * - Includes homepage, category pages, product pages with query params, and free/private package pages.
 * - Writes to public/sitemap.xml so CRA build copies it to /build.
 */

const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) return;
      const key = trimmed.slice(0, eqIndex).trim();
      let val = trimmed.slice(eqIndex + 1).trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    });
  }
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function main() {
  loadEnv();

  const token = process.env.REACT_APP_TEBEX_PUBLIC_API_KEY;
  const siteUrl = process.env.PUBLIC_SITE_URL || 'https://gtamodstation.com';
  const databaseApiUrl = process.env.REACT_APP_DATABASE_API_URL;

  if (!token) {
    console.error('Missing REACT_APP_TEBEX_PUBLIC_API_KEY in environment or .env.local');
    process.exit(1);
  }

  const categoriesEndpoint = `https://headless.tebex.io/api/accounts/${token}/categories?includePackages=1`;
  const packagesEndpoint = `https://headless.tebex.io/api/accounts/${token}/packages`;

  const urls = new Set();
  urls.add(`${siteUrl}/`);

  // Paid categories and packages from Tebex
  try {
    const cats = await fetchJson(categoriesEndpoint);
    const categories = Array.isArray(cats?.data) ? cats.data : [];
    for (const cat of categories) {
      if (!cat || !cat.id) continue;
      urls.add(`${siteUrl}/category?id=${cat.id}`);
      const pkgs = Array.isArray(cat.packages) ? cat.packages : [];
      for (const pkg of pkgs) {
        if (!pkg || !pkg.id) continue;
        const categoryIdParam = cat.id ? `&categoryId=${cat.id}` : '';
        urls.add(`${siteUrl}/package?id=${pkg.id}${categoryIdParam}`);
      }
    }
  } catch (e) {
    console.warn('Warning: failed to fetch categories; continuing without category URLs.', e?.message || e);
  }

  try {
    const pkgs = await fetchJson(packagesEndpoint);
    const pkgList = Array.isArray(pkgs?.data) ? pkgs.data : [];
    for (const pkg of pkgList) {
      if (!pkg || !pkg.id) continue;
      const categoryIdParam = pkg?.category?.id ? `&categoryId=${pkg.category.id}` : '';
      urls.add(`${siteUrl}/package?id=${pkg.id}${categoryIdParam}`);
    }
  } catch (e) {
    console.warn('Warning: failed to fetch global packages; category-derived URLs may still be sufficient.', e?.message || e);
  }

  // Free/private packages from custom database API
  if (databaseApiUrl) {
    // Add the free listing page itself
    urls.add(`${siteUrl}/free_packages`);

    try {
      const freeData = await fetchJson(`${databaseApiUrl}get_private_packages.php?user=true`);
      const freeList = Array.isArray(freeData) ? freeData : [freeData];
      for (const pkg of freeList) {
        if (!pkg || !pkg.id) continue;
        urls.add(`${siteUrl}/free?id=${pkg.id}`);
      }
    } catch (e) {
      console.warn('Warning: failed to fetch free/private packages from database API.', e?.message || e);
    }
  } else {
    console.warn('Note: REACT_APP_DATABASE_API_URL is not set; skipping free/private URLs.');
  }

  const lastmod = new Date().toISOString();
  const urlset = Array.from(urls).map((loc) => {
    const priority = loc === `${siteUrl}/` ? '1.0' : (loc.includes('/category') ? '0.9' : '0.8');
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`;

  const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outPath, xml.trim());
  console.log(`Sitemap generated with ${urls.size} URLs at ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});