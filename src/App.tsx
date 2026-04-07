import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ProteinPrism from './pages/ProteinPrism'
import GenomicNavigator from './pages/GenomicNavigator'
import BlastTool from './pages/BlastTool'
import Timeline from './pages/Timeline'
import Glossary from './pages/Glossary'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="protein-prism" element={<ProteinPrism />} />
          <Route path="genomic-navigator" element={<GenomicNavigator />} />
          <Route path="genomic-navigator/blast" element={<BlastTool />} />
          <Route path="genomic-navigator/timeline" element={<Timeline />} />
          <Route path="genomic-navigator/glossary" element={<Glossary />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
