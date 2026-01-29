/**
 * Notifications Page
 * Display user notifications with filtering
 */

'use client';

import { useState } from 'react';
import { 
  Bell, 
  TrendingUp, 
  Download, 
  AlertCircle, 
  CheckCircle, 
  DollarSign,
  Clock,
  X
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'investment' | 'return' | 'withdrawal' | 'update' | 'new';
  title: string;
  description: string;
  date: string;
  time: string;
  read: boolean;
  icon: any;
}

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'investment',
      title: 'استثمار جديد',
      description: 'تم الاستثمار بمبلغ 75,000 ريال في صندوق الرياض السكني الأول بنجاح',
      date: '٢٨ يناير ٢٠٢٦',
      time: 'منذ ساعتين',
      read: false,
      icon: TrendingUp
    },
    {
      id: '2',
      type: 'return',
      title: 'توزيعات أرباح',
      description: 'تم إضافة مبلغ 1,250 ريال من صندوق متوسط التعمير المتقدمة إلى محفظتك',
      date: '٢٧ يناير ٢٠٢٦',
      time: 'منذ ٥ ساعات',
      read: false,
      icon: DollarSign
    },
    {
      id: '3',
      type: 'withdrawal',
      title: 'إيداع ناجح',
      description: 'تم إيداع مبلغ 5,000 ريال في محفظتك المالية بنجاح',
      date: '٢٦ يناير ٢٠٢٦',
      time: 'منذ يوم واحد',
      read: true,
      icon: Download
    },
    {
      id: '4',
      type: 'update',
      title: 'تحديث الصندوق',
      description: 'صندوق الرياض السكني الأول: تم تحديث تقرير الربع السنوي الأول',
      date: '٢٥ يناير ٢٠٢٦',
      time: 'منذ يومين',
      read: true,
      icon: Bell
    },
    {
      id: '5',
      type: 'new',
      title: 'استثمار جديد',
      description: 'تم الاستثمار بمبلغ 10,000 ريال في صندوق متوسط التعمير المتقدمة',
      date: '٢٤ يناير ٢٠٢٦',
      time: 'منذ ٣ أيام',
      read: true,
      icon: CheckCircle
    },
    {
      id: '6',
      type: 'investment',
      title: 'استثمار جديد',
      description: 'تم الاستثمار بمبلغ 75,000 ريال في صندوق الرياض السكني الأول بنجاح',
      date: '٢٣ يناير ٢٠٢٦',
      time: 'منذ ٤ أيام',
      read: true,
      icon: TrendingUp
    },
    {
      id: '7',
      type: 'return',
      title: 'إيداع ناجح',
      description: 'تم إيداع مبلغ 100,000 ريال في محفظتك المالية بنجاح',
      date: '٢١ يناير ٢٠٢٦',
      time: 'منذ ٦ أيام',
      read: true,
      icon: Download
    },
  ]);

  const filters = [
    { id: 'all', label: 'الكل', icon: Bell },
    { id: 'investment', label: 'استثمارات', icon: TrendingUp },
    { id: 'return', label: 'أرباح', icon: DollarSign },
    { id: 'withdrawal', label: 'تحويلات', icon: Download },
  ];

  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeFilter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationColor = (type: string) => {
    const colors: Record<string, string> = {
      investment: 'text-primary',
      return: 'text-primary',
      withdrawal: 'text-secondary',
      update: 'text-secondary',
      new: 'text-primary',
    };
    return colors[type] || 'text-secondary';
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 pt-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-background-secondary rounded-full border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-text-secondary font-medium">جميع الإشعارات والتحديثات الخاصة بحسابك</span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              الإشعارات
            </h1>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                ● تحديد الكل كمقروء
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? 'bg-primary text-background shadow-glow-gold'
                    : 'bg-background-secondary text-text-secondary hover:text-white border border-primary/20 hover:border-primary/40'
                }`}
              >
                <Icon size={18} />
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-20 animate-fade-in-scale">
              <div className="w-24 h-24 rounded-full bg-background-secondary flex items-center justify-center mx-auto mb-6">
                <Bell size={40} className="text-text-muted" />
              </div>
              <p className="text-text-muted text-lg">لا توجد إشعارات</p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`group relative animate-fade-in-up ${
                    !notification.read ? 'bg-background-secondary' : 'bg-background-card'
                  } rounded-2xl p-6 border ${
                    !notification.read ? 'border-primary/40' : 'border-primary/20'
                  } hover:border-primary/60 transition-all duration-300 cursor-pointer`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => markAsRead(notification.id)}
                >
                  {!notification.read && (
                    <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-primary animate-pulse" />
                  )}

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-xl bg-background-secondary border border-primary/20 ${getNotificationColor(notification.type)}`}>
                      <Icon size={24} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {notification.title}
                      </h3>
                      <p className="text-text-secondary text-sm mb-3 leading-relaxed">
                        {notification.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <Clock size={14} />
                        <span>{notification.time}</span>
                        <span>•</span>
                        <span>{notification.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="flex justify-center mt-12">
            <button className="px-8 py-4 bg-background-secondary border-2 border-primary/40 text-white font-bold rounded-xl hover:border-primary/60 hover:shadow-glow-sm transition-all duration-300">
              تحميل المزيد
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
