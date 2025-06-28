import React from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, description, children }) => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
        {description && (
          <p className="text-gray-300 leading-relaxed text-lg">{description}</p>
        )}
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        {children}
      </div>
    </div>
  );
};

export default FormSection;