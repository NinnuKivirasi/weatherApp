import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  return (
    <IonPage id="main-content">
      <IonToolbar>
        <IonButtons slot="start"></IonButtons>
        <IonTitle>Register</IonTitle>
      </IonToolbar>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonList>
              <IonInput placeholder="Username" />

              <IonInput type="password" placeholder="Password">
                <IonInputPasswordToggle slot="end" />
              </IonInput>

              <IonInput type="password" placeholder="Confirm password">
                <IonInputPasswordToggle slot="end" />
              </IonInput>

              <IonButton expand="block">Register</IonButton>
              <p>
                You have account already? <Link to="/login">Login</Link>
              </p>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
export default Register;
