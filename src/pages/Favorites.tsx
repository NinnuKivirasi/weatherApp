import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { trash, search, chevronForwardOutline } from "ionicons/icons";
import { useState } from "react";

const Favorites: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    const API_KEY = "406cefbb7f883b23d923fd0a1c90828a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      setError(null);
      setWeatherData(null);
      setSelectedCity(city);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Weather information is not available");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error: any) {
      console.log("Error", error);
      setWeatherData(null);
      setError(error.message || "Weather information is not available");
    }
  };

  return (
    <>
     
      <IonPage id="favorites-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Favorite Cities</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {favorites.length === 0 ? (
            <IonCard>
              <IonCardContent>
                <p>No favorite cities added yet.</p>
                <p>
                  Go to the main page and search for cities and add them to your
                  favorites.
                </p>
              </IonCardContent>
            </IonCard>
          ) : (
            <IonList>
              {favorites.map((city, index) => (
                <IonItemSliding key={index}>
                  <IonItem button onClick={() => fetchWeather(city.name)}>
                    <p>{city.name}</p>
                    <IonIcon slot="end" icon={chevronForwardOutline} />
                  </IonItem>
                  <IonItemOptions side="end">
                    <IonItemOption
                      color="danger"
                      onClick={() => removeFavorite(city.name)}
                    >
                      <IonIcon slot="icon-only" icon={trash} />
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              ))}
            </IonList>
          )}

          {weatherData && selectedCity && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{weatherData.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="weather-card">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                  alt="weather icon"
                />
                <p
                  style={{
                    fontSize: "large",
                    fontWeight: "bold",
                  }}
                >
                  {weatherData.main.temp.toFixed(1)}°C -{" "}
                  {weatherData.weather[0].description}
                </p>
                <p style={{ marginBottom: "20px" }}>
                  Feels like: {weatherData.main.feels_like.toFixed(1)}°C
                </p>

                <p className="weather-info">
                  Humidity: {weatherData.main.humidity}%
                </p>
              </IonCardContent>
            </IonCard>
          )}

          {error && (
            <IonCard color="danger">
              <IonCardContent>
                <p>{error}</p>
              </IonCardContent>
            </IonCard>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Favorites;
