const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const SUPABASE_URL = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1];
const SUPABASE_ANON_KEY = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1];

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

async function main() {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'technologiaitcsds@gmail.com',
    password: 'Tech@2026'
  });

  if (authError) {
    console.error("Auth Error:", authError);
    return;
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authData.user.id)
    .single();

  if (profileError) {
    console.error("Profile Error:", profileError);
  } else {
    console.log("Current Profile Role in DB:", profile.role);
    console.log("Full Profile:", profile);
  }
}

main();
