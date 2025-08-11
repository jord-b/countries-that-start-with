// Supabase Configuration
// Replace these with your actual Supabase project credentials
const SUPABASE_URL = "https://vsetafvsysyfugeobqmp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_TnHq6szhF_2pTYCbvdvl5Q_Z3g2Pm65";

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other files
window.supabaseClient = supabase;
