import React from 'react';

interface CustomizationPanelProps {
  customizations: any;
  onCustomizationChange: (customizations: any) => void;
  templateType: string;
}

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ 
  customizations, 
  onCustomizationChange, 
  templateType 
}) => {
  const handleColorChange = (colorType: string, color: string) => {
    onCustomizationChange({
      ...customizations,
      colors: {
        ...customizations.colors,
        [colorType]: color
      }
    });
  };

  const handleFontChange = (fontFamily: string) => {
    onCustomizationChange({
      ...customizations,
      typography: {
        ...customizations.typography,
        fontFamily
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Customize Template</h3>
      
      <div className="space-y-6">
        {/* Color Customization */}
        <div>
          <h4 className="font-medium mb-3">Colors</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Color
              </label>
              <input
                type="color"
                value={customizations.colors?.primary || '#3B82F6'}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="w-full h-10 rounded border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secondary Color
              </label>
              <input
                type="color"
                value={customizations.colors?.secondary || '#10B981'}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="w-full h-10 rounded border border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Typography */}
        <div>
          <h4 className="font-medium mb-3">Typography</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Font Family
            </label>
            <select
              value={customizations.typography?.fontFamily || 'Inter'}
              onChange={(e) => handleFontChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Inter">Inter</option>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </div>
        </div>

        {/* Layout Options */}
        <div>
          <h4 className="font-medium mb-3">Layout</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={customizations.layout?.showSidebar || false}
                onChange={(e) => onCustomizationChange({
                  ...customizations,
                  layout: {
                    ...customizations.layout,
                    showSidebar: e.target.checked
                  }
                })}
                className="mr-2"
              />
              <span className="text-sm">Show Sidebar</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={customizations.layout?.fullWidth || false}
                onChange={(e) => onCustomizationChange({
                  ...customizations,
                  layout: {
                    ...customizations.layout,
                    fullWidth: e.target.checked
                  }
                })}
                className="mr-2"
              />
              <span className="text-sm">Full Width</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;
