import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Modal from 'react-modal';
import logo from './assets/mintermaster.jpeg';
import {
  generateStableDiffusionImage,
  uploadToNFTStorage,
  mintNFT,
  generateMetadataFile,
} from './app.service';

import './app.css';
import { metadataNFT } from '../utils';
import Minter from '../containers/Minter';

function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(logo);
  const [file, setFile] = useState(null);
  const [scanned, setScan] = useState(
    '0x20D40a314e64Be3d21015178E35E7589CE79a3F9'
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const inputTextChanged = (e) => {
    setPrompt(e.target.value);
  };

  const openModal = () => {
    setScan('');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleClear = () => {
    setImage(null);
    setFile(null);
  };

  const handleGenerate = async () => {
    const generatedImage = await generateStableDiffusionImage(prompt);
    setImage(generatedImage.url);

    setFile(
      new File([generatedImage.data], `${Date.now().toString()}.png`, {
        type: 'image/png',
      })
    );
  };

  const handleScan = (data) => {
    if (data) {
      setScan(data.text.replace('ethereum:', ''));
      setModalIsOpen(false);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleMintNFT = async () => {
    const metadataIPFS = await uploadToNFTStorage(file);

    const mintedNFT = await mintNFT({
      address: scanned,
      uriIPFS: metadataIPFS,
    });
    console.log(mintedNFT)
  };

  return (
    <>
    <Minter/>
    <div className="app">
      <div className="container">
        <div className="top">
          <div className="left">
            <div className="header">
              <p>
                ___ <code>NFT</code> Mint Master.
              </p>
              <img src={logo} className="logo" alt="logo" />
            </div>
          </div>

          <div className="right">
            <div className="header-2">
              <input
                className="input"
                onChange={inputTextChanged}
                type="text"
                placeholder="Enter a prompt"
              />
              <button className="text-lg" onClick={handleGenerate}>
                GENERATE
              </button>
            </div>

            {image && (
              <div className="generate-clear">
                <img src={image} className="logo" alt="AI generated art" />
                <div className="buttons">
                  <button className="button" onClick={handleMintNFT}>
                    Mint your NFT
                  </button>
                  <button
                    className="button"
                    style={{ marginLeft: 10 }}
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                  <p>
                    <code style={{ color: 'white' }}>{scanned}</code>
                  </p>
                  <button onClick={openModal}>Scan QR</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="bottom">
          <a
            className="app-link"
            href="https://cryptum.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Conheça
          </a>
        </div>
      </div>

      <div className="modal">
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <QrReader
            delay={250}
            onError={handleError}
            onScan={handleScan}
            onResult={handleScan}
            style={{ width: '50%' }}
          />
          <p>{scanned}</p>
          <button onClick={closeModal}>Fechar</button>
        </Modal>
      </div>
    </div>
    </>
  );
}

export default App;
