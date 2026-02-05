importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyDu9GXbqLeRL1chAFCiHZNoYXslXlaKyPY",
  authDomain: "gamedeals-jcbk.firebaseapp.com",
  projectId: "gamedeals-jcbk",
  storageBucket: "gamedeals-jcbk.firebasestorage.app",
  messagingSenderId: "565607087334",
  appId: "1:565607087334:web:e4124c6f5cb1b3d760cf27",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
