import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Sidebar, PageId } from './components/Sidebar';
import { SetCommutePage } from './components/SetCommutePage';
import { MatchesPage } from './components/MatchesPage';
import { DriverProfilePage } from './components/DriverProfilePage';
import { MyTripPage } from './components/MyTripPage';
import { SafetyCenterPage } from './components/SafetyCenterPage';
import { CostSplitPage } from './components/CostSplitPage';
import { RewardsPage } from './components/RewardsPage';

import { DRIVERS, Driver, CURRENT_USER } from './data/carpoolData';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageId>('set-commute');
  const [womenOnlyMode, setWomenOnlyMode] = useState(true);
  
  // Selected driver for profile view & active trip
  const [selectedDriver, setSelectedDriver] = useState<Driver>(DRIVERS[0]); // Sneha Rao
  const [activeTripDriver, setActiveTripDriver] = useState<Driver>(DRIVERS[0]);

  // Gamification stats
  const [co2SavedKg, setCo2SavedKg] = useState(CURRENT_USER.co2SavedKg);
  const [ecoCoins, setEcoCoins] = useState(CURRENT_USER.ecoCoins);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLoginSuccess = (email: string, womenOnly: boolean) => {
    setIsLoggedIn(true);
    setWomenOnlyMode(womenOnly);
    setCurrentPage('set-commute');
    showToast(`Welcome Priya Sharma! Verified in Acme Corp closed carpool network.`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleBookSeat = (driver: Driver) => {
    setActiveTripDriver(driver);
    setSelectedDriver(driver);
    setCurrentPage('my-trip');
    setEcoCoins(prev => prev + 40);
    setCo2SavedKg(prev => prev + 3.8);
    showToast(`Recurring seat reserved with ${driver.name}! (${driver.days}, ${driver.pickupTime}). +40 EcoCoins credited.`);
  };

  const handleSelectDriverProfile = (driver: Driver) => {
    setSelectedDriver(driver);
    setCurrentPage('driver-profile');
  };

  const handleCancelTrip = () => {
    showToast('Your recurring trip has been cancelled with zero penalty. Seat returned to Acme pool.');
  };

  const handleDeductCoins = (amount: number) => {
    setEcoCoins(prev => Math.max(0, prev - amount));
  };

  // If user is not logged in, show Login Page
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 animate-fade-in max-w-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Persistent Left Sidebar */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        womenOnlyMode={womenOnlyMode}
        setWomenOnlyMode={setWomenOnlyMode}
        onLogout={handleLogout}
        co2SavedKg={co2SavedKg}
        ecoCoins={ecoCoins}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl overflow-y-auto">
        
        {currentPage === 'set-commute' && (
          <SetCommutePage
            onFindMatches={() => setCurrentPage('matches')}
            womenOnlyMode={womenOnlyMode}
          />
        )}

        {currentPage === 'matches' && (
          <MatchesPage
            womenOnlyMode={womenOnlyMode}
            onSelectDriverProfile={handleSelectDriverProfile}
            onBookSeat={handleBookSeat}
          />
        )}

        {currentPage === 'driver-profile' && (
          <DriverProfilePage
            driver={selectedDriver}
            onSelectDriver={(d) => setSelectedDriver(d)}
            onBookSeat={handleBookSeat}
            onBackToMatches={() => setCurrentPage('matches')}
            womenOnlyMode={womenOnlyMode}
          />
        )}

        {currentPage === 'my-trip' && (
          <MyTripPage
            activeDriver={activeTripDriver}
            onOpenSos={() => setCurrentPage('safety-center')}
            onCancelTrip={handleCancelTrip}
          />
        )}

        {currentPage === 'safety-center' && (
          <SafetyCenterPage
            womenOnlyMode={womenOnlyMode}
          />
        )}

        {currentPage === 'cost-split' && (
          <CostSplitPage />
        )}

        {currentPage === 'rewards' && (
          <RewardsPage
            ecoCoins={ecoCoins}
            onDeductCoins={handleDeductCoins}
          />
        )}

      </main>

    </div>
  );
}
