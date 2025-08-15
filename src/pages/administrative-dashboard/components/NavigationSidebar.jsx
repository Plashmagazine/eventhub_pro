import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const NavigationSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('overview');

  const navigationItems = [
    {
      id: 'overview',
      name: 'Visão Geral',
      icon: 'BarChart3',
      description: 'Métricas principais'
    },
    {
      id: 'events',
      name: 'Gerenciar Eventos',
      icon: 'Calendar',
      description: 'Criar e editar eventos'
    },
    {
      id: 'audience',
      name: 'Insights de Público',
      icon: 'Users',
      description: 'Análise de participantes'
    },
    {
      id: 'marketing',
      name: 'Ferramentas de Marketing',
      icon: 'Megaphone',
      description: 'Promoção e campanhas'
    },
    {
      id: 'financial',
      name: 'Relatórios Financeiros',
      icon: 'DollarSign',
      description: 'Receitas e pagamentos'
    },
    {
      id: 'settings',
      name: 'Configurações',
      icon: 'Settings',
      description: 'Preferências da plataforma'
    }
  ];

  const externalRoutes = [
    { name: 'Ver Site', path: '/homepage', icon: 'ExternalLink' },
    { name: 'Perfil', path: '/user-profile-hub', icon: 'User' },
    { name: 'Centro Ao Vivo', path: '/live-event-center', icon: 'Radio' }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`fixed left-0 top-16 bottom-0 w-80 bg-card border-r border-border z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-xl text-text-primary">Dashboard</h2>
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-muted transition-micro"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            <p className="text-sm text-text-secondary mt-1">Centro de Controle</p>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.id}
                  onClick={() => setActiveSection(item?.id)}
                  className={`w-full flex items-start space-x-3 p-3 rounded-lg transition-brand text-left ${
                    activeSection === item?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} className="mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item?.name}</div>
                    <div className={`text-xs mt-0.5 ${
                      activeSection === item?.id ? 'text-primary-foreground/80' : 'text-text-secondary'
                    }`}>
                      {item?.description}
                    </div>
                  </div>
                </button>
              ))}
            </nav>

            {/* External Links */}
            <div className="mt-8 pt-4 border-t border-border">
              <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">
                Links Rápidos
              </h3>
              <div className="space-y-1">
                {externalRoutes?.map((route) => (
                  <Link
                    key={route?.path}
                    to={route?.path}
                    className="flex items-center space-x-3 p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-muted transition-brand"
                  >
                    <Icon name={route?.icon} size={16} />
                    <span className="text-sm">{route?.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary">Carlos Silva</div>
                <div className="text-xs text-text-secondary">Organizador Pro</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationSidebar;