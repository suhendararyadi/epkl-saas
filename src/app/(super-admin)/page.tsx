import {
  ArrowUpRight,
  Building2,
  CreditCard,
  TrendingUp,
  Users,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { getDashboardStats } from './tenants/actions';

export default async function SuperAdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of all tenants and platform metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Tenants
            </CardTitle>
            <Building2 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTenants}</div>
            <p className="text-xs text-muted-foreground">
              Across all plans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Tenants
            </CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTenants}</div>
            <p className="text-xs text-muted-foreground">
              {stats.inactiveTenants}
              {' '}
              inactive
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Signups
            </CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentSignups}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <CreditCard className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp
              {' '}
              {stats.totalRevenue.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-muted-foreground">
              Estimated (mock)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Plan Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>
              Breakdown of tenants by subscription plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.planDistribution.map((item) => {
                const percentage = Math.round(
                  (item.count / stats.totalTenants) * 100,
                );
                const colors: Record<string, string> = {
                  free: 'bg-secondary',
                  pro: 'bg-primary',
                  enterprise: 'bg-destructive',
                };
                return (
                  <div key={item.plan} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium capitalize">{item.plan}</span>
                      <span className="text-muted-foreground">
                        {item.count}
                        {' '}
                        (
                        {percentage}
                        %)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className={`h-2 rounded-full ${colors[item.plan] || 'bg-primary'}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Plan</CardTitle>
            <CardDescription>
              Estimated revenue breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.revenueByPlan.map((item) => {
                const percentage = stats.totalRevenue > 0
                  ? Math.round((item.revenue / stats.totalRevenue) * 100)
                  : 0;
                return (
                  <div key={item.plan} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium capitalize">{item.plan}</span>
                      <span className="text-muted-foreground">
                        Rp
                        {' '}
                        {item.revenue.toLocaleString('id-ID')}
                        {' '}
                        (
                        {percentage}
                        %)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total Monthly Revenue</span>
                <span className="text-lg font-bold">
                  Rp
                  {' '}
                  {stats.totalRevenue.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
            {' '}

          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks for super admin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Link href="/super-admin/tenants/new">
              <Button>
                <Building2 className="mr-2 size-4" />
                Add New Tenant
              </Button>
            </Link>
            <Link href="/super-admin/tenants">
              <Button variant="outline">
                View All Tenants
                <ArrowUpRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/super-admin/billing">
              <Button variant="outline">
                Billing Overview
                <ArrowUpRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const dynamic = 'force-dynamic';
