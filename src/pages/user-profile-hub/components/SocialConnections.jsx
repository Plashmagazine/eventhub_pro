import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialConnections = ({ following, followers, mutualFriends }) => {
  const [activeTab, setActiveTab] = useState('following');

  const tabs = [
    { id: 'following', label: 'Seguindo', count: following?.length },
    { id: 'followers', label: 'Seguidores', count: followers?.length },
    { id: 'mutual', label: 'Amigos', count: mutualFriends?.length }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'following': return following;
      case 'followers': return followers;
      case 'mutual': return mutualFriends;
      default: return [];
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-brand-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-value-prop text-xl text-text-primary">
          Conexões Sociais
        </h2>
        <Button variant="outline" size="sm" iconName="UserPlus">
          Encontrar Amigos
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`px-4 py-2 rounded-md transition-brand font-medium text-sm flex-1 ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground'
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            {tab?.label} ({tab?.count})
          </button>
        ))}
      </div>
      {/* Connections List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {getCurrentData()?.map((person) => (
          <div key={person?.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-brand">
            <div className="relative">
              <Image
                src={person?.avatar}
                alt={person?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {person?.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-text-primary">
                  {person?.name}
                </h3>
                {person?.verified && (
                  <Icon name="BadgeCheck" size={14} className="text-primary" />
                )}
              </div>
              <p className="text-sm text-text-secondary">
                @{person?.username}
              </p>
              {person?.mutualEvents && (
                <p className="text-xs text-accent">
                  {person?.mutualEvents} eventos em comum
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {activeTab === 'following' && (
                <Button variant="outline" size="xs">
                  Seguindo
                </Button>
              )}
              {activeTab === 'followers' && !person?.isFollowing && (
                <Button variant="default" size="xs">
                  Seguir
                </Button>
              )}
              {activeTab === 'mutual' && (
                <Button variant="ghost" size="xs" iconName="MessageCircle">
                  Chat
                </Button>
              )}
              <Button variant="ghost" size="xs" iconName="MoreHorizontal" />
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" iconName="Users" className="justify-center">
            Ver Todos
          </Button>
          <Button variant="outline" iconName="Share" className="justify-center">
            Convidar Amigos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialConnections;