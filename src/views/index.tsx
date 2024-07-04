// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../components/RequestAirdrop';

// Store
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore';
import { NftMinter } from 'components/NftMinter';

export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <div className='mt-6'>
        <h1 className="mx-auto text-center w-auto text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
          $ZACK NFT Minter
        </h1>
        </div>
    <div><script>
        window.ownerId = "Fk75QnLmbrEUmb3b7JqcVsG1BgLLa2YDajP17aGfbPgN"
        window.collectionId = "Axw4t4GE5XnySqSvFIZw"
    </script></div>
    <script type="module" src="https://storage.googleapis.com/scriptslmt/0.1.3/solana.js"></script>
    <link rel="stylesheet" href="https://storage.googleapis.com/scriptslmt/0.1.3/solana.css">
        { wallet.connected ? <div>
          <div className="flex flex-col mt-6">
            <NftMinter />
          </div>
          <div className="flex flex-col mt-12">
            <RequestAirdrop />
            <h4 className="md:w-full text-2xl text-slate-300 my-2">
            {wallet &&
            <div className="flex flex-row justify-center">
              <div>
                {(balance || 0).toLocaleString()}
                </div>
                <div className='text-slate-600 ml-2'>
                  SOL
                </div>
            </div>
            }
            </h4>
          </div>
        </div>
        :
        <div>
          <h4 className="md:w-full text-2xl text-slate-300 mt-8">
            Connect Your Wallet!
          </h4>
        </div>
        }
      </div>
    </div>
  );
};
