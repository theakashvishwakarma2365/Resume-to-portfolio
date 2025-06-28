import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import { Plus, Trash2, Upload, X, Award, BookOpen, Calendar } from 'lucide-react';

interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
  institutionLogo: string;
  institutionWebsite: string;
  fieldOfStudy: string;
  honors: string[];
  relevantCoursework: string[];
  thesis: string;
  advisor: string;
}

interface EducationFormProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onUpdate }) => {
  const [education, setEducation] = useState<Education[]>(data || []);

  useEffect(() => {
    onUpdate(education);
  }, [education, onUpdate]);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
      institutionLogo: '',
      institutionWebsite: '',
      fieldOfStudy: '',
      honors: [],
      relevantCoursework: [],
      thesis: '',
      advisor: ''
    };
    setEducation([...education, newEducation]);
  };

  const updateEducation = (id: number, field: keyof Education, value: string | string[]) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const addHonor = (id: number, honor: string) => {
    if (honor.trim()) {
      const edu = education.find(e => e.id === id);
      if (edu) {
        updateEducation(id, 'honors', [...(edu.honors ?? []), honor.trim()]);
      }
    }
  };

  const removeHonor = (eduId: number, honorIndex: number) => {
    const edu = education.find(e => e.id === eduId);
    if (edu) {
      updateEducation(eduId, 'honors', (edu.honors ?? []).filter((_, index) => index !== honorIndex));
    }
  };

  const addCoursework = (id: number, course: string) => {
    if (course.trim()) {
      const edu = education.find(e => e.id === id);
      if (edu) {
        updateEducation(id, 'relevantCoursework', [...(edu.relevantCoursework ?? []), course.trim()]);
      }
    }
  };

  const removeCoursework = (eduId: number, courseIndex: number) => {
    const edu = education.find(e => e.id === eduId);
    if (edu) {
      updateEducation(eduId, 'relevantCoursework', (edu.relevantCoursework ?? []).filter((_, index) => index !== courseIndex));
    }
  };

  const removeEducation = (id: number) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const handleLogoUpload = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateEducation(id, 'institutionLogo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormSection 
      title="Education"
      description="Add your educational background including degrees, certifications, and relevant academic achievements."
    >
      <div className="space-y-8">
        {education.map((edu, index) => (
          <div key={edu.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">
                Education #{index + 1}
              </h3>
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Institution Logo */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Institution Logo
              </label>
              <div className="flex items-center gap-4">
                {edu.institutionLogo && (
                  <div className="w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center">
                    <img src={edu.institutionLogo} alt="Institution Logo" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(edu.id, e)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                  <input
                    type="url"
                    value={edu.institutionLogo}
                    onChange={(e) => updateEducation(edu.id, 'institutionLogo', e.target.value)}
                    className="w-full mt-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Or paste logo URL"
                  />
                </div>
              </div>
            </div>
            
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Degree *
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={edu.fieldOfStudy}
                  onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Institution *
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Stanford University"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Institution Website
                </label>
                <input
                  type="url"
                  value={edu.institutionWebsite}
                  onChange={(e) => updateEducation(edu.id, 'institutionWebsite', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://stanford.edu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Stanford, CA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  GPA
                </label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="3.8/4.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Start Date
                </label>
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="September 2017"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  End Date
                </label>
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="May 2021"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Description
              </label>
              <textarea
                value={edu.description}
                onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Describe your academic experience, focus areas, and any notable achievements..."
              />
            </div>

            {/* Thesis and Advisor */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <BookOpen className="w-4 h-4 inline mr-1" />
                  Thesis/Capstone Project
                </label>
                <input
                  type="text"
                  value={edu.thesis}
                  onChange={(e) => updateEducation(edu.id, 'thesis', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Machine Learning Applications in Web Development"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Advisor/Supervisor
                </label>
                <input
                  type="text"
                  value={edu.advisor}
                  onChange={(e) => updateEducation(edu.id, 'advisor', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Dr. Jane Smith"
                />
              </div>
            </div>

            {/* Honors and Awards */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                <Award className="w-4 h-4 inline mr-1" />
                Honors & Awards
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {(edu.honors ?? []).map((honor, honorIndex) => (
                  <span
                    key={honorIndex}
                    className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm border border-yellow-400/30"
                  >
                    {honor}
                    <button
                      onClick={() => removeHonor(edu.id, honorIndex)}
                      className="hover:bg-yellow-400/30 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add an honor/award and press Enter"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      addHonor(edu.id, input.value);
                      input.value = '';
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                    addHonor(edu.id, input.value);
                    input.value = '';
                  }}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Relevant Coursework */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Relevant Coursework
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {(edu.relevantCoursework ?? []).map((course, courseIndex) => (
                  <span
                    key={courseIndex}
                    className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-400/30"
                  >
                    {course}
                    <button
                      onClick={() => removeCoursework(edu.id, courseIndex)}
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
                  placeholder="Add a course and press Enter"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      addCoursework(edu.id, input.value);
                      input.value = '';
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                    addCoursework(edu.id, input.value);
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
          onClick={addEducation}
          className="w-full border-2 border-dashed border-white/30 rounded-xl py-8 px-4 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-colors flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
        >
          <Plus className="w-5 h-5" />
          Add Education
        </button>
      </div>
    </FormSection>
  );
};

export default EducationForm;