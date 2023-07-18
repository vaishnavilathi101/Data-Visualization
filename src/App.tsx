import "./App.css";
import { AlcoholClass } from "./components/AlcoholClass";
import { GammaClass } from "./components/GammaClass";

export const App = () => {
  return (
    <div className="App">
      {/* To calculate mean, mode and median of alcohol class using “Flavanoids” key */}
      <AlcoholClass />
      {/* To calculate mean, mode and median of alcohol class using Gamma key */}
      <GammaClass />
    </div>
  );
};
