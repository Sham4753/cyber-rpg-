/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           CYBER SURVIVAL MECHANICS v1.0                     ║
 * ║           1. Active Trace Protocol (العد التنازلي)           ║
 * ║           2. Ransomware Alerts (الابتزاز الرقمي)             ║
 * ║           3. Stealth/Ghost Mode (وضع التخفي)                 ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

class CyberSurvival {
    constructor() {
        this.activeTrace = null;
        this.stealthMode = false;
        this.stealthDuration = 0;
        this.randomEventTimer = null;
        this.traceSpeed = 1000; // ms per tick
        
        // Sound effects (using Web Audio API)
        this.audioContext = null;
        
        this.init();
    }
    
    init() {
        console.log('⚡ Cyber Survival Mechanics loaded');
        this.startRandomEvents();
        this.createStealthButton();
    }
    
    // ═══════════════════════════════════════════════════
    // 1️⃣ ACTIVE TRACE PROTOCOL
    // ═══════════════════════════════════════════════════
    startTrace(difficulty = 1, onSuccess = null, onFail = null) {
        if (this.activeTrace) return;
        
        const baseTime = 45; // seconds
        const timePerDifficulty = 5;
        const totalTime = baseTime - (difficulty * timePerDifficulty);
        const finalTime = Math.max(15, totalTime); // minimum 15 seconds
        
        this.activeTrace = {
            timeLeft: finalTime,
            maxTime: finalTime,
            penalty: 5,
            difficulty: difficulty,
            onSuccess: onSuccess,
            onFail: onFail,
            solved: false,
            failed: false,
            command: this.generateTraceCommand(difficulty),
            interval: null
        };
        
        this.createTraceUI();
        this.startTraceCountdown();
        this.playTraceSound();
    }
    
    generateTraceCommand(difficulty) {
        const commands = {
            1: { // Easy
                cmd: 'sudo iptables -A INPUT -s {ip} -j DROP',
                answer: '192.168.1.100',
                hint: 'امنع الـ IP المتسلل! (عنوان IP واحد)',
                prompt: 'اكتب عنوان IP لحظره:'
            },
            2: { // Medium
                cmd: 'nmap -sV -p {port} {target}',
                answer: '443',
                hint: 'افتح المنفذ الآمن! (رقم منفذ HTTPS)',
                prompt: 'اكتب رقم المنفذ:'
            },
            3: { // Hard
                cmd: 'openssl enc -aes-256-cbc -d -in secret.enc -k {key}',
                answer: 'PHANTOM',
                hint: 'فك التشفير! (اسم العدو)',
                prompt: 'اكتب مفتاح فك التشفير:'
            },
            4: { // Extreme
                cmd: 'ssh -i {keyfile} root@{server}',
                answer: 'id_rsa_ghost',
                hint: 'استخدم مفتاح SSH المخفي! (id_rsa_???)',
                prompt: 'اكتب اسم ملف المفتاح:'
            },
            5: { // Legendary
                cmd: 'echo {hash} | base64 -d | md5sum',
                answer: 'Q1lCRVJfTUFTVEVS',
                hint: 'فك تشفير Base64! (CYBER_MASTER)',
                prompt: 'اكتب النص المشفر:'
            }
        };
        
        return commands[Math.min(difficulty, 5)] || commands[1];
    }
    
    createTraceUI() {
        // Remove existing trace UI
        const existing = document.getElementById('trace-overlay');
        if (existing) existing.remove();
        
        const overlay = document.createElement('div');
        overlay.id = 'trace-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            animation: traceEnter 0.5s ease-out;
        `;
        
        const trace = this.activeTrace;
        
        overlay.innerHTML = `
            <div style="text-align:center; max-width:500px; width:90%;">
                <div style="font-size:5rem; animation: alarmPulse 0.5s infinite;">🚨</div>
                <h2 style="color:#ff3333; font-family:monospace; font-size:1.8rem; margin:10px 0;">
                    ⚡ TRACE ACTIVE!
                </h2>
                <div style="color:#ffd700; font-size:1rem; margin:10px 0;">
                    📡 نظام الأمان كشفك! اكتب الأمر الصحيح قبل الحظر!
                </div>
                
                <!-- Timer -->
                <div id="trace-timer" style="font-size:4rem; font-family:monospace; color:#00ff41; margin:20px 0; text-shadow:0 0 20px #00ff41;">
                    ⏰ ${trace.timeLeft}
                </div>
                
                <!-- Progress Bar -->
                <div style="width:100%; height:10px; background:#333; border-radius:5px; margin:15px 0; overflow:hidden;">
                    <div id="trace-bar" style="width:100%; height:100%; background:linear-gradient(90deg, #00ff41, #ff3333); border-radius:5px; transition:width 1s linear;"></div>
                </div>
                
                <!-- Hint -->
                <div style="background:#1a1a2e; padding:15px; border-radius:10px; margin:15px 0; border:1px solid #ffd700;">
                    <p style="color:#ffd700; font-size:0.9rem;">💡 ${trace.command.hint}</p>
                    <code style="color:#00d4ff; font-size:0.8rem; display:block; margin-top:5px;">
                        ${trace.command.cmd}
                    </code>
                </div>
                
                <!-- Input -->
                <input type="text" id="trace-input" 
                    placeholder="${trace.command.prompt}" 
                    style="width:100%; padding:15px; font-size:1.2rem; background:#000; color:#00ff41; border:2px solid #ff3333; border-radius:10px; text-align:center; font-family:monospace;"
                    autofocus>
                
                <p style="color:#ff4444; font-size:0.8rem; margin-top:10px;">
                    ⚠️ كل خطأ = -${trace.penalty} ثواني!
                </p>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Handle input
        setTimeout(() => {
            const input = document.getElementById('trace-input');
            if (input) {
                input.focus();
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.checkTraceAnswer(input.value.trim());
                        input.value = '';
                    }
                });
            }
        }, 500);
    }
    
    checkTraceAnswer(answer) {
        const trace = this.activeTrace;
        if (!trace || trace.solved || trace.failed) return;
        
        if (answer.toLowerCase() === trace.command.answer.toLowerCase()) {
            // SUCCESS!
            trace.solved = true;
            this.stopTrace();
            this.showTraceResult(true);
            
            if (trace.onSuccess) trace.onSuccess();
            
            // Visual celebration
            if (window.CyberMind) {
                window.CyberMind.showVisualEffect('explosion');
                window.CyberMind.showSuccessMessage();
            }
            
            // Reward
            const reward = trace.difficulty * 100;
            this.showFloatingXP(reward);
            
        } else {
            // Wrong answer - penalty
            trace.timeLeft = Math.max(0, trace.timeLeft - trace.penalty);
            
            // Shake effect
            const overlay = document.getElementById('trace-overlay');
            if (overlay) {
                overlay.style.animation = 'none';
                overlay.offsetHeight;
                overlay.style.animation = 'shake 0.5s';
            }
            
            // Update timer display
            const timer = document.getElementById('trace-timer');
            if (timer) {
                timer.textContent = '⏰ ' + trace.timeLeft;
                timer.style.color = '#ff3333';
                setTimeout(() => { timer.style.color = '#00ff41'; }, 300);
            }
            
            // Glitch Bot response
            if (window.CyberMind) {
                window.CyberMind.triggerGlitchBot(answer);
            }
        }
    }
    
    startTraceCountdown() {
        const trace = this.activeTrace;
        if (!trace) return;
        
        trace.interval = setInterval(() => {
            trace.timeLeft--;
            
            const timer = document.getElementById('trace-timer');
            const bar = document.getElementById('trace-bar');
            
            if (timer) {
                timer.textContent = '⏰ ' + trace.timeLeft;
                
                // Change color when low
                if (trace.timeLeft <= 5) {
                    timer.style.color = '#ff3333';
                    timer.style.animation = 'alarmPulse 0.3s infinite';
                } else if (trace.timeLeft <= 10) {
                    timer.style.color = '#ffd700';
                }
            }
            
            if (bar) {
                const percent = (trace.timeLeft / trace.maxTime) * 100;
                bar.style.width = percent + '%';
            }
            
            // Time's up!
            if (trace.timeLeft <= 0) {
                this.stopTrace();
                this.showTraceResult(false);
                
                if (trace.onFail) trace.onFail();
            }
        }, 1000);
    }
    
    stopTrace() {
        if (this.activeTrace && this.activeTrace.interval) {
            clearInterval(this.activeTrace.interval);
        }
    }
    
    showTraceResult(success) {
        const overlay = document.getElementById('trace-overlay');
        if (!overlay) return;
        
        setTimeout(() => {
            overlay.innerHTML = success ? `
                <div style="text-align:center; animation:popIn 0.5s ease-out;">
                    <div style="font-size:6rem;">🎉</div>
                    <h2 style="color:#00ff41; font-family:monospace; font-size:2rem;">TRACE BLOCKED!</h2>
                    <p style="color:#ffd700; font-size:1.2rem;">تم إخفاء أثرك بنجاح!</p>
                    <p style="color:#00d4ff;">+${this.activeTrace.difficulty * 100} XP</p>
                </div>
            ` : `
                <div style="text-align:center; animation:popIn 0.5s ease-out;">
                    <div style="font-size:6rem;">💀</div>
                    <h2 style="color:#ff3333; font-family:monospace; font-size:2rem;">TRACED!</h2>
                    <p style="color:#ff4444; font-size:1.2rem;">تم تحديد موقعك! فقدت بعض البيانات...</p>
                    <p style="color:#ffd700;">-50 XP</p>
                </div>
            `;
            
            setTimeout(() => {
                overlay.style.animation = 'fadeOut 0.5s forwards';
                setTimeout(() => overlay.remove(), 500);
                this.activeTrace = null;
            }, 2000);
            
        }, 500);
    }
    
    showFloatingXP(amount) {
        const xp = document.createElement('div');
        xp.textContent = `+${amount} XP ⚡`;
        xp.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ffd700;
            font-size: 3rem;
            font-weight: 900;
            z-index: 100000;
            pointer-events: none;
            animation: xpFloat 2s ease-out forwards;
            text-shadow: 0 0 30px #ffd700;
        `;
        document.body.appendChild(xp);
        setTimeout(() => xp.remove(), 2000);
    }
    
    // ═══════════════════════════════════════════════════
    // 2️⃣ RANSOMWARE ALERTS (الابتزاز الرقمي)
    // ═══════════════════════════════════════════════════
    triggerRansomware() {
        const alerts = [
            {
                title: '🚨 ابتزاز رقمي!',
                msg: 'منظمة PHANTOM قامت بتشفير محطة الطاقة!\nاكتب: decrypt --force --key CYBER',
                answer: 'decrypt --force --key CYBER',
                reward: '🛡️ وسام منقذ المدينة',
                xp: 500
            },
            {
                title: '🔥 حريق في الداتا سنتر!',
                msg: 'تم اكتشاف فيروس! اكتب أمر العزل:\nisolate --sector 7 --protocol omega',
                answer: 'isolate --sector 7 --protocol omega',
                reward: '🧯 وسام رجل الإطفاء الرقمي',
                xp: 400
            },
            {
                title: '👻Ghost in the Shell!',
                msg: 'هاكر مجهول اخترق دفاعاتك!\nاكتب: trace --ip 10.0.0.99 --block',
                answer: 'trace --ip 10.0.0.99 --block',
                reward: '👻 وسام صائد الأشباح',
                xp: 600
            }
        ];
        
        const alert = alerts[Math.floor(Math.random() * alerts.length)];
        
        this.createRansomwareUI(alert);
    }
    
    createRansomwareUI(alert) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: glitchEnter 0.5s;
        `;
        
        overlay.innerHTML = `
            <div style="text-align:center; max-width:500px; width:90%; background:#0a0a0a; border:3px solid #ff3333; border-radius:20px; padding:30px;">
                <div style="font-size:4rem; animation: alarmPulse 0.3s infinite;">🔴</div>
                <h2 style="color:#ff3333; font-size:1.5rem; margin:10px 0;">${alert.title}</h2>
                <p style="color:#fff; font-size:1rem; white-space:pre-line; margin:15px 0;">${alert.msg}</p>
                <p style="color:#ffd700; font-size:0.8rem;">⏰ لديك 60 ثانية!</p>
                <input type="text" id="ransomware-input" 
                    placeholder="اكتب الأمر..." 
                    style="width:100%; padding:15px; font-size:1.2rem; background:#000; color:#ff3333; border:2px solid #ff3333; border-radius:10px; text-align:center; font-family:monospace; margin:10px 0;"
                    autofocus>
                <p style="color:#ff4444; font-size:0.7rem;">⚠️ الفشل = خسارة 50% من الرصيد!</p>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        let timeLeft = 60;
        const timer = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timer);
                overlay.remove();
                this.showFloatingXP(-250);
            }
        }, 1000);
        
        setTimeout(() => {
            const input = document.getElementById('ransomware-input');
            if (input) {
                input.focus();
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        clearInterval(timer);
                        if (input.value.trim().toLowerCase() === alert.answer.toLowerCase()) {
                            overlay.innerHTML = `
                                <div style="text-align:center; animation:popIn 0.5s;">
                                    <div style="font-size:5rem;">🏆</div>
                                    <h2 style="color:#ffd700;">${alert.reward}</h2>
                                    <p style="color:#00ff41;">+${alert.xp} XP</p>
                                </div>
                            `;
                            this.showFloatingXP(alert.xp);
                        } else {
                            overlay.remove();
                            this.showFloatingXP(-250);
                        }
                        setTimeout(() => overlay.remove(), 2000);
                    }
                });
            }
        }, 500);
    }
    
    // ═══════════════════════════════════════════════════
    // 3️⃣ STEALTH / GHOST MODE
    // ═══════════════════════════════════════════════════
    createStealthButton() {
        const btn = document.createElement('button');
        btn.id = 'stealth-mode-btn';
        btn.textContent = '👻';
        btn.title = 'وضع التخفي';
        btn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0,0,0,0.8);
            border: 2px solid #00d4ff;
            color: #00d4ff;
            padding: 10px 15px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 9998;
            transition: all 0.3s;
        `;
        
        btn.addEventListener('click', () => this.toggleStealth());
        document.body.appendChild(btn);
    }
    
    toggleStealth() {
        this.stealthMode = !this.stealthMode;
        const btn = document.getElementById('stealth-mode-btn');
        
        if (this.stealthMode) {
            btn.style.borderColor = '#ffd700';
            btn.style.color = '#ffd700';
            btn.style.boxShadow = '0 0 20px rgba(255,215,0,0.5)';
            this.activateStealth();
        } else {
            btn.style.borderColor = '#00d4ff';
            btn.style.color = '#00d4ff';
            btn.style.boxShadow = 'none';
            this.deactivateStealth();
        }
    }
    
    activateStealth() {
        document.body.style.filter = 'brightness(0.7) hue-rotate(180deg)';
        this.stealthDuration = 30; // 30 seconds
        
        const indicator = document.createElement('div');
        indicator.id = 'stealth-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            border: 2px solid #ffd700;
            color: #ffd700;
            padding: 8px 20px;
            border-radius: 20px;
            z-index: 9999;
            font-family: monospace;
            font-size: 0.9rem;
        `;
        indicator.textContent = '👻 STEALTH ACTIVE - 30s';
        document.body.appendChild(indicator);
        
        this.stealthTimer = setInterval(() => {
            this.stealthDuration--;
            const ind = document.getElementById('stealth-indicator');
            if (ind) {
                ind.textContent = '👻 STEALTH ACTIVE - ' + this.stealthDuration + 's';
            }
            if (this.stealthDuration <= 0) {
                this.toggleStealth();
            }
        }, 1000);
    }
    
    deactivateStealth() {
        document.body.style.filter = 'none';
        const ind = document.getElementById('stealth-indicator');
        if (ind) ind.remove();
        if (this.stealthTimer) clearInterval(this.stealthTimer);
    }
    
    // ═══════════════════════════════════════════════════
    // RANDOM EVENTS
    // ═══════════════════════════════════════════════════
    startRandomEvents() {
        this.randomEventTimer = setInterval(() => {
            const roll = Math.random();
            
            if (roll < 0.15) {
                // 15% chance - Ransomware alert
                this.triggerRansomware();
            } else if (roll < 0.3 && !this.activeTrace) {
                // 15% chance - Trace (if not already tracing)
                this.startTrace(Math.floor(Math.random() * 3) + 1);
            }
        }, 120000); // Every 2 minutes
    }
    
    playTraceSound() {
        try {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            // Create ticking sound
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'square';
            gainNode.gain.value = 0.1;
            
            oscillator.start();
            
            setTimeout(() => {
                oscillator.stop();
            }, 200);
            
        } catch(e) {
            // Audio not supported
        }
    }
}

// CSS
const survivalStyle = document.createElement('style');
survivalStyle.textContent = `
    @keyframes traceEnter {
        0% { opacity: 0; background: rgba(255,0,0,0.5); }
        100% { opacity: 1; background: rgba(0,0,0,0.85); }
    }
    
    @keyframes alarmPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes glitchEnter {
        0% { transform: translateX(-100%); opacity: 0; }
        50% { transform: translateX(20px); opacity: 0.8; }
        100% { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes xpFloat {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        50% { transform: translate(-50%, -80%) scale(1.5); opacity: 1; }
        100% { transform: translate(-50%, -150%) scale(1); opacity: 0; }
    }
    
    @keyframes fadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(survivalStyle);

// Initialize
window.CyberSurvival = new CyberSurvival();
console.log('⚡ Cyber Survival Mechanics loaded');
