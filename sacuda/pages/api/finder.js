import connectMongo from '../../utils/connectMongo';
import Sacuda from '../../models/sacudaModel';
import { useSession } from "next-auth/react";

const { data: session } = useSession()

export default async function finder() {
    await connectMongo()
    //type of request
    const {method} = req

    if (method === "POST") {
        try {
            const email = await Sacuda.findOne({ email: session.user.email });
            if (email) {
                     res.status(200).json({success: "email found", data: email})
                   }
            if (err) {
                    res.status(400).json({error: "no email found"})
                  }
         } catch (error) {
        res.status(400).json({error: "connection error"})
      }
    }
}