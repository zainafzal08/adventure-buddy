import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD7EPGfit08XzckzYcgnkaOLWDq18UKsio',
  authDomain: 'adventure-buddy-f1858.firebaseapp.com',
  databaseURL: 'https://adventure-buddy-f1858.firebaseio.com',
  projectId: 'adventure-buddy-f1858',
  storageBucket: 'adventure-buddy-f1858.appspot.com',
  messagingSenderId: '147400186568',
  appId: '1:147400186568:web:bcbd9d6b6ca383541963fd',
  measurementId: 'G-HDLML9XEF6',
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

import './app-view.ts';
