export const environment = {
  production: true,

  firebaseConfig: {
    "projectId": process.env["FIREBASE_PROJECT_ID"],
    "appId":process.env["FIREBASE_APP_ID"],
    "storageBucket":process.env["FIREBASE_STORAGE_ID"],
    "apiKey":process.env["FIREBASE_API_KEY_ID"],
    "authDomain":process.env["FIREBASE_AUTH_ID"],
    "messagingSenderId":process.env["FIREBASE_MESSAGING_ID"]
  }
  
};
