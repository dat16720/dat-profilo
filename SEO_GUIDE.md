# 🔍 SEO Setup Guide

## ✅ Đã implement:

### 1. **Structured Data (JSON-LD)**
- ✅ Person schema với đầy đủ thông tin
- ✅ Email: `dangdat.dev@gmail.com`
- ✅ Phone: `+84 XXX XXX XXX` (cần update số thật)
- ✅ Address: Hanoi, Vietnam
- ✅ Job Title: Senior Frontend Engineer
- ✅ Company: Galaxy Education JSC
- ✅ Skills & Expertise

### 2. **Meta Tags**
- ✅ Title với tên đầy đủ
- ✅ Description có email
- ✅ Keywords bao gồm: tên, email, location, skills
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Geo location tags
- ✅ Author & Contact meta tags

### 3. **Sitemap & Robots**
- ✅ `app/sitemap.ts` - Auto-generated sitemap
- ✅ `app/robots.ts` - Robots.txt configuration
- ✅ Accessible tại: `https://dangtrong-dat.dev/sitemap.xml`

### 4. **Manifest**
- ✅ `public/manifest.json` - PWA manifest

## 🚀 Cách để Google index website:

### Bước 1: Update thông tin thật

**File: `app/layout.tsx`**

1. **Update số điện thoại thật:**
```typescript
telephone: "+84 XXX XXX XXX", // Thay bằng số thật
```

2. **Update URLs thật:**
```typescript
metadataBase: new URL("https://dangtrong-dat.dev"), // Thay bằng domain thật
url: "https://dangtrong-dat.dev", // Thay bằng domain thật
```

3. **Update social links thật:**
```typescript
sameAs: [
  "https://github.com/yourusername", // Thay bằng GitHub thật
  "https://linkedin.com/in/yourusername", // Thay bằng LinkedIn thật
  "https://dangdat.dev", // Thay bằng website thật
],
```

### Bước 2: Submit lên Google Search Console

1. **Truy cập:** https://search.google.com/search-console
2. **Add property:** Nhập domain của bạn
3. **Verify ownership:** Chọn method (HTML tag, DNS, etc.)
4. **Submit sitemap:** 
   - URL: `https://yourdomain.com/sitemap.xml`
   - Click "Submit"

### Bước 3: Request Indexing

1. Vào **URL Inspection** trong Google Search Console
2. Nhập URL: `https://yourdomain.com`
3. Click **Request Indexing**
4. Google sẽ crawl và index trong 1-2 ngày

### Bước 4: Test Structured Data

1. **Google Rich Results Test:**
   - https://search.google.com/test/rich-results
   - Paste URL của bạn
   - Check xem có lỗi không

2. **Schema Markup Validator:**
   - https://validator.schema.org/
   - Paste JSON-LD code từ source code

## 📝 Checklist trước khi deploy:

- [ ] Update số điện thoại thật trong `layout.tsx`
- [ ] Update domain thật trong `layout.tsx` và `sitemap.ts`
- [ ] Update social links thật (GitHub, LinkedIn)
- [ ] Update email nếu khác
- [ ] Test structured data với Google Rich Results Test
- [ ] Submit sitemap lên Google Search Console
- [ ] Request indexing cho homepage
- [ ] Share link trên social media để tăng backlinks

## 🎯 Keywords để search:

Sau khi Google index, bạn có thể search:

- ✅ "Đặng Trọng Đạt"
- ✅ "Dang Trong Dat"
- ✅ "dangdat.dev@gmail.com"
- ✅ "Đặng Trọng Đạt Frontend Engineer"
- ✅ "Đặng Trọng Đạt React Developer"
- ✅ "Senior Frontend Engineer Galaxy Education"
- ✅ "Frontend Engineer Hanoi"

## ⚡ Tips để tăng SEO:

1. **Content Quality:**
   - Thêm blog posts về React/Next.js
   - Case studies về projects
   - Technical articles

2. **Backlinks:**
   - Share trên LinkedIn, GitHub
   - Submit lên portfolio directories
   - Guest posts trên tech blogs

3. **Performance:**
   - ✅ Đã có Analytics (Vercel Analytics)
   - Optimize images
   - Fast loading time

4. **Social Signals:**
   - Share trên social media
   - Get likes, shares, comments

## 📊 Monitor SEO:

1. **Google Search Console:**
   - Track search queries
   - Monitor click-through rate
   - Check indexing status

2. **Google Analytics:**
   - Track traffic sources
   - Monitor user behavior
   - Check bounce rate

## 🔧 Files đã tạo:

- ✅ `app/layout.tsx` - Metadata & Structured Data
- ✅ `app/sitemap.ts` - Sitemap generation
- ✅ `app/robots.ts` - Robots.txt
- ✅ `public/manifest.json` - PWA manifest

## 📞 Contact Info trong SEO:

Tất cả thông tin contact đã được thêm vào:
- ✅ Email trong description
- ✅ Email trong structured data
- ✅ Phone trong structured data
- ✅ Address trong structured data
- ✅ Keywords bao gồm email

**Kết quả:** Khi Google index, search tên, email, hoặc số điện thoại sẽ hiển thị website của bạn! 🎉

