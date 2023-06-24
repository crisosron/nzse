import { hasRequiredProperties } from "../../../lib/api-utils";
import { deleteMember } from "../../../lib/member-actions";

const validRequestBody = (req) => {
  if(!req.body) return false;
  return hasRequiredProperties(["email"], req.body);
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