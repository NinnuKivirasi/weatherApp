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
} from '@ionic/react';
import './Home.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../firebaseConfig';

const Register: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')

    async function register() {
        if (password !== cpassword) {
          return console.log('Passwords do not match')
        }
        if(username.trim() === '' || password.trim() === '') {
          return console.log('Username and password are required')
        }
  
        const res = await registerUser(username, password)
        if(res) {
          console.log('You have registered successfully!')
        }
      }

  return (          
    <IonPage id="main-content">
            <IonToolbar>
                <IonButtons slot="start">
                </IonButtons>
                <IonTitle>Register</IonTitle>
            </IonToolbar>
        <IonContent className="ion-padding">
        <IonCard>
            <IonCardContent >
            <IonList>
  
            <IonInput 
            placeholder="Username"
            value={username}
            onIonChange={(e: any) => 
            setUsername(e.target.value)}/>

            <IonInput 
            type="password"
            value={password}
            placeholder="Password"
            onIonChange={(e: any) => 
            setPassword(e.target.value)}>
            <IonInputPasswordToggle slot='end'/>
            </IonInput>

            <IonInput 
            type="password"
            value={cpassword}
            placeholder="Confirm password"
            onIonChange={(e: any) => 
            setCPassword(e.target.value)}>
            <IonInputPasswordToggle slot='end'/>
            </IonInput> 

            <IonButton expand='block' onClick={register}>Register</IonButton>

                <p>
                You have account already? <Link to="./login">Login</Link>
                </p>

            </IonList>

            </IonCardContent>
        </IonCard>
        </IonContent>
    </IonPage>
    );
  }
export default Register;