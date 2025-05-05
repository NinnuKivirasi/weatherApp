import React, { useState, useEffect } from 'react';
import { 
  IonPage, 
  IonToolbar, 
  IonButtons, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardContent, 
  IonList, 
  IonInput, 
  IonButton,
  IonInputPasswordToggle,
  IonSpinner,
  IonAlert
} from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../firebaseConfig';


const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertHeader, setAlertHeader] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  
  // Add custom styles to document head
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .custom-toast {
        --background: white !important;
        --border-color: black !important;
        --border-style: solid !important;
        --border-width: 1px !important;
        --border-radius: 8px !important;
        --color: #333 !important;
      }
      
      .toast-button {
        background-color: black !important;
        color: white !important;
        border-radius: 4px !important;
        margin-top: 8px !important;
        width: 100% !important;
      }
      
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
  
  // Add history hook for navigation
  const history = useHistory();

  // Function to show alert with header and message
  const showAlertWithInfo = (header: string, message: string) => {
    setAlertHeader(header);
    setAlertMessage(message);
    setShowAlert(true);
  };

  // Clear input when focused (only if it contains default or placeholder text)
  const handleFocus = (setter: React.Dispatch<React.SetStateAction<string>>, currentValue: string) => {
    // Only clear if it contains default text or is empty
    // This prevents clearing user input when they click back into a field
  };

  async function register() {
    if (password !== cpassword) {
      showAlertWithInfo('Error', 'Passwords do not match');
      return;
    }
    if (username.trim() === '' || password.trim() === '') {
      showAlertWithInfo('Error', 'Username and password required');
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await registerUser(username, password);
      setIsLoading(false);
      
      if (res) {
        showAlertWithInfo('Success', 'Registration successful!');
        
        // Add a short delay before redirecting to ensure alert is visible
        setTimeout(() => {
          history.push('./login');
        }, 2000); // Match the alert duration
      } else {
        showAlertWithInfo('Error', 'Registration failed');
      }
    } catch (error) {
      setIsLoading(false);
      showAlertWithInfo('Error', 'An unexpected error occurred');
    }
  }

  return (          
    <>
      <IonPage id="main-content">
        <IonToolbar>
          <IonButtons slot="start" />
          <IonTitle>Register</IonTitle>
        </IonToolbar>

        <IonContent className="ion-padding">
          <IonCard>
            <IonCardContent>
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
                  <IonInputPasswordToggle slot='end'/>
                </IonInput>

                <IonInput 
                  type="password"
                  value={cpassword}
                  placeholder="Confirm password"
                  onIonChange={(e: any) => setCPassword(e.target.value)}
                >
                  <IonInputPasswordToggle slot='end'/>
                </IonInput> 

                <IonButton expand='block' onClick={register} disabled={isLoading}>
                  {isLoading ? <IonSpinner name="dots" /> : 'Register'}
                </IonButton>

                <p>
                  You have an account already? <Link to="./login">Login</Link>
                </p>
              </IonList>
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

export default Register;
