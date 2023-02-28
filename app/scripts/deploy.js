
import CryptumSDK from 'cryptum-sdk'

const sdk = new CryptumSDK({
  environment: process.env.REACT_APP_TESTNET,
  apiKey: process.env.REACT_APP_CRYPTUM_API_KEY,
})


async function deploy() {

  const wallet = process.env.REACT_APP_PRIVATE_KEY
  console.log(wallet)

  const deployed = await sdk.nft.create({
    wallet,
    name: 'Cryptum Collection 2023',
    symbol: 'CC23',
    type: 'ERC721',
    protocol: 'POLYGON',
  })

  console.info(deployed)

}


deploy()