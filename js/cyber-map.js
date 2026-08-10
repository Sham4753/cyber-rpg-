/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           CYBER MAP ENGINE - Live Digital World              ║
 * ║           Nodes + Connections + Hacking Effects              ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

class CyberMap {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.nodes = [];
        this.connections = [];
        this.playerNode = null;
        this.discoveredNodes = new Set();
        
        // The world
        this.worldNodes = [
            { id: 'player', name: '🏠 قاعدتك', type: 'player', x: 50, y: 80, hacked: true, 
              desc: 'قاعدة عملياتك السرية', difficulty: 0 },
            { id: 'omega-front', name: '🚪 مدخل OMEGA', type: 'gateway', x: 30, y: 50, hacked: false,
              desc: 'البوابة الأمامية لشركة OMEGA', difficulty: 2, 
              required: [], reward: '🔑 مفتاح الشبكة الداخلية' },
            { id: 'omega-mail', name: '📧 سيرفر البريد', type: 'server', x: 45, y: 35, hacked: false,
              desc: 'خادم البريد الإلكتروني - قد يحتوي على كلمات مرور', difficulty: 3,
              required: ['omega-front'], reward: '📧 قاعدة بيانات الإيميلات' },
            { id: 'omega-db', name: '🗄️ قاعدة البيانات', type: 'database', x: 60, y: 25, hacked: false,
              desc: 'قاعدة البيانات الرئيسية - كنز المعلومات!', difficulty: 5,
              required: ['omega-mail'], reward: '💎 كل أسرار OMEGA' },
            { id: 'bank-firewall', name: '🛡️ جدار البنك الناري', type: 'firewall', x: 70, y: 55, hacked: false,
              desc: 'حماية البنك المركزي - الأقوى في المدينة', difficulty: 7,
              required: ['omega-db'], reward: '🏦 مدخل النظام المصرفي' },
            { id: 'bank-vault', name: '🏦 خزنة البنك', type: 'vault', x: 85, y: 45, hacked: false,
              desc: 'الخزنة الرقمية - مليارات السيبركوين!', difficulty: 10,
              required: ['bank-firewall'], reward: '💰 1,000,000 سيبركوين' },
            { id: 'satellite', name: '📡 القمر الصناعي', type: 'satellite', x: 20, y: 20, hacked: false,
              desc: 'قمر اتصالات - يتحكم في شبكة المدينة', difficulty: 8,
              required: ['omega-db'], reward: '🌐 التحكم بالاتصالات' },
            { id: 'power-plant', name: '⚡ محطة الطاقة', type: 'power', x: 55, y: 70, hacked: false,
              desc: 'مصدر طاقة المدينة الرقمية', difficulty: 4,
              required: ['omega-front'], reward: '⚡ طاقة لا محدودة' },
            { id: 'dark-web', name: '🌑 الديب ويب', type: 'hidden', x: 10, y: 65, hacked: false,
              desc: 'أسواق سرية... أدوات نادرة جداً!', difficulty: 9,
              required: ['satellite'], reward: '🗡️ أدوات أسطورية' },
            { id: 'phantom-lair', name: '🐉 وكر PHANTOM', type: 'boss', x: 40, y: 10, hacked: false,
              desc: 'الزعيم الأخير - أخطر هاكر في العالم', difficulty: 15,
              required: ['bank-vault', 'dark-web', 'power-plant'], reward: '👑 تاج سايبر الأسطوري' }
        ];
        
        this.init();
    }
    
    init() {
        if (!this.container) {
            console.warn('Cyber Map container not found');
            return;
        }
        
        this.container.innerHTML = '';
        this.container.style.cssText = `
            position: relative;
            width: 100%;
            min-height: 500px;
            background: radial-gradient(ellipse at center, #0d0d2b 0%, #0a0a1a 100%);
            border: 2px solid rgba(0,255,65,0.3);
            border-radius: 20px;
            overflow: hidden;
            cursor: grab;
        `;
        
        // Grid background
        const grid = document.createElement('div');
        grid.style.cssText = `
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background-image: 
                linear-gradient(rgba(0,255,65,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,65,0.05) 1px, transparent 1px);
            background-size: 30px 30px;
            pointer-events: none;
        `;
        this.container.appendChild(grid);
        
        this.renderWorld();
        this.addScanEffect();
    }
    
    renderWorld() {
        // Draw connections first
        this.worldNodes.forEach(node => {
            if (node.required) {
                node.required.forEach(reqId => {
                    const reqNode = this.worldNodes.find(n => n.id === reqId);
                    if (reqNode) {
                        this.drawConnection(reqNode, node);
                    }
                });
            }
        });
        
        // Draw nodes
        this.worldNodes.forEach(node => {
            this.createNode(node);
        });
        
        // Player marker
        this.createPlayerMarker();
    }
    
    drawConnection(from, to) {
        const line = document.createElement('div');
        const fromX = from.x;
        const fromY = from.y;
        const toX = to.x;
        const toY = to.y;
        
        const length = Math.sqrt((toX - fromX) ** 2 + (toY - fromY) ** 2);
        const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;
        
        const isActive = from.hacked && to.hacked;
        
        line.style.cssText = `
            position: absolute;
            left: ${fromX}%;
            top: ${fromY}%;
            width: ${length}%;
            height: 2px;
            background: ${isActive ? 
                'linear-gradient(90deg, #00ff41, #00d4ff)' : 
                'rgba(255,255,255,0.1)'};
            transform-origin: left center;
            transform: rotate(${angle}deg);
            z-index: 1;
            opacity: ${isActive ? 1 : 0.3};
            ${isActive ? 'animation: connectionPulse 2s infinite;' : ''}
        `;
        
        this.container.appendChild(line);
        this.connections.push(line);
    }
    
    createNode(nodeData) {
        const node = document.createElement('div');
        const isAvailable = this.isNodeAvailable(nodeData);
        const isHacked = nodeData.hacked;
        
        node.className = 'cyber-map-node';
        node.style.cssText = `
            position: absolute;
            left: ${nodeData.x}%;
            top: ${nodeData.y}%;
            transform: translate(-50%, -50%);
            width: ${nodeData.type === 'boss' ? '80px' : '60px'};
            height: ${nodeData.type === 'boss' ? '80px' : '60px'};
            background: ${isHacked ? 
                'rgba(0,255,65,0.3)' : 
                isAvailable ? 'rgba(255,215,0,0.2)' : 'rgba(255,0,0,0.2)'};
            border: 2px solid ${isHacked ? '#00ff41' : isAvailable ? '#ffd700' : '#ff3333'};
            border-radius: ${nodeData.type === 'boss' ? '20%' : '50%'};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${nodeData.type === 'boss' ? '2rem' : '1.5rem'};
            cursor: ${isAvailable || isHacked ? 'pointer' : 'not-allowed'};
            z-index: 2;
            transition: all 0.3s ease;
            animation: ${isAvailable && !isHacked ? 'nodePulse 2s infinite' : 'none'};
        `;
        
        node.innerHTML = nodeData.name.split(' ')[0];
        node.title = `${nodeData.name}\n${nodeData.desc}\nصعوبة: ${'⭐'.repeat(nodeData.difficulty)}`;
        
        // Click handler
        node.addEventListener('click', () => {
            if (isHacked) {
                this.showNodeInfo(nodeData);
            } else if (isAvailable) {
                this.attemptHack(nodeData, node);
            } else {
                this.showLockedMessage(nodeData);
            }
        });
        
        // Hover effect
        node.addEventListener('mouseenter', () => {
            if (isAvailable && !isHacked) {
                node.style.transform = 'translate(-50%, -50%) scale(1.2)';
                node.style.boxShadow = '0 0 30px rgba(255,215,0,0.5)';
            }
        });
        
        node.addEventListener('mouseleave', () => {
            node.style.transform = 'translate(-50%, -50%) scale(1)';
            node.style.boxShadow = 'none';
        });
        
        this.container.appendChild(node);
        this.nodes.push(node);
    }
    
    createPlayerMarker() {
        const playerNode = this.worldNodes.find(n => n.id === 'player');
        if (!playerNode) return;
        
        const marker = document.createElement('div');
        marker.style.cssText = `
            position: absolute;
            left: ${playerNode.x}%;
            top: ${playerNode.y}%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            background: rgba(0,255,65,0.5);
            border: 3px solid #00ff41;
            border-radius: 50%;
            z-index: 3;
            animation: playerPulse 1.5s infinite;
            pointer-events: none;
        `;
        this.container.appendChild(marker);
    }
    
    isNodeAvailable(node) {
        if (!node.required || node.required.length === 0) return true;
        return node.required.every(reqId => {
            const reqNode = this.worldNodes.find(n => n.id === reqId);
            return reqNode && reqNode.hacked;
        });
    }
    
    attemptHack(nodeData, nodeElement) {
        const difficulty = nodeData.difficulty;
        const modifier = window.CyberMind ? 
            window.CyberMind.getDifficultyModifier() : 1;
        
        // Player skill check
        const playerSkill = Math.random() * 10;
        const required = difficulty * modifier;
        
        if (playerSkill >= required * 0.4) { // Success
            nodeData.hacked = true;
            nodeElement.style.background = 'rgba(0,255,65,0.3)';
            nodeElement.style.borderColor = '#00ff41';
            nodeElement.style.animation = 'none';
            
            // Visual effect
            if (window.CyberMind) {
                window.CyberMind.showVisualEffect('explosion');
                window.CyberMind.showSuccessMessage();
            }
            
            // Show reward
            this.showPopup(`🎉 ${nodeData.name} تم اختراقه!\n${nodeData.reward}`);
            
            // Refresh connections
            this.refreshConnections();
            
            // Save progress
            if (window.SaveSystem) {
                window.SaveSystem.save(nodeData.id, { xp: difficulty * 50 });
            }
            
            // Check if boss is available
            this.checkBossUnlock();
            
        } else { // Fail
            nodeElement.style.animation = 'shake 0.5s';
            setTimeout(() => {
                nodeElement.style.animation = 'nodePulse 2s infinite';
            }, 500);
            
            if (window.CyberMind) {
                window.CyberMind.showVisualEffect('glitch');
                window.CyberMind.triggerGlitchBot('hack ' + nodeData.name);
            }
        }
    }
    
    showLockedMessage(nodeData) {
        const missing = nodeData.required.filter(reqId => {
            const reqNode = this.worldNodes.find(n => n.id === reqId);
            return !reqNode || !reqNode.hacked;
        });
        
        const missingNames = missing.map(id => {
            const node = this.worldNodes.find(n => n.id === id);
            return node ? node.name : id;
        }).join(' → ');
        
        this.showPopup(`🔒 ${nodeData.name} مقفل!\nيجب اختراق: ${missingNames}`);
    }
    
    showNodeInfo(nodeData) {
        this.showPopup(`${nodeData.name}\n${nodeData.desc}\n✅ مخترق - ${nodeData.reward}`);
    }
    
    showPopup(message) {
        const existing = document.querySelector('.map-popup');
        if (existing) existing.remove();
        
        const popup = document.createElement('div');
        popup.className = 'map-popup';
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.95);
            border: 2px solid #00ff41;
            border-radius: 15px;
            padding: 25px;
            color: #fff;
            font-family: monospace;
            font-size: 1.1rem;
            text-align: center;
            z-index: 10000;
            white-space: pre-line;
            line-height: 1.8;
            animation: popIn 0.3s ease-out;
        `;
        
        popup.textContent = message;
        
        popup.addEventListener('click', () => popup.remove());
        setTimeout(() => popup.remove(), 4000);
        
        document.body.appendChild(popup);
    }
    
    refreshConnections() {
        this.connections.forEach(line => line.remove());
        this.connections = [];
        
        this.worldNodes.forEach(node => {
            if (node.required) {
                node.required.forEach(reqId => {
                    const reqNode = this.worldNodes.find(n => n.id === reqId);
                    if (reqNode) {
                        this.drawConnection(reqNode, node);
                    }
                });
            }
        });
    }
    
    checkBossUnlock() {
        const boss = this.worldNodes.find(n => n.id === 'phantom-lair');
        if (boss && !boss.hacked && this.isNodeAvailable(boss)) {
            setTimeout(() => {
                this.showPopup('🐉 وكر PHANTOM أصبح متاحاً!\nاستعد للمعركة النهائية!');
            }, 2000);
        }
    }
    
    addScanEffect() {
        const scanner = document.createElement('div');
        scanner.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, transparent, #00ff41, transparent);
            z-index: 4;
            pointer-events: none;
            animation: scanLine 3s linear infinite;
        `;
        this.container.appendChild(scanner);
    }
}

// CSS for map
const mapStyle = document.createElement('style');
mapStyle.textContent = `
    @keyframes nodePulse {
        0%, 100% { box-shadow: 0 0 10px rgba(255,215,0,0.3); }
        50% { box-shadow: 0 0 30px rgba(255,215,0,0.8); }
    }
    
    @keyframes playerPulse {
        0%, 100% { box-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41; }
        50% { box-shadow: 0 0 30px #00ff41, 0 0 60px #00ff41; }
    }
    
    @keyframes connectionPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    @keyframes scanLine {
        0% { top: 0; }
        100% { top: 100%; }
    }
    
    @keyframes shake {
        0%, 100% { transform: translate(-50%, -50%); }
        25% { transform: translate(calc(-50% - 5px), -50%); }
        75% { transform: translate(calc(-50% + 5px), -50%); }
    }
    
    @keyframes popIn {
        0% { transform: translate(-50%, -50%) scale(0); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(mapStyle);

window.CyberMap = CyberMap;
console.log('🗺️ Cyber Map Engine loaded');
