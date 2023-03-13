import { useEffect } from 'react';
import AppRouter from "./routers/AppRouter"



const App = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#EEE9E9';
  }, []);

    return (
        <div>
          <AppRouter/>
        </div>
    )
}

export default App

