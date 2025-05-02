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
  IonToast,
  IonIcon
} from '@ionic/react';
import './Home.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../firebaseConfig';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  async function register() {
    if (password !== cpassword) {
      setToastMessage(' Passwords do not match');
      setShowToast(true);
      return;
    }
    if (username.trim() === '' || password.trim() === '') {
      setToastMessage('Username and password required');
      setShowToast(true);
      return;
    }

    const res = await registerUser(username, password);
    if (res) {
      setToastMessage('Registration successful!');
    } else {
      setToastMessage('Registration failed');
    }
    setShowToast(true);
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

                <IonButton expand='block' onClick={register}>Register</IonButton>

                <p>
                  You have an account already? <Link to="./login">Login</Link>
                </p>

              </IonList>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
        position="top"
        color={toastMessage.includes('success') ? 'success' : 'danger'}
      />
    </>
  );
};

export default Register;
