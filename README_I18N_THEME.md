# 🌍 i18n & 🎨 Theme System

## ✨ Tính Năng Mới

### 1. 🌍 i18n (Internationalization)

Portfolio hiện hỗ trợ đa ngôn ngữ với:
- ✅ Context-based i18n system
- ✅ Centralized translations
- ✅ Type-safe với TypeScript  
- ✅ No prop drilling
- ✅ Easy to add new languages

### 2. 🎨 Multi-Theme System

Hỗ trợ 5 color themes:
- ✅ **Cyan** (default) - Cyan + Purple
- ✅ **Blue** - Blue + Purple
- ✅ **Green** - Green + Purple
- ✅ **Orange** - Orange + Pink
- ✅ **Pink** - Pink + Purple

Plus Dark/Light mode cho mỗi theme!

## 📁 File Structure

```
lib/
├── i18n/
│   ├── i18n-context.tsx      # i18n Context Provider
│   └── translations.ts        # All translations
└── theme/
    ├── theme-context.tsx      # Theme Color Provider
    └── theme-colors.ts        # Theme color definitions

components/
├── theme-selector.tsx         # Theme color picker
├── navigation.tsx             # ✅ Migrated to i18n
├── hero.tsx                   # ✅ Migrated to i18n
└── about.tsx                  # ✅ Using i18n (demo)
```

## 🚀 Cách Sử Dụng

### i18n Usage

```typescript
// In any component
import { useI18n } from "@/lib/i18n/i18n-context";

export default function MyComponent() {
  const { locale, setLocale, t } = useI18n();
  
  return (
    <div>
      <h1>{t.hero.title}</h1>
      <button onClick={() => setLocale(locale === "vi" ? "en" : "vi")}>
        Switch Language
      </button>
    </div>
  );
}
```

### Theme Usage

```typescript
import { useThemeColor } from "@/lib/theme/theme-context";

export default function MyComponent() {
  const { themeColor, setThemeColor } = useThemeColor();
  
  return (
    <button onClick={() => setThemeColor("blue")}>
      Set Blue Theme
    </button>
  );
}
```

## 🎯 Đã Hoàn Thành

✅ Setup i18n context
✅ Setup theme color system  
✅ Theme selector component
✅ Migrate Navigation component
✅ Migrate Hero component
✅ Update About component (demo)
✅ Theme controls in header
✅ LocalStorage persistence

## 📝 TODO

Các components còn lại đã được update để **không require language prop** nữa. Chúng sử dụng default value "vi".

Để migrate hoàn toàn, follow hướng dẫn trong `I18N_MIGRATION.md`:

1. Move content từ component sang `lib/i18n/translations.ts`
2. Import `useI18n` hook
3. Replace `const text = content[language]` với `const text = t.componentName`

## 🎨 Cách Thêm Theme Mới

Edit `lib/theme/theme-colors.ts`:

```typescript
export const themeColors = {
  // ... existing themes
  purple: {
    name: "Purple",
    light: {
      primary: "147 51 234",  // Purple
      accent: "236 72 153",   // Pink
    },
    dark: {
      primary: "168 85 247",  // Light Purple
      accent: "244 114 182",  // Light Pink
    },
  },
}
```

## 🌐 Cách Thêm Language Mới

Edit `lib/i18n/translations.ts`:

```typescript
export const translations = {
  vi: { ... },
  en: { ... },
  ja: {  // Japanese
    nav: {
      about: "私について",
      skills: "スキル",
      // ...
    },
    hero: {
      name: "Đặng Trọng Đạt",
      title: "シニアフロントエンドエンジニア",
      // ...
    },
  },
}

export type Locale = "vi" | "en" | "ja"
```

## 💡 Features

### i18n System
- ✅ Type-safe translations
- ✅ Context-based (no prop drilling)
- ✅ Easy language switching
- ✅ Centralized translations
- ✅ Auto-completion in IDE

### Theme System
- ✅ 5 preset color themes
- ✅ Dark/Light mode support
- ✅ LocalStorage persistence
- ✅ Auto theme switching
- ✅ Smooth color transitions
- ✅ CSS variables based

## 🎉 Kết Quả

Portfolio giờ có:
- 🌍 **2 ngôn ngữ**: Vietnamese & English
- 🎨 **10 theme options**: 5 colors × 2 modes (dark/light)
- 🚀 **Professional i18n setup**
- ⚡ **Smooth theme switching**
- 💾 **LocalStorage persistence**

## 📸 Screenshots

### Theme Selector
Click vào icon 🎨 ở header để chọn theme color!

### Language Switcher
Click vào button VI/EN ở navigation để đổi ngôn ngữ!

---

**Built with ❤️ using Next.js 14, TypeScript & Tailwind CSS**

