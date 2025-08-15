import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveStreamPlayer = ({ event, isLive, viewerCount }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState('HD');

  const qualityOptions = ['4K', 'HD', 'SD', 'Auto'];

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    setVolume(e?.target?.value);
    if (e?.target?.value > 0) {
      setIsMuted(false);
    }
  };

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : 'aspect-video'}`}>
      {/* Video Player Area */}
      <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        {isLive ? (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-center text-white">
              <Icon name="Play" size={64} className="mx-auto mb-4 opacity-60" />
              <p className="text-lg font-medium">Transmissão ao Vivo</p>
              <p className="text-sm opacity-80">{event?.name}</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-white">
            <Icon name="Clock" size={48} className="mx-auto mb-4 opacity-60" />
            <p className="text-lg font-medium">Aguardando Transmissão</p>
            <p className="text-sm opacity-80">Evento inicia em breve</p>
          </div>
        )}

        {/* Live Indicator */}
        {isLive && (
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <div className="flex items-center space-x-2 bg-error px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">AO VIVO</span>
            </div>
            <div className="bg-black/50 px-3 py-1 rounded-full text-white text-sm">
              <Icon name="Eye" size={14} className="inline mr-1" />
              {viewerCount?.toLocaleString('pt-BR')}
            </div>
          </div>
        )}

        {/* Player Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={toggleMute}
              >
                <Icon name={isMuted ? "VolumeX" : "Volume2"} size={20} />
              </Button>
              
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-lg appearance-none slider"
                />
                <span className="text-white text-sm w-8">{isMuted ? 0 : volume}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={quality}
                onChange={(e) => setQuality(e?.target?.value)}
                className="bg-black/50 text-white text-sm rounded px-2 py-1 border border-white/20"
              >
                {qualityOptions?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={toggleFullscreen}
              >
                <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Fullscreen Exit Button */}
      {isFullscreen && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20"
          onClick={toggleFullscreen}
        >
          <Icon name="X" size={24} />
        </Button>
      )}
    </div>
  );
};

export default LiveStreamPlayer;