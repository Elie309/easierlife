import admin from "firebase-admin";

import serviceAccount from "../serviceAccountKey.json";
import { ServiceAccount } from "firebase-admin";


const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
}


if(!admin.apps.length){
    admin.initializeApp(firebaseConfig, "easierlife");
}

export default function getFirebaseApp(){
    return admin.app("easierlife");
}

