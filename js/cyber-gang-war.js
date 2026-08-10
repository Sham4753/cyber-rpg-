/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           CYBER GANG WAR - PvP Arena v1.0                    ║
 * ║           Arab Cities Cyber Warfare                           ║
 * ║           Steal | Defend | Dominate                           ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

class CyberGangWar {
    constructor() {
        this.gangs = [
            { id: 'baghdad', name: '🐺 عصابة بغداد', color: '#00ff41', members: [], score: 0 },
            { id: 'riyadh', name: '🦅 عصابة الرياض', color: '#00d4ff', members: [], score: 0 },
            { id: 'cairo', name: '🦂 عصابة القاهرة', color: '#ffd700', members: [], score: 0 },
            { id: 'dubai', name: '🐪 عصابة دبي', color: '#ff2d95', members: [], score: 0 },
            { id: 'casablanca', name: '🦈 عصابة الدار البيضاء', color: '#b829dd', members: [], score: 0 }
        ];
        
        this.player = {
            id: 'player_' + Math.random().toString(36).substr(2, 9),
            name: 'Anonymous',
            gang: null,
            server: {
                hp: 100,
                firewall: 1,
                data: 1000,
                flags: [],
                defenseActive: false
            },
            attacks: [],
            stolenData: 0,
            rank: 'Script Kiddie'
        };
        
        this.onlinePlayers = [];
        this.attackInProgress = null;
        this.defenseActive = false;
        this.arenaOpen = false;
        
        // Taunt messages for viral clips
        this.taunts = {
            win: [
                '💀 سيرفرك صار لي! تعلم تحمي نفسك!',
                '🔥 ولا حتى جدار ناري عندك! سهل جداً!',
                '😂 حاولت تفك السيرفر كأنك تفتح علبة تونة!',
                '👻 شبح الهاكرز ضرب مرة تانية!',
                '🏆 بطاقة دعوة: تعال أتحداك تاخذ بياناتك!'
            ],
            lose: [
                '🤡 ارجع تعلم Linux الأول!',
                '🍼 روح العب سباق سيارات أحسنلك!',
                '💤 جدارك الناري ورق! استعد المرة الجاية!',
                '🎭 أداءك ضعيف... زي كلمة سر 123456!',
                '🧸 حتى البيبي هاكر أقوى منك!'
            ]
        };
        
        this.init();
    }
    
    init() {
        console.log('⚔️ Cyber Gang War initialized');
        this.createArenaButton();
        this.startAutoDefense();
    }
    
    // ═══════════════════════════════════════════════════
    // ARENA UI
    // ═══════════════════════════════════════════════════
    createArenaButton() {
        const btn = document.createElement('button');
        btn.textContent = '⚔️ ARENA';
        btn.title = 'Cyber Gang War - ساحة المعركة';
        btn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 50%;
            transform: translateX(50%);
            background: linear-gradient(135deg, #ff2d95, #ff3333);
            color: #fff;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-weight: 900;
            font-family: monospace;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 9998;
            box-shadow: 0 0 30px rgba(255,45,149,0.8);
            animation: arenaGlow 1.5s infinite;
        `;
        
        btn.addEventListener('click', () => this.openArena());
        document.body.appendChild(btn);
    }
    
    openArena() {
        this.arenaOpen = true;
        
        const overlay = document.createElement('div');
        overlay.id = 'arena-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: radial-gradient(ellipse at center, #0d0d2b 0%, #0a0a0f 100%);
            z-index: 99999;
            overflow-y: auto;
            font-family: monospace;
            animation: arenaEnter 0.5s ease-out;
        `;
        
        overlay.innerHTML = `
            <div style="max-width:100%; margin:0 auto; padding:20px;">
                <!-- Header -->
                <div style="text-align:center; margin-bottom:30px;">
                    <h1 style="font-size:3rem; color:#ff2d95; text-shadow:0 0 20px #ff2d95; animation:glowPulse 1s infinite;">
                        ⚔️ CYBER GANG WAR
                    </h1>
                    <p style="color:#ffd700; font-size:1.2rem;">حرب العصابات السيبرانية - من سيد الهاكرز العرب؟</p>
                    <button onclick="document.getElementById('arena-overlay').remove(); window.CyberGangWar.arenaOpen=false;"
                        style="position:absolute; top:10px; right:10px; background:transparent; border:2px solid #ff3333; color:#ff3333; padding:10px 20px; border-radius:10px; cursor:pointer;">
                        ✕ خروج
                    </button>
                </div>
                
                <!-- Player Stats -->
                <div style="background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:20px; margin-bottom:20px;">
                    <h3 style="color:#00ff41;">👤 ${this.player.name || 'Anonymous Hacker'}</h3>
                    <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:15px; margin-top:15px;">
                        <div style="text-align:center;">
                            <div style="font-size:2rem;">🛡️</div>
                            <div style="color:#00d4ff;">${this.player.server.hp}%</div>
                            <small style="color:#888;">صحة السيرفر</small>
                        </div>
                        <div style="text-align:center;">
                            <div style="font-size:2rem;">🔥</div>
                            <div style="color:#ff2d95;">${this.player.server.firewall}</div>
                            <small style="color:#888;">مستوى الجدار</small>
                        </div>
                        <div style="text-align:center;">
                            <div style="font-size:2rem;">💎</div>
                            <div style="color:#ffd700;">${this.player.stolenData}</div>
                            <small style="color:#888;">بيانات مسروقة</small>
                        </div>
                        <div style="text-align:center;">
                            <div style="font-size:2rem;">🏆</div>
                            <div style="color:#00ff41;">${this.player.rank}</div>
                            <small style="color:#888;">الرتبة</small>
                        </div>
                    </div>
                </div>
                
                <!-- Gangs Leaderboard -->
                <div style="background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:20px; margin-bottom:20px;">
                    <h3 style="color:#ffd700; text-align:center; margin-bottom:20px;">🏴‍☠️ ترتيب العصابات</h3>
                    ${this.gangs.map((gang, i) => `
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:15px; 
                            background:rgba(0,0,0,0.3); border-right:4px solid ${gang.color}; margin-bottom:10px; border-radius:0 10px 10px 0;">
                            <span style="font-size:1.2rem; color:${gang.color};">${i+1}. ${gang.name}</span>
                            <span style="color:#ffd700; font-weight:bold;">${gang.score} نقطة</span>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Online Players - Attack Targets -->
                <div style="background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.1); border-radius:20px; padding:20px; margin-bottom:20px;">
                    <h3 style="color:#ff2d95; text-align:center; margin-bottom:20px;">🎯 لاعبين أونلاين - اختر هدفك!</h3>
                    <div id="online-players-list">
                        ${this.generateBotPlayers()}
                    </div>
                </div>
                
                <!-- My Server Status -->
                <div style="background:rgba(0,0,0,0.5); border:2px solid ${this.defenseActive ? '#ff3333' : '#00ff41'}; border-radius:20px; padding:20px;">
                    <h3 style="color:${this.defenseActive ? '#ff3333' : '#00ff41'}; text-align:center;">
                        ${this.defenseActive ? '🚨 سيرفرك يتعرض للهجوم!' : '🛡️ سيرفرك آمن'}
                    </h3>
                    ${this.attackInProgress ? `
                        <div id="defense-area" style="text-align:center; margin-top:15px;">
                            <p style="color:#ffd700;">⚡ ${this.attackInProgress.attacker} يحاول اختراقك!</p>
                            <p style="color:#ff4444;">⏰ اكتب الأمر الدفاعي قبل فوات الأوان!</p>
                            <input type="text" id="defense-input" placeholder="اكتب: isolate --block --force"
                                style="width:80%; padding:15px; font-size:1.1rem; background:#000; color:#ff3333; border:2px solid #ff3333; border-radius:10px; text-align:center; font-family:monospace; margin:10px 0;">
                            <button onclick="window.CyberGangWar.defendServer()"
                                style="background:#ff3333; color:#fff; border:none; padding:12px 30px; border-radius:10px; font-size:1rem; font-weight:bold; cursor:pointer;">
                                🛡️ دافع عن سيرفرك!
                            </button>
                        </div>
                    ` : '<p style="text-align:center; color:#888;">لا توجد هجمات حالية</p>'}
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
    }
    
    generateBotPlayers() {
        const botNames = [
            'Xx_DarkPhantom_xX', 'ZeroByte', 'CairoWolf', 'DesertHawk',
            'NeonGhost', 'ByteBandit', 'SandStorm', 'CamelHacker',
            'FalconEye', 'ShadowCipher', 'DubaiKing', 'BaghdadBoss'
        ];
        
        return botNames.map((name, i) => {
            const gang = this.gangs[i % this.gangs.length];
            return `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:15px;
                    background:rgba(0,0,0,0.3); border-left:4px solid ${gang.color}; margin-bottom:10px; border-radius:10px 0 0 10px;">
                    <div>
                        <span style="color:#fff;">${name}</span>
                        <br><small style="color:${gang.color};">${gang.name}</small>
                    </div>
                    <button onclick="window.CyberGangWar.attackPlayer('${name}')"
                        style="background:linear-gradient(135deg, #ff2d95, #ff3333); color:#fff; border:none; padding:10px 20px; border-radius:10px; cursor:pointer; font-weight:bold;">
                        ⚔️ هجوم!
                    </button>
                </div>
            `;
        }).join('');
    }
    
    // ═══════════════════════════════════════════════════
    // PVP MECHANICS
    // ═══════════════════════════════════════════════════
    attackPlayer(targetName) {
        if (this.attackInProgress) return;
        
        const targetGang = this.gangs[Math.floor(Math.random() * this.gangs.length)];
        
        this.attackInProgress = {
            attacker: this.player.name || 'Anonymous',
            target: targetName,
            targetGang: targetGang,
            timeLeft: 30,
            difficulty: Math.floor(Math.random() * 5) + 1,
            commands: this.generateAttackCommands()
        };
        
        this.showAttackUI();
    }
    
    generateAttackCommands() {
        const commands = [
            { cmd: 'nmap -sV', answer: '443', hint: 'افحص المنفذ المفتوح! (HTTPS)' },
            { cmd: 'sqlmap -u', answer: 'id', hint: 'استغل ثغرة SQL! (parameter)' },
            { cmd: 'hydra -l admin -P', answer: 'rockyou.txt', hint: 'استخدم قاموس الكلمات!' },
            { cmd: 'john --format=raw-md5', answer: 'hash.txt', hint: 'فك تشفير الملف!' }
        ];
        
        return commands[Math.floor(Math.random() * commands.length)];
    }
    
    showAttackUI() {
        const attack = this.attackInProgress;
        if (!attack) return;
        
        const overlay = document.createElement('div');
        overlay.id = 'attack-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 100000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: arenaEnter 0.3s ease-out;
        `;
        
        overlay.innerHTML = `
            <div style="text-align:center; max-width:500px; width:90%;">
                <div style="font-size:4rem; animation:alarmPulse 0.5s infinite;">⚔️</div>
                <h2 style="color:#ff2d95; font-size:2rem;">ATTACK IN PROGRESS!</h2>
                <p style="color:#fff; font-size:1.2rem;">تهاجم: <span style="color:#ffd700;">${attack.target}</span></p>
                <p style="color:#888;">من: ${attack.targetGang.name}</p>
                
                <div style="font-size:3rem; color:#ffd700; margin:20px 0;" id="attack-timer">⏰ ${attack.timeLeft}s</div>
                
                <div style="background:#1a1a2e; padding:20px; border-radius:10px; margin:20px 0;">
                    <code style="color:#00d4ff; font-size:1.1rem;">${attack.commands.cmd} ???</code>
                    <p style="color:#ffd700; margin-top:10px;">💡 ${attack.commands.hint}</p>
                </div>
                
                <input type="text" id="attack-input" 
                    placeholder="أدخل الأمر الناقص..."
                    style="width:100%; padding:15px; font-size:1.2rem; background:#000; color:#00ff41; border:2px solid #ff2d95; border-radius:10px; text-align:center; font-family:monospace;"
                    autofocus>
                
                <p style="color:#ff4444; margin-top:10px;">⚠️ كل خطأ = -5 ثواني!</p>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Attack timer
        const timerInterval = setInterval(() => {
            attack.timeLeft--;
            const timer = document.getElementById('attack-timer');
            if (timer) timer.textContent = '⏰ ' + attack.timeLeft + 's';
            
            if (attack.timeLeft <= 0) {
                clearInterval(timerInterval);
                this.attackFailed();
            }
        }, 1000);
        
        // Input handler
        setTimeout(() => {
            const input = document.getElementById('attack-input');
            if (input) {
                input.focus();
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        const answer = input.value.trim().toLowerCase();
                        if (answer === attack.commands.answer.toLowerCase()) {
                            clearInterval(timerInterval);
                            this.attackSuccess();
                        } else {
                            attack.timeLeft = Math.max(0, attack.timeLeft - 5);
                            input.style.borderColor = '#ff3333';
                            input.style.animation = 'shake 0.5s';
                            setTimeout(() => {
                                input.style.borderColor = '#ff2d95';
                                input.style.animation = '';
                            }, 500);
                        }
                    }
                });
            }
        }, 500);
        
        this.attackTimerInterval = timerInterval;
    }
    
    attackSuccess() {
        const attack = this.attackInProgress;
        const overlay = document.getElementById('attack-overlay');
        if (!overlay) return;
        
        const stolen = attack.difficulty * 100;
        this.player.stolenData += stolen;
        
        // Update gang score
        if (this.player.gang) {
            const gang = this.gangs.find(g => g.id === this.player.gang);
            if (gang) gang.score += stolen;
        }
        
        // Random taunt
        const taunt = this.taunts.win[Math.floor(Math.random() * this.taunts.win.length)];
        
        overlay.innerHTML = `
            <div style="text-align:center; animation:popIn 0.5s;">
                <div style="font-size:6rem;">💀</div>
                <h2 style="color:#ff2d95; font-size:2rem;">TARGET BREACHED!</h2>
                <p style="color:#ffd700; font-size:1.5rem;">+${stolen} بيانات!</p>
                <p style="color:#fff; margin:20px;">"${taunt}"</p>
                <button onclick="document.getElementById('attack-overlay').remove(); window.CyberGangWar.attackInProgress=null;"
                    style="background:#ff2d95; color:#fff; border:none; padding:15px 30px; border-radius:10px; font-size:1.1rem; cursor:pointer; margin:10px;">
                    ⚔️ هجوم آخر!
                </button>
                <button onclick="window.CyberGangWar.shareClip('${taunt}')"
                    style="background:#00d4ff; color:#000; border:none; padding:15px 30px; border-radius:10px; font-size:1.1rem; cursor:pointer; margin:10px;">
                    📲 شارك على تيك توك!
                </button>
            </div>
        `;
        
        this.attackInProgress = null;
    }
    
    attackFailed() {
        const overlay = document.getElementById('attack-overlay');
        if (!overlay) return;
        
        const taunt = this.taunts.lose[Math.floor(Math.random() * this.taunts.lose.length)];
        
        overlay.innerHTML = `
            <div style="text-align:center; animation:popIn 0.5s;">
                <div style="font-size:6rem;">🤡</div>
                <h2 style="color:#ffd700; font-size:2rem;">FAILED!</h2>
                <p style="color:#fff; margin:20px;">"${taunt}"</p>
                <button onclick="document.getElementById('attack-overlay').remove(); window.CyberGangWar.attackInProgress=null;"
                    style="background:#ff3333; color:#fff; border:none; padding:15px 30px; border-radius:10px; font-size:1.1rem; cursor:pointer;">
                    🔄 حاول تاني!
                </button>
            </div>
        `;
        
        this.attackInProgress = null;
    }
    
    defendServer() {
        if (!this.attackInProgress) return;
        
        const input = document.getElementById('defense-input');
        if (!input) return;
        
        const defenseCommand = input.value.trim().toLowerCase();
        
        if (defenseCommand === 'isolate --block --force') {
            this.defenseActive = true;
            this.player.server.hp = Math.max(0, this.player.server.hp - 20);
            
            alert('✅ تم صد الهجوم! خسرت 20% من صحة السيرفر لكنك نجوت!');
            
            if (this.attackInProgress && this.attackInProgress.attacker) {
                // Notify attacker
                alert('🛡️ ' + this.attackInProgress.attacker + ' صد هجومك!');
            }
            
            this.attackInProgress = null;
            this.defenseActive = false;
            this.openArena(); // Refresh
            
        } else {
            input.style.borderColor = '#ff3333';
            setTimeout(() => input.style.borderColor = '#ff3333', 500);
        }
    }
    
    startAutoDefense() {
        // Random incoming attacks
        setInterval(() => {
            if (!this.arenaOpen && !this.attackInProgress && Math.random() < 0.2) {
                const bots = ['Xx_DarkPhantom_xX', 'CairoWolf', 'NeonGhost', 'ByteBandit'];
                const attacker = bots[Math.floor(Math.random() * bots.length)];
                
                this.attackInProgress = {
                    attacker: attacker,
                    target: this.player.name || 'Anonymous',
                    targetGang: this.gangs[Math.floor(Math.random() * this.gangs.length)],
                    timeLeft: 60,
                    difficulty: 3,
                    commands: this.generateAttackCommands()
                };
                
                this.defenseActive = true;
                
                // Show alert
                if (window.CyberMind) {
                    window.CyberMind.showFloatingMessage('🚨 ' + attacker + ' يهاجم سيرفرك!');
                }
            }
        }, 60000); // Every minute
    }
    
    shareClip(taunt) {
        const text = encodeURIComponent('⚔️ CYBER GANG WAR: ' + taunt + '\n\nتعال أتحداك! https://cyberpunk0.surge.sh');
        
        // Open share dialog
        if (navigator.share) {
            navigator.share({
                title: 'CYBER GANG WAR',
                text: taunt,
                url: 'https://cyberpunk0.surge.sh'
            });
        } else {
            window.open('https://tiktok.com', '_blank');
        }
    }
}

// CSS
const gangStyle = document.createElement('style');
gangStyle.textContent = `
    @keyframes arenaGlow {
        0%, 100% { box-shadow: 0 0 30px rgba(255,45,149,0.8); }
        50% { box-shadow: 0 0 60px rgba(255,45,149,1), 0 0 100px rgba(255,215,0,0.5); }
    }
    
    @keyframes arenaEnter {
        0% { opacity: 0; transform: scale(0.8); }
        100% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes glowPulse {
        0%, 100% { text-shadow: 0 0 10px #ff2d95; }
        50% { text-shadow: 0 0 30px #ff2d95, 0 0 60px #ffd700; }
    }
`;
document.head.appendChild(gangStyle);

// Initialize
window.CyberGangWar = new CyberGangWar();
console.log('⚔️ Cyber Gang War ready');

// Patch CyberGangWar to use Dark Market loot
CyberGangWar.prototype._originalAttackSuccess = CyberGangWar.prototype.attackSuccess;
CyberGangWar.prototype.attackSuccess = function() {
    // Generate loot
    if (window.CyberDarkMarket) {
        const lootItems = window.CyberDarkMarket.stealLootFromPlayer(this.attackInProgress.target);
        const totalValue = lootItems.reduce((sum, item) => sum + item.value, 0);
        
        // Add currency to player
        window.CyberDarkMarket.inventory.currency += totalValue;
        window.CyberDarkMarket.saveInventory();
        
        // Show loot in success screen
        const lootDisplay = lootItems.map(l => `${l.name} (+${l.value})`).join('<br>');
        
        // Override success display
        const overlay = document.getElementById('attack-overlay');
        if (overlay) {
            const originalContent = overlay.innerHTML;
            overlay.innerHTML = originalContent.replace('TARGET BREACHED!', 
                `TARGET BREACHED!<br><small style="color:#ffd700;">${lootDisplay}</small>`);
        }
    }
    
    // Call original
    if (this._originalAttackSuccess) {
        this._originalAttackSuccess();
    }
};
