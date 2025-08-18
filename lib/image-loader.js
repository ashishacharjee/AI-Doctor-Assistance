export default function imageLoader({ src, width, quality }) {
  const basePath = process.env.NODE_ENV === "production" ? "/AI-Doctor-Assistance-82" : ""
  return `${basePath}${src}?w=${width}&q=${quality || 75}`
}
