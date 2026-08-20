import React, { useState } from 'react';

export default function CharacterPreview() {
  // Nanti ganti tulisan CID_IMAGES_ANDA dengan kode CID asli dari Pinata
  const ipfsBaseUrl = "https://gateway.pinata.cloud/ipfs/bafybeieksckbp7kmwgedsjvlgqrqvm57qqwgu3nykch6dkrhi724ysk3qu";

  // State MANDIRI hanya untuk uji coba tombol di bawah
  const [equippedClothes, setEquippedClothes] = useState('cloth_default'); 

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      
      {/* RUANG GANTI (Susunan layer berurutan dari bawah ke atas) */}
      <div className="relative w-80 h-80 bg-black rounded-lg overflow-hidden border-2 border-gray-500 shadow-xl">
        
        {/* 1. LAYER BG (Z-0) */}
        <img src={`${ipfsBaseUrl}/bg_1.png`} className="absolute inset-0 z-0 w-full h-full object-cover" alt="Background" />

        {/* 2. LAYER BODY (Z-10) */}
        <img src={`${ipfsBaseUrl}/body_1.png`} className="absolute inset-0 z-10 w-full h-full object-cover" alt="Body" />

        {/* 3. LAYER EYE (Z-20) */}
        <img src={`${ipfsBaseUrl}/eye_1.png`} className="absolute inset-0 z-20 w-full h-full object-cover" alt="Eye" />

        {/* 4. LAYER BRACELET (Z-30) */}
        <img src={`${ipfsBaseUrl}/bracelet_1.png`} className="absolute inset-0 z-30 w-full h-full object-cover" alt="Bracelet" />

        {/* 5. LAYER PIERCING (Z-40) */}
        <img src={`${ipfsBaseUrl}/piercing_1.png`} className="absolute inset-0 z-40 w-full h-full object-cover" alt="Piercing" />

        {/* 6. LAYER BAJU (Z-50) - Ini yang dinamis berubah! */}
        <img 
          src={`${ipfsBaseUrl}/${equippedClothes}.png`} 
          className="absolute inset-0 z-50 w-full h-full object-cover" 
          alt="Clothes" 
        />

        {/* 7. LAYER HAIR (Z-60) - Rambut aman di posisi paling atas */}
        <img src={`${ipfsBaseUrl}/hair_1.png`} className="absolute inset-0 z-60 w-full h-full object-cover" alt="Hair" />

      </div>

      {/* TOMBOL UJI COBA (Hanya mengubah gambar baju di atas) */}
      <div className="flex gap-2">
        <button 
          onClick={() => setEquippedClothes('cloth_default')}
          className="px-4 py-2 bg-gray-600 text-white rounded font-bold"
        >
          Pakai Default
        </button>
        <button 
          onClick={() => setEquippedClothes('shop_1')}
          className="px-4 py-2 bg-red-600 text-white rounded font-bold"
        >
          Pakai Shop 1
        </button>
        <button 
          onClick={() => setEquippedClothes('shop_2')}
          className="px-4 py-2 bg-blue-600 text-white rounded font-bold"
        >
          Pakai Shop 2
        </button>
      </div>

    </div>
  );
}
