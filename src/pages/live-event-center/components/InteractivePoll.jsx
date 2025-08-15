import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractivePoll = ({ isLive }) => {
  const [currentPoll, setCurrentPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Mock poll data
  const mockPolls = [
    {
      id: 1,
      question: "Qual foi a melhor manobra até agora?",
      options: [
        { id: 'a', text: 'Kickflip do Carlos', votes: 156 },
        { id: 'b', text: '360 da Ana', votes: 203 },
        { id: 'c', text: 'Grind do Pedro', votes: 89 },
        { id: 'd', text: 'Ollie da Maria', votes: 124 }
      ],
      totalVotes: 572,
      endTime: new Date(Date.now() + 120000), // 2 minutes from now
      isActive: true
    },
    {
      id: 2,
      question: "Que tipo de música vocês querem ouvir na próxima sessão?",
      options: [
        { id: 'a', text: 'Hip Hop Nacional', votes: 234 },
        { id: 'b', text: 'Rock Alternativo', votes: 187 },
        { id: 'c', text: 'Eletrônica', votes: 156 },
        { id: 'd', text: 'Reggae', votes: 98 }
      ],
      totalVotes: 675,
      endTime: new Date(Date.now() + 300000), // 5 minutes from now
      isActive: false
    }
  ];

  useEffect(() => {
    if (isLive) {
      setCurrentPoll(mockPolls?.[0]);
    }
  }, [isLive]);

  useEffect(() => {
    if (currentPoll && currentPoll?.isActive) {
      const timer = setInterval(() => {
        const now = new Date()?.getTime();
        const distance = currentPoll?.endTime?.getTime() - now;
        
        if (distance > 0) {
          setTimeLeft(Math.floor(distance / 1000));
        } else {
          setTimeLeft(0);
          setCurrentPoll(prev => ({ ...prev, isActive: false }));
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentPoll]);

  const handleVote = (optionId) => {
    if (hasVoted || !currentPoll?.isActive) return;
    
    setSelectedOption(optionId);
    setHasVoted(true);
    
    // Update vote count (mock)
    setCurrentPoll(prev => ({
      ...prev,
      options: prev?.options?.map(option => 
        option?.id === optionId 
          ? { ...option, votes: option?.votes + 1 }
          : option
      ),
      totalVotes: prev?.totalVotes + 1
    }));
  };

  const getPercentage = (votes, total) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  if (!isLive || !currentPoll) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center">
          <Icon name="BarChart3" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold text-foreground mb-2">Enquetes Interativas</h3>
          <p className="text-sm text-muted-foreground">
            As enquetes aparecerão aqui durante o evento ao vivo
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Enquete ao Vivo</h3>
          </div>
          {currentPoll?.isActive && (
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-warning font-medium">
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Poll Content */}
      <div className="p-4">
        <h4 className="font-medium text-foreground mb-4 leading-relaxed">
          {currentPoll?.question}
        </h4>

        <div className="space-y-3 mb-4">
          {currentPoll?.options?.map((option) => {
            const percentage = getPercentage(option?.votes, currentPoll?.totalVotes);
            const isSelected = selectedOption === option?.id;
            const showResults = hasVoted || !currentPoll?.isActive;

            return (
              <div key={option?.id} className="relative">
                <button
                  onClick={() => handleVote(option?.id)}
                  disabled={hasVoted || !currentPoll?.isActive}
                  className={`w-full text-left p-3 rounded-lg border transition-brand ${
                    isSelected && hasVoted
                      ? 'border-primary bg-primary/10'
                      : showResults
                      ? 'border-border bg-muted/50 cursor-default' :'border-border hover:border-primary hover:bg-muted/50 cursor-pointer'
                  } ${!currentPoll?.isActive ? 'opacity-75' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">
                      {option?.text}
                    </span>
                    {showResults && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          {option?.votes} votos
                        </span>
                        <span className="text-sm font-medium text-primary">
                          {percentage}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {showResults && (
                    <div className="mt-2">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Poll Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {currentPoll?.totalVotes?.toLocaleString('pt-BR')} votos totais
          </span>
          {hasVoted && (
            <div className="flex items-center space-x-1 text-success">
              <Icon name="CheckCircle" size={16} />
              <span>Voto registrado</span>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="mt-4 pt-4 border-t border-border">
          {currentPoll?.isActive ? (
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-success font-medium">Votação ativa</span>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Enquete encerrada
              </p>
              <Button variant="outline" size="sm">
                <Icon name="RefreshCw" size={16} className="mr-2" />
                Próxima Enquete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractivePoll;