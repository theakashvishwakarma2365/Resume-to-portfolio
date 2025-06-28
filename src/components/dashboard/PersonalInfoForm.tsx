import React, { useState, useEffect } from 'react';
import FormSection from './FormSection';
import { Upload, X, Camera, MapPin, Mail, Phone, Globe, Linkedin, Github, Twitter, Youtube } from 'lucide-react';

interface PersonalInfoFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    website: '',
    twitter: '',
    youtube: '',
    avatar: '',
    bio: '',
    tagline: '',
    availability: 'Available',
    yearsExperience: '',
    specialization: '',
    ...data
  });

  const [avatarPreview, setAvatarPreview] = useState(formData.avatar || '');

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
        handleChange('avatar', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUrl = (url: string) => {
    setAvatarPreview(url);
    handleChange('avatar', url);
  };

  const removeAvatar = () => {
    setAvatarPreview('');
    handleChange('avatar', '');
  };

  return (
    <FormSection 
      title="Personal Information"
      description="Add your basic contact information, professional details, and profile image."
    >
      <div className="space-y-8">
        {/* Profile Image Section */}
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Profile Image</h3>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center overflow-hidden">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <Camera className="w-8 h-8 text-gray-400" />
                )}
              </div>
              {avatarPreview && (
                <button
                  onClick={removeAvatar}
                  className="mt-2 text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Remove
                </button>
              )}
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Or paste image URL
                </label>
                <input
                  type="url"
                  value={avatarPreview}
                  onChange={(e) => handleAvatarUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://example.com/your-photo.jpg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Professional Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Full Stack Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Building the future, one line of code at a time"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Years of Experience
              </label>
              <input
                type="text"
                value={formData.yearsExperience}
                onChange={(e) => handleChange('yearsExperience', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="5+ Years"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white mb-3">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="San Francisco, CA"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                <Linkedin className="w-4 h-4 inline mr-2" />
                LinkedIn Profile
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                <Github className="w-4 h-4 inline mr-2" />
                GitHub Profile
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => handleChange('github', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://github.com/johndoe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                <Globe className="w-4 h-4 inline mr-2" />
                Personal Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://johndoe.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                <Twitter className="w-4 h-4 inline mr-2" />
                Twitter Profile
              </label>
              <input
                type="url"
                value={formData.twitter}
                onChange={(e) => handleChange('twitter', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://twitter.com/johndoe"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white mb-3">
                <Youtube className="w-4 h-4 inline mr-2" />
                YouTube Channel
              </label>
              <input
                type="url"
                value={formData.youtube}
                onChange={(e) => handleChange('youtube', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://youtube.com/@johndoe"
              />
            </div>
          </div>
        </div>

        {/* Professional Status */}
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Professional Status</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Availability Status
              </label>
              <select
                value={formData.availability}
                onChange={(e) => handleChange('availability', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="Available" className="bg-gray-800">Available</option>
                <option value="Busy" className="bg-gray-800">Busy</option>
                <option value="Not Available" className="bg-gray-800">Not Available</option>
                <option value="Open to Opportunities" className="bg-gray-800">Open to Opportunities</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Specialization
              </label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => handleChange('specialization', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Full-Stack & AI"
              />
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Professional Bio</h3>
          <div>
            <label className="block text-sm font-medium text-white mb-3">
              Short Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="A brief description about yourself, your passion, and what drives you professionally..."
            />
            <div className="mt-2 text-sm text-gray-400">
              This will be used in the About section of your portfolio.
            </div>
          </div>
        </div>
      </div>
    </FormSection>
  );
};

export default PersonalInfoForm;