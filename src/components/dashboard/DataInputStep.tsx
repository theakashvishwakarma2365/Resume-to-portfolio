import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import ServicesForm from './ServicesForm';
import CertificationsForm from './CertificationsForm';
import LanguagesForm from './LanguagesForm';
import ResearchForm from './ResearchForm';
import AchievementsForm from './AchievementsForm';
import { PortfolioService } from '../../lib/portfolioService';
import { User, FileText, Briefcase, GraduationCap, Code, FolderOpen, Wrench, Award, Globe, BookOpen, Trophy, ChevronLeft, ChevronRight, Save, Check, CheckCircle, Clock, AlertCircle, Upload, Sparkles, Zap, Brain, Magnet as Magic, Cpu, FileSearch, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DataInputStepProps {
  inputMethod: string;
  formData: any;
  updateFormData: (section: string, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  portfolioId: string | null;
  setPortfolioId: (id: string) => void;
  onInputMethodSelect?: (method: string) => void;
}

const DataInputStep: React.FC<DataInputStepProps> = ({ 
  inputMethod, 
  formData, 
  updateFormData, 
  onNext, 
  onPrev,
  portfolioId,
  setPortfolioId,
  onInputMethodSelect
}) => {
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');

  const sections = [
    { 
      id: 'personalInfo', 
      name: 'Personal Info', 
      icon: <User className="w-5 h-5" />, 
      component: PersonalInfoForm,
      description: 'Basic contact information and professional details',
      required: true
    },
    { 
      id: 'summary', 
      name: 'Summary', 
      icon: <FileText className="w-5 h-5" />, 
      component: SummaryForm,
      description: 'Professional summary and career objectives',
      required: true
    },
    { 
      id: 'experience', 
      name: 'Experience', 
      icon: <Briefcase className="w-5 h-5" />, 
      component: ExperienceForm,
      description: 'Work history and professional experience',
      required: false
    },
    { 
      id: 'education', 
      name: 'Education', 
      icon: <GraduationCap className="w-5 h-5" />, 
      component: EducationForm,
      description: 'Educational background and qualifications',
      required: false
    },
    { 
      id: 'skills', 
      name: 'Skills', 
      icon: <Code className="w-5 h-5" />, 
      component: SkillsForm,
      description: 'Technical and professional skills',
      required: false
    },
    { 
      id: 'projects', 
      name: 'Projects', 
      icon: <FolderOpen className="w-5 h-5" />, 
      component: ProjectsForm,
      description: 'Portfolio projects and achievements',
      required: false
    },
    { 
      id: 'services', 
      name: 'Services', 
      icon: <Wrench className="w-5 h-5" />, 
      component: ServicesForm,
      description: 'Services you offer to clients',
      required: false
    },
    { 
      id: 'certifications', 
      name: 'Certifications', 
      icon: <Award className="w-5 h-5" />, 
      component: CertificationsForm,
      description: 'Professional certifications and licenses',
      required: false
    },
    { 
      id: 'languages', 
      name: 'Languages', 
      icon: <Globe className="w-5 h-5" />, 
      component: LanguagesForm,
      description: 'Languages you speak and proficiency levels',
      required: false
    },
    { 
      id: 'research', 
      name: 'Research', 
      icon: <BookOpen className="w-5 h-5" />, 
      component: ResearchForm,
      description: 'Research papers and publications',
      required: false
    },
    { 
      id: 'achievements', 
      name: 'Achievements', 
      icon: <Trophy className="w-5 h-5" />, 
      component: AchievementsForm,
      description: 'Awards and notable achievements',
      required: false
    }
  ];

  const currentSectionIndex = sections.findIndex(s => s.id === activeSection);
  const currentSection = sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === sections.length - 1;
  const isFirstSection = currentSectionIndex === 0;

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component;

  // Helper function to check if a section has data
  const hasData = (sectionId: string) => {
    const data = formData[sectionId];
    if (!data) return false;
    
    if (Array.isArray(data)) {
      return data.length > 0;
    }
    
    if (typeof data === 'object' && data !== null) {
      return Object.values(data).some(value => value && value !== '');
    }
    
    return data && data !== '';
  };

  // Calculate completed sections
  const completedSections = sections.filter(section => hasData(section.id));
  const requiredSections = sections.filter(section => section.required);
  const completedRequiredSections = requiredSections.filter(section => hasData(section.id));
  const progressPercentage = (completedSections.length / sections.length) * 100;
  const requiredProgressPercentage = (completedRequiredSections.length / requiredSections.length) * 100;

  // Auto-save functionality
  const autoSave = React.useCallback(async () => {
    if (!formData.personalInfo?.fullName) return; // Don't auto-save if no basic info

    setAutoSaveStatus('Saving...');
    try {
      const portfolioData = {
        personal_info: formData.personalInfo || {},
        summary: formData.summary || '',
        experience: formData.experience || [],
        education: formData.education || [],
        skills: formData.skills || [],
        projects: formData.projects || [],
        services: formData.services || [],
        certifications: formData.certifications || [],
        languages: formData.languages || [],
        research: formData.research || [],
        achievements: formData.achievements || [],
        selected_template: 'tech'
      };

      const { data, error } = await PortfolioService.savePortfolio(portfolioData);
      
      if (error) {
        setAutoSaveStatus('Error saving');
        setTimeout(() => setAutoSaveStatus(''), 3000);
      } else {
        if (data && data.id && !portfolioId) {
          setPortfolioId(data.id);
        }
        setAutoSaveStatus('Saved');
        setTimeout(() => setAutoSaveStatus(''), 2000);
      }
    } catch (error) {
      console.error('Auto-save error:', error);
      setAutoSaveStatus('Error');
      setTimeout(() => setAutoSaveStatus(''), 3000);
    }
  }, [formData, portfolioId, setPortfolioId]);

  // Auto-save when form data changes
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      autoSave();
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(timeoutId);
  }, [formData, autoSave]);

  const handleNextSection = () => {
    if (!isLastSection) {
      // Small delay to allow exit animation to start before changing section
      const nextSection = sections[currentSectionIndex + 1];
      
      // Create a direction indicator for animation
      const direction = 'forward';
      setSlideDirection(direction);
      
      // Use setTimeout to allow exit animation to play
      setTimeout(() => {
        setActiveSection(nextSection.id);
      }, 50);
    }
  };

  const handlePrevSection = () => {
    if (!isFirstSection) {
      // Small delay to allow exit animation to start before changing section
      const prevSection = sections[currentSectionIndex - 1];
      
      // Create a direction indicator for animation
      const direction = 'backward';
      setSlideDirection(direction);
      
      // Use setTimeout to allow exit animation to play
      setTimeout(() => {
        setActiveSection(prevSection.id);
      }, 50);
    }
  };

  const handleSubmitData = async () => {
    setIsSubmitting(true);
    
    try {
      // Create a comprehensive data object
      const portfolioData = {
        personal_info: formData.personalInfo || {},
        summary: formData.summary || '',
        experience: formData.experience || [],
        education: formData.education || [],
        skills: formData.skills || [],
        projects: formData.projects || [],
        services: formData.services || [],
        certifications: formData.certifications || [],
        languages: formData.languages || [],
        research: formData.research || [],
        achievements: formData.achievements || [],
        selected_template: 'tech'
      };

      console.log('Submitting portfolio data:', portfolioData);

      // Save to database
      const { data, error } = await PortfolioService.savePortfolio(portfolioData);
      
      if (error) {
        throw new Error(error.message);
      }

      if (data && data.id) {
        setPortfolioId(data.id);
      }
      
      setSubmitSuccess(true);
      
      // Auto-proceed to next step after successful submission
      setTimeout(() => {
        onNext();
      }, 2000);
      
    } catch (error) {
      console.error('Error saving portfolio data:', error);
      alert('Error saving portfolio data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateFormData = (section: string, data: any) => {
    updateFormData(section, data);
  };

  const handleInputMethodSelection = (method: string) => {
    if (onInputMethodSelect) {
      onInputMethodSelect(method);
    }
  };

  // Input Method Selection (Two Column Layout)
  if (!inputMethod) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How would you like to create your portfolio?</h2>
          <p className="text-gray-300 text-lg md:text-xl">Choose the method that works best for you</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Manual Form Entry - Left Column */}
          <div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] hover:border-blue-400 group"
            onClick={() => handleInputMethodSelection('manual')}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Manual Form Entry</h3>
              
              <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 mb-6">
                <p className="text-green-300 font-semibold flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Don't have a resume? No worries!
                </p>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Perfect for students, career changers, or anyone starting fresh. Our step-by-step form 
                guides you through creating a professional portfolio from scratch.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-2">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-300">Beginner Friendly</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-300">Step-by-Step</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Save className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-300">Auto-Save</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-300">Full Control</p>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-colors">
                Start Building Manually
              </button>
            </div>
          </div>

          {/* AI Resume Upload - Right Column */}
          <div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] hover:border-purple-400 group relative overflow-hidden"
            onClick={() => handleInputMethodSelection('resume')}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 opacity-50"></div>
            
            {/* Coming Soon Badge */}
            <div className="absolute top-6 right-6 z-10">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                COMING SOON
              </span>
            </div>
            
            <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">AI Resume Upload</h3>
              
              <div className="bg-purple-500/20 border border-purple-400/30 rounded-lg p-4 mb-6">
                <p className="text-purple-300 font-semibold flex items-center justify-center gap-2">
                  <Brain className="w-5 h-5" />
                  Revolutionary AI Technology
                </p>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Upload your existing resume and watch our advanced AI automatically extract, organize, 
                and enhance your information into a stunning portfolio.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FileSearch className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-300">Smart Parsing</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Magic className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-300">AI Enhancement</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-300">30 Seconds</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-300">PDF/DOC/DOCX</p>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-colors">
                Upload Resume (Coming Soon)
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg">
            Both methods create the same beautiful, professional portfolio. Choose what feels right for you!
          </p>
        </div>
      </div>
    );
  }

  // Resume Upload Page
  if (inputMethod === 'resume') {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Input Method
          </button>
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Resume Parser</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto">
            Upload your resume and let our advanced AI extract and organize your information automatically. 
            Our intelligent system will parse your document and create a beautiful portfolio in seconds.
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <div className="border-2 border-dashed border-white/30 rounded-xl p-12 text-center hover:border-purple-400 transition-colors">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Drop your resume here or click to browse</h3>
            <p className="text-gray-300 mb-6">Supports PDF, DOC, DOCX files up to 10MB</p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors">
              Choose File
            </button>
          </div>
        </div>

        {/* AI Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileSearch className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Smart Extraction</h4>
            <p className="text-gray-400 text-sm">AI identifies and extracts all relevant information from your resume</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Cpu className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Intelligent Parsing</h4>
            <p className="text-gray-400 text-sm">Advanced algorithms organize your data into structured sections</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Wand2 className="w-6 h-6 text-green-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Auto-Enhancement</h4>
            <p className="text-gray-400 text-sm">AI enhances and optimizes your content for better presentation</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-orange-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Instant Results</h4>
            <p className="text-gray-400 text-sm">Get your portfolio ready in under 30 seconds</p>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-8 border border-purple-400/30 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            COMING SOON
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Revolutionary AI Technology in Development</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            We're putting the finishing touches on our advanced AI resume parser. This cutting-edge technology 
            will revolutionize how you create portfolios. Stay tuned for the launch!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => handleInputMethodSelection('manual')}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors font-semibold"
            >
              Use Manual Form Instead
            </button>
            <button className="border border-white/30 text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
              Notify Me When Ready
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Data Saved Successfully!</h2>
          <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
            Your portfolio information has been saved to the database. You can now proceed to select a template 
            and preview your portfolio website.
          </p>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-400">
              Proceeding to template selection automatically...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1">
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 lg:p-6 sticky top-32">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Portfolio Sections</h2>
            {autoSaveStatus && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                autoSaveStatus === 'Saved' ? 'bg-green-500/20 text-green-400' :
                autoSaveStatus === 'Saving...' ? 'bg-blue-500/20 text-blue-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {autoSaveStatus}
              </span>
            )}
          </div>
          
          {/* Mobile Section Selector */}
          <div className="lg:hidden mb-6">
            <select
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sections.map((section) => (
                <option key={section.id} value={section.id} className="bg-gray-800 text-white">
                  {section.name} {hasData(section.id) ? '✓' : ''} {section.required ? '*' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Navigation */}
          <nav className="space-y-2 hidden lg:block">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-sm ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white border border-blue-500'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  {section.icon}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{section.name}</span>
                      {section.required && (
                        <span className="text-red-400 text-xs">*</span>
                      )}
                    </div>
                  </div>
                </div>
                {/* Progress indicator */}
                <div className="flex items-center gap-2">
                  {hasData(section.id) ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : section.required ? (
                    <AlertCircle className="w-4 h-4 text-orange-400" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-500 rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </nav>
          
          {/* Progress Summary */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="space-y-4">
              {/* Overall Progress */}
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Overall Progress</span>
                  <span>{completedSections.length}/{sections.length}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {Math.round(progressPercentage)}% complete
                </div>
              </div>

              {/* Required Sections Progress */}
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Required Sections</span>
                  <span>{completedRequiredSections.length}/{requiredSections.length}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${requiredProgressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {Math.round(requiredProgressPercentage)}% required complete
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        {/* Section Header */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSection}
            initial={{ x: slideDirection === 'forward' ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: slideDirection === 'forward' ? -300 : 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 mb-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                {currentSection?.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-white">{currentSection?.name}</h2>
                  {currentSection?.required && (
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs font-medium">
                      Required
                    </span>
                  )}
                  {hasData(activeSection) && (
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  )}
                </div>
                <p className="text-gray-300 mt-1">{currentSection?.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">
                  Section {currentSectionIndex + 1} of {sections.length}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-400">Auto-saved</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Form Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 mb-6 overflow-hidden">
          <AnimatePresence mode="wait">
            {ActiveComponent && (
              <motion.div
                key={activeSection}
                initial={{ x: slideDirection === 'forward' ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: slideDirection === 'forward' ? -300 : 300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <ActiveComponent
                  data={formData[activeSection]}
                  onUpdate={(data: any) => handleUpdateFormData(activeSection, data)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={isFirstSection ? onPrev : handlePrevSection}
            className="flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
          >
            <ChevronLeft className="w-4 h-4" />
            {isFirstSection ? 'Back to Input Method' : 'Previous Section'}
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Section indicator */}
            <span className="text-gray-300 text-sm order-2 sm:order-1">
              {currentSectionIndex + 1} of {sections.length}
            </span>

            {isLastSection ? (
              <button
                onClick={handleSubmitData}
                disabled={isSubmitting || completedRequiredSections.length < requiredSections.length}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto order-1 sm:order-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save & Continue
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNextSection}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 w-full sm:w-auto order-1 sm:order-2"
              >
                Next Section
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Help Text */}
        {completedRequiredSections.length < requiredSections.length && isLastSection && (
          <div className="mt-4 bg-orange-500/20 border border-orange-400/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-orange-300">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Complete required sections to continue</span>
            </div>
            <p className="text-orange-200 text-sm mt-1">
              Please fill out all required sections (marked with *) before proceeding to template selection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataInputStep;