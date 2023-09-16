import './globals.css'
import Header from "../components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
