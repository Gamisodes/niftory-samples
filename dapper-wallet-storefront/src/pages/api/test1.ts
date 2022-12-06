import { NextApiHandler } from "next"
import prisma from "src/lib/prisma"

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).send("Method not allowed, this endpoint only supports GET")
    return
  }
  try {
    console.log("go to prisma database", process.env.NODE_ENV)
    const data = {
      success: true,
    }
    console.log(await prisma.user.count())
    res.status(200).json(data)
  } catch (error) {
    console.log("error: ----------------")
    console.log(error)
    res.status(200).send(error)
  }
}

export default handler
