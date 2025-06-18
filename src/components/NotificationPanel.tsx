
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/contexts/NotificationContext";
import { Bell, Check, CheckCheck, X } from "lucide-react";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  if (!isOpen) return null;

  const getNotificationIcon = (type: string) => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case 'success':
        return <Check className={`${iconClass} text-green-600`} />;
      case 'warning':
        return <Bell className={`${iconClass} text-yellow-600`} />;
      case 'error':
        return <X className={`${iconClass} text-red-600`} />;
      default:
        return <Bell className={`${iconClass} text-blue-600`} />;
    }
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 z-50">
      <Card className="dark:bg-gray-800 shadow-lg border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg">Notifications</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={markAllAsRead}>
                <CheckCheck className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 max-h-80 sm:max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-4 text-sm">No notifications</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  notification.read 
                    ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600' 
                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm truncate pr-2">{notification.title}</h4>
                      {!notification.read && (
                        <Badge className="bg-blue-600 text-white text-xs flex-shrink-0">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationPanel;
