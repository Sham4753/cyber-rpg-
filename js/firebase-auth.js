/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           FIREBASE AUTH - Cyber RPG v3.6                    ║
 * ║     تسجيل دخول / تسجيل جديد / تسجيل خروج / Google Sign-In  ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const FirebaseAuth = (function() {
    'use strict';

    let currentUser = null;
    let authListeners = [];

    // ═══════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════
    function init() {
        if (!window.FirebaseConfig || !window.FirebaseConfig.isReady()) {
            console.warn('Firebase not ready for auth');
            return false;
        }
        
        const auth = window.FirebaseConfig.auth;
        
        // Listen for auth state changes
        auth.onAuthStateChanged(user => {
            currentUser = user;
            authListeners.forEach(fn => fn(user));
            
            if (user) {
                console.log('✅ User signed in:', user.email || user.displayName);
                // Load user progress from cloud
                loadUserProgress(user.uid);
            } else {
                console.log('👤 No user signed in');
            }
        });
        
        return true;
    }

    // ═══════════════════════════════════════════════════════════
    // SIGN UP - تسجيل جديد
    // ═══════════════════════════════════════════════════════════
    async function signUp(email, password, displayName) {
        const auth = window.FirebaseConfig.auth;
        try {
            const result = await auth.createUserWithEmailAndPassword(email, password);
            // Update display name
            await result.user.updateProfile({ displayName: displayName || 'Agent' });
            // Create user document in Firestore
            await createUserDocument(result.user.uid, {
                email: email,
                displayName: displayName || 'Agent',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                totalXP: 0,
                highestLevel: 1,
                rank: '👶 Script Kiddie',
                achievements: []
            });
            
            if (window.CyberEngine) {
                window.CyberEngine.agentSpeak('correct', '🎉 تم إنشاء الحساب! مرحباً Agent!');
                window.CyberEngine.audio.success();
            }
            return { success: true, user: result.user };
        } catch(error) {
            console.error('Sign up error:', error);
            const msg = getErrorMessage(error.code);
            if (window.CyberEngine) window.CyberEngine.agentSpeak('wrong', '❌ ' + msg);
            return { success: false, error: msg };
        }
    }

    // ═══════════════════════════════════════════════════════════
    // SIGN IN - تسجيل دخول
    // ═══════════════════════════════════════════════════════════
    async function signIn(email, password) {
        const auth = window.FirebaseConfig.auth;
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            if (window.CyberEngine) {
                window.CyberEngine.agentSpeak('correct', '✅ مرحباً بعودتك، ' + (result.user.displayName || 'Agent') + '!');
                window.CyberEngine.audio.success();
            }
            return { success: true, user: result.user };
        } catch(error) {
            console.error('Sign in error:', error);
            const msg = getErrorMessage(error.code);
            if (window.CyberEngine) window.CyberEngine.agentSpeak('wrong', '❌ ' + msg);
            return { success: false, error: msg };
        }
    }

    // ═══════════════════════════════════════════════════════════
    // GOOGLE SIGN IN - تسجيل دخول بجوجل
    // ═══════════════════════════════════════════════════════════
    async function signInWithGoogle() {
        const auth = window.FirebaseConfig.auth;
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            const result = await auth.signInWithPopup(provider);
            // Check if new user
            const isNewUser = result.additionalUserInfo.isNewUser;
            if (isNewUser) {
                await createUserDocument(result.user.uid, {
                    email: result.user.email,
                    displayName: result.user.displayName || 'Agent',
                    photoURL: result.user.photoURL || '',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    totalXP: 0,
                    highestLevel: 1,
                    rank: '👶 Script Kiddie',
                    achievements: []
                });
            }
            if (window.CyberEngine) {
                window.CyberEngine.agentSpeak('correct', '✅ مرحباً ' + (result.user.displayName || 'Agent') + '!');
                window.CyberEngine.audio.success();
            }
            return { success: true, user: result.user };
        } catch(error) {
            console.error('Google sign in error:', error);
            const msg = getErrorMessage(error.code);
            return { success: false, error: msg };
        }
    }

    // ═══════════════════════════════════════════════════════════
    // SIGN OUT - تسجيل خروج
    // ═══════════════════════════════════════════════════════════
    async function signOut() {
        const auth = window.FirebaseConfig.auth;
        try {
            await auth.signOut();
            currentUser = null;
            if (window.CyberEngine) {
                window.CyberEngine.agentSpeak('correct', '👋 تم تسجيل الخروج');
            }
            return { success: true };
        } catch(error) {
            return { success: false, error: error.message };
        }
    }

    // ═══════════════════════════════════════════════════════════
    // CREATE USER DOCUMENT
    // ═══════════════════════════════════════════════════════════
    async function createUserDocument(uid, data) {
        const db = window.FirebaseConfig.db;
        try {
            await db.collection('users').doc(uid).set(data);
            console.log('✅ User document created');
        } catch(e) {
            console.error('Error creating user doc:', e);
        }
    }

    // ═══════════════════════════════════════════════════════════
    // LOAD USER PROGRESS
    // ═══════════════════════════════════════════════════════════
    async function loadUserProgress(uid) {
        const db = window.FirebaseConfig.db;
        try {
            const doc = await db.collection('users').doc(uid).get();
            if (doc.exists) {
                const data = doc.data();
                console.log('📥 Cloud progress loaded:', data);
                
                // Merge with local state
                if (window.CyberEngine && window.CyberEngine.state) {
                    window.CyberEngine.state.xp = data.totalXP || 0;
                    window.CyberEngine.state.level = data.highestLevel || 1;
                    window.CyberEngine.state.rank = data.rank || '👶 Script Kiddie';
                    window.CyberEngine.state.achievements = data.achievements || [];
                    window.CyberEngine.updateHUD();
                }
            }
        } catch(e) {
            console.error('Error loading progress:', e);
        }
    }

    // ═══════════════════════════════════════════════════════════
    // ERROR MESSAGES
    // ═══════════════════════════════════════════════════════════
    function getErrorMessage(code) {
        const errors = {
            'auth/invalid-email': 'البريد الإلكتروني غير صالح',
            'auth/user-disabled': 'الحساب معطل',
            'auth/user-not-found': 'الحساب غير موجود',
            'auth/wrong-password': 'كلمة المرور خاطئة',
            'auth/email-already-in-use': 'البريد مستخدم بالفعل',
            'auth/weak-password': 'كلمة المرور ضعيفة (6 أحرف على الأقل)',
            'auth/invalid-credential': 'البيانات غير صحيحة',
            'auth/popup-closed-by-user': 'تم إغلاق نافذة تسجيل الدخول',
            'auth/cancelled-popup-request': 'تم إلغاء الطلب',
            'auth/network-request-failed': 'خطأ في الاتصال بالشبكة'
        };
        return errors[code] || 'حدث خطأ: ' + code;
    }

    // ═══════════════════════════════════════════════════════════
    // GET CURRENT USER
    // ═══════════════════════════════════════════════════════════
    function getCurrentUser() {
        return currentUser;
    }

    function isLoggedIn() {
        return currentUser !== null;
    }

    function onAuthStateChanged(callback) {
        authListeners.push(callback);
        // Call immediately if already known
        if (currentUser !== undefined) callback(currentUser);
    }

    // ═══════════════════════════════════════════════════════════
    // UI HELPERS - نماذج HTML جاهزة
    // ═══════════════════════════════════════════════════════════
    function showAuthModal() {
        // Check if modal already exists
        let modal = document.getElementById('cyber-auth-modal');
        if (modal) {
            modal.style.display = 'flex';
            return;
        }

        modal = document.createElement('div');
        modal.id = 'cyber-auth-modal';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:99999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px);';
        
        modal.innerHTML = `
            <div style="background:var(--panel-bg);border:2px solid var(--neon-green);border-radius:20px;padding:40px;max-width:400px;width:90%;box-shadow:0 0 50px rgba(0,255,65,0.2);position:relative;">
                <button onclick="document.getElementById('cyber-auth-modal').style.display='none'" style="position:absolute;top:15px;left:15px;background:none;border:none;color:var(--neon-red);font-size:1.5rem;cursor:pointer;">✕</button>
                
                <h2 style="text-align:center;color:var(--neon-green);font-family:var(--font-display);margin-bottom:30px;font-size:1.8rem;">🔐 تسجيل الدخول</h2>
                
                <div id="auth-tabs" style="display:flex;margin-bottom:20px;border-bottom:1px solid rgba(0,255,65,0.2);">
                    <button id="tab-login" class="auth-tab active" style="flex:1;padding:10px;background:none;border:none;color:var(--neon-green);font-family:var(--font-mono);cursor:pointer;border-bottom:2px solid var(--neon-green);">دخول</button>
                    <button id="tab-signup" class="auth-tab" style="flex:1;padding:10px;background:none;border:none;color:rgba(255,255,255,0.5);font-family:var(--font-mono);cursor:pointer;border-bottom:2px solid transparent;">تسجيل</button>
                </div>
                
                <div id="auth-login-form">
                    <input type="email" id="auth-email" placeholder="📧 البريد الإلكتروني" style="width:100%;padding:15px;margin-bottom:15px;background:rgba(0,0,0,0.5);border:1px solid var(--neon-green);border-radius:8px;color:#fff;font-family:var(--font-mono);font-size:1rem;outline:none;">
                    <input type="password" id="auth-password" placeholder="🔒 كلمة المرور" style="width:100%;padding:15px;margin-bottom:20px;background:rgba(0,0,0,0.5);border:1px solid var(--neon-green);border-radius:8px;color:#fff;font-family:var(--font-mono);font-size:1rem;outline:none;">
                    <button id="btn-login" class="cyber-btn primary" style="width:100%;margin-bottom:15px;">تسجيل الدخول</button>
                </div>
                
                <div id="auth-signup-form" style="display:none;">
                    <input type="text" id="auth-name" placeholder="👤 الاسم (Agent Name)" style="width:100%;padding:15px;margin-bottom:15px;background:rgba(0,0,0,0.5);border:1px solid var(--neon-green);border-radius:8px;color:#fff;font-family:var(--font-mono);font-size:1rem;outline:none;">
                    <input type="email" id="auth-email-signup" placeholder="📧 البريد الإلكتروني" style="width:100%;padding:15px;margin-bottom:15px;background:rgba(0,0,0,0.5);border:1px solid var(--neon-green);border-radius:8px;color:#fff;font-family:var(--font-mono);font-size:1rem;outline:none;">
                    <input type="password" id="auth-password-signup" placeholder="🔒 كلمة المرور (6+ أحرف)" style="width:100%;padding:15px;margin-bottom:20px;background:rgba(0,0,0,0.5);border:1px solid var(--neon-green);border-radius:8px;color:#fff;font-family:var(--font-mono);font-size:1rem;outline:none;">
                    <button id="btn-signup" class="cyber-btn primary" style="width:100%;margin-bottom:15px;">إنشاء حساب</button>
                </div>
                
                <div style="text-align:center;margin:20px 0;color:rgba(255,255,255,0.5);font-family:var(--font-mono);">أو</div>
                
                <button id="btn-google" class="cyber-btn" style="width:100%;display:flex;align-items:center;justify-content:center;gap:10px;">
                    <span style="font-size:1.5rem;">🔴</span>
                    <span>الدخول بحساب Google</span>
                </button>
                
                <div id="auth-error" style="color:var(--neon-red);text-align:center;margin-top:15px;font-family:var(--font-mono);min-height:20px;"></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Tab switching
        document.getElementById('tab-login').addEventListener('click', () => {
            document.getElementById('auth-login-form').style.display = 'block';
            document.getElementById('auth-signup-form').style.display = 'none';
            document.getElementById('tab-login').style.cssText = 'flex:1;padding:10px;background:none;border:none;color:var(--neon-green);font-family:var(--font-mono);cursor:pointer;border-bottom:2px solid var(--neon-green);';
            document.getElementById('tab-signup').style.cssText = 'flex:1;padding:10px;background:none;border:none;color:rgba(255,255,255,0.5);font-family:var(--font-mono);cursor:pointer;border-bottom:2px solid transparent;';
        });
        
        document.getElementById('tab-signup').addEventListener('click', () => {
            document.getElementById('auth-login-form').style.display = 'none';
            document.getElementById('auth-signup-form').style.display = 'block';
            document.getElementById('tab-signup').style.cssText = 'flex:1;padding:10px;background:none;border:none;color:var(--neon-green);font-family:var(--font-mono);cursor:pointer;border-bottom:2px solid var(--neon-green);';
            document.getElementById('tab-login').style.cssText = 'flex:1;padding:10px;background:none;border:none;color:rgba(255,255,255,0.5);font-family:var(--font-mono);cursor:pointer;border-bottom:2px solid transparent;';
        });
        
        // Login button
        document.getElementById('btn-login').addEventListener('click', async () => {
            const email = document.getElementById('auth-email').value;
            const password = document.getElementById('auth-password').value;
            const errorEl = document.getElementById('auth-error');
            
            if (!email || !password) {
                errorEl.textContent = '❌ الرجاء ملء جميع الحقول';
                return;
            }
            
            errorEl.textContent = '⏳ جاري تسجيل الدخول...';
            const result = await signIn(email, password);
            if (result.success) {
                modal.style.display = 'none';
                updateAuthUI();
            } else {
                errorEl.textContent = result.error;
            }
        });
        
        // Sign up button
        document.getElementById('btn-signup').addEventListener('click', async () => {
            const name = document.getElementById('auth-name').value;
            const email = document.getElementById('auth-email-signup').value;
            const password = document.getElementById('auth-password-signup').value;
            const errorEl = document.getElementById('auth-error');
            
            if (!email || !password) {
                errorEl.textContent = '❌ الرجاء ملء جميع الحقول';
                return;
            }
            
            errorEl.textContent = '⏳ جاري إنشاء الحساب...';
            const result = await signUp(email, password, name);
            if (result.success) {
                modal.style.display = 'none';
                updateAuthUI();
            } else {
                errorEl.textContent = result.error;
            }
        });
        
        // Google sign in
        document.getElementById('btn-google').addEventListener('click', async () => {
            const errorEl = document.getElementById('auth-error');
            errorEl.textContent = '⏳ جاري الاتصال بـ Google...';
            const result = await signInWithGoogle();
            if (result.success) {
                modal.style.display = 'none';
                updateAuthUI();
            } else {
                errorEl.textContent = result.error;
            }
        });
    }

    function updateAuthUI() {
        const user = getCurrentUser();
        const authBtn = document.getElementById('auth-button');
        
        if (user) {
            // User is logged in
            if (authBtn) {
                authBtn.innerHTML = '👤 ' + (user.displayName || 'Agent');
                authBtn.onclick = () => {
                    if (confirm('تسجيل الخروج؟')) {
                        signOut().then(() => {
                            authBtn.innerHTML = '🔐 تسجيل الدخول';
                            authBtn.onclick = () => showAuthModal();
                        });
                    }
                };
            }
        } else {
            // User is logged out
            if (authBtn) {
                authBtn.innerHTML = '🔐 تسجيل الدخول';
                authBtn.onclick = () => showAuthModal();
            }
        }
    }

    // ═══════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════
    return {
        init,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        getCurrentUser,
        isLoggedIn,
        onAuthStateChanged,
        showAuthModal,
        updateAuthUI
    };
})();

window.FirebaseAuth = FirebaseAuth;
