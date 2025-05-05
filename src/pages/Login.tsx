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
  IonToolbar,
  IonToast
} from '@ionic/react';
import './Home.css';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '../firebaseConfig';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  // Add history hook for navigation
  const history = useHistory();

  async function login() {
    const res = await loginUser(username, password);
    if (res) {
      setToastMessage('Login success!');
      setShowToast(true);
      
      // Add a short delay before redirecting to ensure toast is visible
      setTimeout(() => {
        history.push('./home'); // Redirect to main page after successful login
      }, 2000); // Match the toast duration
    
    } else {
      setToastMessage('Failed to login!');
      setShowToast(true);
    }
  }

  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start"></IonButtons>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardContent text-center>
              <IonList>
                <IonInput
                  placeholder="Username"
                  value={username}
                  onIonChange={(e: any) => setUsername(e.target.value)}
                />

                <IonInput
                  type="password"
                  value={password}
                  placeholder="Password"
                  onIonChange={(e: any) => setPassword(e.target.value)}
                >
                  <IonInputPasswordToggle slot="end" />
                </IonInput>
              </IonList>
              <IonButton onClick={login} expand="block">
                Login
              </IonButton>
              <p>
                Need to register first? Go <Link to="./register">Register</Link>
              </p>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>

      {/* TOAST-VIESTI */}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={5000}
        position="middle"
        buttons={[
          {
            text: 'Close',
          },
        ]}
        
      />

    </>
  );
};

export default Login;