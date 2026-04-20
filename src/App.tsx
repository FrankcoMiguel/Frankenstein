import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Experiments from './pages/Experiments';
import ExperimentDetail from './pages/ExperimentDetail';
import Publications from './pages/Publications';
import PublicationDetail from './pages/PublicationDetail';
import FrankensteinLab from './pages/FrankensteinLab';
import NotFound from './pages/NotFound';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Redirect component for dynamic routes
const ProjectRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/experiments/${slug}`} replace />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experiments" element={<Experiments />} />
        <Route path="/experiments/:slug" element={<ExperimentDetail />} />
        <Route path="/projects" element={<Navigate to="/experiments" replace />} />
        <Route path="/projects/:slug" element={<ProjectRedirect />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/publications/:id" element={<PublicationDetail />} />
        <Route path="/frankenstein-lab" element={<FrankensteinLab />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
