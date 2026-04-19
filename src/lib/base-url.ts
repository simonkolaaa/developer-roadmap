/**
 * Utility to get the base URL of the application,
 * handling Vercel environment variables and potential "undefined" string injections.
 */
export function getBaseUrl(): string {
  const appUrl = import.meta.env.PUBLIC_APP_URL;
  
  // Handle literal "undefined" string which sometimes happens on Vercel/Astro build
  if (appUrl && appUrl !== 'undefined' && appUrl.length > 0) {
    return appUrl.replace(/\/$/, '');
  }
  
  // Fallback to window origin if in browser
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  return '';
}

/**
 * Ensures a URL is properly prefixed with the base URL if it's relative.
 * Removes "undefined/" prefixes.
 */
export function cleanUrl(url: string): string {
  if (!url) return '';
  
  // Remove accidental "undefined/" prefix
  let cleaned = url.replace(/^undefined\//, '');
  
  if (cleaned.startsWith('http')) return cleaned;
  
  const base = getBaseUrl();
  if (!base) return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  
  const normalizedBase = base.replace(/\/$/, '');
  const normalizedPath = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  
  return `${normalizedBase}${normalizedPath}`;
}
