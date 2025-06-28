import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import { Plus, Trash2 } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface AchievementsFormProps {
  data: Achievement[];
  onUpdate: (data: Achievement[]) => void;
}

const AchievementsForm: React.FC<AchievementsFormProps> = ({ data, onUpdate }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(data || []);

  useEffect(() => {
    onUpdate(achievements);
  }, [achievements, onUpdate]);

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now(),
      title: '',
      description: '',
      date: ''
    };
    setAchievements([...achievements, newAchievement]);
  };

  const updateAchievement = (id: number, field: keyof Achievement, value: string) => {
    setAchievements(achievements.map(achievement => 
      achievement.id === id ? { ...achievement, [field]: value } : achievement
    ));
  };

  const removeAchievement = (id: number) => {
    setAchievements(achievements.filter(achievement => achievement.id !== id));
  };

  return (
    <FormSection 
      title="Achievements & Awards"
      description="Highlight your notable achievements, awards, and recognitions."
    >
      <div className="space-y-8">
        {achievements.map((achievement, index) => (
          <div key={achievement.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">
                Achievement #{index + 1}
              </h3>
              <button
                onClick={() => removeAchievement(achievement.id)}
                className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Achievement Title *
                  </label>
                  <input
                    type="text"
                    value={achievement.title}
                    onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="1st Prize in Hackathon"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    value={achievement.date}
                    onChange={(e) => updateAchievement(achievement.id, 'date', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="MM/YYYY"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Description *
                </label>
                <textarea
                  value={achievement.description}
                  onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Describe the achievement, what you accomplished, and its significance..."
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={addAchievement}
          className="w-full border-2 border-dashed border-white/30 rounded-xl py-8 px-4 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-colors flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
        >
          <Plus className="w-5 h-5" />
          Add Achievement
        </button>
      </div>
    </FormSection>
  );
};

export default AchievementsForm;