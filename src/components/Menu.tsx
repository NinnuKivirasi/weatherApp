import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  cloudyNightOutline,
  heartOutline,
  heartSharp,
  informationCircleOutline,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  partlySunnyOutline,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Weather",
    url: "/weatherApp/Home",
    iosIcon: partlySunnyOutline,
    mdIcon: partlySunnyOutline,
  },
  {
    title: "Favorites",
    url: "/weatherApp/favorites",
    iosIcon: heartOutline,
    mdIcon: heartOutline,
  },
  {
    title: "About App",
    url: "/weatherApp/about",
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleOutline,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  // Define routes where menu should be hidden - use lowercase for consistency
  const hideMenuOnRoutes = ["/splash"];

  // Make path comparison case-insensitive
  const shouldHideMenu = hideMenuOnRoutes.some(
    (route) =>
      location.pathname.toLowerCase() === route ||
      location.pathname.toLowerCase().startsWith(route + "/")
  );

  if (shouldHideMenu) {
    return null;
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Menu</IonListHeader>

          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
