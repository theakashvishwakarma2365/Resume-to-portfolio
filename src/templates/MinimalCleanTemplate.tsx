import React from 'react';

interface PortfolioData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    avatar: string;
    socialLinks?: {
      linkedin?: string;
      github?: string;
      website?: string;
      twitter?: string;
      youtube?: string;
    };
  };
  experiences: any[];
  education: any[];
  projects: any[];
  skills: any[];
  services: any[];
  certifications: any[];
  languages: any[];
  research: any[];
  achievements: any[];
}

interface MinimalCleanTemplateProps {
  data: PortfolioData;
  customizations?: any;
}

const MinimalCleanTemplate: React.FC<MinimalCleanTemplateProps> = ({ data, customizations = {} }) => {
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">No Data Available</h2>
          <p className="text-gray-500">Please provide portfolio data to render the template.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="py-16 border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src={data.personalInfo.avatar || "/api/placeholder/150/150"}
              alt={data.personalInfo.fullName}
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-light text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
              <h2 className="text-xl text-gray-600 mb-4">{data.personalInfo.title}</h2>
              <p className="text-gray-700 leading-relaxed max-w-2xl">
                {data.personalInfo.bio}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content sections would go here */}
      <div className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center">
            <h3 className="text-2xl font-light mb-4 text-gray-800">Minimal Clean Template</h3>
            <p className="text-gray-600">This template is under development.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalCleanTemplate;
