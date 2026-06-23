/**
 * Cloudflare Worker for edge-side A/B Testing on a React SPA.
 * 
 * This worker acts as a "Coin Flip" layer. It does NOT rewrite the URL
 * because the React Router (SPA) needs to read the exact URL path.
 * Instead, it sets a persistent 'ab-test-variant' cookie.
 * The React App will read this cookie and render Version A or Version B accordingly.
 */

export default {
  async fetch(request, env, ctx) {
    // We only care about requests to the root path (the landing page)
    const url = new URL(request.url);
    
    // Only apply the A/B test to the root route '/'
    // Ignore static assets (.js, .css, images, etc)
    if (url.pathname !== '/' || url.pathname.includes('.')) {
      return fetch(request);
    }

    const cookieString = request.headers.get('Cookie') || '';
    let variant = null;

    // Check if the user already has a variant assigned
    if (cookieString.includes('ab-test-variant=A')) {
      variant = 'A';
    } else if (cookieString.includes('ab-test-variant=B')) {
      variant = 'B';
    }

    let isNewAssignment = false;

    // If no variant exists, flip a coin (50/50)
    if (!variant) {
      variant = Math.random() < 0.5 ? 'A' : 'B';
      isNewAssignment = true;
    }

    // Fetch the origin exactly as requested (no URL masking required here
    // because React will handle the "masking" by reading the cookie)
    let response = await fetch(request);

    // If this was a new assignment, we need to inject the Set-Cookie header
    // so the browser remembers it for future visits
    if (isNewAssignment) {
      // Create a mutable copy of the response
      response = new Response(response.body, response);
      
      // Set cookie to expire in 30 days, make it accessible across the whole domain
      const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
      response.headers.append(
        'Set-Cookie',
        `ab-test-variant=${variant}; Expires=${expiryDate}; Path=/; SameSite=Lax; Secure`
      );
    }

    return response;
  },
};
