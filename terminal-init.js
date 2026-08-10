    // ====== تهيئة التيرمنال التفاعلي ======
    const term = new CE.Terminal('terminal', { prompt: 'agent@cyber-rpg:~$ ' });
    
    // نظام ملفات وهمي
    const fs = {
        '/': { type: 'dir', contents: ['documents', 'notes.txt', 'secret.dat'] },
        '/documents': { type: 'dir', contents: ['plan.txt', 'password.txt'] },
        '/notes.txt': { type: 'file', content: 'Agent: تذكر استخدام help للمساعدة!' },
        '/secret.dat': { type: 'file', content: '🔑 كلمة السر: PHANTOM_DEFEATED' },
        '/documents/plan.txt': { type: 'file', content: 'الخطة: تعلم البرمجة → اختراق النظام → هزيمة PHANTOM' },
        '/documents/password.txt': { type: 'file', content: '🔓 كلمة المرور: CYBER_MASTER_2024' }
    };
    
    let currentDir = '/';
    let missionComplete = false;
    
    function getPath(name) {
        if (name.startsWith('/')) return name;
        if (currentDir === '/') return '/' + name;
        return currentDir + '/' + name;
    }
    
    // تسجيل الأوامر
    term.registerCommand('help', () => {
        term.print('=== الأوامر المتاحة ===', 'success');
        term.print('pwd     - عرض المجلد الحالي');
        term.print('ls      - عرض الملفات والمجلدات');
        term.print('cd [dir]- الانتقال لمجلد');
        term.print('cat [file]- قراءة ملف');
        term.print('clear   - مسح الشاشة');
        term.print('help    - هذه التعليمات');
    });
    
    term.registerCommand('pwd', () => {
        term.print(currentDir);
    });
    
    term.registerCommand('ls', () => {
        const path = fs[currentDir];
        if (path && path.type === 'dir') {
            if (path.contents.length === 0) {
                term.print('(فارغ)');
            } else {
                path.contents.forEach(item => {
                    const itemPath = getPath(item);
                    const isDir = fs[itemPath] && fs[itemPath].type === 'dir';
                    term.print((isDir ? '📁 ' : '📄 ') + item);
                });
            }
        }
    });
    
    term.registerCommand('cd', (args) => {
        if (!args[0] || args[0] === '~') {
            currentDir = '/';
            term.print('عدت للمجلد الرئيسي');
            return;
        }
        if (args[0] === '..') {
            if (currentDir !== '/') {
                currentDir = currentDir.substring(0, currentDir.lastIndexOf('/')) || '/';
            }
            term.print(currentDir);
            return;
        }
        const newPath = getPath(args[0]);
        if (fs[newPath] && fs[newPath].type === 'dir') {
            currentDir = newPath;
            term.print('📁 دخلت إلى: ' + currentDir);
        } else {
            term.print('❌ المجلد غير موجود', 'error');
        }
    });
    
    term.registerCommand('cat', (args) => {
        if (!args[0]) {
            term.print('⚠️ استخدام: cat [اسم الملف]', 'error');
            return;
        }
        const filePath = getPath(args[0]);
        if (fs[filePath] && fs[filePath].type === 'file') {
            term.print(fs[filePath].content, 'success');
            if (filePath === '/documents/password.txt' && !missionComplete) {
                missionComplete = true;
                const missionDiv = document.getElementById('mission-complete');
                if (missionDiv) missionDiv.style.display = 'block';
                if (CE.agentSpeak) CE.agentSpeak('correct', '🎉 رائع! وجدت كلمة المرور!');
                if (CE.addXP) CE.addXP(50, 'Mission Complete');
            }
        } else {
            term.print('❌ الملف غير موجود', 'error');
        }
    });
    
    term.registerCommand('clear', () => {
        term.clear();
    });
    
    // أزرار التحكم
    document.getElementById('hint-btn').addEventListener('click', () => {
        term.print('💡 تلميح: جرب ls ثم cd documents ثم cat password.txt', 'hint');
    });
    
    document.getElementById('reset-terminal').addEventListener('click', () => {
        currentDir = '/';
        term.clear();
        term.print('=== CYBER TERMINAL v3.0 ===', 'success');
        term.print('اكتب help للمساعدة');
    });
