import React from 'react';
import Icon from '../../../components/AppIcon';

const CultureTracker = ({ cultureData }) => {
  const totalEvents = cultureData?.reduce((sum, culture) => sum + culture?.events, 0);

  return (
    <div className="bg-card rounded-xl shadow-brand-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-value-prop text-xl text-text-primary">
          Minha Cultura
        </h2>
        <div className="text-sm text-text-secondary">
          {totalEvents} eventos totais
        </div>
      </div>
      <div className="space-y-4">
        {cultureData?.map((culture) => {
          const percentage = totalEvents > 0 ? (culture?.events / totalEvents) * 100 : 0;
          
          return (
            <div key={culture?.id} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${culture?.bgColor}`}>
                    <Icon name={culture?.icon} size={20} color="white" />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">
                      {culture?.name}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {culture?.events} eventos • Nível {culture?.level}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-text-primary">
                    {percentage?.toFixed(0)}%
                  </div>
                  <div className="text-xs text-text-secondary">
                    {culture?.nextLevelEvents} para próximo nível
                  </div>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${culture?.progressColor}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              {/* Level Progress */}
              <div className="w-full bg-muted rounded-full h-1">
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${culture?.levelColor}`}
                  style={{ width: `${culture?.levelProgress}%` }}
                />
              </div>
              {/* Recent Activity */}
              {culture?.recentEvent && (
                <div className="mt-3 p-3 bg-muted/50 rounded-lg opacity-0 group-hover:opacity-100 transition-brand">
                  <div className="text-sm text-text-primary font-medium mb-1">
                    Último evento: {culture?.recentEvent?.name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {culture?.recentEvent?.date} • {culture?.recentEvent?.rating} ⭐
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Recommendations */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="font-medium text-text-primary mb-3">
          Recomendações para Você
        </h3>
        <div className="space-y-2">
          {cultureData?.filter(culture => culture?.nextLevelEvents <= 2)?.slice(0, 2)?.map((culture) => (
              <div key={`rec-${culture?.id}`} className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                <Icon name="Target" size={16} className="text-accent" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">
                    Explore mais {culture?.name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    Apenas {culture?.nextLevelEvents} eventos para o próximo nível
                  </div>
                </div>
                <Icon name="ArrowRight" size={14} className="text-accent" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CultureTracker;