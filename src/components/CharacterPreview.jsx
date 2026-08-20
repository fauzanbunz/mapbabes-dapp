import React from 'react';

export default function CharacterPreview({ currentClothes }) {
  // Ganti dengan CID Pinata asli Anda nanti
  const ipfsBaseUrl = "https://gateway.pinata.cloud/ipfs/bafybeieksckbp7kmwgedsjvlgqrqvm57qqwgu3nykch6dkrhi724ysk3qu";

  // Konversi nama baju dari gameState menjadi nama fail gambar
  let clothesFile = 'cloth_default';
  if (currentClothes === 'Red Bikini') clothesFile = 'shop_1';
  if (currentClothes === 'Black Leather') clothesFile = 'shop_2'; 
  // Tambahkan mapping baju lain sesuai nama di items.js Anda

  return (
    <div className="relative w-64 h-64 mx-auto bg-black rounded-lg overflow-hidden border border-gray-700 shadow-lg">
      <img src={`${ipfsBaseUrl}/bg_1.png`} className="absolute inset-0 z-0 w-full h-full object-cover" alt="BG" />
      <img src={`${ipfsBaseUrl}/body_1.png`} className="absolute inset-0 z-10 w-full h-full object-cover" alt="Body" />
      <img src={`${ipfsBaseUrl}/eye_1.png`} className="absolute inset-0 z-20 w-full h-full object-cover" alt="Eye" />
      <img src={`${ipfsBaseUrl}/bracelet_1.png`} className="absolute inset-0 z-30 w-full h-full object-cover" alt="Bracelet" />
      <img src={`${ipfsBaseUrl}/piercing_1.png`} className="absolute inset-0 z-40 w-full h-full object-cover" alt="Piercing" />
      
      {/* BAJU BISA BERUBAH SESUAI PROPS */}
      <img src={`${ipfsBaseUrl}/${clothesFile}.png`} className="absolute inset-0 z-50 w-full h-full object-cover" alt="Clothes" />
      
      <img src={`${ipfsBaseUrl}/hair_1.png`} className="absolute inset-0 z-60 w-full h-full object-cover" alt="Hair" />
    </div>
  );
}
