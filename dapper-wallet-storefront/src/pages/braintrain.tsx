import AppLayout from "src/components/AppLayout"
import { MetaTags } from "src/components/general/MetaTags"
import Hero from "src/ui/Hero"

const HomePage = () => {
  const title = `Braintrain | Gamisodes`

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
