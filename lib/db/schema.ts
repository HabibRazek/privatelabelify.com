import { pgTable, text, timestamp, uuid, boolean, json } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  phone: text('phone'),
  phoneCountryCode: text('phone_country_code'),
  role: text('role', { enum: ['retailer', 'supplier'] }).notNull().default('retailer'),
  emailVerified: timestamp('email_verified'),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const retailers = pgTable('retailers', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),

  // Step 3: Personal Information
  firstName: text('first_name'),
  lastName: text('last_name'),
  phone: text('phone'),
  phoneCountryCode: text('phone_country_code'),

  // Step 4: Company Information
  companyName: text('company_name').notNull(),
  address: text('address').notNull(),
  companyType: text('company_type', {
    enum: ['Agency', 'Consultant', 'Corporation', 'Creator', 'D2C Brand', 'Importer', 'Marketplace', 'Online Retailer', 'Retailer', 'Small Business', 'Wholesaler']
  }).notNull(),
  annualRevenue: text('annual_revenue', {
    enum: ['Under $100K', '$100K - $500K', '$500K - $1M', '$1M - $5M', '$5M - $10M', '$10M - $50M', '$50M+', 'Prefer not to say']
  }).notNull(),
  website: text('website'),

  // Step 5: Business Goals
  businessGoals: json('business_goals').$type<string[]>().notNull().default([]),

  // Step 6: Product Experience
  hasLaunchedProduct: boolean('has_launched_product'),

  // Step 7: Category Interests
  interestedCategories: json('interested_categories').$type<string[]>().notNull().default([]),

  // Step 8: Product Description & Preferences
  productDescription: text('product_description'),
  autoCreateRequest: boolean('auto_create_request').notNull().default(true),
  getDirectIntroductions: boolean('get_direct_introductions').notNull().default(true),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const suppliers = pgTable('suppliers', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }).unique(),

  // Step 3: Personal Information
  firstName: text('first_name'),
  lastName: text('last_name'),
  phone: text('phone'),
  phoneCountryCode: text('phone_country_code'),

  // Step 4: Company Information
  companyName: text('company_name').notNull(),
  address: text('address').notNull(),
  website: text('website'),

  // Step 5: Company Type
  companyType: text('company_type', {
    enum: ['Distributor', 'Manufacturer', 'Packaging Supplier', 'Raw Ingredient Supplier', 'Service Provider', 'Sourcing Agency']
  }).notNull(),

  // Step 6: User Role
  userRole: text('user_role', {
    enum: ['Founder/CEO', 'Senior-Level Management', 'Mid-Level Management', 'Junior-Level', 'Intern', 'Sales Manager', 'Export Manager', 'Other']
  }).notNull(),

  // Step 7: Company Details
  teamSize: text('team_size', {
    enum: ['1-10', '11-50', '51-100', '101-500', '501-1000', '1000+']
  }).notNull(),
  annualRevenue: text('annual_revenue', {
    enum: ['under-100k', '100k-250k', '250k-1m', '1m-5m', '5m-10m', '10m-50m', '50m+']
  }).notNull(),

  // Step 8: Offerings and Production
  offerings: json('offerings').$type<string[]>().notNull().default([]),
  productionTypes: json('production_types').$type<string[]>().notNull().default([]),
  moqQuantities: json('moq_quantities').$type<{ type: string; quantity: string }[]>().notNull().default([]),

  // Step 9: Production Facilities
  productionOutsourcing: text('production_outsourcing', {
    enum: ['Inhouse', 'Outsourced']
  }).notNull(),
  manufacturingCountries: json('manufacturing_countries').$type<string[]>().notNull().default([]),

  // Step 10: Support Goals
  supportGoals: json('support_goals').$type<string[]>().notNull().default([]),

  // Step 11: Company Description
  companyDescription: text('company_description').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const accounts = pgTable('accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: timestamp('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
});

export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionToken: text('session_token').notNull().unique(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
});

export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull().unique(),
  expires: timestamp('expires').notNull(),
});

export const emailVerificationCodes = pgTable('email_verification_codes', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull(),
  code: text('code').notNull(),
  expires: timestamp('expires').notNull(),
  verified: boolean('verified').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
});