'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  projects, 
  HOURS_PER_DAY
} from '@/data/simple-projects';

// Workflow de planification - Cycle de 4 semaines
const planningWorkflow = [
  { 
    week: 4, 
    phase: 'Réunion et validation stratégie client', 
    color: '#8B5CF6', 
    icon: '🤝',
    pole: 'ADS',
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
    pole: 'ADS',
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
    pole: 'CREATIVE',
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
    pole: 'INTEGRATION',
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
      
      // Trouver le workflow correspondant (1, 2, 3, 4)
      // La semaine 4 (validation) est la dernière du cycle, pas la première
      const workflowOrder = [1, 2, 3, 4];
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
  
  // Filtrer seulement les clients e-commerce
  const ecommerceClients = projects.filter(p => p.clientType === 'ecommerce');
  
  // Calculer les charges ADS par phase
  const getAdsWorkload = () => {
    const totalAdsActivities = ecommerceClients.reduce((sum, client) => {
      return sum + client.activities
        .filter(a => a.pole === 'ADS')
        .reduce((actSum, a) => actSum + a.days, 0);
    }, 0);
    
    const totalClients = ecommerceClients.length;
    
    return {
      totalDays: Math.round(totalAdsActivities * 10) / 10,
      totalHours: Math.round(totalAdsActivities * HOURS_PER_DAY * 10) / 10,
      clientCount: totalClients,
      averageDaysPerClient: totalClients > 0 ? Math.round((totalAdsActivities / totalClients) * 10) / 10 : 0,
      // Répartition par semaine selon le workflow
      weeklyBreakdown: {
        week1: Math.round((totalAdsActivities * 0.4) * 10) / 10, // 40% pour brief
        week2: Math.round((totalAdsActivities * 0.2) * 10) / 10, // 20% pour support au design
        week3: Math.round((totalAdsActivities * 0.1) * 10) / 10, // 10% pour validation finale
        week4: Math.round((totalAdsActivities * 0.3) * 10) / 10  // 30% pour stratégie/validation
      }
    };
  };
  
  const adsWorkload = getAdsWorkload();
  
  // Obtenir les tâches client spécifiques pour une semaine
  const getClientTasksForWeek = (weekNumber: number) => {
    return ecommerceClients.map(client => {
      const clientName = client.client.replace(/ - SEA$/, '').replace(/\(interne\)/, '').replace(/ - SHOPPING$/, '');
      
      switch (weekNumber) {
        case 1:
          return `Brief créatif - ${clientName}`;
        case 2:
          return `Design créatifs - ${clientName}`;
        case 3:
          return `Intégration - ${clientName}`;
        case 4:
          return `Réunion client et validation stratégie - ${clientName}`;
        default:
          return `Tâche - ${clientName}`;
      }
    });
  };
  
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

          {/* Légende workflow avec charges ADS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {planningWorkflow.map((step, index) => {
              const weekWorkload = step.week === 1 ? adsWorkload.weeklyBreakdown.week1 :
                                 step.week === 2 ? adsWorkload.weeklyBreakdown.week2 :
                                 step.week === 3 ? adsWorkload.weeklyBreakdown.week3 :
                                 adsWorkload.weeklyBreakdown.week4;
              
              return (
                <div 
                  key={index} 
                  className="p-3 rounded-lg text-white"
                  style={{ backgroundColor: step.color }}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <span className="mr-2">{step.icon}</span>
                      <span className="text-sm font-medium">S{step.week}</span>
                    </div>
                    <div className="text-xs mb-2">{step.phase}</div>
                    <div className="text-lg font-bold">{weekWorkload}j</div>
                    <div className="text-xs opacity-90">{Math.round(weekWorkload * HOURS_PER_DAY)}h ADS</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats globales ADS */}
          <div className={`p-4 rounded-lg mb-6 ${
            isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
          }`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className={`text-2xl font-bold ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {adsWorkload.totalDays}j
                </div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Total ADS
                </div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {adsWorkload.totalHours}h
                </div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Total heures
                </div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {adsWorkload.clientCount}
                </div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Clients e-commerce
                </div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {adsWorkload.averageDaysPerClient}j
                </div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Moyenne/client
                </div>
              </div>
            </div>
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
                        {/* Tâche générale */}
                        {week.workflow?.tasks[dayIndex] && (
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
                        
                        {/* Tâches clients spécifiques */}
                        {getClientTasksForWeek(week.weekNumber || 1).slice(dayIndex * 3, (dayIndex + 1) * 3).map((clientTask, taskIndex) => (
                          <div key={taskIndex} className={`p-1 rounded text-xs ${
                            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                          }`} style={{ 
                            borderLeft: `2px solid ${week.workflow?.color}`,
                            backgroundColor: isDarkMode ? undefined : week.workflow?.color + '10'
                          }}>
                            <div className={`text-xs ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {clientTask}
                            </div>
                          </div>
                        ))}
                        
                        {/* Indicateur s'il y a plus de clients */}
                        {getClientTasksForWeek(week.weekNumber || 1).length > (dayIndex + 1) * 3 && (
                          <div className={`p-1 rounded text-xs text-center ${
                            isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                          }`}>
                            <div className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              +{getClientTasksForWeek(week.weekNumber || 1).length - (dayIndex + 1) * 3} autres...
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

        {/* Liste des clients e-commerce */}
        <div className={`rounded-xl p-6 mt-8 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'
        }`}>
          <h3 className={`text-lg font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            🛒 Clients E-commerce inclus ({ecommerceClients.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ecommerceClients.map((client, index) => {
              const adsActivities = client.activities.filter(a => a.pole === 'ADS');
              const totalAdsDays = adsActivities.reduce((sum, a) => sum + a.days, 0);
              
              return (
                <div key={index} className={`p-3 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className={`font-medium text-sm ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {client.client.replace(/ - SEA$/, '').replace(/\(interne\)/, '').replace(/ - SHOPPING$/, '')}
                  </div>
                  <div className={`text-xs mt-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    🎯 {Math.round(totalAdsDays * 10) / 10}j ADS • {client.totalAdsCount} comptes
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}