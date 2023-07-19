import Head from "next/head"
import { useRouter } from "next/router"
import { PropsWithChildren, useMemo } from "react"
import { WEBSITE_URL } from "src/lib/const"
import { NFTModelDetail } from "src/typings/NftModelDetail"

interface IMetaTags extends PropsWithChildren {
  title?: string
  description?: string
}
export const MetaTags: React.FC<IMetaTags> = ({
  title = "Gamisodes",
  description = "Don't just watch your favorite childhood cartoons 📺 Collect them, trade them, game them 🕹",
  children,
}) => {
  const origin =
    typeof window !== "undefined" && window.location.origin ? window.location.origin : ""

  return (
    <Head>
      <title>{title}</title>
      <meta name="application-name" content={title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="description" content={description} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />
      <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="shortcut icon" href={`${origin}/icons/favicon.ico`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={origin} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${origin}/icons/android-chrome-192x192.png`} />
      <meta name="twitter:creator" content="@PlayGamisodes" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content={origin} />
      <meta property="og:image" content={`${origin}/icons/apple-touch-icon.png`} />
      {children}
    </Head>
  )
}
const Product: React.FC<PropsWithChildren & NFTModelDetail & { availableCount: number }> = ({
  children,
  metadata,
  availableCount,
}) => {
  const { asPath } = useRouter()
  const title = `${metadata.title ?? "Your's idea with"} | Gamisodes`
  const description = metadata?.description ?? ""
  const memorized = useMemo(
    function addProductJsonLd() {
      const productUrl = `${WEBSITE_URL}${asPath}`
      const availability =
        availableCount === 0 ? "https://schema.org/SoldOut" : "https://schema.org/InStock"
      const obj = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: metadata.title,
        image: [metadata.content[0].contentUrl],
        description: metadata.description,
        isFamilyFriendly: true,
        url: productUrl,
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: "Davis",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: metadata.quantityMinted > 0 ? metadata.quantityMinted : 1,
        },
        brand: {
          "@type": "Brand",
          name: "Gamisodes",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: metadata.price,
          itemCondition: "https://schema.org/NewCondition",
          priceValidUntil: "2030-11-11",
          availability,
          url: productUrl,
        },
      }
      return {
        __html: JSON.stringify(obj),
      }
    },
    [metadata.title]
  )

  return (
    <MetaTags title={title} description={description}>
      <script type="application/ld+json" dangerouslySetInnerHTML={memorized} key="product-jsonld" />
      {children}
    </MetaTags>
  )
}

export default Object.assign(MetaTags, { Product })
