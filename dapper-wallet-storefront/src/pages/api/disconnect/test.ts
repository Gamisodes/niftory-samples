import { NextApiHandler } from "next"
import { getAddressFromCookie } from "src/lib/cookieUtils"
import prisma from "src/lib/prisma"

const handler: NextApiHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ include: { wallet: true } })

    res.status(200).json({ data: users, success: true })
  } catch (error) {
    console.log("Error: ", error)
    res.status(500).json({
      error: [error?.message ? `${error?.message ?? ""}` : error],
      success: false,
    })
  }
}

export default handler
