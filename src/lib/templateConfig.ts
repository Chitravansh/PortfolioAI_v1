export const templateConfig: Record<string, any> = {
  Modern: {
    wrapper: "bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 font-sans",
    accent: "text-blue-600 dark:text-blue-400",
    card: "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm rounded-xl",
    button: "bg-blue-600 text-white hover:bg-blue-700 rounded-lg",
  },
  Minimalist: {
    wrapper: "bg-white text-black dark:bg-[#0a0a0a] dark:text-white font-sans tracking-tight",
    accent: "text-gray-500 dark:text-gray-400",
    card: "bg-transparent border border-black/20 dark:border-white/20 rounded-none",
    button: "bg-black text-white dark:bg-white dark:text-black hover:opacity-80 rounded-none",
  },
  Terminal: {
    // 👇 Terminal now fully supports Light Mode!
    wrapper: "bg-[#f0fdf4] text-green-800 dark:bg-[#0c0c0c] dark:text-green-500 font-mono tracking-tight",
    accent: "text-green-600 dark:text-green-400 font-bold",
    card: "bg-green-100/50 dark:bg-black border border-green-600/30 dark:border-green-500/30 rounded-sm shadow-[0_0_15px_rgba(34,197,94,0.05)] dark:shadow-[0_0_15px_rgba(34,197,94,0.1)]",
    button: "bg-green-200 text-green-800 dark:bg-green-900/50 dark:text-green-400 border border-green-600 dark:border-green-500 hover:bg-green-300 dark:hover:bg-green-900 rounded-sm",
  },
  Creative: {
    wrapper: "bg-fuchsia-50 text-slate-900 dark:bg-fuchsia-950 dark:text-fuchsia-50 font-sans",
    accent: "text-fuchsia-600 dark:text-fuchsia-400 font-black",
    card: "bg-white dark:bg-fuchsia-900 border-fuchsia-200 dark:border-fuchsia-800 shadow-xl shadow-fuchsia-500/10 rounded-3xl",
    button: "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white hover:opacity-90 rounded-full",
  },
  Executive: {
    wrapper: "bg-stone-100 text-stone-900 dark:bg-stone-950 dark:text-stone-100 font-serif",
    accent: "text-emerald-700 dark:text-emerald-500",
    card: "bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-800 shadow-md rounded-sm",
    button: "bg-emerald-800 text-white dark:bg-emerald-700 hover:bg-emerald-900 rounded-sm",
  },
  // 👇 NEW: Pure White / Cloud Theme
  Snow: {
    wrapper: "bg-white text-slate-800 dark:bg-[#0B0F19] dark:text-slate-200 font-sans",
    accent: "text-sky-500 dark:text-sky-400 font-bold",
    card: "bg-white dark:bg-[#151B2B] border border-slate-100 dark:border-slate-800 shadow-sm rounded-2xl",
    button: "bg-sky-50 text-sky-600 hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 rounded-xl transition-colors",
  },
  // 👇 NEW: Crisp Paper / Journal Theme
  Journal: {
    wrapper: "bg-[#FDFBF7] text-[#2C2C2C] dark:bg-[#1C1B1A] dark:text-[#E8E6E1] font-serif",
    accent: "text-[#8B5A2B] dark:text-[#CD853F] font-bold italic",
    card: "bg-white/60 dark:bg-white/5 border border-[#E8E6E1] dark:border-[#333333] shadow-sm rounded-sm",
    button: "bg-[#2C2C2C] text-[#FDFBF7] hover:bg-[#1A1A1A] dark:bg-[#E8E6E1] dark:text-[#1C1B1A] dark:hover:bg-white rounded-none",
  },

  Frost: {
    wrapper: "bg-white text-slate-900 dark:bg-white dark:text-slate-900 font-sans",
    accent: "text-blue-600 dark:text-blue-600 font-bold",
    card: "bg-slate-50 dark:bg-slate-50 border border-slate-200 dark:border-slate-200 shadow-sm rounded-xl",
    button: "bg-slate-900 text-white dark:bg-slate-900 dark:text-white hover:opacity-80 rounded-lg",
  },
  // 👇 NEW: Pure White / Paper Theme (Ignores Dark Mode)
  Paper: {
    wrapper: "bg-white text-black dark:bg-white dark:text-black font-serif",
    accent: "text-gray-500 dark:text-gray-500 font-bold italic",
    card: "bg-white dark:bg-white border border-gray-200 dark:border-gray-200 rounded-none",
    button: "bg-black text-white dark:bg-black dark:text-white hover:bg-gray-800 rounded-none",
  }
};