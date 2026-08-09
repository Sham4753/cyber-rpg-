/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           FIREBASE DATABASE - Cyber RPG v3.6                ║
 * ║     حفظ التقدم + المتصدرين + الإنجازات + التحديات اليومية   ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const FirebaseDB = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════
    // SAVE PROGRESS - حفظ التقدم
    // ═══════════════════════════════════════════════════════════
    async function saveProgress(progressData) {
        const user = window.FirebaseAuth.getCurrentUser();
        if (!user) {
            // Fallback to localStorage
            localStorage.setItem('cyberRPG_state', JSON.stringify(progressData));
            return { success: false, local: true };
        }
        
        const db = window.FirebaseConfig.db;
        try {
            await db.collection('users').doc(user.uid).update({
                totalXP: progressData.xp || 0,
                highestLevel: progressData.level || 1,
                rank: progressData.rank || '👶 Script Kiddie',
                tools: progressData.tools || [],
                achievements: progressData.achievements || [],
                lastPlayed: firebase.firestore.FieldValue.serverTimestamp(),
                lastSession: progressData.currentSession || {}
            });
            console.log('☁️ Progress saved to cloud');
            return { success: true };
        } catch(e) {
            console.error('Save error:', e);
            localStorage.setItem('cyberRPG_state', JSON.stringify(progressData));
            return { success: false, local: true, error: e.message };
        }
    }

    // ═══════════════════════════════════════════════════════════
    // LOAD PROGRESS - قراءة التقدم
    // ═══════════════════════════════════════════════════════════
    async function loadProgress() {
        const user = window.FirebaseAuth.getCurrentUser();
        
        // Try local first
        const localData = localStorage.getItem('cyberRPG_state');
        let localProgress = localData ? JSON.parse(localData) : null;
        
        if (!user) {
            return { success: false, local: true, data: localProgress };
        }
        
        const db = window.FirebaseConfig.db;
        try {
            const doc = await db.collection('users').doc(user.uid).get();
            if (doc.exists) {
                const cloudData = doc.data();
                console.log('☁️ Progress loaded from cloud');
                
                // Merge local and cloud (higher values win)
                const merged = {
                    ...localProgress,
                    xp: Math.max(localProgress?.xp || 0, cloudData.totalXP || 0),
                    level: Math.max(localProgress?.level || 1, cloudData.highestLevel || 1),
                    rank: cloudData.rank || localProgress?.rank || '👶 Script Kiddie',
                    achievements: cloudData.achievements || localProgress?.achievements || [],
                    tools: cloudData.tools || localProgress?.tools || []
                };
                
                return { success: true, data: merged };
            }
            return { success: false, local: true, data: localProgress };
        } catch(e) {
            console.error('Load error:', e);
            return { success: false, local: true, data: localProgress };
        }
    }

    // ═══════════════════════════════════════════════════════════
    // LEADERBOARD - المتصدرين
    // ═══════════════════════════════════════════════════════════
    async function getLeaderboard(limit_count) {
        limit_count = limit_count || 20;
        const db = window.FirebaseConfig.db;
        
        try {
            const snapshot = await db.collection('users')
                .orderBy('totalXP', 'desc')
                .limit(limit_count)
                .get();
            
            const leaderboard = [];
            let rank = 1;
            snapshot.forEach(doc => {
                const data = doc.data();
                leaderboard.push({
                    rank: rank,
                    name: data.displayName || 'Agent',
                    xp: data.totalXP || 0,
                    level: data.highestLevel || 1,
                    rankTitle: data.rank || '👶 Script Kiddie',
                    photo: data.photoURL || ''
                });
                rank++;
            });
            
            return { success: true, data: leaderboard };
        } catch(e) {
            console.error('Leaderboard error:', e);
            return { success: false, data: [] };
        }
    }

    // ═══════════════════════════════════════════════════════════
    // UPDATE LEADERBOARD - تحديث المتصدرين
    // ═══════════════════════════════════════════════════════════
    async function updateLeaderboard(xp, level) {
        const user = window.FirebaseAuth.getCurrentUser();
        if (!user) return { success: false };
        
        const db = window.FirebaseConfig.db;
        try {
            await db.collection('leaderboard').doc(user.uid).set({
                uid: user.uid,
                displayName: user.displayName || 'Agent',
                photoURL: user.photoURL || '',
                totalXP: xp,
                highestLevel: level,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true };
        } catch(e) {
            console.error('Leaderboard update error:', e);
            return { success: false };
        }
    }

    // ═══════════════════════════════════════════════════════════
    // DAILY CHALLENGE - التحدي اليومي
    // ═══════════════════════════════════════════════════════════
    async function getDailyChallenge() {
        const db = window.FirebaseConfig.db;
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        
        try {
            const doc = await db.collection('daily_challenges').doc(today).get();
            if (doc.exists) {
                return { success: true, data: doc.data() };
            }
            
            // Generate new challenge if not exists
            const challenges = [
                { type: 'quiz', title: 'اختبار سريع', xp: 50, description: 'أجب على 3 أسئلة بشكل صحيح' },
                { type: 'terminal', title: 'اختراق سريع', xp: 75, description: 'اكتب 5 أوامر صحيحة في Terminal' },
                { type: 'code', title: 'تحدي برمجي', xp: 100, description: 'اكتب دالة Python صحيحة' },
                { type: 'speed', title: 'سباق الوقت', xp: 60, description: 'أكمل الدرس في أقل من 3 دقائق' }
            ];
            const random = challenges[Math.floor(Math.random() * challenges.length)];
            random.date = today;
            random.completed = false;
            
            await db.collection('daily_challenges').doc(today).set(random);
            return { success: true, data: random };
        } catch(e) {
            console.error('Daily challenge error:', e);
            return { success: false, data: null };
        }
    }

    async function completeDailyChallenge() {
        const user = window.FirebaseAuth.getCurrentUser();
        if (!user) return { success: false };
        
        const today = new Date().toISOString().split('T')[0];
        const db = window.FirebaseConfig.db;
        
        try {
            // Mark challenge as completed for user
            await db.collection('users').doc(user.uid).collection('completed_challenges').doc(today).set({
                completedAt: firebase.firestore.FieldValue.serverTimestamp(),
                date: today
            });
            return { success: true };
        } catch(e) {
            return { success: false };
        }
    }

    // ═══════════════════════════════════════════════════════════
    // ACHIEVEMENTS - الإنجازات
    // ═══════════════════════════════════════════════════════════
    async function unlockAchievement(achievementId) {
        const user = window.FirebaseAuth.getCurrentUser();
        if (!user) return { success: false };
        
        const db = window.FirebaseConfig.db;
        const achievements = {
            'first_login': { title: 'أول دخول', desc: 'سجل دخولك للمرة الأولى', icon: '🚪' },
            'level_5': { title: 'هاكر صاعد', desc: 'وصل للمستوى 5', icon: '📈' },
            'level_10': { title: 'هاكر محترف', desc: 'وصل للمستوى 10', icon: '🏆' },
            'streak_7': { title: 'المثابر', desc: 'لعب 7 أيام متتالية', icon: '🔥' },
            'perfect_quiz': { title: 'عبقري', desc: 'أجب على كل الأسئلة بشكل صحيح', icon: '🧠' },
            'speed_run': { title: 'السريع', desc: 'أكمل درس في أقل من دقيقتين', icon: '⚡' },
            'boss_defeated': { title: 'قاتل البوس', desc: 'هزم PHANTOM', icon: '👹' },
            'all_tools': { title: 'مجمع الأدوات', desc: 'جمع كل الأدوات', icon: '🔧' }
        };
        
        try {
            const ach = achievements[achievementId];
            if (!ach) return { success: false };
            
            await db.collection('users').doc(user.uid).collection('achievements').doc(achievementId).set({
                ...ach,
                unlockedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            // Add XP bonus
            await db.collection('users').doc(user.uid).update({
                totalXP: firebase.firestore.FieldValue.increment(100)
            });
            
            return { success: true, achievement: ach };
        } catch(e) {
            return { success: false };
        }
    }

    // ═══════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════
    return {
        saveProgress,
        loadProgress,
        getLeaderboard,
        updateLeaderboard,
        getDailyChallenge,
        completeDailyChallenge,
        unlockAchievement
    };
})();

window.FirebaseDB = FirebaseDB;
