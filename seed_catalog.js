import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Parse .env.local manually to avoid needing 'dotenv' dependency
const envFile = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value.length > 0) {
    env[key.trim()] = value.join('=').trim().replace(/['"]/g, '');
  }
});

const SUPABASE_URL = env['VITE_SUPABASE_URL'];
// NOTE: If anon key fails due to RLS, you'll need a service_role key to insert via script
const SUPABASE_KEY = env['VITE_SUPABASE_SERVICE_ROLE_KEY'] || env['VITE_SUPABASE_ANON_KEY']; 

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Missing SUPABASE credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const productsToInsert = [
  {
    name: "Reflection Flawless Face Cream",
    description: "A restorative cream for flawless, radiant skin.",
    price: 78,
    category_id: "moisturisers",
    image_url: null, // You can upload photos later and assign them in the admin dashboard
  },
  {
    name: "Flawless Toning Milk",
    description: "Luxurious toning milk that evens out skin tone and hydrates.",
    price: 64,
    category_id: "moisturisers",
    image_url: null,
  },
  {
    name: "Vitamin C Face Serum",
    description: "Brightening antioxidant serum for daily environmental protection.",
    price: 78,
    category_id: "serums",
    image_url: null,
  },
  {
    name: "Niacinamide Face Serum",
    description: "Pore-refining and barrier-restoring serum for a balanced complexion.",
    price: 68,
    category_id: "serums",
    image_url: null,
  },
  {
    name: "Herbal soap",
    description: "Natural herbal soap for deep cleansing without stripping the skin barrier.",
    price: 25,
    category_id: "cleansers",
    image_url: null,
  }
];

async function seedCatalog() {
  console.log("🌱 Starting product catalog seed...");
  
  for (const product of productsToInsert) {
    const { data, error } = await supabase.from('products').insert([product]).select();
    
    if (error) {
      console.error(`❌ Failed to add "${product.name}":`, error.message);
    } else {
      console.log(`✅ Successfully added: ${product.name}`);
    }
  }
  
  console.log("✨ Seeding catalog complete! You can now edit these and add photos from your Manage Products dashboard.");
}

seedCatalog();
