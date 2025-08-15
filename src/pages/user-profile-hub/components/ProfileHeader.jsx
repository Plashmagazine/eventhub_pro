import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, stats, onEditProfile }) => {
  return (
    <div className="bg-card rounded-xl shadow-brand-card p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-primary/20"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-card flex items-center justify-center">
              <Icon name="Check" size={12} color="white" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-headline text-2xl lg:text-3xl text-text-primary">
                {user?.name}
              </h1>
              {user?.verified && (
                <Icon name="BadgeCheck" size={20} className="text-primary" />
              )}
            </div>
            <p className="text-text-secondary mb-2">@{user?.username}</p>
            <p className="text-text-secondary text-sm max-w-md">
              {user?.bio}
            </p>
            
            {/* Location & Join Date */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-text-secondary">
              <div className="flex items-center gap-1">
                <Icon name="MapPin" size={14} />
                <span>{user?.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Calendar" size={14} />
                <span>Membro desde {user?.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            iconName="Settings"
            iconPosition="left"
            onClick={onEditProfile}
            className="sm:w-auto"
          >
            Editar Perfil
          </Button>
          <Button
            variant="default"
            iconName="Share"
            iconPosition="left"
            className="bg-conversion-accent hover:bg-conversion-accent/90 sm:w-auto"
          >
            Compartilhar
          </Button>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        {stats?.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl lg:text-3xl font-headline text-primary mb-1">
              {stat?.value}
            </div>
            <div className="text-sm text-text-secondary">
              {stat?.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileHeader;