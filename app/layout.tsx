import './globals.css'
import Header from './components/Header'
import '@mantine/core/styles.css'

import { MantineProvider, ColorSchemeScript } from '@mantine/core'
export const dynamic = 'force-dynamic'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black m-6">
        <Header />
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
