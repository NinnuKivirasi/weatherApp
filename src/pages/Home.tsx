import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonItem, IonList, IonMenu, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
    <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
          <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Weather App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem>
              <Link to="./home">Main</Link>
            </IonItem>
            <IonItem>
              <Link to="./favorites">Favorites</Link>
            </IonItem>
            <IonItem>
              <Link to="./about">About</Link>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Weather App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
          <IonCardContent className="ion-padding">
              <IonSearchbar
                placeholder="City"
                show-clear-button="always"
              ></IonSearchbar>
              <IonButton expand="full">
                Check Weather
              </IonButton>

          </IonCardContent>
        </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
}

export default Home;
