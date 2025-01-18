import { inject, Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { environment } from 'src/environments/environment';
import { Firestore, getFirestore, setDoc, getDoc, doc, addDoc, collection } from '@angular/fire/firestore';
import { getStorage,uploadString, ref, getDownloadURL } from 'firebase/storage';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  fireStore = inject(Firestore);  
  router = inject(Router);
  fireApp = initializeApp(environment.firebaseConfig);
  fireAuth = getAuth(this.fireApp);
  
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
  async addPicture(path:string, data_url:string){
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path));
    })
  }

}
