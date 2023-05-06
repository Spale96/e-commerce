
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { StateContext } from "./context/StateContext"
import Toaster from "./Toaster"


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <StateContext>
          <div className="layout">
            <header>
              <Navbar />
            </header>
            <main className="main-container">
              {children}
              <Toaster />
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </StateContext>
      </body>
    </html>

  )
}
