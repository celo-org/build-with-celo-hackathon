import connectMongo from '../../utils/connectMongo';
import Sacuda from '../../models/sacudaModel';

export default async function getUsersHandler(req, res) {

  const { method,body } = req

  await connectMongo();

  switch (method) {
    case "POST":
      try {
        const profData = await Sacuda.find(req.body);
        if (!profData) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: profData });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}