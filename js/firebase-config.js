/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           FIREBASE CONFIGURATION - Cyber RPG v3.6           ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

// ⚠️ هذه الإعدادات مجانية وآمنة - المفتاح عام (browser key)
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDummyKeyForCyberRPG123456789",
    authDomain: "cyber-rpg-game.firebaseapp.com",
    projectId: "cyber-rpg-game",
    storageBucket: "cyber-rpg-game.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase
let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;

function initFirebase() {
    if (typeof firebase === 'undefined') {
        console.warn('Firebase SDK not loaded yet');
        return false;
    }
    if (firebaseApp) return true;
    
    try {
        firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
        firebaseAuth = firebase.auth();
        firebaseDb = firebase.firestore();
        console.log('🔥 Firebase initialized successfully');
        return true;
    } catch(e) {
        console.error('Firebase init error:', e);
        return false;
    }
}

// Check if Firebase is available
function isFirebaseReady() {
    return firebaseApp !== null && firebaseAuth !== null && firebaseDb !== null;
}

// Export
window.FirebaseConfig = {
    init: initFirebase,
    isReady: isFirebaseReady,
    get app() { return firebaseApp; },
    get auth() { return firebaseAuth; },
    get db() { return firebaseDb; }
};
