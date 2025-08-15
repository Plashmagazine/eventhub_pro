import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ onCategoryChange, activeCategory = 'all' }) => {
  const categories = [
    { id: 'all', name: 'Todos', icon: 'Grid3X3', color: 'text-primary' },
    { id: 'skate', name: 'Skate', icon: 'Zap', color: 'text-accent' },
    { id: 'surf', name: 'Surf', icon: 'Waves', color: 'text-success' },
    { id: 'bmx', name: 'BMX', icon: 'Bike', color: 'text-secondary' },
    { id: 'roller', name: 'Roller', icon: 'Circle', color: 'text-conversion-accent' },
    { id: 'musica', name: 'Música', icon: 'Music', color: 'text-urban-pulse' },
    { id: 'arte', name: 'Arte', icon: 'Palette', color: 'text-error' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <h3 className="font-value-prop text-lg text-foreground mb-4">Categorias</h3>
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-brand font-medium ${
              activeCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-text-secondary hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            <Icon 
              name={category?.icon} 
              size={16} 
              className={activeCategory === category?.id ? '' : category?.color}
            />
            <span>{category?.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;