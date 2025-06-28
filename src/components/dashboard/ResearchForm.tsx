import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import { Plus, Trash2, ExternalLink, FileText, Users, Calendar, Award } from 'lucide-react';

interface Research {
  id: number;
  title: string;
  publication: string;
  conference: string;
  year: string;
  researchArea: string;
  guidance: string;
  description: string;
  link: string;
  doi: string;
  citations: string;
  coAuthors: string[];
  status: string;
  abstract: string;
}

interface ResearchFormProps {
  data: Research[];
  onUpdate: (data: Research[]) => void;
}

const ResearchForm: React.FC<ResearchFormProps> = ({ data, onUpdate }) => {
  const [research, setResearch] = useState<Research[]>(data || []);

  useEffect(() => {
    onUpdate(research);
  }, [research, onUpdate]);

  const addResearch = () => {
    const newResearch: Research = {
      id: Date.now(),
      title: '',
      publication: '',
      conference: '',
      year: '',
      researchArea: '',
      guidance: '',
      description: '',
      link: '',
      doi: '',
      citations: '',
      coAuthors: [],
      status: 'Published',
      abstract: ''
    };
    setResearch([...research, newResearch]);
  };

  const updateResearch = (id: number, field: keyof Research, value: string | string[]) => {
    setResearch(research.map(res => 
      res.id === id ? { ...res, [field]: value } : res
    ));
  };

  const addCoAuthor = (id: number, author: string) => {
    if (author.trim()) {
      const researchItem = research.find(r => r.id === id);
      if (researchItem) {
        updateResearch(id, 'coAuthors', [...(researchItem.coAuthors ?? []), author.trim()]);
      }
    }
  };

  const removeCoAuthor = (resId: number, authorIndex: number) => {
    const researchItem = research.find(r => r.id === resId);
    if (researchItem) {
      updateResearch(resId, 'coAuthors', (researchItem.coAuthors ?? []).filter((_, index) => index !== authorIndex));
    }
  };

  const removeResearch = (id: number) => {
    setResearch(research.filter(res => res.id !== id));
  };

  return (
    <FormSection 
      title="Research & Publications"
      description="Add your research papers, publications, and academic contributions with detailed information."
    >
      <div className="space-y-8">
        {research.map((res, index) => (
          <div key={res.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">
                Research #{index + 1}
              </h3>
              <button
                onClick={() => removeResearch(res.id)}
                className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            {/* Basic Information */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Research Title *
                </label>
                <input
                  type="text"
                  value={res.title}
                  onChange={(e) => updateResearch(res.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Scalable Microservices Architecture for Modern Web Applications"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Publication/Journal
                  </label>
                  <input
                    type="text"
                    value={res.publication}
                    onChange={(e) => updateResearch(res.id, 'publication', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="IEEE Transactions on Software Engineering"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Conference/Venue
                  </label>
                  <input
                    type="text"
                    value={res.conference}
                    onChange={(e) => updateResearch(res.id, 'conference', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="ICSE 2023"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Year
                  </label>
                  <input
                    type="text"
                    value={res.year}
                    onChange={(e) => updateResearch(res.id, 'year', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="2023"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Research Area
                  </label>
                  <input
                    type="text"
                    value={res.researchArea}
                    onChange={(e) => updateResearch(res.id, 'researchArea', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Software Engineering"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Status
                  </label>
                  <select
                    value={res.status}
                    onChange={(e) => updateResearch(res.id, 'status', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="Published" className="bg-gray-800">Published</option>
                    <option value="Under Review" className="bg-gray-800">Under Review</option>
                    <option value="In Progress" className="bg-gray-800">In Progress</option>
                    <option value="Accepted" className="bg-gray-800">Accepted</option>
                    <option value="Submitted" className="bg-gray-800">Submitted</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Links and Identifiers */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <ExternalLink className="w-4 h-4 inline mr-1" />
                  Paper URL
                </label>
                <input
                  type="url"
                  value={res.link}
                  onChange={(e) => updateResearch(res.id, 'link', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://doi.org/10.1109/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  DOI
                </label>
                <input
                  type="text"
                  value={res.doi}
                  onChange={(e) => updateResearch(res.id, 'doi', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="10.1109/TSE.2023.1234567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Citations
                </label>
                <input
                  type="text"
                  value={res.citations}
                  onChange={(e) => updateResearch(res.id, 'citations', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="25"
                />
              </div>
            </div>

            {/* Guidance/Supervision */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Guidance/Supervision
              </label>
              <input
                type="text"
                value={res.guidance}
                onChange={(e) => updateResearch(res.id, 'guidance', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Dr. John Doe (Professor at XYZ University)"
              />
            </div>

            {/* Co-Authors */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Co-Authors
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {(res.coAuthors ?? []).map((author, authorIndex) => (
                  <span
                    key={authorIndex}
                    className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-400/30"
                  >
                    {author}
                    <button
                      onClick={() => removeCoAuthor(res.id, authorIndex)}
                      className="hover:bg-purple-400/30 rounded-full p-0.5 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a co-author and press Enter"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      addCoAuthor(res.id, input.value);
                      input.value = '';
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
                    addCoAuthor(res.id, input.value);
                    input.value = '';
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Abstract */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Abstract
              </label>
              <textarea
                value={res.abstract}
                onChange={(e) => updateResearch(res.id, 'abstract', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Provide a brief abstract of your research work..."
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Description
              </label>
              <textarea
                value={res.description}
                onChange={(e) => updateResearch(res.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Describe the research methodology, key findings, and impact..."
              />
            </div>
          </div>
        ))}
        
        <button
          onClick={addResearch}
          className="w-full border-2 border-dashed border-white/30 rounded-xl py-8 px-4 text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-colors flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm"
        >
          <Plus className="w-5 h-5" />
          Add Research
        </button>
      </div>
    </FormSection>
  );
};

export default ResearchForm;