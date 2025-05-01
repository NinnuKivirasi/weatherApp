import { 
    IonButtons, 
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonContent, 
    IonHeader, 
    IonMenuButton, 
    IonPage, 
    IonTitle, 
    IonToolbar } from '@ionic/react';
import './Home.css';

const Favorites: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start" class="pageTitle">
              <IonMenuButton />
            </IonButtons>
            <IonTitle size="large" class="pageTitle">
              Favorites
            </IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
          <IonHeader></IonHeader>
          <IonCard>
            <IonCardHeader
            style={{
                fontSize: "large",
                fontWeight: "bold",
                display: "flex",
              }}>
              Favorites
            </IonCardHeader>
  
            <IonCardContent className="about-card">
              <p>
                Favorites here
              </p>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Favorites;