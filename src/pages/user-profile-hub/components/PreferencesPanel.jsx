import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const PreferencesPanel = ({ preferences, onUpdatePreferences }) => {
  const [activeSection, setActiveSection] = useState('notifications');
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const sections = [
    { id: 'notifications', label: 'Notificações', icon: 'Bell' },
    { id: 'privacy', label: 'Privacidade', icon: 'Shield' },
    { id: 'discovery', label: 'Descoberta', icon: 'Compass' },
    { id: 'social', label: 'Social', icon: 'Users' }
  ];

  const handleSave = () => {
    onUpdatePreferences(localPreferences);
  };

  const updatePreference = (section, key, value) => {
    setLocalPreferences(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [key]: value
      }
    }));
  };

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-text-primary mb-3">
          Notificações de Eventos
        </h3>
        <div className="space-y-3">
          <Checkbox
            label="Novos eventos nas minhas categorias favoritas"
            checked={localPreferences?.notifications?.newEvents}
            onChange={(e) => updatePreference('notifications', 'newEvents', e?.target?.checked)}
          />
          <Checkbox
            label="Lembretes de eventos próximos"
            checked={localPreferences?.notifications?.eventReminders}
            onChange={(e) => updatePreference('notifications', 'eventReminders', e?.target?.checked)}
          />
          <Checkbox
            label="Eventos dos organizadores que sigo"
            checked={localPreferences?.notifications?.followedOrganizers}
            onChange={(e) => updatePreference('notifications', 'followedOrganizers', e?.target?.checked)}
          />
        </div>
      </div>

      <div>
        <h3 className="font-medium text-text-primary mb-3">
          Notificações Sociais
        </h3>
        <div className="space-y-3">
          <Checkbox
            label="Novos seguidores"
            checked={localPreferences?.notifications?.newFollowers}
            onChange={(e) => updatePreference('notifications', 'newFollowers', e?.target?.checked)}
          />
          <Checkbox
            label="Amigos participando de eventos"
            checked={localPreferences?.notifications?.friendsEvents}
            onChange={(e) => updatePreference('notifications', 'friendsEvents', e?.target?.checked)}
          />
          <Checkbox
            label="Menções e comentários"
            checked={localPreferences?.notifications?.mentions}
            onChange={(e) => updatePreference('notifications', 'mentions', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-text-primary mb-3">
          Visibilidade do Perfil
        </h3>
        <div className="space-y-3">
          <Checkbox
            label="Perfil público (visível para todos)"
            checked={localPreferences?.privacy?.publicProfile}
            onChange={(e) => updatePreference('privacy', 'publicProfile', e?.target?.checked)}
          />
          <Checkbox
            label="Mostrar eventos que participei"
            checked={localPreferences?.privacy?.showAttendedEvents}
            onChange={(e) => updatePreference('privacy', 'showAttendedEvents', e?.target?.checked)}
          />
          <Checkbox
            label="Mostrar lista de seguidores"
            checked={localPreferences?.privacy?.showFollowers}
            onChange={(e) => updatePreference('privacy', 'showFollowers', e?.target?.checked)}
          />
        </div>
      </div>

      <div>
        <h3 className="font-medium text-text-primary mb-3">
          Compartilhamento
        </h3>
        <div className="space-y-3">
          <Checkbox
            label="Permitir que amigos me encontrem por email"
            checked={localPreferences?.privacy?.findByEmail}
            onChange={(e) => updatePreference('privacy', 'findByEmail', e?.target?.checked)}
          />
          <Checkbox
            label="Compartilhar automaticamente no Instagram"
            checked={localPreferences?.privacy?.autoShareInstagram}
            onChange={(e) => updatePreference('privacy', 'autoShareInstagram', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderDiscoverySettings = () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-text-primary mb-3">
          Algoritmo de Recomendação
        </h3>
        <div className="space-y-3">
          <Checkbox
            label="Baseado no meu histórico de eventos"
            checked={localPreferences?.discovery?.useHistory}
            onChange={(e) => updatePreference('discovery', 'useHistory', e?.target?.checked)}
          />
          <Checkbox
            label="Baseado nos meus amigos"
            checked={localPreferences?.discovery?.useFriends}
            onChange={(e) => updatePreference('discovery', 'useFriends', e?.target?.checked)}
          />
          <Checkbox
            label="Incluir eventos em outras cidades"
            checked={localPreferences?.discovery?.includeOtherCities}
            onChange={(e) => updatePreference('discovery', 'includeOtherCities', e?.target?.checked)}
          />
        </div>
      </div>

      <div>
        <h3 className="font-medium text-text-primary mb-3">
          Distância Máxima
        </h3>
        <Input
          type="number"
          label="Raio de busca (km)"
          value={localPreferences?.discovery?.maxDistance}
          onChange={(e) => updatePreference('discovery', 'maxDistance', e?.target?.value)}
          className="max-w-xs"
        />
      </div>
    </div>
  );

  const renderSocialSettings = () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-text-primary mb-3">
          Conexões Sociais
        </h3>
        <div className="space-y-3">
          <Checkbox
            label="Permitir que outros me sigam"
            checked={localPreferences?.social?.allowFollowers}
            onChange={(e) => updatePreference('social', 'allowFollowers', e?.target?.checked)}
          />
          <Checkbox
            label="Mostrar quando estou online"
            checked={localPreferences?.social?.showOnlineStatus}
            onChange={(e) => updatePreference('social', 'showOnlineStatus', e?.target?.checked)}
          />
          <Checkbox
            label="Receber mensagens de desconhecidos"
            checked={localPreferences?.social?.allowMessages}
            onChange={(e) => updatePreference('social', 'allowMessages', e?.target?.checked)}
          />
        </div>
      </div>

      <div>
        <h3 className="font-medium text-text-primary mb-3">
          Integração com Redes Sociais
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Icon name="Instagram" size={20} className="text-pink-500" />
              <div>
                <div className="font-medium text-text-primary">Instagram</div>
                <div className="text-sm text-text-secondary">
                  {localPreferences?.social?.instagramConnected ? 'Conectado' : 'Não conectado'}
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              {localPreferences?.social?.instagramConnected ? 'Desconectar' : 'Conectar'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Icon name="MessageCircle" size={20} className="text-green-500" />
              <div>
                <div className="font-medium text-text-primary">WhatsApp</div>
                <div className="text-sm text-text-secondary">
                  {localPreferences?.social?.whatsappConnected ? 'Conectado' : 'Não conectado'}
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              {localPreferences?.social?.whatsappConnected ? 'Desconectar' : 'Conectar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (activeSection) {
      case 'notifications': return renderNotificationSettings();
      case 'privacy': return renderPrivacySettings();
      case 'discovery': return renderDiscoverySettings();
      case 'social': return renderSocialSettings();
      default: return null;
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-brand-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-value-prop text-xl text-text-primary">
          Configurações
        </h2>
        <Button variant="default" onClick={handleSave}>
          Salvar Alterações
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Section Navigation */}
        <div className="lg:w-1/4">
          <div className="space-y-1">
            {sections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => setActiveSection(section?.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-brand text-left ${
                  activeSection === section?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-primary hover:bg-muted'
                }`}
              >
                <Icon name={section?.icon} size={18} />
                <span className="font-medium">{section?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section Content */}
        <div className="lg:w-3/4">
          <div className="min-h-[400px]">
            {renderCurrentSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesPanel;