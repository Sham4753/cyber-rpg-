/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           SAVE SYSTEM - Cyber RPG v3.6                      ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const SaveSystem = {
    save: function(levelNumber, data = {}) {
        const saveKey = 'cyberRPG_level_' + levelNumber;
        const saveData = {
            level: levelNumber,
            completed: true,
            xp: data.xp || 100,
            date: new Date().toISOString()
        };
        localStorage.setItem(saveKey, JSON.stringify(saveData));
        localStorage.setItem('cyberRPG_level', levelNumber);
        localStorage.setItem('cyberRPG_date', new Date().toLocaleString());
        
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            try {
                const user = firebase.auth().currentUser;
                if (user) {
                    firebase.firestore().collection('progress').doc(user.uid).set({
                        ['level' + levelNumber]: saveData,
                        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
                    }, { merge: true });
                }
            } catch(e) {}
        }
    },
    
    load: function(levelNumber) {
        const saveKey = 'cyberRPG_level_' + levelNumber;
        const saved = localStorage.getItem(saveKey);
        return saved ? JSON.parse(saved) : null;
    }
};

window.SaveSystem = SaveSystem;
