import React from "react";
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
import Main from "./Main.jsx";

// Huzzah for jsx!
const App = () => {
  return (
    <>
      <Main/>
    </>
  );
}



root.render(<App />);