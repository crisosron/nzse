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

  if(!users || users.length === 0) {
    return {
      error: {
        message: `No members with the email ${email} were found`,
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

  try {
    await firebaseAdminAuth.deleteUser(uid);
    return {
      success: true
    };

  } catch (error) {
    return {
      error: {
        message: error.message || 'Something went wrong. Please try again later',
        status: 500
      }
    };
  }
};