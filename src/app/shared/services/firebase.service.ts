import { inject, Injectable, signal } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { environment } from 'src/environments/environment';
import { Firestore, getFirestore, setDoc, getDoc, doc, addDoc, collection } from '@angular/fire/firestore';
import { getStorage,uploadString, ref, getDownloadURL } from 'firebase/storage';
import { Router } from '@angular/router';
import { getDocs } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  /* OnlyTest */
  messageService = inject(ToastrService);
  /* End Only Test */

  fireStore = inject(Firestore);  
  router = inject(Router);
  fireApp = initializeApp(environment.firebaseConfig, 'principal');
  storageApp = initializeApp(environment.storageConfig, 'storage');
  fireAuth = getAuth(this.fireApp);
  storageAuth = getAuth(this.storageApp);
  productsList:any[] = [];
  productType:any[] = [];

  sotorageConfig = getStorage(this.storageApp);
  firestoreConfig = getFirestore(this.fireApp);
  
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
        this.firestoreConfig, path
      ),
      data
    );
  }

  async obtenerDocumento(path: string) {
    return (await
      getDoc(
        doc(this.firestoreConfig, path)
      )
    ).data()
  }

  /* Obtener todos los productos */
  async getProducts(){
    const productCollection = collection(this.firestoreConfig, 'Productos'); 
    const allProducts = await getDocs(productCollection);

    this.productsList = [];

    allProducts.forEach(element => {
      this.productsList.push(element.data());
    });
  }

  /* Subtipos de productos */
  async getSubTypes(){
    const subTypesCollection = collection(this.firestoreConfig, 'SubTipos');
    const allSubTypes = await getDocs(subTypesCollection);

    this.productType = [];

    allSubTypes.forEach(element =>{
      this.productType.push(element.data());
    });
  }


  /* Registro de productos en la Base de datos */
  addProduct(path:string, data: any){
    return addDoc(
      collection(
        this.firestoreConfig, path
      ),
      data
    );
  }

  /* Almacenamietno de imagenes */
  async addPicture(path:string, data_url:any){
    return uploadString(ref(this.sotorageConfig, path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(this.sotorageConfig, path));
    })
  }

}
