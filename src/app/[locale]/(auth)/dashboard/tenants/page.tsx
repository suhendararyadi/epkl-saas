import {
  Building2,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { getTenants } from './actions';
import { TenantDeleteButton } from './TenantDeleteButton';

// Types
type TenantsPageProps = {
  searchParams: {
    page?: string;
    search?: string;
    plan?: string;
    status?: string;
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

// Tenants table component
async function TenantsTable({ searchParams }: TenantsPageProps) {
  const page = Number.parseInt(searchParams.page || '1', 10);
  const { tenants, total, totalPages } = await getTenants({
    page,
    limit: 10,
    search: searchParams.search || '',
    plan: searchParams.plan || '',
    status: searchParams.status || '',
  });

  if (tenants.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed">
        <Building2 className="size-12 text-muted-foreground" />
        <p className="mt-4 text-lg font-medium">No tenants found</p>
        <p className="text-muted-foreground">Create your first tenant to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>School Name</TableHead>
              <TableHead>Subdomain</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.map(tenant => (
              <TableRow key={tenant.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/dashboard/tenants/${tenant.id}`}
                    className="hover:underline"
                  >
                    {tenant.name}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {tenant.subdomain}
                  .epkl.id
                </TableCell>
                <TableCell>
                  <PlanBadge plan={tenant.plan} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={tenant.status} />
                </TableCell>
                <TableCell>
                  {tenant.studentCount}
                  {' '}
                  /
                  {tenant.maxStudents}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(tenant.createdAt).toLocaleDateString('id-ID')}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/tenants/${tenant.id}`}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`https://${tenant.subdomain}.epkl.id`} target="_blank">
                          Visit Site
                        </Link>
                      </DropdownMenuItem>
                      <TenantDeleteButton tenantId={tenant.id} tenantName={tenant.name} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing
            {' '}
            {tenants.length}
            {' '}
            of
            {' '}
            {total}
            {' '}
            tenants
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={`?page=${page - 1}`}>
                <Button variant="outline" size="sm">
                  Previous
                </Button>
              </Link>
            )}
            {page < totalPages && (
              <Link href={`?page=${page + 1}`}>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Main page component
export default function TenantsPage({ searchParams }: TenantsPageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tenants</h1>
          <p className="text-muted-foreground">
            Manage all schools and organizations
          </p>
        </div>
        <Link href="/dashboard/tenants/new">
          <Button>
            <Plus className="mr-2 size-4" />
            Add Tenant
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <form className="flex flex-1 items-center gap-2" action="/dashboard/tenants">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="search"
              placeholder="Search by name or subdomain..."
              className="pl-9"
              defaultValue={searchParams.search || ''}
            />
          </div>
          <select
            name="plan"
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            defaultValue={searchParams.plan || ''}
          >
            <option value="">All Plans</option>
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
          <select
            name="status"
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            defaultValue={searchParams.status || ''}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          <Button type="submit" variant="outline" size="icon">
            <Filter className="size-4" />
          </Button>
        </form>
      </div>

      {/* Table */}
      <Suspense
        fallback={
          <div className="h-64 animate-pulse rounded-md border bg-muted/50" />
        }
      >
        <TenantsTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export const dynamic = 'force-dynamic';
