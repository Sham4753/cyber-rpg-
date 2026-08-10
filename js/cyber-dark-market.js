/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           CYBER DARK MARKET - Black Market v1.0              ║
 * ║           Buy Tools | Sell Data | Upgrade Server             ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

class CyberDarkMarket {
    constructor() {
        // Player inventory
        this.inventory = {
            tools: [],
            serverParts: [],
            currency: 0,
            serverLevel: 1
        };
        
        // Market items
        this.marketItems = [
            { id: 'vpn', name: '🌐 VPN Ghost', desc: 'يخفي أثرك لمدة 30 ثانية', price: 500, type: 'tool', 
              effect: { stealth: 30 }, rarity: 'rare' },
            { id: 'trojan', name: '🐴 حصان طروادة', desc: 'يضاعف قوة هجومك', price: 800, type: 'tool',
              effect: { attackPower: 2 }, rarity: 'epic' },
            { id: 'ddos', name: '💣 قنبلة DDoS', desc: 'يشل سيرفر الخصم 10 ثواني', price: 1200, type: 'tool',
              effect: { stun: 10 }, rarity: 'legendary' },
            { id: 'firewall-up', name: '🛡️ جدار ناري مطور', desc: 'يزيد دفاعك +50%', price: 600, type: 'server',
              effect: { defense: 50 }, rarity: 'rare' },
            { id: 'processor', name: '⚡ معالج كمي', desc: 'يسرع أوامرك 2x', price: 1000, type: 'server',
              effect: { speed: 2 }, rarity: 'epic' },
            { id: 'decryptor', name: '🔮 مفكك تشفير', desc: 'يفك أي تشفير فوراً', price: 2000, type: 'tool',
              effect: { decrypt: true }, rarity: 'legendary' },
            { id: 'backup', name: '💾 نسخة احتياطية', desc: 'يستعيد بياناتك إذا سُرقت', price: 400, type: 'server',
              effect: { restore: true }, rarity: 'common' },
            { id: 'scanner', name: '📡 ماسح ثغرات', desc: 'يكشف نقاط ضعف الخصم', price: 700, type: 'tool',
              effect: { scan: true }, rarity: 'rare' }
        ];
        
        // Stolen loot drops
        this.lootTable = [
            { name: '💿 بيانات سرية', value: 100, chance: 40 },
            { name: '📧 قاعدة إيميلات', value: 250, chance: 25 },
            { name: '🔑 كلمات مرور', value: 500, chance: 15 },
            { name: '💳 بيانات بطاقات', value: 1000, chance: 10 },
            { name: '🗄️ ملفات حكومية', value: 2000, chance: 7 },
            { name: '👑 أسرار الدولة', value: 5000, chance: 3 }
        ];
        
        this.loadInventory();
        this.init();
    }
    
    init() {
        console.log('🛒 Dark Market initialized');
        this.createMarketButton();
    }
    
    loadInventory() {
        const saved = localStorage.getItem('cyber_dark_market');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.inventory = { ...this.inventory, ...data };
            } catch(e) {}
        }
    }
    
    saveInventory() {
        localStorage.setItem('cyber_dark_market', JSON.stringify(this.inventory));
    }
    
    // ═══════════════════════════════════════════════════
    // LOOT SYSTEM
    // ═══════════════════════════════════════════════════
    generateLoot() {
        const roll = Math.random() * 100;
        let cumulative = 0;
        
        for (const loot of this.lootTable) {
            cumulative += loot.chance;
            if (roll <= cumulative) {
                this.inventory.currency += loot.value;
                this.saveInventory();
                return loot;
            }
        }
        
        // Default common loot
        const commonLoot = this.lootTable[0];
        this.inventory.currency += commonLoot.value;
        this.saveInventory();
        return commonLoot;
    }
    
    stealLootFromPlayer(targetName) {
        // Generate 1-3 random loot items
        const numItems = Math.floor(Math.random() * 3) + 1;
        const stolenItems = [];
        
        for (let i = 0; i < numItems; i++) {
            const loot = this.generateLoot();
            stolenItems.push(loot);
        }
        
        return stolenItems;
    }
    
    // ═══════════════════════════════════════════════════
    // MARKET UI
    // ═══════════════════════════════════════════════════
    createMarketButton() {
        const btn = document.createElement('button');
        btn.textContent = '🛒 MARKET';
        btn.title = 'السوق السوداء';
        btn.style.cssText = `
            position: fixed;
            top: 90px;
            right: 50%;
            transform: translateX(50%);
            background: linear-gradient(135deg, #b829dd, #ff2d95);
            color: #fff;
            border: none;
            padding: 12px 25px;
            border-radius: 50px;
            font-weight: 900;
            font-family: monospace;
            font-size: 1rem;
            cursor: pointer;
            z-index: 9997;
            box-shadow: 0 0 20px rgba(184,41,221,0.8);
        `;
        
        btn.addEventListener('click', () => this.openMarket());
        document.body.appendChild(btn);
    }
    
    openMarket() {
        const overlay = document.createElement('div');
        overlay.id = 'market-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: radial-gradient(ellipse at center, #1a0a2e 0%, #0a0a0f 100%);
            z-index: 99999;
            overflow-y: auto;
            font-family: monospace;
            animation: arenaEnter 0.3s ease-out;
        `;
        
        overlay.innerHTML = `
            <div style="max-width:800px; margin:0 auto; padding:20px;">
                <!-- Header -->
                <div style="text-align:center; margin-bottom:20px;">
                    <h1 style="color:#b829dd; font-size:2.5rem; text-shadow:0 0 20px #b829dd;">🛒 السوق السوداء</h1>
                    <p style="color:#ffd700;">💰 رصيدك: ${this.inventory.currency} سيبركوين</p>
                    <button onclick="document.getElementById('market-overlay').remove()"
                        style="position:absolute; top:10px; right:10px; background:transparent; border:2px solid #ff3333; color:#ff3333; padding:10px 20px; border-radius:10px; cursor:pointer;">
                        ✕ إغلاق
                    </button>
                </div>
                
                <!-- Inventory -->
                <div style="background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:20px; margin-bottom:20px;">
                    <h3 style="color:#00ff41; margin-bottom:15px;">🎒 مخزونك</h3>
                    <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:10px;">
                        <div style="text-align:center; padding:10px; background:rgba(0,255,65,0.1); border-radius:10px;">
                            🔧 أدوات: ${this.inventory.tools.length}
                        </div>
                        <div style="text-align:center; padding:10px; background:rgba(0,255,65,0.1); border-radius:10px;">
                            ⚙️ قطع: ${this.inventory.serverParts.length}
                        </div>
                        <div style="text-align:center; padding:10px; background:rgba(0,255,65,0.1); border-radius:10px;">
                            🛡️ مستوى السيرفر: ${this.inventory.serverLevel}
                        </div>
                        <div style="text-align:center; padding:10px; background:rgba(0,255,65,0.1); border-radius:10px;">
                            💰 سيبركوين: ${this.inventory.currency}
                        </div>
                    </div>
                    ${this.inventory.tools.length > 0 ? `
                        <div style="margin-top:15px;">
                            <p style="color:#ffd700;">🔧 أدواتك:</p>
                            ${this.inventory.tools.map(t => `<span style="background:rgba(255,215,0,0.2); padding:5px 10px; border-radius:20px; margin:3px; display:inline-block; font-size:0.8rem;">${t}</span>`).join(' ')}
                        </div>
                    ` : ''}
                </div>
                
                <!-- Market Items -->
                <div style="background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:20px;">
                    <h3 style="color:#ffd700; text-align:center; margin-bottom:20px;">🏪 أدوات للبيع</h3>
                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(250px, 1fr)); gap:15px;">
                        ${this.marketItems.map(item => `
                            <div style="background:rgba(0,0,0,0.3); border:2px solid ${
                                item.rarity === 'legendary' ? '#ffd700' :
                                item.rarity === 'epic' ? '#b829dd' :
                                item.rarity === 'rare' ? '#00d4ff' : '#888'
                            }; border-radius:15px; padding:20px; text-align:center;">
                                <div style="font-size:3rem;">${item.name.split(' ')[0]}</div>
                                <h4 style="color:${
                                    item.rarity === 'legendary' ? '#ffd700' :
                                    item.rarity === 'epic' ? '#b829dd' :
                                    item.rarity === 'rare' ? '#00d4ff' : '#fff'
                                };">${item.name}</h4>
                                <p style="color:#aaa; font-size:0.8rem; margin:10px 0;">${item.desc}</p>
                                <span style="background:rgba(255,215,0,0.2); padding:3px 10px; border-radius:20px; font-size:0.7rem;">
                                    ${item.rarity.toUpperCase()}
                                </span>
                                <p style="color:#ffd700; font-size:1.2rem; margin:10px 0;">💰 ${item.price}</p>
                                <button onclick="window.CyberDarkMarket.buyItem('${item.id}')"
                                    style="width:100%; background:linear-gradient(135deg, #b829dd, #ff2d95); color:#fff; border:none; padding:10px; border-radius:10px; cursor:pointer; font-weight:bold;"
                                    ${this.inventory.currency >= item.price ? '' : 'disabled'}>
                                    ${this.inventory.currency >= item.price ? '🛒 شراء' : '🔒 رصيد غير كافي'}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
    }
    
    buyItem(itemId) {
        const item = this.marketItems.find(i => i.id === itemId);
        if (!item) return;
        
        if (this.inventory.currency < item.price) {
            alert('❌ رصيد غير كافي!');
            return;
        }
        
        this.inventory.currency -= item.price;
        
        if (item.type === 'tool') {
            this.inventory.tools.push(item.name);
        } else if (item.type === 'server') {
            this.inventory.serverParts.push(item.name);
            this.inventory.serverLevel++;
        }
        
        this.saveInventory();
        
        // Visual effect
        if (window.CyberMind) {
            window.CyberMind.showVisualEffect('loot');
            window.CyberMind.showFloatingMessage(`✅ تم شراء ${item.name}!`);
        }
        
        // Refresh
        document.getElementById('market-overlay').remove();
        this.openMarket();
    }
    
    useTool(toolName) {
        const index = this.inventory.tools.indexOf(toolName);
        if (index > -1) {
            this.inventory.tools.splice(index, 1);
            this.saveInventory();
            return true;
        }
        return false;
    }
    
    getServerBonus() {
        return {
            defense: this.inventory.serverParts.filter(p => p.includes('جدار')).length * 50,
            speed: this.inventory.serverParts.filter(p => p.includes('معالج')).length * 2
        };
    }
}

// CSS
const marketStyle = document.createElement('style');
marketStyle.textContent = `
    @keyframes arenaEnter {
        0% { opacity: 0; transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(marketStyle);

// Initialize
window.CyberDarkMarket = new CyberDarkMarket();
console.log('🛒 Dark Market ready');
