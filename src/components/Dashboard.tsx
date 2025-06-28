import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PortfolioService } from '../lib/portfolioService';
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    research: [],
    achievements: []
  });uter-dom';
import { useAuth } from '../contexts/AuthContext';
import { PortfolioService } from '../lib/portfolioService';
import StepIndicator from './dashboard/StepIndicator';
import DataInputStep from './dashboard/DataInputStep';
import TemplateSelectionStep from './dashboard/TemplateSelectionStep';
import PreviewStep from './dashboard/PreviewStep';
import PublishStep from './dashboard/PublishStep';
import { 
  FileText, 
  ArrowLeft,
  Settings,
  LogOut,
  User,
  Menu,
  X,
  Download,
  Mail,
  Calendar,
  Shield,
  Database,
  Clock,
  Edit2,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

// Type interfaces to fix runtime errors
interface PersonalInfo {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  [key: string]: any;
}

interface FormDataItem {
  [key: string]: any;
}

interface FormData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: FormDataItem[];
  education: FormDataItem[];
  skills: FormDataItem[];
  projects: FormDataItem[];
  certifications: FormDataItem[];
  languages: FormDataItem[];
  research: FormDataItem[];
  achievements: FormDataItem[];
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [inputMethod, setInputMethod] = useState(''); // Start with empty string to show selection
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {} as any,
    summary: '',
    experience: [] as any[],
    education: [] as any[],
    skills: [] as any[],
    projects: [] as any[],
    certifications: [] as any[],
    languages: [] as any[],
    research: [] as any[],
    achievements: [] as any[]
  });
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioId, setPortfolioId] = useState<string | null>(null);
  const [portfolioStats, setPortfolioStats] = useState({
    lastUpdated: null,
    sectionsCompleted: 0,
    totalSections: 10,
    isPublished: false
  });

  // Settings form state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    loadPortfolioData();
    if (user) {
      setProfileData({
        fullName: user.user_metadata?.full_name || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const loadPortfolioData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await PortfolioService.getPortfolio();
      
      if (data && !error) {
        setFormData({
          personalInfo: data.personal_info || {},
          summary: data.summary || '',
          experience: data.experience || [],
          education: data.education || [],
          skills: data.skills || [],
          projects: data.projects || [],
          certifications: data.certifications || [],
          languages: data.languages || [],
          research: data.research || [],
          achievements: data.achievements || []
        });
        setSelectedTemplate(data.selected_template || 'modern');
        setPortfolioId(data.id);
        
        // Calculate portfolio stats
        const sections = [
          data.personal_info,
          data.summary,
          data.experience,
          data.education,
          data.skills,
          data.projects,
          data.certifications,
          data.languages,
          data.research,
          data.achievements
        ];
        
        const completedSections = sections.filter(section => {
          if (Array.isArray(section)) return section.length > 0;
          if (typeof section === 'object' && section !== null) return Object.keys(section).length > 0;
          return Boolean(section);
        }).length;

        setPortfolioStats({
          lastUpdated: data.updated_at,
          sectionsCompleted: completedSections,
          totalSections: 10,
          isPublished: data.is_published || false
        });
        
        // Always start at step 1 to show input method selection
        // Don't automatically skip to step 2 even if data exists
      }
    } catch (err) {
      console.error('Error loading portfolio:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { id: 1, title: 'Input Method', description: 'Choose how to add your data' },
    { id: 2, title: 'Portfolio Data', description: 'Fill in your information' },
    { id: 3, title: 'Template Selection', description: 'Choose your design' },
    { id: 4, title: 'Preview', description: 'Review your portfolio' },
    { id: 5, title: 'Publish', description: 'Deploy your website' }
  ];

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
      // Here you would implement profile update logic
      // For now, we'll just simulate a save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditingProfile(false);
      setProfileData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Error updating profile. Please try again.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (section: string, data: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleInputMethodSelection = (method: string) => {
    setInputMethod(method);
    if (method === 'manual') {
      // Automatically proceed to the next step for manual input
      setTimeout(() => {
        nextStep();
      }, 500);
    }
  };

  const generatePDF = () => {
    // Create a simple text-based resume from the form data
    const personalInfo = formData.personalInfo || {};
    const resumeContent = `
${personalInfo.fullName || 'Your Name'}
${personalInfo.email || ''} | ${personalInfo.phone || ''} | ${personalInfo.address || ''}

PROFESSIONAL SUMMARY
${formData.summary || 'No summary provided'}

EXPERIENCE
${formData.experience?.map((exp: any) => `
${exp.jobTitle || ''} at ${exp.company || ''} (${exp.startDate || ''} - ${exp.endDate || ''})
${exp.location || ''}
${exp.description || ''}
`).join('\n') || 'No experience added'}

EDUCATION
${formData.education?.map((edu: any) => `
${edu.degree || ''} - ${edu.institution || ''} (${edu.startDate || ''} - ${edu.endDate || ''})
${edu.location || ''} ${edu.gpa ? `GPA: ${edu.gpa}` : ''}
`).join('\n') || 'No education added'}

SKILLS
${formData.skills?.map((skillCategory: any) => `
${skillCategory.category || ''}: ${skillCategory.items?.join(', ') || ''}
`).join('\n') || 'No skills added'}

PROJECTS
${formData.projects?.map((project: any) => `
${project.name || ''} ${project.duration ? `(${project.duration})` : ''}
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
    link.download = `${personalInfo.fullName || 'resume'}-resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        // Input Method Selection Step
        return (
          <DataInputStep 
            inputMethod=""  // Force to show input method selection
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
            portfolioId={portfolioId}
            setPortfolioId={(id: string) => setPortfolioId(id)}
            onInputMethodSelect={handleInputMethodSelection}
          />
        );

      case 2:
        // Data Input Forms Step
        return (
          <DataInputStep 
            inputMethod={inputMethod || 'manual'}  // Use selected method or default to manual
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
            portfolioId={portfolioId}
            setPortfolioId={(id: string) => setPortfolioId(id)}
            onInputMethodSelect={handleInputMethodSelection}
          />
        );

      case 3:
        return (
          <TemplateSelectionStep
            formData={formData}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            onNext={nextStep}
            onPrev={prevStep}
            portfolioId={portfolioId}
          />
        );

      case 4:
        return (
          <PreviewStep
            formData={formData}
            selectedTemplate={selectedTemplate}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );

      case 5:
        return (
          <PublishStep
            formData={formData}
            selectedTemplate={selectedTemplate}
            onPrev={prevStep}
            portfolioId={portfolioId}
          />
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-white/20 hidden sm:block"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Portfolio Builder</h1>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden text-white p-2"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            {/* Right side - Desktop */}
            <div className="hidden lg:flex items-center space-x-2 sm:space-x-4">
              <button 
                onClick={generatePDF}
                className="flex items-center gap-2 bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download Resume</span>
              </button>
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium hidden sm:inline">{user?.user_metadata?.full_name || 'User'}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => {
                        setShowSettings(true);
                        setShowUserMenu(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <Settings className="w-4 h-4" />
                      Account Settings
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="lg:hidden mt-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4">
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={generatePDF}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm justify-center"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </button>
                <hr className="border-white/20" />
                <div className="flex items-center gap-2 text-white px-2 py-1">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{user?.user_metadata?.full_name || 'User'}</span>
                </div>
                <button
                  onClick={() => {
                    setShowSettings(true);
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center gap-2 text-gray-300 px-2 py-1 text-left"
                >
                  <Settings className="w-4 h-4" />
                  Account Settings
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-red-400 px-2 py-1 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Step Indicator */}
      <div className="container mx-auto px-4 sm:px-6 py-4 lg:py-6">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 pb-8">
        {renderStepContent()}
      </div>

      {/* Enhanced Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
              <button
                onClick={() => {
                  setShowSettings(false);
                  setIsEditingProfile(false);
                  setProfileData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  }));
                }}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Account Overview */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Account Information</h3>
                      <p className="text-sm text-blue-700">Your basic account details</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-900">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium text-gray-900">{user?.user_metadata?.full_name || 'Not set'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">Member since:</span>
                      <span className="font-medium text-gray-900">
                        {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">Account Status:</span>
                      <span className="font-medium text-green-600">Active</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">Portfolio Statistics</h3>
                      <p className="text-sm text-green-700">Your portfolio progress</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Database className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600">Portfolio ID:</span>
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {portfolioId ? String(portfolioId).slice(0, 8) + '...' : 'Not created'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium text-gray-900">
                        {portfolioStats.lastUpdated 
                          ? new Date(portfolioStats.lastUpdated).toLocaleDateString()
                          : 'Never'
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600">Sections Completed:</span>
                      <span className="font-medium text-gray-900">
                        {portfolioStats.sectionsCompleted}/{portfolioStats.totalSections}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600">Published:</span>
                      <span className={`font-medium ${portfolioStats.isPublished ? 'text-green-600' : 'text-gray-500'}`}>
                        {portfolioStats.isPublished ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Management */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Profile Management</h3>
                    <p className="text-sm text-gray-600">Update your personal information and password</p>
                  </div>
                  {!isEditingProfile && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                      </div>
                    </div>

                    {/* Password Change */}
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Change Password</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.current ? 'text' : 'password'}
                              value={profileData.currentPassword}
                              onChange={(e) => setProfileData(prev => ({ ...prev, currentPassword: e.target.value }))}
                              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.new ? 'text' : 'password'}
                              value={profileData.newPassword}
                              onChange={(e) => setProfileData(prev => ({ ...prev, newPassword: e.target.value }))}
                              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.confirm ? 'text' : 'password'}
                              value={profileData.confirmPassword}
                              onChange={(e) => setProfileData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => {
                          setIsEditingProfile(false);
                          setProfileData(prev => ({
                            ...prev,
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                          }));
                        }}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        disabled={isSavingProfile}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSavingProfile ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <User className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>Click "Edit Profile" to update your information</p>
                  </div>
                )}
              </div>

              {/* Data Management */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-4">Data Management</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <h4 className="font-medium text-gray-900 mb-2">Export Data</h4>
                    <p className="text-sm text-gray-600 mb-3">Download all your portfolio data as a JSON file</p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Export Portfolio Data
                    </button>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
                    <p className="text-sm text-red-600 mb-3">Permanently delete your account and all data</p>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;