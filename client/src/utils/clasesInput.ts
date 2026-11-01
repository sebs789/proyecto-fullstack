
export const clasesInput = (error?: string): string =>
  `w-full rounded-xl border bg-white px-4 py-2.5 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-durazno-fuerte ${
    error ? "border-red-500" : "border-arcilla/30"
  }`
