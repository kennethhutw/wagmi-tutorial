'use client'

import { useAccount, useConnect, useDisconnect, useBalance, useSwitchChain  } from 'wagmi'
import { useState, useEffect } from "react";
import { type Address } from "viem";
import MintToken from '../app/components/MintToken';
import SentETHButton from '../app/components/SendETH';
import { ConnectButton } from '@rainbow-me/rainbowkit';
function App() {
  const account = useAccount()
  const [address, setAddress] = useState("");
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { data, refetch } = useBalance({
    address: address as Address,
  });

  const { chains, switchChain } = useSwitchChain()
  

  useEffect(() => {
    if (
      account  && account.address
    ) {
      setAddress(account.address?.toString());
    } else{
      setAddress("");
    }
  }, [account]);

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
          <br />
          Balance: {data?.formatted} { data?.symbol }
        </div>
        <ConnectButton />
        {account.status === 'connected' && (
          <button type="button" onClick={() =>{ disconnect()
            refetch()}}>
            Disconnect
          </button>
        )}
      </div>
      <div>
      {chains.map((chain) => (
        <button key={chain.id} onClick={() => switchChain({ chainId: chain.id  })}>
          {chain.name}
        </button>
      ))}
    </div>


      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
      <div>
        <SentETHButton/>
        <MintToken/>
      </div>
    </>
  )
}

export default App
