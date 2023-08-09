import React from "react";
import NavbarComponent from "./components/NavbarComponent";
import TableComponent from "./components/TableComponent";

function App() {
   return (
      <div>
         <NavbarComponent />
         <h3 className="text-center mt-2 mb-2">React JS Programming Test</h3>
         <TableComponent />
      </div>
   );
}

export default App;
