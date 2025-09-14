import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';
import { users, retailers } from '@/lib/db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function checkDatabase() {
  try {
    console.log('🔍 Checking database for created accounts...');
    
    // Get all users
    const allUsers = await db.select().from(users);
    console.log(`\n👥 Found ${allUsers.length} users:`);
    
    for (const user of allUsers) {
      console.log(`\n📧 User: ${user.email}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Name: ${user.firstName} ${user.lastName}`);
      console.log(`   Phone: ${user.phone} (${user.phoneCountryCode})`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Email Verified: ${user.emailVerified ? 'Yes' : 'No'}`);
      console.log(`   Created: ${user.createdAt}`);
      
      // Get retailer profile for this user
      const retailerProfile = await db.select().from(retailers).where(eq(retailers.userId, user.id));
      
      if (retailerProfile.length > 0) {
        const retailer = retailerProfile[0];
        console.log(`\n🏢 Retailer Profile:`);
        console.log(`   Company: ${retailer.companyName}`);
        console.log(`   Address: ${retailer.address}`);
        console.log(`   Company Type: ${retailer.companyType}`);
        console.log(`   Annual Revenue: ${retailer.annualRevenue}`);
        console.log(`   Website: ${retailer.website || 'Not provided'}`);
        console.log(`   Business Goals: ${JSON.stringify(retailer.businessGoals)}`);
        console.log(`   Has Launched Product: ${retailer.hasLaunchedProduct ? 'Yes' : 'No'}`);
        console.log(`   Interested Categories: ${JSON.stringify(retailer.interestedCategories)}`);
        console.log(`   Product Description: ${retailer.productDescription || 'Not provided'}`);
        console.log(`   Auto Create Request: ${retailer.autoCreateRequest ? 'Yes' : 'No'}`);
        console.log(`   Get Direct Introductions: ${retailer.getDirectIntroductions ? 'Yes' : 'No'}`);
      } else {
        console.log(`   ❌ No retailer profile found`);
      }
    }
    
    console.log(`\n✅ Database check completed!`);
    
  } catch (error) {
    console.error('❌ Error checking database:', error);
  }
}

checkDatabase();
