import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'success' | 'danger';
  date: string;
  read: boolean;
}

export const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { profile } = useAuth();

  useEffect(() => {
    fetchNotifications();
  }, [profile]);

  const fetchNotifications = async () => {
    if (!profile) return;

    // Generate relevant notifications based on user role and data
    const mockNotifications: Notification[] = [];

    if (profile.role === 'farmer') {
      // Fetch farmer-specific notifications
      const { data: entries } = await supabase
        .from('FARMER DASHBOARD')
        .select('*')
        .order('EntryID', { ascending: false })
        .limit(5);

      if (entries) {
        entries.forEach((entry, idx) => {
          if (entry.VetApproved === 'Yes' && entry.WithdrawalStatus === 'In Withdrawal') {
            mockNotifications.push({
              id: `withdrawal-${entry.EntryID}`,
              title: 'Withdrawal Period Active',
              message: `Animal ${entry.AnimalID} has ${Math.max(1, 7 - idx)} days remaining in withdrawal period for ${entry.Medicine}`,
              type: 'warning',
              date: new Date(Date.now() - idx * 24 * 60 * 60 * 1000).toLocaleDateString(),
              read: false
            });
          }
          if (entry.VetApproved === 'Rejected') {
            mockNotifications.push({
              id: `rejected-${entry.EntryID}`,
              title: 'Entry Rejected',
              message: `Your treatment entry for ${entry.AnimalType} (${entry.AnimalID}) was rejected by veterinarian`,
              type: 'danger',
              date: entry.Date,
              read: false
            });
          }
          if (entry.VetApproved === 'Yes' && entry.WithdrawalStatus === 'Cleared') {
            mockNotifications.push({
              id: `cleared-${entry.EntryID}`,
              title: 'Withdrawal Period Complete',
              message: `Animal ${entry.AnimalID} is now cleared for production after ${entry.Medicine} treatment`,
              type: 'success',
              date: entry.Date,
              read: Math.random() > 0.5
            });
          }
        });
      }
    } else if (profile.role === 'veterinarian') {
      // Fetch vet-specific notifications
      const { data: pendingEntries } = await supabase
        .from('FARMER DASHBOARD')
        .select('*')
        .eq('VetApproved', 'No')
        .limit(3);

      if (pendingEntries && pendingEntries.length > 0) {
        mockNotifications.push({
          id: 'pending-reviews',
          title: 'Pending Reviews',
          message: `You have ${pendingEntries.length} farmer entries awaiting your approval`,
          type: 'info',
          date: new Date().toLocaleDateString(),
          read: false
        });
      }

      mockNotifications.push({
        id: 'compliance-alert',
        title: 'Compliance Alert',
        message: 'High usage of Oxytetracycline detected in Erode district farms',
        type: 'warning',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        read: false
      });
    } else if (profile.role === 'government') {
      // Fetch government-specific notifications
      const { data: entries } = await supabase
        .from('FARMER DASHBOARD')
        .select('*')
        .limit(10);

      if (entries) {
        const nonCompliant = entries.filter(e => e.WithdrawalStatus === 'Non-Compliant').length;
        if (nonCompliant > 0) {
          mockNotifications.push({
            id: 'non-compliant',
            title: 'Non-Compliance Alert',
            message: `${nonCompliant} farms have non-compliant antimicrobial usage`,
            type: 'danger',
            date: new Date().toLocaleDateString(),
            read: false
          });
        }

        mockNotifications.push({
          id: 'monthly-report',
          title: 'Monthly Report Available',
          message: 'September 2025 compliance report is ready for download',
          type: 'info',
          date: new Date().toLocaleDateString(),
          read: false
        });
      }
    }

    // Add some common notifications
    mockNotifications.push({
      id: 'system-update',
      title: 'System Update',
      message: 'Kalnadai Portal has been updated with new features',
      type: 'info',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      read: true
    });

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'danger': return '🚨';
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getNotificationBadgeVariant = (type: string) => {
    switch (type) {
      case 'warning': return 'outline' as const;
      case 'danger': return 'destructive' as const;
      case 'success': return 'secondary' as const;
      case 'info': return 'default' as const;
      default: return 'default' as const;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-danger rounded-full text-xs text-white flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">Notifications</h4>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto space-y-2">
            {notifications.length === 0 ? (
              <p className="text-muted-foreground text-sm p-4 text-center">
                No notifications
              </p>
            ) : (
              notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-colors ${!notification.read ? 'bg-muted/50' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-sm truncate">{notification.title}</h5>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{notification.date}</span>
                          <Badge variant={getNotificationBadgeVariant(notification.type)} className="text-xs">
                            {notification.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          {notifications.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center">
                View All Notifications
              </DropdownMenuItem>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};