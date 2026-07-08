import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://kjwwruubzyakmamfrbnq.supabase.co',
  'sb_publishable_ME5BOGjXtkwi1eeqvN1PAg_U-_bPraK'
);

async function test() {
  const email = `test_${Date.now()}@gmail.com`;
  console.log('Testing signup with', email);
  const { data, error } = await supabase.auth.signUp({
    email,
    password: 'password123',
    options: {
      data: {
        full_name: 'Test User',
        roll_number: `24IT${Math.floor(Math.random() * 1000)}`,
        department: 'it'
      }
    }
  });

  if (error) {
    console.error('Signup Error:', error);
  } else {
    console.log('Signup Success:', data.user.id);
    
    // Test login
    const loginRes = await supabase.auth.signInWithPassword({
      email,
      password: 'password123'
    });
    
    if (loginRes.error) {
      console.error('Login Error:', loginRes.error);
    } else {
      console.log('Login Success:', loginRes.data.user.id);
    }
  }
}

test();
