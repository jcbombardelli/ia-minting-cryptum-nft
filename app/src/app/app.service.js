import axios from 'axios';
import utils from '../utils';
import { File, NFTStorage } from 'nft.storage';
import metadata from './assets/metadata.json'

const generateStableDiffusionImage = async (inputs = '') => {

  const uri =
    'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5';

  const response = await axios.post(
    uri,
    { inputs },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_TOKEN}`,
      },
      responseType: 'blob',
    }
  );

  return {
    data: response.data,
    url: URL.createObjectURL(response.data),
  };
};

const uploadToNFTStorage = async (file, name = 'AI NFT', description = 'AI generated NFT') => {
  const nftstorage = new NFTStorage({
    token: process.env.REACT_APP_NFT_STORAGE_KEY,
  });

  const uploadedImage = await nftstorage.store({
    name: 'Uploaded Image',
    description: 'UploadeImage',
    image: file
  })
  
  const uploadedImageFormatted = utils.formatIPFS(uploadedImage.data.image.href)

  const metadata = utils.metadataNFT(uploadedImageFormatted)
  const store = await nftstorage.storeDirectory([
    new File([JSON.stringify(metadata, null, 2)], 'metadata.json', { type: 'application/json' })
  ])
  return `https://ipfs.io/ipfs/${store}/metadata.json`;
};


const mintNFT = async ({ address, uriIPFS }) => {

  const response = await axios.post('http://localhost:8080/cryptum/nft/mint', 
  {
    address,
    metadata: uriIPFS
  })

  console.log(response)
  

  


  //chamar backend para gerar o NFT para address informado
  // pegar o Id da chaamda do contrato
  // criar arquivo .json com metadata, nomea-lo para o id retornado
  // salvar arquivo no Storage
  

};

export { 
  generateStableDiffusionImage, 
  uploadToNFTStorage, 
  mintNFT,
};
