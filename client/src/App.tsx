import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './pages';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/*" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
