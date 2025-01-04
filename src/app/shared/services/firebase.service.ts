import { inject, Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
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

  /* Autenticacion */
  login(user: Usuario){
    return signInWithEmailAndPassword(this.fireAuth, user.email, user.password);
  }

  createUser(user: Usuario){
    return createUserWithEmailAndPassword(this.fireAuth, user.email, user.name);
  }


  /* Base de datos */
  createDocument(path: string, data: any){
    return setDoc(
      doc(
        getFirestore(), path
      ), 
      data
    );
  }

  async obtenerDocumento(path: string){
    return (await 
      getDoc(
        doc(getFirestore(), path)
      )
    ).data()
  }

}
