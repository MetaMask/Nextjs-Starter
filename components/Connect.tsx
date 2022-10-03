import Image from "next/future/image"
import { useMetamask } from "../hooks/useMetamask"

export default function Connect() {
  const { dispatch } = useMetamask()
  return (
    <div className="relative bg-white py-16">
      <div className="absolute inset-x-0 top-0 hidden h-1/2lg:block" aria-hidden="true" />
      <div className="mx-auto max-w-7xl bg-truffle lg:bg-transparent lg:px-8">
        <div className="lg:grid lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:bg-transparent lg:py-16">
            <div className="absolute inset-x-0 h-1/2 bg-gray-50 lg:hidden bg-white" aria-hidden="true" />
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
              <div className="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
                <Image
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                  className="rounded-3xl object-cover object-center "
                  src="/truffle.svg"
                  width={300}
                  height={300}
                  alt="Truffle Logo"
                />
              </div>
            </div>
          </div>

          <div className="relative bg-truffle lg:col-span-10 lg:col-start-3 lg:row-start-1 lg:grid lg:grid-cols-10 lg:items-center lg:rounded-3xl">
            <div className="absolute inset-0 hidden overflow-hidden rounded-3xl lg:block" aria-hidden="true">
            </div>
            <div className="relative mx-auto max-w-md space-y-6 py-12 px-4 sm:max-w-3xl sm:py-16 sm:px-6 lg:col-span-6 lg:col-start-4 lg:max-w-none lg:p-0">
              <h2 className="text-3xl font-bold tracking-tight text-white" id="join-heading">
                NFT Portfolio
              </h2>
              <p className="text-lg text-white">
                Connect your wallet in order to see all the NFTs you own. Powered by Infura NFT API
              </p>
              <button
                className="block w-full rounded-md border border-transparent bg-ganache py-3 px-5 text-center text-base font-medium text-white shadow-md  sm:inline-block sm:w-auto"
              >
                Connect your wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}