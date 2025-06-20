
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart3, BookOpen, Brain, TrendingUp, Target, Calendar } from 'lucide-react';

interface UserProgress {
  topicsCompleted: number;
  totalTopics: number;
  averageScore: number;
  studyStreak: number;
  weakAreas: string[];
  strongAreas: string[];
  recentTopics: string[];
}

interface DashboardProps {
  onStartLesson: (topic: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartLesson }) => {
  const [progress, setProgress] = useState<UserProgress>({
    topicsCompleted: 5,
    totalTopics: 20,
    averageScore: 85,
    studyStreak: 7,
    weakAreas: ['Plant Pathology', 'Soil Chemistry'],
    strongAreas: ['Crop Production', 'Farm Management'],
    recentTopics: ['Irrigation Methods', 'Pest Management', 'Seed Technology']
  });

  const completionPercentage = (progress.topicsCompleted / progress.totalTopics) * 100;

  const getNextRecommendedTopic = () => {
    if (progress.weakAreas.length > 0) {
      return progress.weakAreas[0];
    }
    const allTopics = [
      'Agricultural Economics', 'Sustainable Agriculture', 'Crop Genetics',
      'Farm Machinery', 'Post-Harvest Technology', 'Agricultural Marketing'
    ];
    const uncompletedTopics = allTopics.filter(topic => 
      !progress.recentTopics.includes(topic) && 
      !progress.strongAreas.includes(topic)
    );
    return uncompletedTopics[0] || 'General Agriculture Review';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-green-800">Learning Dashboard</h1>
        <Badge variant="outline" className="text-green-600 border-green-600">
          AgriTutor AI
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {progress.topicsCompleted}/{progress.totalTopics}
            </div>
            <p className="text-xs text-gray-600">Topics Completed</p>
            <Progress value={completionPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{progress.averageScore}%</div>
            <p className="text-xs text-gray-600">Quiz Performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{progress.studyStreak}</div>
            <p className="text-xs text-gray-600">Days in a row</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Goal</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-purple-600">
              {getNextRecommendedTopic()}
            </div>
            <p className="text-xs text-gray-600">Recommended Topic</p>
          </CardContent>
        </Card>
      </div>

      {/* Personalized Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>Areas to Improve</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {progress.weakAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium text-red-800">{area}</span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onStartLesson(area)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Study Now
                </Button>
              </div>
            ))}
            {progress.weakAreas.length === 0 && (
              <p className="text-gray-500 text-center py-4">Great job! No weak areas detected.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Your Strengths</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {progress.strongAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-800">{area}</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Strong
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Next Recommended Topic */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-800">Recommended Next Topic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <div>
              <h3 className="text-lg font-semibold text-green-800">{getNextRecommendedTopic()}</h3>
              <p className="text-sm text-gray-600">
                Based on your learning progress and identified weak areas
              </p>
            </div>
            <Button 
              onClick={() => onStartLesson(getNextRecommendedTopic())}
              className="bg-green-600 hover:bg-green-700"
            >
              Start Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
