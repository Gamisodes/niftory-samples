import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import prisma from "src/lib/prisma"

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!(req.method === "GET" || req.method === "DELETE")) {
    res.status(405).json({
      success: false,
      errors: ["Method not allowed, this endpoint only supports GET or DELETE"],
    })
    return
  }
  const id = req.query.id as string
  if (!id) {
    res.status(401).json({ errors: ["Must have id."], success: false })
  }
  if (req.method === "GET")
    try {
      const wallet = await prisma.wallet.findUnique({
        where: {
          address: id,
        },
        include: {
          user: true,
        },
      })
      res.status(200).json({ success: true, data: wallet ?? [] })
      return
    } catch (error) {
      res.status(500).json({
        error: [error],
        success: false,
      })
    }
  if (req.method === "DELETE") {
    try {
      const wallet = await prisma.wallet.findUnique({
        where: {
          address: id,
        },
        include: {
          user: true,
        },
      })
      if (wallet) await prisma.wallet.delete({ where: { id: wallet.id } })
      res.status(200).json({ success: true, data: wallet ?? [] })
      return
    } catch (error) {
      res.status(500).json({
        error: [error],
        success: false,
      })
    }
  }
  res.status(500).json({
    success: false,
  })
}

export default handler
