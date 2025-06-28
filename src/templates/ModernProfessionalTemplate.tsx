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

interface ModernProfessionalTemplateProps {
  data: PortfolioData;
  customizations?: any;
}

const ModernProfessionalTemplate: React.FC<ModernProfessionalTemplateProps> = ({ data, customizations = {} }) => {
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Modern Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <img
              src={data.personalInfo.avatar || "/api/placeholder/200/200"}
              alt={data.personalInfo.fullName}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-xl"
            />
            <h1 className="text-5xl font-bold mb-4">{data.personalInfo.fullName}</h1>
            <h2 className="text-2xl text-purple-200 mb-6">{data.personalInfo.title}</h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed">
              {data.personalInfo.bio}
            </p>
          </div>
        </div>
      </header>

      {/* Content sections would go here */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Modern Professional Template</h3>
            <p className="text-gray-400">This template is under development.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernProfessionalTemplate;
