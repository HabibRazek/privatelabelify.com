'use server';

import { db } from '@/lib/db';
import { companies } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function createCompany(data: {
  userId: string;
  name: string;
  address?: string;
  type?: string;
  annualRevenue?: string;
  website?: string;
}) {
  try {
    const newCompany = await db
      .insert(companies)
      .values(data)
      .returning();

    return { company: newCompany[0] };
  } catch (error) {
    console.error('Error creating company:', error);
    return { error: 'Failed to create company' };
  }
}

export async function getCompanyByUserId(userId: string) {
  try {
    const company = await db
      .select()
      .from(companies)
      .where(eq(companies.userId, userId))
      .limit(1);

    return company[0] || null;
  } catch (error) {
    console.error('Error fetching company:', error);
    return null;
  }
}

export async function updateCompany(id: string, data: {
  name?: string;
  address?: string;
  type?: string;
  annualRevenue?: string;
  website?: string;
}) {
  try {
    const updatedCompany = await db
      .update(companies)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(companies.id, id))
      .returning();

    return { company: updatedCompany[0] };
  } catch (error) {
    console.error('Error updating company:', error);
    return { error: 'Failed to update company' };
  }
}
