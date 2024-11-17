import { ethers } from "ethers";
import { nftContractAddress, marketplaceContractAddress } from "../config";
import marketplaceABI from "../config/abis/Marketplace.json";
import nftABI from "../config/abis/NFT.json";
import { writeContract } from "@wagmi/core";
import { config } from "../config";

export const mintNFT = async (tokenURI: string) => {
  // Connect to the user's wallet
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();

  // Create contract instance
  const nftContract = new ethers.Contract(nftContractAddress, nftABI, signer);

  // Mint NFT
  const transaction = await nftContract.mint(tokenURI);
  await transaction.wait();
  return transaction;
};

export const buyNFT = async (itemId: string, itemPrice: string) => {
  // Connect to the user's wallet
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();

  // Create contract instance
  const marketplaceContract = new ethers.Contract(
    marketplaceContractAddress,
    marketplaceABI,
    signer
  );

  // Buy NFT
  const transaction = await marketplaceContract.purchaseItem(itemId, {
    value: itemPrice,
  });
  await transaction.wait();
};

export const saleNFT = async (
  tokenId: string,
  price: string,
  contractAddress: string
) => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();

  const marketplaceContract = new ethers.Contract(
    marketplaceContractAddress,
    marketplaceABI,
    signer
  );

  const transaction = await marketplaceContract.makeItem(
    contractAddress,
    tokenId,
    price,
    {
      gasLimit: 300000,
    }
  );
  await transaction.wait();
};

export const approveNFT = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();

  const nftContract = new ethers.Contract(nftContractAddress, nftABI, signer);

  const transaction = await nftContract.setApprovalForAll(
    marketplaceContractAddress,
    true,
    {
      gasLimit: 300000,
    }
  );
  await transaction.wait();
};

export const isApproved = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();

  const nftContract = new ethers.Contract(nftContractAddress, nftABI, signer);

  const approved = await nftContract.isApprovedForAll(
    signer.getAddress(),
    marketplaceContractAddress
  );
  return approved;
};

export const getTokenCount = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();

  const nftContract = new ethers.Contract(nftContractAddress, nftABI, signer);

  const count = await nftContract.tokenCount();
  return count;
};
