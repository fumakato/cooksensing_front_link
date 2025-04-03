import React, { useState } from "react";
import BarChart from "./BarChart";

const App: React.FC = () => {
  const [starSize, setStarSize] = useState(50);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStarSize(Number(event.target.value));
    console.log("Star size changed to:", event.target.value); // console.logを追加
  };

  return (
    <div>
      <h1>My Bar Chart</h1>
      <label>
        Star Size:
        <input type="number" value={starSize} onChange={handleSizeChange} />
      </label>
      <BarChart size={starSize} />
    </div>
  );
};

export default App;
