import { inject, Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, UserCredential, signInWithRedirect } from 'firebase/auth';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { environment } from 'src/environments/environment';
import { Firestore, getFirestore, setDoc, getDoc, doc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  fireStore = inject(Firestore);
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


  /* Logeo con Google */
  async logInWithGoogle() {
    const googleAuth = new GoogleAuthProvider();
    await signInWithPopup(this.fireAuth, googleAuth).then((data: UserCredential) => {
      console.log(data);
    })
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
