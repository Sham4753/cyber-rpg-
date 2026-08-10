/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║    MOBILE NAVIGATION - Unified Floating Menu                ║
 * ║    يحل مشكلة تداخل الأزرار على الجوال                         ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

(function() {
    // Remove all scattered floating buttons
    function cleanupButtons() {
        const selectors = [
            'button[id*="arena"]',
            'button[title*="ARENA"]',
            'button[id*="market"]',
            'button[title*="MARKET"]',
            'button[id*="pro"]',
            'button[title*="PRO"]',
            'button[id*="stealth"]',
            'button[id*="glitch"]'
        ];
        
        selectors.forEach(sel => {
            const btns = document.querySelectorAll(sel);
            btns.forEach(btn => {
                if (btn && btn.parentNode && btn.style.position === 'fixed') {
                    btn.style.display = 'none';
                }
            });
        });
    }
    
    // Create unified menu
    function createMobileMenu() {
        // Remove old menu if exists
        const old = document.getElementById('cyber-mobile-menu');
        if (old) old.remove();
        
        const menu = document.createElement('div');
        menu.id = 'cyber-mobile-menu';
        menu.innerHTML = `
            <button id="menu-toggle" style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #ff2d95, #b829dd);
                color: #fff;
                border: none;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 99999;
                box-shadow: 0 0 20px rgba(255,45,149,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
            ">☰</button>
            
            <div id="menu-items" style="
                position: fixed;
                bottom: 80px;
                right: 20px;
                display: none;
                flex-direction: column;
                gap: 8px;
                z-index: 99998;
            ">
                <button onclick="if(window.CyberGangWar)window.CyberGangWar.openArena()" style="
                    background: #ff2d95; color: #fff; border: none;
                    padding: 12px 20px; border-radius: 25px;
                    font-weight: bold; cursor: pointer;
                    box-shadow: 0 0 15px rgba(255,45,149,0.5);
                    white-space: nowrap;
                ">⚔️ ARENA</button>
                
                <button onclick="if(window.CyberDarkMarket)window.CyberDarkMarket.openMarket()" style="
                    background: #b829dd; color: #fff; border: none;
                    padding: 12px 20px; border-radius: 25px;
                    font-weight: bold; cursor: pointer;
                    box-shadow: 0 0 15px rgba(184,41,221,0.5);
                    white-space: nowrap;
                ">🛒 MARKET</button>
                
                <button onclick="if(window.CyberPro)window.CyberPro.showProMenu()" style="
                    background: #00d4ff; color: #000; border: none;
                    padding: 12px 20px; border-radius: 25px;
                    font-weight: bold; cursor: pointer;
                    box-shadow: 0 0 15px rgba(0,212,255,0.5);
                    white-space: nowrap;
                ">🛡️ PRO</button>
            </div>
        `;
        
        document.body.appendChild(menu);
        
        // Toggle menu
        document.getElementById('menu-toggle').addEventListener('click', function() {
            const items = document.getElementById('menu-items');
            if (items.style.display === 'flex') {
                items.style.display = 'none';
                this.textContent = '☰';
            } else {
                items.style.display = 'flex';
                this.textContent = '✕';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const menu = document.getElementById('cyber-mobile-menu');
            if (menu && !menu.contains(e.target)) {
                const items = document.getElementById('menu-items');
                const toggle = document.getElementById('menu-toggle');
                if (items) items.style.display = 'none';
                if (toggle) toggle.textContent = '☰';
            }
        });
    }
    
    // Run on load
    window.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            cleanupButtons();
            createMobileMenu();
        }, 1000);
    });
    
    console.log('📱 Mobile Navigation ready');
})();
