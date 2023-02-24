import { MetaTags } from "src/components/general/MetaTags"
import AppLayout from "../components/AppLayout"
import Hero from "../ui/Hero"

const HomePage = () => {
  const title = `Gamisodes`

  return (
    <>
      <MetaTags title={title} />
      <AppLayout>
        <Hero />
      </AppLayout>
    </>
  )
}

export default HomePage
