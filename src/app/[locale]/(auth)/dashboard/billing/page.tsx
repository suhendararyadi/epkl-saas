import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { getDashboardStats } from '../tenants/actions';

export default async function BillingPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscriptions</h1>
        <p className="text-muted-foreground">
          Overview of revenue and subscription metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp
              {' '}
              {stats.totalRevenue.toLocaleString('id-ID')}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Paid Tenants</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalTenants - (stats.planDistribution.find(p => p.plan === 'free')?.count || 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Free Tenants</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.planDistribution.find(p => p.plan === 'free')?.count || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Revenue</CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp
              {' '}
              {stats.totalTenants > 0
                ? Math.round(stats.totalRevenue / stats.totalTenants).toLocaleString('id-ID')
                : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue by Plan</CardTitle>
          <CardDescription>
            Monthly recurring revenue breakdown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.revenueByPlan.map(item => (
              <div key={item.plan} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <CreditCard className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium capitalize">
                      {item.plan}
                      {' '}
                      Plan
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.count}
                      {' '}
                      tenants
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    Rp
                    {item.revenue.toLocaleString('id-ID')}
                  </p>
                  <p className="text-sm text-muted-foreground">/month</p>
                </div>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="font-bold">Total Monthly Revenue</span>
                <span className="text-lg font-bold">
                  Rp
                  {' '}
                  {stats.totalRevenue.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-dashed p-8 text-center">
        <CreditCard className="mx-auto size-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Stripe Integration Coming Soon</h3>
        <p className="mt-2 text-muted-foreground">
          Full payment processing and subscription management will be available in the next update.
        </p>
        <Button className="mt-4" variant="outline" disabled>
          Connect Stripe
        </Button>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
