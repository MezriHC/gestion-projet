'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  projects, 
  poleColors,
  poleIcons,
  HOURS_PER_DAY,
  ProjectActivity
} from '@/data/simple-projects';

// Générer les dates pour les 12 prochaines semaines
const generateWeeks = () => {
  const weeks = [];
  const today = new Date();
  const currentMonday = new Date(today);
  currentMonday.setDate(today.getDate() - today.getDay() + 1);
  
  for (let i = 0; i < 12; i++) {
    const weekStart = new Date(currentMonday);
    weekStart.setDate(currentMonday.getDate() + (i * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    weeks.push({
      weekNumber: i + 1,
      startDate: weekStart,
      endDate: weekEnd,
      label: `${weekStart.getDate().toString().padStart(2, '0')}/${(weekStart.getMonth() + 1).toString().padStart(2, '0')} - ${weekEnd.getDate().toString().padStart(2, '0')}/${(weekEnd.getMonth() + 1).toString().padStart(2, '0')}`
    });
  }
  
  return weeks;
};

// Workflow de planification
const planningWorkflow = [
  { week: -6, pole: 'ADS', phase: 'Validation stratégie', color: '#3B82F6', icon: '🎯' },
  { week: -4, pole: 'ADS', phase: 'Brief finalisé', color: '#3B82F6', icon: '🎯' },
  { week: -2, pole: 'CREATIVE', phase: 'Design créatif', color: '#EF4444', icon: '🎨' },
  { week: -1, pole: 'INTEGRATION', phase: 'Intégration', color: '#10B981', icon: '⚙️' },
  { week: 0, pole: 'LIVE', phase: 'Campagnes actives', color: '#8B5CF6', icon: '🚀' }
];

export default function PlanningPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Filtrer seulement les clients e-commerce
  const ecommerceClients = projects.filter(p => p.clientType === 'ecommerce');
  
  // Générer les semaines
  const weeks = generateWeeks();
  
  // Fonction pour obtenir les tâches d'une semaine donnée
  const getWeekTasks = (weekOffset: number) => {
    const workflowStep = planningWorkflow.find(w => w.week === weekOffset);
    if (!workflowStep) return [];
    
    return ecommerceClients.map(client => {
      // Filtrer les activités selon le pôle de la semaine
      let activities: ProjectActivity[] = [];
      
      switch (workflowStep.pole) {
        case 'ADS':
          activities = client.activities.filter(a => a.pole === 'ADS');
          break;
        case 'CREATIVE':
          activities = client.activities.filter(a => a.pole === 'CREATIVE');
          break;
        case 'INTEGRATION':
          activities = client.activities.filter(a => a.pole === 'INTEGRATION');
          break;
        case 'LIVE':
          activities = [{ name: 'Campagnes actives + Reporting', days: 0, pole: 'ADS', type: 'ADS_REPORTING' as const }];
          break;
      }
      
      if (activities.length === 0) return null;
      
      return {
        client: client.client,
        activities,
        totalDays: activities.reduce((sum, a) => sum + a.days, 0),
        priority: client.priority
      };
    }).filter(Boolean);
  };

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

        {/* Légende du workflow */}
        <div className={`rounded-xl p-6 mb-8 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'
        }`}>
          <h3 className={`text-lg font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            🔄 Workflow de planification (6-8 semaines d&apos;avance)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {planningWorkflow.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: step.color }}
                ></div>
                <div>
                  <div className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {step.icon} {step.phase}
                  </div>
                  <div className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Semaine {step.week >= 0 ? '+' : ''}{step.week}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vue planning par semaines */}
        <div className={`rounded-xl p-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'
        }`}>
          <h3 className={`text-lg font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            📊 Planning sur 12 semaines
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {weeks.slice(0, 9).map((week, index) => {
              const weekOffset = index - 6; // Semaine 0 = index 6
              const workflowStep = planningWorkflow.find(w => w.week === weekOffset);
              const weekTasks = getWeekTasks(weekOffset);
              
              return (
                <div key={week.weekNumber} className={`rounded-lg border-2 p-4 ${
                  workflowStep 
                    ? 'border-opacity-50' 
                    : isDarkMode ? 'border-gray-600' : 'border-gray-200'
                }`}
                style={{ 
                  borderColor: workflowStep ? workflowStep.color : undefined 
                }}>
                  
                  {/* En-tête de semaine */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-800'
                      }`}>
                        Semaine {weekOffset >= 0 ? '+' : ''}{weekOffset}
                      </div>
                      <div className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {week.label}
                      </div>
                    </div>
                    {workflowStep && (
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: workflowStep.color }}
                        ></div>
                        <span className={`text-xs ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {workflowStep.icon}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Phase de travail */}
                  {workflowStep && (
                    <div className={`mb-3 p-2 rounded text-xs font-medium text-center ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                    style={{ 
                      backgroundColor: isDarkMode ? undefined : workflowStep.color + '20',
                      color: workflowStep.color 
                    }}>
                      {workflowStep.phase}
                    </div>
                  )}

                  {/* Tâches clients */}
                  <div className="space-y-2">
                    {weekTasks.length > 0 ? (
                      weekTasks.slice(0, 5).map((task, taskIndex) => {
                        if (!task) return null;
                        return (
                        <div key={taskIndex} className={`p-2 rounded text-xs ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                        }`}>
                          <div className={`font-medium truncate ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-800'
                          }`}>
                            {task.client.replace(/ - SEA$/, '').replace(/\(interne\)/, '')}
                          </div>
                          <div className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {task.totalDays}j • {task.activities.length} tâche{task.activities.length > 1 ? 's' : ''}
                          </div>
                        </div>
                        );
                      })
                    ) : (
                      <div className={`text-xs text-center py-4 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        Aucune tâche planifiée
                      </div>
                    )}
                    
                    {weekTasks.length > 5 && (
                      <div className={`text-xs text-center ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        +{weekTasks.length - 5} autres clients...
                      </div>
                    )}
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>

        {/* Résumé des charges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {(Object.entries(poleColors) as [keyof typeof poleColors, string][]).map(([pole, color]) => {
            const totalDays = ecommerceClients.reduce((sum, client) => {
              return sum + client.activities
                .filter(a => a.pole === pole)
                .reduce((actSum, a) => actSum + a.days, 0);
            }, 0);
            
            return (
              <div key={pole} className={`rounded-xl p-6 text-center ${
                isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'
              }`}>
                <div className="text-2xl font-bold mb-2" style={{ color }}>
                  {Math.round(totalDays * 10) / 10}j
                </div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {poleIcons[pole]} Pôle {pole}
                </div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {Math.round(totalDays * HOURS_PER_DAY)}h total
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}