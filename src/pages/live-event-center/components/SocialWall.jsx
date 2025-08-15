import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialWall = ({ eventHashtag }) => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');

  // Mock social posts
  const mockPosts = [
    {
      id: 1,
      platform: 'instagram',
      user: "@skatepro_br",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
      content: "Que manobra insana! O nível está muito alto hoje! 🛹🔥",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      likes: 127,
      timestamp: new Date(Date.now() - 180000),
      hashtags: ["#EventHubPro", "#SkateLife", "#AoVivo"]
    },
    {
      id: 2,
      platform: 'twitter',
      user: "@ana_cultura",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      content: "Primeira vez em um evento do EventHub Pro e já estou viciada! A energia é contagiante! ⚡",
      likes: 89,
      timestamp: new Date(Date.now() - 240000),
      hashtags: ["#EventHubPro", "#CulturaUrbana"]
    },
    {
      id: 3,
      platform: 'instagram',
      user: "@bmx_rider_sp",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      content: "A pista está perfeita! Obrigado EventHub Pro por mais um evento incrível! 🚴‍♂️",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      likes: 203,
      timestamp: new Date(Date.now() - 300000),
      hashtags: ["#EventHubPro", "#BMX", "#Radical"]
    },
    {
      id: 4,
      platform: 'twitter',
      user: "@music_lover_rj",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      content: "O som está perfeito! Cada batida ressoa no peito. Isso é música de verdade! 🎵",
      likes: 156,
      timestamp: new Date(Date.now() - 360000),
      hashtags: ["#EventHubPro", "#MusicaAoVivo", "#Som"]
    },
    {
      id: 5,
      platform: 'instagram',
      user: "@street_art_oficial",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      content: "Os grafites ao vivo são uma obra de arte! Cada traço conta uma história. 🎨",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      likes: 312,
      timestamp: new Date(Date.now() - 420000),
      hashtags: ["#EventHubPro", "#StreetArt", "#Arte"]
    }
  ];

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  const filteredPosts = posts?.filter(post => {
    if (filter === 'all') return true;
    return post?.platform === filter;
  });

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return 'Instagram';
      case 'twitter': return 'Twitter';
      case 'facebook': return 'Facebook';
      default: return 'MessageCircle';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'instagram': return 'text-pink-500';
      case 'twitter': return 'text-blue-400';
      case 'facebook': return 'text-blue-600';
      default: return 'text-gray-500';
    }
  };

  const formatTimeAgo = (date) => {
    const minutes = Math.floor((Date.now() - date?.getTime()) / 60000);
    if (minutes < 1) return 'agora';
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Hash" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Mural Social</h3>
          </div>
          <div className="text-sm text-muted-foreground">
            {eventHashtag}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Todos
          </Button>
          <Button
            variant={filter === 'instagram' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('instagram')}
          >
            <Icon name="Instagram" size={16} className="mr-1" />
            Instagram
          </Button>
          <Button
            variant={filter === 'twitter' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('twitter')}
          >
            <Icon name="Twitter" size={16} className="mr-1" />
            Twitter
          </Button>
        </div>
      </div>
      {/* Posts */}
      <div className="max-h-96 overflow-y-auto">
        <div className="p-4 space-y-4">
          {filteredPosts?.map((post) => (
            <div key={post?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-brand">
              <div className="flex items-start space-x-3">
                <img
                  src={post?.avatar}
                  alt={post?.user}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-sm text-foreground">
                      {post?.user}
                    </span>
                    <Icon 
                      name={getPlatformIcon(post?.platform)} 
                      size={14} 
                      className={getPlatformColor(post?.platform)} 
                    />
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(post?.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-foreground mb-3 leading-relaxed">
                    {post?.content}
                  </p>

                  {post?.image && (
                    <div className="mb-3">
                      <img
                        src={post?.image}
                        alt="Post content"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Icon name="Heart" size={14} />
                        <span className="text-xs">{post?.likes}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                        <Icon name="Share" size={12} className="mr-1" />
                        Compartilhar
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {post?.hashtags?.slice(0, 2)?.map((hashtag, index) => (
                        <span 
                          key={index}
                          className="text-xs text-primary bg-primary/10 px-2 py-1 rounded"
                        >
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border text-center">
        <Button variant="outline" size="sm" className="w-full">
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Carregar Mais Posts
        </Button>
      </div>
    </div>
  );
};

export default SocialWall;