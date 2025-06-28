import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import { Plus, Trash2, X } from 'lucide-react';

interface Skill {
  id: number;
  category: string;
  items: string[];
}

interface SkillsFormProps {
  data: Skill[];
  onUpdate: (data: Skill[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onUpdate }) => {
  const [skills, setSkills] = useState<Skill[]>(data || []);

  useEffect(() => {
    onUpdate(skills);
  }, [skills, onUpdate]);

  const addSkillCategory = () => {
    const newSkill: Skill = {
      id: Date.now(),
      category: '',
      items: []
    };
    setSkills([...skills, newSkill]);
  };

  const updateSkillCategory = (id: number, category: string) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, category } : skill
    ));
  };

  const addSkillItem = (id: number, item: string) => {
    if (item.trim()) {
      setSkills(skills.map(skill => 
        skill.id === id ? { ...skill, items: [...(skill.items ?? []), item.trim()] } : skill
      ));
    }
  };

  const removeSkillItem = (skillId: number, itemIndex: number) => {
    setSkills(skills.map(skill => 
      skill.id === skillId 
        ? { ...skill, items: (skill.items ?? []).filter((_, index) => index !== itemIndex) }
        : skill
    ));
  };

  const removeSkillCategory = (id: number) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  return (
    <FormSection 
      title="Skills"
      description="Organize your skills by category to showcase your expertise effectively."
    >
      <div className="space-y-8">
        {skills.map((skill, index) => (
          <div key={skill.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">
                Skill Category #{index + 1}
              </h3>
              <button
                onClick={() => removeSkillCategory(skill.id)}
                className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={skill.category}
                onChange={(e) => updateSkillCategory(skill.id, e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Programming Languages, Frameworks, Tools"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {(skill.items ?? []).map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-400/30"
                  >
                    {item}
                    <button
                      onClick={() => removeSkillItem(skill.id, itemIndex)}
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
                  placeholder="Add a skill and press Enter"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      addSkillItem(skill.id, input.value);
                      input.value = '';
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                    addSkillItem(skill.id, input.value);
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
          onClick={addSkillCategory}
          className="w-full border-2 border-dashed border-white/30 rounded-xl py-8 px-4 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-colors flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
        >
          <Plus className="w-5 h-5" />
          Add Skill Category
        </button>
      </div>
    </FormSection>
  );
};

export default SkillsForm;