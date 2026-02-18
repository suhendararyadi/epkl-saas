import {
  Activity,
  ArrowLeft,
  Building2,
  Calendar,
  Globe,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { getTenantById } from '../actions';
import { TenantDeleteButton } from '../TenantDeleteButton';

type TenantDetailPageProps = {
  params: {
    id: string;
  };
};

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
    active: 'default',
    inactive: 'secondary',
    suspended: 'destructive',
  };

  return (
    <Badge variant={variants[status] || 'secondary'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

// Plan badge component
function PlanBadge({ plan }: { plan: string }) {
  const variants: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
    free: 'secondary',
    pro: 'default',
    enterprise: 'destructive',
  };

  return (
    <Badge variant={variants[plan] || 'outline'}>
      {plan.charAt(0).toUpperCase() + plan.slice(1)}
    </Badge>
  );
}

export default async function TenantDetailPage({ params }: TenantDetailPageProps) {
  const tenantId = params.id;

  if (!tenantId) {
    notFound();
  }

  const tenant = await getTenantById(tenantId);

  if (!tenant) {
    notFound();
  }

  const usagePercentage = Math.min(
    Math.round((tenant.studentCount / tenant.maxStudents) * 100),
    100,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/tenants">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{tenant.name}</h1>
              <StatusBadge status={tenant.status} />
            </div>
            <p className="text-muted-foreground">
              {tenant.subdomain}
              .epkl.id
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`https://${tenant.subdomain}.epkl.id`} target="_blank">
            <Button variant="outline">
              <Globe className="mr-2 size-4" />
              Visit Site
            </Button>
          </Link>
          <TenantDeleteButton tenantId={tenant.id} tenantName={tenant.name} />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <Users className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tenant.studentCount}</div>
                <p className="text-xs text-muted-foreground">
                  of
                  {' '}
                  {tenant.maxStudents}
                  {' '}
                  limit
                </p>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full ${
                      usagePercentage > 90 ? 'bg-destructive' : 'bg-primary'
                    }`}
                    style={{ width: `${usagePercentage}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscription Plan
                </CardTitle>
                <Building2 className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <PlanBadge plan={tenant.plan} />
                </div>
                <p className="text-xs text-muted-foreground">
                  {tenant.plan === 'free' ? 'Free forever' : 'Paid subscription'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Created At
                </CardTitle>
                <Calendar className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Date(tenant.createdAt).toLocaleDateString('id-ID')}
                </div>
                <p className="text-xs text-muted-foreground">
                  Last updated
                  {' '}
                  {new Date(tenant.updatedAt).toLocaleDateString('id-ID')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tenant Info */}
          <Card>
            <CardHeader>
              <CardTitle>Tenant Information</CardTitle>
              <CardDescription>
                Detailed information about this tenant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">School Name</p>
                  <p>{tenant.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Subdomain</p>
                  <p>
                    {tenant.subdomain}
                    .epkl.id
                  </p>
                </div>
                {/* <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Admin Email</p>
                  <p>{tenant.adminEmail}</p>
                </div> */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <p><StatusBadge status={tenant.status} /></p>
                </div>
                {tenant.stripeCustomerId && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Stripe Customer</p>
                    <p className="font-mono text-xs">{tenant.stripeCustomerId}</p>
                  </div>
                )}
                {tenant.stripeSubscriptionId && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Stripe Subscription</p>
                    <p className="font-mono text-xs">{tenant.stripeSubscriptionId}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Edit Tenant</CardTitle>
              <CardDescription>
                Update tenant information and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action="/dashboard/tenants/actions" method="POST" className="space-y-4">
                <input type="hidden" name="id" value={tenant.id} />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">School Name</label>
                    <input
                      id="name"
                      name="name"
                      defaultValue={tenant.name}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="plan" className="text-sm font-medium">Plan</label>
                    <select
                      id="plan"
                      name="plan"
                      defaultValue={tenant.plan}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="free">Free</option>
                      <option value="pro">Pro</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                    <select
                      id="status"
                      name="status"
                      defaultValue={tenant.status}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="maxStudents" className="text-sm font-medium">Max Students</label>
                    <input
                      id="maxStudents"
                      name="maxStudents"
                      type="number"
                      defaultValue={tenant.maxStudents}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <Button type="submit" className="mt-4">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Recent actions and events for this tenant
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tenant.activity && tenant.activity.length > 0
                ? (
                    <div className="space-y-4">
                      {tenant.activity.map(log => (
                        <div key={log.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Activity className="size-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{log.action}</p>
                            {log.description && (
                              <p className="text-sm text-muted-foreground">{log.description}</p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              {new Date(log.createdAt).toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                : (
                    <div className="flex h-32 flex-col items-center justify-center text-muted-foreground">
                      <Activity className="mb-2 size-8" />
                      <p>No activity yet</p>
                    </div>
                  )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export const dynamic = 'force-dynamic';
