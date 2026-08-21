"use client";
import { useState, useEffect } from "react";
import HutModal from "../components/HutModal";
import ShopModal from "../components/ShopModal";
import CafeModal from "../components/CafeModal";
import ClubModal from "../components/ClubModal";
import GuardModal from "../components/GuardModal"; // <-- Import baru
import QuestModal from "../components/QuestModal"; // <-- Import baru
import MusicHUD from '../components/MusicHUD';

const defaultState = {
    player: { name: "Babes #001", level: 1, xp: 0, babes: 1000, eth: 0.5, reputation: "Island Tourist" },
    inventory: { clothes: ['Red Bikini'], accessories: ['Belly Piercing'], glasses: ['Blue Eyes'] },
    equipped: { clothes: 'Red Bikini', accessories: 'Belly Piercing', glasses: 'Blue Eyes' },
    quests: { dailyClaimed: false, chatted: false, itemBought: false, voted: false, contestJoined: false, outfitChanged: false, visitedCafe: false },
    stats: { babesEarned: 1000, itemsOwned: 3 }
};

export default function BabesMap() {
    const [gameState, setGameState] = useState(defaultState);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeModal, setActiveModal] = useState(null); 
    const [toastMsg, setToastMsg] = useState('');

    useEffect(() => {
        const savedState = JSON.parse(localStorage.getItem('babesGameState'));
        if (savedState) {
            setGameState({
                player: { ...defaultState.player, ...savedState.player },
                inventory: { ...defaultState.inventory, ...savedState.inventory },
                equipped: { ...defaultState.equipped, ...savedState.equipped },
                quests: { ...defaultState.quests, ...(savedState.quests || {}) },
                stats: { ...defaultState.stats, ...(savedState.stats || {}) }
            });
        }
        setIsLoaded(true);
    }, []);

    const updateGameState = (section, data) => {
        setGameState(prev => {
            const newState = { ...prev, [section]: { ...prev[section], ...data } };
            
            if (section === 'player' && data.xp) {
                while(newState.player.xp >= 1000) {
                    newState.player.level += 1;
                    newState.player.xp -= 1000;
                    showToast(`LEVEL UP! You are now Level ${newState.player.level} 🎉`);
                }
            }
            localStorage.setItem('babesGameState', JSON.stringify(newState));
            return newState;
        });
    };

    let toastTimeout;
    const showToast = (msg) => {
        setToastMsg(msg);
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => setToastMsg(''), 3000);
    };

    if (!isLoaded) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading Babes Island...</div>;

    const xpPercent = (gameState.player.xp / 1000) * 100;
    // Hitung berapa quest yang sudah selesai untuk ditampilkan di tombol Quests
    const completedQuestsCount = Object.values(gameState.quests).filter(Boolean).length;

    return (
        <>
            <div id="game-toast" style={{ transform: toastMsg ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(100px)', opacity: toastMsg ? 1 : 0 }}>
                {toastMsg}
            </div>

            <div id="map-container">
                <img id="map-frame" src="/frame2.webp" alt="Map Frame" />
                <div className="marquee-wrapper">
                    <div className="marquee-content"><span>BABES IN THE HOOD</span><span>BABES IN THE HOOD</span><span>BABES IN THE HOOD</span></div>
                    <div className="marquee-content"><span>BABES IN THE HOOD</span><span>BABES IN THE HOOD</span><span>BABES IN THE HOOD</span></div>
                </div>
                <img id="map-logo" src="/logo babes.svg" alt="Babes Logo" />

                <div className="hud-profile">
                    <div className="hud-avatar">BABE<br/><span style={{ fontSize: '5px', marginTop: '2px' }}>{gameState.equipped.clothes.split(' ')[0]}</span></div>
                    <div className="hud-info">
                        <div className="hud-name">{gameState.player.name}</div>
                        <div className="hud-xp-container"><span>LV. {gameState.player.level}</span><span>{gameState.player.xp}/1000 XP</span></div>
                        <div className="hud-xp-bar-bg"><div className="hud-xp-bar-fill" style={{ width: `${xpPercent}%` }}></div></div>
                        <div className="hud-balance">🪙 {gameState.player.babes} $babes</div>
                    </div>
                </div>

                {/* TOMBOL QUESTS KINI AKTIF! */}
                <div className="hud-quests" onClick={() => setActiveModal('quests')}>
                    📋 QUESTS ({completedQuestsCount}/5)
                </div>

                <img id="map-image" src="/map-babes.webp" alt="Babes Island Map" />
                <img id="airplane" src="/plane.webp" alt="Flying Plane" />
                
                <div className="building-label" style={{ left: '46%', top: '59%' }} onClick={() => setActiveModal('shop')}>THE SHOP</div>
                <div className="building-label" style={{ left: '60%', top: '46%' }} onClick={() => setActiveModal('cafe')}>THE CAFE</div>
                <div className="building-label" style={{ left: '77%', top: '24%' }} onClick={() => setActiveModal('club')}>BABES CLUB</div>
                <div className="building-label" style={{ left: '54%', top: '64%' }} onClick={() => setActiveModal('guard')}>GUARD TOWER</div>
                <div className="building-label" style={{ left: '84%', top: '35%' }} onClick={() => setActiveModal('hut')}>THE HUT</div>
            </div>

            {/* OVERLAY & MODAL RENDERER */}
            {activeModal && <div id="modal-overlay" style={{ display: 'block', opacity: 1 }} onClick={() => setActiveModal(null)}></div>}
            
            {activeModal === 'hut' && <HutModal gameState={gameState} updateGameState={updateGameState} showToast={showToast} onClose={() => setActiveModal(null)} />}
            {activeModal === 'shop' && <ShopModal gameState={gameState} updateGameState={updateGameState} showToast={showToast} onClose={() => setActiveModal(null)} />}
            {activeModal === 'cafe' && <CafeModal gameState={gameState} updateGameState={updateGameState} showToast={showToast} onClose={() => setActiveModal(null)} />}
            {activeModal === 'club' && <ClubModal gameState={gameState} updateGameState={updateGameState} showToast={showToast} onClose={() => setActiveModal(null)} />}
            
            {/* RENDER MODAL BARU */}
            {activeModal === 'guard' && <GuardModal showToast={showToast} onClose={() => setActiveModal(null)} />}
            {activeModal === 'quests' && <QuestModal gameState={gameState} onClose={() => setActiveModal(null)} />}
                <MusicHUD />
        </>
    );
}
