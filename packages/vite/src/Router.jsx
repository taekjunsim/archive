import { Route, Routes } from "react-router-dom";
import Event from "./event";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Event />} />
      {/* <Route path="/test" element={<CircularProgress />} /> */}
    </Routes>
  );
}

export default Router;
