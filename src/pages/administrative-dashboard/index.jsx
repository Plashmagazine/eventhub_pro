import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import QuickActionCard from './components/QuickActionCard';
import RecentActivityItem from './components/RecentActivityItem';
import EventStatusCard from './components/EventStatusCard';
import AnalyticsChart from './components/AnalyticsChart';
import NavigationSidebar from './components/NavigationSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdministrativeDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock data for metrics
  const metricsData = [
    {
      title: 'Total de Eventos',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: 'Calendar',
      color: 'primary'
    },
    {
      title: 'Participantes Totais',
      value: '1.847',
      change: '+23%',
      changeType: 'positive',
      icon: 'Users',
      color: 'success'
    },
    {
      title: 'Receita Total',
      value: 'R$ 45.230',
      change: '+8%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'warning'
    },
    {
      title: 'Taxa de Engajamento',
      value: '87%',
      change: '+5%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'secondary'
    }
  ];

  // Mock data for quick actions
  const quickActions = [
    {
      title: 'Criar Novo Evento',
      description: 'Configure um evento do zero com nossos templates',
      icon: 'Plus',
      buttonText: 'Começar',
      color: 'primary',
      onClick: () => console.log('Create event')
    },
    {
      title: 'Importar Participantes',
      description: 'Adicione participantes em lote via CSV',
      icon: 'Upload',
      buttonText: 'Importar',
      color: 'success',
      onClick: () => console.log('Import attendees')
    },
    {
      title: 'Relatório de Performance',
      description: 'Gere relatórios detalhados dos seus eventos',
      icon: 'FileText',
      buttonText: 'Gerar',
      color: 'warning',
      onClick: () => console.log('Generate report')
    },
    {
      title: 'Configurar Integração',
      description: 'Conecte com redes sociais e ferramentas',
      icon: 'Settings',
      buttonText: 'Configurar',
      color: 'secondary',
      onClick: () => console.log('Setup integration')
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'registration',
      description: 'Nova inscrição para "Festival de Skate SP 2024"',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      type: 'payment',
      description: 'Pagamento confirmado - R$ 150,00',
      timestamp: new Date(Date.now() - 600000)
    },
    {
      id: 3,
      type: 'event_created',
      description: 'Evento "BMX Championship" foi criado',
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: 4,
      type: 'review',
      description: 'Nova avaliação 5 estrelas recebida',
      timestamp: new Date(Date.now() - 1200000)
    },
    {
      id: 5,
      type: 'message',
      description: 'Mensagem de participante sobre "Surf Contest"',
      timestamp: new Date(Date.now() - 1800000)
    }
  ];

  // Mock data for events
  const eventsData = [
    {
      id: 1,
      title: 'Festival de Skate SP 2024',
      date: '2024-08-20',
      status: 'upcoming',
      registrations: 245,
      location: 'São Paulo'
    },
    {
      id: 2,
      title: 'BMX Championship Rio',
      date: '2024-08-14',
      status: 'live',
      registrations: 189,
      location: 'Rio de Janeiro'
    },
    {
      id: 3,
      title: 'Surf Contest Floripa',
      date: '2024-08-25',
      status: 'draft',
      registrations: 67,
      location: 'Florianópolis'
    },
    {
      id: 4,
      title: 'Urban Art Festival',
      date: '2024-08-10',
      status: 'completed',
      registrations: 412,
      location: 'Belo Horizonte'
    }
  ];

  // Mock data for analytics charts
  const registrationData = [
    { name: 'Jan', value: 120 },
    { name: 'Fev', value: 190 },
    { name: 'Mar', value: 150 },
    { name: 'Abr', value: 220 },
    { name: 'Mai', value: 280 },
    { name: 'Jun', value: 340 },
    { name: 'Jul', value: 290 }
  ];

  const revenueData = [
    { name: 'Jan', value: 12500 },
    { name: 'Fev', value: 18900 },
    { name: 'Mar', value: 15600 },
    { name: 'Abr', value: 22100 },
    { name: 'Mai', value: 28400 },
    { name: 'Jun', value: 34200 },
    { name: 'Jul', value: 29800 }
  ];

  const formatTime = (date) => {
    return date?.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <NavigationSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        {/* Main Content */}
        <div className="flex-1 lg:ml-80">
          <div className="p-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-muted transition-micro"
                >
                  <Icon name="Menu" size={24} />
                </button>
                <div>
                  <h1 className="font-headline text-3xl text-text-primary">
                    Dashboard Administrativo
                  </h1>
                  <p className="text-text-secondary mt-1">
                    {formatDate(currentTime)} • {formatTime(currentTime)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} />
                  Exportar Dados
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-conversion-accent hover:bg-conversion-accent/90"
                >
                  <Icon name="Plus" size={16} />
                  Novo Evento
                </Button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {metricsData?.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  change={metric?.change}
                  changeType={metric?.changeType}
                  icon={metric?.icon}
                  color={metric?.color}
                />
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="font-value-prop text-xl text-text-primary mb-4">
                Ações Rápidas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {quickActions?.map((action, index) => (
                  <QuickActionCard
                    key={index}
                    title={action?.title}
                    description={action?.description}
                    icon={action?.icon}
                    buttonText={action?.buttonText}
                    onClick={action?.onClick}
                    color={action?.color}
                  />
                ))}
              </div>
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
              <AnalyticsChart
                title="Inscrições por Mês"
                data={registrationData}
                type="bar"
                color="#1E40AF"
              />
              <AnalyticsChart
                title="Receita Mensal (R$)"
                data={revenueData}
                type="line"
                color="#10B981"
              />
            </div>

            {/* Events and Activity Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Recent Events */}
              <div className="xl:col-span-2">
                <div className="bg-card rounded-lg p-6 shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-value-prop text-xl text-text-primary">
                      Eventos Recentes
                    </h2>
                    <Button variant="ghost" size="sm">
                      Ver Todos
                      <Icon name="ArrowRight" size={16} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {eventsData?.map((event) => (
                      <EventStatusCard key={event?.id} event={event} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <div className="bg-card rounded-lg p-6 shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-value-prop text-xl text-text-primary">
                      Atividade Recente
                    </h2>
                    <Button variant="ghost" size="sm">
                      <Icon name="RefreshCw" size={16} />
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {recentActivities?.map((activity) => (
                      <RecentActivityItem key={activity?.id} activity={activity} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="mt-8">
              <div className="bg-card rounded-lg p-6 shadow-card">
                <h2 className="font-value-prop text-xl text-text-primary mb-4">
                  Insights de Performance
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="w-12 h-12 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="Target" size={24} />
                    </div>
                    <h3 className="font-medium text-text-primary mb-1">Taxa de Conversão</h3>
                    <p className="text-2xl font-bold text-success mb-1">23.4%</p>
                    <p className="text-xs text-text-secondary">+2.1% vs mês anterior</p>
                  </div>
                  
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="w-12 h-12 bg-warning/10 text-warning rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="Clock" size={24} />
                    </div>
                    <h3 className="font-medium text-text-primary mb-1">Tempo Médio no Site</h3>
                    <p className="text-2xl font-bold text-warning mb-1">4m 32s</p>
                    <p className="text-xs text-text-secondary">+15s vs mês anterior</p>
                  </div>
                  
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="Heart" size={24} />
                    </div>
                    <h3 className="font-medium text-text-primary mb-1">Satisfação</h3>
                    <p className="text-2xl font-bold text-primary mb-1">4.8/5</p>
                    <p className="text-xs text-text-secondary">Baseado em 234 avaliações</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdministrativeDashboard;