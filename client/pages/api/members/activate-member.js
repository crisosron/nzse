// TODO: This api route is no longer used and should be deleted

import { firebaseAdminAuth } from "../../../lib/firebase-admin";

export const activateMember = async (email) => {
  const { users } = await firebaseAdminAuth.getUsers([{ email, }]) || {};

  if(!users || users.length === 0) {
    return {
      error: {
        message: `No members with the email ${email} were found`,
        status: 404
      }
    };
  }

  const uid = users[0].uid;

  try {
    const result = await firebaseAdminAuth.updateUser(uid, { disabled: false });
    return result;

  } catch(error) {
    return {
      error: {
        message: error.message || 'Something went wrong. Please try again later',
        status: 500
      }
    };
  }
};

const validRequestBody = (req) => {
  if(!req.body) return false;
  return Object.keys(req.body).every((key) => ["email"].includes(key));
};

export default async function handler(req, res) {
  if(req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
    return;
  }

  if(!validRequestBody(req)) {
    res.status(400).json({ message: "Request body must contain the email of the member to activate "});
    return;
  }

  const activationResult = await activateMember(req.body.email);
  if(activationResult.error) {
    res.status(activationResult.error.status).json({message: activationResult.error.message});
    return;
  }

  res.status(200);
}