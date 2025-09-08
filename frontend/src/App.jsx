import AppRouter from "./routes/AppRouter";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 2000, // durée de l’animation (en ms)
      offset: 100,    // décalage avant le déclenchement
      delay: 300,
      // once: true,    // si true, l’animation se joue une seule fois
    });
  }, []);
  return (
    <div className="App">
      <AppRouter /> 
    </div>
  );
}

