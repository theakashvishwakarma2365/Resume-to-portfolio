import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import { Plus, Trash2, Upload, X, Link as LinkIcon } from 'lucide-react';

interface Experience {
  id: number;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
  companyLogo: string;
  companyWebsite: string;
  employmentType: string;
  salary: string;
}

interface ExperienceFormProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onUpdate }) => {
  const [experiences, setExperiences] = useState<Experience[]>(data || []);

  useEffect(() => {
    onUpdate(experiences);
  }, [experiences, onUpdate]);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      achievements: [],
      technologies: [],
      companyLogo: '',
      companyWebsite: '',
      employmentType: 'Full-time',
      salary: ''
    };
    setExperiences([...experiences, newExperience]);
  };

  const updateExperience = (id: number, field: keyof Experience, value: string | string[]) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addAchievement = (id: number, achievement: string) => {
    if (achievement.trim()) {
      const experience = experiences.find(e => e.id === id);
      if (experience) {
        updateExperience(id, 'achievements', [...(experience.achievements ?? []), achievement.trim()]);
      }
    }
  };

  const removeAchievement = (expId: number, achievementIndex: number) => {
    const experience = experiences.find(e => e.id === expId);
    if (experience) {
      updateExperience(expId, 'achievements', (experience.achievements ?? []).filter((_, index) => index !== achievementIndex));
    }
  };

  const addTechnology = (id: number, tech: string) => {
    if (tech.trim()) {
      const experience = experiences.find(e => e.id === id);
      if (experience) {
        updateExperience(id, 'technologies', [...(experience.technologies ?? []), tech.trim()]);
      }
    }
  };

  const removeTechnology = (expId: number, techIndex: number) => {
    const experience = experiences.find(e => e.id === expId);
    if (experience) {
      updateExperience(expId, 'technologies', (experience.technologies ?? []).filter((_, index) => index !== techIndex));
    }
  };

  const removeExperience = (id: number) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const handleLogoUpload = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateExperience(id, 'companyLogo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormSection 
      title="Work Experience"
      description="Add your professional work experience, internships, and relevant positions with detailed information."
    >
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <div key={experience.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">
                Experience #{index + 1}
              </h3>
              <button
                onClick={() => removeExperience(experience.id)}
                className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            {/* Company Logo */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Company Logo
              </label>
              <div className="flex items-center gap-4">
                {experience.companyLogo && (
                  <div className="w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center">
                    <img src={experience.companyLogo} alt="Company Logo" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(experience.id, e)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                  <p className="text-xs text-gray-400 mt-1">Or paste logo URL below</p>
                  <input
                    type="url"
                    value={experience.companyLogo}
                    onChange={(e) => updateExperience(experience.id, 'companyLogo', e.target.value)}
                    className="w-full mt-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="https://company.com/logo.png"
                  />
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={experience.jobTitle}
                  onChange={(e) => updateExperience(experience.id, 'jobTitle', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Senior Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Tech Innovations Inc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Employment Type
                </label>
                <select
                  value={experience.employmentType}
                  onChange={(e) => updateExperience(experience.id, 'employmentType', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="Full-time" className="bg-gray-800">Full-time</option>
                  <option value="Part-time" className="bg-gray-800">Part-time</option>
                  <option value="Contract" className="bg-gray-800">Contract</option>
                  <option value="Freelance" className="bg-gray-800">Freelance</option>
                  <option value="Internship" className="bg-gray-800">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="San Francisco, CA / Remote"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Start Date
                </label>
                <input
                  type="text"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="January 2022"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  End Date
                </label>
                <input
                  type="text"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Present"
                />
              </div>
            </div>

            {/* Company Website and Salary */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <LinkIcon className="w-4 h-4 inline mr-1" />
                  Company Website
                </label>
                <input
                  type="url"
                  value={experience.companyWebsite}
                  onChange={(e) => updateExperience(experience.id, 'companyWebsite', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Salary Range (Optional)
                </label>
                <input
                  type="text"
                  value={experience.salary}
                  onChange={(e) => updateExperience(experience.id, 'salary', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="$80,000 - $120,000"
                />
              </div>
            </div>
            
            {/* Job Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Job Description
              </label>
              <textarea
                value={experience.description}
                onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Describe your role, responsibilities, and what you accomplished in this position..."
              />
            </div>

            {/* Key Achievements */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Key Achievements
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {(experience.achievements ?? []).map((achievement, achievementIndex) => (
                  <span
                    key={achievementIndex}
                    className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-400/30"
                  >
                    {achievement}
                    <button
                      onClick={() => removeAchievement(experience.id, achievementIndex)}
                      className="hover:bg-green-400/30 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add an achievement and press Enter"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      addAchievement(experience.id, input.value);
                      input.value = '';
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                    addAchievement(experience.id, input.value);
                    input.value = '';
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Technologies Used */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Technologies Used
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {(experience.technologies ?? []).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-400/30"
                  >
                    {tech}
                    <button
                      onClick={() => removeTechnology(experience.id, techIndex)}
                      className="hover:bg-blue-400/30 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a technology and press Enter"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      addTechnology(experience.id, input.value);
                      input.value = '';
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                    addTechnology(experience.id, input.value);
                    input.value = '';
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={addExperience}
          className="w-full border-2 border-dashed border-white/30 rounded-xl py-8 px-4 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-colors flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
        >
          <Plus className="w-5 h-5" />
          Add Work Experience
        </button>
      </div>
    </FormSection>
  );
};

export default ExperienceForm;