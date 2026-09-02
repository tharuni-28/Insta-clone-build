import { useEffect, useState } from "react";
import { auth } from "./services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    signOut(auth);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return user ? <Home /> : <Login />;
}

export default App;