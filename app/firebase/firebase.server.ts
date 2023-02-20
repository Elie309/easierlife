
import { App, initializeApp, getApps, cert, getApp, ServiceAccount } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";

// const serviceAccount = {
//     "type": process.env.FIREBASE_TYPE,
//     "project_id": process.env.FIREBASE_PROJECT_ID,
//     "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
//     "private_key": process.env.FIREBASE_PRIVATE_KEY,
//     "client_email": process.env.FIREBASE_CLIENT_EMAIL,
//     "client_id": process.env.FIREBASE_CLIENT_ID,
//     "auth_uri": process.env.FIREBASE_AUTH_URI,
//     "token_uri": process.env.FIREBASE_TOKEN_URI,
//     "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//     "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
// }


let app: App;
let auth: Auth;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(require("./easierlife-privatekey.json")),
  });
  auth = getAuth(app);
} else {
  app = getApp();
  auth = getAuth(app);
}

export { auth as serverAuth };