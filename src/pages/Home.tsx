import {
  IonButton,
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
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FavoriteButton from "../components/FavoriteButton";
import { useFavorites } from "../contexts/FavoritesContext";

const Home: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite } = useFavorites();

  // clear weather data when empty
  useEffect(() => {
    if (city === "") {
      setWeatherData(null);
      setError(null);
    }
  }, [city]);

  const fetchWeather = async (city: string) => {
    
    if (!city.trim()) {
      setWeatherData(null);
      setError(null);
      return;
    }

    const API_KEY = "406cefbb7f883b23d923fd0a1c90828a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      setError(null);
      setWeatherData(null);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Weather information is not available");
      }

      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error: any) {
      console.log("Error", error);
      setWeatherData(null);
      setError(error.message || "Weather information is not available");
    }
  };

  // clear input
  const handleClear = () => {
    setCity("");
    setWeatherData(null);
    setError(null);
  };

  return (
    <>
      
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Weather App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardContent className="ion-padding">
              <IonSearchbar
                placeholder="City"
                show-clear-button="always"
                value={city}
                onIonInput={(e) => setCity(e.detail.value!)}
                onIonClear={handleClear}
              ></IonSearchbar>
              <IonButton expand="full" onClick={() => fetchWeather(city)}>
                Check Weather
              </IonButton>
            </IonCardContent>
          </IonCard>

          {error && (
            <IonCard color="danger">
              <IonCardContent>
                <p>{error}</p>
              </IonCardContent>
            </IonCard>
          )}

          {weatherData && (
            <IonCard>
              <IonCardHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <IonCardTitle>{weatherData.name}</IonCardTitle>
                  <FavoriteButton city={{ name: weatherData.name, country: weatherData.sys?.country }} />
                </div>
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
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
