'use client';

import { useState } from 'react';
import Link from 'next/link';
// Imports simplifiés pour la vue planning workflow

// Workflow de planification - Cycle de 4 semaines
const planningWorkflow = [
  { 
    week: 4, 
    phase: 'Réunion et validation stratégie client', 
    color: '#8B5CF6', 
    icon: '🤝',
    tasks: [
      'Réunion stratégie avec client',
      'Validation des objectifs',
      'Définition du budget',
      'Planning timeline',
      'Briefing équipes'
    ]
  },
  { 
    week: 1, 
    phase: 'Brief créative et mailing', 
    color: '#3B82F6', 
    icon: '🎯',
    tasks: [
      'Brief créatif détaillé',
      'Stratégie mailing automation',
      'Définition personas',
      'Moodboard et références',
      'Validation brief créatif'
    ]
  },
  { 
    week: 2, 
    phase: 'Design', 
    color: '#EF4444', 
    icon: '🎨',
    tasks: [
      'Création visuels publicitaires',
      'Design vidéos créatives',
      'Maquettes emailing',
      'Validation designs',
      'Déclinaisons formats'
    ]
  },
  { 
    week: 3, 
    phase: 'Intégration', 
    color: '#10B981', 
    icon: '⚙️',
    tasks: [
      'Setup campagnes publicitaires',
      'Intégration emailings',
      'Tests techniques',
      'Configuration tracking',
      'Validation finale'
    ]
  }
];

// Générer les cycles de 4 semaines
const generateCycles = () => {
  const cycles = [];
  const today = new Date();
  const currentMonday = new Date(today);
  currentMonday.setDate(today.getDate() - today.getDay() + 1);
  
  // Générer 6 cycles (24 semaines = 6 mois)
  for (let cycle = 0; cycle < 6; cycle++) {
    const weeks = [];
    
    for (let week = 0; week < 4; week++) {
      const weekStart = new Date(currentMonday);
      weekStart.setDate(currentMonday.getDate() + ((cycle * 4 + week) * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      const monthName = weekStart.toLocaleDateString('fr-FR', { month: 'long' });
      
      // Les jours de la semaine (Lundi à Vendredi)
      const days = [];
      for (let day = 0; day < 5; day++) {
        const dayDate = new Date(weekStart);
        dayDate.setDate(weekStart.getDate() + day);
        days.push({
          date: dayDate,
          dayName: dayDate.toLocaleDateString('fr-FR', { weekday: 'long' }),
          dayNumber: dayDate.getDate(),
          shortLabel: `${dayDate.getDate().toString().padStart(2, '0')}/${(dayDate.getMonth() + 1).toString().padStart(2, '0')}`
        });
      }
      
      // Trouver le workflow correspondant (4, 1, 2, 3)
      const workflowOrder = [4, 1, 2, 3];
      const workflowIndex = workflowOrder[week];
      const workflow = planningWorkflow.find(w => w.week === workflowIndex);
      
      weeks.push({
        weekNumber: workflowIndex,
        startDate: weekStart,
        endDate: weekEnd,
        monthName: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        days,
        workflow
      });
    }
    
    cycles.push({
      cycleNumber: cycle + 1,
      weeks,
      mainMonth: weeks[1].monthName, // Mois principal = semaine 1
      period: `${weeks[0].days[0].shortLabel} - ${weeks[3].days[4].shortLabel}`
    });
  }
  
  return cycles;
};

export default function PlanningPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCycle, setSelectedCycle] = useState(0);
  
  // Générer les cycles
  const cycles = generateCycles();

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              ← Dashboard
            </Link>
            <h1 className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              📅 Planning E-commerce
            </h1>
          </div>
          
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 ${
              isDarkMode 
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
            }`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Sélecteur de cycle */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {cycles.map((cycle, index) => (
              <button
                key={index}
                onClick={() => setSelectedCycle(index)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCycle === index
                    ? isDarkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-500 text-white'
                    : isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <div className="text-sm font-medium">Cycle {cycle.cycleNumber}</div>
                <div className="text-xs opacity-75">{cycle.mainMonth}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Vue planning 4 semaines */}
        <div className={`rounded-xl p-6 mb-8 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'
        }`}>
          <div className="text-center mb-6">
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              🗓️ Cycle {cycles[selectedCycle].cycleNumber} - Planning 4 semaines
            </h2>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Période : {cycles[selectedCycle].period}
            </p>
          </div>

          {/* Légende workflow */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {planningWorkflow.map((step, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center p-3 rounded-lg text-white font-medium"
                style={{ backgroundColor: step.color }}
              >
                <span className="mr-2">{step.icon}</span>
                <span className="text-sm">S{step.week} - {step.phase}</span>
              </div>
            ))}
          </div>

          {/* Planning par jour - 5 colonnes par semaine */}
          <div className="space-y-6">
            {cycles[selectedCycle].weeks.map((week, weekIndex) => (
              <div key={weekIndex} className={`border-l-4 pl-4 ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`} style={{ borderLeftColor: week.workflow?.color }}>
                
                {/* En-tête semaine */}
                <div className="flex items-center mb-4">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4"
                    style={{ backgroundColor: week.workflow?.color }}
                  >
                    {week.weekNumber}
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {week.workflow?.icon} {week.workflow?.phase}
                    </h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Semaine {week.weekNumber}
                    </p>
                  </div>
                </div>

                {/* 5 jours de la semaine */}
                <div className="grid grid-cols-5 gap-4">
                  {week.days.map((day, dayIndex) => (
                    <div key={dayIndex} className={`p-4 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      {/* En-tête jour */}
                      <div className="text-center mb-3">
                        <div className={`text-sm font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-800'
                        }`}>
                          {day.dayName.charAt(0).toUpperCase() + day.dayName.slice(1)}
                        </div>
                        <div className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {day.shortLabel}
                        </div>
                      </div>

                      {/* Tâches du jour */}
                      <div className="space-y-2">
                        {week.workflow?.tasks.slice(dayIndex, dayIndex + 1).map((task, taskIndex) => (
                          <div key={taskIndex} className={`p-2 rounded text-xs text-center ${
                            isDarkMode ? 'bg-gray-600' : 'bg-white'
                          }`} style={{ 
                            borderLeft: `3px solid ${week.workflow?.color}`,
                            backgroundColor: isDarkMode ? undefined : week.workflow?.color + '15'
                          }}>
                            <div className={`font-medium ${
                              isDarkMode ? 'text-gray-200' : 'text-gray-800'
                            }`}>
                              {task}
                            </div>
                          </div>
                        ))}
                        
                        {/* Tâches additionnelles si moins de 5 */}
                        {week.workflow?.tasks.length && dayIndex < week.workflow.tasks.length && (
                          <div className={`p-2 rounded text-xs text-center ${
                            isDarkMode ? 'bg-gray-600' : 'bg-white'
                          }`} style={{ 
                            borderLeft: `3px solid ${week.workflow?.color}`,
                            backgroundColor: isDarkMode ? undefined : week.workflow?.color + '15'
                          }}>
                            <div className={`font-medium ${
                              isDarkMode ? 'text-gray-200' : 'text-gray-800'
                            }`}>
                              {week.workflow.tasks[dayIndex]}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Résumé du workflow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {planningWorkflow.map((step, index) => (
            <div key={index} className={`rounded-xl p-6 text-center ${
              isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'
            }`}>
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-lg"
                style={{ backgroundColor: step.color }}
              >
                {step.icon}
              </div>
              <div className={`text-lg font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Semaine {step.week}
              </div>
              <div className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {step.phase}
              </div>
              <div className={`text-xs mt-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {step.tasks.length} tâches principales
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}