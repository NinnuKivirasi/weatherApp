import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA-EDDdIyPs7uxKuM6kc7ASTHBg4lKC0ks",
    authDomain: "weather-app-22885.firebaseapp.com",
    projectId: "weather-app-22885",
    storageBucket: "weather-app-22885.firebasestorage.app",
    messagingSenderId: "695390362412",
    appId: "1:695390362412:web:51e7e6fad4d0c95dce2a89"
  };

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


export async function loginUser(username: string, password: string) {
    const email = `${username}@codedamn.com`

    try{
        const res = await signInWithEmailAndPassword(auth, email, password)
        console.log(res)
        return true
    } 
    catch (error) {
        console.log(error)
        return false
    }    
}

export async function registerUser(username: string, password: string) {
    const email = `${username}@codedamn.com`

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        console.log(res)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}