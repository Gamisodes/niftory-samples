import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import prisma from "src/lib/prisma"

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({
      success: false,
      errors: ["Method not allowed, this endpoint only supports GET"],
    })
    return
  }

  try {
    const wallet = await prisma.wallet.findMany({
      include: {
        user: true,
      },
    })
    res.status(200).json({ success: true, data: wallet ?? [] })
  } catch (error) {
    res.status(500).json({
      error: [error],
      success: false,
    })
  }
}

export default handler
