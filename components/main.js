import styles from '../styles/main.module.css'
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
    <div className={styles['main']}>
      <div className={styles['connect']}>
      <ConnectButton  />
      </div>

      {
      isConnected && 
      <>
        <div  className={styles['basic-info']}>
          <div> Connected to: {address} </div>
          <div> Balance: {balanceDate?.formatted} {balanceDate?.symbol} </div>
          <div> Latest Block number: {Blockdata} </div>
          <div> ENS Fetched: {ensData}   </div>
        </div>

        <div className={styles['field']}>
          <div disabled={isLoading} onClick={() => signMessage()} className={styles['outlinelightbtn']}>
              <span className={styles['text']}>
                  <span>Sign data</span>
              </span>     
          </div>
          <input  
            className={styles['input']}
            type="text"
            placeholder='Enter message to sign...'
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className={styles['field']}>
          <div disabled={!sendTransaction && recepient}  onClick={() => sendTransaction?.()} className={styles['outlinelightbtn']}>
              <span className={styles['text']}>
                  <span>Send ETH</span>
              </span>     
          </div>
          <input  
            className={styles['input']}
            type="text"
            placeholder='Recepient Address'
            onChange={(e) => setRecepient(e.target.value)}
          />
          <input  
            className={styles['input']}
            type="text"
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
          <div className={styles['error']}>See errors in dev console... </div>
        </div>
        
      </>
      }
        

    </div>
  )
}