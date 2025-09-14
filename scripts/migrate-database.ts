import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function migrateDatabase() {
  try {
    console.log('Starting database migration...');
    console.log('Database URL:', process.env.DATABASE_URL?.substring(0, 50) + '...');

    // Drop and recreate all tables to ensure clean state
    console.log('🔄 Dropping existing tables...');

    try {
      await sql`DROP TABLE IF EXISTS email_verification_codes CASCADE;`;
      await sql`DROP TABLE IF EXISTS verification_tokens CASCADE;`;
      await sql`DROP TABLE IF EXISTS sessions CASCADE;`;
      await sql`DROP TABLE IF EXISTS accounts CASCADE;`;
      await sql`DROP TABLE IF EXISTS retailers CASCADE;`;
      await sql`DROP TABLE IF EXISTS users CASCADE;`;
      console.log('✅ Dropped existing tables');
    } catch (e) {
      console.log('Tables may not exist, continuing...');
    }

    // Create users table with all required columns
    console.log('🔄 Creating users table...');
    await sql`
      CREATE TABLE users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        first_name TEXT,
        last_name TEXT,
        phone TEXT,
        phone_country_code TEXT,
        role TEXT DEFAULT 'retailer' CHECK (role IN ('retailer', 'supplier')),
        email_verified TIMESTAMP,
        image TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
    console.log('✅ Created users table');

    // Create retailers table with comprehensive stepper data
    console.log('🔄 Creating retailers table...');
    await sql`
      CREATE TABLE retailers (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,

        -- Step 3: Personal Information
        first_name TEXT,
        last_name TEXT,
        phone TEXT,
        phone_country_code TEXT,

        -- Step 4: Company Information
        company_name TEXT NOT NULL,
        address TEXT NOT NULL,
        company_type TEXT NOT NULL CHECK (company_type IN ('Agency', 'Consultant', 'Corporation', 'Creator', 'D2C Brand', 'Importer', 'Marketplace', 'Online Retailer', 'Retailer', 'Small Business', 'Wholesaler')),
        annual_revenue TEXT NOT NULL CHECK (annual_revenue IN ('Under $100K', '$100K - $500K', '$500K - $1M', '$1M - $5M', '$5M - $10M', '$10M - $50M', '$50M+', 'Prefer not to say')),
        website TEXT,

        -- Step 5: Business Goals
        business_goals JSON NOT NULL DEFAULT '[]',

        -- Step 6: Product Experience
        has_launched_product BOOLEAN,

        -- Step 7: Category Interests
        interested_categories JSON NOT NULL DEFAULT '[]',

        -- Step 8: Product Description & Preferences
        product_description TEXT,
        auto_create_request BOOLEAN NOT NULL DEFAULT true,
        get_direct_introductions BOOLEAN NOT NULL DEFAULT true,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
    console.log('✅ Created retailers table');

    // Create accounts table (for NextAuth)
    console.log('🔄 Creating accounts table...');
    await sql`
      CREATE TABLE accounts (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        provider TEXT NOT NULL,
        provider_account_id TEXT NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at TIMESTAMP,
        token_type TEXT,
        scope TEXT,
        id_token TEXT,
        session_state TEXT
      );
    `;
    console.log('✅ Created accounts table');

    // Create sessions table (for NextAuth)
    console.log('🔄 Creating sessions table...');
    await sql`
      CREATE TABLE sessions (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        session_token TEXT NOT NULL UNIQUE,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires TIMESTAMP NOT NULL
      );
    `;
    console.log('✅ Created sessions table');

    // Create verification_tokens table (for NextAuth)
    console.log('🔄 Creating verification_tokens table...');
    await sql`
      CREATE TABLE verification_tokens (
        identifier TEXT NOT NULL,
        token TEXT NOT NULL UNIQUE,
        expires TIMESTAMP NOT NULL
      );
    `;
    console.log('✅ Created verification_tokens table');

    // Create email_verification_codes table
    console.log('🔄 Creating email_verification_codes table...');
    await sql`
      CREATE TABLE email_verification_codes (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email TEXT NOT NULL,
        code TEXT NOT NULL,
        expires TIMESTAMP NOT NULL,
        verified BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    console.log('✅ Created email_verification_codes table');

    console.log('🎉 Database migration completed successfully!');
  } catch (error) {
    console.error('❌ Database migration failed:', error);
    process.exit(1);
  }
}

migrateDatabase();
