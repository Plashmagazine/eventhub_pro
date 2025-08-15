import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroCarousel from './components/HeroCarousel';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import EventSection from './components/EventSection';
import ActivityFeed from './components/ActivityFeed';
import Icon from '../../components/AppIcon';

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState({
    upcoming: [],
    live: [],
    past: []
  });

  // Mock data for events
  const mockEvents = {
    upcoming: [
      {
        id: 1,
        title: "Campeonato Nacional de Skate",
        category: "Skate",
        location: "São Paulo, SP",
        date: "2024-09-15T14:00:00",
        image: "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        attendees: 2847,
        price: 25.00
      },
      {
        id: 2,
        title: "BMX Street Championship",
        category: "BMX",
        location: "Rio de Janeiro, RJ",
        date: "2024-09-22T16:00:00",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        attendees: 1876,
        price: 30.00
      },
      {
        id: 3,
        title: "Festival de Música Urbana",
        category: "Música",
        location: "Belo Horizonte, MG",
        date: "2024-09-28T19:00:00",
        image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        attendees: 5432,
        price: 45.00
      },
      {
        id: 4,
        title: "Roller Derby Championship",
        category: "Roller",
        location: "Porto Alegre, RS",
        date: "2024-10-05T15:00:00",
        image: "https://images.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        attendees: 1234,
        price: 20.00
      }
    ],
    live: [
      {
        id: 5,
        title: "Festival de Surf Guarujá",
        category: "Surf",
        location: "Guarujá, SP",
        date: "2024-08-14T10:00:00",
        image: "https://images.pixabay.com/photo/2016/11/29/05/45/adventure-1867285_1280.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        attendees: 1523,
        liveViewers: 8947,
        price: 0
      },
      {
        id: 6,
        title: "Arte de Rua ao Vivo",
        category: "Arte",
        location: "São Paulo, SP",
        date: "2024-08-14T18:00:00",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        attendees: 892,
        liveViewers: 2341,
        price: 0
      }
    ],
    past: [
      {
        id: 7,
        title: "Copa de Skate Vertical",
        category: "Skate",
        location: "Florianópolis, SC",
        date: "2024-08-10T14:00:00",
        image: "https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        attendees: 1654,
        rating: 4.8,
        price: 35.00
      },
      {
        id: 8,
        title: "Festival de Hip Hop",
        category: "Música",
        location: "Salvador, BA",
        date: "2024-08-05T20:00:00",
        image: "https://images.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        attendees: 3421,
        rating: 4.9,
        price: 50.00
      },
      {
        id: 9,
        title: "BMX Freestyle Show",
        category: "BMX",
        location: "Curitiba, PR",
        date: "2024-07-28T16:00:00",
        image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
        attendees: 987,
        rating: 4.6,
        price: 25.00
      }
    ]
  };

  useEffect(() => {
    filterEvents();
  }, [searchTerm, activeCategory]);

  const filterEvents = () => {
    const filtered = {
      upcoming: [],
      live: [],
      past: []
    };

    Object.keys(mockEvents)?.forEach(type => {
      filtered[type] = mockEvents?.[type]?.filter(event => {
        const matchesSearch = searchTerm === '' || 
          event?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          event?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          event?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase());
        
        const matchesCategory = activeCategory === 'all' || 
          event?.category?.toLowerCase() === activeCategory?.toLowerCase();

        return matchesSearch && matchesCategory;
      });
    });

    setFilteredEvents(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <HeroCarousel />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          onCategoryChange={handleCategoryChange}
          activeCategory={activeCategory}
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Events Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Live Events */}
            <EventSection
              title="Rolando Agora"
              subtitle="Eventos acontecendo ao vivo"
              events={filteredEvents?.live}
              type="live"
              icon="Radio"
              color="text-success"
              showViewAll={filteredEvents?.live?.length > 4}
            />

            {/* Upcoming Events */}
            <EventSection
              title="Vem Aí"
              subtitle="Próximos eventos imperdíveis"
              events={filteredEvents?.upcoming}
              type="upcoming"
              icon="Calendar"
              color="text-primary"
              showViewAll={filteredEvents?.upcoming?.length > 4}
            />

            {/* Past Events */}
            <EventSection
              title="Anteriores"
              subtitle="Reviva os melhores momentos"
              events={filteredEvents?.past}
              type="past"
              icon="Clock"
              color="text-text-secondary"
              showViewAll={filteredEvents?.past?.length > 4}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="text-3xl font-headline text-primary mb-2">2.847</div>
            <div className="text-text-secondary">Eventos Realizados</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="text-3xl font-headline text-success mb-2">156K</div>
            <div className="text-text-secondary">Participantes</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="text-3xl font-headline text-accent mb-2">89</div>
            <div className="text-text-secondary">Cidades</div>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <div className="text-3xl font-headline text-conversion-accent mb-2">4.9</div>
            <div className="text-text-secondary">Avaliação Média</div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-foreground text-background mt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <span className="font-headline text-xl">EventHub Pro</span>
              </div>
              <p className="text-background/80 mb-4">
                Onde a cultura acontece. Conectando comunidades através de experiências autênticas e inesquecíveis.
              </p>
              <div className="flex space-x-4">
                <Icon name="Instagram" size={20} className="text-background/60 hover:text-background cursor-pointer transition-brand" />
                <Icon name="Twitter" size={20} className="text-background/60 hover:text-background cursor-pointer transition-brand" />
                <Icon name="Facebook" size={20} className="text-background/60 hover:text-background cursor-pointer transition-brand" />
                <Icon name="Youtube" size={20} className="text-background/60 hover:text-background cursor-pointer transition-brand" />
              </div>
            </div>
            
            <div>
              <h4 className="font-value-prop text-lg mb-4">Categorias</h4>
              <ul className="space-y-2 text-background/80">
                <li><a href="#" className="hover:text-background transition-brand">Skate</a></li>
                <li><a href="#" className="hover:text-background transition-brand">Surf</a></li>
                <li><a href="#" className="hover:text-background transition-brand">BMX</a></li>
                <li><a href="#" className="hover:text-background transition-brand">Música</a></li>
                <li><a href="#" className="hover:text-background transition-brand">Arte</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-value-prop text-lg mb-4">Suporte</h4>
              <ul className="space-y-2 text-background/80">
                <li><a href="#" className="hover:text-background transition-brand">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-background transition-brand">Contato</a></li>
                <li><a href="#" className="hover:text-background transition-brand">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-background transition-brand">Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; {new Date()?.getFullYear()} EventHub Pro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;