import firebaseApp from "@/firebase/clientApp";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);

let user = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        user = user;

    }else{
        user = null;
    }

});


export const login = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.log(error);
    }
}

export const logout = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.log(error);
    }
}

export const register = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.log(error);
    }
}


export default user;