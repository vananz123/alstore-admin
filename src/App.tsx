import Router from './routes/Router';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
function App() {
    const firebaseConfig = {
        apiKey: "AIzaSyCmxqCo1-zsK--RWrTG_26JTbJUQyZ-9Sc",
        authDomain: "alstore-admin.firebaseapp.com",
        projectId: "alstore-admin",
        storageBucket: "alstore-admin.appspot.com",
        messagingSenderId: "400871729658",
        appId: "1:400871729658:web:59d11acf7324efd36cdc43",
        measurementId: "G-6ENRLV8W1Y"
      }; 
      // Initialize Firebase
    const app = initializeApp(firebaseConfig);
        getAnalytics(app);
   
    return <Router />;
}

export default App;
