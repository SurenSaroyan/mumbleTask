import React, { useState } from "react";
import './App.css'
import Register from './components/Register';
import salesForce from './services/Salesforce';

function App() {
    const { login } = salesForce;
    const [ isLogged, setIsLogged] = useState(false)

    login().then(res => {
        if (!res.data.error)
        setIsLogged(true);
    });

  return (
      <>
      {
          isLogged && <div className="App">
          <Register/>
      </div>
}   </>
  );
}

export default App;
