import { inject, Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  fireStore = inject(Firestore);
  fireApp = initializeApp(environment.firebaseConfig);
  fireAuth = getAuth(this.fireApp);

  /* Autenticacion */

  login(user: Usuario){
    return signInWithEmailAndPassword(this.fireAuth, user.email, user.password);
  }
}
