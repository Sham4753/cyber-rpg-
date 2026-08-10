/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           CYBER MIND ENGINE v1.0 - 4 Algorithms             ║
 * ║           1. Dynamic Flow State                              ║
 * ║           2. Visual Code-to-Action                           ║
 * ║           3. Variable Reward Schedule                        ║
 * ║           4. Fail-Forward Glitch Bot                         ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

class CyberMindEngine {
    constructor() {
        this.userMetrics = {
            successRate: 1.0,
            avgSpeed: 0,
            failCount: 0,
            totalAttempts: 0,
            currentStreak: 0,
            frustrationLevel: 0
        };
        
        this.difficultyLevels = ['rookie', 'agent', 'hacker', 'elite', 'legend'];
        this.currentDifficulty = 2; // start at 'hacker'
        
        this.rewards = {
            common: { chance: 50, items: ['💎 10 XP', '🔑 مفتاح عادي', '📡 إشارة ضعيفة'] },
            rare: { chance: 25, items: ['💎 50 XP', '🗡️ أداة نادرة', '🛡️ درع نيون'] },
            epic: { chance: 15, items: ['💎 200 XP', '🐉 تنين استغلال', '⚡ معالج فائق'] },
            legendary: { chance: 8, items: ['💎 1000 XP', '👑 تاج الهاكر', '🌌 ثيم كوني'] },
            mythical: { chance: 2, items: ['💎 5000 XP', '🔮 مصفوفة المصير', '⚡ طاقة مطلقة'] }
        };
        
        this.glitchBotPhrases = {
            wrong: [
                '👾 أووه! كادوا يمسكونا! جرب كذا: ',
                '🤖 تحذير! الأمر ده خلّى السيرفر يصحى! جرب: ',
                '💀 يا للهول! الجدار الناري اشتعل! استخدم: ',
                '👻 همس الهاكرز: الطريق الصح هو: ',
                '🎭 تمويه! تنكر بهذا الأمر: '
            ],
            close: [
                '🔥 قريب جداً! حرف واحد خطأ!',
                '⚡ كنت على وشك اختراق الحماية!',
                '🎯 تقريباً! ركز شوي!',
                '💡 لمبة! فكر في الاتجاه المعاكس!'
            ],
            success: [
                '🎉 أسطوري! مثل هاكر حقيقي!',
                '⚡ كهربت السيرفر! اختراق ناجح!',
                '🏆 الـ PHANTOM يرتجف منك!',
                '💎 جوهرة! أجمل اختراق شفته!',
                '🔥 النيران الزرقاء! أنت خطير!'
            ]
        };
        
        this.visualEffects = {
            matrix: 'matrix-rain',
            firewall: 'firewall-breach',
            packet: 'packet-travel',
            explosion: 'cyber-explosion',
            loot: 'loot-spiral',
            glitch: 'screen-glitch'
        };
        
        this.init();
    }
    
    init() {
        console.log('🧠 Cyber Mind Engine initialized');
        this.startMetricsTracking();
        this.injectGlitchBot();
        this.createParticleSystem();
    }
    
    // ═══════════════════════════════════════════════════
    // 1️⃣ FLOW STATE ALGORITHM - Dynamic Difficulty
    // ═══════════════════════════════════════════════════
    trackAttempt(command, isSuccess, speed) {
        this.userMetrics.totalAttempts++;
        
        if (isSuccess) {
            this.userMetrics.successRate = 
                (this.userMetrics.successRate * 0.7) + (1.0 * 0.3);
            this.userMetrics.currentStreak++;
            this.userMetrics.frustrationLevel = Math.max(0, 
                this.userMetrics.frustrationLevel - 0.1);
        } else {
            this.userMetrics.failCount++;
            this.userMetrics.currentStreak = 0;
            this.userMetrics.frustrationLevel = Math.min(1, 
                this.userMetrics.frustrationLevel + 0.15);
            this.triggerGlitchBot(command);
        }
        
        this.userMetrics.avgSpeed = 
            (this.userMetrics.avgSpeed * 0.8) + (speed * 0.2);
        
        this.adjustDifficulty();
    }
    
    adjustDifficulty() {
        const metrics = this.userMetrics;
        
        // Too easy? Increase difficulty
        if (metrics.successRate > 0.9 && metrics.avgSpeed < 5 && 
            metrics.frustrationLevel < 0.2) {
            this.currentDifficulty = Math.min(4, this.currentDifficulty + 1);
            this.showVisualEffect('matrix', '⚡ تم رفع التحدي! الخصوم أصبحوا أذكى!');
        }
        
        // Too hard? Decrease difficulty
        if (metrics.frustrationLevel > 0.7 && metrics.failCount > 3) {
            this.currentDifficulty = Math.max(0, this.currentDifficulty - 1);
            this.showVisualEffect('glitch', '🛡️ تم تخفيف الحماية... تنفس!');
            this.userMetrics.frustrationLevel = 0.4;
        }
    }
    
    getDifficultyModifier() {
        const mods = [0.5, 0.75, 1.0, 1.5, 2.5];
        return mods[this.currentDifficulty];
    }
    
    // ═══════════════════════════════════════════════════
    // 2️⃣ VISUAL CODE-TO-ACTION
    // ═══════════════════════════════════════════════════
    showVisualEffect(effectType, message) {
        const effects = {
            'matrix': () => this.createMatrixRain(),
            'firewall': () => this.animateFirewallBreach(),
            'packet': () => this.animatePacketTravel(),
            'explosion': () => this.animateCyberExplosion(),
            'loot': () => this.animateLootSpiral(),
            'glitch': () => this.animateScreenGlitch()
        };
        
        if (effects[effectType]) {
            effects[effectType]();
        }
        
        if (message) {
            this.showFloatingMessage(message);
        }
    }
    
    createMatrixRain() {
        const canvas = document.getElementById('matrix-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = '01アイウエオカキクケコサシスセソタチツテト';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(draw, 50);
    }
    
    animateFirewallBreach() {
        // Create explosion effect
        const effect = document.createElement('div');
        effect.style.cssText = `
            position: fixed; top: 50%; left: 50%; 
            transform: translate(-50%, -50%);
            width: 0; height: 0;
            background: radial-gradient(circle, #ff2d95, transparent);
            border-radius: 50%;
            animation: firewallExplode 1s ease-out forwards;
            pointer-events: none; z-index: 9999;
        `;
        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 1000);
    }
    
    animatePacketTravel() {
        // Animate a packet traveling through network
        const packet = document.createElement('div');
        packet.style.cssText = `
            position: fixed;
            width: 15px; height: 15px;
            background: #00d4ff;
            border-radius: 50%;
            box-shadow: 0 0 20px #00d4ff, 0 0 40px #00d4ff;
            z-index: 9999;
            animation: packetTravel 2s ease-in-out forwards;
            pointer-events: none;
        `;
        document.body.appendChild(packet);
        setTimeout(() => packet.remove(), 2000);
    }
    
    animateCyberExplosion() {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 20;
            const distance = 100 + Math.random() * 200;
            
            particle.style.cssText = `
                position: fixed;
                top: 50%; left: 50%;
                width: 8px; height: 8px;
                background: ${i % 2 === 0 ? '#00ff41' : '#ffd700'};
                border-radius: 50%;
                z-index: 9999;
                pointer-events: none;
                animation: particleExplode 1.5s ease-out forwards;
                --angle: ${angle}rad;
                --distance: ${distance}px;
            `;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }
    }
    
    animateLootSpiral() {
        const loot = document.createElement('div');
        loot.innerHTML = '💎';
        loot.style.cssText = `
            position: fixed;
            top: 50%; left: 50%;
            font-size: 4rem;
            z-index: 9999;
            pointer-events: none;
            animation: lootSpiral 2s ease-out forwards;
        `;
        document.body.appendChild(loot);
        setTimeout(() => loot.remove(), 2000);
    }
    
    animateScreenGlitch() {
        const glitch = document.createElement('div');
        glitch.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: linear-gradient(0deg, 
                rgba(255,0,0,0.1) 0%, 
                rgba(0,255,0,0.1) 50%, 
                rgba(0,0,255,0.1) 100%);
            z-index: 9998;
            pointer-events: none;
            animation: screenGlitch 0.3s ease-out forwards;
        `;
        document.body.appendChild(glitch);
        setTimeout(() => glitch.remove(), 300);
    }
    
    showFloatingMessage(message) {
        const msg = document.createElement('div');
        msg.textContent = message;
        msg.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.9);
            color: #00ff41;
            padding: 15px 30px;
            border: 2px solid #00ff41;
            border-radius: 10px;
            font-family: monospace;
            font-size: 1.2rem;
            z-index: 10000;
            animation: floatUp 3s ease-out forwards;
            pointer-events: none;
        `;
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
    }
    
    // ═══════════════════════════════════════════════════
    // 3️⃣ VARIABLE REWARD SCHEDULE
    // ═══════════════════════════════════════════════════
    generateReward() {
        const roll = Math.random() * 100;
        let tier, item;
        
        if (roll < 2) {
            tier = 'mythical';
        } else if (roll < 10) {
            tier = 'legendary';
        } else if (roll < 25) {
            tier = 'epic';
        } else if (roll < 50) {
            tier = 'rare';
        } else {
            tier = 'common';
        }
        
        const items = this.rewards[tier].items;
        item = items[Math.floor(Math.random() * items.length)];
        
        return { tier, item, roll };
    }
    
    openLootBox() {
        const reward = this.generateReward();
        
        // Visual effect based on tier
        if (reward.tier === 'mythical' || reward.tier === 'legendary') {
            this.showVisualEffect('explosion');
            this.showVisualEffect('loot');
        } else if (reward.tier === 'epic') {
            this.showVisualEffect('loot');
        }
        
        return reward;
    }
    
    // ═══════════════════════════════════════════════════
    // 4️⃣ FAIL-FORWARD GLITCH BOT
    // ═══════════════════════════════════════════════════
    injectGlitchBot() {
        // Create glitch bot element
        const bot = document.createElement('div');
        bot.id = 'glitch-bot';
        bot.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            border: 2px solid #ff2d95;
            border-radius: 15px;
            padding: 15px;
            color: #fff;
            font-family: monospace;
            font-size: 0.9rem;
            z-index: 10001;
            display: none;
            max-width: 300px;
            animation: slideIn 0.5s ease-out;
        `;
        bot.innerHTML = '<span id="glitch-avatar">👾</span> <span id="glitch-text"></span>';
        document.body.appendChild(bot);
    }
    
    triggerGlitchBot(failedCommand) {
        const bot = document.getElementById('glitch-bot');
        const text = document.getElementById('glitch-text');
        if (!bot || !text) return;
        
        const phrases = this.glitchBotPhrases;
        let message;
        
        if (this.userMetrics.failCount === 1) {
            message = phrases.wrong[Math.floor(Math.random() * phrases.wrong.length)] + 
                     this.suggestCorrection(failedCommand);
        } else if (this.userMetrics.failCount === 2) {
            message = phrases.close[Math.floor(Math.random() * phrases.close.length)];
        } else {
            message = phrases.wrong[Math.floor(Math.random() * phrases.wrong.length)] + 
                     this.suggestCorrection(failedCommand);
        }
        
        text.textContent = message;
        bot.style.display = 'block';
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            bot.style.display = 'none';
        }, 4000);
    }
    
    suggestCorrection(command) {
        const suggestions = {
            'ls': 'ls (حروف صغيرة)',
            'help': 'help لعرض الأوامر',
            'cd': 'cd [اسم المجلد]',
            'pwd': 'pwd لمعرفة مكانك',
            'cat': 'cat [اسم الملف]',
            'clear': 'clear لتنظيف الشاشة'
        };
        
        const cmd = command.toLowerCase().trim();
        return suggestions[cmd] || 'جرب تكتب help';
    }
    
    showSuccessMessage() {
        const phrases = this.glitchBotPhrases.success;
        const message = phrases[Math.floor(Math.random() * phrases.length)];
        this.showFloatingMessage(message);
        
        // 30% chance to show loot box
        if (Math.random() < 0.3) {
            setTimeout(() => {
                const reward = this.openLootBox();
                this.showFloatingMessage(`🎁 ${reward.item} (${reward.tier})`);
            }, 1500);
        }
    }
    
    // ═══════════════════════════════════════════════════
    // PARTICLE SYSTEM
    // ═══════════════════════════════════════════════════
    createParticleSystem() {
        const container = document.createElement('div');
        container.id = 'particle-container';
        container.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        document.body.prepend(container);
        
        // Create floating particles
        setInterval(() => {
            if (container.children.length > 30) return;
            
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${2 + Math.random() * 4}px;
                height: ${2 + Math.random() * 4}px;
                background: ${Math.random() > 0.5 ? '#00ff41' : '#00d4ff'};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                bottom: -10px;
                opacity: ${0.3 + Math.random() * 0.7};
                animation: particleFloat ${3 + Math.random() * 5}s linear forwards;
            `;
            container.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 8000);
        }, 500);
    }
    
    startMetricsTracking() {
        // Track user behavior
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                this.lastKeyTime = Date.now();
            }
        });
    }
}

// Initialize global instance
window.CyberMind = new CyberMindEngine();

// CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes firewallExplode {
        0% { width: 0; height: 0; opacity: 1; }
        100% { width: 600px; height: 600px; opacity: 0; }
    }
    
    @keyframes packetTravel {
        0% { top: 0; left: 0; }
        50% { top: 50%; left: 70%; }
        100% { top: 90%; left: 90%; opacity: 0; }
    }
    
    @keyframes particleExplode {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { 
            transform: translate(
                calc(cos(var(--angle)) * var(--distance)), 
                calc(sin(var(--angle)) * var(--distance))
            ) scale(0); 
            opacity: 0; 
        }
    }
    
    @keyframes lootSpiral {
        0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(3) rotate(720deg); opacity: 0; }
    }
    
    @keyframes screenGlitch {
        0% { opacity: 0; transform: translateX(0); }
        25% { opacity: 1; transform: translateX(-10px); }
        50% { opacity: 0.5; transform: translateX(10px); }
        75% { opacity: 0.8; transform: translateX(-5px); }
        100% { opacity: 0; transform: translateX(0); }
    }
    
    @keyframes floatUp {
        0% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-100px); }
    }
    
    @keyframes slideIn {
        0% { transform: translateX(100%); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes particleFloat {
        0% { transform: translateY(0) scale(1); opacity: 0.8; }
        100% { transform: translateY(-100vh) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log('🧠 Cyber Mind Engine loaded successfully');
