import { NextApiHandler } from "next"
import prisma from "src/lib/prisma"

const handler: NextApiHandler = async (req, res) => {
  try {
    const data = await prisma.wallet.findFirst({ where: { address: "0xc7dcb612e9f42c1b" } })
    res.status(200).json({ data, success: true })
  } catch (error) {
    console.log("Error: ", error)
    res.status(500).json({
      error: [error],
      success: false,
    })
  }
}

export default handler
