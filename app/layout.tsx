import './globals.css'
import Header from './components/Header'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className="bg-white text-black">
        <Header />
        <div className="m-6">
          <MantineProvider>{children}</MantineProvider>
        </div>
      </body>
    </html>
  )
}
