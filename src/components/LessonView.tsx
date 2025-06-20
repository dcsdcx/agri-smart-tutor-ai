
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Brain, HelpCircle, Image, MapPin, RotateCcw } from 'lucide-react';
import { askGemini, generatePrompt } from '@/services/gemini';
import { useToast } from '@/hooks/use-toast';

interface LessonViewProps {
  onClose: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({ onClose }) => {
  const [topic, setTopic] = useState('');
  const [lessonType, setLessonType] = useState<'explain' | 'quiz' | 'visual' | 'regional'>('explain');
  const [region, setRegion] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateLesson = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic to generate lesson content.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const prompt = generatePrompt(topic, lessonType, { region });
      const response = await askGemini(prompt);
      setContent(response);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate lesson content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const lessonTypeIcons = {
    explain: BookOpen,
    quiz: HelpCircle,
    visual: Image,
    regional: MapPin,
  };

  const IconComponent = lessonTypeIcons[lessonType];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-green-800">
            <div className="flex items-center space-x-2">
              <IconComponent className="h-6 w-6" />
              <span>AI Lesson Generator</span>
            </div>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Topic</label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Soil pH, Crop Rotation, IPM"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Lesson Type</label>
              <Select value={lessonType} onValueChange={(value: any) => setLessonType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="explain">Basic Explanation</SelectItem>
                  <SelectItem value="quiz">Generate Quiz</SelectItem>
                  <SelectItem value="visual">Visual Learning Aids</SelectItem>
                  <SelectItem value="regional">Regional Context</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {lessonType === 'regional' && (
            <div>
              <label className="block text-sm font-medium mb-2">Region (Optional)</label>
              <Input
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g., Punjab, Maharashtra, Tamil Nadu"
                className="w-full"
              />
            </div>
          )}

          <Button 
            onClick={handleGenerateLesson} 
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-4 w-4 animate-spin" />
                <span>Generating...</span>
              </div>
            ) : (
              `Generate ${lessonType === 'explain' ? 'Lesson' : lessonType === 'quiz' ? 'Quiz' : lessonType === 'visual' ? 'Visual Guide' : 'Regional Guide'}`
            )}
          </Button>
        </CardContent>
      </Card>

      {content && (
        <Card>
          <CardHeader>
            <CardTitle className="text-green-800">Generated Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-green max-w-none">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {content}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LessonView;
