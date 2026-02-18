'use server';

import { and, count, desc, eq, like, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { db } from '@/libs/DB';
import {
  activityLogsSchema,
  studentsSchema,
  tenantsSchema,
} from '@/models/Schema';

// Validation schemas
const createTenantSchema = z.object({
  name: z.string().min(3).max(100),
  subdomain: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/),
  plan: z.enum(['free', 'pro', 'enterprise']),
  adminEmail: z.string().email().optional(), // Optional for now
  maxStudents: z.number().min(10).max(10000),
});

// Plan limits
const PLAN_LIMITS: Record<string, number> = {
  free: 50,
  pro: 200,
  enterprise: 1000,
};

// Create new tenant
export async function createTenant(formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      subdomain: formData.get('subdomain') as string,
      plan: formData.get('plan') as 'free' | 'pro' | 'enterprise',
      adminEmail: formData.get('adminEmail') as string,
      maxStudents: Number.parseInt(formData.get('maxStudents') as string, 10),
    };

    // eslint-disable-next-line no-console
    console.log('[createTenant] Input data:', data);

    const parsed = createTenantSchema.safeParse(data);
    if (!parsed.success) {
      console.error('[createTenant] Validation failed:', parsed.error.flatten());
      return { error: 'Invalid data', details: parsed.error.flatten() };
    }

    // eslint-disable-next-line no-console
    console.log('[createTenant] Validation passed');

    // Check if subdomain already exists
    const existing = await db
      .select()
      .from(tenantsSchema)
      .where(eq(tenantsSchema.subdomain, data.subdomain))
      .limit(1);

    // eslint-disable-next-line no-console
    console.log('[createTenant] Existing tenants:', existing);

    if (existing.length > 0) {
      return { error: 'Subdomain already exists' };
    }

    // eslint-disable-next-line no-console
    console.log('[createTenant] Inserting tenant...');

    const [tenant] = await db
      .insert(tenantsSchema)
      .values({
        name: data.name,
        subdomain: data.subdomain,
        plan: data.plan,
        adminEmail: data.adminEmail || `${data.subdomain}@epkl.id`, // Default if not provided
        maxStudents: data.maxStudents,
        status: 'active',
      })
      .returning();

    // eslint-disable-next-line no-console
    console.log('[createTenant] Inserted tenant:', tenant);

    if (!tenant) {
      console.error('[createTenant] No tenant returned from insert');
      return { error: 'Failed to create tenant - no result' };
    }

    // eslint-disable-next-line no-console
    console.log('[createTenant] Inserting activity log...');

    // Log activity
    await db.insert(activityLogsSchema).values({
      tenantId: tenant.id,
      action: 'TENANT_CREATED',
      description: `Tenant ${data.name} created with ${data.plan} plan`,
    });

    // eslint-disable-next-line no-console
    console.log('[createTenant] Activity log inserted');

    revalidatePath('/dashboard/tenants');
    redirect('/dashboard/tenants');
  } catch (error) {
    // Re-throw NEXT_REDIRECT (it's not an error, it's how Next.js handles redirects)
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }

    console.error('[createTenant] Error:', error);
    console.error('[createTenant] Error stack:', error instanceof Error ? error.stack : 'No stack');

    // Return detailed error for debugging
    return {
      error: 'Failed to create tenant',
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    };
  }
}

// Get all tenants with pagination and filters
export async function getTenants({
  page = 1,
  limit = 10,
  search = '',
  plan = '',
  status = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
  plan?: string;
  status?: string;
}) {
  const offset = (page - 1) * limit;

  // Build where conditions
  const conditions = [eq(tenantsSchema.isDeleted, false)];

  if (search) {
    conditions.push(
      like(tenantsSchema.name, `%${search}%`)
      || like(tenantsSchema.subdomain, `%${search}%`),
    );
  }

  if (plan) {
    conditions.push(eq(tenantsSchema.plan, plan as any));
  }

  if (status) {
    conditions.push(eq(tenantsSchema.status, status as any));
  }

  // Get total count
  const [totalResult] = await db
    .select({ count: count() })
    .from(tenantsSchema)
    .where(and(...conditions));

  // Get tenants with student count
  const tenants = await db
    .select({
      id: tenantsSchema.id,
      name: tenantsSchema.name,
      subdomain: tenantsSchema.subdomain,
      plan: tenantsSchema.plan,
      status: tenantsSchema.status,
      adminEmail: tenantsSchema.adminEmail,
      maxStudents: tenantsSchema.maxStudents,
      createdAt: tenantsSchema.createdAt,
      studentCount: sql<number>`(
        SELECT COUNT(*) FROM ${studentsSchema} 
        WHERE ${studentsSchema.tenantId} = ${tenantsSchema.id}
      )`.as('student_count'),
    })
    .from(tenantsSchema)
    .where(and(...conditions))
    .orderBy(desc(tenantsSchema.createdAt))
    .limit(limit)
    .offset(offset);

  return {
    tenants,
    total: totalResult?.count ?? 0,
    page,
    totalPages: Math.ceil((totalResult?.count ?? 0) / limit),
  };
}

// Get single tenant with stats
export async function getTenantById(id: string) {
  const [tenant] = await db
    .select({
      id: tenantsSchema.id,
      name: tenantsSchema.name,
      subdomain: tenantsSchema.subdomain,
      plan: tenantsSchema.plan,
      status: tenantsSchema.status,
      adminEmail: tenantsSchema.adminEmail,
      maxStudents: tenantsSchema.maxStudents,
      stripeCustomerId: tenantsSchema.stripeCustomerId,
      stripeSubscriptionId: tenantsSchema.stripeSubscriptionId,
      createdAt: tenantsSchema.createdAt,
      updatedAt: tenantsSchema.updatedAt,
    })
    .from(tenantsSchema)
    .where(and(eq(tenantsSchema.id, id), eq(tenantsSchema.isDeleted, false)));

  if (!tenant) {
    return null;
  }

  // Get student count
  const [studentCount] = await db
    .select({ count: count() })
    .from(studentsSchema)
    .where(eq(studentsSchema.tenantId, id));

  // Get recent activity
  const activity = await db
    .select()
    .from(activityLogsSchema)
    .where(eq(activityLogsSchema.tenantId, id))
    .orderBy(desc(activityLogsSchema.createdAt))
    .limit(10);

  return {
    ...tenant,
    studentCount: studentCount?.count ?? 0,
    activity,
  };
}

// Update tenant
export async function updateTenant(formData: FormData) {
  const id = formData.get('id') as string;
  const data: Record<string, any> = {};

  const name = formData.get('name') as string;
  if (name) {
    data.name = name;
  }

  const plan = formData.get('plan') as string;
  if (plan) {
    data.plan = plan;
  }

  const status = formData.get('status') as string;
  if (status) {
    data.status = status;
  }

  const maxStudents = formData.get('maxStudents');
  if (maxStudents) {
    data.maxStudents = Number.parseInt(maxStudents as string, 10);
  }

  try {
    await db
      .update(tenantsSchema)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(tenantsSchema.id, id));

    // Log activity
    await db.insert(activityLogsSchema).values({
      tenantId: id,
      action: 'TENANT_UPDATED',
      description: `Tenant updated: ${Object.keys(data).join(', ')}`,
    });

    revalidatePath(`/dashboard/tenants/${id}`);
    revalidatePath('/dashboard/tenants');

    return { success: true };
  } catch (error) {
    console.error('Error updating tenant:', error);
    return { error: 'Failed to update tenant' };
  }
}

// Soft delete tenant
export async function deleteTenant(id: string) {
  try {
    await db
      .update(tenantsSchema)
      .set({
        isDeleted: true,
        deletedAt: new Date(),
        status: 'inactive',
      })
      .where(eq(tenantsSchema.id, id));

    await db.insert(activityLogsSchema).values({
      tenantId: id,
      action: 'TENANT_DELETED',
      description: 'Tenant soft deleted',
    });

    revalidatePath('/dashboard/tenants');
    return { success: true };
  } catch (error) {
    console.error('Error deleting tenant:', error);
    return { error: 'Failed to delete tenant' };
  }
}

// Get dashboard statistics
export async function getDashboardStats() {
  // Total tenants
  const [totalTenants] = await db
    .select({ count: count() })
    .from(tenantsSchema)
    .where(eq(tenantsSchema.isDeleted, false));

  // Active tenants
  const [activeTenants] = await db
    .select({ count: count() })
    .from(tenantsSchema)
    .where(and(
      eq(tenantsSchema.isDeleted, false),
      eq(tenantsSchema.status, 'active'),
    ));

  // Tenants by plan
  const planDistribution = await db
    .select({
      plan: tenantsSchema.plan,
      count: count(),
    })
    .from(tenantsSchema)
    .where(eq(tenantsSchema.isDeleted, false))
    .groupBy(tenantsSchema.plan);

  // Recent signups (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentSignups = await db
    .select({
      createdAt: tenantsSchema.createdAt,
    })
    .from(tenantsSchema)
    .where(and(
      eq(tenantsSchema.isDeleted, false),
      sql`${tenantsSchema.createdAt} >= ${thirtyDaysAgo}`,
    ));

  // Mock revenue calculation (for UI display)
  const revenueByPlan = planDistribution.map(p => ({
    plan: p.plan,
    count: p.count,
    revenue: p.count * (p.plan === 'free' ? 0 : p.plan === 'pro' ? 49 : 199),
  }));

  const totalRevenue = revenueByPlan.reduce((sum, p) => sum + p.revenue, 0);

  return {
    totalTenants: totalTenants?.count ?? 0,
    activeTenants: activeTenants?.count ?? 0,
    inactiveTenants: (totalTenants?.count ?? 0) - (activeTenants?.count ?? 0),
    planDistribution,
    recentSignups: recentSignups.length,
    revenueByPlan,
    totalRevenue,
  };
}

// Get plan limits helper
export async function getPlanLimit(plan: string): Promise<number> {
  return PLAN_LIMITS[plan] || 50;
}
