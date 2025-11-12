# i18n Migration Guide

## ✅ Completed Components

1. **Navigation** - Fully migrated to i18n
2. **Hero** - Fully migrated to i18n  
3. **About** - Using i18n context (demo)

## 🔄 Remaining Components to Migrate

### Skills Component

```typescript
// Replace:
interface SkillsProps {
  language: "vi" | "en";
}
export default function Skills({ language }: SkillsProps) {
  const content = { ... }
  const text = content[language];
}

// With:
import { useI18n } from "@/lib/i18n/i18n-context";

export default function Skills() {
  const { t } = useI18n();
  // Move content to lib/i18n/translations.ts under skills key
  const text = t.skills;
}
```

### Experience Component

Add to `lib/i18n/translations.ts`:

```typescript
experience: {
  title: "Kinh Nghiệm Làm Việc", // or "Work Experience"
  experiences: [ ... ]
}
```

### Projects Component

Add to `lib/i18n/translations.ts`:

```typescript
projects: {
  title: "Dự Án Nổi Bật",
  subtitle: "Những sản phẩm tôi tự hào đã xây dựng",
  projects: [ ... ]
}
```

### Achievements Component  

Already using proper imports. Move content to translations file.

### Testimonials Component

Add to `lib/i18n/translations.ts`:

```typescript
testimonials: {
  title: "Đánh Giá & Chứng Thực",
  subtitle: "Những lời nhận xét từ đồng nghiệp và khách hàng",
  testimonials: [ ... ]
}
```

### Footer Component

Add to `lib/i18n/translations.ts`:

```typescript
footer: {
  title: "Sẵn Sàng Cho Dự Án Tiếp Theo?",
  description: "...",
  email: "dangdat.dev@gmail.com",
  // ... etc
}
```

## 📝 Steps to Migrate Each Component

1. **Remove language prop**:
   ```diff
   - interface ComponentProps {
   -   language: "vi" | "en";
   - }
   - export default function Component({ language }: ComponentProps) {
   + export default function Component() {
   ```

2. **Add i18n hook**:
   ```typescript
   import { useI18n } from "@/lib/i18n/i18n-context";
   
   const { t } = useI18n();
   ```

3. **Move content to translations file** (`lib/i18n/translations.ts`)

4. **Replace content access**:
   ```diff
   - const text = content[language];
   + const text = t.componentName;
   ```

5. **Update parent component** (remove language prop passing)

## 🎨 Theme System

### Using Theme Colors

```typescript
import { useThemeColor } from "@/lib/theme/theme-context";

const { themeColor, setThemeColor } = useThemeColor();
```

### Available Theme Colors

- `cyan` (default) - Cyan + Purple
- `blue` - Blue + Purple
- `green` - Green + Purple
- `orange` - Orange + Pink
- `pink` - Pink + Purple

### Adding New Theme Colors

Edit `lib/theme/theme-colors.ts`:

```typescript
export const themeColors = {
  yourColor: {
    name: "Your Color",
    light: {
      primary: "R G B",  // e.g., "59 130 246"
      accent: "R G B",
    },
    dark: {
      primary: "R G B",
      accent: "R G B",
    },
  },
}
```

## 🚀 Quick Migration Script

For bulk migration, you can use this pattern:

```bash
# Find all components with language prop
grep -r "language.*vi.*en" components/

# Replace imports
sed -i 's/interface.*Props.*language/import { useI18n } from "@\/lib\/i18n\/i18n-context";/g'
```

## ✨ Benefits

- ✅ Centralized translations
- ✅ Easy to add new languages
- ✅ Type-safe with TypeScript
- ✅ No prop drilling
- ✅ Dynamic theme colors
- ✅ LocalStorage persistence

