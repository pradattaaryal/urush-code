import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Author from "./page/Author";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/Author">Author</Link> | 
      
      </nav>

      <Routes>
        <Route path="/Author" element={<Author />} />
        
      </Routes>
    </Router>
  );
}

export default App;
