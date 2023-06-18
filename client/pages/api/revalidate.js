export default async function handler(req, res) {
  if(!req.headers.authorization) return res.status(400).json({ message: 'Expected a Authorization header with a revalidate token'});

  const receivedToken = req.headers.authorization.replace('Basic ', '').trim();
  if(receivedToken !== process.env.REVALIDATE_TOKEN) return res.status(401).json({ message: 'Invalid token '});

  if(!req.body.entry) return res.status(400).json({ message: "Expected an 'entry' object in the request body"});

  const updatedContent = req.body;

  let slug = '/';
  if(updatedContent.model === 'general-page') {
    slug = updatedContent.entry.type.toLowerCase() === 'root' ? `/${updatedContent.entry.slug}` : `/${updatedContent.entry.type.toLowerCase()}/${updatedContent.entry.slug}`;
  } else if (updatedContent.model === 'join-page' || updatedContent.model === 'membership') {
    slug = '/join';
  }

  try {
    await res.revalidate(slug);
    return res.json({ revalidated: true });
  } catch(error) {
    return res.status(500).send('Error revalidating: ', error);
  }
}