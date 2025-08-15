import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RegistrationFlow = ({ event, isOpen, onClose, onRegister }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ticketType: '',
    quantity: 1,
    name: '',
    email: '',
    phone: '',
    paymentMethod: ''
  });

  const ticketTypes = [
    { value: 'individual', label: 'Individual - R$ 89,00', price: 89 },
    { value: 'vip', label: 'VIP - R$ 149,00', price: 149 },
    { value: 'group', label: 'Grupo (4 pessoas) - R$ 299,00', price: 299 }
  ];

  const paymentMethods = [
    { value: 'pix', label: 'PIX - Aprovação instantânea' },
    { value: 'credit', label: 'Cartão de Crédito' },
    { value: 'debit', label: 'Cartão de Débito' },
    { value: 'boleto', label: 'Boleto Bancário' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    const selectedTicket = ticketTypes?.find(t => t?.value === formData?.ticketType);
    return selectedTicket ? selectedTicket?.price * formData?.quantity : 0;
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onRegister(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-brand-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Garantir Ingresso</h2>
            <p className="text-text-secondary">{event?.title}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-micro"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center space-x-4">
            {[1, 2, 3]?.map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-text-secondary'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step > stepNumber ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-primary' : 'text-text-secondary'}>
              Ingressos
            </span>
            <span className={step >= 2 ? 'text-primary' : 'text-text-secondary'}>
              Dados
            </span>
            <span className={step >= 3 ? 'text-primary' : 'text-text-secondary'}>
              Pagamento
            </span>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Selecione seu ingresso
                </h3>
                <div className="space-y-4">
                  {ticketTypes?.map((ticket) => (
                    <div
                      key={ticket?.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-brand ${
                        formData?.ticketType === ticket?.value
                          ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleInputChange('ticketType', ticket?.value)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-foreground">
                            {ticket?.label?.split(' - ')?.[0]}
                          </div>
                          <div className="text-sm text-text-secondary">
                            Acesso completo ao evento
                          </div>
                        </div>
                        <div className="text-lg font-bold text-primary">
                          R$ {ticket?.price?.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quantidade
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleInputChange('quantity', Math.max(1, formData?.quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-micro"
                  >
                    <Icon name="Minus" size={16} />
                  </button>
                  <span className="text-lg font-semibold text-foreground w-8 text-center">
                    {formData?.quantity}
                  </span>
                  <button
                    onClick={() => handleInputChange('quantity', Math.min(10, formData?.quantity + 1))}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-micro"
                  >
                    <Icon name="Plus" size={16} />
                  </button>
                </div>
              </div>

              {formData?.ticketType && (
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total:</span>
                    <span className="text-2xl font-bold text-primary">
                      R$ {calculateTotal()?.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Seus dados
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nome completo"
                  type="text"
                  placeholder="Digite seu nome"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  required
                />
                
                <Input
                  label="E-mail"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  required
                />
              </div>

              <Input
                label="Telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                required
              />

              {/* Social Login Options */}
              <div className="space-y-3">
                <div className="text-center text-text-secondary text-sm">
                  ou faça login com
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full" iconName="Mail">
                    Google
                  </Button>
                  <Button variant="outline" className="w-full" iconName="Facebook">
                    Facebook
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Forma de pagamento
              </h3>

              <Select
                label="Método de pagamento"
                options={paymentMethods}
                value={formData?.paymentMethod}
                onChange={(value) => handleInputChange('paymentMethod', value)}
                placeholder="Selecione uma opção"
                required
              />

              {/* Order Summary */}
              <div className="bg-muted rounded-lg p-6 space-y-4">
                <h4 className="font-semibold text-foreground">Resumo do pedido</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Ingresso</span>
                    <span className="text-foreground">
                      {ticketTypes?.find(t => t?.value === formData?.ticketType)?.label?.split(' - ')?.[0]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Quantidade</span>
                    <span className="text-foreground">{formData?.quantity}x</span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        R$ {calculateTotal()?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Pagamento 100% seguro e protegido</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex space-x-3">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Voltar
              </Button>
            )}
          </div>
          <div className="flex space-x-3">
            {step < 3 ? (
              <Button
                variant="default"
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData?.ticketType) ||
                  (step === 2 && (!formData?.name || !formData?.email || !formData?.phone))
                }
              >
                Continuar
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleSubmit}
                disabled={!formData?.paymentMethod}
                className="bg-conversion-accent hover:bg-conversion-accent/90"
              >
                Finalizar Compra
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationFlow;