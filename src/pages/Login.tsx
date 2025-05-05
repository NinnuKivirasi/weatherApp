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
  IonAlert,
  IonSpinner
} from '@ionic/react';
import './Home.css';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loginUser } from '../firebaseConfig';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertHeader, setAlertHeader] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  
  // Add history hook for navigation
  const history = useHistory();

  // Add custom styles to document head
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .custom-alert {
        --background: white !important;
        --border-color: black !important;
        --border-style: solid !important;
        --border-width: 1px !important;
        --border-radius: 8px !important;
      }
      
      .alert-button {
        background-color: black !important;
        color: white !important;
        border-radius: 4px !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Function to show alert with header and message
  const showAlertWithInfo = (header: string, message: string) => {
    setAlertHeader(header);
    setAlertMessage(message);
    setShowAlert(true);
  };

  // Clear input when focused
  const handleFocus = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter('');
  };

  async function login() {
    if (username.trim() === '' || password.trim() === '') {
      showAlertWithInfo('Error', 'Username and password required');
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await loginUser(username, password);
      setIsLoading(false);
      
      if (res) {
        showAlertWithInfo('Success', 'Login successful!');
        
        // Add a short delay before redirecting to ensure alert is visible
        setTimeout(() => {
          history.push('./home'); // Redirect to main page after successful login
        }, 2000); // Match the alert duration
      } else {
        showAlertWithInfo('Error', 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setIsLoading(false);
      showAlertWithInfo('Error', 'An unexpected error occurred');
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
                  onIonFocus={() => handleFocus(setUsername)}
                />

                <IonInput
                  type="password"
                  value={password}
                  placeholder="Password"
                  onIonChange={(e: any) => setPassword(e.target.value)}
                  onIonFocus={() => handleFocus(setPassword)}
                >
                  <IonInputPasswordToggle slot="end" />
                </IonInput>
              </IonList>
              <IonButton onClick={login} expand="block" disabled={isLoading}>
                {isLoading ? <IonSpinner name="dots" /> : 'Login'}
              </IonButton>
              <p>
                Need to register first? Go <Link to="./register">Register</Link>
              </p>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={alertHeader}
        message={alertMessage}
        cssClass="custom-alert"
        buttons={[
          {
            text: 'Close',
            cssClass: 'alert-button',
            handler: () => {
              setShowAlert(false);
            }
          }
        ]}
      />
    </>
  );
};

export default Login;
