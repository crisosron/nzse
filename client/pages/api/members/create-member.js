import { firebaseAdminAuth } from "../../../lib/firebase-admin";

const validRequestBody = (req) => {
  if(!req.body) return false;
  return Object.keys(req.body).every((key) => ["email", "password"].includes(key));
};

export default async function handler(req, res) {
  if(req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
    return;
  }

  if(!validRequestBody(req)) {
    res.status(400).json({ message: "Request body must contain 'email' and 'password' properties of the member to create"});
    return;
  }

  const { email, password } = req.body;

  firebaseAdminAuth.createUser({
    email,
    password,
    disabled: true
  }).then((record) => {
    res.status(200).json({ uid: record.uid });
  }).catch((error) => {
    console.log('createUser error: ', error);
    res.status(500).json({
      error: {
        message: error.message || 'Something went wrong. Please try again later',
        status: 500
      }
    });
  });

}