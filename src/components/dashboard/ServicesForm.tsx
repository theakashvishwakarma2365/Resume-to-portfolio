import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import { Plus, Trash2, X } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  price: string;
}

interface ServicesFormProps {
  data: Service[];
  onUpdate: (data: Service[]) => void;
}

const ServicesForm: React.FC<ServicesFormProps> = ({ data, onUpdate }) => {
  const [services, setServices] = useState<Service[]>(data || []);

  useEffect(() => {
    onUpdate(services);
  }, [services, onUpdate]);

  const addService = () => {
    const newService: Service = {
      id: Date.now(),
      title: '',
      description: '',
      features: [],
      price: ''
    };
    setServices([...services, newService]);
  };

  const updateService = (id: number, field: keyof Service, value: string | string[]) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, [field]: value } : service
    ));
  };

  const addFeature = (id: number, feature: string) => {
    if (feature.trim()) {
      const service = services.find(s => s.id === id);
      if (service) {
        updateService(id, 'features', [...(service.features ?? []), feature.trim()]);
      }
    }
  };

  const removeFeature = (serviceId: number, featureIndex: number) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      updateService(serviceId, 'features', (service.features ?? []).filter((_, index) => index !== featureIndex));
    }
  };

  const removeService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <FormSection 
      title="Services"
      description="Add the services you offer to potential clients or employers."
    >
      <div className="space-y-8">
        {services.map((service, index) => (
          <div key={service.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">
                Service #{index + 1}
              </h3>
              <button
                onClick={() => removeService(service.id)}
                className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Service Title *
                </label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => updateService(service.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Web Development"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Price
                </label>
                <input
                  type="text"
                  value={service.price}
                  onChange={(e) => updateService(service.id, 'price', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="$500 - $2000"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Description *
              </label>
              <textarea
                value={service.description}
                onChange={(e) => updateService(service.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Describe what this service includes and how it benefits clients..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Features Included
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {(service.features ?? []).map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-400/30"
                  >
                    {feature}
                    <button
                      onClick={() => removeFeature(service.id, featureIndex)}
                      className="hover:bg-green-400/30 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a feature and press Enter"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      addFeature(service.id, input.value);
                      input.value = '';
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                    addFeature(service.id, input.value);
                    input.value = '';
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={addService}
          className="w-full border-2 border-dashed border-white/30 rounded-xl py-8 px-4 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-colors flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>
    </FormSection>
  );
};

export default ServicesForm;