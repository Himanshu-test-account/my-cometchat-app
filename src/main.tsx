import ReactDOM from "react-dom/client";
import App from "./App";
import {
  UIKitSettingsBuilder,
  CometChatUIKit,
} from "@cometchat/chat-uikit-react";
import { setupLocalization } from "./CometChat/utils/utils";
import { BuilderSettingsProvider } from "./CometChat/context/BuilderSettingsContext";

export const COMETCHAT_CONSTANTS = {
  APP_ID: import.meta.env.VITE_APP_ID, // Replace with your App ID
  REGION: import.meta.env.VITE_REGION, // Replace with your App Region
  AUTH_KEY: import.meta.env.VITE_AUTH_KEY, // Replace with your Auth Key
};

const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForAllUsers()
  .build();

CometChatUIKit.init(uiKitSettings)?.then(() => {
  setupLocalization();
  
  // You can also add login logic here
  const UID = "cometchat-uid-1"; // Use one of the test users
  
  CometChatUIKit.getLoggedinUser().then((user) => {
    if (!user) {
      CometChatUIKit.login(UID)
        .then((user) => {
          console.log("Login Successful:", user);
          // Render app after login
          const rootElement = document.getElementById("root");
          if (rootElement) {
            ReactDOM.createRoot(rootElement).render(
              <BuilderSettingsProvider>
                <App />
              </BuilderSettingsProvider>
            );
          } else {
            console.error("Root element not found");
          }
        })
        .catch(console.error);
    } else {
      // User already logged in
      const rootElement = document.getElementById("root");
      if (rootElement) {
        ReactDOM.createRoot(rootElement).render(
        <BuilderSettingsProvider>
          <App />
        </BuilderSettingsProvider>
      );
    }
  }}
);
});