'use client';

import { useState } from 'react';
import { 
  poleColors,
  poleIcons,
  getPoleStats,
  getFilteredProjects,
  clientTypeFilters,
  HOURS_PER_DAY
} from '@/data/simple-projects';

export default function Dashboard() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [clientFilter, setClientFilter] = useState<'all' | 'ecommerce' | 'non-ecommerce'>('all');

  // Fonction pour arrondir correctement et éviter les erreurs de précision
  const roundTo = (num: number, decimals: number = 1) => {
    return Math.round((num + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals);
  };

  // Fonction pour nettoyer les nombres flottants
  const cleanNumber = (num: number, decimals: number = 1) => {
    return parseFloat(num.toFixed(decimals));
  };

  // Fonction pour formater le nom du client
  const formatClientName = (clientName: string) => {
    return clientName
      .replace(/ - SEA$/i, '')
      .replace(/ - SHOPPING$/i, '')
      .replace(/ OFFICIEL$/i, '')
      .replace(/\(interne\)/g, '')
      .trim();
  };

  // Fonction pour afficher les durées de manière intelligente
  const formatDuration = (days: number) => {
    const cleanDays = cleanNumber(days, 3);
    const hours = cleanDays * HOURS_PER_DAY;
    
    if (hours < 1) {
      const minutes = Math.round(hours * 60);
      return `${minutes} min`;
    } else if (cleanDays < 1) {
      return `${cleanNumber(hours, 1)}h`;
    }
    return `${cleanNumber(cleanDays, 1)}j`;
  };

  // Données calculées
  const filteredProjects = getFilteredProjects(clientFilter);
  const sortedProjects = [...filteredProjects].sort((a, b) => b.totalDaysSold - a.totalDaysSold);
  const poleStats = getPoleStats();

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-between items-center mb-6">
            <div></div> {/* Spacer */}
            <h1 className={`text-4xl font-bold mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              📊 Gestion de Projet - Pôle Acquisition
            </h1>
            <button
              onClick={() => {
                console.log('Dark mode toggle clicked:', !isDarkMode);
                setIsDarkMode(!isDarkMode);
              }}
              className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
                isDarkMode 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 border border-gray-600' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm border border-gray-200'
              }`}
              title={isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
          
          {/* Filtre par type de client */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <select
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value as 'all' | 'ecommerce' | 'non-ecommerce')}
                className={`appearance-none px-6 py-3 pr-10 rounded-xl border-2 font-medium text-sm min-w-[200px] transition-all duration-300 cursor-pointer ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600 text-white hover:border-gray-500 focus:border-blue-400 focus:bg-gray-750' 
                    : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300 focus:border-blue-400 shadow-sm'
                } focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-20`}
              >
                {clientTypeFilters.map((filter) => (
                  <option key={filter.value} value={filter.value} className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
                    {filter.icon} {filter.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {filteredProjects.length} clients actifs • {cleanNumber(filteredProjects.reduce((sum, p) => sum + p.totalDaysSold, 0), 1)}j vendus
          </p>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className={`rounded-xl shadow-lg p-6 text-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {cleanNumber(filteredProjects.reduce((sum, p) => sum + p.totalDaysSold, 0), 1)}j
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total vendu</div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {cleanNumber(filteredProjects.reduce((sum, p) => sum + p.totalDaysSold, 0) * HOURS_PER_DAY, 1)}h
            </div>
          </div>
          <div className={`rounded-xl shadow-lg p-6 text-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="text-3xl font-bold text-green-500 mb-2">
              {cleanNumber(filteredProjects.reduce((sum, p) => sum + p.totalAdsCount, 0), 1)}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {clientFilter === 'non-ecommerce' ? 'Comptes gérés' : 'ADS gérées'}
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>filtrées</div>
          </div>
          <div className={`rounded-xl shadow-lg p-6 text-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="text-3xl font-bold text-purple-500 mb-2">{filteredProjects.length}</div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Clients actifs</div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {clientFilter === 'all' ? 'ce mois' : clientTypeFilters.find(f => f.value === clientFilter)?.label.toLowerCase()}
            </div>
          </div>
          <div className={`rounded-xl shadow-lg p-6 text-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="text-3xl font-bold text-orange-500 mb-2">
              {filteredProjects.length > 0 ? cleanNumber(filteredProjects.reduce((sum, p) => sum + p.totalDaysSold, 0) / filteredProjects.length, 1) : 0}j
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Moyenne/client</div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>par projet</div>
          </div>
        </div>

        {/* Vue Projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {sortedProjects.map((project, index) => (
            <div 
              key={index}
              className={`rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white'
              }`}
              onClick={() => setSelectedProject(selectedProject === project.client ? null : project.client)}
            >
              {/* Header du projet */}
              <div 
                className={`p-6 border-l-4 border-blue-500 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-lg font-bold truncate ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {formatClientName(project.client)}
                  </h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    #{index + 1}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className={`text-2xl font-bold ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {formatDuration(project.totalDaysSold)}
                  </div>
                  {project.clientType === 'ecommerce' && (
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {project.totalAdsCount} ADS
                    </div>
                  )}
                </div>
              </div>

              {/* Activités */}
              <div className="p-6">
                <div className="space-y-3">
                  {project.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: poleColors[activity.pole] }}
                    ></div>
                    <span className={`text-sm truncate ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {poleIcons[activity.pole]} {activity.name}
                    </span>
                  </div>
                      <div className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {formatDuration(activity.days)}
                        {activity.hours && (
                          <span className={`text-xs ml-1 ${
                            isDarkMode ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            (+{activity.hours}h)
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Répartition visuelle */}
                <div className={`mt-4 h-3 rounded-full overflow-hidden ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                }`}>
                  {/* Répartition par pôle */}
                  <div className="h-full flex rounded-full overflow-hidden">
                    {Object.entries(poleStats).map(([pole]) => {
                      const projectDaysForPole = project.activities
                        .filter(act => act.pole === pole)
                        .reduce((sum, act) => sum + act.days, 0);
                      const width = (projectDaysForPole / project.totalDaysSold) * 100;
                      
                      return width > 0 ? (
                        <div
                          key={pole}
                          className="h-full transition-all duration-300"
                          style={{
                            backgroundColor: poleColors[pole as keyof typeof poleColors],
                            width: `${width}%`
                          }}
                          title={`${pole}: ${formatDuration(projectDaysForPole)}`}
                        ></div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Résumé par Pôles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Stats par pôle */}
          <div className={`rounded-xl shadow-lg p-6 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-bold mb-6 text-center ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              📊 Temps par Pôle
            </h3>
            <div className="space-y-4">
              {Object.entries(poleStats).map(([pole, stats]) => (
                <div key={pole} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                      style={{ backgroundColor: poleColors[pole as keyof typeof poleColors] }}
                    >
                      {poleIcons[pole as keyof typeof poleIcons]}
                    </div>
                    <span className={`font-medium ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {pole === 'ADS' ? 'Pôle ADS' :
                       pole === 'CREATIVE' ? 'Pôle Créatif' :
                       pole === 'INTEGRATION' ? 'Pôle Intégration' :
                       'Pôle Réseaux Sociaux'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {formatDuration(stats.days)}
                    </div>
                    <div className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {cleanNumber(stats.days * HOURS_PER_DAY, 1)}h total
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capacité Pôle ADS */}
          <div className={`rounded-xl shadow-lg p-6 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-lg font-bold mb-6 text-center ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              🎯 Capacité Pôle ADS
            </h3>
            
            {/* Indicateur de capacité */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Utilisation mensuelle
                </span>
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {formatDuration(poleStats.ADS?.days || 0)} / 40j
                </span>
              </div>
              
              <div className={`w-full h-4 rounded-full overflow-hidden ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <div
                  className="h-full transition-all duration-700 ease-out rounded-full"
                  style={{
                    backgroundColor: poleColors.ADS,
                    width: `${Math.min(((poleStats.ADS?.days || 0) / 40) * 100, 100)}%`
                  }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <span className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {cleanNumber(((poleStats.ADS?.days || 0) / 40) * 100, 1)}% utilisé
                </span>
                <span className={`text-xs font-medium ${
                  (poleStats.ADS?.days || 0) > 40 
                    ? 'text-red-500' 
                    : (poleStats.ADS?.days || 0) > 36 
                    ? 'text-orange-500' 
                    : 'text-green-500'
                }`}>
                  {(poleStats.ADS?.days || 0) > 40 
                    ? '⚠️ Surcharge' 
                    : (poleStats.ADS?.days || 0) > 36 
                    ? '⚡ Proche limite' 
                    : '✅ OK'}
                </span>
              </div>
            </div>

            {/* Détails capacité */}
            <div className="space-y-3">
              <div className={`p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
              }`}>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-blue-800'
                  }`}>
                    📅 Capacité totale
                  </span>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      isDarkMode ? 'text-white' : 'text-blue-900'
                    }`}>
                      40j
                    </div>
                    <div className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-blue-600'
                    }`}>
                      280h (2 personnes)
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    💼 Jours restants
                  </span>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      40 - (poleStats.ADS?.days || 0) < 0 
                        ? 'text-red-500' 
                        : isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {formatDuration(Math.max(0, 40 - (poleStats.ADS?.days || 0)))}
                    </div>
                    <div className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {Math.max(0, cleanNumber((40 - (poleStats.ADS?.days || 0)) * HOURS_PER_DAY, 1))}h disponibles
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
