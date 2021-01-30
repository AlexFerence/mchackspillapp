import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

import { firebaseConfig } from './fbconfig'

//import { config } from 'firebaseConfigKey'

firebase.initializeApp(firebaseConfig)

export default firebase;