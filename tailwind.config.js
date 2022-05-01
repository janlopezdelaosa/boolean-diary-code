module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    safelist: [
      "border-black",
      "border-yellow-700",
      "border-purple-600",
      "border-blue-400",
      "border-yellow-400",
      "border-green-800",
      "border-pink-500",
      "bg-white",
      "bg-yellow-700",
      "bg-purple-600",
      "bg-blue-400",
      "bg-yellow-400",
      "bg-green-800",
      "bg-pink-500",
      "text-white",
      "text-yellow-700",
      "text-purple-600",
      "text-blue-400",
      "text-yellow-400",
      "text-green-800",
      "text-pink-500",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
