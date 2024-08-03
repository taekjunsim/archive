import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "../../pages/Main";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/test" element={<SnackbarTestPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
