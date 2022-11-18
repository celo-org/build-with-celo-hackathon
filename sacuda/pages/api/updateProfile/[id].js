import connectMongo from '../../../utils/connectMongo';
import Sacuda from '../../../models/sacudaModel';

export default async function updateProfileHandler(req, res) {

  const { method,body } = req
  const reqemail = req.query

  await connectMongo();

  switch (method) {

    case "PUT":
      try {
        const profData = await Sacuda.findOneAndUpdate({email: reqemail.id}, req.body, {
          //new: true,
          //runValidators: true,
        });
        if (!profData) {
          console.log('cosas1'+reqemail)
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: profData });
      } catch (error) {
        console.log('cosas2'+req.query.reqemail)
        res.status(400).json({ success: false });
      }
      break;

    default:
      console.log('cosas3'+[req.query])
      res.status(400).json({ success: false });
      break;
  }
}