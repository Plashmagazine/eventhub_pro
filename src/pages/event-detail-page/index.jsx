import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import EventHero from './components/EventHero';
import EventTabs from './components/EventTabs';
import SocialProof from './components/SocialProof';
import RegistrationFlow from './components/RegistrationFlow';
import RelatedEvents from './components/RelatedEvents';

const EventDetailPage = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  // Mock event data
  const eventData = {
    id: 1,
    title: "Festival de Skate Street São Paulo 2024",
    category: "Skateboarding",
    status: "upcoming", // upcoming, live, past
    date: "2024-09-15T14:00:00Z",
    formattedDate: "15 de Setembro, 2024",
    time: "14:00 - 22:00",
    venue: "Praça Roosevelt",
    address: "Praça Franklin Roosevelt, s/n",
    city: "São Paulo",
    state: "SP",
    coordinates: {
      lat: -23.5505,
      lng: -46.6333
    },
    heroImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop",
    description: `O maior festival de skate street do Brasil está de volta! Prepare-se para três dias intensos de manobras radicais, competições emocionantes e muita energia urbana no coração de São Paulo.\n\nEste evento reúne os melhores skatistas nacionais e internacionais em uma celebração única da cultura street. Além das competições, teremos workshops, exposições de arte urbana, shows musicais e uma feira com as principais marcas do segmento.\n\nVenha fazer parte desta experiência única e sentir a verdadeira essência da cultura skate brasileira!`,
    highlights: [
      "Competição com premiação de R$ 50.000",
      "Participação de skatistas internacionais",
      "Shows ao vivo de artistas nacionais",
      "Workshops gratuitos para iniciantes",
      "Feira com mais de 30 marcas",
      "Food trucks com comida de rua"
    ],
    expectations: [
      "Manobras radicais e competições intensas",
      "Networking com a comunidade skate",
      "Descoberta de novos talentos",
      "Experiência cultural autêntica",
      "Oportunidades de aprendizado",
      "Diversão garantida para toda família"
    ],
    media: [
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
        caption: "Competição Principal"
      },
      {
        url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop",
        caption: "Área de Workshops"
      }
    ],
    transportation: [
      {
        type: "Metrô",
        icon: "Train",
        details: "Estação República (5 min caminhando)"
      },
      {
        type: "Ônibus",
        icon: "Bus",
        details: "Várias linhas param na região"
      },
      {
        type: "Carro",
        icon: "Car",
        details: "Estacionamentos próximos disponíveis"
      }
    ],
    lineup: [
      {
        name: "Pedro Barros",
        role: "Skatista Profissional",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        bio: "Medalhista olímpico e referência mundial no skate bowl",
        followers: "2.5M",
        performanceTime: "16:00 - 16:30"
      },
      {
        name: "Leticia Bufoni",
        role: "Skatista Profissional",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        bio: "Pioneira do skate feminino brasileiro",
        followers: "3.1M",
        performanceTime: "17:00 - 17:30"
      },
      {
        name: "Luan Oliveira",
        role: "Skatista Profissional",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        bio: "Campeão mundial de skate street",
        followers: "1.8M",
        performanceTime: "18:00 - 18:30"
      }
    ],
    gallery: [
      { url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop", caption: "Competição 2023" },
      { url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop", caption: "Público presente" },
      { url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop", caption: "Manobras radicais" },
      { url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop", caption: "Área de alimentação" },
      { url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop", caption: "Shows musicais" },
      { url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop", caption: "Workshops" },
      { url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop", caption: "Feira de marcas" },
      { url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop", caption: "Premiação" }
    ],
    reviews: [
      {
        name: "Carlos Silva",
        avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        rating: 5,
        date: "Há 2 dias",
        comment: "Evento incrível! A organização foi perfeita e o nível dos skatistas impressionante. Já estou ansioso para a próxima edição."
      },
      {
        name: "Ana Costa",
        avatar: "https://randomuser.me/api/portraits/women/10.jpg",
        rating: 5,
        date: "Há 1 semana",
        comment: "Primeira vez em um evento de skate e foi uma experiência única. A energia do público e dos atletas é contagiante!"
      },
      {
        name: "Roberto Santos",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        rating: 4,
        date: "Há 2 semanas",
        comment: "Muito bom! Só achei que poderia ter mais opções de comida, mas no geral foi excelente."
      }
    ],
    discussions: [
      {
        name: "Marina Oliveira",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        time: "Há 3 horas",
        message: "Alguém sabe se vai ter transmissão ao vivo? Não vou conseguir ir presencialmente mas quero acompanhar!",
        likes: 12
      },
      {
        name: "João Pedro",
        avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        time: "Há 5 horas",
        message: "Primeira vez que vou em um evento assim. Alguma dica para quem é iniciante no skate?",
        likes: 8
      },
      {
        name: "Fernanda Lima",
        avatar: "https://randomuser.me/api/portraits/women/13.jpg",
        time: "Há 1 dia",
        message: "Já comprei meu ingresso! Quem mais vai estar lá? Vamos nos encontrar!",
        likes: 15
      }
    ],
    attendeeCount: 2847,
    viewCount: 15420,
    shareCount: 892,
    rating: 4.8,
    reviewCount: 156,
    verified: true,
    liveAttendees: 1250,
    liveAvatars: [
      "https://randomuser.me/api/portraits/men/20.jpg",
      "https://randomuser.me/api/portraits/women/20.jpg",
      "https://randomuser.me/api/portraits/men/21.jpg",
      "https://randomuser.me/api/portraits/women/21.jpg",
      "https://randomuser.me/api/portraits/men/22.jpg"
    ],
    testimonials: [
      {
        name: "Lucas Mendes",
        role: "Skatista Amador",
        avatar: "https://randomuser.me/api/portraits/men/30.jpg",
        rating: 5,
        comment: "O melhor evento de skate que já participei. A organização é impecável e o ambiente é incrível!"
      },
      {
        name: "Camila Rodrigues",
        role: "Fotógrafa",
        avatar: "https://randomuser.me/api/portraits/women/30.jpg",
        rating: 5,
        comment: "Como profissional da área, posso dizer que este evento é referência em qualidade e organização."
      },
      {
        name: "Rafael Costa",
        role: "Estudante",
        avatar: "https://randomuser.me/api/portraits/men/31.jpg",
        rating: 4,
        comment: "Experiência única! Aprendi muito nos workshops e me diverti demais nas competições."
      }
    ],
    organizer: {
      name: "SP Skate Events",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
      description: "Organizadora líder em eventos de skate no Brasil, com mais de 10 anos de experiência criando experiências únicas para a comunidade skate.",
      verified: true,
      eventsHosted: 127,
      followers: 45000,
      rating: 4.9,
      badges: [
        { name: "Organizador Verificado", icon: "CheckCircle" },
        { name: "Especialista em Skate", icon: "Award" },
        { name: "Evento Sustentável", icon: "Leaf" }
      ]
    },
    recentAttendees: [
      { name: "User 1", avatar: "https://randomuser.me/api/portraits/men/40.jpg", isOnline: true },
      { name: "User 2", avatar: "https://randomuser.me/api/portraits/women/40.jpg", isOnline: false },
      { name: "User 3", avatar: "https://randomuser.me/api/portraits/men/41.jpg", isOnline: true },
      { name: "User 4", avatar: "https://randomuser.me/api/portraits/women/41.jpg", isOnline: true },
      { name: "User 5", avatar: "https://randomuser.me/api/portraits/men/42.jpg", isOnline: false },
      { name: "User 6", avatar: "https://randomuser.me/api/portraits/women/42.jpg", isOnline: true },
      { name: "User 7", avatar: "https://randomuser.me/api/portraits/men/43.jpg", isOnline: false },
      { name: "User 8", avatar: "https://randomuser.me/api/portraits/women/43.jpg", isOnline: true },
      { name: "User 9", avatar: "https://randomuser.me/api/portraits/men/44.jpg", isOnline: true },
      { name: "User 10", avatar: "https://randomuser.me/api/portraits/women/44.jpg", isOnline: false },
      { name: "User 11", avatar: "https://randomuser.me/api/portraits/men/45.jpg", isOnline: true },
      { name: "User 12", avatar: "https://randomuser.me/api/portraits/women/45.jpg", isOnline: false }
    ]
  };

  // Mock related events data
  const relatedEventsData = [
    {
      title: "Campeonato de BMX Freestyle",
      description: "Competição nacional de BMX com os melhores riders do país",
      category: "BMX",
      status: "upcoming",
      date: "22 de Setembro",
      time: "15:00",
      location: "Parque Ibirapuera",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      attendees: "1.2k",
      rating: "4.7",
      price: 45
    },
    {
      title: "Festival de Cultura Urbana",
      description: "Celebração da arte de rua com grafite, música e dança",
      category: "Urban Culture",
      status: "live",
      date: "Hoje",
      time: "Agora",
      location: "Centro Cultural",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      attendees: "3.5k",
      rating: "4.9",
      price: 0
    },
    {
      title: "Competição de Roller Derby",
      description: "Torneio feminino de roller derby com equipes de todo o Brasil",
      category: "Roller",
      status: "upcoming",
      date: "30 de Setembro",
      time: "18:00",
      location: "Ginásio Municipal",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      attendees: "890",
      rating: "4.6",
      price: 25
    }
  ];

  const handleRegister = (formData) => {
    console.log('Registration data:', formData);
    // Handle registration logic here
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{eventData?.title} - EventHub Pro</title>
        <meta name="description" content={eventData?.description?.substring(0, 160)} />
        <meta property="og:title" content={eventData?.title} />
        <meta property="og:description" content={eventData?.description?.substring(0, 160)} />
        <meta property="og:image" content={eventData?.heroImage} />
        <meta property="og:type" content="event" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <EventHero 
            event={eventData} 
            onRegister={() => setIsRegistrationOpen(true)} 
          />
          
          <EventTabs event={eventData} />
          
          <SocialProof event={eventData} />
          
          <RelatedEvents events={relatedEventsData} />
          
          <RegistrationFlow
            event={eventData}
            isOpen={isRegistrationOpen}
            onClose={() => setIsRegistrationOpen(false)}
            onRegister={handleRegister}
          />
        </main>
      </div>
    </>
  );
};

export default EventDetailPage;