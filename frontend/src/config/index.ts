export const nftContractAddress = "0x717B39602E8CabB14552E5C6D12f3e09C5993754";
export const marketplaceContractAddress =
  "0x55Df488a87496861666b4467C4E8A750fCf82D31";
export const nftABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_tokenURI",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

import { http, createConfig } from "@wagmi/core";
import { mainnet, sepolia } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
