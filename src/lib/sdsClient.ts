import { createClient } from '@somnia-chain/streams'
import { somniaTestnetChain } from './web3'

export const sdsClient = createClient({
  chain: somniaTestnetChain,
  transport: {
    type: 'http',
    url: somniaTestnetChain.rpcUrls.default.http[0],
  },
})

export const subscribeToGameEvents = (contractAddress: string, gameId: number, onData: (data: any) => void) => {
  const subscription = sdsClient.subscribe({
    eventContractSources: [contractAddress],
    topicOverrides: [
      '0x...' // MoveMade event topic
    ],
    ethCalls: [{
      to: contractAddress,
      data: `0x...${gameId.toString(16).padStart(64, '0')}` // getGameState(gameId) selector
    }],
    onData,
    onError: (error) => {
      console.error('SDS subscription error:', error)
      // Fallback to polling every 3 seconds
      setInterval(async () => {
        // Poll for game state updates
        console.log('Polling for game state...')
      }, 3000)
    },
    onlyPushChanges: true
  })

  return subscription
}
