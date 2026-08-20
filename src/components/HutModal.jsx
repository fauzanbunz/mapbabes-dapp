import { useState } from 'react';
import { itemDB, rarityColors } from '../data/items';
import CharacterPreview from './CharacterPreview';

export default function HutModal({ gameState, updateGameState, showToast, onClose }) {
    const [mainTab, setMainTab] = useState('wardrobe');
    const [subTab, setSubTab] = useState('clothes');
    const [nameInput, setNameInput] = useState('');

    const IPFS_BASE = "https://gateway.pinata.cloud/ipfs/bafybeieksckbp7kmwgedsjvlgqrqvm57qqwgu3nykch6dkrhi724ysk3qu";

    const getFileName = (itemName) => {
        if (itemName === 'Red Bikini') return 'shop_1';
        if (itemName === 'Neon Bikini') return 'shop_2';
        if (itemName === 'Baju Shop 1') return 'shop_1';
        if (itemName === 'Baju Shop 2') return 'shop_2';
        if (itemName === 'Baju Shop 3') return 'shop_3';
        if (itemName === 'Baju Shop 4') return 'shop_4';
        if (itemName === 'Baju Shop 5') return 'shop_5';
        if (itemName === 'Baju Shop 6') return 'shop_6';
        if (itemName === 'Baju Shop 7') return 'shop_7';
        if (itemName === 'Baju Shop 8') return 'shop_8';
        if (itemName === 'Baju Shop 9') return 'shop_9';
        if (itemName === 'Baju Shop 10') return 'shop_10';
        return 'cloth_default';
    };

    const handleSaveName = () => {
        if (nameInput.trim() !== "") {
            updateGameState('player', { name: nameInput });
            showToast("Profile name saved!");
            setNameInput('');
        }
    };

    const handleClaimDaily = () => {
        if (gameState.quests.dailyClaimed) {
            showToast("You already claimed today!"); 
            return;
        }
        updateGameState('player', { babes: gameState.player.babes + 25, xp: gameState.player.xp + 10 });
        updateGameState('stats', { babesEarned: gameState.stats.babesEarned + 25 });
        updateGameState('quests', { dailyClaimed: true });
        showToast("Claimed: +25 $babes & +10 XP");
    };

    const handleEquip = (itemName, category) => {
        updateGameState('equipped', { [category]: itemName });
        updateGameState('quests', { outfitChanged: true });
        showToast(`Equipped: ${itemName}`);
    };

    const renderInventory = (cat) => {
        if (gameState.inventory[cat].length === 0) {
            return <div className="item-square" style={{ opacity: 0.5 }}>Empty</div>;
        }
        return gameState.inventory[cat].map(itemName => {
            const item = itemDB[itemName];
            const isEquipped = gameState.equipped[cat] === itemName;
            const borderColor = isEquipped ? 'var(--pale-marigold)' : rarityColors[item?.rarity || 'Common'];
            const bgStyle = isEquipped ? 'rgba(241, 187, 88, 0.2)' : '';

            return (
                <div key={itemName} className="item-square" onClick={() => handleEquip(itemName, cat)} style={{ borderColor, background: bgStyle, display: 'flex', flexDirection: 'column', padding: '10px' }}>
                    {item && <div className="rarity-badge" style={{ background: rarityColors[item.rarity], top: '-5px', right: '-5px', left: 'auto', zIndex: 2 }}>{item.rarity}</div>}
                    
                    {/* WADAH GAMBAR BACKGROUND ABU-ABU */}
                    <div style={{ flex: 1, width: '100%', minHeight: '150px', backgroundColor: '#e2e8f0', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px', overflow: 'hidden' }}>
                        {item && item.category === 'clothes' ? (
                            <img 
                                src={`${IPFS_BASE}/${getFileName(itemName)}.png`} 
                                style={{ width: '100%', height: '100%', maxHeight: '150px', objectFit: 'contain' }} 
                                alt={itemName} 
                            />
                        ) : (
                            <span style={{ color: '#94a3b8' }}>Item Preview</span>
                        )}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                        <span style={{ fontWeight: 'bold', display: 'block' }}>{itemName}</span>
                        <span style={{ fontSize: '10px', marginTop: '5px', color: isEquipped ? 'var(--pale-marigold)' : 'var(--lake-blue)', display: 'block' }}>
                            {isEquipped ? '(EQUIPPED)' : '(Equip)'}
                        </span>
                    </div>
                </div>
            );
        });
    };

    const badges = [
        { id: 'welcome', name: 'Welcome to the Hood', desc: 'Joined Babes Island', icon: '🏝️', done: true },
        { id: 'itemBought', name: 'First Purchase', desc: 'Buy an item at The Shop', icon: '🛍️', done: gameState.quests.itemBought },
        { id: 'visitedCafe', name: 'Cafe Regular', desc: 'Visit the Cafe', icon: '☕', done: gameState.quests.visitedCafe },
        { id: 'contestJoined', name: 'Contestant', desc: 'Join the Weekly Contest', icon: '✨', done: gameState.quests.contestJoined }
    ];

    return (
        <div className="babes-modal" style={{ display: 'flex', opacity: 1, top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1)' }}>
            <div className="modal-header">
                <h3 className="modal-title">THE HUT // PLAYER HOME</h3>
                <div className="close-modal" onClick={onClose}>X</div>
            </div>
            <div className="modal-body">
                {/* PANEL KIRI: Player Card */}
                <div className="col-left" style={{ flex: 0.8 }}>
                    <div className="modal-section" style={{ flex: 1 }}>
                        <h4 className="section-title">PLAYER CARD</h4>
                        <div className="nft-large" style={{ padding: 0, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CharacterPreview currentClothes={gameState.equipped.clothes} />
                        </div>
                        <div style={{ display: 'flex', gap: '5px', marginBottom: '15px', marginTop: '15px' }}>
                            <input type="text" className="input-text" style={{ marginBottom: 0 }} placeholder="Change name..." value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                            <button className="btn btn-pink" onClick={handleSaveName} style={{ width: 'auto', marginBottom: 0, padding: '10px' }}>SAVE</button>
                        </div>
                        <div style={{ fontSize: '13px', lineHeight: 2, color: 'var(--lake-blue)', background: 'rgba(152, 205, 204, 0.1)', padding: '15px', borderRadius: '12px', marginBottom: '20px' }}>
                            <div><strong>LEVEL:</strong> {gameState.player.level}</div>
                            <div><strong>XP:</strong> {gameState.player.xp} / 1000</div>
                            <div><strong>REP:</strong> {gameState.player.reputation}</div>
                        </div>
                        <button className="btn btn-gold" onClick={handleClaimDaily} style={{ opacity: gameState.quests.dailyClaimed ? 0.5 : 1 }}>
                            {gameState.quests.dailyClaimed ? 'CLAIMED ✓' : 'CLAIM DAILY REWARD'}
                        </button>
                    </div>
                </div>

                {/* PANEL KANAN */}
                <div className="col-right" style={{ flex: 1.2 }}>
                    <div className="modal-section" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div className="tab-container">
                            <button className={`tab-btn ${mainTab === 'wardrobe' ? 'active' : ''}`} onClick={() => setMainTab('wardrobe')}>WARDROBE</button>
                            <button className={`tab-btn ${mainTab === 'stats' ? 'active' : ''}`} onClick={() => setMainTab('stats')}>STATS</button>
                            <button className={`tab-btn ${mainTab === 'achievements' ? 'active' : ''}`} onClick={() => setMainTab('achievements')}>BADGES</button>
                        </div>

                        {mainTab === 'wardrobe' && (
                            <div style={{ display: 'block', flex: 1, overflowY: 'auto' }}>
                                <div className="tab-container" style={{ marginBottom: '10px' }}>
                                    <button className={`tab-btn ${subTab === 'clothes' ? 'active' : ''}`} style={{ fontSize: '10px', padding: '10px' }} onClick={() => setSubTab('clothes')}>CLOTHES</button>
                                    <button className={`tab-btn ${subTab === 'accessories' ? 'active' : ''}`} style={{ fontSize: '10px', padding: '10px' }} onClick={() => setSubTab('accessories')}>ACCESSORIES</button>
                                    <button className={`tab-btn ${subTab === 'glasses' ? 'active' : ''}`} style={{ fontSize: '10px', padding: '10px' }} onClick={() => setSubTab('glasses')}>GLASSES</button>
                                </div>
                                <div className="item-grid">{renderInventory(subTab)}</div>
                            </div>
                        )}

                        {mainTab === 'stats' && (
                            <div style={{ display: 'block', flex: 1, overflowY: 'auto' }}>
                                <h4 className="section-title">LIFETIME STATS</h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', lineHeight: 2.8, color: 'var(--lake-blue)', fontWeight: 800 }}>
                                    <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px dashed var(--vanilla-cream)' }}><span>$BABES Earned:</span> <span style={{ color: 'var(--powder-pink)' }}>{gameState.stats.babesEarned}</span></li>
                                    <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px dashed var(--vanilla-cream)' }}><span>Items Owned:</span> <span style={{ color: 'var(--powder-pink)' }}>{gameState.stats.itemsOwned}</span></li>
                                </ul>
                            </div>
                        )}

                        {mainTab === 'achievements' && (
                            <div style={{ display: 'block', flex: 1, overflowY: 'auto' }}>
                                <h4 className="section-title">ACHIEVEMENTS</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {badges.map(b => (
                                        <div key={b.id} className={`quest-item ${b.done ? 'quest-done' : ''}`}>
                                            <div>
                                                <div style={{ fontWeight: 800, fontSize: '12px' }}>{b.name}</div>
                                                <div style={{ fontSize: '10px', color: '#aaa' }}>{b.desc}</div>
                                            </div>
                                            <div style={{ fontSize: '16px' }}>{b.done ? b.icon : '🔒'}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
