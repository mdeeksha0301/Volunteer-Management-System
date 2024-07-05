import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/home/About';
import Home from './pages/home/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import NotFound from './pages/motFound/NotFound';
import { Footer } from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { Context } from './context/AuthUser';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import OrganizationDashboard from './pages/dashboards/OrganizationDashboard';
import VolunteerDashboard from './pages/dashboards/VolunteerDashboard';
import PersonalNavBar from './pages/layout/PersonalNavBar';
import HelpCenter from './pages/home/HelpCenter';
import Events from './pages/event/Events';
import ParticipatedEvents from './pages/dashboards/volunteer/ParticipatedEvents';
import EventDetails from './pages/event/EventDetails';
import AdTable from './pages/dashboards/admin/AdTable';
import EventList from './pages/event/EventList';
import EventForm from './pages/event/EventForm';

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser, user, token } = useContext(Context);

  return (
    <div>
      {isAuthorized ? <PersonalNavBar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {isAuthorized && (
          <>
            {user?.role === 'admin' && <Route path="/admin-dashboard*" element={<AdminDashboard />} />}
            {user?.role === 'admin' && <Route path="/admin-dashboard/events" element=<EventDetails/> />}
            {user?.role === 'admin' && <Route path="/admin-dashboard/volunteers" element={<AdTable type="volunteer" />} />}
            {user?.role === 'admin' && <Route path="/admin-dashboard/donations" element={<AdTable type="donations" />}  />}
            {user?.role === 'admin' && <Route path="/admin-dashboard/organizations" element={<AdTable type="organizations" />}  />}
          



            {user?.role === 'organization' && <Route path="/organization" element={<OrganizationDashboard />} />}
            {user?.role === 'organization' && <Route path="/organization" element={<EventList events={[]} fetchOrganizationEvents={() => {}} />} />}
            {user?.role === 'organization' && <Route path="/organization/new" element={ <EventForm
                onCancel={() => {}}
                fetchOrganizationEvents={() => {}}
              />} />}

            {user?.role === 'volunteer' && <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />}
            {user?.role === 'volunteer' && <Route path="/volunteer-dashboard/my-events" element={<ParticipatedEvents />} />}
            {user?.role === 'volunteer' && <Route path="/volunteer-dashboard/all-events" element={<EventDetails />} />}
          </>
        )}
        <Route path="*" element={<NotFound />} />
        <Route path="/event" element={<Events />} />
      </Routes>
      <Footer />
      <Toaster />
     
    </div>
  );
};

export default App;
