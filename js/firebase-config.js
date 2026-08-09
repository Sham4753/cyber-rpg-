/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           FIREBASE CONFIGURATION - Cyber RPG v3.6           ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAFsoX4iB-ntmBY-ovXthQXTxZMiK-OUSw",
    authDomain: "cyber-rpg-game.firebaseapp.com",
    projectId: "cyber-rpg-game",
    storageBucket: "cyber-rpg-game.firebasestorage.app",
    messagingSenderId: "916952659932",
    appId: "1:916952659932:web:58345add57b9aea1dac119",
    measurementId: "G-TB5V5F296G"
};

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

function isFirebaseReady() {
    return firebaseApp !== null && firebaseAuth !== null && firebaseDb !== null;
}

window.FirebaseConfig = {
    init: initFirebase,
    isReady: isFirebaseReady,
    get app() { return firebaseApp; },
    get auth() { return firebaseAuth; },
    get db() { return firebaseDb; }
};
