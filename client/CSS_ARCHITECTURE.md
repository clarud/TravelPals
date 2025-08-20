# TravelPals CSS Architecture Guide

## 🏗️ CSS File Structure & Responsibilities

### 📁 **File Hierarchy**
```
src/
├── index.css          # Global foundation (design system)
├── App.css            # Application layout structure
├── components/        # Component-specific styles
│   └── Header/
│       └── Header.css # Only Header-specific styles
└── pages/             # Page-specific styles
    ├── LandingPage.css # Only LandingPage-specific styles
    └── LoginPage.css   # Only LoginPage-specific styles
```

## 🎯 **CSS Responsibilities**

### **index.css - Global Foundation**
**Purpose**: Design system, tokens, and application-wide defaults

**Contains**:
- ✅ CSS Custom Properties (design tokens)
- ✅ Global resets (html, body)
- ✅ Design system components (.btn, .card, .modal)
- ✅ Typography scale (h1, h2, h3)
- ✅ Utility classes (.text-center, .mb-4)

**Example**:
```css
:root {
  --color-primary: #40BFBF;
  /* Design tokens */
}

.btn-primary {
  background-color: var(--color-primary);
  /* Global button styles */
}
```

### **App.css - Application Layout**
**Purpose**: High-level layout structure and app-wide containers

**Contains**:
- ✅ Application layout (#root, .app, .app-main)
- ✅ Page containers (.page-wrapper)
- ✅ App-wide layout utilities

**Example**:
```css
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
```

### **Component CSS - Component-Specific**
**Purpose**: Styles unique to individual components

**Contains**:
- ✅ Component-specific classes (.header-logo, .hero-section)
- ✅ Component layout and structure
- ✅ Context-specific overrides (.hero-section .btn-primary)

**DON'T Include**:
- ❌ Global button definitions (.btn-primary)
- ❌ Typography scale redefinitions
- ❌ Design token redefinitions

## 🎨 **CSS Override Pattern**

### **Specificity Hierarchy** (Low to High):
1. **Global defaults** (index.css)
2. **Layout structure** (App.css)
3. **Component structure** (Component.css)
4. **Context overrides** (.hero-section .btn-primary)

### **Override Examples**:

```css
/* ✅ CORRECT - Context-specific override */
.hero-section .btn-primary {
  --btn-primary-bg: var(--color-surface);
  --btn-primary-color: var(--color-primary);
}

/* ❌ WRONG - Global redefinition in component */
.btn-primary {
  background: purple;
}
```

## 🛠️ **CSS Custom Properties Pattern**

### **Token-Based Overrides**:
Use CSS custom properties for clean, maintainable overrides:

```css
/* Global definition (index.css) */
.btn-primary {
  background-color: var(--btn-primary-bg, var(--color-primary));
  color: var(--btn-primary-color, var(--color-surface));
}

/* Context override (Component.css) */
.login-form .btn-primary {
  --btn-primary-bg: var(--color-accent);
}
```

## 📋 **Best Practices Checklist**

### **✅ DO**:
- Use CSS custom properties for design tokens
- Keep component CSS focused on component structure
- Use context-specific overrides for variations
- Leverage the cascade and specificity naturally
- Comment your CSS sections clearly

### **❌ DON'T**:
- Redefine global components in component CSS
- Use !important (except for utilities)
- Hardcode colors (use CSS variables)
- Create duplicate class definitions
- Mix layout and component styles

## 🚀 **Workflow Guidelines**

### **Adding New Styles**:
1. **Need global component?** → Add to `index.css`
2. **Need layout structure?** → Add to `App.css`
3. **Need component styling?** → Add to `Component.css`
4. **Need context override?** → Use specific selector in `Component.css`

### **Debugging CSS Issues**:
1. Check CSS cascade order (DevTools)
2. Look for competing class definitions
3. Verify CSS custom property values
4. Check import order in React components

## 🎯 **Current TravelPals Structure**

Your app now follows this clean architecture:

- **index.css**: Complete design system with:
  - ✅ Teal brand colors (primary)
  - ✅ Red accent colors (for CTAs, errors, warnings)
  - ✅ Light + Dark mode support
  - ✅ Full button variant system (.btn-primary, .btn-accent, .btn-success)
  - ✅ Semantic color tokens (success, warning, error, info)
- **App.css**: Application layout structure
- **Component CSS**: Component-specific styles only
- **No conflicts**: Single source of truth for all design tokens

## 🎨 **Available Design Tokens**

### **Color Palette**:
- **Primary**: Teal (#40BFBF) - Main brand color
- **Accent**: Red (#E30613) - CTAs, errors, important actions
- **Success**: Green (#10B981) - Success states
- **Warning**: Orange (#F59E0B) - Warning states
- **Info**: Blue (#4F96A8) - Informational content

### **Button Variants**:
- `.btn-primary` - Teal (main actions)
- `.btn-secondary` - Teal outline (secondary actions)
- `.btn-accent` - Red (important/dangerous actions)
- `.btn-success` - Green (positive actions)
- `.btn-warning` - Orange (warning actions)

### **Theme Support**:
- ✅ Light mode (default)
- ✅ Dark mode (auto + manual toggle)
- ✅ Smooth transitions between themes

This ensures your design system works consistently across all components with full color palette utilization!
