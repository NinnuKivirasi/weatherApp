import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonContent, 
    IonHeader,
    IonInput,
    IonInputPasswordToggle,
    IonList,
    IonPage, 
    IonTitle, 
    IonToolbar } from '@ionic/react';
import './Home.css';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {

    return (
        <>
          <IonPage id="main-content" content='center'>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                </IonButtons>
                <IonTitle>Login</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            <IonCard>
            <IonCardContent text-center>
            <IonList>
            <IonInput 
                placeholder="Username"/>
                <IonInput 
                  type="password"
                  placeholder="Password">
                  <IonInputPasswordToggle slot='end'/>
                  </IonInput>
            </IonList>
            <IonButton expand='block' routerLink='./home'> Login
          </IonButton>
            <p>
            Need to register first? Go <Link to="/weatherApp/register">Register</Link>
            </p>
          </IonCardContent>
          </IonCard>
            </IonContent>
          </IonPage>
        </>
      );
    }

export default Login;