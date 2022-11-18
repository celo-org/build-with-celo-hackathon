import connectMongo from '../../utils/connectMongo';
import Sacuda from '../../models/sacudaModel';

export default async function handler (req, res) {
  const { method,body } = req
  console.log('CONNECTING TO MONGO');
  await connectMongo()
  console.log('CONNECTED TO MONGO');
  switch (method) {
    case 'GET':
      try {
        console.log('READING DOCUMENT');
        const sacudas = await Sacuda.find({})
        console.log('READ DOCUMENT');
        res.status(200).json({ success: true, data: sacudas })
      } catch (error) {
        res.status(400).json({ success: false })
        console.log(error);
      }
      break
    case 'POST':
      try {
        console.log('CREATING DOCUMENT');
        const sacuda = await Sacuda.create(req.body)
        console.log('CREATED OK');
        res.status(201).json({ success: true, data: sacuda })
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