import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, SearchPage, Navigation, NotFound, FullMovie } from "./pages";
import MainLayout from "./layouts/MainLayout";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/MovieApp" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/movie/:id" element={<FullMovie />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
