import React from 'react';



const DashboardStats = ({ tasks }) => {

  const totalTasks = tasks.length;

  const inProcess = tasks.filter(t => t.remarks === "In-Process").length;

  const closed = tasks.filter(t => t.remarks === "Closed").length;

  const efficiency = totalTasks > 0 ? ((closed / totalTasks) * 100).toFixed(0) : 0;

  const callTasks = tasks.filter(t => t.remarks === "CALL").length;
  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

      
  
    
      
    </div>

  );

};



export default DashboardStats;