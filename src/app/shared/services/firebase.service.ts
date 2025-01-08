import { inject, Injectable } from '@angular/core';
import { FirebaseOptions, initializeApp } from '@angular/fire/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { environment } from 'src/environments/environment';
import { Firestore, getFirestore, setDoc, getDoc, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  fireStore = inject(Firestore);
  router = inject(Router);
  config;
  fireApp;
  fireAuth;


  firebaseMode(){
    if(environment.production){
      this.config = {
        "projectId": process.env["FIREBASE_PROJECT_ID"],
        "appId":process.env["FIREBASE_APP_ID"],
        "storageBucket":process.env["FIREBASE_STORAGE_ID"],
        "apiKey":process.env["FIREBASE_API_KEY_ID"],
        "authDomain":process.env["FIREBASE_AUTH_ID"],
        "messagingSenderId":process.env["FIREBASE_MESSAGING_ID"]
      }
    }else{
      this.config = environment.firebaseConfig
    }

    this.fireApp = initializeApp(this.config);
    this.fireAuth = getAuth(this.fireApp);
  }

  
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

}
