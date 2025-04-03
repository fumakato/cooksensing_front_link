import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase_set/firebase";

const App: React.FC = () => {
  onAuthStateChanged(auth, (user) => {
    console.log("01 Auth State Changed:", user);
  });

  return (
    <div>
      <h1>Firebase Auth with React & TypeScript </h1>
    </div>
  );
};

export default App;
