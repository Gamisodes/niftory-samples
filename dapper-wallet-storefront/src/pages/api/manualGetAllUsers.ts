import { NextApiHandler } from "next"
import prisma from "src/lib/prisma"

const handler: NextApiHandler = async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      include: {
        wallet: true,
      },
    })

    res.status(200).json({ user, success: true })
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: ["Something occurred"],
    })
  }
}

export default handler
