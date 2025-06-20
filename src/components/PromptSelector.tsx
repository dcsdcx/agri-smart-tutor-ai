
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PROMPT_LIBRARY, 
  PROMPT_CATEGORIES, 
  getPromptsByCategory, 
  fillPromptTemplate,
  PromptTemplate 
} from '@/utils/promptLibrary';

interface PromptSelectorProps {
  onPromptSelect: (prompt: string) => void;
  onClose: () => void;
}

const PromptSelector: React.FC<PromptSelectorProps> = ({ onPromptSelect, onClose }) => {
  const [selectedPrompt, setSelectedPrompt] = useState<PromptTemplate | null>(null);
  const [variables, setVariables] = useState<Record<string, string>>({});

  const handlePromptClick = (prompt: PromptTemplate) => {
    setSelectedPrompt(prompt);
    // Initialize variables
    const initialVars: Record<string, string> = {};
    prompt.variables.forEach(variable => {
      initialVars[variable] = '';
    });
    setVariables(initialVars);
  };

  const handleVariableChange = (variable: string, value: string) => {
    setVariables(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  const handleUsePrompt = () => {
    if (!selectedPrompt) return;
    
    const filledPrompt = fillPromptTemplate(selectedPrompt.template, variables);
    onPromptSelect(filledPrompt);
    onClose();
  };

  const canUsePrompt = selectedPrompt && 
    selectedPrompt.variables.every(variable => variables[variable]?.trim().length > 0);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-green-800">AgriTutor Prompt Library</CardTitle>
        <Button variant="ghost" onClick={onClose}>×</Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Prompt Categories */}
          <div>
            <Tabs defaultValue="lesson" className="w-full">
              <TabsList className="grid w-full grid-cols-3 text-xs">
                {PROMPT_CATEGORIES.slice(0, 3).map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs">
                    {category.icon} {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsList className="grid w-full grid-cols-3 text-xs mt-2">
                {PROMPT_CATEGORIES.slice(3).map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs">
                    {category.icon} {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {PROMPT_CATEGORIES.map(category => (
                <TabsContent key={category.id} value={category.id} className="mt-4">
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {getPromptsByCategory(category.id).map(prompt => (
                      <Button
                        key={prompt.id}
                        variant={selectedPrompt?.id === prompt.id ? "default" : "ghost"}
                        className="w-full justify-start text-left h-auto p-3"
                        onClick={() => handlePromptClick(prompt)}
                      >
                        <div>
                          <div className="font-medium">{prompt.title}</div>
                          <div className="text-sm text-gray-500 mt-1">{prompt.description}</div>
                          {prompt.variables.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {prompt.variables.map(variable => (
                                <Badge key={variable} variant="outline" className="text-xs">
                                  {variable}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Prompt Configuration */}
          <div>
            {selectedPrompt ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-green-800">{selectedPrompt.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{selectedPrompt.description}</p>
                </div>

                {selectedPrompt.variables.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Fill in the details:</h4>
                    {selectedPrompt.variables.map(variable => (
                      <div key={variable}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {variable.replace('_', ' ').toLowerCase()}
                        </label>
                        <Input
                          placeholder={`Enter ${variable.toLowerCase()}`}
                          value={variables[variable] || ''}
                          onChange={(e) => handleVariableChange(variable, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Preview:</h4>
                  <p className="text-sm text-gray-700">
                    {fillPromptTemplate(selectedPrompt.template, variables)}
                  </p>
                </div>

                <Button 
                  onClick={handleUsePrompt}
                  disabled={!canUsePrompt}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Use This Prompt
                </Button>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>Select a prompt template from the left to get started</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptSelector;
