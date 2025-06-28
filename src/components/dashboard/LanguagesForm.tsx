import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import { Plus, Trash2 } from 'lucide-react';

interface Language {
  id: number;
  name: string;
  proficiency: string;
}

interface LanguagesFormProps {
  data: Language[];
  onUpdate: (data: Language[]) => void;
}

const LanguagesForm: React.FC<LanguagesFormProps> = ({ data, onUpdate }) => {
  const [languages, setLanguages] = useState<Language[]>(data || []);

  useEffect(() => {
    onUpdate(languages);
  }, [languages, onUpdate]);

  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now(),
      name: '',
      proficiency: 'Beginner'
    };
    setLanguages([...languages, newLanguage]);
  };

  const updateLanguage = (id: number, field: keyof Language, value: string) => {
    setLanguages(languages.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    ));
  };

  const removeLanguage = (id: number) => {
    setLanguages(languages.filter(lang => lang.id !== id));
  };

  const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native'];

  return (
    <FormSection 
      title="Languages"
      description="Add languages you speak and your proficiency level in each."
    >
      <div className="space-y-6">
        {languages.map((language, index) => (
          <div key={language.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">
                Language #{index + 1}
              </h3>
              <button
                onClick={() => removeLanguage(language.id)}
                className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Language *
                </label>
                <input
                  type="text"
                  value={language.name}
                  onChange={(e) => updateLanguage(language.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="English, Spanish, French, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Proficiency Level *
                </label>
                <select
                  value={language.proficiency}
                  onChange={(e) => updateLanguage(language.id, 'proficiency', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {proficiencyLevels.map((level) => (
                    <option key={level} value={level} className="bg-gray-800 text-white">
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={addLanguage}
          className="w-full border-2 border-dashed border-white/30 rounded-xl py-8 px-4 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-colors flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
        >
          <Plus className="w-5 h-5" />
          Add Language
        </button>
      </div>
    </FormSection>
  );
};

export default LanguagesForm;