import './App.css'
import { StateProvider } from './config/context'
import Routespath from './routes/Routespath'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <StateProvider>
      <PayPalScriptProvider deferLoading={true} >
        <Toaster />
        <Routespath />
      </PayPalScriptProvider>
    </StateProvider>
  )
}

export default App
