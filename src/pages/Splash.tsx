import { 
    IonButton,
    IonButtons, 
    IonCard, 
    IonCardContent, 
    IonCardTitle, 
    IonContent, 
    IonHeader, 
    IonMenuButton, 
    IonPage, 
    IonTitle, 
    IonToolbar } from '@ionic/react';
import './Home.css';

const Splash: React.FC = () => {
    return (
        <>
          <IonPage id="main-content">
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  
                </IonButtons>
                <IonTitle>Weather App</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonCard>
    
                <IonCardContent text-center>
                <IonCardTitle>Weather App</IonCardTitle>
                <img src="src/img/snow.svg" />
                <IonButton expand='block' routerLink='weatherApp/login'>
              Login
              </IonButton>
              <IonButton expand='block' routerLink='/weatherApp/register'>
              Register
              </IonButton>
    
              </IonCardContent>
              </IonCard>
            </IonContent>
          </IonPage>
        </>
      );
    }

export default Splash;
