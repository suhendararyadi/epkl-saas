'use client';

import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { createTenant } from '../actions';

const PLAN_LIMITS: Record<string, number> = {
  free: 50,
  pro: 200,
  enterprise: 1000,
};

export default function NewTenantPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subdomain, setSubdomain] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [maxStudents, setMaxStudents] = useState(50);
  const [error, setError] = useState('');
  const [errorDetails, setErrorDetails] = useState<any>(null);

  const handlePlanChange = useCallback((plan: string) => {
    setSelectedPlan(plan);
    setMaxStudents(PLAN_LIMITS[plan] || 50);
  }, []);

  const validateSubdomain = (value: string): string => {
    return value.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 50);
  };

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validated = validateSubdomain(e.target.value);
    setSubdomain(validated);
  };

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError('');
    setErrorDetails(null);

    const result = await createTenant(formData);

    if (result?.error) {
      setError(result.error);
      setErrorDetails(result.details || result.stack || null);
      setIsSubmitting(false);
    }
    // Redirect happens on success
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/tenants">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="size-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create New Tenant</h1>
          <p className="text-muted-foreground">
            Add a new school or organization to the platform
          </p>
        </div>
      </div>

      {error && (
        <div className="space-y-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <p className="font-medium text-destructive">{error}</p>
          {errorDetails && (
            <pre className="overflow-auto text-xs text-destructive/80">
              {JSON.stringify(errorDetails, null, 2)}
            </pre>
          )}
        </div>
      )}

      <form action={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Main Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>School Information</CardTitle>
              <CardDescription>
                Basic details about the school
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">School Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., SMK Negeri 9 Jakarta"
                  required
                  minLength={3}
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subdomain">Subdomain *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="subdomain"
                    name="subdomain"
                    placeholder="smkn9"
                    value={subdomain}
                    onChange={handleSubdomainChange}
                    required
                    minLength={3}
                    maxLength={50}
                    pattern="[a-z0-9\-]+"
                    title="Only lowercase letters, numbers, and hyphens allowed"
                  />
                  <span className="whitespace-nowrap text-muted-foreground">
                    .epkl.id
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  This will be the URL for accessing the school&apos;s dashboard
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email (Optional)</Label>
                <Input
                  id="adminEmail"
                  name="adminEmail"
                  type="email"
                  placeholder="admin@school.ac.id"
                />
                <p className="text-xs text-muted-foreground">
                  Contact email for the school administrator
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Plan Card */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Choose a plan for this tenant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Plan *</Label>
                <div className="grid gap-3">
                  {[
                    { value: 'free', label: 'Free', description: '50 students', price: 'Free' },
                    { value: 'pro', label: 'Pro', description: '200 students', price: 'Rp 49K/month' },
                    { value: 'enterprise', label: 'Enterprise', description: '1000 students', price: 'Rp 199K/month' },
                  ].map(plan => (
                    <label
                      key={plan.value}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent ${
                        selectedPlan === plan.value ? 'border-primary bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="plan"
                          value={plan.value}
                          checked={selectedPlan === plan.value}
                          onChange={() => handlePlanChange(plan.value)}
                          className="size-4"
                        />
                        <div>
                          <p className="font-medium">{plan.label}</p>
                          <p className="text-sm text-muted-foreground">{plan.description}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">{plan.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxStudents">Max Students *</Label>
                <Input
                  id="maxStudents"
                  name="maxStudents"
                  type="number"
                  min={10}
                  max={10000}
                  value={maxStudents}
                  onChange={e => setMaxStudents(Number.parseInt(e.target.value, 10))}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Automatically set based on plan. Can be customized for special cases.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link href="/dashboard/tenants">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Creating...
                  </>
                )
              : (
                  'Create Tenant'
                )}
          </Button>
        </div>
      </form>
    </div>
  );
}
