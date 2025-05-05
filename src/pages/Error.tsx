import React from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
// Import your local image
import cloudErrorIcon from '../img/thunderstorm-outline.svg'; // Adjust path as needed

const ErrorPage: React.FC = () => {
  const history = useHistory();
  
  const goToStart = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%', 
          textAlign: 'center', 
          padding: '20px' 
        }}>
          <div style={{ 
            backgroundColor: '#E5E5E5', 
            borderRadius: '24px', 
            padding: '40px 30px', 
            width: '85%', 
            maxWidth: '300px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}>
            {/* Using imported image instead of inline SVG */}
            <img 
              src={cloudErrorIcon} 
              alt="Cloud with lightning" 
              style={{ 
                width: '120px', 
                height: '120px', 
                marginBottom: '20px' 
              }} 
            />
            
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
              Ooops..
            </h2>
            
            <p style={{ fontSize: '16px', margin: '0 0 30px 0', lineHeight: '1.4' }}>
              It looks like a strong<br />
              wind blew the page<br />
              away...
            </p>
            
            <IonButton 
              expand="block" 
              onClick={goToStart} 
              style={{ 
                '--background': '#000', 
                '--border-radius': '8px', 
                width: '100%', 
                margin: 0 
              }}
            >
              Go back to start
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ErrorPage;