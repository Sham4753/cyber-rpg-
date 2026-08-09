# 🎮 CYBER RPG v3.0
## منصة تعليمية تفاعلية بأسلوب Cyberpunk

### ⚡ خوارزمية التشويق والتحفيز العالمية
- **Curiosity Gaps**: قصص سينمائية بين المستويات تولد الفضول
- **Dynamic Difficulty**: تعديل ذكي للصعوبة حسب أداء اللاعب
- **Dopamine Hooks**: نظام شرارات يومية + تجميع أدوات + مكافآت XP
- **Story-Driven Localization**: قصص عربية مشوقة بأسلوب سينمائي

### 📁 الهيكل
```
cyber-rpg/
├── index.html          ← البوابة الرئيسية + خريطة المهام + HUD
├── css/
│   └── cyber-theme.css ← التصميم الكامل (نيون، Matrix Rain، Grid)
├── js/
│   └── cyber-engine.js ← المحرك الذكي (Terminal، صوت، Difficulty، حفظ)
└── levels/
    ├── level1.html     ← 🔓 Terminal Basics (pwd, ls, cd, cat)
    ├── level2.html     ← 📊 Python Variables + Caesar Cipher
    ├── level3.html     ← 🛡️ If/Else/Elif + Firewall Grid
    ├── level4.html     ← 🔄 For/While Loops + Port Scanner
    ├── level5.html     ← 🔧 Functions + Tool Assembly
    └── level6.html     ← 🐉 Boss Fight (Recon→Vuln→Exploit→Patch)
```

### 🚀 التشغيل
```bash
cd cyber-rpg
python -m http.server 8080
# افتح: http://localhost:8080
```

### 🎯 الميكانيكيات
- **HUD**: مستوى، رتبة (6 رتب)، شريط XP، شرارة يومية، أدوات
- **Agent Zero**: مساعد ذكي يتكيف مع أدائك (تشجيع/تحدي)
- **نظام صوتي**: Web Audio API (نجاح/فشل/اختراق/مستوى جديد)
- **حفظ التقدم**: localStorage (XP، مستويات، أدوات، شرارة)
- **CTF**: أسئلة اختيار من متعدد في نهاية كل مستوى
- **Boss Fight**: 4 مراحل مع شريط صحة PHANTOM

### 🏆 نظام الرتب
1. Script Kiddie → Pentester Padawan → Security Analyst → Red Team Operator → Elite Hacker → Cyber Legend

### 🔧 الأدوات (6 أجزاء)
💻 شظية التيرمنال | 🔮 عجلة التشفير | 🛡️ نواة الجدار الناري | 🔍 ماسح المنافذ | ⚔️ شفرة الدالة | 🐉 تنين الاستغلال

### 🌐 يعمل بدون إنترنت
- كل الملفات محلية
- الخطوط تُحمل من Google Fonts (اختياري - يعمل بدونها)
- يعمل في Termux على Android

### 💚 Built with passion for future hackers
