import React from "react";
import "./App.css";
import ListContact from "./pages/home";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (process.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}

function App() {
  return (
    <div >
      <header className="App-header" >
        <ListContact columns={[]} data={[]} />
      </header>
    </div>
  );
}

export default App;
