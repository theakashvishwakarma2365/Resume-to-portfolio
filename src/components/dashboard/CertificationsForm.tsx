import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import { Plus, Trash2 } from 'lucide-react';

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
}

interface CertificationsFormProps {
  data: Certification[];
  onUpdate: (data: Certification[]) => void;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ data, onUpdate }) => {
  const [certifications, setCertifications] = useState<Certification[]>(data || []);

  useEffect(() => {
    onUpdate(certifications);
  }, [certifications, onUpdate]);

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now(),
      name: '',
      issuer: '',
      date: '',
      credentialId: ''
    };
    setCertifications([...certifications, newCertification]);
  };

  const updateCertification = (id: number, field: keyof Certification, value: string) => {
    setCertifications(certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const removeCertification = (id: number) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  return (
    <FormSection 
      title="Certifications"
      description="Add your professional certifications, licenses, and credentials."
    >
      <div className="space-y-8">
        {certifications.map((cert, index) => (
          <div key={cert.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">
                Certification #{index + 1}
              </h3>
              <button
                onClick={() => removeCertification(cert.id)}
                className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Certification Name *
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Amazon Web Services"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Issue Date
                </label>
                <input
                  type="text"
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="MM/YYYY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Credential ID
                </label>
                <input
                  type="text"
                  value={cert.credentialId}
                  onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Certificate ID or URL"
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={addCertification}
          className="w-full border-2 border-dashed border-white/30 rounded-xl py-8 px-4 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-colors flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
        >
          <Plus className="w-5 h-5" />
          Add Certification
        </button>
      </div>
    </FormSection>
  );
};

export default CertificationsForm;