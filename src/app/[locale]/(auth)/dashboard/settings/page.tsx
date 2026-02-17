import {
  Bell,
  Mail,
  Settings,
  Shield,
} from 'lucide-react';

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

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">
          Configure global platform settings
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="size-5" />
              Super Admin Configuration
            </CardTitle>
            <CardDescription>
              Manage super admin access and permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Authorized Super Admin Emails</Label>
              <Input
                defaultValue="admin@epkl.id, superadmin@epkl.id"
                placeholder="Enter comma-separated emails"
              />
              <p className="text-xs text-muted-foreground">
                These emails will have full super admin access to the platform
              </p>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="size-5" />
              Email Configuration
            </CardTitle>
            <CardDescription>
              Email settings for notifications and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>SMTP Host</Label>
                <Input placeholder="smtp.example.com" />
              </div>
              <div className="space-y-2">
                <Label>SMTP Port</Label>
                <Input placeholder="587" />
              </div>
              <div className="space-y-2">
                <Label>SMTP Username</Label>
                <Input placeholder="username" />
              </div>
              <div className="space-y-2">
                <Label>SMTP Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
            <Button>Save Configuration</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="size-5" />
              Default Plan Settings
            </CardTitle>
            <CardDescription>
              Default values for new tenant registrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Free Plan Limit</Label>
                <Input type="number" defaultValue="50" />
                <p className="text-xs text-muted-foreground">Max students</p>
              </div>
              <div className="space-y-2">
                <Label>Pro Plan Limit</Label>
                <Input type="number" defaultValue="200" />
                <p className="text-xs text-muted-foreground">Max students</p>
              </div>
              <div className="space-y-2">
                <Label>Enterprise Limit</Label>
                <Input type="number" defaultValue="1000" />
                <p className="text-xs text-muted-foreground">Max students</p>
              </div>
            </div>
            <Button>Update Limits</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="size-5" />
              System Notifications
            </CardTitle>
            <CardDescription>
              Configure notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Email on new tenant registration</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Email on plan upgrade</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Email on high usage alerts</span>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
