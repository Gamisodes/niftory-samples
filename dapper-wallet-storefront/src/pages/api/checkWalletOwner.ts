import { NextApiHandler } from "next"
import prisma from "src/lib/prisma"

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({
      success: false,
      errors: ["Method not allowed, this endpoint only supports POST"],
    })
    return
  }

  const ourEmail: string | null = req.body.ourEmail
  const loggedWithAddress: string | null = req.body.loggedWithAddress
  if (!loggedWithAddress || !ourEmail) {
    res.status(405).json({ errors: ["Must have content"], success: false })
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: ourEmail,
      },
      include: {
        wallet: true,
      },
    })

    const wallet = await prisma.wallet.findUnique({
      where: {
        address: loggedWithAddress,
      },
    })
    //If this wallet don't exist at all and you don't have wallet
    if (!wallet && user?.wallet === null) {
      res.status(200).json({ shouldLogout: false, success: true })
      return
    }
    //If this wallet used by me
    else if (wallet && wallet.userEmail === ourEmail) {
      res.status(200).json({ shouldLogout: false, success: true })
      return
    }
    res.status(200).json({ shouldLogout: true, success: true })
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: ["Something occurred"],
    })
  }
}

export default handler
