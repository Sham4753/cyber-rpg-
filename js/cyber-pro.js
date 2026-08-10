/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           CYBER PRO ENGINE - CTF + SOC                      ║
 * ║           1. Mini-CTF Labs (Capture The Flag)                ║
 * ║           2. SOC Dashboard (Security Operations Center)      ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

class CyberPro {
    constructor() {
        this.ctfChallenges = [];
        this.socAlerts = [];
        this.playerRank = 'Script Kiddie';
        this.solvedFlags = 0;
        
        this.init();
    }
    
    init() {
        console.log('🏆 Cyber Pro Engine loaded');
        this.generateCTFChallenges();
        this.startSOCSimulation();
        this.createProButton();
    }
    
    // ═══════════════════════════════════════════════════
    // 1️⃣ MINI-CTF LABS
    // ═══════════════════════════════════════════════════
    generateCTFChallenges() {
        this.ctfChallenges = [
            {
                id: 'ctf-1',
                title: '🔐 فك تشفير Base64',
                difficulty: 1,
                category: 'Cryptography',
                description: 'تم اعتراض رسالة مشفرة. فك تشفير Base64 للحصول على العلم!',
                encodedData: 'Q1lCRVJ7QkFTRTY0X01BU1RFUn0=',
                hint: 'استخدم atob() في JavaScript أو base64 -d في Linux',
                flag: 'CYBER{BASE64_MASTER}',
                xp: 100,
                solved: false
            },
            {
                id: 'ctf-2',
                title: '🔢 تحويل Hex إلى نص',
                difficulty: 1,
                category: 'Encoding',
                description: 'النص التالي مشفر بـ Hexadecimal. حوله إلى نص!',
                encodedData: '43594245527b4845585f4841434b45527d',
                hint: 'كل رقمين hex = حرف واحد. استخدم xxd -r -p',
                flag: 'CYBER{HEX_HACKER}',
                xp: 150,
                solved: false
            },
            {
                id: 'ctf-3',
                title: '🔓 كلمة مرور مخفية في HTML',
                difficulty: 2,
                category: 'Web Security',
                description: 'في صفحة الويب التالية، هناك كلمة مرور مخفية في تعليق HTML. جدها!',
                htmlSnippet: `
                    <form>
                        <input type="password" name="pass">
                        <!-- TODO: Remove this - password: CYBER{HTML_COMMENT} -->
                        <button>Login</button>
                    </form>
                `,
                hint: 'افحص الكود المصدري (View Source) وابحث عن التعليقات!',
                flag: 'CYBER{HTML_COMMENT}',
                xp: 200,
                solved: false
            },
            {
                id: 'ctf-4',
                title: '🐍 ثغرة SQL Injection بسيطة',
                difficulty: 2,
                category: 'Web Security',
                description: 'تجاوز تسجيل الدخول باستخدام SQL Injection!',
                queryHint: "SELECT * FROM users WHERE username='admin' AND password='' OR '1'='1'",
                hint: "جرب: ' OR '1'='1 --",
                flag: 'CYBER{SQL_INJECTION}',
                xp: 300,
                solved: false
            },
            {
                id: 'ctf-5',
                title: '🔑 تخمين مفتاح XOR',
                difficulty: 3,
                category: 'Cryptography',
                description: 'تم تشفير العلم بـ XOR بمفتاح حرف واحد. فكه!',
                encodedData: '43594245527b584f525f435241434b45447d',
                encryptedHex: '060f1d1a1e007c0f0c181c001b18100f18091c7d',
                hint: 'المفتاح هو: 0x55 (حرف U). جرب XOR كل بايت مع المفتاح.',
                flag: 'CYBER{XOR_CRACKED}',
                xp: 500,
                solved: false
            },
            {
                id: 'ctf-6',
                title: '📡 اعتراض طلب HTTP',
                difficulty: 3,
                category: 'Network',
                description: 'في طلب HTTP التالي، هناك Cookie تحتوي على العلم!',
                httpRequest: `
                    GET /admin HTTP/1.1
                    Host: target.com
                    Cookie: session=abc123; flag=CYBER%7BCOOKIE_MONSTER%7D
                    User-Agent: Mozilla/5.0
                `,
                hint: 'فك URL decode للـ Cookie! %7B = {',
                flag: 'CYBER{COOKIE_MONSTER}',
                xp: 400,
                solved: false
            },
            {
                id: 'ctf-7',
                title: '🗜️ ضغط ZIP بكلمة سر',
                difficulty: 4,
                category: 'Forensics',
                description: 'ملف ZIP محمي بكلمة سر. استخدم هجوم القاموس!',
                wordlist: ['admin', 'password', 'cyber', '123456', 'phantom', 'secret'],
                passwordHint: 'الكلمة هي اسم العدو الرئيسي...',
                flag: 'CYBER{ZIP_CRACKER}',
                xp: 600,
                solved: false,
                correctPassword: 'phantom'
            },
            {
                id: 'ctf-8',
                title: '🤖 تحليل سجلات (Log Analysis)',
                difficulty: 4,
                category: 'Forensics',
                description: 'في السجلات التالية، ابحث عن عنوان IP المشبوه الذي حاول تسجيل الدخول 5 مرات!',
                logs: `
                    [2024-01-15 10:00] Login attempt: admin from 192.168.1.1 - FAILED
                    [2024-01-15 10:01] Login attempt: admin from 10.0.0.55 - FAILED
                    [2024-01-15 10:02] Login attempt: admin from 10.0.0.55 - FAILED
                    [2024-01-15 10:03] Login attempt: admin from 10.0.0.55 - FAILED
                    [2024-01-15 10:04] Login attempt: admin from 192.168.1.1 - FAILED
                    [2024-01-15 10:05] Login attempt: admin from 10.0.0.55 - FAILED
                    [2024-01-15 10:06] Login attempt: admin from 10.0.0.55 - SUCCESS
                `,
                hint: 'عدّ محاولات كل IP. العلم هو IP المشبوه!',
                flag: 'CYBER{10.0.0.55}',
                xp: 500,
                solved: false
            }
        ];
    }
    
    openCTFLab() {
        const overlay = document.createElement('div');
        overlay.id = 'ctf-lab-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.95);
            z-index: 99999;
            overflow-y: auto;
            padding: 20px;
        `;
        
        let challengesHTML = this.ctfChallenges.map((ch, i) => `
            <div style="background:rgba(0,0,0,0.5); border:1px solid ${ch.solved ? '#00ff41' : '#ffd700'}; border-radius:15px; padding:20px; margin:15px 0; cursor:pointer;"
                 onclick="window.CyberPro.selectChallenge('${ch.id}')">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <span style="font-size:1.5rem;">${ch.solved ? '✅' : '🔒'}</span>
                        <strong style="color:#ffd700; font-size:1.1rem;">${ch.title}</strong>
                    </div>
                    <span style="background:rgba(0,255,65,0.2); padding:5px 15px; border-radius:20px; font-size:0.8rem;">
                        ${ch.category} | ⭐${ch.difficulty} | 💎${ch.xp}XP
                    </span>
                </div>
                <p style="color:#aaa; margin-top:10px; font-size:0.9rem;">${ch.description}</p>
            </div>
        `).join('');
        
        overlay.innerHTML = `
            <div style="max-width:100%; margin:0 auto;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <h2 style="color:#00ff41;">🏆 مختبر CTF - Capture The Flag</h2>
                    <button onclick="document.getElementById('ctf-lab-overlay').remove()" 
                        style="background:transparent; border:2px solid #ff3333; color:#ff3333; padding:10px 20px; border-radius:10px; cursor:pointer; font-size:1rem;">
                        ✕ إغلاق
                    </button>
                </div>
                <div style="background:rgba(0,255,65,0.1); padding:15px; border-radius:10px; margin-bottom:20px; text-align:center;">
                    <p style="color:#ffd700;">🏅 الأعلام المحلولة: ${this.solvedFlags}/${this.ctfChallenges.length}</p>
                    <p style="color:#00d4ff;">الرتبة: ${this.playerRank}</p>
                </div>
                ${challengesHTML}
            </div>
        `;
        
        document.body.appendChild(overlay);
    }
    
    selectChallenge(challengeId) {
        const challenge = this.ctfChallenges.find(c => c.id === challengeId);
        if (!challenge) return;
        
        const overlay = document.getElementById('ctf-lab-overlay');
        if (!overlay) return;
        
        overlay.innerHTML = `
            <div style="max-width:100%; margin:0 auto;">
                <button onclick="window.CyberPro.openCTFLab()" 
                    style="background:transparent; border:2px solid #ffd700; color:#ffd700; padding:10px 20px; border-radius:10px; cursor:pointer; margin-bottom:20px;">
                    ⬅️ العودة للتحديات
                </button>
                
                <div style="background:rgba(0,0,0,0.5); border:2px solid #00ff41; border-radius:20px; padding:30px;">
                    <h2 style="color:#00ff41;">${challenge.title}</h2>
                    <p style="color:#ffd700;">📂 ${challenge.category} | ⭐ ${challenge.difficulty} | 💎 ${challenge.xp}XP</p>
                    <p style="color:#fff; margin:15px 0; line-height:1.8;">${challenge.description}</p>
                    
                    ${challenge.htmlSnippet ? `
                        <div style="background:#1a1a2e; padding:20px; border-radius:10px; margin:15px 0; font-family:monospace; color:#00d4ff; white-space:pre-wrap; overflow-x:auto;">
                            ${challenge.htmlSnippet}
                        </div>
                    ` : ''}
                    
                    ${challenge.httpRequest ? `
                        <div style="background:#1a1a2e; padding:20px; border-radius:10px; margin:15px 0; font-family:monospace; color:#00d4ff; white-space:pre-wrap; overflow-x:auto;">
                            ${challenge.httpRequest}
                        </div>
                    ` : ''}
                    
                    ${challenge.logs ? `
                        <div style="background:#1a1a2e; padding:20px; border-radius:10px; margin:15px 0; font-family:monospace; color:#aaa; white-space:pre-wrap; overflow-x:auto; font-size:0.8rem;">
                            ${challenge.logs}
                        </div>
                    ` : ''}
                    
                    ${challenge.encodedData ? `
                        <div style="background:#000; padding:20px; border-radius:10px; margin:15px 0; font-family:monospace; color:#ffd700; text-align:center; font-size:1.2rem; word-break:break-all;">
                            ${challenge.encodedData}
                        </div>
                    ` : ''}
                    
                    ${challenge.encryptedHex ? `
                        <div style="background:#000; padding:20px; border-radius:10px; margin:15px 0; font-family:monospace; color:#ffd700; text-align:center; font-size:1rem; word-break:break-all;">
                            ${challenge.encryptedHex}
                        </div>
                    ` : ''}
                    
                    ${challenge.wordlist ? `
                        <div style="background:#1a1a2e; padding:15px; border-radius:10px; margin:15px 0;">
                            <p style="color:#ffd700;">📚 قاموس الكلمات:</p>
                            <code style="color:#00d4ff;">${challenge.wordlist.join(', ')}</code>
                        </div>
                    ` : ''}
                    
                    <div style="background:rgba(255,215,0,0.1); padding:15px; border-radius:10px; margin:15px 0; border:1px dashed #ffd700;">
                        <p style="color:#ffd700;">💡 ${challenge.hint}</p>
                    </div>
                    
                    ${challenge.solved ? `
                        <div style="text-align:center; padding:20px; background:rgba(0,255,65,0.1); border-radius:10px;">
                            <p style="color:#00ff41; font-size:1.5rem;">✅ تم الحل!</p>
                            <p style="color:#ffd700;">العلم: ${challenge.flag}</p>
                        </div>
                    ` : `
                        <div style="text-align:center;">
                            <input type="text" id="ctf-flag-input" 
                                placeholder="أدخل العلم: CYBER{...}" 
                                style="width:100%; padding:15px; font-size:1.1rem; background:#000; color:#00ff41; border:2px solid #ffd700; border-radius:10px; text-align:center; font-family:monospace;">
                            <button onclick="window.CyberPro.submitFlag('${challenge.id}')" 
                                style="margin-top:15px; background:linear-gradient(135deg, #00ff41, #00d4ff); color:#000; border:none; padding:15px 40px; border-radius:10px; font-size:1.1rem; font-weight:bold; cursor:pointer;">
                                🚀 تقديم العلم
                            </button>
                        </div>
                    `}
                </div>
            </div>
        `;
    }
    
    submitFlag(challengeId) {
        const input = document.getElementById('ctf-flag-input');
        if (!input) return;
        
        const submittedFlag = input.value.trim();
        const challenge = this.ctfChallenges.find(c => c.id === challengeId);
        
        if (!challenge) return;
        
        if (submittedFlag.toUpperCase() === challenge.flag.toUpperCase()) {
            challenge.solved = true;
            this.solvedFlags++;
            
            // Show celebration
            if (window.CyberMind) {
                window.CyberMind.showVisualEffect('explosion');
                window.CyberMind.showVisualEffect('loot');
                window.CyberMind.showFloatingMessage(`🎉 ${challenge.flag} - +${challenge.xp}XP!`);
            }
            
            // Update rank
            this.updateRank();
            
            // Save progress
            if (window.SaveSystem) {
                window.SaveSystem.save('ctf_' + challengeId, { xp: challenge.xp });
            }
            
            // Refresh
            this.selectChallenge(challengeId);
            
        } else {
            input.style.borderColor = '#ff3333';
            input.style.animation = 'shake 0.5s';
            setTimeout(() => {
                input.style.borderColor = '#ffd700';
                input.style.animation = '';
            }, 1000);
            
            if (window.CyberMind) {
                window.CyberMind.triggerGlitchBot(submittedFlag);
            }
        }
    }
    
    updateRank() {
        const ranks = [
            { name: '👶 Script Kiddie', min: 0 },
            { name: '🔰 Junior Hacker', min: 1 },
            { name: '⚡ Security Analyst', min: 3 },
            { name: '🛡️ Pentester', min: 5 },
            { name: '🐉 Elite Hacker', min: 7 },
            { name: '👑 Cyber Legend', min: 8 }
        ];
        
        const rank = ranks.reverse().find(r => this.solvedFlags >= r.min);
        if (rank) this.playerRank = rank.name;
    }
    
    // ═══════════════════════════════════════════════════
    // 2️⃣ SOC DASHBOARD
    // ═══════════════════════════════════════════════════
    startSOCSimulation() {
        this.socAlerts = [
            { level: 'critical', msg: '🚨 هجوم DDoS من 50,000 جهاز!', ip: '10.0.0.0/8', action: 'block' },
            { level: 'warning', msg: '⚠️ محاولة تسجيل دخول مشبوهة', ip: '192.168.1.99', action: 'monitor' },
            { level: 'info', msg: '📡 فحص منافذ من IP خارجي', ip: '45.33.32.156', action: 'log' }
        ];
    }
    
    openSOCDashboard() {
        const overlay = document.createElement('div');
        overlay.id = 'soc-dashboard-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: #0a0a1a;
            z-index: 99999;
            overflow-y: auto;
            font-family: monospace;
        `;
        
        overlay.innerHTML = `
            <div style="display:grid; grid-template-columns:1fr 300px; height:100vh;">
                <!-- Main Content -->
                <div style="padding:20px; overflow-y:auto;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                        <h2 style="color:#00ff41;">🛡️ SOC Dashboard</h2>
                        <button onclick="document.getElementById('soc-dashboard-overlay').remove()"
                            style="background:transparent; border:2px solid #ff3333; color:#ff3333; padding:10px 20px; border-radius:10px; cursor:pointer;">
                            ✕ إغلاق
                        </button>
                    </div>
                    
                    <!-- Stats Grid -->
                    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:15px; margin-bottom:20px;">
                        <div style="background:rgba(0,255,65,0.1); border:1px solid #00ff41; border-radius:15px; padding:20px; text-align:center;">
                            <div style="font-size:2rem;">🔴</div>
                            <div style="font-size:2rem; color:#ff3333; font-weight:bold;">3</div>
                            <div style="color:#aaa; font-size:0.8rem;">تنبيهات حرجة</div>
                        </div>
                        <div style="background:rgba(255,215,0,0.1); border:1px solid #ffd700; border-radius:15px; padding:20px; text-align:center;">
                            <div style="font-size:2rem;">🟡</div>
                            <div style="font-size:2rem; color:#ffd700; font-weight:bold;">7</div>
                            <div style="color:#aaa; font-size:0.8rem;">تحذيرات</div>
                        </div>
                        <div style="background:rgba(0,212,255,0.1); border:1px solid #00d4ff; border-radius:15px; padding:20px; text-align:center;">
                            <div style="font-size:2rem;">🔵</div>
                            <div style="font-size:2rem; color:#00d4ff; font-weight:bold;">1,247</div>
                            <div style="color:#aaa; font-size:0.8rem;">أحداث/ساعة</div>
                        </div>
                    </div>
                    
                    <!-- Network Traffic Graph -->
                    <div style="background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.1); border-radius:15px; padding:20px; margin-bottom:20px;">
                        <h3 style="color:#00d4ff; margin-bottom:15px;">📊 حركة الشبكة</h3>
                        <div id="traffic-graph" style="height:200px; display:flex; align-items:end; gap:3px; padding:10px 0;">
                            ${Array.from({length:40}, () => {
                                const h = Math.random() * 100;
                                return `<div style="width:100%; height:${h}%; background:linear-gradient(180deg, #00ff41, #00d4ff); border-radius:2px; transition:height 0.5s;"></div>`;
                            }).join('')}
                        </div>
                    </div>
                    
                    <!-- Alerts Table -->
                    <div style="background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.1); border-radius:15px; padding:20px;">
                        <h3 style="color:#ffd700; margin-bottom:15px;">🚨 التنبيهات النشطة</h3>
                        ${this.socAlerts.map(alert => `
                            <div style="display:flex; justify-content:space-between; align-items:center; padding:15px; 
                                background:${alert.level==='critical'?'rgba(255,0,0,0.1)':'rgba(255,215,0,0.05)'}; 
                                border-left:4px solid ${alert.level==='critical'?'#ff3333':'#ffd700'};
                                margin-bottom:10px; border-radius:0 10px 10px 0;">
                                <div>
                                    <span style="color:${alert.level==='critical'?'#ff3333':'#ffd700'};">${alert.msg}</span>
                                    <br><small style="color:#888;">IP: ${alert.ip}</small>
                                </div>
                                <button onclick="this.parentElement.style.opacity='0.3'" 
                                    style="background:${alert.action==='block'?'#ff3333':'#ffd700'}; color:#000; border:none; padding:8px 15px; border-radius:5px; cursor:pointer; font-weight:bold;">
                                    ${alert.action === 'block' ? '🚫 حظر' : '👁️ مراقبة'}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Sidebar -->
                <div style="background:rgba(0,0,0,0.3); border-left:1px solid rgba(255,255,255,0.1); padding:20px; overflow-y:auto;">
                    <h3 style="color:#00ff41; margin-bottom:20px;">👤 المحلل</h3>
                    <div style="text-align:center; margin-bottom:20px;">
                        <div style="font-size:4rem;">🤖</div>
                        <p style="color:#00d4ff;">${this.playerRank}</p>
                        <p style="color:#ffd700;">🏆 ${this.solvedFlags} Flags</p>
                    </div>
                    
                    <div style="background:rgba(0,255,65,0.1); padding:15px; border-radius:10px; margin-bottom:15px;">
                        <h4 style="color:#00ff41;">📈 الإحصائيات</h4>
                        <p style="color:#aaa; font-size:0.8rem; margin-top:10px;">الهجمات المصدّة: 1,247</p>
                        <p style="color:#aaa; font-size:0.8rem;">التهديدات المكتشفة: 89</p>
                        <p style="color:#aaa; font-size:0.8rem;">وقت الاستجابة: 0.3s</p>
                    </div>
                    
                    <div style="background:rgba(255,215,0,0.1); padding:15px; border-radius:10px;">
                        <h4 style="color:#ffd700;">🎯 المهام اليومية</h4>
                        <p style="color:#aaa; font-size:0.8rem;">✅ تحليل 50 سجل</p>
                        <p style="color:#aaa; font-size:0.8rem;">⬜ حظر 10 IPs</p>
                        <p style="color:#aaa; font-size:0.8rem;">⬜ حل تحدي CTF</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Animate traffic graph
        setInterval(() => {
            const bars = document.querySelectorAll('#traffic-graph div');
            bars.forEach(bar => {
                bar.style.height = (Math.random() * 100) + '%';
            });
        }, 2000);
    }
    
    createProButton() {
        const btn = document.createElement('button');
        btn.textContent = '🛡️ PRO';
        btn.title = 'وضع المحترفين';
        btn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00ff41, #00d4ff);
            color: #000;
            border: none;
            padding: 12px 20px;
            border-radius: 50px;
            font-weight: 900;
            font-family: monospace;
            cursor: pointer;
            z-index: 9998;
            box-shadow: 0 0 20px rgba(0,255,65,0.5);
            animation: proPulse 2s infinite;
        `;
        
        btn.addEventListener('click', () => {
            this.showProMenu();
        });
        
        document.body.appendChild(btn);
    }
    
    showProMenu() {
        const menu = document.createElement('div');
        menu.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: rgba(0,0,0,0.9);
            border: 2px solid #00ff41;
            border-radius: 15px;
            padding: 15px;
            z-index: 9999;
            font-family: monospace;
        `;
        
        menu.innerHTML = `
            <button onclick="window.CyberPro.openCTFLab(); this.parentElement.remove();"
                style="display:block; width:100%; background:rgba(0,255,65,0.1); border:1px solid #00ff41; color:#00ff41; padding:12px 20px; border-radius:10px; margin:5px 0; cursor:pointer; text-align:right;">
                🏆 مختبر CTF
            </button>
            <button onclick="window.CyberPro.openSOCDashboard(); this.parentElement.remove();"
                style="display:block; width:100%; background:rgba(0,212,255,0.1); border:1px solid #00d4ff; color:#00d4ff; padding:12px 20px; border-radius:10px; margin:5px 0; cursor:pointer; text-align:right;">
                🛡️ SOC Dashboard
            </button>
        `;
        
        document.body.appendChild(menu);
        
        // Click outside to close
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!menu.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    }
}

// CSS
const proStyle = document.createElement('style');
proStyle.textContent = `
    @keyframes proPulse {
        0%, 100% { box-shadow: 0 0 20px rgba(0,255,65,0.5); }
        50% { box-shadow: 0 0 40px rgba(0,255,65,0.8), 0 0 60px rgba(0,212,255,0.5); }
    }
`;
document.head.appendChild(proStyle);

// Initialize
window.CyberPro = new CyberPro();
console.log('🏆 Cyber Pro Engine loaded');
