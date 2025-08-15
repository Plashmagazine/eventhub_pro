import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const InteractiveFilters = ({ category, onFiltersChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    date: '',
    skillLevel: '',
    eventType: '',
    priceRange: ''
  });

  const locationOptions = [
    { value: '', label: 'Todas as Cidades' },
    { value: 'sao-paulo', label: 'São Paulo' },
    { value: 'rio-de-janeiro', label: 'Rio de Janeiro' },
    { value: 'belo-horizonte', label: 'Belo Horizonte' },
    { value: 'salvador', label: 'Salvador' },
    { value: 'brasilia', label: 'Brasília' }
  ];

  const dateOptions = [
    { value: '', label: 'Qualquer Data' },
    { value: 'today', label: 'Hoje' },
    { value: 'tomorrow', label: 'Amanhã' },
    { value: 'this-week', label: 'Esta Semana' },
    { value: 'this-month', label: 'Este Mês' },
    { value: 'next-month', label: 'Próximo Mês' }
  ];

  const skillLevelOptions = [
    { value: '', label: 'Todos os Níveis' },
    { value: 'beginner', label: 'Iniciante' },
    { value: 'intermediate', label: 'Intermediário' },
    { value: 'advanced', label: 'Avançado' },
    { value: 'professional', label: 'Profissional' }
  ];

  const eventTypeOptions = category?.eventTypes?.map(type => ({
    value: type?.value,
    label: type?.label
  }));

  const priceRangeOptions = [
    { value: '', label: 'Qualquer Preço' },
    { value: 'free', label: 'Gratuito' },
    { value: '0-50', label: 'R$ 0 - R$ 50' },
    { value: '50-100', label: 'R$ 50 - R$ 100' },
    { value: '100-200', label: 'R$ 100 - R$ 200' },
    { value: '200+', label: 'R$ 200+' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      location: '',
      date: '',
      skillLevel: '',
      eventType: '',
      priceRange: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const activeFilterCount = Object.values(filters)?.filter(value => value !== '')?.length;

  return (
    <div className="bg-card border-b border-border sticky top-16 z-40 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full justify-between"
          >
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={18} />
              <span>Filtros</span>
              {activeFilterCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <Icon name={isFilterOpen ? "ChevronUp" : "ChevronDown"} size={18} />
          </Button>
        </div>

        {/* Filter Controls */}
        <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <Select
              placeholder="Localização"
              options={locationOptions}
              value={filters?.location}
              onChange={(value) => handleFilterChange('location', value)}
              className="w-full"
            />

            <Select
              placeholder="Data"
              options={dateOptions}
              value={filters?.date}
              onChange={(value) => handleFilterChange('date', value)}
              className="w-full"
            />

            <Select
              placeholder="Nível"
              options={skillLevelOptions}
              value={filters?.skillLevel}
              onChange={(value) => handleFilterChange('skillLevel', value)}
              className="w-full"
            />

            <Select
              placeholder="Tipo de Evento"
              options={eventTypeOptions}
              value={filters?.eventType}
              onChange={(value) => handleFilterChange('eventType', value)}
              className="w-full"
            />

            <Select
              placeholder="Preço"
              options={priceRangeOptions}
              value={filters?.priceRange}
              onChange={(value) => handleFilterChange('priceRange', value)}
              className="w-full"
            />
          </div>

          {/* Active Filters & Clear */}
          {activeFilterCount > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Filter" size={16} />
                <span>{activeFilterCount} filtro{activeFilterCount > 1 ? 's' : ''} ativo{activeFilterCount > 1 ? 's' : ''}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-primary hover:text-primary/80"
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>

        {/* Quick Filters */}
        <div className="hidden lg:flex items-center space-x-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-text-secondary font-medium">Filtros Rápidos:</span>
          <div className="flex items-center space-x-2">
            {category?.quickFilters?.map((filter) => (
              <button
                key={filter?.value}
                onClick={() => handleFilterChange('eventType', filter?.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-brand ${
                  filters?.eventType === filter?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {filter?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveFilters;