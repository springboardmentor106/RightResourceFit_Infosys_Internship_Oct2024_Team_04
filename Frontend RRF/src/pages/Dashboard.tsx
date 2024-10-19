import React from 'react';
import '../styles/App.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SummaryCards from '../components/SummaryCards';
import WelcomeHeader from '../components/WelcomeHeader';
import ApplicationChart from '../components/ApplicationChart';
import RecentJobPosts from '../components/RecentJobPosts';
import Footer from '../components/Footer'; 

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />

        <WelcomeHeader />
        
        <div className="dashboard-content">
          <SummaryCards />
          <div className="charts-and-table">
            <div className="application-chart">
              <ApplicationChart />
            </div>
            <div className="recent-job-posts">
              <RecentJobPosts />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;