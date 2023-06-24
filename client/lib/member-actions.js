import { firebaseAdminAuth } from "./firebase-admin";

export const updateMemberLoginStatus = async ({ email, loginDisabled }) => {
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
    const result = await firebaseAdminAuth.updateUser(uid, { disabled: loginDisabled });
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

export const deleteMember = async (email, pendingOnly) => {
  const { users } = await firebaseAdminAuth.getUsers([{ email }]) || {};
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