/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║    ULTIMATE DOM CLEANER - Final Fix                         ║
 * ║    يخفي الأزرار القديمة + يثبت الشاشة                          ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

(function() {
    function enforceStrictMobileFit() {
        if (window.innerWidth <= 768) {
            document.documentElement.style.cssText = "width:100%!important;max-width:100vw!important;overflow-x:hidden!important;margin:0!important;padding:0!important;";
            document.body.style.cssText = "width:100%!important;max-width:100vw!important;overflow-x:hidden!important;margin:0!important;padding:5px!important;box-sizing:border-box!important;";
            
            const allElements = document.querySelectorAll('div, section, main, header, .cyber-container');
            allElements.forEach(el => {
                if (el.id !== 'cyber-mobile-menu' && !el.closest('#cyber-mobile-menu')) {
                    el.style.maxWidth = '100vw';
                    el.style.boxSizing = 'border-box';
                    if (el.style.position === 'fixed' || el.style.position === 'absolute') {
                        el.style.right = 'auto';
                        el.style.left = '0';
                        el.style.width = '100%';
                    }
                }
            });
            
            const scatteredButtons = document.querySelectorAll('button');
            scatteredButtons.forEach(btn => {
                const text = btn.innerText || '';
                const title = btn.getAttribute('title') || '';
                if ((text.includes('ARENA') || text.includes('MARKET') || text.includes('PRO') ||
                     title.includes('ARENA') || title.includes('MARKET')) &&
                    !btn.closest('#cyber-mobile-menu')) {
                    btn.style.display = 'none';
                }
            });
        }
    }
    
    window.addEventListener('DOMContentLoaded', enforceStrictMobileFit);
    window.addEventListener('load', enforceStrictMobileFit);
    window.addEventListener('resize', enforceStrictMobileFit);
    setInterval(enforceStrictMobileFit, 500);
})();
