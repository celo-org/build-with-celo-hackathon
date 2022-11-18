import connectMongo from '../../utils/connectMongo';
import Sacuda from '../../models/sacudaModel';

export default async function emailHandler (req, res) {

  const { method,body } = req
  const reqemail = req.body

  await connectMongo()
  console.log('req:'+reqemail)
      try {
        const data = await Sacuda.findOne({ email: reqemail })
        res.status(200).json({ success: true, data })
      } catch (error) {
        res.status(400).json({ success: false })
        console.log(error);
      }
   
}