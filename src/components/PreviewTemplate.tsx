import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PortfolioService } from '../lib/portfolioService';
import ModernProfessionalTemplate from '../templates/ModernProfessionalTemplate';
import CreativePortfolioTemplate from '../templates/CreativePortfolioTemplate';
import MinimalCleanTemplate from '../templates/MinimalCleanTemplate';
import BusinessProfessionalTemplate from '../templates/BusinessProfessionalTemplate';
import { 
  ArrowLeft, 
  Download,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  X,
  Home,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const PreviewTemplate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('business');
  const [customizations, setCustomizations] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const templates = [
    { id: 'business', name: 'Business Professional' },
    { id: 'modern', name: 'Modern Professional' },
    { id: 'creative', name: 'Creative Portfolio' },
    { id: 'minimal', name: 'Minimal Clean' }
  ];

  const templateComponents = {
    modern: ModernProfessionalTemplate,
    creative: CreativePortfolioTemplate,
    minimal: MinimalCleanTemplate,
    business: BusinessProfessionalTemplate
  };

  useEffect(() => {
    loadPortfolioData();
  }, [location]);

  const loadPortfolioData = async () => {
    setIsLoading(true);
    try {
      let data = null;
      let template = 'business';
      let templateCustomizations = {};

      // 1. From route state (if navigated from dashboard)
      if (location.state?.formData) {
        data = location.state.formData;
        template = location.state.selectedTemplate || 'business';
        templateCustomizations = location.state.customizations || {};
      }
      
      // 2. From localStorage (if opened in new tab from template selection)
      if (!data) {
        const previewData = localStorage.getItem('previewData');
        if (previewData) {
          const parsed = JSON.parse(previewData);
          data = parsed.data;
          template = parsed.template || 'business';
          templateCustomizations = parsed.customizations || {};
        }
      }

      // 3. From database (fallback)
      if (!data) {
        const { data: dbData, error } = await PortfolioService.getPortfolio();
        if (dbData && !error) {
          data = dbData;
          template = dbData.selected_template || 'business';
        }
      }

      // 4. Load saved customizations
      const savedCustomizations = localStorage.getItem('templateCustomizations');
      if (savedCustomizations) {
        const parsed = JSON.parse(savedCustomizations);
        templateCustomizations = { ...templateCustomizations, ...parsed[template] };
      }

      setPortfolioData(data);
      setSelectedTemplate(template);
      setCustomizations(templateCustomizations);
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadResume = () => {
    if (!portfolioData) return;

    // Create a comprehensive text-based resume
    const personalInfo = portfolioData.personal_info || portfolioData.personalInfo || {};
    const experience = portfolioData.experience || [];
    const education = portfolioData.education || [];
    const skills = portfolioData.skills || [];
    const projects = portfolioData.projects || [];

    const resumeContent = `
${personalInfo.fullName || 'Your Name'}
${personalInfo.email || ''} | ${personalInfo.phone || ''} | ${personalInfo.address || personalInfo.location || ''}
${personalInfo.linkedin ? `LinkedIn: ${personalInfo.linkedin}` : ''}
${personalInfo.github ? `GitHub: ${personalInfo.github}` : ''}
${personalInfo.website ? `Website: ${personalInfo.website}` : ''}

PROFESSIONAL SUMMARY
${portfolioData.summary || 'No summary provided'}

EXPERIENCE
${experience.map((exp: any) => `
${exp.jobTitle || exp.role || 'Job Title'} at ${exp.company || 'Company'} (${exp.startDate || 'Start'} - ${exp.endDate || 'End'})
${exp.location || ''}
${exp.description || ''}
`).join('\n') || 'No experience added'}

EDUCATION
${education.map((edu: any) => `
${edu.degree || 'Degree'} - ${edu.institution || 'Institution'} (${edu.startDate || 'Start'} - ${edu.endDate || 'End'})
${edu.location || ''} ${edu.gpa ? `GPA: ${edu.gpa}` : ''}
`).join('\n') || 'No education added'}

SKILLS
${skills.map((skillCategory: any) => `
${skillCategory.category || 'Category'}: ${skillCategory.items?.join(', ') || ''}
`).join('\n') || 'No skills added'}

PROJECTS
${projects.map((project: any) => `
${project.name || project.title || 'Project'} ${project.duration ? `(${project.duration})` : ''}
${project.description || ''}
Technologies: ${project.technologies?.join(', ') || ''}
${project.link ? `Link: ${project.link}` : ''}
`).join('\n') || 'No projects added'}
    `.trim();

    // Create and download the text file
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personalInfo.fullName || 'portfolio'}-resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getViewModeClass = () => {
    if (isFullscreen) return 'w-full h-full';
    
    switch (viewMode) {
      case 'desktop':
        return 'w-full max-w-none h-[600px]';
      case 'tablet':
        return 'w-[768px] h-[600px] mx-auto';
      case 'mobile':
        return 'w-[375px] h-[600px] mx-auto';
      default:
        return 'w-full max-w-none h-[600px]';
    }
  };

  // Transform data to template format - only show actual input data
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

    // Only include sections that have actual data
    const transformedData: any = {};

    // Personal info - always include if we have at least a name
    if (personalInfo.fullName) {
      transformedData.personalInfo = {
        fullName: personalInfo.fullName,
        title: personalInfo.title || '',
        email: personalInfo.email || '',
        phone: personalInfo.phone || '',
        location: personalInfo.address || personalInfo.location || '',
        bio: data.summary || '',
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
      };
    }

    // Only include sections with actual data
    if (experience.length > 0) {
      transformedData.experiences = experience.map((exp: any) => ({
        id: exp.id || Date.now().toString(),
        role: exp.jobTitle || exp.role,
        company: exp.company,
        location: exp.location || '',
        startDate: exp.startDate,
        endDate: exp.endDate,
        description: Array.isArray(exp.description) ? exp.description : [exp.description || ''],
        technologies: exp.technologies || [],
        achievements: exp.achievements || [],
        employmentType: exp.employmentType || '',
        salary: exp.salary || '',
        companyLogo: exp.companyLogo || '',
        companyWebsite: exp.companyWebsite || ''
      }));
    }

    if (education.length > 0) {
      transformedData.education = education.map((edu: any) => ({
        id: edu.id || Date.now().toString(),
        degree: edu.degree,
        institution: edu.institution,
        location: edu.location || '',
        startDate: edu.startDate,
        endDate: edu.endDate,
        description: edu.description || '',
        gpa: edu.gpa || '',
        fieldOfStudy: edu.fieldOfStudy || '',
        honors: edu.honors || [],
        relevantCoursework: edu.relevantCoursework || [],
        thesis: edu.thesis || '',
        advisor: edu.advisor || '',
        institutionLogo: edu.institutionLogo || '',
        institutionWebsite: edu.institutionWebsite || ''
      }));
    }

    if (projects.length > 0) {
      transformedData.projects = projects.map((project: any) => ({
        id: project.id || Date.now().toString(),
        title: project.name || project.title,
        description: project.description,
        image: project.image || "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
        technologies: project.technologies || [],
        liveUrl: project.link || project.liveUrl || '#',
        githubUrl: project.githubUrl || '#',
        featured: project.featured || false,
        status: project.status || 'Completed',
        duration: project.duration || '',
        teamSize: project.teamSize || '',
        role: project.role || '',
        challenges: project.challenges || [],
        achievements: project.achievements || [],
        demoVideo: project.demoVideo || '',
        category: project.category || 'Web Development'
      }));
    }

    if (skills.length > 0) {
      transformedData.skills = skills.map((skillGroup: any) => ({
        category: skillGroup.category,
        items: skillGroup.items || []
      }));
    }

    if (services.length > 0) {
      transformedData.services = services.map((service: any) => ({
        id: service.id || Date.now().toString(),
        title: service.title,
        description: service.description,
        features: service.features || [],
        price: service.price || ''
      }));
    }

    if (certifications.length > 0) {
      transformedData.certifications = certifications.map((cert: any) => ({
        id: cert.id || Date.now().toString(),
        name: cert.name,
        issuer: cert.issuer,
        date: cert.date || '',
        credentialId: cert.credentialId || ''
      }));
    }

    if (languages.length > 0) {
      transformedData.languages = languages.map((lang: any) => ({
        id: lang.id || Date.now().toString(),
        name: lang.name,
        proficiency: lang.proficiency
      }));
    }

    if (research.length > 0) {
      transformedData.research = research.map((paper: any) => ({
        id: paper.id || Date.now().toString(),
        title: paper.title,
        publication: paper.publication,
        conference: paper.conference || '',
        year: paper.year || '',
        description: paper.description || paper.abstract || '',
        link: paper.link || '#',
        doi: paper.doi || '',
        citations: paper.citations || '',
        coAuthors: paper.coAuthors || [],
        status: paper.status || 'Published',
        researchArea: paper.researchArea || '',
        guidance: paper.guidance || ''
      }));
    }

    if (achievements.length > 0) {
      transformedData.achievements = achievements.map((achievement: any) => ({
        id: achievement.id || Date.now().toString(),
        title: achievement.title,
        description: achievement.description,
        date: achievement.date || ''
      }));
    }

    return transformedData;
  };

  const handleGoBack = () => {
    // Navigate back to dashboard
    navigate('/dashboard');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownloadProject = () => {
    // Create a zip file with all the project files
    alert('Project download functionality will be implemented here');
  };

  const handleNextTemplate = () => {
    const templateIds = Object.keys(templateComponents);
    const currentIndex = templateIds.indexOf(selectedTemplate);
    const nextIndex = (currentIndex + 1) % templateIds.length;
    setSelectedTemplate(templateIds[nextIndex]);
  };

  const handlePrevTemplate = () => {
    const templateIds = Object.keys(templateComponents);
    const currentIndex = templateIds.indexOf(selectedTemplate);
    const prevIndex = (currentIndex - 1 + templateIds.length) % templateIds.length;
    setSelectedTemplate(templateIds[prevIndex]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio preview...</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No portfolio data found</p>
          <button 
            onClick={handleGoBack}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const transformedData = transformDataForTemplate(portfolioData);
  const TemplateComponent = templateComponents[selectedTemplate as keyof typeof templateComponents] || BusinessProfessionalTemplate;

  // Check if we have enough data to show a meaningful preview
  const hasMinimalData = transformedData && transformedData.personalInfo && transformedData.personalInfo.fullName;

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-white z-50">
        {/* Fullscreen Header */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'desktop' ? 'tablet' : viewMode === 'tablet' ? 'mobile' : 'desktop')}
            className="bg-black/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/30 transition-colors"
          >
            {viewMode === 'desktop' && <Monitor className="w-5 h-5" />}
            {viewMode === 'tablet' && <Tablet className="w-5 h-5" />}
            {viewMode === 'mobile' && <Smartphone className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="bg-black/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fullscreen Content */}
        <div className="h-full overflow-auto">
          <TemplateComponent data={transformedData} customizations={customizations} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            
            {/* Device Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 mr-2">Preview on:</span>
              <div className="bg-gray-100 rounded-lg p-1 flex">
                {[
                  { id: 'desktop', icon: Monitor, label: 'Desktop' },
                  { id: 'tablet', icon: Tablet, label: 'Tablet' },
                  { id: 'mobile', icon: Smartphone, label: 'Mobile' }
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setViewMode(id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      viewMode === id
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Template: <span className="font-medium capitalize">{templates.find(t => t.id === selectedTemplate)?.name || selectedTemplate}</span>
              </span>
              <button 
                onClick={toggleFullscreen}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Full Screen
              </button>
              <button 
                onClick={handleDownloadResume}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </button>
              <Link 
                to="/"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Preview Container */}
      <div className="p-6">
        {!hasMinimalData ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Monitor className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No Data to Preview</h3>
              <p className="text-gray-600 mb-6">
                Please fill out at least your personal information to see a preview of your portfolio.
              </p>
              <button 
                onClick={handleGoBack}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back to Form
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Template Navigation */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={handlePrevTemplate}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              
              <h2 className="text-xl font-semibold text-gray-800">
                {templates.find(t => t.id === selectedTemplate)?.name || 'Template Preview'}
              </h2>
              
              <button
                onClick={handleNextTemplate}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            
            <div className="flex justify-center">
              <div className={`${getViewModeClass()} transition-all duration-300`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                  <div className="h-full overflow-y-auto">
                    <TemplateComponent data={transformedData} customizations={customizations} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Download Project Button */}
            <div className="mt-8">
              <button
                onClick={handleDownloadProject}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Project Files
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Device Info */}
      {hasMinimalData && (
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {viewMode === 'desktop' && <Monitor className="w-4 h-4 text-gray-600" />}
              {viewMode === 'tablet' && <Tablet className="w-4 h-4 text-gray-600" />}
              {viewMode === 'mobile' && <Smartphone className="w-4 h-4 text-gray-600" />}
              <span className="text-sm font-medium text-gray-900 capitalize">{viewMode} View</span>
            </div>
            <div className="text-xs text-gray-500">
              {viewMode === 'desktop' && 'Full width'}
              {viewMode === 'tablet' && '768px width'}
              {viewMode === 'mobile' && '375px width'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewTemplate;