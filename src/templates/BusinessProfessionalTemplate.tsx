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

interface BusinessProfessionalTemplateProps {
  data: PortfolioData;
  customizations?: any;
}

const BusinessProfessionalTemplate: React.FC<BusinessProfessionalTemplateProps> = ({ data, customizations = {} }) => {
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
      {/* Header/Hero Section */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <img
                src={data.personalInfo.avatar || "/api/placeholder/300/300"}
                alt={data.personalInfo.fullName}
                className="w-64 h-64 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
              />
            </div>
            <div className="md:w-2/3 md:pl-12 text-center md:text-left">
              <h1 className="text-5xl font-bold mb-4">{data.personalInfo.fullName}</h1>
              <h2 className="text-2xl text-blue-200 mb-6">{data.personalInfo.title}</h2>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                {data.personalInfo.bio}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="text-blue-200">
                  <span className="font-semibold">Email:</span> {data.personalInfo.email}
                </div>
                <div className="text-blue-200">
                  <span className="font-semibold">Phone:</span> {data.personalInfo.phone}
                </div>
                <div className="text-blue-200">
                  <span className="font-semibold">Location:</span> {data.personalInfo.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Experience Section */}
      {data.experiences && data.experiences.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Professional Experience</h2>
            <div className="space-y-8">
              {data.experiences.map((exp, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                      <h4 className="text-lg text-blue-600 font-semibold">{exp.company}</h4>
                    </div>
                    <div className="text-gray-600">
                      <span>{exp.startDate} - {exp.endDate}</span>
                      <div className="text-sm">{exp.location}</div>
                    </div>
                  </div>
                  <div className="text-gray-700">
                    {Array.isArray(exp.description) ? (
                      <ul className="list-disc list-inside space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{exp.description}</p>
                    )}
                  </div>
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.projects.map((project, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={project.image || "/api/placeholder/400/250"}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-4">
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-800 font-semibold"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Skills & Technologies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.skills.map((skillGroup, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Education</h2>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                      <h4 className="text-lg text-blue-600 font-semibold">{edu.institution}</h4>
                    </div>
                    <div className="text-gray-600">
                      <span>{edu.startDate} - {edu.endDate}</span>
                      <div className="text-sm">{edu.location}</div>
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700">{edu.description}</p>
                  )}
                  {edu.gpa && (
                    <p className="text-gray-600 mt-2">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div>
              <span className="font-semibold">Email:</span> {data.personalInfo.email}
            </div>
            <div>
              <span className="font-semibold">Phone:</span> {data.personalInfo.phone}
            </div>
            <div>
              <span className="font-semibold">Location:</span> {data.personalInfo.location}
            </div>
          </div>
          {data.personalInfo.socialLinks && (
            <div className="flex justify-center gap-6">
              {data.personalInfo.socialLinks.linkedin && (
                <a
                  href={data.personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  LinkedIn
                </a>
              )}
              {data.personalInfo.socialLinks.github && (
                <a
                  href={data.personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  GitHub
                </a>
              )}
              {data.personalInfo.socialLinks.website && (
                <a
                  href={data.personalInfo.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300"
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default BusinessProfessionalTemplate;
