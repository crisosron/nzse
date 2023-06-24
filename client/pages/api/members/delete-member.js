import { firebaseAdminAuth } from "../../../lib/firebase-admin";
import { hasRequiredProperties } from "../../../lib/api-utils";

const validRequestBody = (req) => {
  if(!req.body) return false;
  return hasRequiredProperties(["email"], req.body);
};

export const deleteMember = async (email, pendingOnly) => {
  const { users } = await firebaseAdminAuth.getUsers([{ email, }]) || {};
  console.log('deleting member with email: ', email);
  console.log('pendingOnly?: ', pendingOnly);

  if(!users || users.length === 0) {
    return {
      error: {
        message: `No pending members with the email ${email} were found`,
        status: 404
      }
    };
  }

  // TODO: Is pendingOnly still used?
  if(pendingOnly && !users[0].disabled) {
    return {
      error: {
        message: `An activated member was found with the email '${email}' and cannot be deleted`,
        status: 404
      }
    };
  }

  const uid = users[0].uid;
  console.log('Deleting user: ', uid);

  try {
    await firebaseAdminAuth.deleteUser(uid);
    console.log('Successfully deleted user');
    return {
      success: true
    };

  } catch (error) {
    console.log('Got an error attempting to delete firebase user: ', error);
    return {
      error: {
        message: error.message || 'Something went wrong. Please try again later',
        status: 500
      }
    };
  }

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

  try {
    const results = await deleteMember(req.body.email, req.body.pendingOnly);
    if(results.error) {
      res.status(results.error.status).json({ message: results.error.message });
      return;
    }
    res.status(200).send();

  } catch(error) {
    res.status('500').json({ message: 'Something went wrong trying to delete a pending member'});
  }

}