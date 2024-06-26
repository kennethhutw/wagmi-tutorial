import { useAccount, useBalance, useWriteContract, useSimulateContract,   useWaitForTransactionReceipt    } from 'wagmi';
import React, { useState } from 'react';

const tokenAddress = '0x6d7357720c88CEFEa26C96d510dc2789d896b1e8';
import tokenAbi from "../abi/Token.json";
const TokenButton = () => {

    const { address } = useAccount()
  
    const { data, refetch } = useBalance({
      address: address,
      token: tokenAddress,
    })
    const {data: hash,   isPending,  writeContract  } = useWriteContract()

    const [txHash, setTxHash] = useState();
    const [mintToAddress, setMinToAddres] = useState("");
    const [tokenAmount, setTokenAmount] = useState(0);
    const { data:contractData, error, isSuccess, isLoading } = useSimulateContract({ 
        address: tokenAddress,
        abi: tokenAbi.abi,
        functionName: 'mint',
        args: [
            mintToAddress,
            tokenAmount
        ],
      })
  
    const mint = async () => {
      if(address)
     {
        const resultAA = await writeContract(contractData!.request);
        console.log("result ===========", resultAA);
    //    if(resultAA !== null)
    //         setTxHash(resultAA);
        if(isSuccess){
        
        console.log("successful" );
        }
     }
    }
    const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 
     const label = isLoading ? "Minting" : "Mint a Token"
    return (
      <div>
        UserBalance: { data?.formatted } { data?.symbol }
        <br />
        <input
                  onChange={ (event) => 
                    setMinToAddres(event.target.value)
                
                  }
                value ={mintToAddress}
                type="text"
                name="mintToAddress"
                id="mintToAddress"
                placeholder="0x...."/>
        <br />
        <input
                  onChange={async (event) => {
                    const { value } = event.target;
                    if (!value) {
                        setTokenAmount(0);
                      return;
                    }
                    setTokenAmount(parseFloat(value));
                  }}
                value ={tokenAmount}
                type="number"
                name="tokenAmount"
                id="tokenAmount"
                placeholder="0.00"/>

        <button disabled={isPending}  onClick={mint}>{label}</button>
       <p>  {hash && <div>Transaction Hash: {hash}</div>}</p>
       {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmed.</div>} 
      </div>
    )
  }
  
  export default TokenButton
