// Helper untuk get current tenant dari subdomain
export function getTenantFromSubdomain(hostname: string): string | null {
  // Handle localhost and IP addresses
  if (hostname === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return 'localhost';
  }

  // Extract subdomain from smkn9.epkl.id or smkn9.localhost:3000
  const parts = hostname.split('.');

  // If hostname has at least 2 parts (subdomain.domain)
  if (parts.length >= 2) {
    const subdomain = parts[0];
    // Ignore www
    if (subdomain === 'www') {
      return parts.length > 2 ? (parts[1] ?? null) : null;
    }
    return subdomain ?? null;
  }

  return null;
}

// Helper untuk set tenant context di Supabase
// Supabase client type is complex, using unknown for flexibility
export async function setTenantContext(
  supabase: { rpc: (name: string, params: { tenant_id: string }) => Promise<unknown> },
  tenantId: string,
) {
  await supabase.rpc('set_tenant_id', { tenant_id: tenantId });
}

// Helper untuk mendapatkan tenant dari request headers
export function getTenantFromRequest(headers: Headers): string | null {
  return headers.get('x-tenant-id');
}
