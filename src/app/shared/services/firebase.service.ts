import { inject, Injectable, signal } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { environment } from 'src/environments/environment';
import { Firestore, getFirestore, setDoc, getDoc, doc, addDoc, collection } from '@angular/fire/firestore';
import { getStorage,uploadString, ref, getDownloadURL } from 'firebase/storage';
import { Router } from '@angular/router';
import { getDocs } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  fireStore = inject(Firestore);  
  router = inject(Router);
  fireApp = initializeApp(environment.firebaseConfig, 'principal');
  storageApp = initializeApp(environment.storageConfig, 'storage');
  fireAuth = getAuth(this.fireApp);
  storageAuth = getAuth(this.storageApp);
  productsList:any[] = [];
  productType:any[] = [];
  
  /* Autenticacion y creacion de usuario */
  login(user: Usuario) {
    console.log(user);
    return signInWithEmailAndPassword(this.fireAuth, user.email, user.password);
  }

  createUser(user: Usuario) {
    return createUserWithEmailAndPassword(this.fireAuth, user.email, user.password);
  }

  updateUser(displayName: string) {
    return updateProfile(this.fireAuth.currentUser, { displayName });
  }

  logOut() {
    return this.fireAuth.signOut();
  }

  /* Base de datos */
  async createDocument(path: string, data: any) {
    return await setDoc(
      doc(
        getFirestore(), path
      ),
      data
    );
  }

  async obtenerDocumento(path: string) {
    return (await
      getDoc(
        doc(getFirestore(), path)
      )
    ).data()
  }

  /* Obtener todos los productos */
  async getProducts(){
    const productCollection = collection(getFirestore(), 'Productos'); 
    const allProducts = await getDocs(productCollection);

    this.productsList = [];

    allProducts.forEach(element => {
      this.productsList.push(element.data());
    });

    return  this.productsList;
  }

  /* Subtipos de productos */
  async getSubTypes(){
    const subTypesCollection = collection(getFirestore(), 'SubTipos');
    const allSubTypes = await getDocs(subTypesCollection);

    this.productType = [];

    allSubTypes.forEach(element =>{
      this.productType.push(element.data());
    });

    console.log(this.productType);

    return this.productType;
  }


  /* Registro de productos en la Base de datos */
  addProduct(path:string, data: any){
    return addDoc(
      collection(
        getFirestore(), path
      ),
      data
    );
  }

  /* Almacenamietno de imagenes */
  async addPicture(path:string, data_url:any){
    return uploadString(ref(getStorage(this.storageApp), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(this.storageApp), path));
    })
  }

}
