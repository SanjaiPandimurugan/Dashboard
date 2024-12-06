import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header'
import FirstRow from './components/FirstRow'
import SecondRow from './components/SecondRow'
import RunningTimeChart from './components/RunningTimeChart'
import LoginPage from './components/LoginPage'
import CycleTimeDetails from './components/CycleTimeDetails'

// Create a layout component that conditionally renders the Header
function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isCycleTimePage = location.pathname === '/cycle-time';

  return (
    <div className="h-screen bg-white overflow-hidden">
      {!isLoginPage && <Header />}
      <div className={
        isCycleTimePage 
          ? "h-[calc(100vh-64px)] overflow-y-auto" 
          : isLoginPage 
            ? "h-screen" 
            : "h-[calc(100vh-64px)] p-2"
      }>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <>
              <FirstRow />
              <div className="mt-2">
                <SecondRow />
              </div>
              <div className="mt-2">
                <RunningTimeChart />
              </div>
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cycle-time" element={<CycleTimeDetails />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App