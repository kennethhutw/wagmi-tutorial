import { useAccount, useBalance, useWriteContract, useSimulateContract,   useWaitForTransactionReceipt    } from 'wagmi';
import React, { useState } from 'react';
import { useSendTransaction  } from 'wagmi' 
import { parseEther } from 'viem' 
const SentETHButton = () => {

    const { data: hash, isPending,  sendTransaction } = useSendTransaction() 
    async function submit(e: React.FormEvent<HTMLFormElement>) { 
        e.preventDefault() 
        const formData = new FormData(e.target as HTMLFormElement) 
        // const to = formData.get('address') as string  
        // const value = formData.get('value') as string 
        // await sendTransaction({ to, value: parseEther(value) }) 
      } 
      const { isLoading: isConfirming, isSuccess: isConfirmed } = 
      useWaitForTransactionReceipt({ 
        hash, 
      }) 

    return (
        <div>
             <button
      onClick={() =>
        sendTransaction({
          to: '0x5375E7270d796dCD6c4048809539D3CC04476c32',
          value: parseEther('0.01'),
        })
      }
    >
      Send transaction
    </button>
        <form>
        <input name="address" placeholder="0xA0Cf…251e" required />
        <input name="value" placeholder="0.05" required />
        <button type="submit"  disabled={isPending}  >Send  {isPending ? 'Confirming...' : 'Send'} </button>
        {hash && <div>Transaction Hash: {hash}</div>} 
        {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmed.</div>} 
      </form></div>
    )
  }
  
  export default SentETHButton
