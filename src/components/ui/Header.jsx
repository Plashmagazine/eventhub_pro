import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Início', path: '/homepage', icon: 'Home' },
    { name: 'Eventos', path: '/event-detail-page', icon: 'Calendar' },
    { name: 'Categorias', path: '/category-landing-pages', icon: 'Grid3X3' },
    { name: 'Ao Vivo', path: '/live-event-center', icon: 'Radio' },
  ];

  const moreMenuItems = [
    { name: 'Dashboard', path: '/administrative-dashboard', icon: 'BarChart3' },
    { name: 'Perfil', path: '/user-profile-hub', icon: 'User' },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-brand ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-brand-card' 
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link 
            to="/homepage" 
            className="flex items-center space-x-2 hover:opacity-80 transition-micro"
            onClick={closeMenu}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <span className="font-headline text-xl text-primary">
              EventHub Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-brand font-medium ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-brand font-medium text-text-secondary hover:text-primary hover:bg-muted">
                <Icon name="MoreHorizontal" size={18} />
                <span>Mais</span>
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-brand-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-brand">
                <div className="py-2">
                  {moreMenuItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center space-x-3 px-4 py-2 transition-brand ${
                        isActivePath(item?.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-text-secondary hover:text-primary hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="outline" size="sm">
              Entrar
            </Button>
            <Button variant="default" size="sm" className="bg-conversion-accent hover:bg-conversion-accent/90">
              Criar Evento
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-muted transition-brand"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <div className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-brand font-medium ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.name}</span>
                </Link>
              ))}

              <div className="border-t border-border pt-2 mt-2">
                {moreMenuItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-brand font-medium ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-secondary hover:text-primary hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-border pt-4 mt-4 space-y-2">
                <Button variant="outline" fullWidth onClick={closeMenu}>
                  Entrar
                </Button>
                <Button 
                  variant="default" 
                  fullWidth 
                  className="bg-conversion-accent hover:bg-conversion-accent/90"
                  onClick={closeMenu}
                >
                  Criar Evento
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;