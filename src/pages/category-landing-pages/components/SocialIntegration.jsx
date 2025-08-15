import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialIntegration = ({ category }) => {
  const [activeHashtag, setActiveHashtag] = useState(category?.socialIntegration?.hashtags?.[0]);

  const SocialPost = ({ post }) => (
    <div className="bg-card rounded-xl overflow-hidden shadow-brand-card hover:shadow-brand-modal transition-brand cultural-hover">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3 mb-3">
          <Image
            src={post?.user?.avatar}
            alt={post?.user?.username}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-primary">{post?.user?.name}</h4>
              {post?.user?.verified && (
                <Icon name="CheckCircle" size={16} className="text-primary" />
              )}
            </div>
            <p className="text-sm text-text-secondary">@{post?.user?.username}</p>
          </div>
          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name={post?.platform === 'instagram' ? 'Instagram' : 'Twitter'} size={16} />
            <span className="text-xs">{post?.timeAgo}</span>
          </div>
        </div>

        <p className="text-sm mb-3 line-clamp-3">{post?.content}</p>

        {post?.hashtags && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post?.hashtags?.map((hashtag) => (
              <span
                key={hashtag}
                className="text-xs text-primary hover:text-primary/80 cursor-pointer"
              >
                #{hashtag}
              </span>
            ))}
          </div>
        )}
      </div>

      {post?.media && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post?.media?.url}
            alt="Post media"
            className="w-full h-full object-cover"
          />
          {post?.media?.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                <Icon name="Play" size={20} className="text-black ml-1" />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={16} />
              <span>{post?.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={16} />
              <span>{post?.comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Share" size={16} />
              <span>{post?.shares}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            Ver Post
          </Button>
        </div>
      </div>
    </div>
  );

  const InfluencerPartnership = ({ partnership }) => (
    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <Image
            src={partnership?.influencer?.avatar}
            alt={partnership?.influencer?.name}
            className="w-16 h-16 rounded-full"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Star" size={12} color="white" />
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-lg text-primary mb-1">
            {partnership?.influencer?.name}
          </h4>
          <p className="text-sm text-text-secondary mb-2">
            {partnership?.influencer?.title}
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-accent">
              <Icon name="Users" size={14} />
              <span>{partnership?.influencer?.followers}</span>
            </div>
            <div className="flex items-center space-x-1 text-success">
              <Icon name="TrendingUp" size={14} />
              <span>{partnership?.engagement}% engajamento</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-text-secondary mb-4">
        {partnership?.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {partnership?.platforms?.map((platform) => (
            <div
              key={platform}
              className="w-8 h-8 bg-muted rounded-full flex items-center justify-center"
            >
              <Icon name={platform} size={16} className="text-text-secondary" />
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm">
          Ver Parceria
        </Button>
      </div>
    </div>
  );

  const UserGeneratedContent = ({ content }) => (
    <div className="group relative bg-card rounded-xl overflow-hidden shadow-brand-card hover:shadow-brand-modal transition-brand cultural-hover">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={content?.media}
          alt={content?.caption}
          className="w-full h-full object-cover group-hover:scale-105 transition-brand"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* User Info */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <Image
            src={content?.user?.avatar}
            alt={content?.user?.username}
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <span className="text-white text-sm font-medium">
            @{content?.user?.username}
          </span>
        </div>

        {/* Engagement */}
        <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1">
          <div className="flex items-center space-x-1 text-white text-sm">
            <Icon name="Heart" size={14} />
            <span>{content?.likes}</span>
          </div>
        </div>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-sm line-clamp-2 mb-2">{content?.caption}</p>
          <div className="flex items-center space-x-2 text-xs opacity-80">
            <Icon name="MapPin" size={12} />
            <span>{content?.location}</span>
            <span>•</span>
            <span>{content?.timeAgo}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {content?.hashtags?.slice(0, 3)?.map((hashtag) => (
              <span
                key={hashtag}
                className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full"
              >
                #{hashtag}
              </span>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            <Icon name="ExternalLink" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl mb-6 text-primary">
            Pulso Social
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Acompanhe o que está rolando na comunidade {category?.name?.toLowerCase()} em tempo real
          </p>
        </div>

        {/* Hashtag Feed */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-2xl md:text-3xl text-primary">
              Feed de Hashtags
            </h3>
            <div className="flex items-center space-x-2">
              {category?.socialIntegration?.hashtags?.map((hashtag) => (
                <button
                  key={hashtag?.tag}
                  onClick={() => setActiveHashtag(hashtag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-brand ${
                    activeHashtag?.tag === hashtag?.tag
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  #{hashtag?.tag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {activeHashtag?.posts?.map((post) => (
              <SocialPost key={post?.id} post={post} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline">
              Ver Mais Posts
              <Icon name="ArrowRight" size={16} />
            </Button>
          </div>
        </div>

        {/* Influencer Partnerships */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-headline text-2xl md:text-3xl text-primary mb-2">
                Parcerias Influencers
              </h3>
              <p className="text-text-secondary">
                Colaborações autênticas com criadores de conteúdo
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category?.socialIntegration?.influencerPartnerships?.map((partnership) => (
              <InfluencerPartnership key={partnership?.id} partnership={partnership} />
            ))}
          </div>
        </div>

        {/* User Generated Content */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-headline text-2xl md:text-3xl text-primary mb-2">
                Conteúdo da Comunidade
              </h3>
              <p className="text-text-secondary">
                Momentos autênticos compartilhados pela nossa comunidade
              </p>
            </div>
            <Button variant="outline">
              Compartilhar Conteúdo
              <Icon name="Plus" size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category?.socialIntegration?.userGeneratedContent?.map((content) => (
              <UserGeneratedContent key={content?.id} content={content} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialIntegration;