/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './index.html',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // Brand
        nour: {
          base: "#0A0A0A",
          main: "#121212",
          surface: "#1A1A1A",
          card: "#242424",
          "card-hover": "#2C2C2C",
          accent: "#FF6B00",
          "accent-hover": "#FF8C33",
          "accent-soft": "#FFAB66",
          "text-secondary": "#A0A0A0",
          "text-muted": "#666666",
          "price-old": "#FF4D4D",
          border: "#2A2A2A",
          "border-hover": "#444444",
          whatsapp: "#25D366",
          "whatsapp-hover": "#1DB954",
          "status-open": "#4CAF50",
        },
        border: "#2A2A2A",
        input: "#2A2A2A",
        ring: "#FF6B00",
        background: "#0A0A0A",
        foreground: "#FFFFFF",
        primary: { DEFAULT: "#FF6B00", foreground: "#FFFFFF" },
        secondary: { DEFAULT: "#1A1A1A", foreground: "#FFFFFF" },
        destructive: { DEFAULT: "#FF4D4D", foreground: "#FFFFFF" },
        muted: { DEFAULT: "#1A1A1A", foreground: "#A0A0A0" },
        accent: { DEFAULT: "#FF6B00", foreground: "#FFFFFF" },
        popover: { DEFAULT: "#1A1A1A", foreground: "#FFFFFF" },
        card: { DEFAULT: "#242424", foreground: "#FFFFFF" },
      },
      fontFamily: {
        heading: ['Cairo', 'sans-serif'],
        body: ['"IBM Plex Sans Arabic"', 'Cairo', 'sans-serif'],
        accent: ['"Space Grotesk"', 'sans-serif'],
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px",
        xl: "20px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(255,107,0,0.35)",
        "glow-sm": "0 0 20px rgba(255,107,0,0.25)",
        "glow-lg": "0 0 60px rgba(255,107,0,0.45)",
        card: "0 4px 24px rgba(0,0,0,0.6)",
        "card-hover": "0 8px 40px rgba(255,107,0,0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        meshDrift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-20px, 20px) scale(1.05)" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        kenBurns: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pingDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "mesh-drift": "meshDrift 30s ease-in-out infinite alternate",
        "pulse-ring": "pulseRing 2s ease-out infinite",
        "spin-slow": "spinSlow 8s linear infinite",
        "float-y": "floatY 3s ease-in-out infinite",
        "ken-burns": "kenBurns 20s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "ping-dot": "pingDot 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
