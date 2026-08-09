import re

# ═══════════════════════════════════════════════════════════
# 1. FIX cyber-engine.js
# ═══════════════════════════════════════════════════════════
with open('js/cyber-engine.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix duplicated loadState
old_load = '''    function loadState() {
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
        try {
            const saved = localStorage.getItem('cyberRPG_state');
            if (saved) {
                const parsed = JSON.parse(saved);
                return { ...DEFAULT_STATE, ...parsed };
            }
        } catch(e) {}
        return { ...DEFAULT_STATE };
    }'''

new_load = '''    function loadState() {
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
    }'''

content = content.replace(old_load, new_load)

# Fix duplicated saveState
old_save = '''    function saveState(state) {
        try {
            localStorage.setItem('cyberRPG_state', JSON.stringify(state));
        } catch(e) {
            console.warn('Storage save failed');
        }
        try {
            localStorage.setItem('cyberRPG_state', JSON.stringify(state));
        } catch(e) {}
    }'''

new_save = '''    function saveState(state) {
        try {
            localStorage.setItem('cyberRPG_state', JSON.stringify(state));
        } catch(e) {
            console.warn('Storage save failed');
        }
    }'''

content = content.replace(old_save, new_save)

# Add safeEval before AudioEngine
safeEval = '''
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

'''

content = content.replace('    // ═══════════════════════════════════════════════════════════\n    // AUDIO ENGINE', safeEval + '    // ═══════════════════════════════════════════════════════════\n    // AUDIO ENGINE')

# Add lives to DEFAULT_STATE
content = content.replace(
    '        dailyRewardClaimed: false,',
    '        dailyRewardClaimed: false,\n        lives: 3,'
)

# Add Lives System before Matrix Rain
livesCode = '''
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

'''

content = content.replace('    // ═══════════════════════════════════════════════════════════\n    // MATRIX RAIN EFFECT', livesCode + '    // ═══════════════════════════════════════════════════════════\n    // MATRIX RAIN EFFECT')

with open('js/cyber-engine.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ Fixed cyber-engine.js')

# ═══════════════════════════════════════════════════════════
# 2. FIX eval() in level1.html
# ═══════════════════════════════════════════════════════════
with open('levels/level1.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('eval(code);', 'safeEval(code);')
content = content.replace("eval(code)", "safeEval(code)")

with open('levels/level1.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ Fixed level1.html')

# ═══════════════════════════════════════════════════════════
# 3. FIX eval() in level11.html
# ═══════════════════════════════════════════════════════════
with open('levels/level11.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('eval(code);', 'safeEval(code);')
content = content.replace("eval(code)", "safeEval(code)")

with open('levels/level11.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ Fixed level11.html')

# ═══════════════════════════════════════════════════════════
# 4. CREATE manifest.json (PWA)
# ═══════════════════════════════════════════════════════════
manifest = '''{
  "name": "Cyber RPG",
  "short_name": "CyberRPG",
  "start_url": "/cyber-rpg-/",
  "display": "standalone",
  "background_color": "#0a0a0f",
  "theme_color": "#00ff41",
  "orientation": "portrait",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}'''

with open('manifest.json', 'w', encoding='utf-8') as f:
    f.write(manifest)

print('✅ Created manifest.json')

# ═══════════════════════════════════════════════════════════
# 5. ADD Loading Screen to index.html
# ═══════════════════════════════════════════════════════════
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

loading = '''<div id="loading-screen" style="position:fixed;top:0;left:0;width:100%;height:100%;background:#0a0a0f;z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;transition:opacity 0.5s;">
    <div style="font-size:3rem;animation:pulse 1s infinite;">⚡</div>
    <div style="color:#00ff41;font-family:monospace;margin-top:20px;font-size:1.2rem;">LOADING CYBER SYSTEM...</div>
    <div style="width:200px;height:4px;background:#1a1a2e;margin-top:15px;border-radius:2px;overflow:hidden;">
        <div style="width:0%;height:100%;background:#00ff41;animation:loadBar 2s ease-in-out forwards;"></div>
    </div>
</div>
<style>@keyframes loadBar{to{width:100%}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}</style>
<script>window.addEventListener("load",function(){setTimeout(function(){var ls=document.getElementById("loading-screen");if(ls){ls.style.opacity="0";setTimeout(function(){ls.remove()},500);}},1500);});</script>
'''

if '<body>' in content and 'loading-screen' not in content:
    content = content.replace('<body>', '<body>\n' + loading)
    print('✅ Added loading screen')

if 'manifest.json' not in content:
    content = content.replace('</head>', '<link rel="manifest" href="manifest.json">\n</head>')
    print('✅ Added manifest link')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('\\n🎉 ALL FIXES COMPLETE!')
