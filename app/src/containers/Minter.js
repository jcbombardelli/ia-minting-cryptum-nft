import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';


const styles = {
   bg: `bg-[#0b0817] px-[18px] pt-[150px] pb-[200px] flex justify-center`,
   about1: `bg-[#0b0817] font-[Arial] text-[25px] text-center md:text-[45px] pt-[40px]`,
   purple: `font-manrope text-[25px] text-[#6e45c7] md:text-[40px]`,
   container: `bg-[#161226] border-white shadow-[1px_1px_10px_-4px_rgba(0,0,0,0)] shadow-white rounded-[30px] px-3 py-3 flex flex-col sm:flex-row justify-center md:max-w-2xl shadow-lg  `,
   div1: ` p-2 sm:w-1/2 flex flex-col justify-center text-center space-y-2`,
   div2: ` p-2 sm:w-1/2 align-middle text-center flex flex-col justify-center space-y-5` ,
   image: ` px-6 py-0 `,
   generating: `font-[Arial] text-white text-lg mx-6`,
   metamaskerror: `font-[Arial] text-sm bg-[#ffffff] mx-6 capitalize p-1`,
   btnconnect: `font-[Arial] border-0 w-full animate-pulse text-lg bg-[#6e45c7] hover:bg-[#7935adcc] text-white font-bold p-4  shadow-md`,
   btnclear: `font-[Arial] w-full text-lg bg-[#6e45c7] hover:bg-[red] text-white font-bold p-4  shadow-md border-0`,
   btnredo: `font-[Arial] w-[80px] text-lg bg-[#4b2c91] hover:bg-[grey] text-white font-bold p-4  shadow-md border-0`,
   btnQR: ` border-0 font-[Arial] w-[50px] text-lg bg-[#4b2c91] hover:bg-[grey] text-white  font-bold   shadow-md`,
   polygon: `max-w-[100px] mx-auto`,
   modal: `mx-auto`,
   spinner: `mb-2 mx-auto mt-[100px] w-20 h-20 rounded-full animate-spin border-8 border-solid border-purple-500 border-t-transparent`,
   opensea: `max-w-[260px] mx-auto pt-[20px]`,
   inputbox: `font-[Arial] w-[full] text-[18px]`,
   inputfield: `w-[100%] text-[#64B6AC] truncate`,
}


const Minter = () => {
   const [prompt, setPrompt] = useState('');
   const [generate, setGenerate] = useState(true)
   const [mint, setMint] = useState(false)
   const [minted, setMinted] = useState(false)
   const [mintingmodal, setmintingmodal] = useState(false)
   const [modalMessage, setModalMessage] = useState("")
   const [img, setImg] = useState('mintermaster.jpeg')
   const [nftAddress, setNftAddress] = useState('0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270')
   const [walletAddress, setWalletAddress] = useState('NFT Mint Master')

   const inputTextChanged = (e) => {
    setPrompt(e.target.value);
  };

   async function Generate() {
        setModalMessage("Generating Art...")
        setmintingmodal(true)
        console.log("oi")
        await new Promise(resolve => setTimeout(resolve, 1000));
        setmintingmodal(false)
        setGenerate(false)
        setMint(true)
        setImg('teste.jpg')
   }

   async function Clear() {
    setmintingmodal(false)
    setGenerate(true)
    setMint(false)
    setMinted(false)
    setWalletAddress('NFT Mint Master')
    setImg('mintermaster.jpeg')
   }

   async function QRcode() {
    console.log("qrcode")
    setWalletAddress('0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270')
   }

   async function Mint() {
    setModalMessage("Minting your NFT...")
    setmintingmodal(true)
    await new Promise(resolve => setTimeout(resolve, 1000));
    setmintingmodal(false)
    setMint(false)
    setGenerate(false)
    setMinted(true)
   }


   

  return (
    <>
      <div className={styles.about1}>
         <span className={styles.purple}>___ NFT Mint </span> <a className='text-[white]'>Master.</a>
      </div>
      <div className={styles.bg}>
         <div className={styles.container}>
            <div className={styles.div1}>
               <div className={styles.image}>
                  <img  src={`../img/${img}`} alt=""/>
               </div>
               <div className='text-[#b8b8b8] text-[11px]'>{walletAddress}</div>
            </div>
            {
            !mintingmodal 
            ?
               <div className={styles.div2}>
                  <img src="logo.jpg" alt="" className={styles.polygon}></img>
                  {generate ?
                  <div className='space-y-5'>
                    <div className={styles.inputbox}>
                            <input
                                className={styles.inputfield}
                                onChange={inputTextChanged}
                                type="text"
                                placeholder="Enter a prompt"
                            />
                    </div>
                    <div> 
                            <button className={styles.btnconnect} onClick={() => {Generate()}}>GENERATE</button>    
                    </div>
                   </div>
                  : 
                    ""
                  } 
                  {mint ?
                  <div>
                    <div> 
                      <button className={styles.btnconnect} onClick={() => {Mint()}}>MINT YOUR NFT</button>    
                    </div>
                    {/* <div className={styles.btndiv} > 
                      <button className={styles.btnclear} onClick={() => {Clear()}}>CLEAR </button>    
                    </div> */}
                      <div className='flex space-x-5 mx-20 mt-5 max-h-20 '>
                      <button className={styles.btnQR} onClick={() => {Clear()}}>
                        ⭮
                      </button>  
                      
                      <button className={styles.btnQR} onClick={() => {QRcode()}}>
                        <img  className='h-[40px] w-[40px] mx-auto' src="qr.png"/>
                      </button>  
                      </div>
                   </div>
                  : 
                    ""
                  } 
                  {minted ?
                  <div className='space-y-5'>
                    <div className={styles.btndiv} > 
                    <a className='text-[18px] text-bold text-white'>Your NFT Address:</a>
                    <a className='text-blue-300 text-[14px]' href='https://mumbai.polygonscan.com/token/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'> {nftAddress} </a> 
                    </div>
                    <div className={styles.btndiv} > 
                      <button className={styles.btnredo} onClick={() => {Clear()}}>
                      ⭮
                      </button>    
                    </div>
                   </div>
                  : 
                    ""
                  } 
               </div>

             : 
               <div className={styles.modal}>
                  <div className={styles.spinner}> </div>
                  <span className={styles.generating}> {modalMessage} </span>
               </div> 
            }

         </div>
        
        

      </div>
      
      <div className="bg-[#0b0817]">
      <div className="mx-auto text-center flex flex-col w-[200px] bg-[#0b0817]">
      <a href='https://cryptum.io'><img src={`logo2.png`} alt=""/></a>
      </div>
      </div>

    </>
  )
}

export default Minter