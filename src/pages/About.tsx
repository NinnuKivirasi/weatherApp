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
  IonToolbar,
} from "@ionic/react";
import "./Home.css";

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" class="pageTitle">
            <IonMenuButton />
          </IonButtons>
          <IonTitle size="large" class="pageTitle">
            About
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
            }}
          >
            About App
          </IonCardHeader>

          <IonCardContent className="about-card">
            <p>
              This is our school project. A simple weather app that allows you
              to fetch the current weather of a selected city. The project is
              still under development, and new features are coming soon.
            </p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default About;
