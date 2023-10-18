import React from "react";
import "./App.css";
import Contacts from "./pages/home";
// import Table from "./pages/home/components/Table";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (process.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}

function App() {
  // const headers = ['Name', 'Age', 'Email'];
  // const data = [
  //   { Name: 'John Doe', Age: 30, Email: 'john@example.com' },
  //   { Name: 'Jane Smith', Age: 25, Email: 'jane@example.com' },
  //   // Add more data rows here
  // ];
  return (
    <div >
      <header className="App-header" >
        {/* <Table headers={headers} data={data} /> */}
        <Contacts />
      </header>
    </div>
  );
}

export default App;
