import ReactDOM from "react-dom/client";
import ReactTooltip from 'react-tooltip';
import "./index.css";
import App from "./App";
import { DataContextProvider } from "./libs/providers/DataContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <DataContextProvider>
    <ReactTooltip />
    <App />
  </DataContextProvider>
);
