import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'event_created':
        return 'Plus';
      case 'registration':
        return 'UserPlus';
      case 'payment':
        return 'CreditCard';
      case 'review':
        return 'Star';
      case 'message':
        return 'MessageCircle';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'event_created':
        return 'text-success';
      case 'registration':
        return 'text-primary';
      case 'payment':
        return 'text-warning';
      case 'review':
        return 'text-secondary';
      case 'message':
        return 'text-accent';
      default:
        return 'text-text-secondary';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora mesmo';
    if (diffInMinutes < 60) return `${diffInMinutes}min atrás`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
    return `${Math.floor(diffInMinutes / 1440)}d atrás`;
  };

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-muted rounded-lg transition-micro">
      <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}>
        <Icon name={getActivityIcon(activity?.type)} size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-primary">{activity?.description}</p>
        <p className="text-xs text-text-secondary mt-1">{formatTime(activity?.timestamp)}</p>
      </div>
    </div>
  );
};

export default RecentActivityItem;