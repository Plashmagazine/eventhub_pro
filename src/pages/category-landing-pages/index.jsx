import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import CategoryHero from './components/CategoryHero';
import EventCollections from './components/EventCollections';
import InteractiveFilters from './components/InteractiveFilters';
import CommunitySpotlight from './components/CommunitySpotlight';
import EducationalContent from './components/EducationalContent';
import SocialIntegration from './components/SocialIntegration';
import EventCalendar from './components/EventCalendar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CategoryLandingPages = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [filters, setFilters] = useState({});

  // Mock data for categories
  const categories = [
    {
      id: 'skateboarding',
      name: 'Skateboarding',
      icon: 'Zap',
      heroImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
      manifesto: `Onde o concreto encontra a criatividade.\nCada manobra é uma expressão, cada queda é aprendizado.\nEsta é a cultura que transforma obstáculos em oportunidades.`,
      stats: {
        events: '127',
        community: '15.2K',
        locations: '45'
      },
      allCategories: [],
      collections: {
        mustAttend: [
          {
            id: 1,
            title: 'Street League Championship São Paulo',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
            date: '15 Set',
            location: 'São Paulo, SP',
            status: 'upcoming',
            organizer: {
              name: 'Street League Brasil',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
            },
            attendees: '2.5K',
            description: 'O maior campeonato de street skate do Brasil retorna com os melhores skatistas nacionais e internacionais.',
            price: 45
          },
          {
            id: 2,
            title: 'Workshop de Manobras Básicas',
            image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&h=300&fit=crop',
            date: '18 Set',
            location: 'Rio de Janeiro, RJ',
            status: 'confirmed',
            organizer: {
              name: 'Skate Academy RJ',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
            },
            attendees: '85',
            description: 'Aprenda as manobras fundamentais do skate com instrutores experientes.',
            price: 0
          },
          {
            id: 3,
            title: 'Mega Rampa Challenge',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
            date: '22 Set',
            location: 'Belo Horizonte, MG',
            status: 'live',
            organizer: {
              name: 'Vert Skate BH',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
            },
            attendees: '1.2K',
            description: 'Competição de vert skate na maior rampa do Brasil.',
            price: 35
          }
        ],
        emergingTalents: [
          {
            id: 4,
            title: 'Novos Talentos SP',
            image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&h=300&fit=crop',
            date: '25 Set',
            location: 'São Paulo, SP',
            status: 'upcoming',
            organizer: {
              name: 'Young Skaters',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
            },
            attendees: '320',
            description: 'Competição para skatistas iniciantes e intermediários.',
            price: 20
          }
        ],
        classics: [
          {
            id: 5,
            title: 'Circuito Brasileiro de Skate',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
            date: '30 Set',
            location: 'Brasília, DF',
            status: 'upcoming',
            organizer: {
              name: 'CBSk',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
            },
            attendees: '5.8K',
            description: 'Etapa nacional do circuito brasileiro de skateboarding.',
            price: 60
          }
        ]
      },
      eventTypes: [
        { value: 'street', label: 'Street' },
        { value: 'vert', label: 'Vert' },
        { value: 'park', label: 'Park' },
        { value: 'freestyle', label: 'Freestyle' }
      ],
      quickFilters: [
        { value: 'street', label: 'Street' },
        { value: 'vert', label: 'Vert' },
        { value: 'beginner', label: 'Iniciante' }
      ],
      communitySpotlight: {
        influencers: [
          {
            id: 1,
            name: 'Pedro Barros',
            title: 'Skatista Profissional',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face',
            location: 'Florianópolis, SC',
            followers: '2.1M',
            bio: 'Medalhista olímpico e referência mundial no skate vert. Inspirando a nova geração de skatistas brasileiros.',
            socialLinks: [
              { platform: 'instagram', icon: 'Instagram' },
              { platform: 'youtube', icon: 'Youtube' },
              { platform: 'tiktok', icon: 'Music' }
            ]
          },
          {
            id: 2,
            name: 'Rayssa Leal',
            title: 'Skatista Profissional',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop&crop=face',
            location: 'Imperatriz, MA',
            followers: '3.5M',
            bio: 'A Fadinha do skate brasileiro. Medalhista olímpica e inspiração para milhares de jovens skatistas.',
            socialLinks: [
              { platform: 'instagram', icon: 'Instagram' },
              { platform: 'youtube', icon: 'Youtube' },
              { platform: 'tiktok', icon: 'Music' }
            ]
          },
          {
            id: 3,
            name: 'Luan Oliveira',
            title: 'Skatista Profissional',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face',
            location: 'Porto Alegre, RS',
            followers: '1.8M',
            bio: 'Pioneiro do skate street brasileiro. Referência técnica e criativa no cenário mundial.',
            socialLinks: [
              { platform: 'instagram', icon: 'Instagram' },
              { platform: 'youtube', icon: 'Youtube' }
            ]
          }
        ],
        localScenes: [
          {
            id: 1,
            name: 'Cena Skate SP',
            location: 'São Paulo, SP',
            icon: 'Building',
            description: 'A maior e mais diversa cena de skate do Brasil, com spots icônicos e eventos constantes.',
            members: '12.5K',
            events: '45'
          },
          {
            id: 2,
            name: 'Skate Carioca',
            location: 'Rio de Janeiro, RJ',
            icon: 'Mountain',
            description: 'Berço do skate brasileiro, com praias, rampas e uma cultura única.',
            members: '8.2K',
            events: '32'
          },
          {
            id: 3,
            name: 'Skate Mineiro',
            location: 'Belo Horizonte, MG',
            icon: 'TreePine',
            description: 'Cena em crescimento com foco em street skate e novos talentos.',
            members: '4.7K',
            events: '18'
          }
        ],
        culturalMovements: [
          {
            id: 1,
            name: 'Skate Feminino',
            icon: 'Heart',
            description: 'Movimento que promove a participação feminina no skate, quebrando barreiras e inspirando novas gerações.',
            participants: '15K',
            locations: '120'
          },
          {
            id: 2,
            name: 'Skate Social',
            icon: 'Users',
            description: 'Iniciativas que usam o skate como ferramenta de inclusão social e transformação comunitária.',
            participants: '8.5K',
            locations: '85'
          }
        ]
      },
      educational: {
        tutorials: [
          {
            id: 1,
            title: 'Como fazer Ollie - Tutorial Completo',
            thumbnail: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&h=300&fit=crop',
            duration: '12:45',
            difficulty: 'Iniciante',
            description: 'Aprenda a manobra mais fundamental do skate com dicas detalhadas e exercícios práticos.',
            instructor: {
              name: 'Carlos Silva',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
            },
            views: '125K'
          },
          {
            id: 2,
            title: 'Kickflip: Técnica e Progressão',
            thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
            duration: '18:30',
            difficulty: 'Intermediário',
            description: 'Domine o kickflip com análise técnica e progressão gradual.',
            instructor: {
              name: 'Ana Costa',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
            },
            views: '89K'
          },
          {
            id: 3,
            title: 'Transições em Bowl',
            thumbnail: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&h=300&fit=crop',
            duration: '25:15',
            difficulty: 'Avançado',
            description: 'Técnicas avançadas para dominar bowls e piscinas.',
            instructor: {
              name: 'Pedro Santos',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
            },
            views: '67K'
          }
        ],
        gearGuides: [
          {
            id: 1,
            name: 'Shape Element Section 8.0"',
            category: 'Shapes',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop',
            price: 'R$ 189',
            rating: 5,
            description: 'Shape profissional com madeira canadense de alta qualidade. Ideal para street skate.',
            tags: ['Street', 'Profissional', 'Durável']
          },
          {
            id: 2,
            name: 'Truck Independent Stage 11',
            category: 'Trucks',
            image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=100&h=100&fit=crop',
            price: 'R$ 320',
            rating: 5,
            description: 'Trucks de alta performance com geometria aprimorada para melhor controle.',
            tags: ['Performance', 'Controle', 'Durável']
          }
        ],
        culturalHistory: [
          {
            id: 1,
            title: 'O Nascimento do Skate no Brasil',
            period: '1960-1970',
            location: 'São Paulo, SP',
            icon: 'History',
            description: `O skateboarding chegou ao Brasil na década de 1960, trazido por surfistas paulistas que buscavam uma alternativa para os dias sem ondas.\n\nOs primeiros skates eram artesanais, feitos com rodinhas de patins e madeira compensada. A Praça Roosevelt se tornou o primeiro ponto de encontro dos skatistas brasileiros.`,
            readTime: 5
          },
          {
            id: 2,
            title: 'A Era de Ouro dos Anos 80',
            period: '1980-1990',
            location: 'Brasil',
            icon: 'Star',
            description: `Os anos 80 marcaram a explosão do skate no Brasil. Surgiram as primeiras revistas especializadas, lojas e competições organizadas.\n\nO skate vertical ganhou destaque com a construção das primeiras pistas profissionais, e nomes como Rui Muleque e Lincoln Ueda se tornaram ícones nacionais.`,
            readTime: 7
          },
          {
            id: 3,
            title: 'Skate Olímpico: O Reconhecimento Mundial',
            period: '2021',
            location: 'Tóquio, Japão',
            icon: 'Award',
            description: `O skate brasileiro conquistou o mundo nas Olimpíadas de Tóquio 2021. Rayssa Leal e Pedro Barros trouxeram medalhas e colocaram o Brasil no topo do skate mundial.\n\nEste momento histórico inspirou uma nova geração e consolidou o Brasil como potência mundial do skateboarding.`,
            readTime: 6
          }
        ]
      },
      socialIntegration: {
        hashtags: [
          {
            tag: 'skatebrasil',
            posts: [
              {
                id: 1,
                user: {
                  name: 'João Silva',
                  username: 'joao_skate',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                  verified: false
                },
                platform: 'instagram',
                content: 'Sessão incrível hoje na praça! Finalmente consegui acertar o kickflip que estava treinando há semanas 🛹',
                hashtags: ['skatebrasil', 'kickflip', 'streetskate'],
                media: {
                  url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
                  type: 'image'
                },
                likes: '234',
                comments: '18',
                shares: '12',
                timeAgo: '2h'
              },
              {
                id: 2,
                user: {
                  name: 'Maria Santos',
                  username: 'maria_skates',
                  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
                  verified: true
                },
                platform: 'instagram',
                content: 'Workshop de skate feminino foi um sucesso! Mais de 50 meninas aprendendo e se divertindo juntas 💪',
                hashtags: ['skatebrasil', 'skatefeminino', 'girlspower'],
                media: {
                  url: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&h=400&fit=crop',
                  type: 'video'
                },
                likes: '567',
                comments: '45',
                shares: '28',
                timeAgo: '5h'
              }
            ]
          }
        ],
        influencerPartnerships: [
          {
            id: 1,
            influencer: {
              name: 'Pedro Barros',
              title: 'Skatista Profissional',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
              followers: '2.1M'
            },
            description: 'Parceria oficial para cobertura dos principais eventos de skate vert no Brasil.',
            engagement: '8.5',
            platforms: ['Instagram', 'Youtube', 'TikTok']
          },
          {
            id: 2,
            influencer: {
              name: 'Rayssa Leal',
              title: 'Skatista Profissional',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
              followers: '3.5M'
            },
            description: 'Embaixadora oficial do skate feminino e eventos de base.',
            engagement: '12.3',
            platforms: ['Instagram', 'TikTok']
          }
        ],
        userGeneratedContent: [
          {
            id: 1,
            user: {
              username: 'carlos_sk8',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
            },
            media: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
            caption: 'Primeira vez na mega rampa! Que sensação incrível 🔥',
            hashtags: ['skatebrasil', 'megarampa', 'adrenalina'],
            location: 'São Paulo, SP',
            likes: '89',
            timeAgo: '1d'
          },
          {
            id: 2,
            user: {
              username: 'ana_skate',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
            },
            media: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=300&h=400&fit=crop',
            caption: 'Treino matinal na pista. Nada melhor que começar o dia andando de skate!',
            hashtags: ['skatebrasil', 'morning', 'lifestyle'],
            location: 'Rio de Janeiro, RJ',
            likes: '156',
            timeAgo: '2d'
          },
          {
            id: 3,
            user: {
              username: 'bruno_street',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
            },
            media: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
            caption: 'Sessão com a galera no centro da cidade. Street skate é vida!',
            hashtags: ['skatebrasil', 'streetskate', 'crew'],
            location: 'Belo Horizonte, MG',
            likes: '203',
            timeAgo: '3d'
          },
          {
            id: 4,
            user: {
              username: 'lucas_vert',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
            },
            media: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=300&h=400&fit=crop',
            caption: 'Bowl session com os amigos. Domingo perfeito!',
            hashtags: ['skatebrasil', 'bowl', 'friends'],
            location: 'Florianópolis, SC',
            likes: '127',
            timeAgo: '4d'
          }
        ]
      },
      eventCalendar: {
        events: [
          {
            id: 1,
            title: 'Street League Championship',
            date: '2024-09-15',
            time: '14:00',
            location: 'São Paulo, SP',
            type: 'competition',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop',
            attendees: '2.5K'
          },
          {
            id: 2,
            title: 'Workshop Manobras Básicas',
            date: '2024-09-18',
            time: '09:00',
            location: 'Rio de Janeiro, RJ',
            type: 'workshop',
            image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=100&h=100&fit=crop',
            attendees: '85'
          },
          {
            id: 3,
            title: 'Festival de Skate BH',
            date: '2024-09-22',
            time: '10:00',
            location: 'Belo Horizonte, MG',
            type: 'festival',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop',
            attendees: '1.2K'
          }
        ]
      }
    },
    {
      id: 'surf',
      name: 'Surf',
      icon: 'Waves',
      heroImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1920&h=1080&fit=crop',
      manifesto: `Onde o oceano encontra a alma.\nCada onda é uma oportunidade única, cada sessão é uma conexão com a natureza.\nEsta é a cultura que nos ensina paciência, respeito e harmonia.`,
      stats: {
        events: '89',
        community: '22.8K',
        locations: '67'
      },
      allCategories: [],
      collections: {
        mustAttend: [
          {
            id: 1,
            title: 'Circuito Brasileiro de Surf Profissional',
            image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop',
            date: '20 Set',
            location: 'Florianópolis, SC',
            status: 'upcoming',
            organizer: {
              name: 'Confederação Brasileira de Surf',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
            },
            attendees: '3.2K',
            description: 'Etapa decisiva do circuito nacional com os melhores surfistas do país.',
            price: 0
          }
        ],
        emergingTalents: [],
        classics: []
      },
      eventTypes: [
        { value: 'longboard', label: 'Longboard' },
        { value: 'shortboard', label: 'Shortboard' },
        { value: 'bodyboard', label: 'Bodyboard' }
      ],
      quickFilters: [
        { value: 'longboard', label: 'Longboard' },
        { value: 'beginner', label: 'Iniciante' }
      ],
      communitySpotlight: {
        influencers: [],
        localScenes: [],
        culturalMovements: []
      },
      educational: {
        tutorials: [],
        gearGuides: [],
        culturalHistory: []
      },
      socialIntegration: {
        hashtags: [{ tag: 'surfbrasil', posts: [] }],
        influencerPartnerships: [],
        userGeneratedContent: []
      },
      eventCalendar: {
        events: []
      }
    }
  ];

  useEffect(() => {
    // Set skateboarding as default category and populate all categories
    const skateCategory = categories?.find(cat => cat?.id === 'skateboarding');
    if (skateCategory) {
      skateCategory.allCategories = categories;
      setCurrentCategory(skateCategory);
    }
  }, []);

  const handleCategoryChange = (category) => {
    category.allCategories = categories;
    setCurrentCategory(category);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Here you would typically filter the events based on the selected filters
    console.log('Filters changed:', newFilters);
  };

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Icon name="Loader" size={32} color="white" />
          </div>
          <p className="text-text-secondary">Carregando categorias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Category Hero Section */}
      <CategoryHero 
        category={currentCategory} 
        onCategoryChange={handleCategoryChange}
      />
      {/* Interactive Filters */}
      <InteractiveFilters 
        category={currentCategory}
        onFiltersChange={handleFiltersChange}
      />
      {/* Event Collections */}
      <EventCollections category={currentCategory} />
      {/* Community Spotlight */}
      <CommunitySpotlight category={currentCategory} />
      {/* Educational Content */}
      <EducationalContent category={currentCategory} />
      {/* Social Integration */}
      <SocialIntegration category={currentCategory} />
      {/* Event Calendar */}
      <EventCalendar category={currentCategory} />
      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="font-headline text-4xl md:text-5xl mb-6">
              Pronto para Fazer Parte?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se à maior comunidade de {currentCategory?.name?.toLowerCase()} do Brasil e descubra eventos incríveis perto de você.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="default" 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold px-8"
              >
                Criar Conta Gratuita
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary px-8"
              >
                Organizar Evento
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <span className="font-headline text-xl text-primary">EventHub Pro</span>
              </div>
              <p className="text-text-secondary text-sm">
                A plataforma definitiva para descobrir e participar dos melhores eventos de cultura urbana do Brasil.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-primary mb-4">Categorias</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                {categories?.map((category) => (
                  <li key={category?.id}>
                    <button 
                      onClick={() => handleCategoryChange(category)}
                      className="hover:text-primary transition-brand"
                    >
                      {category?.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-primary mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-primary transition-brand">Criar Evento</a></li>
                <li><a href="#" className="hover:text-primary transition-brand">Dashboard</a></li>
                <li><a href="#" className="hover:text-primary transition-brand">Comunidade</a></li>
                <li><a href="#" className="hover:text-primary transition-brand">Suporte</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-primary mb-4">Conecte-se</h4>
              <div className="flex items-center space-x-3">
                <a href="#" className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-text-secondary hover:bg-primary hover:text-primary-foreground transition-brand">
                  <Icon name="Instagram" size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-text-secondary hover:bg-primary hover:text-primary-foreground transition-brand">
                  <Icon name="Youtube" size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-text-secondary hover:bg-primary hover:text-primary-foreground transition-brand">
                  <Icon name="Twitter" size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-text-secondary">
            <p>&copy; {new Date()?.getFullYear()} EventHub Pro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoryLandingPages;