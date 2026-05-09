import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Events from './pages/Events';
import Tools from './pages/Tools';
import Flags from './pages/Flags';
import Enlist from './pages/Enlist';
import FAQ from './pages/FAQ';
import Quiz from './pages/Quiz';
import Recon from './pages/Recon';
import Scoreboard from './pages/Scoreboard';
import NotFound from './pages/NotFound';
import KonamiCodeWatcher from './components/KonamiCodeWatcher';
import CommandPalette from './components/CommandPalette';

export default function App() {
  return (
    <>
      <KonamiCodeWatcher />
      <CommandPalette />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/flags" element={<Flags />} />
          <Route path="/enlist" element={<Enlist />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/recon" element={<Recon />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
