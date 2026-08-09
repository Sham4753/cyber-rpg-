/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           CYBER RPG ENGINE v3.0 - Addiction Loop            ║
 * ║     Dynamic Difficulty | Curiosity Gaps | Dopamine Hooks     ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const CyberEngine = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════
    // STATE MANAGEMENT
    // ═══════════════════════════════════════════════════════════
    const DEFAULT_STATE = {
        xp: 0,
        level: 1,
        rank: 'Script Kiddie',
        mode: 'KIDS',
        streak: 0,
        lastPlayDate: null,
        toolsCollected: [],
        completedLevels: [],
        performanceHistory: [],
        currentSession: {
            startTime: null,
            attempts: 0,
            hintsUsed: 0,
            mistakes: 0
        },
        storyProgress: {},
        dailyRewardClaimed: false,
        lives: 3,
        totalPlayTime: 0,
        perfectRuns: 0
    };

    const RANKS = [
        { name: 'Script Kiddie', minXP: 0, icon: '👶', color: '#00ff41' },
        { name: 'Pentester Padawan', minXP: 300, icon: '🥷', color: '#00d4ff' },
        { name: 'Security Analyst', minXP: 800, icon: '🕵️', color: '#ff00ff' },
        { name: 'Red Team Operator', minXP: 1500, icon: '🔴', color: '#ff3333' },
        { name: 'Elite Hacker', minXP: 2500, icon: '👑', color: '#ffd700' },
        { name: 'Cyber Legend', minXP: 4000, icon: '⚡', color: '#ff6600' }
    ];

    const TOOLS = [
        { id: 'terminal_shard', name: 'شظية التيرمنال', level: 1, icon: '💻', desc: 'جزء من وحدة تحكم المستقبل' },
        { id: 'crypto_wheel', name: 'عجلة التشفير', level: 2, icon: '🔮', desc: 'آلية فك الشفرات القديمة' },
        { id: 'firewall_core', name: 'نواة الجدار الناري', level: 3, icon: '🛡️', desc: 'قلب الدفاع السيبراني' },
        { id: 'port_scanner', name: 'ماسح المنافذ', level: 4, icon: '🔍', desc: 'عين ترى كل ثغرة' },
        { id: 'function_blade', name: 'شفرة الدالة', level: 5, icon: '⚔️', desc: 'سلاح البرمجة المتقدمة' },
        { id: 'exploit_dragon', name: 'تنين الاستغلال', level: 6, icon: '🐉', desc: 'السلاح النهائي - يحتاج 5 أجزاء أخرى' }
    ];

    // ═══════════════════════════════════════════════════════════
    // STORY ENGINE - نظام القصص السينمائية
    // ═══════════════════════════════════════════════════════════
    const STORIES = {
        intro: {
            1: {
                title: '🌃 البداية: استيقاظ في الظلام',
                scenes: [
                    { text: 'الساعة 03:47 صباحاً... تستيقظ على صوت تنبيه إنذار أحمر يومض على شاشتك.', delay: 800 },
                    { text: 'رسالة مشفرة تصل: "Agent... لقد اخترقوا الشبكة الرئيسية. نحتاجك الآن."', delay: 1600 },
                    { text: '🔓 المهمة الأولى: اخترق الباب الإلكتروني باستخدام أوامر Linux الأساسية.', delay: 2400 }
                ]
            },
            2: {
                title: '📡 اكتشاف مُرسل الرسالة',
                scenes: [
                    { text: 'بعد اختراق الباب الأول... تجد ملفاً غامضاً مُوقّع باسم "PHANTOM".', delay: 800 },
                    { text: 'الملف مشفر بتشفير قيصري قديم... لكنه يحتوي على إحداثيات غامضة.', delay: 1600 },
                    { text: '📊 المهمة: استخدم Python لفك الشفرة وكشف الموقع المخفي.', delay: 2400 }
                ]
            },
            3: {
                title: '🛡️ جدار النار: الخطوة الأولى للدفاع',
                scenes: [
                    { text: 'الإحداثيات تقودك إلى خادم محمي بجدار ناري ذكي يتكيف مع كل محاولة.', delay: 800 },
                    { text: 'تكتشف أن PHANTOM ليس مخترقاً واحداً... إنه جيش كامل!', delay: 1600 },
                    { text: '🛡️ المهمة: اكتب شروط If/Else لتجاوز دفاعاتهم واحداً تلو الآخر.', delay: 2400 }
                ]
            },
            4: {
                title: '🔍 سكانر المنافذ: رؤية ما لا يرى',
                scenes: [
                    { text: 'اجتزت الجدار الناري... لكن أمامك 65,535 منفذاً مغلقاً.', delay: 800 },
                    { text: 'أحدها يحتوي على "الباب الخلفي" لشبكة PHANTOM. لكن أي منها؟', delay: 1600 },
                    { text: '🔄 المهمة: استخدم حلقات For/While لفحص المنافذ وإيجاد الثغرة.', delay: 2400 }
                ]
            },
            5: {
                title: '⚔️ تجميع الأدوات: الاستعداد للمعركة',
                scenes: [
                    { text: 'وجدت الباب الخلفي! لكنه محمي بـ 7 طبقات من التشفير الديناميكي.', delay: 800 },
                    { text: 'تحتاج لبناء "أداة الاختراق المتعددة" من الأجزاء التي جمعتها.', delay: 1600 },
                    { text: '🔧 المهمة: اكتب دوال Python متقدمة لتجميع الأداة النهائية.', delay: 2400 }
                ]
            },
            6: {
                title: '🐉 التنين النهائي: مواجهة PHANTOM',
                scenes: [
                    { text: 'الأداة جاهزة. الشبكة تهتز. PHANTOM يعرف أنك قادم.', delay: 800 },
                    { text: 'تظهر على الشاشة: "أهلاً Agent... لقد كنتُ أنتظر هذه اللحظة منذ سنوات."', delay: 1600 },
                    { text: '🐉 المهمة النهائية: استخدم كل ما تعلمته لإيقاف PHANTOM إلى الأبد!', delay: 2400 }
                ]
            }
        },
            7: {
                title: '🧠 ذاكرة PHANTOM: المفتاح المفقود',
                scenes: [
                    { text: 'بعد هزيمة PHANTOM... اكتشفت شريحة ذاكرة مخفية في خادمه.', delay: 800 },
                    { text: 'البيانات مشتتة! قوائم مبعثرة وقواميس مشفرة في كل مكان.', delay: 1600 },
                    { text: '📦 المهمة: استخدم Lists و Dictionaries لترتيب البيانات وكشف الحقيقة.', delay: 2400 }
                ]
            },
            8: {
                title: '📁 عملية السرقة: ملفات OMEGA',
                scenes: [
                    { text: 'بعد اكتشاف Sector 7... وجدت خادماً فرعياً يحتوي على ملفات OMEGA.', delay: 800 },
                    { text: 'الملفات مشفرة ومحمية، لكنك تعلمت كيف تتعامل معها في Python.', delay: 1600 },
                    { text: '📁 المهمة: اخترق نظام الملفات واسرق config.bak قبل أن يكتشفك OMEGA!', delay: 2400 }
                ]
            },
            9: {
                title: '👁️ عين الصقر: رؤية الأنماط المخفية',
                scenes: [
                    { text: 'Sector 7 يحتوي على ملايين السجلات... كيف نجد الإبرة في الكومة؟', delay: 800 },
                    { text: 'الجواب: Regular Expressions! عين الصقر التي ترى كل نمط.', delay: 1600 },
                    { text: '👁️ المهمة: استخدم Regex لاستخراج أسرار OMEGA من بحر البيانات!', delay: 2400 }
                ]
            },
            10: {
                title: '🌐 بوابة OMEGA: اختراق الخوادم',
                scenes: [
                    { text: 'Sector 7 يحتوي على خوادم متصلة بالعالم الخارجي...', delay: 800 },
                    { text: 'OMEGA يستخدم APIs للتحكم في شبكته. إذا استطعنا فهمها...', delay: 1600 },
                    { text: '🌐 المهمة: اخترق API OMEGA واستخرج البيانات قبل أن يُغلق الباب!', delay: 2400 }
                ]
            },
            11: {
                title: '🕷️ العنكبوت: قراءة ما لا يُقرأ',
                scenes: [
                    { text: 'OMEGA_CORP لديها موقع ويب عام... يظنون أنه آمن.', delay: 800 },
                    { text: 'لكن العنكبوت (Web Scraper) يستطيع قراءة كل شيء مخفي في HTML.', delay: 1600 },
                    { text: '🕷️ المهمة: استخدم BeautifulSoup لاستخراج أسرارهم من الموقع!', delay: 2400 }
                ]
            },
        cliffhanger: {
            1: {
                title: '⚠️ تحذير: ملف سري مكتشف!',
                scenes: [
                    { text: '✅ الباب الأول مفتوح! لكن...', delay: 500 },
                    { text: '💀 ظهر تحذير أحمر: "ملف سري محمي بكلمة سر في الغرفة المجاورة"', delay: 1200 },
                    { text: '❓ من وضع هذا الملف؟ ولماذا يحمل توقيع "PHANTOM"؟', delay: 2000 },
                    { text: '🔮 جائزة: حصلت على شظية التيرمنال! (1/6)', delay: 2800 },
                    { text: '➡️ اضغط للمتابعة...', delay: 3500 }
                ]
            },
            2: {
                title: '📍 إحداثيات غامضة',
                scenes: [
                    { text: '✅ الشفرة مكسورة! الإحداثيات تقود إلى مكان محدد...', delay: 500 },
                    { text: '📡 إشارة GPS: "المكان محمي بجدار ناري يتغير كل 30 ثانية!"', delay: 1200 },
                    { text: '❓ كيف يمكن لجدار ناري أن "يتغير"؟ ما هذه التقنية؟', delay: 2000 },
                    { text: '🔮 جائزة: حصلت على عجلة التشفير! (2/6)', delay: 2800 },
                    { text: '➡️ اضغط للمتابعة...', delay: 3500 }
                ]
            },
            3: {
                title: '👁️ العين التي تراك',
                scenes: [
                    { text: '✅ اجتزت الجدار الناري! لكن...', delay: 500 },
                    { text: '👁️ كاميرا أمنية تلتقط صورتك وتنقلها لشاشة ضخمة.', delay: 1200 },
                    { text: '❓ على الشاشة: "أهلاً يا Agent... أنا أراقبك منذ البداية."', delay: 2000 },
                    { text: '🔮 جائزة: حصلت على نواة الجدار الناري! (3/6)', delay: 2800 },
                    { text: '➡️ اضغط للمتابعة...', delay: 3500 }
                ]
            },
            4: {
                title: '🚪 الباب الخلفي',
                scenes: [
                    { text: '✅ وجدت المنفذ المفتوح! رقم 31337...', delay: 500 },
                    { text: '🚪 خلف الباب: قاعدة بيانات ضخمة تحتوي على أسماء وصور.', delay: 1200 },
                    { text: '❓ أحد الملفات يحمل اسمك الكامل... وتاريخ ميلادك... كيف؟!', delay: 2000 },
                    { text: '🔮 جائزة: حصلت على ماسح المنافذ! (4/6)', delay: 2800 },
                    { text: '➡️ اضغط للمتابعة...', delay: 3500 }
                ]
            },
            5: {
                title: '⚡ الطاقة تتجمع',
                scenes: [
                    { text: '✅ الأداة شبه جاهزة! 5 أجزاء من 6 مكتملة.', delay: 500 },
                    { text: '⚡ الطاقة تتجمع... الشاشة تومض باللون الأحمر.', delay: 1200 },
                    { text: '❓ رسالة نهائية: "لن تستطيع هزيمتي... أنا جزء منك."', delay: 2000 },
                    { text: '🔮 جائزة: حصلت على شفرة الدالة! (5/6)', delay: 2800 },
                    { text: '➡️ اضغط للمتابعة...', delay: 3500 }
                ]
            },
            11: {
                title: '📋 قائمة العملاء: كل شيء مكشوف',
                scenes: [
                    { text: '✅ استخرجت كل البيانات من موقع OMEGA_CORP!', delay: 500 },
                    { text: '📋 قائمة العملاء: OMEGA(999) | Alpha(50) | Beta(75) | Gamma(99)', delay: 1200 },
                    { text: '❓ Beta موقوف... لكنه قد يكون حليفاً محتملاً؟', delay: 2000 },
                    { text: '🔮 جائزة: حصلت على شبكة العنكبوت! (جزء سري)', delay: 2800 },
                    { text: '➡️ اضغط للمتابعة...', delay: 3500 }
                ]
            },
            10: {
                title: '🏢 OMEGA_CORP: المنظمة المكشوفة',
                scenes: [
                    { text: '✅ اخترقت API OMEGA! البيانات بين يديك!', delay: 500 },
                    { text: '🏢 المنظمة: OMEGA_CORP | المقر: Sector_7', delay: 1200 },
                    { text: '❓ المدير: "OMEGA" | الحالة: ARMED | المستوى: 999', delay: 2000 },
                    { text: '🔮 جائزة: حصلت على مفتاح API! (جزء سري)', delay: 2800 },
                    { text: '➡️ اضغط للمتابعة...', delay: 3500 }
                ]
            },
            9: {
                title: '🔑 مفتاح OMEGA: XK-99-ALPHA',
                scenes: [
                    { text: '✅ استخرجت كل الأنماط! البيانات واضحة الآن...', delay: 500 },
                    { text: '🔑 المفتاح الرئيسي: XK-99-ALPHA', delay: 1200 },
                    { text: '❓ رسالة OMEGA: "أنت جيد... لكن ليس جيداً بما يكفي."', delay: 2000 },
                    { text: '🔮 جائزة: حصلت على عين الصقر! (جزء سري)', delay: 2800 },
                    { text: '➡️ اضغط للمتابعة...', delay: 3500 }
                ]
            },
            8: {
                title: '🎯 Sector 7: الموقع المكشوف',
                scenes: [
                    { text: '✅ السرقة ناجحة! config.bak بين يديك!', delay: 500 },
                    { text: '📍 الإحداثيات: Sector 7 - المقر الرئيسي لـ OMEGA', delay: 1200 },
                    { text: '❓ على الملف الأخير: "OMEGA_STATUS=ARMED - العد التنازلي بدأ."', delay: 2000 },
                    { text: '🔮 جائزة: حصلت على مفتاح القطاع! (جزء سري)', delay: 2800 },
                    { text: '➡️ اضغط للمتابعة...', delay: 3500 }
                ]
            },
            7: {
                title: '⚠️ OMEGA: العدو الأكبر',
                scenes: [
                    { text: '✅ الذاكرة مُفككة! البيانات واضحة الآن...', delay: 500 },
                    { text: '💀 اسم ظهر: "OMEGA" — مستوى الخطر: 999', delay: 1200 },
                    { text: '❓ رسالة مشفرة: "أنا من صنعته... وأنا من سأدمره."', delay: 2000 },
                    { text: '🔮 جائزة: حصلت على مفتاح الذاكرة! (جزء سري)', delay: 2800 },
                    { text: '➡️ اضغط للمتابعة...', delay: 3500 }
                ]
            },
            6: {
                title: '🏆 الأسطورة تولد',
                scenes: [
                    { text: '✅ PHANTOM مهزوم! الشبكة آمنة مرة أخرى.', delay: 500 },
                    { text: '🏆 أنت الآن Cyber Legend! لكن...', delay: 1200 },
                    { text: '❓ رسالة مشفرة جديدة تصل: "PHANTOM كان مجرد عميل... المدير الحقيقي قادم."', delay: 2000 },
                    { text: '🔮 جائزة: تجميع تنين الاستغلال! (6/6) السلاح النهائي!', delay: 2800 },
                    { text: '🎉 تهانينا! لكن القصة لم تنتهِ بعد...', delay: 3500 }
                ]
            }
        }
    };

    // ═══════════════════════════════════════════════════════════
    // DYNAMIC DIFFICULTY SYSTEM
    // ═══════════════════════════════════════════════════════════
    const DIFFICULTY_PROFILES = {
        beginner: {
            hintDelay: 2000,
            maxHints: 5,
            xpMultiplier: 1.5,
            timeLimit: null,
            agentTone: 'encouraging',
            skipPenalty: 0
        },
        normal: {
            hintDelay: 5000,
            maxHints: 3,
            xpMultiplier: 1.0,
            timeLimit: 300,
            agentTone: 'neutral',
            skipPenalty: 10
        },
        expert: {
            hintDelay: 10000,
            maxHints: 1,
            xpMultiplier: 2.0,
            timeLimit: 180,
            agentTone: 'challenging',
            skipPenalty: 25
        }
    };

    // ═══════════════════════════════════════════════════════════
    // AGENT ZERO PERSONALITIES
    // ═══════════════════════════════════════════════════════════
    const AGENT_PERSONALITIES = {
        encouraging: {
            correct: ['🌟 رائع! دماغك يعمل بكفاءة عالية!', '💡 إجابة ممتازة! أنت تتقدم بسرعة البرق!', '🔥 هذا هو! أنت مخترق حقيقي!'],
            hint: ['💭 فكّر بالأمر هكذا...', '🤔 ما رأيك في المحاولة من زاوية أخرى؟', '💡 تلميح صغير: انظر للنمط...'],
            wrong: ['😅 أوه! لكن لا بأس، حتى الأساطير تخطئ!', '🔄 حاول مرة أخرى، أنا أثق بك!', '💪 كل خطأ هو خطوة نحو الإتقان!'],
            stuck: ['🆘 يبدو أنك تحتاج مساعدة! دعني أوضح لك...', '🤖 أنا هنا! دعني أساعدك دون أن أفسد المتعة!']
        },
        neutral: {
            correct: ['✅ صحيح.', '✅ إجابة صحيحة.', '✅ تم التحقق.'],
            hint: ['💡 تلميح:', '📌 ملاحظة:', '🔍 فكّر في:'],
            wrong: ['❌ خاطئ.', '❌ حاول مرة أخرى.', '❌ غير صحيح.'],
            stuck: ['🆘 تحتاج مساعدة؟', '🤖 هل تريد تلميحاً؟']
        },
        challenging: {
            correct: ['⚡ جيد. لكن لا تتباطأ.', '🔥 مقبول. التالي أصعب.', '💀 ليس سيئاً. استمر.'],
            hint: ['🤐 أنا لن أساعدك كثيراً...', '💀 فكّر بجدية.', '⚔️ أنت في وضع الخبير. اعتمد على نفسك.'],
            wrong: ['💀 خطأ. ركّز.', '⚠️ ضعيف. حاول مرة أخرى.', '🔴 هذا ليس مستواك.'],
            stuck: ['🤖 أنا أراقبك... هل تستسلم؟', '💀 الخبير الحقيقي لا يستسلم.']
        }
    };


    // ═══════════════════════════════════════════════════════════
    // SAFE EVAL - Secure Code Execution
    // ═══════════════════════════════════════════════════════════
    function safeEval(code, allowedCommands) {
        allowedCommands = allowedCommands || ['console', 'Math', 'Array', 'Object', 'String', 'Number', 'JSON', 'Date', 'parseInt', 'parseFloat'];
        var dangerous = ['eval', 'Function', 'document', 'window', 'localStorage', 'sessionStorage', 'fetch', 'XMLHttpRequest', 'WebSocket', 'setTimeout', 'setInterval', 'alert', 'confirm', 'prompt', 'location', 'history', 'open', 'close'];
        for (var i = 0; i < dangerous.length; i++) {
            if (code.indexOf(dangerous[i]) !== -1) {
                throw new Error('🚫 الأمر "' + dangerous[i] + '" محظور للأمان!');
            }
        }
        var sandbox = {};
        for (var i = 0; i < allowedCommands.length; i++) {
            var parts = allowedCommands[i].split('.');
            var obj = window;
            for (var j = 0; j < parts.length; j++) {
                if (obj[parts[j]]) obj = obj[parts[j]];
            }
            sandbox[parts[parts.length - 1]] = obj;
        }
        var fn = new Function(Object.keys(sandbox).join(','), '"use strict"; ' + code);
        return fn.apply(null, Object.values(sandbox));
    }

    // ═══════════════════════════════════════════════════════════
    // AUDIO ENGINE
    // ═══════════════════════════════════════════════════════════
    class AudioEngine {
        constructor() {
            this.ctx = null;
            this.initialized = false;
        }

        init() {
            if (this.initialized) return;
            try {
                this.ctx = new (window.AudioContext || window.webkitAudioContext)();
                this.initialized = true;
            } catch(e) {
                console.warn('Web Audio API not supported');
            }
        }

        playTone(freq, duration, type = 'sine', volume = 0.3) {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(volume, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        }

        success() {
            this.playTone(880, 0.1, 'sine', 0.2);
            setTimeout(() => this.playTone(1100, 0.15, 'sine', 0.2), 100);
            setTimeout(() => this.playTone(1320, 0.3, 'sine', 0.25), 200);
        }

        fail() {
            this.playTone(200, 0.3, 'sawtooth', 0.15);
            setTimeout(() => this.playTone(150, 0.4, 'sawtooth', 0.1), 150);
        }

        hack() {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    this.playTone(400 + Math.random() * 800, 0.05, 'square', 0.1);
                }, i * 80);
            }
        }

        levelUp() {
            const notes = [523, 659, 784, 1047];
            notes.forEach((freq, i) => {
                setTimeout(() => this.playTone(freq, 0.3, 'sine', 0.2), i * 150);
            });
        }

        click() {
            this.playTone(1200, 0.05, 'sine', 0.05);
        }

        type() {
            this.playTone(800 + Math.random() * 400, 0.03, 'square', 0.03);
        }
    }

    const audio = new AudioEngine();

    // ═══════════════════════════════════════════════════════════
    // STATE MANAGER
    // ═══════════════════════════════════════════════════════════
    function loadState() {
        try {
            const saved = localStorage.getItem('cyberRPG_state');
            if (saved) {
                const parsed = JSON.parse(saved);
                return { ...DEFAULT_STATE, ...parsed };
            }
        } catch(e) {
            console.warn('Storage unavailable, using defaults');
        }
        return { ...DEFAULT_STATE };
    }

    function saveState(state) {
        try {
            localStorage.setItem('cyberRPG_state', JSON.stringify(state));
        } catch(e) {
            console.warn('Storage save failed');
        }
    }

    let state = loadState();

    // ═══════════════════════════════════════════════════════════
    // STREAK SYSTEM
    // ═══════════════════════════════════════════════════════════
    function checkStreak() {
        const today = new Date().toDateString();
        const lastDate = state.lastPlayDate;

        if (!lastDate) {
            state.streak = 1;
        } else if (lastDate === today) {
            // Same day, no change
        } else {
            const last = new Date(lastDate);
            const now = new Date(today);
            const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                state.streak++;
                // Streak bonus XP
                const bonus = Math.min(state.streak * 10, 100);
                state.xp += bonus;
            } else if (diffDays > 1) {
                state.streak = 1;
            }
        }

        state.lastPlayDate = today;
        saveState(state);
        return state.streak;
    }

    // ═══════════════════════════════════════════════════════════
    // DYNAMIC DIFFICULTY CALCULATOR
    // ═══════════════════════════════════════════════════════════
    function calculateDifficulty() {
        const history = state.performanceHistory.slice(-5);
        if (history.length < 2) return 'normal';

        const avgTime = history.reduce((a, b) => a + (b.time || 0), 0) / history.length;
        const avgMistakes = history.reduce((a, b) => a + (b.mistakes || 0), 0) / history.length;

        if (avgTime < 60 && avgMistakes === 0) return 'expert';
        if (avgTime > 180 || avgMistakes > 3) return 'beginner';
        return 'normal';
    }

    function getDifficultyConfig() {
        const diff = calculateDifficulty();
        return DIFFICULTY_PROFILES[diff];
    }

    // ═══════════════════════════════════════════════════════════
    // XP & RANK SYSTEM
    // ═══════════════════════════════════════════════════════════
    function addXP(amount, reason = '') {
        const config = getDifficultyConfig();
        const finalAmount = Math.round(amount * config.xpMultiplier);
        state.xp += finalAmount;

        // Check rank up
        const newRank = RANKS.slice().reverse().find(r => state.xp >= r.minXP);
        if (newRank && newRank.name !== state.rank) {
            state.rank = newRank.name;
            audio.levelUp();
            showRankUp(newRank);
        }

        saveState(state);
        updateHUD();
        return finalAmount;
    }

    function showRankUp(rank) {
        const overlay = document.createElement('div');
        overlay.className = 'rank-up-overlay';
        overlay.innerHTML = `
            <div class="rank-up-modal">
                <div class="rank-up-icon">${rank.icon}</div>
                <h2>ترقية! 🎉</h2>
                <p>أصبحت الآن</p>
                <h1 style="color:${rank.color}">${rank.name}</h1>
                <div class="rank-up-glow"></div>
            </div>
        `;
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 4000);
    }

    function getCurrentRank() {
        return RANKS.find(r => r.name === state.rank) || RANKS[0];
    }

    // ═══════════════════════════════════════════════════════════
    // TOOL SYSTEM
    // ═══════════════════════════════════════════════════════════
    function collectTool(levelNum) {
        const tool = TOOLS.find(t => t.level === levelNum);
        if (tool && !state.toolsCollected.includes(tool.id)) {
            state.toolsCollected.push(tool.id);
            saveState(state);
            showToolUnlock(tool);
            return tool;
        }
        return null;
    }

    function showToolUnlock(tool) {
        const overlay = document.createElement('div');
        overlay.className = 'tool-unlock-overlay';
        overlay.innerHTML = `
            <div class="tool-unlock-modal">
                <div class="tool-unlock-icon">${tool.icon}</div>
                <h2>🎁 جزء جديد مكتشف!</h2>
                <h3>${tool.name}</h3>
                <p>${tool.desc}</p>
                <div class="tool-progress">${state.toolsCollected.length}/6</div>
            </div>
        `;
        document.body.appendChild(overlay);
        audio.success();
        setTimeout(() => overlay.remove(), 4000);
    }

    function isToolComplete() {
        return state.toolsCollected.length >= 6;
    }

    // ═══════════════════════════════════════════════════════════
    // STORY PLAYER
    // ═══════════════════════════════════════════════════════════
    function playStory(type, levelNum, onComplete) {
        const story = STORIES[type] && STORIES[type][levelNum];
        if (!story) {
            if (onComplete) onComplete();
            return;
        }

        const overlay = document.createElement('div');
        overlay.className = 'story-overlay';
        overlay.innerHTML = `
            <div class="story-container">
                <div class="story-scanline"></div>
                <div class="story-glitch" data-text="${story.title}">${story.title}</div>
                <div class="story-text"></div>
                <div class="story-skip">[ اضغط أي مفتاح للتخطي ]</div>
            </div>
        `;
        document.body.appendChild(overlay);
        audio.init();

        const textEl = overlay.querySelector('.story-text');
        let currentScene = 0;
        let typingInterval;
        let skipped = false;

        function typeText(text, onDone) {
            textEl.innerHTML = '';
            let i = 0;
            typingInterval = setInterval(() => {
                if (skipped) return;
                textEl.innerHTML += text.charAt(i);
                if (i % 3 === 0) audio.type();
                i++;
                if (i >= text.length) {
                    clearInterval(typingInterval);
                    if (onDone) onDone();
                }
            }, 30);
        }

        function nextScene() {
            if (currentScene >= story.scenes.length) {
                overlay.remove();
                if (onComplete) onComplete();
                return;
            }
            const scene = story.scenes[currentScene];
            setTimeout(() => {
                if (!skipped) typeText(scene.text, () => {
                    currentScene++;
                    setTimeout(nextScene, 1500);
                });
            }, scene.delay || 500);
        }

        overlay.addEventListener('click', () => {
            skipped = true;
            clearInterval(typingInterval);
            overlay.remove();
            if (onComplete) onComplete();
        });

        nextScene();
    }

    // ═══════════════════════════════════════════════════════════
    // AGENT ZERO SYSTEM
    // ═══════════════════════════════════════════════════════════
    function agentSpeak(type, customMessage = null) {
        const config = getDifficultyConfig();
        const personality = AGENT_PERSONALITIES[config.agentTone];
        const messages = personality[type] || ['...'];
        const message = customMessage || messages[Math.floor(Math.random() * messages.length)];

        const agent = document.getElementById('agent-zero');
        if (!agent) return;

        const bubble = agent.querySelector('.agent-bubble') || document.createElement('div');
        bubble.className = 'agent-bubble';
        bubble.innerHTML = message;
        agent.appendChild(bubble);

        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(10px)';
        setTimeout(() => {
            bubble.style.transition = 'all 0.3s';
            bubble.style.opacity = '1';
            bubble.style.transform = 'translateY(0)';
        }, 10);

        setTimeout(() => {
            bubble.style.opacity = '0';
            bubble.style.transform = 'translateY(10px)';
        }, 4000);
    }

    function showSmartHint(hintText, elementId) {
        const config = getDifficultyConfig();
        if (state.currentSession.hintsUsed >= config.maxHints) {
            agentSpeak('stuck', '💀 لقد استنفذت تلميحاتك! حاول بمفردك.');
            return false;
        }

        state.currentSession.hintsUsed++;
        const el = document.getElementById(elementId);
        if (el) {
            el.classList.add('hint-highlight');
            setTimeout(() => el.classList.remove('hint-highlight'), 3000);
        }

        agentSpeak('hint', `💡 ${hintText}`);
        return true;
    }

    // ═══════════════════════════════════════════════════════════
    // SESSION TRACKER
    // ═══════════════════════════════════════════════════════════
    function startSession() {
        state.currentSession = {
            startTime: Date.now(),
            attempts: 0,
            hintsUsed: 0,
            mistakes: 0
        };
    }

    function endSession(success) {
        const session = state.currentSession;
        const duration = Math.floor((Date.now() - session.startTime) / 1000);

        const record = {
            time: duration,
            attempts: session.attempts,
            hints: session.hintsUsed,
            mistakes: session.mistakes,
            success: success,
            date: new Date().toISOString()
        };

        state.performanceHistory.push(record);
        if (state.performanceHistory.length > 20) {
            state.performanceHistory.shift();
        }

        // Perfect run bonus
        if (success && session.mistakes === 0 && session.hintsUsed === 0) {
            state.perfectRuns++;
            addXP(50, 'Perfect Run Bonus');
        }

        saveState(state);
        return record;
    }

    // ═══════════════════════════════════════════════════════════
    // HUD UPDATER
    // ═══════════════════════════════════════════════════════════
    function updateHUD() {
        const rank = getCurrentRank();

        // XP Bar
        const xpEl = document.getElementById('hud-xp');
        const xpBar = document.getElementById('hud-xp-bar');
        if (xpEl) xpEl.textContent = state.xp;

        if (xpBar) {
            const nextRank = RANKS.find(r => r.minXP > state.xp);
            const prevRank = RANKS.slice().reverse().find(r => r.minXP <= state.xp);
            const minXP = prevRank ? prevRank.minXP : 0;
            const maxXP = nextRank ? nextRank.minXP : (prevRank ? prevRank.minXP + 1000 : 1000);
            const progress = Math.min(100, ((state.xp - minXP) / (maxXP - minXP)) * 100);
            xpBar.style.width = `${progress}%`;
            xpBar.style.background = `linear-gradient(90deg, ${rank.color}, ${rank.color}88)`;
        }

        // Rank
        const rankEl = document.getElementById('hud-rank');
        if (rankEl) {
            rankEl.innerHTML = `${rank.icon} ${rank.name}`;
            rankEl.style.color = rank.color;
        }

        // Level
        const levelEl = document.getElementById('hud-level');
        if (levelEl) levelEl.textContent = state.level;

        // Streak
        const streakEl = document.getElementById('hud-streak');
        if (streakEl) {
            streakEl.innerHTML = `🔥 ${state.streak}`;
            streakEl.style.display = state.streak > 1 ? 'inline-block' : 'none';
        }

        // Tools
        const toolsEl = document.getElementById('hud-tools');
        if (toolsEl) {
            toolsEl.innerHTML = TOOLS.map(t => {
                const collected = state.toolsCollected.includes(t.id);
                return `<span class="tool-icon ${collected ? 'collected' : 'locked'}" title="${t.name}">${collected ? t.icon : '🔒'}</span>`;
            }).join('');
        }

        // Mode
        const modeEl = document.getElementById('hud-mode');
        if (modeEl) modeEl.textContent = state.mode;
    }

    // ═══════════════════════════════════════════════════════════
    // MODE TOGGLE
    // ═══════════════════════════════════════════════════════════
    function toggleMode() {
        state.mode = state.mode === 'KIDS' ? 'EXPERT' : 'KIDS';
        saveState(state);
        updateHUD();
        agentSpeak('correct', `🔄 تم التبديل لوضع ${state.mode}`);
        return state.mode;
    }

    // ═══════════════════════════════════════════════════════════
    // LEVEL COMPLETION
    // ═══════════════════════════════════════════════════════════
    function completeLevel(levelNum, baseXP) {
        if (!state.completedLevels.includes(levelNum)) {
            state.completedLevels.push(levelNum);
        }
        if (levelNum >= state.level) {
            state.level = levelNum + 1;
        }

        const earned = addXP(baseXP, `Level ${levelNum} Complete`);
        collectTool(levelNum);
        audio.levelUp();

        saveState(state);
        updateHUD();
        return earned;
    }

    // ═══════════════════════════════════════════════════════════
    // DAILY REWARD
    // ═══════════════════════════════════════════════════════════
    function checkDailyReward() {
        const today = new Date().toDateString();
        const lastClaim = localStorage.getItem('cyberRPG_lastDaily');

        if (lastClaim !== today) {
            state.dailyRewardClaimed = false;
            return true;
        }
        return false;
    }

    function claimDailyReward() {
        const today = new Date().toDateString();
        localStorage.setItem('cyberRPG_lastDaily', today);
        state.dailyRewardClaimed = true;

        const reward = 50 + (state.streak * 10);
        addXP(reward, 'Daily Reward');
        saveState(state);

        return reward;
    }


    // ═══════════════════════════════════════════════════════════
    // LIVES SYSTEM
    // ═══════════════════════════════════════════════════════════
    var MAX_LIVES = 3;

    function loseLife() {
        state.lives = (state.lives || MAX_LIVES) - 1;
        saveState(state);
        updateLivesUI();
        if (state.lives <= 0) {
            showGameOver();
            return false;
        }
        return true;
    }

    function showGameOver() {
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;';
        overlay.innerHTML = '<div style="font-size:5rem;">💀</div><h2 style="color:#ff3333;font-family:var(--font-display);margin:20px 0;">GAME OVER</h2><p style="color:rgba(255,255,255,0.7);">فقدت كل حياتك!</p><button class="cyber-btn primary" onclick="location.reload()" style="margin-top:20px;">إعادة المحاولة 🔄</button>';
        document.body.appendChild(overlay);
        audio.fail();
    }

    function updateLivesUI() {
        var lives = state.lives || MAX_LIVES;
        var hearts = '';
        for (var i = 0; i < lives; i++) hearts += '❤️';
        for (var i = 0; i < MAX_LIVES - lives; i++) hearts += '🖤';
        var el = document.getElementById('hud-lives');
        if (el) el.innerHTML = hearts;
    }

    // ═══════════════════════════════════════════════════════════
    // MATRIX RAIN EFFECT
    // ═══════════════════════════════════════════════════════════
    function initMatrixRain(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = 'アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF<>/\\|{}[]';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(1);

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        return setInterval(draw, 33);
    }

    // ═══════════════════════════════════════════════════════════
    // TERMINAL SIMULATOR
    // ═══════════════════════════════════════════════════════════
    class Terminal {
        constructor(containerId, options = {}) {
            this.container = document.getElementById(containerId);
            this.options = { prompt: 'agent@cyber-rpg:~$ ', ...options };
            this.history = [];
            this.historyIndex = -1;
            this.commands = {};
            this.init();
        }

        init() {
            this.container.innerHTML = `
                <div class="terminal-header">
                    <span class="terminal-btn red"></span>
                    <span class="terminal-btn yellow"></span>
                    <span class="terminal-btn green"></span>
                    <span class="terminal-title">CYBER-TERMINAL v3.0</span>
                </div>
                <div class="terminal-output"></div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt">${this.options.prompt}</span>
                    <input type="text" class="terminal-input" spellcheck="false" autocomplete="off">
                </div>
            `;

            this.output = this.container.querySelector('.terminal-output');
            this.input = this.container.querySelector('.terminal-input');

            this.input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const cmd = this.input.value.trim();
                    if (cmd) {
                        this.history.push(cmd);
                        this.historyIndex = this.history.length;
                        this.execute(cmd);
                    }
                    this.input.value = '';
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (this.historyIndex > 0) {
                        this.historyIndex--;
                        this.input.value = this.history[this.historyIndex];
                    }
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (this.historyIndex < this.history.length - 1) {
                        this.historyIndex++;
                        this.input.value = this.history[this.historyIndex];
                    } else {
                        this.historyIndex = this.history.length;
                        this.input.value = '';
                    }
                }
                audio.type();
            });

            this.input.focus();
            this.container.addEventListener('click', () => this.input.focus());
        }

        execute(cmd) {
            this.print(`${this.options.prompt}${cmd}`, 'command');

            const parts = cmd.split(' ');
            const command = parts[0];
            const args = parts.slice(1);

            if (this.commands[command]) {
                try {
                    this.commands[command](args, this);
                } catch(e) {
                    this.print(`Error: ${e.message}`, 'error');
                }
            } else {
                this.print(`Command not found: ${command}. Type 'help' for available commands.`, 'error');
                audio.fail();
            }
        }

        print(text, type = 'output') {
            const line = document.createElement('div');
            line.className = `terminal-line ${type}`;
            line.textContent = text;
            this.output.appendChild(line);
            this.output.scrollTop = this.output.scrollHeight;
        }

        registerCommand(name, handler) {
            this.commands[name] = handler;
        }

        clear() {
            this.output.innerHTML = '';
        }
    }

    // ═══════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════
    return {
        state,
        audio,
        RANKS,
        TOOLS,

        // State
        loadState,
        saveState,

        // Streak
        checkStreak,

        // Difficulty
        calculateDifficulty,
        getDifficultyConfig,

        // XP & Rank
        addXP,
        getCurrentRank,

        // Tools
        collectTool,
        isToolComplete,

        // Story
        playStory,

        // Agent
        agentSpeak,
        showSmartHint,

        // Session
        startSession,
        endSession,

        // HUD
        updateHUD,

        // Mode
        toggleMode,

        // Level
        completeLevel,

        // Daily
        checkDailyReward,
        claimDailyReward,

        // Effects
        initMatrixRain,

        // Terminal
        Terminal
    };
})();

// Auto-init on load
document.addEventListener('DOMContentLoaded', () => {
    CyberEngine.checkStreak();
    CyberEngine.updateHUD();
    CyberEngine.audio.init();

    // Mode toggle
    const modeBtn = document.getElementById('mode-toggle');
    if (modeBtn) {
        modeBtn.addEventListener('click', () => CyberEngine.toggleMode());
    }

    // Matrix rain
    if (document.getElementById('matrix-canvas')) {
        CyberEngine.initMatrixRain('matrix-canvas');
    }
});

// Global access
window.CyberEngine = CyberEngine;
