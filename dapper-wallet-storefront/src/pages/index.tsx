import AppLayout from "../components/AppLayout"
import Hero from "../ui/Hero"
import Head from "next/head"

const HomePage = () => {
  const title = `Gamisodes`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
      <AppLayout>
        <Hero />
      </AppLayout>
    </>
  )
}

export default HomePage
