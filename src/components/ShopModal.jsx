import { useState } from 'react';
import { itemDB, rarityColors } from '../data/items';
import CharacterPreview from './CharacterPreview'; // <-- Import baru

export default function ShopModal({ gameState, updateGameState, showToast, onClose }) {
    const [subTab, setSubTab] = useState('clothes');

    const handleBuyItem = (itemName) => {
        const item = itemDB[itemName];
        
        // 1. Cek apakah sudah punya
        if (gameState.inventory[item.category].includes(itemName)) {
            showToast(`You already own ${itemName}!`);
            return;
        }
        
        // 2. Cek apakah uang cukup
        if (gameState.player.babes >= item.price) {
            // Potong saldo
            updateGameState('player', { babes: gameState.player.babes - item.price });
            
            // Tambahkan item ke inventory (menggabungkan isi tas lama dengan item baru)
            const updatedCategory = [...gameState.inventory[item.category], itemName];
            updateGameState('inventory', { [item.category]: updatedCategory });
            
            // Update statistik & XP (Dapat 25 XP tiap belanja)
            updateGameState('stats', { itemsOwned: gameState.stats.itemsOwned + 1 });
            updateGameState('player', { xp: gameState.player.xp + 25 });
            updateGameState('quests', { itemBought: true }); // Selesaikan quest harian
            
            showToast(`Purchased ${item.rarity} ${itemName}! +25 XP`);
        } else {
            showToast("Not enough $babes!");
        }
    };

    const renderShopItems = (category) => {
        return Object.keys(itemDB).map(itemName => {
            const item = itemDB[itemName];
            if (item.category === category && item.price > 0) {
                const color = rarityColors[item.rarity];
                return (
                    <div key={itemName} className="item-square" style={{ borderColor: color }} onClick={() => handleBuyItem(itemName)}>
                        <div className="rarity-badge" style={{ background: color }}>{item.rarity}</div>
                        <span>{itemName}</span>
                        <span className="item-price" style={{ color: color }}>{item.price} $babes</span>
                    </div>
                );
            }
            return null;
        });
    };

    return (
        <div className="babes-modal" style={{ display: 'flex', opacity: 1, top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1)' }}>
            <div className="modal-header">
                <h3 className="modal-title">THE SHOP // MARKETPLACE</h3>
                <div className="close-modal" onClick={onClose}>X</div>
            </div>
            
            <div className="modal-body" style={{ flexDirection: 'column' }}>
                <div style={{ textAlign: 'center', marginBottom: '10px', fontWeight: 800, color: 'var(--powder-pink)', fontSize: '18px' }}>
                    YOUR BALANCE: <span>{gameState.player.babes}</span> $babes
                </div>
                
                {/* INI BAGIAN BARU: Menampilkan Pinata di Shop agar pemain bisa ngaca */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <CharacterPreview currentClothes={gameState.equipped.clothes} />
                </div>
                
                <div className="tab-container" style={{ maxWidth: '600px', margin: '0 auto 20px auto' }}>
                    <button className={`tab-btn ${subTab === 'clothes' ? 'active' : ''}`} onClick={() => setSubTab('clothes')}>BIKINIS</button>
                    <button className={`tab-btn ${subTab === 'accessories' ? 'active' : ''}`} onClick={() => setSubTab('accessories')}>TATTOOS</button>
                    <button className={`tab-btn ${subTab === 'glasses' ? 'active' : ''}`} onClick={() => setSubTab('glasses')}>GLASSES</button>
                </div>
                
                <div className="modal-section" style={{ flex: 1, overflowY: 'auto' }}>
                    <div className="item-grid">
                        {renderShopItems(subTab)}
                    </div>
                </div>
            </div>
        </div>
    );
}
