import './styles/globals.css';
import { CartProvider } from './context/cartContext';// Adjust the path to your context file
import Header from './components/Header';

export const metadata = {
  title: 'Splendo'
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
