import type { Metadata } from "next"
import { Inter, Raleway } from "next/font/google"
import Link from "next/link"
import styles from "./layout.module.css"
import "./styles/globals.css"
import "./styles/theme.css"
import "./styles/tippy.css"
import "./styles/typography.css"

const inter = Inter({ subsets: ["latin"] })
const raleway = Raleway({ subsets: ["latin"] })
// const indieFlower = Indie_Flower({ weight: "400" });

export const metadata: Metadata = {
  title: "pfin",
  description: "tvm calcs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${raleway.className} ${inter.className}`}>
        <main className={styles.main}>
          <nav className={styles.nav}>
            <Link href="/">
              <div className={styles.logo}>
                <div>{"pfin"}</div>
                <div>{"tvm"}</div>
              </div>
            </Link>
            <Link href="/tvm">tvm</Link>
            <Link href="/stats">stats</Link>
            <Link href="/fixed income">fixed income</Link>
            <Link href="/equities">equities</Link>
            <Link href="/econ">econ</Link>
            <Link href="/deriv">derivatives</Link>
          </nav>
          <div className={styles.content}>{children}</div>
        </main>
      </body>
    </html>
  )
}
