import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Report from './pages/Report';
import Coach from './pages/Coach';
import Pattern from './pages/Pattern';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="upload" element={<Upload />} />
          <Route path="report" element={<Report />} />
          <Route path="coach" element={<Coach />} />
          <Route path="pattern" element={<Pattern />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;