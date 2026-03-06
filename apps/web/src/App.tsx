// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import HomePage from "./pages/HomePage/HomePage";
// import FormBuilderPage from "./pages/FormBuilderPage";
// import FillFormPage from "./pages/FillFormPage/FillFormPage";
// import ResponsesPage from "./pages/ResponsesPage/ResponsesPage";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         <Route path="/" element={<HomePage />} />

//         <Route path="/forms/new" element={<FormBuilderPage />} />

//         <Route path="/forms/:id/fill" element={<FillFormPage />} />

//         <Route path="/forms/:id/responses" element={<ResponsesPage />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import FormBuilderPage from "./pages/FormBuilderPage";
import FillFormPage from "./pages/FillFormPage/FillFormPage";
import ResponsesPage from "./pages/ResponsesPage/ResponsesPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forms/new" element={<FormBuilderPage />} />
        <Route path="/forms/:id/fill" element={<FillFormPage />} />
        <Route path="/forms/:id/responses" element={<ResponsesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;