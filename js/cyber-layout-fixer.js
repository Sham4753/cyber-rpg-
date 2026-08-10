/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║    ULTIMATE LAYOUT FIXER - Mobile Alignment                 ║
 * ║    يعمل تلقائياً عند تحميل الصفحة                              ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

(function() {
    function fixMobileLayout() {
        if (window.innerWidth <= 768) {
            document.documentElement.style.width = '100vw';
            document.documentElement.style.overflowX = 'hidden';
            document.body.style.width = '100vw';
            document.body.style.overflowX = 'hidden';
            document.body.style.margin = '0';
            document.body.style.padding = '0';
            
            const elements = document.querySelectorAll('div, section, main, header');
            elements.forEach(el => {
                const style = window.getComputedStyle(el);
                const width = parseInt(style.width);
                
                if (width > window.innerWidth || 
                    (el.style.width && el.style.width.includes('px') && parseInt(el.style.width) > window.innerWidth)) {
                    el.style.width = '100%';
                    el.style.maxWidth = '100vw';
                    el.style.boxSizing = 'border-box';
                    el.style.marginLeft = '0';
                    el.style.marginRight = '0';
                    el.style.left = '0';
                }
            });
        }
    }
    
    window.addEventListener('load', fixMobileLayout);
    window.addEventListener('resize', fixMobileLayout);
    
    // فحص كل ثانية للتأكد
    setInterval(fixMobileLayout, 1000);
    
    console.log('📱 Layout Fixer activated');
})();
