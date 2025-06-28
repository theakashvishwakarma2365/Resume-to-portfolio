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

interface CreativePortfolioTemplateProps {
  data: PortfolioData;
  customizations?: any;
}

const CreativePortfolioTemplate: React.FC<CreativePortfolioTemplateProps> = ({ data, customizations = {} }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500">
      {/* Creative Header */}
      <header className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <div className="mb-8">
              <img
                src={data.personalInfo.avatar || "/api/placeholder/250/250"}
                alt={data.personalInfo.fullName}
                className="w-40 h-40 rounded-full object-cover mx-auto border-8 border-white shadow-2xl"
              />
            </div>
            <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">{data.personalInfo.fullName}</h1>
            <h2 className="text-3xl text-orange-100 mb-6 drop-shadow">{data.personalInfo.title}</h2>
            <p className="text-xl text-orange-50 max-w-3xl mx-auto leading-relaxed drop-shadow">
              {data.personalInfo.bio}
            </p>
          </div>
        </div>
      </header>

      {/* Content sections would go here */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Creative Portfolio Template</h3>
            <p className="text-gray-600">This template is under development.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativePortfolioTemplate;
