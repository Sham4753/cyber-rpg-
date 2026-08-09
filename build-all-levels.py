import os

# ═══════════════════════════════════════════════════════════
# LESSON DATA FOR ALL 11 LEVELS
# ═══════════════════════════════════════════════════════════

LEVELS = {
    1: {
        "title": "Terminal Basics",
        "subtitle": "🔓 أوامر Linux الأساسية",
        "topic": "linux",
        "story": [
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "الساعة 03:47 صباحاً... تستيقظ على صوت إنذار أحمر!", "simple": "صحيت بالليل! في إنذار أحمر!", "delay": 1000},
            {"avatar": "📱", "speaker": "النظام", "text": 'رسالة مشفرة: "Agent... اخترقوا الشبكة. نحتاجك الآن."', "simple": 'جاتك رسالة: "ساعدنا!"', "delay": 1500},
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "🔓 المهمة الأولى: تعلم أوامر Linux لتفتح الباب الإلكتروني!", "simple": "تعلم أوامر الكمبيوتر عشان تفتح الباب!", "delay": 1500}
        ],
        "concept": {
            "title": "ما هو الـ Terminal؟",
            "visualHTML": '<div style="text-align:center; padding:20px;"><div style="font-size:4rem; animation:float 3s infinite;">💻</div><div style="margin-top:10px; color:var(--neon-green);">Terminal = باب سحري للكمبيوتر!</div></div><style>@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}</style>',
            "analogy": {"game": "Terminal مثل شات تتكلم فيه مع الكمبيوتر!", "tech": "Terminal هو واجهة سطر الأوامر (CLI)", "real": "Terminal مثل التحدث مع سائق التاكسي"},
            "explanation": {"simple": "الـ Terminal هو مكان تكتب فيه أوامر للكمبيوتر!", "normal": "الـ Terminal هو واجهة نصية تتيح لك التحكم في الكمبيوتر بكتابة أوامر.", "technical": "Terminal هو shell يفسر الأوامر النصية ويترجمها لتعليمات للنواة."},
            "codeExample": "$ pwd\n/home/agent\n\n$ ls\nsecret_room  notes.txt\n\n$ cd secret_room\n$ cat password.txt",
            "tips": "💡 Terminal = CMD (ويندوز) = Terminal (ماك/لينكس)"
        },
        "demo": {
            "steps": [
                {"prompt": "$", "text": "pwd", "type": "command", "explanation": "💡 pwd = Print Working Directory = وين أنا؟"},
                {"text": "/home/agent", "type": "output", "explanation": "✅ أنت في مجلد agent"},
                {"prompt": "$", "text": "ls", "type": "command", "explanation": "💡 ls = List = عرضلي شو موجود"},
                {"text": "secret_room  notes.txt  readme.md", "type": "output", "explanation": "✅ في 3 ملفات"},
                {"prompt": "$", "text": "cd secret_room", "type": "command", "explanation": "💡 cd = Change Directory = ادخل الغرفة"},
                {"text": "دخلت إلى: /home/agent/secret_room", "type": "output", "explanation": "✅ دخلت الغرفة السرية!"},
                {"prompt": "$", "text": "cat password.txt", "type": "command", "explanation": "💡 cat = اقرأ الملف"},
                {"text": "🔓 كلمة المرور: CYBER_AGENT_2024", "type": "output", "explanation": "🎉 وجدت كلمة المرور!"}
            ]
        },
        "practice": {
            "task": "استخدم الأوامر لتجد كلمة المرور! (ls → cd secret_room → ls → cat password.txt)",
            "prompt": "agent@cyber-rpg:~$ ",
            "hints": ["💡 الخطوة 1: اكتب ls", "💡 الخطوة 2: اكتب cd secret_room", "💡 الخطوة 3: اكتب cat password.txt"],
            "fs": {
                "/": {"type": "dir", "contents": ["secret_room", "notes.txt"]},
                "/secret_room": {"type": "dir", "contents": ["password.txt", "clue.txt"]},
                "/notes.txt": {"type": "file", "content": "ابحث في الغرفة السرية!"},
                "/secret_room/password.txt": {"type": "file", "content": "🔓 كلمة المرور: CYBER_AGENT_2024"},
                "/secret_room/clue.txt": {"type": "file", "content": "استخدم cat لقراءة الملفات!"}
            },
            "commands": ["ls", "cd", "cat", "help", "pwd", "clear"]
        },
        "challenge": [
            {"question": "ما هو أمر معرفة المجلد الحالي؟", "options": ["ls", "pwd", "cd", "cat"], "correct": 1},
            {"question": "أي أمر يُستخدم لعرض محتوى ملف؟", "options": ["ls", "cd", "cat", "clear"], "correct": 2},
            {"question": "للانتقال إلى مجلد فرعي نستخدم:", "options": ["ls folder", "cd folder", "cat folder", "pwd folder"], "correct": 1},
            {"question": "ما الفرق بين Terminal و GUI؟", "options": ["Terminal أبطأ", "Terminal أسرع للمهام المتكررة", "لا فرق", "GUI للمحترفين"], "correct": 1}
        ]
    },

    2: {
        "title": "Python Basics & Caesar Cipher",
        "subtitle": "📡 فك الشفرات بـ Python",
        "topic": "python",
        "story": [
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "بعد اختراق الباب الأول... وجدت ملفاً غامضاً مُوقّع باسم PHANTOM!", "simple": "لقيت ملف غامض!", "delay": 1000},
            {"avatar": "📄", "speaker": "الملف", "text": "الملف مشفر بتشفير قيصري قديم... لكنه يحتوي على إحداثيات!", "simple": "الملف مشفر! بدنا نفكه!", "delay": 1500},
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "📊 المهمة: استخدم Python لفك الشفرة وكشف الموقع المخفي!", "simple": "تعلم Python عشان تفك الشفرة!", "delay": 1500}
        ],
        "concept": {
            "title": "ما هو Python؟",
            "visualHTML": '<div style="text-align:center; padding:20px;"><div style="font-size:4rem; animation:float 3s infinite;">🐍</div><div style="margin-top:10px; color:var(--neon-green);">Python = لغة البرمجة السحرية!</div></div><style>@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}</style>',
            "analogy": {"game": "Python مثل لعبة LEGO: تركّب القطع وتبني أي شيء!", "tech": "Python هي لغة برمجة عالية المستوى، سهلة القراءة والكتابة", "real": "Python مثل آلة حاسبة ذكية تفهم أوامر باللغة الإنجليزية"},
            "explanation": {"simple": "Python هي لغة تقدر تكتب فيها أوامر للكمبيوتر بشكل سهل!", "normal": "Python هي لغة برمجة تُستخدم في الذكاء الاصطناعي، الأمن السيبراني، وتحليل البيانات.", "technical": "Python هي لغة برمجة مفسرة (interpreted)، ديناميكية الكتابة، تدعم البرمجة كائنية ووظيفية."},
            "codeExample": "# تشفير قيصري بسيط\nmessage = "HELLO"\nshift = 3\n\nfor char in message:\n    new_char = chr(ord(char) + shift)\n    print(new_char)  # KHOOR",
            "tips": "💡 Python = لغة #1 في الأمن السيبراني والذكاء الاصطناعي!"
        },
        "demo": {
            "steps": [
                {"prompt": ">>>", "text": 'message = "PHANTOM"', "type": "command", "explanation": "💡 نخزن النص في متغير"},
                {"text": "تم التخزين!", "type": "output", "explanation": "✅ المتغير message يحتوي على PHANTOM"},
                {"prompt": ">>>", "text": "shift = 3", "type": "command", "explanation": "💡 مفتاح التشفير = 3"},
                {"prompt": ">>>", "text": 'for c in message: print(chr(ord(c) + shift))', "type": "command", "explanation": "💡 نزيح كل حرف 3 خطوات"},
                {"text": "S\nK\nD\nQ\nW\nT\nR\nQ", "type": "output", "explanation": "🎉 P→S, H→K, A→D... الشفرة انفكت!"}
            ]
        },
        "practice": {
            "task": "اكتب كود Python يفك تشفير Caesar! (استخدم chr(ord(c) - 3))",
            "prompt": "python>>> ",
            "hints": ["💡 message = 'SKDQWWRP'", "💡 for c in message: print(chr(ord(c) - 3))", "💡 الناتج يجب أن يكون PHANTOM"],
            "fs": {},
            "commands": []
        },
        "challenge": [
            {"question": "ما هي لغة Python؟", "options": ["لغة ترجمة", "لغة برمجة", "لغة تشفير فقط", "لغة تصميم"], "correct": 1},
            {"question": "ما وظيفة ord() في Python؟", "options": ["ترتيب القائمة", "تحويل حرف لرقم ASCII", "طباعة نص", "حذف ملف"], "correct": 1},
            {"question": "في تشفير Caesar بمفتاح 3، الحرف D يصبح:", "options": ["A", "G", "E", "F"], "correct": 1},
            {"question": "لماذا Python مشهورة في الأمن السيبراني؟", "options": ["صعبة التعلم", "سهلة وسريعة", "بطيئة جداً", "للأطفال فقط"], "correct": 1}
        ]
    },

    3: {
        "title": "If/Else & Firewall",
        "subtitle": "🛡️ اكتب شروط الدفاع",
        "topic": "python",
        "story": [
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "الإحداثيات تقودك إلى خادم محمي بجدار ناري ذكي!", "simple": "في جدار ناري قدامك!", "delay": 1000},
            {"avatar": "🔥", "speaker": "الجدار الناري", "text": "الجدار يتكيف مع كل محاولة! يجب أن تكتب شروطاً ذكية!", "simple": "الجدار يتغير! لازم شروط ذكية!", "delay": 1500},
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "🛡️ المهمة: اكتب If/Else لتجاوز دفاعاتهم واحداً تلو الآخر!", "simple": "تعلم If/Else عشان تتجاوزه!", "delay": 1500}
        ],
        "concept": {
            "title": "If/Else: قرارات الكمبيوتر",
            "visualHTML": '<div style="text-align:center; padding:20px;"><div style="font-size:4rem; animation:float 3s infinite;">🚦</div><div style="margin-top:10px; color:var(--neon-green);">If/Else = إشارة المرور للكمبيوتر!</div></div><style>@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}</style>',
            "analogy": {"game": "If/Else مثل لعبة 'هل أنت جاهز؟' إذا قلت نعم تكمل، لا ترجع!", "tech": "If/Else هي بنية تحكم تسمح للبرنامج باتخاذ قرارات بناءً على شروط", "real": "If/Else مثل إشارة المرور: إذا أخضر امشي، إذا أحمر توقف"},
            "explanation": {"simple": "If/Else يخلي الكمبيوتر ياخذ قرارات: إذا صح سوي كذا، إذا لا سوي كذا!", "normal": "If/Else تسمح للبرنامج بتنفيذ كود مختلف بناءً على شرط معين (True/False).", "technical": "If/Else هي بنية تحكم شرطية (conditional control structure) تُقيّم تعبير منطقي وتنفذ كتلة الكود المناسبة."},
            "codeExample": "password = input('أدخل كلمة المرور: ')\n\nif password == 'CYBER2024':\n    print('✅ تم الدخول!')\nelse:\n    print('❌ كلمة المرور خاطئة!')",
            "tips": "💡 == للمقارنة، = للتخزين! لا تخلط بينهم!"
        },
        "demo": {
            "steps": [
                {"prompt": ">>>", "text": "attack_level = 5", "type": "command", "explanation": "💡 مستوى الهجوم = 5"},
                {"prompt": ">>>", "text": "if attack_level > 3:", "type": "command", "explanation": "💡 إذا الهجوم أعلى من 3..."},
                {"text": "...    print('🛡️ تفعيل الدفاع القصوى!')", "type": "output", "explanation": "✅ نفّذ الدفاع القصوى"},
                {"prompt": ">>>", "text": "else:", "type": "command", "explanation": "💡 وإلا..."},
                {"text": "...    print('🟢 الدفاع العادي كافٍ')", "type": "output", "explanation": "✅ الدفاع العادي"}
            ]
        },
        "practice": {
            "task": "اكتب If/Else يتحقق إذا كلمة المرور 'OMEGA' يقول 'ممنوع' وإلا 'مسموح'",
            "prompt": "python>>> ",
            "hints": ["💡 password = 'OMEGA'", "💡 if password == 'OMEGA':", "💡 else: print('مسموح')"],
            "fs": {},
            "commands": []
        },
        "challenge": [
            {"question": "ما هو الغرض من If/Else؟", "options": ["تكرار الكود", "اتخاذ قرارات", "حذف الملفات", "طباعة نص"], "correct": 1},
            {"question": "ما الفرق بين = و == في Python؟", "options": ["لا فرق", "= للتخزين، == للمقارنة", "= للمقارنة", "== للتخزين"], "correct": 1},
            {"question": "if x > 5: ماذا يعني؟", "options": ["x يساوي 5", "x أكبر من 5", "x أصغر من 5", "x ليس 5"], "correct": 1},
            {"question": "كيف تكتب 'إذا لا' في Python؟", "options": ["otherwise", "else", "ifnot", "except"], "correct": 1}
        ]
    },

    4: {
        "title": "Loops & Port Scanning",
        "subtitle": "🔍 فحص المنافذ بالحلقات",
        "topic": "python",
        "story": [
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "اجتزت الجدار الناري... لكن أمامك 65,535 منفذاً مغلقاً!", "simple": "في 65 ألف باب! لازم نفحصهم!", "delay": 1000},
            {"avatar": "🚪", "speaker": "الشبكة", "text": "أحدها يحتوي على الباب الخلفي! لكن أي منها؟", "simple": "واحد منهم مفتوح! كيف نلقاه؟", "delay": 1500},
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "🔄 المهمة: استخدم For/While لفحص المنافذ وإيجاد الثغرة!", "simple": "تعلم الحلقات عشان تفحص كل الأبواب!", "delay": 1500}
        ],
        "concept": {
            "title": "الحلقات: التكرار الذكي",
            "visualHTML": '<div style="text-align:center; padding:20px;"><div style="font-size:4rem; animation:spin 3s linear infinite;">🔄</div><div style="margin-top:10px; color:var(--neon-green);">Loops = روبوت يكرر العملية 1000 مرة!</div></div><style>@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}</style>',
            "analogy": {"game": "Loops مثل لعبة 'كرر حركة الرقصة' 10 مرات بدل ما ترقص مرة!", "tech": "الحلقات تُنفّذ كوداً بشكل متكرر حتى يتحقق شرط معين", "real": "Loops مثل آلة غسيل الملابس: تكرر الغسل حتى تصبح نظيفة"},
            "explanation": {"simple": "الحلقة تخلي الكمبيوتر يكرر شغلة كثير مرات بدون ما تتعب!", "normal": "الحلقات (Loops) تُنفّذ كتلة من الكود عدة مرات. For للعدد المعروف، While للشرط.", "technical": "For loop يتكرر على iterable (range, list, string). While loop يتكرر طالما condition == True."},
            "codeExample": "# فحص المنافذ\nfor port in range(1, 100):\n    if port == 80:\n        print(f'🚪 المنفذ {port} مفتوح!')\n    else:\n        print(f'🔒 المنفذ {port} مغلق')",
            "tips": "💡 range(1, 100) = من 1 إلى 99. range(5) = من 0 إلى 4!"
        },
        "demo": {
            "steps": [
                {"prompt": ">>>", "text": "for i in range(5):", "type": "command", "explanation": "💡 نكرر 5 مرات"},
                {"text": "...    print(f'فحص المنفذ {i}...')", "type": "output", "explanation": "✅ نطبع كل منفذ"},
                {"text": "فحص المنفذ 0...\nفحص المنفذ 1...\nفحص المنفذ 2...", "type": "output", "explanation": "🔄 يتكرر تلقائياً!"},
                {"prompt": ">>>", "text": "port = 31337", "type": "command", "explanation": "💡 المنفذ المفتوح هو 31337"},
                {"prompt": ">>>", "text": "while port < 31340:", "type": "command", "explanation": "💡 نفحص 3 منافذ بـ While"}
            ]
        },
        "practice": {
            "task": "اكتب For loop تفحص المنافذ 1-10 وتطبع 'مفتوح' إذا كان 7",
            "prompt": "python>>> ",
            "hints": ["💡 for port in range(1, 11):", "💡 if port == 7:", "💡 print('مفتوح!')"],
            "fs": {},
            "commands": []
        },
        "challenge": [
            {"question": "ما الفرق بين For و While؟", "options": ["لا فرق", "For لعدد معروف، While لشرط", "For أبطأ", "While للأرقام فقط"], "correct": 1},
            {"question": "ماذا تُنتج range(3)؟", "options": ["1,2,3", "0,1,2", "3,2,1", "0,1,2,3"], "correct": 1},
            {"question": "كيف تكتب حلقة تتكرر 100 مرة؟", "options": ["for i in 100", "for i in range(100)", "repeat(100)", "loop 100"], "correct": 1},
            {"question": "في فحص المنافذ، لماذا نستخدم الحلقات؟", "options": ["للتصميم", "لفحص آلاف المنافذ تلقائياً", "لطباعة صورة", "لحذف الملفات"], "correct": 1}
        ]
    },

    5: {
        "title": "Functions & Multi-Tool",
        "subtitle": "🔧 دوال Python المتقدمة",
        "topic": "python",
        "story": [
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "وجدت الباب الخلفي! لكنه محمي بـ 7 طبقات من التشفير!", "simple": "الباب محمي بـ 7 طبقات!", "delay": 1000},
            {"avatar": "🔧", "speaker": "النظام", "text": "تحتاج لبناء أداة الاختراق المتعددة من الأجزاء التي جمعتها!", "simple": "لازم نبني أداة قوية!", "delay": 1500},
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "🔧 المهمة: اكتب دوال Python متقدمة لتجميع الأداة النهائية!", "simple": "تعلم الدوال عشان تبني أداتك!", "delay": 1500}
        ],
        "concept": {
            "title": "الدوال: أدواتك البرمجية",
            "visualHTML": '<div style="text-align:center; padding:20px;"><div style="font-size:4rem; animation:float 3s infinite;">🔧</div><div style="margin-top:10px; color:var(--neon-green);">Function = آلة جاهزة تستخدمها 100 مرة!</div></div><style>@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}</style>',
            "analogy": {"game": "Function مثل 'حركة خاصة' في اللعبة: تضغط زر واحد وتنفذ 10 حركات!", "tech": "الدالة هي كتلة كود قابلة لإعادة الاستخدام، تستقبل مدخلات وتُنتج مخرجات", "real": "Function مثل وصفة الطعام: تكتبها مرة وتطبخها 100 مرة!"},
            "explanation": {"simple": "الدالة هي كود جاهز تعطيه شغلة وهو يرجعلك نتيجة!", "normal": "الدالة (Function) تُجمّع كوداً لمهمة محددة. تستدعيها بالاسم بدل إعادة الكتابة.", "technical": "Function هي كتلة من التعليمات البرمجية المُسمّاة، تستقبل parameters (arguments) وتُرجع return value."},
            "codeExample": "def hack_password(password):\n    if password == 'OMEGA':\n        return '❌ ممنوع!'\n    else:\n        return '✅ تم الاختراق!'\n\nresult = hack_password('TEST')\nprint(result)  # ✅ تم الاختراق!",
            "tips": "💡 def = define = عرّف دالة جديدة. return = أرجع النتيجة!"
        },
        "demo": {
            "steps": [
                {"prompt": ">>>", "text": "def scan_port(port):", "type": "command", "explanation": "💡 نعرّف دالة لفحص المنفذ"},
                {"text": "...    if port == 80:", "type": "output", "explanation": "✅ نتحقق إذا المنفذ 80"},
                {"text": "...        return 'مفتوح'", "type": "output", "explanation": "✅ نرجع 'مفتوح'"},
                {"prompt": ">>>", "text": "scan_port(80)", "type": "command", "explanation": "💡 نستدعي الدالة"},
                {"text": "'مفتوح'", "type": "output", "explanation": "🎉 الدالة اشتغلت!"}
            ]
        },
        "practice": {
            "task": "اكتب دالة decrypt() تستقبل نص وتُرجعه مقلوباً (text[::-1])",
            "prompt": "python>>> ",
            "hints": ["💡 def decrypt(text):", "💡 return text[::-1]", "💡 decrypt('ABC') يجب أن يرجع 'CBA'"],
            "fs": {},
            "commands": []
        },
        "challenge": [
            {"question": "ما هو الغرض من الدوال؟", "options": ["تكرار الكود", "تنظيم وإعادة استخدام الكود", "حذف الملفات", "تبطيء البرنامج"], "correct": 1},
            {"question": "كيف تُعرّف دالة في Python؟", "options": ["function name():", "def name():", "func name():", "define name():"], "correct": 1},
            {"question": "ماذا تفعل return؟", "options": ["تتوقف البرنامج", "ترجع قيمة من الدالة", "تطبع نص", "تحذف متغير"], "correct": 1},
            {"question": "لماذا الدوال مهمة في الأمن السيبراني؟", "options": ["للتصميم", "لإعادة استخدام أدوات الاختراق", "للألعاب", "للتلوين"], "correct": 1}
        ]
    },

    6: {
        "title": "Boss Fight: PHANTOM",
        "subtitle": "👹 مواجهة العدو النهائي",
        "topic": "python",
        "story": [
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "الأداة جاهزة. الشبكة تهتز. PHANTOM يعرف أنك قادم!", "simple": "PHANTOM قدامك! المعركة النهائية!", "delay": 1000},
            {"avatar": "💀", "speaker": "PHANTOM", "text": '"أهلاً Agent... لقد كنتُ أنتظر هذه اللحظة منذ سنوات."', "simple": "PHANTOM يتحداك!", "delay": 1500},
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "🐉 المهمة النهائية: استخدم كل ما تعلمته لإيقاف PHANTOM!", "simple": "استخدم كل شيء تعلمته!", "delay": 1500}
        ],
        "concept": {
            "title": "تجميع كل شيء: البرمجة المتكاملة",
            "visualHTML": '<div style="text-align:center; padding:20px;"><div style="font-size:4rem; animation:pulse 2s infinite;">⚔️</div><div style="margin-top:10px; color:var(--neon-red);">Boss Fight = اجمع كل أدواتك!</div></div><style>@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}</style>',
            "analogy": {"game": "Boss Fight مثل المرحلة الأخيرة: لازم تستخدم كل القوى اللي جمعتها!", "tech": "تجميع المفاهيم: Variables, If/Else, Loops, Functions في برنامج واحد", "real": "مثل امتحان نهائي: يختبر كل شيء تعلمته في المادة"},
            "explanation": {"simple": "المعركة النهائية تحتاج كل شيء: أوامر، شروط، حلقات، دوال!", "normal": "في المعركة النهائية، ستستخدم كل ما تعلمته: Terminal, Python, If/Else, Loops, Functions.", "technical": "Integration: دمج multiple programming paradigms لبناء حل متكامل لمهمة معقدة."},
            "codeExample": "def final_attack():\n    password = 'PHANTOM'\n    for layer in range(7, 0, -1):\n        if layer > 3:\n            print(f'💥 تحطيم الطبقة {layer}')\n        else:\n            print(f'🔥 الطبقة {layer} ضعيفة!')\n    return '✅ PHANTOM مهزوم!'\n\nprint(final_attack())",
            "tips": "💡 لا تستسلم! كل خطأ هو درس. كل محاولة تقربك من النصر!"
        },
        "demo": {
            "steps": [
                {"prompt": ">>>", "text": "def hack_phantom():", "type": "command", "explanation": "💡 الدالة النهائية"},
                {"text": "...    tools = ['terminal', 'python', 'loops']", "type": "output", "explanation": "✅ نجمع الأدوات"},
                {"text": "...    for tool in tools:", "type": "output", "explanation": "✅ نستخدم كل أداة"},
                {"text": "...        print(f'استخدام {tool}...')", "type": "output", "explanation": "🎉 PHANTOM يضعف!"},
                {"text": "...    return 'PHANTOM مهزوم!'", "type": "output", "explanation": "🏆 النصر!"}
            ]
        },
        "practice": {
            "task": "اكتب برنامج كامل: دالة تفحص 5 طبقات وتهزم PHANTOM إذا وصلت للطبقة 1",
            "prompt": "python>>> ",
            "hints": ["💡 def fight_phantom():", "💡 for layer in range(5, 0, -1):", "💡 if layer == 1: return 'نصر!'"],
            "fs": {},
            "commands": []
        },
        "challenge": [
            {"question": "ما هي أدواتك في هذه المعركة؟", "options": ["Terminal فقط", "Terminal + Python + If/Else + Loops + Functions", "الماوس فقط", "الإنترنت فقط"], "correct": 1},
            {"question": "ما هو range(7, 0, -1)؟", "options": ["من 0 إلى 7", "من 7 إلى 1 تنازلي", "من 1 إلى 7", "7 مرات"], "correct": 1},
            {"question": "لماذا نستخدم For في المعركة؟", "options": ["للتصميم", "لفحص كل الطبقات تلقائياً", "للطباعة", "للحذف"], "correct": 1},
            {"question": "ما معنى 'تجميع المفاهيم'؟", "options": ["حذف الكود", "استخدام كل ما تعلمته معاً", "نسيان الدروس", "نسخ ولصق"], "correct": 1}
        ]
    },

    7: {
        "title": "Lists & Dictionaries",
        "subtitle": "📦 ترتيب البيانات المشتتة",
        "topic": "python",
        "story": [
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "بعد هزيمة PHANTOM... اكتشفت شريحة ذاكرة مخفية!", "simple": "لقيت ذاكرة مخفية!", "delay": 1000},
            {"avatar": "📦", "speaker": "الذاكرة", "text": "البيانات مشتتة! قوائم مبعثرة وقواميس مشفرة في كل مكان!", "simple": "البيانات مبعثرة! لازم نرتبها!", "delay": 1500},
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "📦 المهمة: استخدم Lists و Dictionaries لترتيب البيانات وكشف الحقيقة!", "simple": "تعلم القوائم والقواميس عشان ترتب البيانات!", "delay": 1500}
        ],
        "concept": {
            "title": "Lists & Dictionaries: خزائن البيانات",
            "visualHTML": '<div style="text-align:center; padding:20px;"><div style="font-size:4rem; animation:float 3s infinite;">📦</div><div style="margin-top:10px; color:var(--neon-green);">List = صف دراسي | Dict = خزانة ملفات!</div></div><style>@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}</style>',
            "analogy": {"game": "List مثل حقيبة أدوات: تحط فيها أدواتك بترتيب! Dict مثل خريطة: اسم + موقع!", "tech": "List: مجموعة مرتبة. Dict: مجموعة مفتاح-قيمة للبحث السريع.", "real": "List مثل قائمة التسوق. Dict مثل دفتر العناوين (اسم: رقم)."},
            "explanation": {"simple": "List تحط فيها أشياء بترتيب. Dict تحط فيها أشياء باسم عشان تلاقيها بسرعة!", "normal": "List: مجموعة مرتبة قابلة للتعديل. Dictionary: مجموعة من أزواج key-value للوصول السريع.", "technical": "List: dynamic array, O(n) lookup. Dict: hash table, O(1) lookup. يُستخدمان لتخزين وهيكلة البيانات."},
            "codeExample": "# List\nagents = ['Zero', 'Alpha', 'Beta']\nprint(agents[0])  # Zero\n\n# Dict\nagent_levels = {'Zero': 999, 'Alpha': 50}\nprint(agent_levels['Zero'])  # 999",
            "tips": "💡 List تبدأ من 0! agents[0] = أول عنصر. Dict: اسم['المفتاح'] = القيمة!"
        },
        "demo": {
            "steps": [
                {"prompt": ">>>", "text": "agents = ['Zero', 'Phantom', 'Omega']", "type": "command", "explanation": "💡 قائمة بالعملاء"},
                {"prompt": ">>>", "text": "print(agents[0])", "type": "command", "explanation": "💡 نطبع الأول"},
                {"text": "Zero", "type": "output", "explanation": "✅ الفهرس 0 = أول عنصر"},
                {"prompt": ">>>", "text": "data = {'Omega': 999, 'Alpha': 50}", "type": "command", "explanation": "💡 قاموس بالمستويات"},
                {"text": "999", "type": "output", "explanation": "🎹 الوصول السريع!"}
            ]
        },
        "practice": {
            "task": "اكتب Dict يحتوي على 3 عملاء ومستوياتهم، ثم اطبع مستوى 'Omega'",
            "prompt": "python>>> ",
            "hints": ["💡 agents = {'Omega': 999, 'Alpha': 50, 'Beta': 75}", "💡 print(agents['Omega'])", "💡 الناتج يجب أن يكون 999"],
            "fs": {},
            "commands": []
        },
        "challenge": [
            {"question": "ما الفرق بين List و Dictionary؟", "options": ["لا فرق", "List بترتيب، Dict بمفتاح", "List أسرع", "Dict أصغر"], "correct": 1},
            {"question": "ما هو فهرس أول عنصر في List؟", "options": ["1", "0", "-1", "10"], "correct": 1},
            {"question": "كيف تصل لقيمة في Dictionary؟", "options": ["dict.0", "dict['key']", "dict(0)", "dict.key"], "correct": 1},
            {"question": "لماذا نستخدم Dictionary في الأمن السيبراني؟", "options": ["للتصميم", "للبحث السريع عن البيانات", "للألعاب", "للحذف"], "correct": 1}
        ]
    },

    8: {
        "title": "File Operations",
        "subtitle": "📁 عملية السرقة الإلكترونية",
        "topic": "python",
        "story": [
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "بعد اكتشاف Sector 7... وجدت خادماً فرعياً يحتوي على ملفات OMEGA!", "simple": "لقيت ملفات سرية!", "delay": 1000},
            {"avatar": "📁", "speaker": "النظام", "text": "الملفات مشفرة ومحمية، لكنك تعلمت كيف تتعامل معها!", "simple": "الملفات محمية! لازم نسرقها!", "delay": 1500},
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "📁 المهمة: اخترق نظام الملفات واسرق config.bak!", "simple": "تعلم التعامل مع الملفات عشان تسرق البيانات!", "delay": 1500}
        ],
        "concept": {
            "title": "الملفات: قراءة وكتابة البيانات",
            "visualHTML": '<div style="text-align:center; padding:20px;"><div style="font-size:4rem; animation:float 3s infinite;">📁</div><div style="margin-top:10px; color:var(--neon-green);">File = صندوق بريد إلكتروني!</div></div><style>@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}</style>',
            "analogy": {"game": "الملفات مثل صناديق الحفظ في اللعبة: تفتحها تقرأ، تكتب فيها تحفظ!", "tech": "الملفات تُستخدم لقراءة وكتابة البيانات بشكل دائم على القرص.", "real": "الملفات مثل دفتر ملاحظات: تفتحه، تقرأ، تكتب، تغلقه."},
            "explanation": {"simple": "تقدر تفتح ملف، تقرأ منه، تكتب فيه، وتسكره!", "normal": "Python تتيح قراءة الملفات (open/read) وكتابتها (write/append) باستخدام with statement.", "technical": "File I/O: open(filename, mode) حيث mode = 'r' read, 'w' write, 'a' append, 'rb' binary. with statement يضمن الإغلاق التلقائي."},
            "codeExample": "# قراءة ملف\nwith open('secret.txt', 'r') as f:\n    content = f.read()\n    print(content)\n\n# كتابة ملف\nwith open('hack.log', 'w') as f:\n    f.write('✅ تم الاختراق!')",
            "tips": "💡 'r' = قراءة، 'w' = كتابة (تحذف القديم!)، 'a' = إضافة. with = يغلق الملف تلقائياً!"
        },
        "demo": {
            "steps": [
                {"prompt": ">>>", "text": "with open('config.bak', 'r') as f:", "type": "command", "explanation": "💡 نفتح الملف للقراءة"},
                {"text": "...    data = f.read()", "type": "output", "explanation": "✅ نقرأ كل المحتوى"},
                {"text": "...    print(data[:50])", "type": "output", "explanation": "✅ نطبع أول 50 حرف"},
                {"text": "OMEGA_STATUS=ARMED\\nSECTOR=7...", "type": "output", "explanation": "🎉 وجدنا معلومات سرية!"},
                {"prompt": ">>>", "text": "with open('stolen.txt', 'w') as f:", "type": "command", "explanation": "💡 نكتب ملف جديد"}
            ]
        },
        "practice": {
            "task": "اكتب كود يفتح ملف 'secret.txt' ويقرأ محتواه ويطبعه",
            "prompt": "python>>> ",
            "hints": ["💡 with open('secret.txt', 'r') as f:", "💡 content = f.read()", "💡 print(content)"],
            "fs": {},
            "commands": []
        },
        "challenge": [
            {"question": "ما وظيفة with open() as f؟", "options": ["تصميم", "فتح ملف وإغلاقه تلقائياً", "حذف ملف", "طباعة نص"], "correct": 1},
            {"question": "ما الفرق بين 'w' و 'r'؟", "options": ["لا فرق", "'w' للكتابة، 'r' للقراءة", "'w' أسرع", "'r' يحذف"], "correct": 1},
            {"question": "ماذا يفعل f.read()؟", "options": ["يكتب", "يقرأ كل المحتوى", "يحذف", "يغلق"], "correct": 1},
            {"question": "لماذا نستخدم with بدل open() فقط؟", "options": ["للتصميم", "لإغلاق الملف تلقائياً", "للألعاب", "للحذف"], "correct": 1}
        ]
    },

    9: {
        "title": "Regex Patterns",
        "subtitle": "👁️ عين الصقر ترى كل نمط",
        "topic": "python",
        "story": [
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "Sector 7 يحتوي على ملايين السجلات... كيف نجد الإبرة في الكومة؟", "simple": "ملايين السجلات! كيف نلقى المهم؟", "delay": 1000},
            {"avatar": "👁️", "speaker": "النظام", "text": "الجواب: Regular Expressions! عين الصقر التي ترى كل نمط!", "simple": "الجواب: Regex! عين الصقر!", "delay": 1500},
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "👁️ المهمة: استخدم Regex لاستخراج أسرار OMEGA من بحر البيانات!", "simple": "تعلم Regex عشان تلاقي الأسرار!", "delay": 1500}
        ],
        "concept": {
            "title": "Regex: البحث الذكي",
            "visualHTML": '<div style="text-align:center; padding:20px;"><div style="font-size:4rem; animation:float 3s infinite;">👁️</div><div style="margin-top:10px; color:var(--neon-green);">Regex = نظارة سحرية تلاقي أي نمط!</div></div><style>@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}</style>',
            "analogy": {"game": "Regex مثل 'بحث متقدم' في اللعبة: تبحث عن 'سيف*' يلاقي سيف1، سيف2...", "tech": "Regex (Regular Expressions) هي لغة نمطية للبحث والتطابق في النصوص.", "real": "Regex مثل البحث في الهاتف: تكتب 'أح*' يلاقي أحمد، أحمد..."},
            "explanation": {"simple": "Regex يسمح لك تبحث عن أنماط في النص: أرقام، إيميلات، تواريخ!", "normal": "Regular Expressions تُستخدم للبحث عن أنماط معينة (patterns) في النصوص، مثل extracting emails, IPs, passwords.", "technical": "Regex هي لغة formal لتحديد سلاسل البحث. تستخدم metacharacters مثل . * + ? ^ $ [] () {} | \\ للتطابق."},
            "codeExample": "import re\n\ntext = 'Email: admin@omega.com, Key: XK-99-ALPHA'\n\n# استخراج الإيميل\nemail = re.search(r'[\\w.-]+@[\\w.-]+', text)\nprint(email.group())  # admin@omega.com\n\n# استخراج المفتاح\nkey = re.search(r'XK-\\d+-\\w+', text)\nprint(key.group())    # XK-99-ALPHA",
            "tips": "💡 \\d = رقم. \\w = حرف/رقم. . = أي حرف. * = صفر أو أكثر. + = واحد أو أكثر!"
        },
        "demo": {
            "steps": [
                {"prompt": ">>>", "text": "import re", "type": "command", "explanation": "💡 نستورد مكتبة Regex"},
                {"prompt": ">>>", "text": "text = 'Key: XK-99-ALPHA'", "type": "command", "explanation": "💡 النص المستهدف"},
                {"prompt": ">>>", "text": "re.search(r'XK-\\d+-\\w+', text)", "type": "command", "explanation": "💡 نبحث عن النمط"},
                {"text": "<re.Match object; span=(5, 16), match='XK-99-ALPHA'>", "type": "output", "explanation": "✅ لقينا المفتاح!"},
                {"text": "XK-99-ALPHA", "type": "output", "explanation": "🎉 Regex يعمل!"}
            ]
        },
        "practice": {
            "task": "اكتب Regex يستخرج الإيميل من: 'Contact: hacker@cyber.com'",
            "prompt": "python>>> ",
            "hints": ["💡 import re", "💡 re.search(r'[\\w.-]+@[\\w.-]+', text)", "💡 .group() للحصول على النتيجة"],
            "fs": {},
            "commands": []
        },
        "challenge": [
            {"question": "ما هو Regex؟", "options": ["لعبة", "لغة أنماط للبحث في النصوص", "لغة برمجة", "ملف"], "correct": 1},
            {"question": "ماذا يعني \\d في Regex؟", "options": ["حرف", "رقم", "مسافة", "نقطة"], "correct": 1},
            {"question": "ما الفرق بين * و + في Regex؟", "options": ["لا فرق", "* = صفر أو أكثر، + = واحد أو أكثر", "* أسرع", "+ أصغر"], "correct": 1},
            {"question": "لماذا Regex مهمة في الأمن السيبراني؟", "options": ["للتصميم", "لاستخراج البيانات الحساسة من السجلات", "للألعاب", "للحذف"], "correct": 1}
        ]
    },

    10: {
        "title": "API Hacking",
        "subtitle": "🌐 اختراق الخوادم عبر API",
        "topic": "python",
        "story": [
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "Sector 7 يحتوي على خوادم متصلة بالعالم الخارجي...", "simple": "الخوادم متصلة بالعالم!", "delay": 1000},
            {"avatar": "🌐", "speaker": "النظام", "text": "OMEGA يستخدم APIs للتحكم في شبكته. إذا استطعنا فهمها...", "simple": "OMEGA يستخدم APIs! لازم نفهمها!", "delay": 1500},
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "🌐 المهمة: اخترق API OMEGA واستخرج البيانات قبل أن يُغلق الباب!", "simple": "تعلم API عشان تاخذ البيانات!", "delay": 1500}
        ],
        "concept": {
            "title": "API: جسر البيانات",
            "visualHTML": '<div style="text-align:center; padding:20px;"><div style="font-size:4rem; animation:float 3s infinite;">🌐</div><div style="margin-top:10px; color:var(--neon-green);">API = نادل المطعم: يطلب لك البيانات!</div></div><style>@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}</style>',
            "analogy": {"game": "API مثل 'زر الطلب' في اللعبة: تضغطه يجيب لك معلومات من السيرفر!", "tech": "API (Application Programming Interface) هي واجهة تتيح للبرامج التواصل مع بعضها.", "real": "API مثل نادل المطعم: أنت (العميل) تطلب، النادل (API) يجيب من المطبخ (السيرفر)."},
            "explanation": {"simple": "API هي طريقة تطلب فيها بيانات من موقع أو تطبيق. مثل تطلب قائمة الطعام!", "normal": "API تتيح للتطبيقات التواصل مع بعضها. نستخدم requests في Python لإرسال طلبات GET/POST واستلام JSON.", "technical": "API RESTful تستخدم HTTP methods: GET (read), POST (create), PUT (update), DELETE (remove). تُرجع JSON/XML."},
            "codeExample": "import requests\n\nurl = 'https://omega.com/api/agents'\nresponse = requests.get(url)\n\n# البيانات بصيغة JSON\ndata = response.json()\nprint(data['status'])  # ARMED",
            "tips": "💡 GET = اقرأ. POST = أنشئ. PUT = حدّث. DELETE = احذف. JSON = صيغة بيانات!"
        },
        "demo": {
            "steps": [
                {"prompt": ">>>", "text": "import requests", "type": "command", "explanation": "💡 نستورد مكتبة الطلبات"},
                {"prompt": ">>>", "text": "r = requests.get('https://api.omega.com/status')", "type": "command", "explanation": "💡 نطلب حالة السيرفر"},
                {"text": "<Response [200]>", "type": "output", "explanation": "✅ 200 = نجاح!"},
                {"prompt": ">>>", "text": "print(r.json())", "type": "command", "explanation": "💡 نحول لـ JSON"},
                {"text": "{'status': 'ARMED', 'level': 999}", "type": "output", "explanation": "🎉 حصلنا على البيانات!"}
            ]
        },
        "practice": {
            "task": "اكتب كود يطلب بيانات من API ويطبع حالة 'OMEGA' (استخدم requests.get)",
            "prompt": "python>>> ",
            "hints": ["💡 import requests", "💡 r = requests.get('URL')", "💡 print(r.json()['status'])"],
            "fs": {},
            "commands": []
        },
        "challenge": [
            {"question": "ما هو API؟", "options": ["لعبة", "واجهة برمجة للتواصل بين التطبيقات", "ملف", "صورة"], "correct": 1},
            {"question": "ما الفرق بين GET و POST؟", "options": ["لا فرق", "GET للقراءة، POST للإنشاء", "GET أسرع", "POST أصغر"], "correct": 1},
            {"question": "ماذا يعني Response 200؟", "options": ["خطأ", "نجاح", "تحذير", "محظور"], "correct": 1},
            {"question": "لماذا نستخدم APIs في الأمن السيبراني؟", "options": ["للتصميم", "لاستخراج البيانات من الأنظمة", "للألعاب", "للحذف"], "correct": 1}
        ]
    },

    11: {
        "title": "Web Scraping",
        "subtitle": "🕷️ قراءة ما لا يُقرأ",
        "topic": "python",
        "story": [
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "OMEGA_CORP لديها موقع ويب عام... يظنون أنه آمن!", "simple": "موقعهم يظنونه آمن!", "delay": 1000},
            {"avatar": "🕷️", "speaker": "النظام", "text": "لكن العنكبوت (Web Scraper) يستطيع قراءة كل شيء مخفي في HTML!", "simple": "العنكبوت يلاقي كل شي مخفي!", "delay": 1500},
            {"avatar": "🤖", "speaker": "Agent Zero", "text": "🕷️ المهمة: استخدم BeautifulSoup لاستخراج أسرارهم من الموقع!", "simple": "تعلم Web Scraping عشان تسرق البيانات من الموقع!", "delay": 1500}
        ],
        "concept": {
            "title": "Web Scraping: العنكبوت الرقمي",
            "visualHTML": '<div style="text-align:center; padding:20px;"><div style="font-size:4rem; animation:float 3s infinite;">🕷️</div><div style="margin-top:10px; color:var(--neon-green);">Scraper = عنكبوت يمشي على المواقع ويجمع البيانات!</div></div><style>@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}</style>',
            "analogy": {"game": "Scraper مثل 'جمع الموارد' في اللعبة: يمشي على الخريطة ويجمع كل شيء تلقائياً!", "tech": "Web Scraping يستخدم requests لجلب HTML وBeautifulSoup لتحليله واستخراج البيانات.", "real": "Scraper مثل روبوت يقرأ الجريدة ويقص الأخبار المهمة لك!"},
            "explanation": {"simple": "Web Scraping يخلي البرنامج يزور موقع ويقرأ كل المعلومات وياخذ اللي يبغاه!", "normal": "Web Scraping: جلب صفحة HTML وتحليلها لاستخراج بيانات منظمة (tables, links, text) باستخدام BeautifulSoup.", "technical": "Pipeline: requests.get(url) → BeautifulSoup(html, 'html.parser') → soup.find/find_all() → extract .text/attributes. يتطلب فهم DOM وCSS selectors."},
            "codeExample": "import requests\nfrom bs4 import BeautifulSoup\n\nurl = 'https://omega.com'\nresponse = requests.get(url)\nsoup = BeautifulSoup(response.text, 'html.parser')\n\n# استخراج العناوين\ntitles = soup.find_all('h1')\nfor t in titles:\n    print(t.text)",
            "tips": "💡 find() = أول تطابق. find_all() = كل التطابقات. .text = استخرج النص فقط!"
        },
        "demo": {
            "steps": [
                {"prompt": ">>>", "text": "import requests", "type": "command", "explanation": "💡 نستورد الطلبات"},
                {"prompt": ">>>", "text": "from bs4 import BeautifulSoup", "type": "command", "explanation": "💡 نستورد المحلل"},
                {"prompt": ">>>", "text": "soup = BeautifulSoup('<h1>OMEGA</h1>', 'html.parser')", "type": "command", "explanation": "💡 نحلل HTML"},
                {"prompt": ">>>", "text": "soup.find('h1').text", "type": "command", "explanation": "💡 نستخرج النص"},
                {"text": "'OMEGA'", "type": "output", "explanation": "🎉 استخرجنا البيانات!"}
            ]
        },
        "practice": {
            "task": "اكتب كود BeautifulSoup يستخرج النص من: '<div class=\"secret\">KEY: XK-99</div>'",
            "prompt": "python>>> ",
            "hints": ["💡 soup = BeautifulSoup(html, 'html.parser')", "💡 soup.find('div', class_='secret')", "💡 .text للحصول على النص"],
            "fs": {},
            "commands": []
        },
        "challenge": [
            {"question": "ما هي مكتبة Python الشهيرة لـ Web Scraping؟", "options": ["Requests", "BeautifulSoup", "JSON", "Regex"], "correct": 1},
            {"question": "ما الفرق بين find() و find_all()؟", "options": ["لا فرق", "find = أول تطابق, find_all = كل التطابقات", "find = كل", "find_all = أول"], "correct": 1},
            {"question": "كيف تستخرج النص من عنصر HTML؟", "options": [".html", ".text", ".content", ".value"], "correct": 1},
            {"question": "لماذا Web Scraping مفيد في الأمن السيبراني؟", "options": ["للتصميم", "لجمع المعلومات من المواقع العامة", "للألعاب", "للحذف"], "correct": 1}
        ]
    }
}

# ═══════════════════════════════════════════════════════════
# HTML TEMPLATE
# ═══════════════════════════════════════════════════════════

HTML_TEMPLATE = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CYBER RPG - Level {level}: {title}</title>
    <link rel="stylesheet" href="../css/cyber-theme.css">
</head>
<body>
    <canvas id="matrix-canvas"></canvas>
    <button class="mode-toggle" id="mode-toggle">KIDS MODE</button>

    <div class="cyber-container">
        <header class="cyber-header">
            <h1 class="cyber-logo" data-text="LEVEL {level}">LEVEL {level}</h1>
            <p class="cyber-subtitle">{subtitle}</p>
        </header>

        <div class="cyber-hud" id="main-hud">
            <div class="hud-item"><div class="hud-label">المستوى</div><div class="hud-value" id="hud-level">{level}</div></div>
            <div class="hud-item"><div class="hud-label">الرتبة</div><div class="hud-value" id="hud-rank">👶 Script Kiddie</div></div>
            <div class="hud-item"><div class="hud-label">النقاط</div><div class="hud-value" id="hud-xp">0</div></div>
            <div class="hud-item"><div class="hud-label">الحياة</div><div class="hud-value" id="hud-lives">❤️❤️❤️</div></div>
            <div class="hud-item"><div class="hud-label">الشرارة</div><div class="hud-value" id="hud-streak" style="display:none">🔥 0</div></div>
            <div class="hud-xp-bar-container">
                <div class="hud-xp-bar-bg"><div class="hud-xp-bar" id="hud-xp-bar" style="width: 0%"></div></div>
            </div>
        </div>

        <div id="lesson-container" style="margin: 20px 0;"></div>

        <div style="text-align: center; margin: 30px 0;">
            <a href="../index.html" class="cyber-btn">⬅️ العودة للخريطة</a>
        </div>
    </div>

    <div id="agent-zero">
        <div class="agent-avatar" id="agent-avatar">🤖</div>
    </div>

    <script src="../js/cyber-engine.js"></script>
    <script src="../js/lesson-engine.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {{
            const CE = window.CyberEngine;
            CE.startSession();
            CE.updateHUD();

            const lesson = new LessonEngine.LessonBuilder('lesson-container', {{
                profile: 'teen',
                topic: '{topic}',
                level: {level}
            }});

            // STEP 1: STORY
            lesson.addStory({story_json});

            // STEP 2: CONCEPT
            lesson.addConcept({concept_json});

            // STEP 3: DEMO
            lesson.addDemo({demo_json});

            // STEP 4: PRACTICE
            lesson.addPractice({practice_json});

            // STEP 5: CHALLENGE
            lesson.addChallenge({challenge_json});

            lesson.render();

            setTimeout(() => {{
                CE.agentSpeak('correct', '👋 مرحباً Agent! ابدأ الدرس من الخطوة الأولى!');
            }}, 1000);
        }});
    </script>
</body>
</html>
'''

# ═══════════════════════════════════════════════════════════
# BUILD ALL LEVELS
# ═══════════════════════════════════════════════════════════
import json

for level_num, data in LEVELS.items():
    # Convert data to JSON strings for embedding
    story_json = json.dumps(data['story'], ensure_ascii=False)
    concept_json = json.dumps(data['concept'], ensure_ascii=False)
    demo_json = json.dumps(data['demo'], ensure_ascii=False)
    
    # Build practice object
    practice_obj = {
        "task": data['practice']['task'],
        "prompt": data['practice']['prompt'],
        "hints": data['practice']['hints']
    }
    practice_json = json.dumps(practice_obj, ensure_ascii=False)
    
    challenge_json = json.dumps(data['challenge'], ensure_ascii=False)
    
    # Fill template
    html = HTML_TEMPLATE.format(
        level=level_num,
        title=data['title'],
        subtitle=data['subtitle'],
        topic=data['topic'],
        story_json=story_json,
        concept_json=concept_json,
        demo_json=demo_json,
        practice_json=practice_json,
        challenge_json=challenge_json
    )
    
    # Write file
    filepath = f'levels/level{level_num}-lesson.html'
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f'✅ Created {filepath}')

print('\\n🎉 ALL 11 LESSON LEVELS BUILT!')
