import path from 'path';

export default async function hello(req, res) {
  res.json({ cwdResolve: path.resolve(process.cwd(), 'emails'), __dirname });
}
