import React from 'react';

// Sekarang komponen ini menerima 'equippedState' dari luar (dari page.js / HutModal)
export default function CharacterPreview({ equippedState }) {
  const ipfsBaseUrl = "https://gateway.pinata.cloud/ipfs/CID_IMAGES_ANDA";

  // Kita ubah logika pembacaan bajunya agar sesuai dengan nama di gameState Anda
  // Misalnya: jika 'Red Bikini', pakai gambar 'shop_1.png'. Jika kosong, pakai 'cloth_default.png'
  let clothesImage = 'cloth_default';
  if (equippedState?.clothes === 'Red Bikini') clothesImage = 'shop_1';
  if (equippedState?.clothes === 'Black Leather') clothesImage = 'shop_2';

  return (
    <div className="relative w-64 h-64 mx-auto bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-xl">
      <img src={`${ipfsBaseUrl}/bg_1.png`} className="absolute inset-0 z-0 w-full h-full object-cover" alt="Background" />
      <img src={`${ipfsBaseUrl}/body_1.png`} className="absolute inset-0 z-10 w-full h-full object-cover" alt="Body" />
      <img src={`${ipfsBaseUrl}/eye_1.png`} className="absolute inset-0 z-20 w-full h-full object-cover" alt="Eyes" />
      <img src={`${ipfsBaseUrl}/bracelet_1.png`} className="absolute inset-0 z-30 w-full h-full object-cover" alt="Bracelet" />
      <img src={`${ipfsBaseUrl}/piercing_1.png`} className="absolute inset-0 z-40 w-full h-full object-cover" alt="Piercing" />
      
      {/* LAYER BAJU DINAMIS MEMBACA DARI STATE */}
      <img 
        src={`${ipfsBaseUrl}/${clothesImage}.png`} 
        className="absolute inset-0 z-50 w-full h-full object-cover" 
        alt="Clothes" 
      />
      
      <img src={`${ipfsBaseUrl}/hair_1.png`} className="absolute inset-0 z-60 w-full h-full object-cover" alt="Hair" />
    </div>
  );
}
