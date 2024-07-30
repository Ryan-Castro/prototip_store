import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";

import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERIS,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
  };

export default class controlDB{
    private app = initializeApp(firebaseConfig);
    private db = getFirestore(this.app)

    public async addProduct(name:string) {
        await setDoc(doc(this.db, "produtos", "xis bacon"), {
            first: name,
            last: "Lovelace",
            born: 1815
        });
    }
}