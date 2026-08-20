import React, { useState } from 'react';

export default function CharacterPreview() {
  // Ganti tulisan CID_IMAGES_ANDA dengan kode CID asli dari Pinata
  const ipfsBaseUrl = "https://gateway.pinata.cloud/ipfs/bafybeieksckbp7kmwgedsjvlgqrqvm57qqwgu3nykch6dkrhi724ysk3qu";

  // State untuk mendeteksi baju yang sedang dipakai
  const [equippedClothes, setEquippedClothes] = useState(null); 

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      
      {/* KOTAK KARAKTER (DRESSING ROOM) */}
      <div className="relative w-80 h-80 bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-xl">
        {/* Layer 0: Background */}
        <img src={`${ipfsBaseUrl}/bg_1.png`} className="absolute inset-0 z-0 w-full h-full object-cover" alt="Background" />

        {/* Layer 1: Body */}
        <img src={`${ipfsBaseUrl}/body_1.png`} className="absolute inset-0 z-10 w-full h-full object-cover" alt="Body" />

        {/* Layer 2: Eyes */}
        <img src={`${ipfsBaseUrl}/eye_1.png`} className="absolute inset-0 z-20 w-full h-full object-cover" alt="Eyes" />

        {/* Layer 3: Bracelet */}
        <img src={`${ipfsBaseUrl}/bracelet_1.png`} className="absolute inset-0 z-30 w-full h-full object-cover" alt="Bracelet" />

        {/* Layer 4: Piercing */}
        <img src={`${ipfsBaseUrl}/piercing_1.png`} className="absolute inset-0 z-40 w-full h-full object-cover" alt="Piercing" />

        {/* Layer 5: BAJU (Dinamis) */}
        <img 
          src={`${ipfsBaseUrl}/${equippedClothes ? equippedClothes : 'cloth_default'}.png`} 
          className="absolute inset-0 z-50 w-full h-full object-cover" 
          alt="Clothes" 
        />

        {/* Layer 6: Hair (Paling Atas) */}
        <img src={`${ipfsBaseUrl}/hair_1.png`} className="absolute inset-0 z-60 w-full h-full object-cover" alt="Hair" />
      </div>

      {/* TOMBOL SIMULASI UJI COBA DI BAWAHNYA */}
      <div className="flex gap-4">
        <button 
          onClick={() => setEquippedClothes(null)}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition"
        >
          Lepas Baju (Default)
        </button>
        <button 
          onClick={() => setEquippedClothes('shop_1')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
        >
          Pakai Shop 1
        </button>
        <button 
          onClick={() => setEquippedClothes('shop_2')}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition"
        >
          Pakai Shop 2
        </button>
      </div>

    </div>
  );
}
