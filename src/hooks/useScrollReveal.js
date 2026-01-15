import { useEffect } from 'react';

const useScrollReveal = (ref, animation) => {
  useEffect(() => {
    const element = ref?.current;
    if (!element || element === undefined) return;
    
    const efficientView = 40;
    let coef = 1 - (efficientView / 100);
    
    function checkVisibility() {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const offset = (viewportHeight * 0.15);
        const offsetB = (viewportHeight * 0.99);
        const nodeYmiddle = rect.height / 2;
        // Visible si le centre de la section est dans une zone autour du centre du viewport
        const isInView = (rect.top < (viewportHeight * coef) && offset <= rect.bottom) || (0 < rect.top && (rect.bottom - nodeYmiddle) < offsetB);
        
        if (isInView) {
            element.classList.add(animation);
        }
        else {
            element.classList.remove(animation);
        }
    }

    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);

    // Vérifie au mount
    checkVisibility();

    return () => {
        window.removeEventListener("scroll", checkVisibility);
        window.removeEventListener("resize", checkVisibility);
    };
  }, [ref, animation]);
};

export default useScrollReveal;