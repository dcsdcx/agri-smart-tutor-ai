import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image, FileText, Sprout, BookOpen, BarChart3, Settings, Lightbulb, GraduationCap, MicOff, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { usePDFUpload } from '@/hooks/usePDFUpload';
import PromptSelector from '@/components/PromptSelector';
import LessonView from '@/components/LessonView';
import Dashboard from '@/components/Dashboard';
import { askGemini } from '@/services/gemini';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m AgriTutor AI, your personalized agriculture learning companion. I can help you understand crop science, soil health, plant diseases, and much more. What would you like to learn today?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [showPromptSelector, setShowPromptSelector] = useState(false);
  const [showLessonView, setShowLessonView] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const { isListening, startListening } = useVoiceInput();
  const { isProcessing, processPDF } = usePDFUpload();
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      toast({
        title: "Image selected",
        description: "Your image is ready to be analyzed!",
      });
    }
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]); // Remove data:image/...;base64, prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleVoiceInput = () => {
    if (isListening) {
      toast({
        title: "Voice Input Active",
        description: "Already listening for voice input...",
      });
      return;
    }

    startListening((transcript) => {
      setInputText(transcript);
      toast({
        title: "Voice Captured",
        description: `Captured: "${transcript}"`,
      });
    });
  };

  const handlePDFUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    try {
      const pdfText = await processPDF(file);
      const prompt = `As AgriTutor AI, analyze this agricultural document and provide key insights: ${pdfText.substring(0, 2000)}...`;
      setInputText(prompt);
      
      toast({
        title: "PDF Ready",
        description: "PDF content has been prepared for analysis.",
      });
    } catch (error) {
      console.error('Error processing PDF:', error);
    }
  };

  const sendMessage = async (customPrompt?: string) => {
    const messageText = customPrompt || inputText;
    if (!messageText.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText || 'Analyzing uploaded image...',
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      let prompt = messageText;
      let imageBase64: string | undefined;

      // Handle image analysis
      if (selectedImage) {
        imageBase64 = await convertImageToBase64(selectedImage);
        if (!messageText.trim()) {
          prompt = "As AgriTutor AI, analyze this agricultural image. Identify what's shown (crop, plant, disease, soil condition, etc.) and provide educational insights about it. Include practical farming advice if relevant.";
        }
      }

      const aiResponse = await askGemini(prompt, imageBase64);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get response from AgriTutor AI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setInputText('');
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handlePromptSelect = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleStartLesson = (topic: string) => {
    setInputText(`Tell me about ${topic}`);
    setActiveTab('chat');
  };

  const startVoiceInput = () => {
    toast({
      title: "Voice Input",
      description: "Voice input feature coming soon!",
    });
  };

  if (showPromptSelector) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
        <PromptSelector 
          onPromptSelect={handlePromptSelect}
          onClose={() => setShowPromptSelector(false)}
        />
      </div>
    );
  }

  if (showLessonView) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4">
        <LessonView onClose={() => setShowLessonView(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AgriTutor AI</h1>
                <p className="text-sm text-gray-600">Your Agriculture Learning Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowPromptSelector(true)}
                className="text-green-600 hover:text-green-800"
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                Smart Prompts
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowLessonView(true)}
                className="text-green-600 hover:text-green-800"
              >
                <GraduationCap className="h-4 w-4 mr-1" />
                AI Lessons
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white">
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Chat & Learn</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Progress</span>
            </TabsTrigger>
            <TabsTrigger value="topics" className="flex items-center space-x-2">
              <Sprout className="h-4 w-4" />
              <span>Topics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Chat Interface */}
              <div className="lg:col-span-3">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="border-b border-green-100">
                    <CardTitle className="text-green-800 flex items-center justify-between">
                      AgriTutor Chat
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowPromptSelector(true)}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <Lightbulb className="h-4 w-4 mr-1" />
                        Smart Prompts
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-0">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] rounded-lg p-3 ${
                            message.isUser 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            {message.imageUrl && (
                              <img 
                                src={message.imageUrl} 
                                alt="Uploaded" 
                                className="mb-2 rounded max-w-full h-auto max-h-32 object-cover"
                              />
                            )}
                            <p className="whitespace-pre-wrap">{message.text}</p>
                            <p className={`text-xs mt-1 ${message.isUser ? 'text-green-100' : 'text-gray-500'}`}>
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-lg p-3">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-green-100 p-4">
                      {selectedImage && (
                        <div className="mb-3 p-2 bg-green-50 rounded-lg flex items-center justify-between">
                          <span className="text-sm text-green-700">Image selected: {selectedImage.name}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setSelectedImage(null)}
                            className="text-green-600 hover:text-green-800"
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                      
                      {isListening && (
                        <div className="mb-3 p-2 bg-blue-50 rounded-lg flex items-center justify-between">
                          <span className="text-sm text-blue-700 flex items-center">
                            <Mic className="h-4 w-4 mr-2 animate-pulse" />
                            Listening for voice input...
                          </span>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <div className="flex-1 flex space-x-2">
                          <Input
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about crops, soil, diseases, or upload an image/PDF..."
                            className="flex-1"
                            disabled={isLoading}
                          />
                          
                          {/* Hidden file inputs */}
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                          />
                          <input
                            type="file"
                            ref={pdfInputRef}
                            onChange={handlePDFUpload}
                            accept=".pdf"
                            className="hidden"
                          />
                          
                          {/* Input buttons */}
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isLoading}
                            className="border-green-200 hover:bg-green-50"
                            title="Upload Image"
                          >
                            <Image className="h-4 w-4 text-green-600" />
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => pdfInputRef.current?.click()}
                            disabled={isLoading || isProcessing}
                            className="border-green-200 hover:bg-green-50"
                            title="Upload PDF"
                          >
                            {isProcessing ? (
                              <Upload className="h-4 w-4 text-green-600 animate-spin" />
                            ) : (
                              <FileText className="h-4 w-4 text-green-600" />
                            )}
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handleVoiceInput}
                            disabled={isLoading}
                            className={`border-green-200 hover:bg-green-50 ${isListening ? 'bg-blue-50' : ''}`}
                            title={isListening ? "Listening..." : "Voice Input"}
                          >
                            {isListening ? (
                              <MicOff className="h-4 w-4 text-blue-600" />
                            ) : (
                              <Mic className="h-4 w-4 text-green-600" />
                            )}
                          </Button>
                        </div>
                        <Button 
                          onClick={() => sendMessage()} 
                          disabled={isLoading || (!inputText.trim() && !selectedImage)} 
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Topics Sidebar */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">Quick Topics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      'Soil Types & Health',
                      'Crop Diseases',
                      'Plant Nutrition',
                      'Irrigation Methods',
                      'Pest Management',
                      'Seed Technology',
                      'Weather & Climate',
                      'Organic Farming'
                    ].map((topic) => (
                      <Button
                        key={topic}
                        variant="ghost"
                        className="w-full justify-start text-sm hover:bg-green-50 hover:text-green-700"
                        onClick={() => setInputText(`Tell me about ${topic}`)}
                      >
                        {topic}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="mt-6">
            <Dashboard onStartLesson={handleStartLesson} />
          </TabsContent>

          <TabsContent value="topics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Soil Science', progress: 80, status: 'In Progress' },
                { title: 'Crop Production', progress: 60, status: 'In Progress' },
                { title: 'Plant Pathology', progress: 100, status: 'Completed' },
                { title: 'Agricultural Economics', progress: 0, status: 'Not Started' },
                { title: 'Farm Management', progress: 30, status: 'In Progress' },
                { title: 'Sustainable Agriculture', progress: 0, status: 'Not Started' },
              ].map((topic) => (
                <Card key={topic.title} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                    <p className={`text-sm ${
                      topic.status === 'Completed' ? 'text-green-600' : 
                      topic.status === 'In Progress' ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {topic.status}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${topic.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{topic.progress}% Complete</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
