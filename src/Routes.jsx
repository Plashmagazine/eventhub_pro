import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CategoryLandingPages from './pages/category-landing-pages';
import AdministrativeDashboard from './pages/administrative-dashboard';
import LiveEventCenter from './pages/live-event-center';
import UserProfileHub from './pages/user-profile-hub';
import EventDetailPage from './pages/event-detail-page';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdministrativeDashboard />} />
        <Route path="/category-landing-pages" element={<CategoryLandingPages />} />
        <Route path="/administrative-dashboard" element={<AdministrativeDashboard />} />
        <Route path="/live-event-center" element={<LiveEventCenter />} />
        <Route path="/user-profile-hub" element={<UserProfileHub />} />
        <Route path="/event-detail-page" element={<EventDetailPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
