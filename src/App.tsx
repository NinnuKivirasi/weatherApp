import { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';


import Home from './pages/Home';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';
/* Theme variables */
import './theme/variables.css';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Favorites from './pages/Favorites';
import Error from './pages/Error';
import Menu from './components/Menu';
import { FavoritesProvider } from './contexts/FavoritesContext';
import CustomSplashScreen from './components/CustomSplashScreen';

setupIonicReact();

const App: React.FC = () => {

  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    // Hide the native splash when available
    if (Capacitor.isPluginAvailable('SplashScreen')) {
      SplashScreen.hide();
    }
  }, []);
  
  const handleSplashFinish = () => {
    setShowSplash(false);
  };
  
  if (showSplash) {
    return <CustomSplashScreen onFinish={handleSplashFinish} />;
  }
  
  return (



  
  <FavoritesProvider>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/weatherApp" component={Splash}/>
          <Route exact path="/weatherApp/login" component={Login}/>
          <Route exact path="/weatherApp/register" component={Register}/>
          <Route exact path="/weatherApp/home" component={Home} />
          <Route exact path="/weatherApp/about" component={About} />
          <Route exact path="/weatherApp/favorites" component={Favorites} />
          <Route exact path="/" >
            <Redirect to="/weatherApp" />
          </Route>
          <Route component={Error} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </FavoritesProvider>
);
};
export default App;
