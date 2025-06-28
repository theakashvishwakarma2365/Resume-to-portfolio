import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Palette } from 'lucide-react';
import { PortfolioService } from '../../lib/portfolioService';
import CustomizationPanel from '../../templates/CustomizationPanel';
import ModernProfessionalTemplate from '../../templates/ModernProfessionalTemplate';
import CreativePortfolioTemplate from '../../templates/CreativePortfolioTemplate';
import MinimalCleanTemplate from '../../templates/MinimalCleanTemplate';
import BusinessProfessionalTemplate from '../../templates/BusinessProfessionalTemplate';

interface TemplateSelectionStepProps {
  formData: any;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  onNext: () => void;
  onPrev: () => void;
  portfolioId: string | null;
}

const TemplateSelectionStep: React.FC<TemplateSelectionStepProps> = ({
  formData,
  selectedTemplate,
  setSelectedTemplate,
  onNext,
  onPrev,
  portfolioId
}) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [customizingTemplate, setCustomizingTemplate] = useState('');
  const [templateCustomizations, setTemplateCustomizations] = useState({});
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data, error } = await PortfolioService.getPortfolio();
        if (data && !error) {
          console.log('Loaded portfolio data:', data);
          setPortfolioData(data);
        } else {
          console.log('Using form data:', formData);
          setPortfolioData(formData);
        }
      } catch (error) {
        console.error('Error loading portfolio data:', error);
        setPortfolioData(formData);
      }
    };
    loadData();

    // Load saved customizations
    const savedCustomizations = localStorage.getItem('templateCustomizations');
    if (savedCustomizations) {
      try {
        setTemplateCustomizations(JSON.parse(savedCustomizations));
      } catch (error) {
        console.error('Error loading customizations:', error);
      }
    }
  }, [formData]);

  const templates = [
    {
      id: 'business',
      name: 'Business Professional',
      description: 'Executive-level template perfect for senior professionals and business leaders',
      features: ['Executive Design', 'Leadership Focus', 'Corporate Aesthetics', 'Professional Metrics'],
      component: BusinessProfessionalTemplate,
      category: 'Executive'
    },
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean and contemporary design with bold typography and smooth animations',
      features: ['Responsive Design', 'Professional Layout', 'Clean Aesthetics', 'Business Focused'],
      component: ModernProfessionalTemplate,
      category: 'Professional'
    },
    {
      id: 'creative',
      name: 'Creative Portfolio',
      description: 'Vibrant and artistic layout perfect for designers and creative professionals',
      features: ['Image Gallery', 'Custom Colors', 'Interactive Elements', 'Creative Layouts'],
      component: CreativePortfolioTemplate,
      category: 'Creative'
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Simple and elegant design with focus on typography and content',
      features: ['Typography Focus', 'Fast Loading', 'Print Friendly', 'Clean Aesthetics'],
      component: MinimalCleanTemplate,
      category: 'Minimal'
    }
  ];

  const handleTemplateSelect = async (templateId: string) => {
    setSelectedTemplate(templateId);
    
    // Save template selection to database
    if (portfolioId) {
      setIsSaving(true);
      try {
        await PortfolioService.savePortfolio({
          selected_template: templateId
        });
      } catch (error) {
        console.error('Error saving template selection:', error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleCustomizeTemplate = (templateId: string) => {
    setCustomizingTemplate(templateId);
    setShowCustomization(true);
  };

  const handleSaveCustomizations = (customizations: any) => {
    const newCustomizations = {
      ...templateCustomizations,
      [customizingTemplate]: customizations
    };
    
    setTemplateCustomizations(newCustomizations);
    
    // Save customizations to localStorage
    localStorage.setItem('templateCustomizations', JSON.stringify(newCustomizations));
  };

  const handleNext = async () => {
    if (selectedTemplate && portfolioId) {
      setIsSaving(true);
      try {
        await PortfolioService.savePortfolio({
          selected_template: selectedTemplate
        });
        onNext();
      } catch (error) {
        console.error('Error saving template selection:', error);
        onNext(); // Proceed anyway
      } finally {
        setIsSaving(false);
      }
    } else {
      onNext();
    }
  };

  // Transform form data to template format
  const transformDataForTemplate = (data: any) => {
    if (!data) return null;

    const personalInfo = data.personal_info || data.personalInfo || {};
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

  const transformedData = transformDataForTemplate(portfolioData);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Choose Your Template</h2>
        <p className="text-gray-300 text-lg">Select a design that best represents your professional style</p>
        {portfolioData && (
          <div className="mt-4 bg-green-500/20 border border-green-400/30 rounded-lg p-3">
            <p className="text-green-300 text-sm">
              ✓ Portfolio data loaded successfully - {Object.keys(portfolioData).filter(key => 
                portfolioData[key] && (Array.isArray(portfolioData[key]) ? portfolioData[key].length > 0 : portfolioData[key] !== '')
              ).length} sections completed
            </p>
          </div>
        )}
      </div>

      {/* Template Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`bg-white/10 backdrop-blur-md rounded-2xl border-2 transition-all duration-300 hover:bg-white/15 ${
              selectedTemplate === template.id ? 'border-blue-400 bg-blue-500/20' : 'border-white/20'
            }`}
          >
            {/* Template Preview */}
            <div className="p-6">
              {/* Preview Container */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6 overflow-hidden">
                <div className="w-full h-64 bg-white rounded-lg overflow-hidden shadow-lg">
                  {transformedData && (
                    <div className="h-full overflow-hidden">
                      <div className="scale-[0.25] origin-top-left w-[400%] h-[400%] overflow-hidden">
                        <template.component 
                          data={transformedData} 
                          customizations={templateCustomizations[template.id] || {}} 
                          selectedSection={selectedSection}
                          onSectionSelect={setSelectedSection}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Template Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                <p className="text-gray-300 mb-4">{template.description}</p>
                
                {/* Features */}
                <div className="space-y-2 mb-6">
                  {template.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      selectedTemplate === template.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                    }`}
                  >
                    {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
                  </button>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleCustomizeTemplate(template.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <Palette className="w-4 h-4" />
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
          onClick={handleNext}
          disabled={!selectedTemplate || isSaving}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 ${
            selectedTemplate && !isSaving
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Saving...
            </>
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Customization Panel */}
      <CustomizationPanel
        isOpen={showCustomization}
        onClose={() => setShowCustomization(false)}
        templateId={customizingTemplate}
        onSave={handleSaveCustomizations}
        currentCustomizations={templateCustomizations[customizingTemplate] || {}}
        previewData={transformedData}
        templateComponent={templates.find(t => t.id === customizingTemplate)?.component}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
    </div>
  );
};

export default TemplateSelectionStep;