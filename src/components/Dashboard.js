import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ModuleCard from './ModuleCard';
import Footer from './Footer';
import WelcomeCard from './WelcomeCard';
import TransitionWrapper from './TransitionWrapper';

const Dashboard = () => {
  const [modules, setModules] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const firstName = localStorage.getItem('firstName');
    if (firstName) setUserName(firstName);
    if (!uid) return setModules([]);
    
    const fetchModules = async (uid) => {
      try {
		//const uid = "UoAviFrew5TO4qDxhmSWJzumRi32";
        const response = await fetch(`http://localhost:8080/user/dashboard?uid=${uid}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.modules;
      } catch (error) {
        console.error("Error fetching modules:", error);
        return [];
      }
    };

    // Pass the uid to fetchModules and update state with returned modules
    fetchModules(uid).then(fetchedModules => {
      setModules(fetchedModules);
    });
  }, []);

  return (
    <TransitionWrapper>
      <div className="dashboard-container">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Sidebar ref={sidebarRef} isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="dashboard-content">
          <WelcomeCard firstName={userName} />
          <div className="modules-grid">
            {modules && modules.length > 0 ? (
              modules.map((module, index) => (
                <ModuleCard key={module.id || index} module={module} />
              ))
            ) : (
              <p>No registered modules.</p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </TransitionWrapper>
  );
};

export default Dashboard;
