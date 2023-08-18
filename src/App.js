import Blogs from "../src/pages/Blogs.jsx";
import WriteBlog from "./pages/WriteBlog.jsx";

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Blogs />} />
          <Route path="/write-blog" element={<WriteBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
