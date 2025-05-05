import { IonContent, IonPage } from '@ionic/react';
import { useState, useEffect } from 'react';
import './CustomSplashScreen.css';

const CustomSplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [animate, setAnimate] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setAnimate(true);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500); // Start fade out earlier

    const completeTimer = setTimeout(() => {
      onFinish();
    }, 3000); // Finish after fade out

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onFinish]);

  return (
    <IonPage>
      <IonContent fullscreen className={`splash-container ${fadeOut ? 'fade-out' : ''}`}>
        <div className="splash-top-spacer"></div>
        <div className={`splash-content ${animate ? 'animate' : ''}`}>
          <img
            src="/assets/Logo_2.png"
            alt="Weather App Logo"
            style={{ width: '70%', height: '70%', objectFit: 'contain' }}
          />
          <h1>Weather App</h1>
          <h3>Version 1.0.0.</h3>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CustomSplashScreen;
