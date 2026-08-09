/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           LEADERBOARD UI - Cyber RPG v3.6                   ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const LeaderboardUI = (function() {
    'use strict';

    function showLeaderboard() {
        let modal = document.getElementById('cyber-leaderboard-modal');
        if (modal) {
            modal.style.display = 'flex';
            loadAndRender();
            return;
        }

        modal = document.createElement('div');
        modal.id = 'cyber-leaderboard-modal';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:99999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px);';
        
        modal.innerHTML = `
            <div style="background:var(--panel-bg);border:2px solid var(--neon-gold);border-radius:20px;padding:30px;max-width:500px;width:90%;max-height:80vh;overflow-y:auto;box-shadow:0 0 50px rgba(255,215,0,0.2);position:relative;">
                <button onclick="document.getElementById('cyber-leaderboard-modal').style.display='none'" style="position:absolute;top:15px;left:15px;background:none;border:none;color:var(--neon-red);font-size:1.5rem;cursor:pointer;">✕</button>
                
                <h2 style="text-align:center;color:var(--neon-gold);font-family:var(--font-display);margin-bottom:10px;font-size:2rem;">🏆 المتصدرين</h2>
                <p style="text-align:center;color:rgba(255,255,255,0.5);font-family:var(--font-mono);margin-bottom:25px;font-size:0.9rem;">أفضل الـ Agents في العالم</p>
                
                <div id="leaderboard-loading" style="text-align:center;padding:40px;color:var(--neon-green);font-family:var(--font-mono);">⏳ جاري التحميل...</div>
                <div id="leaderboard-list" style="display:none;"></div>
                
                <div id="leaderboard-user-rank" style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,215,0,0.2);display:none;"></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        loadAndRender();
    }

    async function loadAndRender() {
        const listEl = document.getElementById('leaderboard-list');
        const loadingEl = document.getElementById('leaderboard-loading');
        const userRankEl = document.getElementById('leaderboard-user-rank');
        
        const result = await window.FirebaseDB.getLeaderboard(20);
        
        loadingEl.style.display = 'none';
        listEl.style.display = 'block';
        
        if (!result.success || result.data.length === 0) {
            listEl.innerHTML = '<div style="text-align:center;padding:30px;color:rgba(255,255,255,0.5);font-family:var(--font-mono);">📭 لا يوجد متصدرين بعد<br>كن أول Agent!</div>';
            return;
        }
        
        let html = '';
        result.data.forEach((player, index) => {
            const isTop3 = index < 3;
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `<span style="color:rgba(255,255,255,0.5);">${index + 1}</span>`;
            const glow = isTop3 ? 'box-shadow:0 0 15px rgba(255,215,0,0.3);border-color:var(--neon-gold);' : '';
            const bg = isTop3 ? 'background:rgba(255,215,0,0.05);' : '';
            
            html += `
                <div style="display:flex;align-items:center;gap:15px;padding:15px;margin-bottom:10px;border:1px solid ${isTop3 ? 'var(--neon-gold)' : 'rgba(0,255,65,0.2)'};border-radius:12px;${glow}${bg}">
                    <div style="font-size:1.5rem;width:40px;text-align:center;">${medal}</div>
                    <div style="flex:1;">
                        <div style="font-family:var(--font-display);color:${isTop3 ? 'var(--neon-gold)' : '#fff'};font-size:1.1rem;">${player.name}</div>
                        <div style="font-family:var(--font-mono);font-size:0.8rem;color:rgba(255,255,255,0.5);">${player.rankTitle}</div>
                    </div>
                    <div style="text-align:left;">
                        <div style="font-family:var(--font-display);color:var(--neon-green);font-size:1.2rem;">${player.xp.toLocaleString()} XP</div>
                        <div style="font-family:var(--font-mono);font-size:0.8rem;color:rgba(255,255,255,0.5);">مستوى ${player.level}</div>
                    </div>
                </div>
            `;
        });
        
        listEl.innerHTML = html;
        
        // Show current user's rank if logged in
        const currentUser = window.FirebaseAuth.getCurrentUser();
        if (currentUser) {
            const userDoc = await window.FirebaseConfig.db.collection('users').doc(currentUser.uid).get();
            if (userDoc.exists) {
                const data = userDoc.data();
                userRankEl.style.display = 'block';
                userRankEl.innerHTML = `
                    <div style="display:flex;align-items:center;gap:15px;padding:15px;background:rgba(0,255,65,0.05);border:1px solid var(--neon-green);border-radius:12px;">
                        <div style="font-size:2rem;">👤</div>
                        <div style="flex:1;">
                            <div style="font-family:var(--font-display);color:var(--neon-green);">أنت: ${data.displayName || 'Agent'}</div>
                            <div style="font-family:var(--font-mono);font-size:0.8rem;color:rgba(255,255,255,0.5);">${data.rank || '👶 Script Kiddie'}</div>
                        </div>
                        <div style="text-align:left;">
                            <div style="font-family:var(--font-display);color:var(--neon-gold);">${(data.totalXP || 0).toLocaleString()} XP</div>
                            <div style="font-family:var(--font-mono);font-size:0.8rem;color:rgba(255,255,255,0.5);">مستوى ${data.highestLevel || 1}</div>
                        </div>
                    </div>
                `;
            }
        }
    }

    return {
        show: showLeaderboard,
        refresh: loadAndRender
    };
})();

window.LeaderboardUI = LeaderboardUI;
