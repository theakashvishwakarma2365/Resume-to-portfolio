import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Monitor, Tablet, Smartphone, ExternalLink, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BusinessProfessionalTemplate from '../../templates/BusinessProfessionalTemplate';
import ModernProfessionalTemplate from '../../templates/ModernProfessionalTemplate';
import CreativePortfolioTemplate from '../../templates/CreativePortfolioTemplate';
import MinimalCleanTemplate from '../../templates/MinimalCleanTemplate';

interface PreviewStepProps {
  formData: any;
  selectedTemplate: string;
  onNext: () => void;
  onPrev: () => void;
}

const PreviewStep: React.FC<PreviewStepProps> = ({
  formData,
  selectedTemplate,
  onNext,
  onPrev
}) => {
  const [viewMode, setViewMode] = useState('desktop');
  const navigate = useNavigate();

  const templates = {
    business: BusinessProfessionalTemplate,
    modern: ModernProfessionalTemplate,
    creative: CreativePortfolioTemplate,
    minimal: MinimalCleanTemplate
  };

  const viewModes = [
    { id: 'desktop', name: 'Desktop', icon: Monitor, width: 'w-full', height: 'min-h-[800px]' },
    { id: 'tablet', name: 'Tablet', icon: Tablet, width: 'w-[768px]', height: 'h-[1024px]' },
    { id: 'mobile', name: 'Mobile', icon: Smartphone, width: 'w-[375px]', height: 'h-[812px]' }
  ];

  const currentViewMode = viewModes.find(mode => mode.id === viewMode) || viewModes[0];

  // Transform form data to template format with all sections
  const transformDataForTemplate = (data: any) => {
    if (!data) return null;

    const personalInfo = data.personalInfo || {};
    const experience = data.experience || [];
    const education = data.education || [];
    const skills = data.skills || [];
    const projects = data.projects || [];
    const services = data.services || [];
    const certifications = data.certifications || [];
    const languages = data.languages || [];
    const research = data.research || [];
    const achievements = data.achievements || [];

    return {
      personalInfo: {
        fullName: personalInfo.fullName || 'Your Name',
        title: personalInfo.title || 'Your Professional Title',
        email: personalInfo.email || 'your.email@example.com',
        phone: personalInfo.phone || '+1 (555) 123-4567',
        location: personalInfo.address || personalInfo.location || 'Your Location',
        bio: data.summary || personalInfo.bio || 'Your professional summary will appear here.',
        avatar: personalInfo.avatar || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
        tagline: personalInfo.tagline || '',
        availability: personalInfo.availability || 'Available',
        yearsExperience: personalInfo.yearsExperience || '',
        specialization: personalInfo.specialization || '',
        socialLinks: {
          linkedin: personalInfo.linkedin || '',
          github: personalInfo.github || '',
          website: personalInfo.website || '',
          twitter: personalInfo.twitter || '',
          youtube: personalInfo.youtube || ''
        }
      },
      experiences: experience.map((exp: any) => ({
        id: exp.id || Date.now().toString(),
        role: exp.jobTitle || exp.role || 'Job Title',
        company: exp.company || 'Company Name',
        location: exp.location || 'Location',
        startDate: exp.startDate || '2020',
        endDate: exp.endDate || 'Present',
        description: Array.isArray(exp.description) ? exp.description : [exp.description || 'Job description will appear here.'],
        technologies: exp.technologies || [],
        achievements: exp.achievements || [],
        employmentType: exp.employmentType || 'Full-time',
        salary: exp.salary || '',
        companyLogo: exp.companyLogo || '',
        companyWebsite: exp.companyWebsite || ''
      })),
      education: education.map((edu: any) => ({
        id: edu.id || Date.now().toString(),
        degree: edu.degree || 'Degree',
        institution: edu.institution || 'Institution',
        location: edu.location || 'Location',
        startDate: edu.startDate || '2016',
        endDate: edu.endDate || '2020',
        description: edu.description || 'Education description',
        gpa: edu.gpa || '',
        fieldOfStudy: edu.fieldOfStudy || '',
        honors: edu.honors || [],
        relevantCoursework: edu.relevantCoursework || [],
        thesis: edu.thesis || '',
        advisor: edu.advisor || '',
        institutionLogo: edu.institutionLogo || '',
        institutionWebsite: edu.institutionWebsite || ''
      })),
      projects: projects.map((project: any) => ({
        id: project.id || Date.now().toString(),
        title: project.name || project.title || 'Project Title',
        description: project.description || 'Project description',
        image: project.image || "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
        technologies: project.technologies || [],
        liveUrl: project.link || project.liveUrl || '#',
        githubUrl: project.githubUrl || '#',
        featured: project.featured || false,
        status: project.status || 'Completed',
        duration: project.duration || '',
        teamSize: project.teamSize || '1',
        role: project.role || '',
        challenges: project.challenges || [],
        achievements: project.achievements || [],
        demoVideo: project.demoVideo || '',
        category: project.category || 'Web Development'
      })),
      skills: skills.map((skillGroup: any) => ({
        category: skillGroup.category || 'Skills',
        items: skillGroup.items || []
      })),
      services: services.map((service: any) => ({
        id: service.id || Date.now().toString(),
        title: service.title || 'Service Title',
        description: service.description || 'Service description',
        features: service.features || [],
        price: service.price || ''
      })),
      certifications: certifications.map((cert: any) => ({
        id: cert.id || Date.now().toString(),
        name: cert.name || 'Certification Name',
        issuer: cert.issuer || 'Issuing Organization',
        date: cert.date || '',
        credentialId: cert.credentialId || ''
      })),
      languages: languages.map((lang: any) => ({
        id: lang.id || Date.now().toString(),
        name: lang.name || 'Language',
        proficiency: lang.proficiency || 'Intermediate'
      })),
      research: research.map((paper: any) => ({
        id: paper.id || Date.now().toString(),
        title: paper.title || 'Research Title',
        publication: paper.publication || 'Publication',
        conference: paper.conference || '',
        year: paper.year || '',
        description: paper.description || paper.abstract || 'Research description',
        link: paper.link || '#',
        doi: paper.doi || '',
        citations: paper.citations || '',
        coAuthors: paper.coAuthors || [],
        status: paper.status || 'Published',
        researchArea: paper.researchArea || '',
        guidance: paper.guidance || ''
      })),
      achievements: achievements.map((achievement: any) => ({
        id: achievement.id || Date.now().toString(),
        title: achievement.title || 'Achievement Title',
        description: achievement.description || 'Achievement description',
        date: achievement.date || ''
      }))
    };
  };

  const transformedData = transformDataForTemplate(formData);
  const TemplateComponent = templates[selectedTemplate as keyof typeof templates] || BusinessProfessionalTemplate;

  // Check if we have enough data to show a meaningful preview
  const hasMinimalData = transformedData && transformedData.personalInfo && transformedData.personalInfo.fullName !== 'Your Name';

  const handleFullPreview = () => {
    // Navigate to full preview page
    navigate('/preview', { 
      state: { 
        formData: formData, 
        selectedTemplate: selectedTemplate,
        customizations: {}
      } 
    });
  };

  const handleGoBackToForm = () => {
    onPrev();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Preview Your Portfolio</h2>
        <p className="text-gray-300 text-lg">See how your portfolio looks across different devices</p>
        {!hasMinimalData && (
          <div className="mt-4 bg-orange-500/20 border border-orange-400/30 rounded-lg p-3">
            <p className="text-orange-300 text-sm">
              ⚠️ Please fill out at least your personal information to see a meaningful preview
            </p>
          </div>
        )}
      </div>

      {hasMinimalData && (
        <>
          {/* Device Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/20">
              {viewModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    viewMode === mode.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <mode.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{mode.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Preview Container */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
            <div className="flex justify-center overflow-auto">
              <div
                className={
                  viewMode === 'desktop'
                    ? 'w-full max-w-5xl min-h-[800px] bg-white rounded-lg shadow-2xl overflow-hidden mx-auto border border-gray-200'
                    : viewMode === 'tablet'
                    ? 'w-[768px] min-h-[1024px] bg-white rounded-lg shadow-2xl overflow-hidden mx-auto border border-gray-200'
                    : 'w-[375px] min-h-[812px] bg-white rounded-lg shadow-2xl overflow-hidden mx-auto border border-gray-200'
                }
                style={{ transition: 'width 0.3s, minHeight 0.3s' }}
              >
                <div className="h-full overflow-y-auto">
                  <TemplateComponent data={transformedData} customizations={{}} />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Actions */}
          <div className="text-center mb-8">
            <button 
              onClick={handleFullPreview}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
            >
              <ExternalLink className="w-4 h-4" />
              Open Full Preview
            </button>
          </div>
        </>
      )}

      {/* No Data State */}
      {!hasMinimalData && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 mb-8 text-center">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Monitor className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">No Data to Preview</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            To see a preview of your portfolio, please go back and fill out at least your personal information 
            including your name and contact details.
          </p>
          <button 
            onClick={handleGoBackToForm}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back to Form
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!hasMinimalData}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
            hasMinimalData
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          Publish Portfolio
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Help Text */}
      {!hasMinimalData && (
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Complete at least the personal information section to enable portfolio publishing
          </p>
        </div>
      )}
    </div>
  );
};

export default PreviewStep;