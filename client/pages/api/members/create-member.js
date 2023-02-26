import { firebaseAdminAuth } from "../../../lib/firebase-admin";

export default async function handler(req, res) {

  firebaseAdminAuth.getUsers([
    { email: 'test@example.com' }
  ]).then((response) => {
    console.log('getUsers response :', response);

  });

  res.status(200).json({ name: 'John Doe' });
}