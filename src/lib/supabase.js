// The Supabase client is ~100KB gzipped and only the message board in the
// Contact section needs it, so it is loaded on demand instead of shipping in
// the main bundle. Missing env vars resolve to null rather than throwing, so a
// misconfigured deploy only disables the board instead of blanking the site.
let clientPromise = null;

export function getSupabase() {
  if (!clientPromise) {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    clientPromise =
      url && key
        ? import("@supabase/supabase-js").then(({ createClient }) => createClient(url, key))
        : Promise.resolve(null);
  }
  return clientPromise;
}
