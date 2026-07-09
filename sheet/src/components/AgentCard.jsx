import React from 'react';
import logo from "../assets/ssdn-logo.png";

const AgentCard = ({ name, tasks, done, percent }) => (
  <div className="agent-card">
    <div className="page-logo">
  <img src={logo} alt="SSDN Technologies" />
</div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <strong style={{ color: '#2c3e50' }}>{name}</strong>
      <span style={{ fontSize: '12px', color: '#6366f1', fontWeight: 'bold' }}>{percent}%</span>
    </div>
    <div style={{ display: 'flex', fontSize: '12px', color: '#7f8c8d', marginBottom: '10px' }}>
      {tasks} tasks • {done} done
    </div>
    <div style={{ background: '#eee', height: '6px', borderRadius: '3px' }}>
      <div style={{ width: `${percent}%`, background: '#6366f1', height: '100%', borderRadius: '3px' }} />
    </div>
  </div>
);

export default AgentCard;