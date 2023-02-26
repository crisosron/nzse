import { firebaseAdminAuth } from "../../../lib/firebase-admin";

const validRequestBody = (req) => {
  if(!req.body) return false;
  return Object.keys(req.body).every((key) => ["email"].includes(key));
};

export default async function handler(req, res) {
  if(req.method !== 'PATCH') {
    res.setHeader('Allow', 'PATCH');
    res.status(405).end('Method not allowed');
    return;
  }

  if(!validRequestBody(req)) {
    res.status(400).json({ message: "Request body must contain the email of the member to activate "});
    return;
  }

  const { email } = req.body;

  const { users } = await firebaseAdminAuth.getUsers([{ email, }]) || {};

  if(!users || users.length === 0) {
    res.status(404).json({ message: `No members with the email ${email} were found`});
    return;
  }

  const uid = users[0].uid;

  firebaseAdminAuth.updateUser(uid, {
    disabled: false
  }).then((record) => {
    res.status(200).json({ message: `Successfully activated user: ${record.uid}`});
  }).catch((error) => {
    res.status(500).json({
      error: {
        message: error.message || 'Something went wrong. Please try again later',
        status: 500
      }
    });
  });
}