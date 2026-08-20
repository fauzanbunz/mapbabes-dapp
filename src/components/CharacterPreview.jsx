import React from 'react';

export default function CharacterPreview({ currentClothes }) {
  // GANTI INI DENGAN CID FOLDER PINATA ANDA NANTI
  const ipfsBaseUrl = "https://gateway.pinata.cloud/ipfs/bafybeieksckbp7kmwgedsjvlgqrqvm57qqwgu3nykch6dkrhi724ysk3qu";

  // Memetakan nama item di game dengan nama file di Pinata
  let clothesFile = 'cloth_default'; // Baju bawaan
  
  if (currentClothes === 'Red Bikini') {
      clothesFile = 'shop_1'; 
  } else if (currentClothes === 'Black Leather') {
      clothesFile = 'shop_2'; 
  }
  // Tambahkan Else-If lain jika ada baju tambahan

  // --- KUMPULAN GAYA CSS MURNI AGAR TIDAK MERUSAK LAYOUT ---
  
  const containerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '280px', // Membatasi ukuran maksimal agar tidak membesar
    aspectRatio: '1 / 1', // Memastikan bentuknya selalu kotak presisi
    margin: '0 auto',
    backgroundColor: '#111',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '2px solid var(--powder-pink)', // Menggunakan warna tema Anda
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
