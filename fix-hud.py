import os
import glob

# ═══════════════════════════════════════════════════════════
# ADD LIVES HUD to index.html
# ═══════════════════════════════════════════════════════════
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add lives after streak in HUD
if 'hud-lives' not in content:
    content = content.replace(
        '<div class="hud-item"><div class="hud-label">الشرارة</div><div class="hud-value" id="hud-streak"',
        '<div class="hud-item"><div class="hud-label">الحياة</div><div class="hud-value" id="hud-lives">❤️❤️❤️</div></div>\n            <div class="hud-item"><div class="hud-label">الشرارة</div><div class="hud-value" id="hud-streak"'
    )
    print('✅ Added lives HUD to index.html')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

# ═══════════════════════════════════════════════════════════
# ADD LIVES HUD + Loading Screen to ALL level files
# ═══════════════════════════════════════════════════════════
loading_screen = '''<div id="loading-screen" style="position:fixed;top:0;left:0;width:100%;height:100%;background:#0a0a0f;z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;transition:opacity 0.5s;">
    <div style="font-size:3rem;animation:pulse 1s infinite;">⚡</div>
    <div style="color:#00ff41;font-family:monospace;margin-top:20px;font-size:1.2rem;">LOADING CYBER SYSTEM...</div>
    <div style="width:200px;height:4px;background:#1a1a2e;margin-top:15px;border-radius:2px;overflow:hidden;">
        <div style="width:0%;height:100%;background:#00ff41;animation:loadBar 2s ease-in-out forwards;"></div>
    </div>
</div>
<style>@keyframes loadBar{to{width:100%}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}</style>
<script>window.addEventListener("load",function(){setTimeout(function(){var ls=document.getElementById("loading-screen");if(ls){ls.style.opacity="0";setTimeout(function(){ls.remove()},500);}},1500);});</script>
'''

for level_file in sorted(glob.glob('levels/level*.html')):
    with open(level_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # Add lives HUD
    if 'hud-lives' not in content:
        content = content.replace(
            '<div class="hud-item"><div class="hud-label">الشرارة</div><div class="hud-value" id="hud-streak"',
            '<div class="hud-item"><div class="hud-label">الحياة</div><div class="hud-value" id="hud-lives">❤️❤️❤️</div></div>\n            <div class="hud-item"><div class="hud-label">الشرارة</div><div class="hud-value" id="hud-streak"'
        )
        modified = True
        print(f'✅ Added lives HUD to {os.path.basename(level_file)}')
    
    # Add loading screen
    if 'loading-screen' not in content and '<body>' in content:
        content = content.replace('<body>', '<body>\n' + loading_screen)
        modified = True
        print(f'✅ Added loading screen to {os.path.basename(level_file)}')
    
    if modified:
        with open(level_file, 'w', encoding='utf-8') as f:
            f.write(content)

print('\\n🎉 HUD FIXES COMPLETE!')
