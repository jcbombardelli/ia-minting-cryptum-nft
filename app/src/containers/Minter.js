import React from 'react';
import { useState } from 'react';
import { styles } from './Minter.style';
import Modal from 'react-modal';
import { QrReader } from 'react-qr-reader';
import {
  generateStableDiffusionImage,
  uploadToNFTStorage,
  mintNFT,
  generateMetadataFile,
} from '../app/app.service';

const Minter = () => {
  const [prompt, setPrompt] = useState('');

  const [generateStep, setGenerateStep] = useState(true);
  const [mintStep, setMintStep] = useState(false);
  const [mintedStep, setMintedStep] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isShowCamera, setShowCamera] = useState(true);

  const [image, setImage] = useState('../img/mintermaster.jpeg');
  const [file, setFile] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');

  const [nftAddress, setNftAddress] = useState(
    '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'
  );

  const inputTextChanged = (e) => {
    setPrompt(e.target.value);
  };

  const openCamera = () => {
    setWalletAddress('');
    setShowCamera(true);
  };

  const closeCamera = () => {
    setShowCamera(false);
  };

  async function handleGenerate() {
    setLoadingMessage('Generating Art...');
    setLoading(true);

    try {
      const generatedImage = await generateStableDiffusionImage(prompt);
      setImage(generatedImage.url);
      setFile(
        new File([generatedImage.data], `${Date.now().toString()}.png`, {
          type: 'image/png',
        })
      );
      setMintStep(true);
    } catch (error) {
      console.error(error);
      clear();
    } finally {
      setLoading(false);
      setGenerateStep(false);
    }
  }

  async function handleClear() {
    clear();
  }

  async function clear() {
    setLoading(false);
    setGenerateStep(true);
    setMintStep(false);
    setMintedStep(false);
    setWalletAddress('');
    setImage('../img/mintermaster.jpeg');
    setFile(null);
  }

  const handleScan = (data) => {
    if (data) {
      setWalletAddress(data.text.replace('ethereum:', '').split('@')[0]);
      setShowCamera(false);
    }
  };

  async function QRcode() {
    console.log('qrcode');
    setWalletAddress('0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270');
  }

  async function handleMint() {
    setLoadingMessage('Minting your NFT...');
    setLoading(true);

    try {
      const metadataIPFS = await uploadToNFTStorage(file);

      const mintedNFT = await mintNFT({
        address: walletAddress,
        uriIPFS: metadataIPFS,
      });
      console.log(mintedNFT);
      setMintedStep(true);
      setMintStep(false);
      setGenerateStep(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles.about1}>
        <span className={styles.purple}>Cryptum NFT Mint </span>{' '}
        <label className="text-[white]">Master.</label>
      </div>
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.div1}>
            <div className={styles.image}>
              <img src={image} alt="" />
            </div>
            <div className="text-[#b8b8b8] text-[11px]">{walletAddress}</div>
          </div>
          {!isLoading ? (
            <div className={styles.div2}>
              <img src="logo.jpg" alt="" className={styles.polygon}></img>
              {generateStep ? (
                <div className="space-y-5">
                  <div className={styles.inputbox}>
                    <input
                      className={styles.inputfield}
                      onChange={inputTextChanged}
                      type="text"
                      placeholder="Enter a prompt"
                    />
                  </div>
                  <div>
                    <button
                      className={styles.btnconnect}
                      onClick={handleGenerate}
                    >
                      GENERATE
                    </button>
                  </div>
                </div>
              ) : (
                ''
              )}
              {mintStep ? (
                <div>
                  <div>
                    <button className={styles.btnconnect} onClick={handleMint}>
                      MINT YOUR NFT
                    </button>
                  </div>
                  {/* <div className={styles.btndiv} > 
                      <button className={styles.btnclear} onClick={() => {Clear()}}>CLEAR </button>    
                    </div> */}
                  <div className="flex space-x-5 mx-20 mt-5 max-h-20 ">
                    <button className={styles.btnQR} onClick={handleClear}>
                      ⭮
                    </button>

                    <button
                      className={styles.btnQR}
                      onClick={() => {
                        QRcode();
                      }}
                    >
                      <img
                        className="h-[40px] w-[40px] mx-auto"
                        src="qr.png"
                        alt="qrcode"
                      />
                    </button>
                  </div>
                </div>
              ) : (
                ''
              )}
              {mintedStep ? (
                <div className="space-y-5">
                  <div className={styles.btndiv}>
                    <p className="text-[18px] text-bold text-white">
                      Your NFT Address:
                    </p>
                    <a
                      className="text-blue-300 text-[14px]"
                      href="https://mumbai.polygonscan.com/token/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"
                    >
                      {' '}
                      {nftAddress}{' '}
                    </a>
                  </div>
                  <div className={styles.btndiv}>
                    <button className={styles.btnredo} onClick={handleClear}>
                      ⭮
                    </button>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            <div className={styles.modal}>
              <div className={styles.spinner}> </div>
              <span className={styles.generating}> {loadingMessage} </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#0b0817]">
        <div className="mx-auto text-center flex flex-col w-[200px] bg-[#0b0817]">
          <a href="https://cryptum.io">
            <img src={`logo2.png`} alt="" />
          </a>
        </div>
      </div>

      <div className="modal">
        <Modal
          isOpen={isShowCamera}
          onRequestClose={closeCamera}
          style={{
            content: {
              width: '33%',
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <QrReader
            delay={250}
            onError={(error) => console.error(error)}
            onScan={handleScan}
            onResult={handleScan}
          />
          <p>{walletAddress}</p>
          <button onClick={closeCamera}>Fechar</button>
        </Modal>
      </div>
    </>
  );
};

export default Minter;
