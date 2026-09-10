import { useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { initMotion } from '../animations/motion';
import { AuthProvider, useAuth } from '../auth/AuthContext';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../sections/Footer';
import { HomePage } from '../pages/HomePage';
import { CoursesPage } from '../pages/CoursesPage';
import { PathsPage } from '../pages/PathsPage';
import { MethodPage } from '../pages/MethodPage';
import { MentorsPage } from '../pages/MentorsPage';
import { StoriesPage } from '../pages/StoriesPage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AdminPage } from '../pages/AdminPage';

function Protected() {
  const { user } = useAuth();
  return user ? <DashboardPage /> : <Navigate to="/login" replace />;
}

function Shell() {
  const location = useLocation();

  useEffect(() => initMotion(), [location.pathname]);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/categories" element={<CoursesPage />} />
          <Route path="/paths" element={<PathsPage />} />
          <Route path="/method" element={<MethodPage />} />
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Protected />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/cta" element={<Navigate to="/#cta" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Shell />
      </AuthProvider>
    </HashRouter>
  );
}
