import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import { Plus, Trash2, X, Upload, ExternalLink, Github, Star, Calendar, Users, Award } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  link: string;
  githubUrl: string;
  duration: string;
  image: string;
  featured: boolean;
  status: string;
  teamSize: string;
  role: string;
  challenges: string[];
  achievements: string[];
  demoVideo: string;
  category: string;
}

interface ProjectsFormProps {
  data: Project[];
  onUpdate: (data: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onUpdate }) => {
  const [projects, setProjects] = useState<Project[]>(data || []);

  useEffect(() => {
    onUpdate(projects);
  }, [projects, onUpdate]);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      githubUrl: '',
      duration: '',
      image: '',
      featured: false,
      status: 'Completed',
      teamSize: '1',
      role: '',
      challenges: [],
      achievements: [],
      demoVideo: '',
      category: 'Web Development'
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: number, field: keyof Project, value: string | string[] | boolean) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const addTechnology = (id: number, tech: string) => {
    if (tech.trim()) {
      const project = projects.find(p => p.id === id);
      if (project) {
        updateProject(id, 'technologies', [...(project.technologies ?? []), tech.trim()]);
      }
    }
  };

  const removeTechnology = (projectId: number, techIndex: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, 'technologies', (project.technologies ?? []).filter((_, index) => index !== techIndex));
    }
  };

  const addChallenge = (id: number, challenge: string) => {
    if (challenge.trim()) {
      const project = projects.find(p => p.id === id);
      if (project) {
        updateProject(id, 'challenges', [...(project.challenges ?? []), challenge.trim()]);
      }
    }
  };

  const removeChallenge = (projectId: number, challengeIndex: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, 'challenges', (project.challenges ?? []).filter((_, index) => index !== challengeIndex));
    }
  };

  const addAchievement = (id: number, achievement: string) => {
    if (achievement.trim()) {
      const project = projects.find(p => p.id === id);
      if (project) {
        updateProject(id, 'achievements', [...(project.achievements ?? []), achievement.trim()]);
      }
    }
  };

  const removeAchievement = (projectId: number, achievementIndex: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, 'achievements', (project.achievements ?? []).filter((_, index) => index !== achievementIndex));
    }
  };

  const removeProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleImageUpload = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateProject(id, 'image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormSection 
      title="Projects"
      description="Showcase your best projects with detailed information, images, and achievements."
    >
      <div className="space-y-8">
        {projects.map((project, index) => (
          <div key={project.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-white">
                  Project #{index + 1}
                </h3>
                {project.featured && (
                  <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </span>
                )}
              </div>
              <button
                onClick={() => removeProject(project.id)}
                className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Project Image */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Project Image/Screenshot
              </label>
              <div className="flex flex-col gap-4">
                {project.image && (
                  <div className="w-full h-48 bg-gray-800 rounded-lg overflow-hidden">
                    <img src={project.image} alt="Project" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(project.id, e)}
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                </div>
                <input
                  type="url"
                  value={project.image}
                  onChange={(e) => updateProject(project.id, 'image', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Or paste image URL"
                />
              </div>
            </div>
            
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="AI-Powered E-Commerce Platform"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Category
                </label>
                <select
                  value={project.category}
                  onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="Web Development" className="bg-gray-800">Web Development</option>
                  <option value="Mobile App" className="bg-gray-800">Mobile App</option>
                  <option value="Desktop App" className="bg-gray-800">Desktop App</option>
                  <option value="AI/ML" className="bg-gray-800">AI/ML</option>
                  <option value="Data Science" className="bg-gray-800">Data Science</option>
                  <option value="Game Development" className="bg-gray-800">Game Development</option>
                  <option value="Other" className="bg-gray-800">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Duration
                </label>
                <input
                  type="text"
                  value={project.duration}
                  onChange={(e) => updateProject(project.id, 'duration', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="3 months"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Status
                </label>
                <select
                  value={project.status}
                  onChange={(e) => updateProject(project.id, 'status', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="Completed" className="bg-gray-800">Completed</option>
                  <option value="In Progress" className="bg-gray-800">In Progress</option>
                  <option value="On Hold" className="bg-gray-800">On Hold</option>
                  <option value="Cancelled" className="bg-gray-800">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Team and Role */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Team Size
                </label>
                <input
                  type="text"
                  value={project.teamSize}
                  onChange={(e) => updateProject(project.id, 'teamSize', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="5 members"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Your Role
                </label>
                <input
                  type="text"
                  value={project.role}
                  onChange={(e) => updateProject(project.id, 'role', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Lead Developer"
                />
              </div>
            </div>

            {/* Links */}
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <ExternalLink className="w-4 h-4 inline mr-1" />
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={project.link}
                  onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://project-demo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <Github className="w-4 h-4 inline mr-1" />
                  GitHub Repository
                </label>
                <input
                  type="url"
                  value={project.githubUrl}
                  onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://github.com/username/project"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Demo Video URL
                </label>
                <input
                  type="url"
                  value={project.demoVideo}
                  onChange={(e) => updateProject(project.id, 'demoVideo', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Project Description *
              </label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Describe what the project does, the problems it solves, your approach, and the impact it had..."
              />
            </div>

            {/* Technologies */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Technologies Used
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {(project.technologies ?? []).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-400/30"
                  >
                    {tech}
                    <button
                      onClick={() => removeTechnology(project.id, techIndex)}
                      className="hover:bg-purple-400/30 rounded-full p-0.5 transition-colors"
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
                      addTechnology(project.id, input.value);
                      input.value = '';
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                    addTechnology(project.id, input.value);
                    input.value = '';
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Challenges */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Challenges Faced
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {(project.challenges ?? []).map((challenge, challengeIndex) => (
                  <span
                    key={challengeIndex}
                    className="inline-flex items-center gap-1 bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm border border-orange-400/30"
                  >
                    {challenge}
                    <button
                      onClick={() => removeChallenge(project.id, challengeIndex)}
                      className="hover:bg-orange-400/30 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a challenge and press Enter"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      addChallenge(project.id, input.value);
                      input.value = '';
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                    addChallenge(project.id, input.value);
                    input.value = '';
                  }}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                <Award className="w-4 h-4 inline mr-1" />
                Key Achievements
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {(project.achievements ?? []).map((achievement, achievementIndex) => (
                  <span
                    key={achievementIndex}
                    className="inline-flex items-center gap-1 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-400/30"
                  >
                    {achievement}
                    <button
                      onClick={() => removeAchievement(project.id, achievementIndex)}
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
                      addAchievement(project.id, input.value);
                      input.value = '';
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                    addAchievement(project.id, input.value);
                    input.value = '';
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={project.featured}
                    onChange={(e) => updateProject(project.id, 'featured', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <Star className="w-4 h-4" />
                  <span>Feature this project</span>
                </label>
                <p className="text-xs text-gray-400 mt-1">Featured projects will be highlighted prominently in your portfolio</p>
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={addProject}
          className="w-full border-2 border-dashed border-white/30 rounded-xl py-8 px-4 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-colors flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>
    </FormSection>
  );
};

export default ProjectsForm;