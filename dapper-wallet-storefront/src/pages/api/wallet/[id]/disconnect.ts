import { NextApiHandler } from "next"
import prisma from "src/lib/prisma"

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed, this endpoint only supports POST")
    return
  }
  const adminHeader =
    (req.headers["x-gamisodes-admin-key"] || req.headers["X-Gamisodes-Admin-Key"]) ?? ""

  if (adminHeader !== "a63e0897-9db9-4966-9012-db173e61c645") {
    res.status(405).send("Method not allowed, please sign-in as admin")
    return
  }
  const id = req.query.id as string

  if (!id) {
    res.status(400).send("tranidsactionId is required")
    return
  }

  try {
    const wallet = await prisma.wallet.findFirst({
      where: { address: id },
      include: { user: true },
    })

    if (!wallet) {
      res.status(200).json({ data: wallet, success: false })
      return
    }

    const user = wallet.user

    if (!wallet.user) {
      res.status(200).json({ data: wallet, success: false })
      return
    }

    const data = await prisma.wallet.delete({ where: { userEmail: user.email } })

    await prisma.user.update({
      where: { email: user.email },
      data: { sessions: { deleteMany: {} } },
    })

    res.status(200).json({ data, success: true })
  } catch (error) {
    res.status(500).json({
      error: [error],
      success: false,
    })
  }
}

export default handler
