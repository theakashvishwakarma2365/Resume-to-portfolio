import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';

interface SummaryFormProps {
  data: string;
  onUpdate: (data: string) => void;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ data, onUpdate }) => {
  const [summary, setSummary] = useState(data || '');

  useEffect(() => {
    onUpdate(summary);
  }, [summary, onUpdate]);

  return (
    <FormSection 
      title="Professional Summary"
      description="Write a compelling summary that highlights your key skills, experience, and career objectives."
    >
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Summary *
        </label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={8}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none backdrop-blur-sm"
          placeholder="Write a brief summary about yourself, your experience, and your goals. This will be one of the first things potential employers see, so make it count!"
        />
        <div className="mt-3 flex justify-between text-sm text-gray-400">
          <span>Tip: Keep it concise but impactful (2-3 sentences)</span>
          <span>{summary.length} characters</span>
        </div>
      </div>
    </FormSection>
  );
};

export default SummaryForm;