import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, placeholder = "Buscar eventos, categorias, locais..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSearch(searchTerm);
  };

  const popularSearches = [
    'Skate São Paulo',
    'Surf Guarujá',
    'BMX Rio',
    'Música Urbana',
    'Arte de Rua',
    'Roller Derby'
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Input
            type="search"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => handleSearch(e?.target?.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
            className="w-full pl-12 pr-4 py-3 text-lg bg-background border-2 border-border focus:border-primary rounded-xl"
          />
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
          />
        </div>

        {/* Search Suggestions */}
        {isExpanded && searchTerm?.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-brand-modal z-50">
            <div className="p-4">
              <h4 className="font-medium text-foreground mb-3">Buscas Populares</h4>
              <div className="space-y-2">
                {popularSearches?.map((search, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSearch(search)}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-left hover:bg-muted rounded-lg transition-brand"
                  >
                    <Icon name="TrendingUp" size={16} className="text-text-secondary" />
                    <span className="text-text-secondary">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results Preview */}
        {isExpanded && searchTerm?.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-brand-modal z-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">Resultados para "{searchTerm}"</h4>
                <span className="text-sm text-text-secondary">3 encontrados</span>
              </div>
              
              <div className="space-y-2">
                <button
                  type="button"
                  className="flex items-center space-x-3 w-full px-3 py-2 text-left hover:bg-muted rounded-lg transition-brand"
                >
                  <Icon name="Calendar" size={16} className="text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Campeonato Nacional de Skate</p>
                    <p className="text-sm text-text-secondary">São Paulo • 15 de Setembro</p>
                  </div>
                </button>
                
                <button
                  type="button"
                  className="flex items-center space-x-3 w-full px-3 py-2 text-left hover:bg-muted rounded-lg transition-brand"
                >
                  <Icon name="MapPin" size={16} className="text-success" />
                  <div>
                    <p className="font-medium text-foreground">Eventos em São Paulo</p>
                    <p className="text-sm text-text-secondary">47 eventos encontrados</p>
                  </div>
                </button>
                
                <button
                  type="button"
                  className="flex items-center space-x-3 w-full px-3 py-2 text-left hover:bg-muted rounded-lg transition-brand"
                >
                  <Icon name="Grid3X3" size={16} className="text-accent" />
                  <div>
                    <p className="font-medium text-foreground">Categoria: Skate</p>
                    <p className="text-sm text-text-secondary">Ver todos os eventos de skate</p>
                  </div>
                </button>
              </div>
              
              <div className="mt-4 pt-3 border-t border-border">
                <button
                  type="submit"
                  className="w-full text-center text-primary hover:text-primary/80 font-medium transition-brand"
                >
                  Ver todos os resultados
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;