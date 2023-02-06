import styles from '../styles/main.module.css'
import { useState } from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount,  useBlockNumber, useBalance, useSignMessage } from 'wagmi'

export default function Main() {
    

    const { address, isConnected } = useAccount()
    const [clicked1, setClicked1] = useState(false)
    const [clicked2, setClicked2] = useState(false)
    const [clicked3, setClicked3] = useState(false)


    const { data: balanceDate} = useBalance({
        address: address,
    })

    const { data: Blockdata} = useBlockNumber()

    const { data: signData, isError, isLoading, isSuccess, signMessage } = useSignMessage({
        message: 'Using Cabal Labs - RainbowKit ',
      })
     



// https://wagmi.sh/react/getting-started

  return (
    <div className={styles['main']}>
      <ConnectButton />

      <div className={styles['field']}>
        <div onClick={()=>{setClicked1(true)}} className={styles['outlinelightbtn']}>
            <span className={styles['text']}>
                <span>Get Address</span>
            </span>     
        </div>
        {isConnected && clicked1 && <span> {address}</span>}
      </div>
      
      <div className={styles['field']}>
        <div onClick={()=>{setClicked2(true)}} className={styles['outlinelightbtn']}>
            <span className={styles['text']}>
                <span>Get Balance</span>
            </span>     
        </div>
        {isConnected && clicked2 && <span> Balance: {balanceDate?.formatted} {balanceDate?.symbol} </span>}
      </div>
      
      <div className={styles['field']}>
        <div onClick={()=>{setClicked3(true)}} className={styles['outlinelightbtn']}>
            <span className={styles['text']}>
                <span>Get Block Number</span>
            </span>     
        </div>
        {isConnected && clicked3 && <span> Block number: {Blockdata}</span>}
      </div>

      <div className={styles['field']}>
        <div disabled={isLoading} onClick={() => signMessage()} className={styles['outlinelightbtn']}>
            <span className={styles['text']}>
                <span>Sign data</span>
            </span>     
        </div>
        {isSuccess && <span> Signature: {signData}</span>}
        {isError && <span> Error signing message</span>}
      </div>

    </div>
  )
}