import "./App.css";
import Navs from "./Navs";

import { UserContextProvider } from "./context/userContext";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <ReactNotifications />
        <Navs />
      </UserContextProvider>
    </div>
  );
}

export default App;
