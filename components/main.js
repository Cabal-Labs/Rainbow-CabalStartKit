import { useState, useEffect, useRef } from 'react';
import {ethers} from 'ethers';


import { ConnectButton } from '@rainbow-me/rainbowkit';


import {
    useAccount,
    useBlockNumber,  
    useBalance, 
    useSignMessage, 
    useEnsName, 
    useSendTransaction, 
    usePrepareSendTransaction   
  } from 'wagmi'

export default function Main() {

  const [message, setMessage] = useState('Using Cabal Labs - RainbowKit')
  const [recepient, setRecepient] = useState(null)
  const [amount, setAmount] = useState("0.0")
  const blockRef = useRef(null); 
  const errorRef = useRef(null);
  const [Blockdata, setBlockdata] = useState(0); 
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)

  const { address, isConnected } = useAccount()

  const { data: ensData} = useEnsName({
    address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  })

  const { data: balanceDate} = useBalance({
      address: address,
  })

  const blockNumber = useBlockNumber({
    onBlock(blockNumber) {
      blockRef.current = blockNumber
      setBlockdata(blockRef.current)
    },
  })

  const { isLoading, signMessage } = useSignMessage({
      message: message,
  })

  const { config } = usePrepareSendTransaction({
    request: { to: recepient, value: ethers.utils.parseUnits(amount,"ether"), },
    onError(error) {
      
      errorRef.current = error
      setError(errorRef.current)
      console.log(error)
    },
  })

  const { sendTransaction } = useSendTransaction({
    ...config,
    onError(error) {
      
      errorRef.current = error
      setError(errorRef.current)
      console.log(errorRef.current)
    },
  })


// https://wagmi.sh/react/getting-started

  return (
    <div className="absolute flex flex-col  items-center w-full h-full m-auto ">
      <div className="mt-5 mb-12">
      <ConnectButton  />
      </div>

      {
      isConnected && 
      <>
        <div  className="grid w-auto grid-cols-2 justify-evenly max-w-1100 ">
          <div className='border-b-2 p-2 m-2 border-white border-solid w-auto max-w-550 min-w-none'> Connected to: {address} </div>
          <div className='border-b-2 p-2 m-2 border-white border-solid w-auto max-w-550 min-w-none'> Balance: {balanceDate?.formatted} {balanceDate?.symbol} </div>
          <div className='border-b-2 p-2 m-2 border-white border-solid w-auto max-w-550 min-w-none'> Latest Block number: {Blockdata} </div>
          <div className='border-b-2 p-2 m-2 border-white border-solid w-auto max-w-550 min-w-none'> ENS Fetched: {ensData}   </div>
        </div>

        <div className="flex flex-row items-center justify-start">
          <div disabled={isLoading} onClick={() => signMessage()} className=" hover:bg-b-color-hover active:bg-b-color-active m-4 rounded-lg border-white border-solid borde-2 cursor-pointer w-fit flex p-4 relative items-start flex-shrink-0 ">
              <span>
                  <span>Sign data</span>
              </span>     
          </div>
          <input  
            className="h-12 bg-transparent text-white  m-2 border-white rounded-lg border-solid border-2 w-300 p-1 text-base outline-0 outline-transparent"
            type="text"
            placeholder='Enter message to sign...'
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex flex-row items-center justify-start">
          <div disabled={!sendTransaction && recepient}  onClick={() => sendTransaction?.()} className=" hover:bg-b-color-hover active:bg-b-color-active m-4 rounded-lg border-white border-solid borde-2 cursor-pointer w-fit flex p-4 relative items-start flex-shrink-0">
              <span >
                  <span>Send ETH</span>
              </span>     
          </div>
          <input  
            className="h-12 bg-transparent text-white  m-2 border-white rounded-lg border-solid border-2 w-300 p-1 text-base outline-0 outline-transparent"
            type="text"
            placeholder='Recepient Address'
            onChange={(e) => setRecepient(e.target.value)}
          />
          <input  
            className="h-12 bg-transparent text-white  m-2 border-white rounded-lg border-solid border-2 w-300 p-1 text-base outline-0 outline-transparent"
            type="number"
            placeholder='Amount in ETH'
            onChange={(e) => 
              {
                if (e.target.value < 0 || e.target.value === "") {
                  setAmount("0.0")
                } else
                setAmount(e.target.value)
              }}
          />
        </div>
        <div>
          <div className="text-xl m-5 p-0">See errors in dev console... </div>
        </div>
        
      </>
      }
        

    </div>
  )
}