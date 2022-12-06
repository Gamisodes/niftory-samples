import { NextApiHandler } from "next"
import prisma from "src/lib/prisma"

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).send("Method not allowed, this endpoint only supports GET")
    return
  }
  try {
    const data = {
      users: await prisma.user.findMany(),
      wallet: await prisma.wallet.findMany(),
      account: await prisma.account.findMany(),
      session: await prisma.session.findMany(),
    }
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(502).send(error)
  }
}

export default handler
