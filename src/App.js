import './App.css';
import ScreenLoader from './components/ScreenLoader';
import { useAuthContext } from './context/AuthContext';
import Routes from "./Pages/Routes"

function App() {
  const {isAppLoading}=useAuthContext()

  if(isAppLoading) return<ScreenLoader/>
  
  return (
   <>
   {!isAppLoading?<Routes/>
   :<ScreenLoader/>
   }
   </>
  );
}

export default App;
