import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, buttonText, onClick, color = 'primary' }) => {
  const getIconBgColor = () => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success';
      case 'warning':
        return 'bg-warning/10 text-warning';
      case 'error':
        return 'bg-error/10 text-error';
      case 'secondary':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-card hover-lift">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getIconBgColor()}`}>
        <Icon name={icon} size={24} />
      </div>
      <h3 className="font-value-prop text-lg text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary text-sm mb-4">{description}</p>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onClick}
        className="w-full"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default QuickActionCard;