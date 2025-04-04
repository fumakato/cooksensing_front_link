import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const [helloWorld, setHelloWorld] = useState<string | undefined>(undefined);

  useEffect(() => {
    setHelloWorld(process.env.REACT_APP_HELLO_WORLD);
  }, []);
  console.log("helloWorld", helloWorld);
  console.log(
    "process.env.REACT_APP_HELLO_WORLD",
    process.env.REACT_APP_HELLO_WORLD
  );
  return <h1 style={{ margin: "2em" }}>{helloWorld}</h1>;
};

export default App;
