'use server';

import { db } from '@/lib/db';
import { onboardingProgress } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function createOnboardingProgress(userId: string) {
  try {
    const newProgress = await db
      .insert(onboardingProgress)
      .values({ userId })
      .returning();

    return { progress: newProgress[0] };
  } catch (error) {
    console.error('Error creating onboarding progress:', error);
    return { error: 'Failed to create onboarding progress' };
  }
}

export async function getOnboardingProgress(userId: string) {
  try {
    const progress = await db
      .select()
      .from(onboardingProgress)
      .where(eq(onboardingProgress.userId, userId))
      .limit(1);

    return progress[0] || null;
  } catch (error) {
    console.error('Error fetching onboarding progress:', error);
    return null;
  }
}

export async function updateOnboardingProgress(userId: string, data: {
  currentStep?: number;
  productDescription?: string;
  categories?: string;
  hasLaunchedBefore?: boolean;
  interests?: string;
  autoCreateSourcingRequest?: boolean;
  getDirectIntroductions?: boolean;
  completed?: boolean;
}) {
  try {
    const updatedProgress = await db
      .update(onboardingProgress)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(onboardingProgress.userId, userId))
      .returning();

    return { progress: updatedProgress[0] };
  } catch (error) {
    console.error('Error updating onboarding progress:', error);
    return { error: 'Failed to update onboarding progress' };
  }
}
