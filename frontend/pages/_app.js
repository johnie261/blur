// import '@/styles/globals.css'
// //import { WagmiConfig } from 'wagmi'

// export default function App({ Component, pageProps }) {
  
//   return (
    
//       <Component {...pageProps} />
    
//   );

// }

// import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
// import { publicProvider } from 'wagmi/providers/public'
 
// const { publicClient, webSocketPublicClient } = configureChains(
//   [mainnet],
//   [publicProvider()],
// )
 
// const config = createConfig({
//   publicClient,
//   webSocketPublicClient,
// })

 
// export default function App({ Component, pageProps }) {
  
//   return (
//     <WagmiConfig config={config}>
//       <Component {...pageProps} />
//     </WagmiConfig>
//   );
// }

import { WagmiConfig, createConfig, configureChains, mainnet, sepolia } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
 
const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [publicProvider()],
)
 
const config = createConfig({
  publicClient,
  webSocketPublicClient,
})


export default function App({ Component, pageProps }) {
  
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );

  }