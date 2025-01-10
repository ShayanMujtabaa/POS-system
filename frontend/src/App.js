import "./App.css";
import React from "react";
import Router from "./config/router";

function App() {

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-r from-green-500 via-blue-500 to-blue-900">
      <div>
        <Router />
      </div>
    </main>
  );
}

export default App;
