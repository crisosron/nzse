import { firebaseAdminAuth } from "../../../lib/firebase-admin";
import { hasRequiredProperties } from "../../../lib/api-utils";

const validRequestBody = (req) => {
  if(!req.body) return false;
  return hasRequiredProperties(["email", req.body]);
};

export default async function handler(req, res) {
  if(req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
    return;
  }

  if(!validRequestBody(req)) {
    res.status(400).json({ message: "Request body must contain 'email' of the member to delete from firebase"});
    return;
  }

  const { email } = req.body;

  const { users } = await firebaseAdminAuth.getUsers([{ email, }]) || {};

  if(!users || users.length === 0) {
    return {
      error: {
        message: `No pending members with the email ${email} were found`,
        status: 404
      }
    };
  }

  if(!users[0].disabled) {
    return {
      error: {
        message: `An activated member was found with the email '${email}' and cannot be deleted`,
        status: 404
      }
    };
  }

  const uid = users[0].uid;

  try {
    const result = await firebaseAdminAuth.deleteUser(uid);
    return result;

  } catch(error) {
    return {
      error: {
        message: error.message || 'Something went wrong. Please try again later',
        status: 500
      }
    };
  }
}