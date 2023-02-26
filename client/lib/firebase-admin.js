// IMPORTANT: The package 'firebase-admin' is server side only. Importing this into client side
// code will cause an error!
import * as admin from 'firebase-admin';
import { initializeApp, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export const firebaseAdminConfig = {
  // Because its difficult to upload the Google supplised Service Account Key json file to vercel,
  // the credentials are instead stored in .env and parsed/used here
  // Use this app to remove line breaks from json file before adding into .env: https://codebeautify.org/remove-line-breaks
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON))
};

let adminApp = null;
try {
  adminApp = getApp();
} catch(error) {
  if(error.code === 'app/no-app') adminApp = initializeApp(firebaseAdminConfig);
}

export const firebaseAdminAuth = getAuth(adminApp);
