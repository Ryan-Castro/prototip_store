import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, getFirestore, QuerySnapshot, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject  } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERIS,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
  };

interface IProduct{
    name: string
    price: number
    Ingredients: string
    additing: {name:string, price:number}[],
    thumb: string
}
export default class controlDB{
    private app = initializeApp(firebaseConfig);
    private db = getFirestore(this.app)
    private storage = getStorage();

    public async addProduct(data:IProduct) {
        await addDoc(collection(this.db, "produtos"), data);
    }
    public async setProduct(data:IProduct, id: string) {
        await setDoc(doc(this.db, "produtos", id), data);
    }
    public async addImage(file: File): Promise<string> {
        return new Promise(async (resolve)=>{
            await uploadBytes(ref(this.storage, file.name), file).then(async(snapshot) => {
                await getDownloadURL(ref(this.storage, snapshot.ref.name)).then((url)=>{
                    resolve(url)
                })
            });
        })
    }
    public async deletImage(url: string): Promise<boolean> {
        return new Promise(async (resolve)=>{
            await deleteObject(ref(this.storage, url)).then(() => {
                resolve(true)
              }).catch((error) => {
                // Uh-oh, an error occurred!
              });
        })
    }
    public async deletProduct(id: string): Promise<boolean> {
        return new Promise(async (resolve)=>{
            await deleteDoc(doc(this.db, "produtos", id)).then(() => {
                resolve(true)
              }).catch((error) => {
                // Uh-oh, an error occurred!
              });
        })
    }
    public async readDb(): Promise<QuerySnapshot<DocumentData, DocumentData>>{
        return new Promise(async (resolve)=>{
            resolve(await getDocs(collection(this.db, "produtos")))
        })
    }
    public async setPromo(data:{name:string, price:number}[]) {
        await setDoc(doc(this.db, "config", "promos"), {
            ativas: data
        });
    }
    public async readPromo(): Promise<DocumentSnapshot>{
        return new Promise(async (resolve)=>{
            resolve(await getDoc(doc(this.db, "config", "promos")))
        })
    }
}