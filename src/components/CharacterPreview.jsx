import React from 'react';

export default function CharacterPreview({ currentClothes }) {
  // CID Pinata Anda sudah benar
  const ipfsBaseUrl = "https://gateway.pinata.cloud/ipfs/bafybeieksckbp7kmwgedsjvlgqrqvm57qqwgu3nykch6dkrhi724ysk3qu";

  // Deklarasikan HANYA SATU KALI di sini
  let clothesFile = 'cloth_default'; 
  
  // Gabungan pemetaan baju lama dan baru
  if (currentClothes === 'Red Bikini') clothesFile = 'shop_1'; 
  if (currentClothes === 'Black Leather') clothesFile = 'shop_2'; // Jika ini baju lama, pastikan gambarnya ada
  if (currentClothes === 'Neon Bikini') clothesFile = 'shop_2'; // Perhatikan: ini menimpa file shop_2. Pastikan file gambarnya benar

  // 10 Baju Baru 
  if (currentClothes === 'Baju Shop 1') clothesFile = 'shop_1';
  if (currentClothes === 'Baju Shop 2') clothesFile = 'shop_2';
  if (currentClothes === 'Baju Shop 3') clothesFile = 'shop_3';
  if (currentClothes === 'Baju Shop 4') clothesFile = 'shop_4';
  if (currentClothes === 'Baju Shop 5') clothesFile = 'shop_5';
  if (currentClothes === 'Baju Shop 6') clothesFile = 'shop_6';
  if (currentClothes === 'Baju Shop 7') clothesFile = 'shop_7';
  if (currentClothes === 'Baju Shop 8') clothesFile = 'shop_8';
  if (currentClothes === 'Baju Shop 9') clothesFile = 'shop_9';
  if (currentClothes === 'Baju Shop 10') clothesFile = 'shop_10';

  // --- KUMPULAN GAYA CSS MURNI ---
  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%', 
    aspectRatio: '1 / 1',
    backgroundColor: '#111', 
    overflow: 'hidden',
    boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
  };

  const layerStyle = (zIndex) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: zIndex
  });

  return (
    <div style={containerStyle}>
        <img src={`${ipfsBaseUrl}/bg_1.png`} style={layerStyle(0)} alt="Background" />
        <img src={`${ipfsBaseUrl}/body_1.png`} style={layerStyle(10)} alt="Body" />
        <img src={`${ipfsBaseUrl}/eye_1.png`} style={layerStyle(20)} alt="Eye" />
        <img src={`${ipfsBaseUrl}/bracelet_1.png`} style={layerStyle(30)} alt="Bracelet" />
        <img src={`${ipfsBaseUrl}/piercing_1.png`} style={layerStyle(40)} alt="Piercing" />
        
        {/* LAYER BAJU BERUBAH OTOMATIS */}
        <img src={`${ipfsBaseUrl}/${clothesFile}.png`} style={layerStyle(50)} alt="Clothes" />
        
        <img src={`${ipfsBaseUrl}/hair_1.png`} style={layerStyle(60)} alt="Hair" />
    </div>
  );
}
