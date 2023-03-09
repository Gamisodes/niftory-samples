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

  try {
    const wallets = await prisma.wallet.findMany({ include: { user: true } })
    if (!wallets.length) res.status(200).json({ data: wallets, success: false })

    res.status(200).json({ data: wallets, success: true })
  } catch (error) {
    res.status(500).json({
      error: [error],
      success: false,
    })
  }
}

export default handler
