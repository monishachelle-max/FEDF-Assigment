// import React, { memo } from 'react'

// const StatisticsCard = memo(({ statistics }) => {
//   const { totalStudents, totalCharacters, averageNameLength, longestName } = statistics

//   return (
//     <div className="statistics-card">
//       <h2>📊 Dashboard Statistics</h2>
//       <div className="stats-grid">
//         <div className="stat-item">
//           <div className="stat-icon">👨‍🎓</div>
//           <div className="stat-content">
//             <span className="stat-label">Total Students</span>
//             <span className="stat-value">{totalStudents}</span>
//           </div>
//         </div>
        
//         <div className="stat-item">
//           <div className="stat-icon">🔤</div>
//           <div className="stat-content">
//             <span className="stat-label">Total Characters</span>
//             <span className="stat-value">{totalCharacters}</span>
//           </div>
//         </div>
        
//         <div className="stat-item">
//           <div className="stat-icon">📏</div>
//           <div className="stat-content">
//             <span className="stat-label">Average Name Length</span>
//             <span className="stat-value">{averageNameLength}</span>
//           </div>
//         </div>
        
//         <div className="stat-item">
//           <div className="stat-icon">🏆</div>
//           <div className="stat-content">
//             <span className="stat-label">Longest Name</span>
//             <span className="stat-value">{longestName}</span>
//           </div>
//         </div>
//       </div>
      
//       {totalStudents > 0 && (
//         <div className="stat-footer">
//           <small>⚡ Calculations are memoized using useMemo for optimal performance</small>
//         </div>
//       )}
//     </div>
//   )
// })

// StatisticsCard.displayName = 'StatisticsCard'

// export default StatisticsCard