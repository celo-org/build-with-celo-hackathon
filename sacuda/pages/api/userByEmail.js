import connectMongo from '../../utils/connectMongo';
import Sacuda from '../../models/sacudaModel';

export default async function emailHandler (req, res) {

  const { method,body } = req
  const reqemail = req.body

  console.log('CONNECTING TO MONGO');
  await connectMongo()
  console.log('CONNECTED TO MONGO');
      try {
        console.log('READING DOCUMENT');
        const data = await Sacuda.findOne({ email: reqemail })
        console.log('READo DOCUMENT'+data+data.email);
        res.body
        res.send(data)
        res.status(200).json({ success: true, data: data.email })
      } catch (error) {
        res.status(400).json({ success: false })
        console.log(error);
      }
   
}