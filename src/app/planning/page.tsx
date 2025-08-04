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

// Workflow de planification - Cycle de 5 semaines
const planningWorkflow = [
  { 
    week: 1, 
    pole: 'ADS', 
    phase: 'Stratégie & Brief', 
    color: '#3B82F6', 
    icon: '🎯',
    description: 'Validation stratégie + Brief détaillé'
  },
  { 
    week: 2, 
    pole: 'ADS', 
    phase: 'Finalisation Brief', 
    color: '#3B82F6', 
    icon: '🎯',
    description: 'Brief finalisé + Validation client'
  },
  { 
    week: 3, 
    pole: 'CREATIVE', 
    phase: 'Création Design', 
    color: '#EF4444', 
    icon: '🎨',
    description: 'Design créatifs + Vidéos + Visuels'
  },
  { 
    week: 4, 
    pole: 'INTEGRATION', 
    phase: 'Intégration & Setup', 
    color: '#10B981', 
    icon: '⚙️',
    description: 'Intégration technique + Tests'
  },
  { 
    week: 5, 
    pole: 'LIVE', 
    phase: 'Lancement & Suivi', 
    color: '#8B5CF6', 
    icon: '🚀',
    description: 'Campagnes live + Optimisation'
  }
];

// Générer les cycles de 5 semaines
const generateCycles = () => {
  const cycles = [];
  const today = new Date();
  const currentMonday = new Date(today);
  currentMonday.setDate(today.getDate() - today.getDay() + 1);
  
  // Générer 4 cycles (20 semaines = 5 mois)
  for (let cycle = 0; cycle < 4; cycle++) {
    const weeks = [];
    
    for (let week = 0; week < 5; week++) {
      const weekStart = new Date(currentMonday);
      weekStart.setDate(currentMonday.getDate() + ((cycle * 5 + week) * 7));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      const monthName = weekStart.toLocaleDateString('fr-FR', { month: 'long' });
      
      weeks.push({
        weekNumber: week + 1,
        startDate: weekStart,
        endDate: weekEnd,
        monthName: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        label: `${weekStart.getDate().toString().padStart(2, '0')}/${(weekStart.getMonth() + 1).toString().padStart(2, '0')}`,
        workflow: planningWorkflow[week]
      });
    }
    
    cycles.push({
      cycleNumber: cycle + 1,
      weeks,
      mainMonth: weeks[2].monthName, // Mois principal = semaine 3
      period: `${weeks[0].label} - ${weeks[4].label}`
    });
  }
  
  return cycles;
};

export default function PlanningPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCycle, setSelectedCycle] = useState(0);
  
  // Filtrer seulement les clients e-commerce
  const ecommerceClients = projects.filter(p => p.clientType === 'ecommerce');
  
  // Générer les cycles
  const cycles = generateCycles();
  
  // Fonction pour obtenir les tâches d'une semaine donnée
  const getWeekTasks = (workflowStep: typeof planningWorkflow[0]) => {
    return ecommerceClients.map(client => {
      // Filtrer les activités selon le pôle de la semaine
      let activities: ProjectActivity[] = [];
      let estimatedDays = 0;
      
      switch (workflowStep.pole) {
        case 'ADS':
          activities = client.activities.filter(a => a.pole === 'ADS');
          estimatedDays = activities.reduce((sum, a) => sum + a.days, 0);
          break;
        case 'CREATIVE':
          activities = client.activities.filter(a => a.pole === 'CREATIVE');
          estimatedDays = activities.reduce((sum, a) => sum + a.days, 0);
          break;
        case 'INTEGRATION':
          activities = client.activities.filter(a => a.pole === 'INTEGRATION');
          estimatedDays = activities.reduce((sum, a) => sum + a.days, 0);
          break;
        case 'LIVE':
          // Pour le live, on estime 0.5j par client pour le suivi
          activities = [{ name: 'Suivi campagnes + Reporting', days: 0.5, pole: 'ADS', type: 'ADS_REPORTING' as const }];
          estimatedDays = 0.5;
          break;
      }
      
      if (activities.length === 0 && workflowStep.pole !== 'LIVE') return null;
      
      return {
        client: client.client,
        activities,
        totalDays: estimatedDays,
        priority: client.priority,
        adsCount: client.totalAdsCount
      };
    }).filter(Boolean);
  };
  
  // Calculer les statistiques par semaine
  const getWeekStats = (workflowStep: typeof planningWorkflow[0]) => {
    const weekTasks = getWeekTasks(workflowStep);
    const totalDays = weekTasks.reduce((sum, task) => {
      if (!task) return sum;
      return sum + task.totalDays;
    }, 0);
    
    return {
      totalDays: Math.round(totalDays * 10) / 10,
      totalHours: Math.round(totalDays * HOURS_PER_DAY * 10) / 10,
      clientCount: weekTasks.length,
      averageDaysPerClient: weekTasks.length > 0 ? Math.round((totalDays / weekTasks.length) * 10) / 10 : 0
    };
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

        {/* Cycle sélectionné */}
        <div className={`rounded-xl p-6 mb-8 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'
        }`}>
          <div className="text-center mb-6">
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              🗓️ Cycle {cycles[selectedCycle].cycleNumber} - {cycles[selectedCycle].mainMonth}
            </h2>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Période : {cycles[selectedCycle].period}
            </p>
          </div>

          {/* Workflow du cycle - Vue horizontale */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            {cycles[selectedCycle].weeks.map((week, weekIndex) => {
              const weekStats = getWeekStats(week.workflow);
              
              return (
                <div 
                  key={weekIndex} 
                  className="text-center p-4 rounded-lg border-2"
                  style={{ 
                    borderColor: week.workflow.color,
                    backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : week.workflow.color + '10'
                  }}
                >
                  {/* En-tête semaine */}
                  <div className="mb-3">
                    <div className={`text-sm font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      S{week.weekNumber}
                    </div>
                    <div className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {week.label}
                    </div>
                  </div>

                  {/* Phase */}
                  <div 
                    className="p-2 rounded-lg text-xs font-medium text-white mb-3"
                    style={{ backgroundColor: week.workflow.color }}
                  >
                    <div>{week.workflow.icon}</div>
                    <div className="mt-1">{week.workflow.phase}</div>
                  </div>

                  {/* Stats */}
                  <div className={`text-xs space-y-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <div className="font-medium">{weekStats.totalDays}j</div>
                    <div>{weekStats.totalHours}h</div>
                    <div>{weekStats.clientCount} clients</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Description du workflow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {planningWorkflow.map((step, index) => (
              <div key={index} className={`p-3 rounded-lg text-center ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {step.icon} Semaine {step.week}
                </div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {step.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Détail des tâches par semaine */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {cycles[selectedCycle].weeks.map((week, weekIndex) => {
            const weekTasks = getWeekTasks(week.workflow);
            const weekStats = getWeekStats(week.workflow);
            
            return (
              <div key={weekIndex} className={`rounded-xl p-4 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'
              }`}>
                {/* En-tête */}
                <div className="text-center mb-4">
                  <div 
                    className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: week.workflow.color }}
                  >
                    {week.weekNumber}
                  </div>
                  <div className={`text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {week.label}
                  </div>
                  <div className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {week.workflow.phase}
                  </div>
                </div>

                {/* Stats rapides */}
                <div className={`text-center mb-4 p-2 rounded ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className={`text-lg font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {weekStats.totalDays}j
                  </div>
                  <div className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {weekStats.clientCount} clients • {weekStats.totalHours}h
                  </div>
                </div>

                {/* Liste clients */}
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {weekTasks.map((task, taskIndex) => {
                    if (!task) return null;
                    return (
                      <div key={taskIndex} className={`p-2 rounded text-xs ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <div className={`font-medium truncate ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-800'
                        }`}>
                          {task.client.replace(/ - SEA$/, '').replace(/\(interne\)/, '').replace(/ - SHOPPING$/, '')}
                        </div>
                        <div className={`${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {task.totalDays}j • {task.adsCount || 0} ADS
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
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