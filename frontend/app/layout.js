import './globals.css'
import Navbar from '../components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Flight Status System',
  description: 'Check your flight status easily',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
          <ToastContainer />
        </main>
      </body>
    </html>
  )
}