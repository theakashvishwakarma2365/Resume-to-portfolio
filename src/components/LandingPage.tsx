import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Zap, 
  Globe, 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  Star,
  Users,
  User,
  Settings,
  LogOut,
  Code,
  Palette,
  Download,
  Shield,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  DollarSign,
  Crown,
  Rocket,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = () => {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  const features = [
    {
      icon: <FileText className="w-8 h-8 text-blue-400" />,
      title: "Smart Form Builder",
      description: "Comprehensive form sections for all your professional details"
    },
    {
      icon: <Zap className="w-8 h-8 text-emerald-400" />,
      title: "Instant Preview",
      description: "See your portfolio come to life in real-time as you build"
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-400" />,
      title: "One-Click Publishing",
      description: "Deploy your professional portfolio to a live URL instantly"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-orange-400" />,
      title: "Beautiful Templates",
      description: "Choose from professionally designed, responsive templates"
    },
    {
      icon: <Code className="w-8 h-8 text-cyan-400" />,
      title: "Developer Friendly",
      description: "Export clean code or integrate with your existing workflow"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-pink-400" />,
      title: "Mobile Optimized",
      description: "Perfect display on all devices from mobile to desktop"
    }
  ];

  const benefits = [
    "No coding required - just fill the form",
    "Mobile-responsive design guaranteed",
    "Professional templates designed by experts",
    "Download resume functionality included",
    "SEO optimized for better visibility",
    "Fast loading and modern design"
  ];

  const tools = [
    {
      name: "Resume Builder",
      description: "Create professional resumes with our easy-to-use builder",
      icon: <FileText className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Website Builder",
      description: "Transform your resume into a stunning personal website",
      icon: <Globe className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Template Designer",
      description: "Customize templates to match your personal brand",
      icon: <Palette className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "1 Portfolio Website",
        "3 Template Options",
        "Basic Customization",
        "Standard Support",
        "Download Resume PDF"
      ],
      buttonText: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      period: "month",
      description: "Best for professionals",
      features: [
        "Unlimited Portfolios",
        "All Premium Templates",
        "Advanced Customization",
        "Priority Support",
        "Custom Domain",
        "Analytics Dashboard",
        "Remove Branding"
      ],
      buttonText: "Start Pro Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$29",
      period: "month",
      description: "For teams and agencies",
      features: [
        "Everything in Pro",
        "Team Collaboration",
        "White-label Solution",
        "API Access",
        "Dedicated Support",
        "Custom Integrations",
        "Advanced Analytics"
      ],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  const examples = [
    {
      name: "Sarah Chen",
      role: "UX Designer",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      template: "Creative Portfolio"
    },
    {
      name: "Marcus Johnson",
      role: "Software Engineer",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
      template: "Tech Professional"
    },
    {
      name: "Elena Rodriguez",
      role: "Marketing Manager",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
      template: "Modern Professional"
    }
  ];

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 py-4 lg:py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="text-lg lg:text-xl font-bold text-white">ResumeWebsite</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#templates" className="text-gray-300 hover:text-white transition-colors">Templates</a>
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#examples" className="text-gray-300 hover:text-white transition-colors">Examples</a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-white p-2"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Auth Section */}
            <div className="hidden md:block">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{user.user_metadata?.full_name || 'User'}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <button
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <hr className="my-1" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/auth"
                    className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/auth"
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 font-medium"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4">
              <div className="flex flex-col space-y-4">
                <a href="#templates" className="text-gray-300 hover:text-white transition-colors py-2">Templates</a>
                <a href="#features" className="text-gray-300 hover:text-white transition-colors py-2">Features</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors py-2">Pricing</a>
                <a href="#examples" className="text-gray-300 hover:text-white transition-colors py-2">Examples</a>
                <hr className="border-white/20" />
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <Link to="/dashboard" className="text-white py-2">Dashboard</Link>
                    <button onClick={handleSignOut} className="text-red-400 py-2 text-left">Sign Out</button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link to="/auth" className="text-gray-300 hover:text-white py-2">Sign In</Link>
                    <Link to="/auth" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center">Get Started</Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 lg:py-20 text-center relative">
        {/* AI-Powered Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/30 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-blue-300 text-sm font-medium">AI-Powered Website Generation</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Turn Your Resume
            <br />
            Into a
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Professional Website
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your resume into a stunning, fully responsive personal website in minutes. 
            AI-powered content optimization, premium templates, and seamless deployment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {user ? (
              <Link 
                to="/dashboard"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center gap-2 group shadow-lg w-full sm:w-auto justify-center"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <Link 
                to="/auth"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center gap-2 group shadow-lg w-full sm:w-auto justify-center"
              >
                Start Building Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            <button className="border-2 border-gray-400 text-gray-300 px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-300 hover:text-white transition-colors w-full sm:w-auto">
              View Demo
            </button>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['React', 'TypeScript', 'Node.js', 'Python'].map((tech) => (
              <span key={tech} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>10K+ Portfolios Created</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="templates" className="container mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Powerful Tools for Every Professional
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the right tool for your needs - from simple resumes to complete portfolio websites
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 text-center">
              <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}>
                {tool.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{tool.name}</h3>
              <p className="text-gray-300 leading-relaxed">{tool.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Everything You Need to Shine
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our platform provides all the tools you need to create a professional portfolio that stands out
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 py-16 lg:py-20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Start free and upgrade as you grow. All plans include our core features.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white/10 backdrop-blur-md rounded-2xl border p-8 relative ${
                plan.popular ? 'border-blue-400 bg-blue-500/20' : 'border-white/20'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-300">/{plan.period}</span>
                  </div>
                  <p className="text-gray-300">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="container mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            See What Others Have Built
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get inspired by portfolios created by professionals across different industries
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
                <img 
                  src={example.image} 
                  alt={example.name}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">{example.name}</h3>
                  <p className="text-sm opacity-90">{example.role}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-300 text-sm mb-4">Template: {example.template}</p>
                <button className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-1">
                  View Portfolio <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 py-16 lg:py-20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Why Choose ResumeWebsite?
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                We've made it incredibly simple to create a professional portfolio that showcases your skills and experience in the best possible way.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-md p-8 rounded-2xl border border-white/20">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
                <p className="text-gray-300 mb-6">
                  Join thousands of professionals who have already created their portfolios with us.
                </p>
                {user ? (
                  <Link 
                    to="/dashboard"
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <Link 
                    to="/auth"
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                  >
                    Create Your Portfolio
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-white/10 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">ResumeWebsite</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Create professional portfolios that help you stand out and land your dream job.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#templates" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#examples" className="hover:text-white transition-colors">Examples</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ResumeWebsite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;