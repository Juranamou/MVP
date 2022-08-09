import React from "react";
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
import Main from "./Main.jsx";
import Banner from "./Banner.jsx"

// Huzzah for jsx!
const App = () => {
  return (
    <>
      <Banner/>
      <Main/>
    </>
  );
}



root.render(<App />);