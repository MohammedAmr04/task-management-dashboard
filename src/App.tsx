import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>Home</>} />
          <Route path="about" element={<>About</>} />
          <Route path="contact" element={<>contact</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
