import Router from './routes/Router';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
function App() {
    const firebaseConfig = {
        apiKey: "AIzaSyCMapSsR9QpGVR6a5GdfF68hiaxJ5onXZE",
        authDomain: "lastore-9375d.firebaseapp.com",
        projectId: "lastore-9375d",
        storageBucket: "lastore-9375d.appspot.com",
        messagingSenderId: "669308501551",
        appId: "1:669308501551:web:1ec428fa704ab577c590da",
        measurementId: "G-BGEQBG6XQY"
    }; 
      // Initialize Firebase
    const app = initializeApp(firebaseConfig);
        getAnalytics(app);
   
    return <Router />;
}

export default App;
