import React from 'react';
import Icon from '../../../components/AppIcon';

const BadgeSystem = ({ badges, achievements }) => {
  return (
    <div className="bg-card rounded-xl shadow-brand-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-value-prop text-xl text-text-primary">
          Conquistas & Badges
        </h2>
        <div className="text-sm text-text-secondary">
          {badges?.filter(b => b?.earned)?.length} de {badges?.length}
        </div>
      </div>
      {/* Badge Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        {badges?.map((badge) => (
          <div
            key={badge?.id}
            className={`relative group cursor-pointer transition-brand ${
              badge?.earned ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              badge?.earned 
                ? `bg-gradient-to-br ${badge?.gradient}` 
                : 'bg-muted border-2 border-dashed border-border'
            }`}>
              <Icon 
                name={badge?.icon} 
                size={24} 
                color={badge?.earned ? 'white' : 'var(--color-text-secondary)'} 
              />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-brand-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-brand z-10 whitespace-nowrap">
              <div className="font-medium text-sm text-text-primary">
                {badge?.name}
              </div>
              <div className="text-xs text-text-secondary">
                {badge?.description}
              </div>
              {!badge?.earned && (
                <div className="text-xs text-accent mt-1">
                  {badge?.requirement}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Recent Achievements */}
      <div>
        <h3 className="font-medium text-text-primary mb-3">
          Conquistas Recentes
        </h3>
        <div className="space-y-3">
          {achievements?.map((achievement) => (
            <div key={achievement?.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${achievement?.gradient}`}>
                <Icon name={achievement?.icon} size={16} color="white" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-text-primary text-sm">
                  {achievement?.title}
                </div>
                <div className="text-xs text-text-secondary">
                  {achievement?.description}
                </div>
              </div>
              <div className="text-xs text-text-secondary">
                {achievement?.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgeSystem;