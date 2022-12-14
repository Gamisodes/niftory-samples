import Footer from "../ui/Footer"
import { Navbar } from "../ui/Navbar/Nav"

type Props = {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  return (
    <main>
      <Navbar />
      <section className="pt-20 min-h-[calc(100vh-theme(space.20))] flex">
        <div className="mx-auto">{children}</div>
      </section>
      <Footer />
    </main>
  )
}
