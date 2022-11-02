import connectMongo from '../../../utils/connectMongo';
import Sacuda from '../../../models/sacudaModel';

export default async function emailHandler (req, res) {
  const {
    query: { reqemail },
    method,
  } = req
  console.log('inicio'+reqemail)


  console.log('CONNECTING TO MONGO');
  await connectMongo()
  console.log('CONNECTED TO MONGO');
  switch (method) {
    case 'POST':
      try {
        console.log('READING DOCUMENT');
        const sacudas = await Sacuda.findOne({ email: reqemail })
        console.log('READo DOCUMENT'+reqemail);
        res.status(200).json({ success: true, data: sacudas })
        res.json(sacudas)
        console.log('hay'+reqemail)
      } catch (error) {
        res.status(400).json({ success: false })
        console.log(error);
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}