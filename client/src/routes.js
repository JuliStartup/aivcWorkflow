import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import NotFound from './pages/Page404';
import NewClient from './pages/NewClient';
import FollowUp from './pages/FollowUp';
import CasePR from './pages/CasePR';
// import Home from './pages/Home';
import ExtendVisa from './pages/ExtendVisa';
import ExtendVisitVisa from './pages/ExtendVisitVisa';
import ExtendWorkVisa from './pages/ExtendWorkVisa';
import ExtendStudyVisa from './pages/ExtendStudyVisa';
import CaseWork from './pages/CaseWork';
import Home from './components/Home/Home';
import NewVisitVisa from './pages/NewVisitVisa';
import NewStudyVisa from './pages/NewStudyVisa';
import SpousalVisa from './pages/SpousalVisa';
import PGWPVisa from './pages/PGWPVisa';
import CECPNP from './pages/CECPNP';
import FSWVisa from './pages/FSWVisa';
import PNPVisa from './pages/PNPVisa';
import CECVisa from './pages/CECVisa';
import Products from './pages/Services/Products';
import AboutUs from './components/Home/AboutUs';
import Services from './components/Services/Services';
import Programs from './components/ClientPrograms/Programs';
import ClientApplication from './components/ClientApplication/ClientApplication';
import MissingDocs from './pages/MissingDocs';
import StudyPermit from './pages/StudyPermit';
import AgentApplication from './components/AgentApplication/AgentApplication';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'caseStudy', element: <StudyPermit /> },
        { path: 'followUp', element: <FollowUp /> },
        { path: 'products', element: <Products /> },
        { path: 'casePR', element: <CasePR /> },
        { path: 'caseWork', element: <CaseWork /> },
        // { path: 'caseWork', element: <Clients /> },
        { path: 'new', element: <NewClient /> }
      ]
    },
    // <Navbar bgCol="rgb(211 211 211 / 0)" showAnime="true" colorVal="#39368a" />
    {
      path: '/',
      children: [
        {
          path: '/',
          element: <Home />
        },
        { path: 'extend-work-visa', element: <ExtendWorkVisa /> },
        { path: 'new-study-visa', element: <NewStudyVisa /> },
        { path: 'extend-study-visa', element: <ExtendStudyVisa /> },
        { path: 'spousal-visa', element: <SpousalVisa /> },
        { path: 'work-visa', element: <PGWPVisa /> },
        { path: 'cec-pnp-visa', element: <CECPNP /> },
        { path: 'fsw-visa', element: <FSWVisa /> },
        { path: 'pnp-visa', element: <PNPVisa /> },
        { path: 'cec-visa', element: <CECVisa /> },
        { path: 'new-visit-visa', element: <NewVisitVisa /> },
        { path: 'extend-visit-visa', element: <ExtendVisitVisa /> },
        { path: 'pending-documents', element: <MissingDocs /> },
        { path: 'home', element: <Home /> },
        { path: 'about-us', element: <AboutUs /> },
        { path: 'services', element: <Services /> },
        { path: 'applications', element: <ClientApplication /> },
        { path: 'file/:id', element: <AgentApplication /> },
        { path: 'programs', element: <Programs /> },
        { path: 'extend-process', element: <ExtendVisa /> },
        { path: 'new', element: <NewClient /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
