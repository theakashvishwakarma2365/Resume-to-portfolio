import React, { useState } from 'react';
import { ChevronLeft, Globe, Github, Download, ExternalLink, Copy, Check, Zap, Code, Archive } from 'lucide-react';
import { PortfolioService } from '../../lib/portfolioService';

interface PublishStepProps {
  formData: any;
  selectedTemplate: string;
  onPrev: () => void;
  portfolioId: string | null;
}

const PublishStep: React.FC<PublishStepProps> = ({
  formData,
  selectedTemplate,
  onPrev,
  portfolioId
}) => {
  const [publishMethod, setPublishMethod] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const publishOptions = [
    {
      id: 'netlify',
      name: 'Netlify',
      description: 'Deploy instantly with automatic SSL and global CDN',
      icon: <Globe className="w-8 h-8" />,
      features: ['Free hosting', 'Custom domain support', 'Automatic deployments'],
      color: 'from-teal-500 to-cyan-500'
    },
    {
      id: 'github',
      name: 'GitHub Pages',
      description: 'Host on GitHub with version control integration',
      icon: <Github className="w-8 h-8" />,
      features: ['Free for public repos', 'Git integration', 'Custom domain'],
      color: 'from-gray-700 to-gray-900'
    },
    {
      id: 'download',
      name: 'Download Code',
      description: 'Get the complete source code to host anywhere',
      icon: <Download className="w-8 h-8" />,
      features: ['Full source code', 'Host anywhere', 'Complete ownership'],
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const handlePublish = async (method: string) => {
    setIsPublishing(true);
    setPublishMethod(method);

    try {
      if (method === 'netlify') {
        // Simulate publishing to Netlify
        await new Promise(resolve => setTimeout(resolve, 3000));
        setPublishedUrl('https://your-portfolio-abc123.netlify.app');
        
        // Update database if we have a portfolio ID
        if (portfolioId) {
          await PortfolioService.publishPortfolio(portfolioId, 'https://your-portfolio-abc123.netlify.app');
        }
      } 
      else if (method === 'github') {
        // Simulate publishing to GitHub Pages
        await new Promise(resolve => setTimeout(resolve, 3000));
        setPublishedUrl('https://yourusername.github.io/portfolio');
        
        // Update database if we have a portfolio ID
        if (portfolioId) {
          await PortfolioService.publishPortfolio(portfolioId, 'https://yourusername.github.io/portfolio');
        }
      } 
      else if (method === 'download') {
        setIsDownloading(true);
        // Simulate download preparation
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Create a mock zip file for download
        const mockZipContent = JSON.stringify({
          portfolioData: formData,
          template: selectedTemplate,
          generatedAt: new Date().toISOString()
        }, null, 2);
        
        const blob = new Blob([mockZipContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'portfolio-project.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        setIsDownloading(false);
      }
    } catch (error) {
      console.error('Error during publishing:', error);
      alert('There was an error during publishing. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (publishedUrl && publishMethod !== 'download') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">🎉 Portfolio Published!</h2>
          <p className="text-gray-300 text-lg">Your portfolio is now live and accessible to the world</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">Your Portfolio URL</h3>
            <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
              <input
                type="text"
                value={publishedUrl}
                readOnly
                className="flex-1 bg-transparent text-white border-none outline-none"
              />
              <button
                onClick={() => copyToClipboard(publishedUrl)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={publishedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 justify-center"
            >
              <ExternalLink className="w-4 h-4" />
              View Portfolio
            </a>
            <button
              onClick={() => {
                setPublishedUrl('');
                setPublishMethod('');
              }}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Publish Another Way
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors mx-auto"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Preview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Publish Your Portfolio</h2>
        <p className="text-gray-300 text-lg">Choose how you'd like to share your portfolio with the world</p>
      </div>

      {isPublishing ? (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold text-white mb-4">
            {isDownloading ? 'Preparing Your Project Files...' : 'Publishing Your Portfolio...'}
          </h3>
          <p className="text-gray-300">This may take a few moments. Please don't close this window.</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {publishOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
                onClick={() => handlePublish(option.id)}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform`}>
                    {option.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{option.name}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{option.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center gap-2 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full bg-gradient-to-r ${option.color} text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity`}>
                    {option.id === 'download' ? 'Download Now' : 'Deploy Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Project Code Features */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Project Code Features</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                When you download your project, you'll get a complete, production-ready codebase with these features:
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-indigo-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Optimized Performance</h4>
                <p className="text-gray-400 text-sm">
                  Minified assets, code splitting, and lazy loading for lightning-fast load times
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Responsive Design</h4>
                <p className="text-gray-400 text-sm">
                  Fully responsive layouts that work perfectly on all devices and screen sizes
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Archive className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Complete Source Code</h4>
                <p className="text-gray-400 text-sm">
                  All HTML, CSS, JavaScript, and assets organized in a clean, maintainable structure
                </p>
              </div>
            </div>
          </div>

          {/* Custom Domain Option */}
          <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-md rounded-2xl p-8 border border-orange-400/30 mb-8 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Coming Soon
              </span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Custom Domain</h3>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-2xl mx-auto">
                Want your own custom domain like yourname.com? We'll help you set up a professional 
                domain with SSL certificate and email forwarding.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Custom Domain Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>SSL Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Email Forwarding</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Navigation */}
      <div className="flex justify-center">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Preview
        </button>
      </div>
    </div>
  );
};

export default PublishStep;