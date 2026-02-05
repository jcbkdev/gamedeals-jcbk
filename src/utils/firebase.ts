import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  Messaging,
  isSupported,
} from "firebase/messaging";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

const app: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

let messaging: Messaging | null = null;

if (typeof window !== "undefined") {
  try {
    if (location.hostname !== "localhost" && location.protocol !== "https:") {
      console.error(
        "❌ Firebase: Service Workers require HTTPS. You are on HTTP.",
      );
    }

    messaging = getMessaging(app);
    console.log("✅ Firebase Messaging initialized.");
  } catch (err) {
    console.error("❌ Firebase Messaging failed to init:", err);
  }
}

export { messaging };

export const requestForToken = async (): Promise<string | null> => {
  const hasSupport = await isSupported();
  if (!hasSupport) {
    console.warn(
      "⚠️ Firebase Messaging is not supported in this browser/context.",
    );
    return null;
  }

  if (!messaging) {
    console.error("❌ Messaging is null. Initialization failed previously.");
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    console.log("Notification Permission Status:", permission);

    if (permission === "granted") {
      const currentToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_VAPIDKEY,
      });

      if (currentToken) {
        console.log("✅ FCM Token Generated:", currentToken);
        await saveTokenToBackend(currentToken);
        return currentToken;
      } else {
        console.warn(
          "⚠️ No registration token available. Request permission to generate one.",
        );
        return null;
      }
    } else {
      console.warn("⚠️ Notification permission denied.");
      return null;
    }
  } catch (error) {
    console.error("❌ An error occurred while retrieving token:", error);
    return null;
  }
};

const saveTokenToBackend = async (token: string): Promise<void> => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL + "/subscribe";
  console.log("Attempting to send token to backend:", url);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      console.log("✅ Token saved to backend successfully.");
    } else {
      console.error(
        "❌ Backend responded with error:",
        response.status,
        response.statusText,
      );
    }
  } catch (error) {
    console.error("❌ Network failed to save token to backend:", error);
  }
};

export async function checkSubscriptionStatus() {
  console.log("Checking subscription...");

  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.log("Push not supported");
    return false;
  }

  if (Notification.permission !== "granted") {
    console.log("Permission not granted");
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration(
      "/firebase-cloud-messaging-push-scope",
    );

    if (!registration) {
      console.log("No Service Worker found at Firebase scope.");
      return false;
    }

    const subscription = await registration.pushManager.getSubscription();
    const isSubscribed = !!subscription;

    console.log("Subscription found:", isSubscribed);
    return isSubscribed;
  } catch (error) {
    console.error("Error checking subscription:", error);
    return false;
  }
}
