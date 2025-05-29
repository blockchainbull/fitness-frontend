"use client"

import React, { useState } from 'react';
import { Bell, Plus, MoreHorizontal, Eye, Home, MessageSquare, User } from 'lucide-react';
import { FaUtensils, FaWalking, FaDumbbell, FaTint, FaFire } from 'react-icons/fa';
import { GiWeightScale } from 'react-icons/gi';

const Dashboard: React.FC = () => {
  const [waterGlasses, setWaterGlasses] = useState(4);
  const [activeTab, setActiveTab] = useState('home');

  const addWaterGlass = () => {
    if (waterGlasses < 10) {
      setWaterGlasses(waterGlasses + 1);
    }
  };

  const resetWater = () => {
    setWaterGlasses(0);
  };

  // Sample user data - would come from your user context/state
  const userData = {
    name: "bulli",
    weightProgress: {
      starting: 90.0,
      current: 90.0,
      goal: 92.0,
      percentage: 100
    },
    calories: {
      goal: 3185,
      consumed: 0,
      remaining: 3185
    },
    macros: {
      carbs: { percentage: 45, consumed: 0, goal: 3185 },
      protein: { percentage: 30, consumed: 0, goal: 3185 },
      fat: { percentage: 25, consumed: 0, goal: 3185 }
    },
    steps: {
      current: 6500,
      goal: 10000,
      percentage: 65
    },
    healthMetrics: {
      bmi: 28.4,
      bmr: 1868,
      tdee: 2895
    }
  };

  const todaysWorkout = {
    name: "Fat Burning HIIT Workout",
    duration: 35,
    calories: 350,
    exercises: [
      { name: "Jumping Jacks", sets: 3, duration: 45, rest: 15 },
      { name: "Mountain Climbers", sets: 3, duration: 45, rest: 15 },
      { name: "Burpees", sets: 3, duration: 45, rest: 15 },
      { name: "High Knees", sets: 3, duration: 45, rest: 15 },
      { name: "Plank", sets: 3, duration: 45, rest: 15 }
    ]
  };

  const mealPlan = [
    { type: "Breakfast", time: "7:30 AM", name: "Greek yogurt with berries and almonds", calories: 320, icon: "B" },
    { type: "Lunch", time: "12:30 PM", name: "Grilled chicken salad with olive oil dressing", calories: 450, icon: "L" },
    { type: "Dinner", time: "7:00 PM", name: "Baked salmon with steamed vegetables", calories: 380, icon: "D" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pt-12">
        <h1 className="text-2xl font-bold text-white">Welcome, {userData.name}</h1>
        <Bell className="w-6 h-6 text-white" />
      </div>

      {/* Content */}
      <div className="px-6 pb-24 space-y-6">
        {/* Weight Loss Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Weight Loss Progress</h2>
          
          <div className="flex justify-between items-center mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Starting</p>
              <p className="text-lg font-semibold text-gray-900">{userData.weightProgress.starting} kg</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Current</p>
              <p className="text-lg font-semibold text-purple-600">{userData.weightProgress.current} kg</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Goal</p>
              <p className="text-lg font-semibold text-purple-600">{userData.weightProgress.goal} kg</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${userData.weightProgress.percentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">{userData.weightProgress.percentage}% of your goal achieved</p>
        </div>

        {/* Today's Summary */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Today's Summary</h2>
          
          {/* Calories */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Calories</h3>
              <span className="text-green-600 font-semibold">{userData.calories.remaining} remaining</span>
            </div>
            
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>Goal: {userData.calories.goal}</span>
              <span>Consumed: {userData.calories.consumed}</span>
            </div>

            {/* Macronutrients */}
            <h4 className="font-semibold text-gray-900 mb-4">Macronutrients</h4>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* Carbs */}
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                    <circle 
                      cx="32" cy="32" r="28" 
                      stroke="#3b82f6" strokeWidth="4" fill="none"
                      strokeDasharray={`${userData.macros.carbs.percentage * 1.76} 176`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold">{userData.macros.carbs.percentage}%</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-blue-600">Carbs</p>
              </div>

              {/* Protein */}
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                    <circle 
                      cx="32" cy="32" r="28" 
                      stroke="#ef4444" strokeWidth="4" fill="none"
                      strokeDasharray={`${userData.macros.protein.percentage * 1.76} 176`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold">{userData.macros.protein.percentage}%</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-red-600">Protein</p>
              </div>

              {/* Fat */}
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                    <circle 
                      cx="32" cy="32" r="28" 
                      stroke="#f59e0b" strokeWidth="4" fill="none"
                      strokeDasharray={`${userData.macros.fat.percentage * 1.76} 176`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold">{userData.macros.fat.percentage}%</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-yellow-600">Fat</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
              <div>
                <p className="text-yellow-600">🍽️ Food</p>
                <p className="font-semibold">{userData.macros.carbs.consumed}</p>
              </div>
              <div>
                <p className="text-green-600">🎯 Goal</p>
                <p className="font-semibold">{userData.macros.protein.goal}</p>
              </div>
              <div>
                <p className="text-blue-600">📊 Remaining</p>
                <p className="font-semibold">{userData.macros.fat.goal}</p>
              </div>
            </div>

            <button className="w-full py-2 border-2 border-yellow-500 text-yellow-600 rounded-lg font-semibold hover:bg-yellow-50 transition-colors">
              + Add Meal
            </button>
          </div>
        </div>

        {/* Water Intake */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Water Intake</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <FaTint className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-gray-900">Water Intake</span>
              </div>
              <span className="text-blue-600 font-semibold">{Math.round(waterGlasses * 10)}%</span>
            </div>
            
            <p className="text-gray-600 mb-4">{waterGlasses}/10 glasses</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${waterGlasses * 10}%` }}
              ></div>
            </div>

            <div className="flex justify-center space-x-2 mb-4">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full ${
                    index < waterGlasses ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                >
                  <FaTint className={`w-4 h-4 m-1 ${
                    index < waterGlasses ? 'text-white' : 'text-gray-400'
                  }`} />
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={addWaterGlass}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                + Add Glass
              </button>
              <button 
                onClick={resetWater}
                className="text-blue-500 py-2 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Daily Activity */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Daily Activity</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <FaWalking className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-gray-900">Daily Steps</span>
              </div>
              <span className="text-green-600 font-semibold">{userData.steps.percentage}%</span>
            </div>

            <div className="text-center mb-4">
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                  <circle 
                    cx="48" cy="48" r="40" 
                    stroke="#10b981" strokeWidth="6" fill="none"
                    strokeDasharray={`${userData.steps.percentage * 2.51} 251`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-gray-900">{userData.steps.current}</span>
                  <span className="text-xs text-gray-600">steps</span>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-600 mb-2">Goal: {userData.steps.goal} steps</p>
            <p className="text-center text-sm text-gray-500">Steps tracked automatically</p>
          </div>
        </div>

        {/* Exercise Activity */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Exercise Activity</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Exercise</h3>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Today</span>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-center mb-4">
              <FaFire className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">0</p>
              <p className="text-sm text-gray-600">calories burned (Today)</p>
            </div>

            <div className="text-center mb-4">
              <FaDumbbell className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No exercises recorded for Today</p>
            </div>

            <button className="w-full py-2 border-2 border-green-500 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              + Add Exercise
            </button>
          </div>
        </div>

        {/* Meal Plan */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Meal Plan</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <FaUtensils className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-900">Today's Recommended Meals</h3>
            </div>

            <div className="space-y-4">
              {mealPlan.map((meal, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-semibold text-sm">{meal.icon}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{meal.type}</p>
                      <p className="text-sm text-gray-600">{meal.name}</p>
                      <p className="text-sm text-orange-600 font-semibold">{meal.calories} calories</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{meal.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Workout */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Today's Workout</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <FaDumbbell className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="font-semibold text-gray-900">{todaysWorkout.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>⏱️ {todaysWorkout.duration} min</span>
                    <span>🔥 {todaysWorkout.calories} calories</span>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                Start
              </button>
            </div>

            <div className="space-y-3 mb-4">
              {todaysWorkout.exercises.map((exercise, index) => (
                <div key={index} className="flex items-center space-x-3 py-2">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{exercise.name}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <span>🔄 {exercise.sets} sets</span>
                      <span>⏱️ {exercise.duration} sec</span>
                      <span>⏸️ {exercise.rest} sec</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-2 text-blue-500 font-semibold hover:bg-blue-50 transition-colors rounded-lg">
              👁️ View Exercise Details
            </button>
          </div>
        </div>

        {/* Key Health Metrics */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Key Health Metrics</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Metrics</h3>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16">
                    <circle cx="32" cy="32" r="28" stroke="#f59e0b" strokeWidth="4" fill="none" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-orange-600">{userData.healthMetrics.bmi}</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">BMI</p>
                <p className="text-xs text-orange-600">Overweight</p>
              </div>

              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16">
                    <circle cx="32" cy="32" r="28" stroke="#3b82f6" strokeWidth="4" fill="none" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">{userData.healthMetrics.bmr}</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">BMR</p>
                <p className="text-xs text-blue-600">calories/day</p>
              </div>

              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16">
                    <circle cx="32" cy="32" r="28" stroke="#10b981" strokeWidth="4" fill="none" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-green-600">{userData.healthMetrics.tdee}</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">TDEE</p>
                <p className="text-xs text-green-600">calories/day</p>
              </div>
            </div>

            <button className="w-full py-2 text-blue-500 font-semibold hover:bg-blue-50 transition-colors rounded-lg">
              📊 View Detailed Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-3 py-2">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-2 ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-400'}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('coach')}
            className={`flex flex-col items-center py-2 ${activeTab === 'coach' ? 'text-blue-500' : 'text-gray-400'}`}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-xs mt-1">AI Coach</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center py-2 ${activeTab === 'profile' ? 'text-blue-500' : 'text-gray-400'}`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;