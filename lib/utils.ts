import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get the base path for GitHub Pages deployment
export const basePath = process.env.NODE_ENV === "production" ? "/AI-Doctor-Assistance-82" : ""

// Helper function for asset paths
export function getAssetPath(path: string) {
  return `${basePath}${path}`
}
