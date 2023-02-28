const formatIPFS = (url) => {
  if(url.includes("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/")
  }
}


const metadataNFT = (image) => {
  return {
    name: 'Evento realizado',
    description: 'Evento realizado em tal lugar gerado em proposta de ativação',
    image,
    attributes: [
      { name: "Year", value: 2023 },
      { name: "Event", value: "CriptoBlabis"}
    ]
  }

}

module.exports = {
  formatIPFS,
  metadataNFT
}