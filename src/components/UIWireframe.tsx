
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  MessageCircle, 
  BarChart3, 
  BookOpen, 
  Camera, 
  Mic, 
  FileText,
  Lightbulb,
  Target,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Settings,
  Bell,
  Search
} from 'lucide-react';

const UIWireframe = () => {
  const [currentScreen, setCurrentScreen] = useState('onboarding');

  const screens = {
    onboarding: {
      title: 'Onboarding Flow',
      description: 'User setup and goal definition'
    },
    dashboard: {
      title: 'Main Dashboard',
      description: 'Overview of progress and quick actions'
    },
    chat: {
      title: 'AI Chat Interface',
      description: 'Interactive learning with multimodal input'
    },
    lesson: {
      title: 'Dynamic Lesson View',
      description: 'AI-generated content with visuals'
    },
    quiz: {
      title: 'Assessment & Quiz',
      description: 'Interactive quizzes with feedback'
    },
    profile: {
      title: 'Learning Profile',
      description: 'Personalized progress tracking'
    }
  };

  const WireframeBox = ({ children, className = "", height = "auto" }: { children: React.ReactNode, className?: string, height?: string }) => (
    <div className={`border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 ${className}`} style={{ height }}>
      {children}
    </div>
  );

  const MockButton = ({ children, variant = "primary", className = "" }: { children: React.ReactNode, variant?: string, className?: string }) => (
    <div className={`px-4 py-2 rounded text-sm text-center ${
      variant === 'primary' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'
    } ${className}`}>
      {children}
    </div>
  );

  const MockInput = ({ placeholder }: { placeholder: string }) => (
    <div className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-500 text-sm">
      {placeholder}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">AgriTutor AI - UI Wireframes</h1>
          <p className="text-gray-600">Complete user experience flow and interface design</p>
        </div>

        {/* Screen Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.entries(screens).map(([key, screen]) => (
            <Button
              key={key}
              variant={currentScreen === key ? "default" : "outline"}
              onClick={() => setCurrentScreen(key)}
              className="text-xs"
            >
              {screen.title}
            </Button>
          ))}
        </div>

        {/* Current Screen Display */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              {screens[currentScreen as keyof typeof screens].title}
              <Badge variant="outline">{screens[currentScreen as keyof typeof screens].description}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Onboarding Screen */}
            {currentScreen === 'onboarding' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <WireframeBox height="400px">
                  <h3 className="font-semibold mb-4 text-center">Step 1: Welcome</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="font-medium">Welcome to AgriTutor AI</h4>
                      <p className="text-sm text-gray-600">Your personalized agriculture learning companion</p>
                    </div>
                    <MockButton>Get Started</MockButton>
                  </div>
                </WireframeBox>

                <WireframeBox height="400px">
                  <h3 className="font-semibold mb-4 text-center">Step 2: Profile Setup</h3>
                  <div className="space-y-3">
                    <MockInput placeholder="Full Name" />
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Education Level</label>
                      <div className="grid grid-cols-2 gap-2">
                        <MockButton variant="secondary">B.Sc Agri</MockButton>
                        <MockButton variant="secondary">M.Sc Agri</MockButton>
                        <MockButton variant="secondary">Diploma</MockButton>
                        <MockButton variant="secondary">Professional</MockButton>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Interests</label>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline">Crop Science</Badge>
                        <Badge variant="outline">Soil Health</Badge>
                        <Badge variant="outline">Plant Pathology</Badge>
                      </div>
                    </div>
                    <MockButton>Continue</MockButton>
                  </div>
                </WireframeBox>

                <WireframeBox height="400px">
                  <h3 className="font-semibold mb-4 text-center">Step 3: Learning Goals</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Primary Goal</label>
                      <div className="space-y-2">
                        <MockButton variant="secondary">
                          <Target className="w-4 h-4 inline mr-2" />
                          Exam Preparation
                        </MockButton>
                        <MockButton variant="secondary">
                          <BookOpen className="w-4 h-4 inline mr-2" />
                          Course Revision
                        </MockButton>
                        <MockButton variant="secondary">
                          <Trophy className="w-4 h-4 inline mr-2" />
                          Skill Enhancement
                        </MockButton>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Study Time</label>
                      <MockInput placeholder="30 minutes per day" />
                    </div>
                    <MockButton>Start Learning</MockButton>
                  </div>
                </WireframeBox>
              </div>
            )}

            {/* Dashboard Screen */}
            {currentScreen === 'dashboard' && (
              <div className="space-y-6">
                {/* Header */}
                <WireframeBox>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Good morning, Raj! 🌱</h3>
                      <p className="text-sm text-gray-600">Ready to continue your agriculture journey?</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <Settings className="w-5 h-5 text-gray-400" />
                      <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                  </div>
                </WireframeBox>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Quick Stats */}
                  <div className="lg:col-span-2">
                    <WireframeBox>
                      <h4 className="font-medium mb-4">Learning Progress</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">5/20</div>
                          <div className="text-sm text-gray-600">Topics Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">85%</div>
                          <div className="text-sm text-gray-600">Quiz Average</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">7</div>
                          <div className="text-sm text-gray-600">Day Streak</div>
                        </div>
                      </div>
                    </WireframeBox>

                    <WireframeBox className="mt-4">
                      <h4 className="font-medium mb-4">Continue Learning</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div>
                            <h5 className="font-medium">Soil Science</h5>
                            <p className="text-sm text-gray-600">80% complete</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                          <div>
                            <h5 className="font-medium">Plant Pathology</h5>
                            <p className="text-sm text-gray-600">New topic</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </WireframeBox>
                  </div>

                  {/* Quick Actions */}
                  <WireframeBox>
                    <h4 className="font-medium mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <MockButton>
                        <MessageCircle className="w-4 h-4 inline mr-2" />
                        Ask AI Tutor
                      </MockButton>
                      <MockButton variant="secondary">
                        <Camera className="w-4 h-4 inline mr-2" />
                        Analyze Plant Image
                      </MockButton>
                      <MockButton variant="secondary">
                        <FileText className="w-4 h-4 inline mr-2" />
                        Upload PDF Notes
                      </MockButton>
                      <MockButton variant="secondary">
                        <BarChart3 className="w-4 h-4 inline mr-2" />
                        Take Quick Quiz
                      </MockButton>
                    </div>
                  </WireframeBox>
                </div>
              </div>
            )}

            {/* Chat Interface */}
            {currentScreen === 'chat' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <WireframeBox height="500px">
                    <div className="flex flex-col h-full">
                      <div className="border-b border-gray-300 pb-3 mb-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">AgriTutor Chat</h4>
                          <MockButton variant="secondary">
                            <Lightbulb className="w-4 h-4 inline mr-1" />
                            Smart Prompts
                          </MockButton>
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-4 mb-4">
                        <div className="flex justify-start">
                          <div className="bg-gray-200 rounded-lg p-3 max-w-xs">
                            <p className="text-sm">Hello! I'm AgriTutor AI. What would you like to learn today?</p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-green-200 rounded-lg p-3 max-w-xs">
                            <p className="text-sm">Explain nitrogen fixation in simple terms</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-gray-200 rounded-lg p-3 max-w-xs">
                            <p className="text-sm">Nitrogen fixation is like plants having their own fertilizer factory...</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-300 pt-3">
                        <div className="flex items-center gap-2">
                          <MockInput placeholder="Ask about crops, soil, diseases..." />
                          <div className="flex gap-1">
                            <Camera className="w-8 h-8 p-1 border rounded text-gray-600" />
                            <Mic className="w-8 h-8 p-1 border rounded text-gray-600" />
                            <FileText className="w-8 h-8 p-1 border rounded text-gray-600" />
                          </div>
                          <MockButton>Send</MockButton>
                        </div>
                      </div>
                    </div>
                  </WireframeBox>
                </div>

                <WireframeBox height="500px">
                  <h4 className="font-medium mb-4">Quick Topics</h4>
                  <div className="space-y-2">
                    {['Soil Types & Health', 'Crop Diseases', 'Plant Nutrition', 'Irrigation Methods', 'Pest Management', 'Seed Technology'].map((topic, i) => (
                      <div key={i} className="p-2 bg-white rounded border text-sm hover:bg-green-50 cursor-pointer">
                        {topic}
                      </div>
                    ))}
                  </div>
                </WireframeBox>
              </div>
            )}

            {/* Lesson View */}
            {currentScreen === 'lesson' && (
              <div className="space-y-6">
                <WireframeBox>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Nitrogen Fixation in Legumes</h3>
                      <p className="text-sm text-gray-600">Lesson 3 of 8 • Soil Science Module</p>
                    </div>
                    <div className="flex gap-2">
                      <MockButton variant="secondary">
                        <Mic className="w-4 h-4 inline mr-1" />
                        Listen
                      </MockButton>
                      <MockButton variant="secondary">Bookmark</MockButton>
                    </div>
                  </div>
                  
                  <div className="h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
                    <p className="text-gray-500">[AI-Generated Diagram: Root Nodules]</p>
                  </div>
                  
                  <div className="prose max-w-none">
                    <p className="text-sm text-gray-700">
                      Nitrogen fixation is a crucial biological process where atmospheric nitrogen (N₂) is converted into ammonia (NH₃) by specialized bacteria called rhizobia...
                    </p>
                  </div>
                </WireframeBox>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <WireframeBox>
                    <h4 className="font-medium mb-3">Key Points</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        Symbiotic relationship between plants and bacteria
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        Occurs in root nodules of leguminous plants
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        Reduces need for nitrogen fertilizers
                      </li>
                    </ul>
                  </WireframeBox>

                  <WireframeBox>
                    <h4 className="font-medium mb-3">Interactive Elements</h4>
                    <div className="space-y-3">
                      <MockButton>
                        <Search className="w-4 h-4 inline mr-1" />
                        Explain Simpler
                      </MockButton>
                      <MockButton variant="secondary">
                        <Camera className="w-4 h-4 inline mr-1" />
                        Show Examples
                      </MockButton>
                      <MockButton variant="secondary">Take Quiz</MockButton>
                    </div>
                  </WireframeBox>
                </div>
              </div>
            )}

            {/* Quiz Interface */}
            {currentScreen === 'quiz' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <WireframeBox>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Nitrogen Fixation Quiz</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-600">Question 2 of 5</div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">03:45</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="font-medium mb-4">Which bacteria is primarily responsible for nitrogen fixation in legumes?</p>
                      
                      <div className="space-y-2">
                        {['Rhizobium', 'Azotobacter', 'Nitrosomonas', 'Bacillus'].map((option, i) => (
                          <label key={i} className="flex items-center gap-3 p-3 bg-white rounded border cursor-pointer hover:bg-gray-50">
                            <input type="radio" name="answer" className="w-4 h-4" />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <MockButton variant="secondary">Previous</MockButton>
                      <MockButton>Next Question</MockButton>
                    </div>
                  </div>
                </WireframeBox>

                <WireframeBox>
                  <h4 className="font-medium mb-3">Quiz Progress</h4>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map((q, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                        i === 0 ? 'bg-green-200 text-green-800' : 
                        i === 1 ? 'bg-blue-200 text-blue-800' : 
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {i === 0 ? <CheckCircle className="w-4 h-4" /> : q}
                      </div>
                    ))}
                  </div>
                </WireframeBox>
              </div>
            )}

            {/* Profile Screen */}
            {currentScreen === 'profile' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <WireframeBox>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <User className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="font-semibold">Raj Patel</h3>
                    <p className="text-sm text-gray-600">B.Sc Agriculture Student</p>
                    <div className="flex justify-center gap-2 mt-3">
                      <Badge variant="outline">Level 3</Badge>
                      <Badge variant="outline">580 XP</Badge>
                    </div>
                  </div>
                </WireframeBox>

                <WireframeBox>
                  <h4 className="font-medium mb-4">Achievements</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-6 h-6 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium">First Quiz Master</p>
                        <p className="text-xs text-gray-600">Scored 100% on first quiz</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Week Warrior</p>
                        <p className="text-xs text-gray-600">7-day learning streak</p>
                      </div>
                    </div>
                  </div>
                </WireframeBox>

                <WireframeBox>
                  <h4 className="font-medium mb-4">Weak Areas</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <span className="text-sm">Plant Diseases</span>
                      <XCircle className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm">Soil Chemistry</span>
                      <Clock className="w-4 h-4 text-yellow-500" />
                    </div>
                  </div>
                  <MockButton className="mt-3">Study Weak Areas</MockButton>
                </WireframeBox>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Flow Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-800">Complete User Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
              <div className="flex items-center gap-4">
                {[
                  { icon: User, label: 'Sign Up' },
                  { icon: Target, label: 'Set Goals' },
                  { icon: MessageCircle, label: 'AI Chat' },
                  { icon: BookOpen, label: 'Learn' },
                  { icon: BarChart3, label: 'Quiz' },
                  { icon: Trophy, label: 'Progress' }
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <step.icon className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-xs font-medium hidden md:block">{step.label}</span>
                    {i < 5 && <ArrowRight className="w-4 h-4 text-gray-400 hidden md:block" />}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UIWireframe;
