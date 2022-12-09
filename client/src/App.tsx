import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={darkTheme}>
        <main>
          <Router>
            <Routes>
              <Route path="/" element={<Homepage />} />
            </Routes>
          </Router>
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
