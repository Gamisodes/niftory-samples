import { NextApiHandler } from "next"
import { getAddressFromCookie } from "src/lib/cookieUtils"
import prisma from "src/lib/prisma"

const handler: NextApiHandler = async (req, res) => {
  //   if (req.method !== "POST") {
  //     res.status(405).send("Method not allowed, this endpoint only supports POST")
  //     return
  //   }
  //   const address = getAddressFromCookie(req, res)
  //   if (!address) {
  //     res.status(401).send("Must be signed in to purchase NFTs.")
  //     return
  //   }

  const email = req.query.email as string
  if (!email) {
    res.status(400).send("email is required")
    return
  }
  try {
    const user = await prisma.user.findFirst({
      where: { email },
      include: { wallet: true },
    })
    if (!user) {
      throw new Error("This user is not defined")
    }
    if (!user.wallet) {
      res.status(200).json({ data: user, success: true })
    }
    const data = await prisma.wallet.delete({ where: { userEmail: email } })
    await prisma.user.update({ where: { email }, data: { sessions: { deleteMany: {} } } })
    res.status(200).json({ data, success: true })
  } catch (error) {
    console.log("Error: ", error)
    res.status(500).json({
      error: [error?.message ? `${error?.message ?? ""}` : error],
      success: false,
    })
  }
}

export default handler
