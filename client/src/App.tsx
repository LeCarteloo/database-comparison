import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Main } from './pages';

function App() {
  return (
    <div className="app">
      <main>
        <Router>
          <Routes>
            <Route path="/*" element={<Main />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
