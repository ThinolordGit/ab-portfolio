import { tl_rend } from "../utils/utils";
import "./widgets.css";
import React, { useEffect, useRef, useState } from "react";


/**
 * PanelTogglerBtn component
 * 
 * @param props - HTMLAttributes<HTMLElement>
 */
function PanelTogglerBtn ({children,className = '', defaultState=false, style = {},onToggle= () => {  }, ...rest}) {
  const [on,setOn] = useState(defaultState);
  useEffect(() => { 
    setOn(defaultState)
  }, [defaultState]);
  return (
    <div role="button" tabIndex={0} className={"dash-panel-closer btn-ghost position-absolute "+className} style={style} onClick={ (e) => onToggle?.()} onKeyDown={(e) => e.key === "Enter" && onToggle?.()} {...rest}>
      { on ? <i className='bx bx-chevron-right fs-3' /> : <i className='bxr bx-book-content bx-grid-column-lef fs-3' /> }
    </div>
  );
}

const FuturisticShield = ({
  size = 200,            // Taille du SVG (largeur et hauteur)
  strokeWidth = 5,       // Largeur du bord lumineux
  glowSize = 6,          // Taille de l'effet lumineux (flou)
  borderColorStart = 'rgba(70, 215, 251, 0.8)',  // Couleur de départ du dégradé lumineux
  borderColorEnd = 'rgba(0, 200, 255, 0.41)'     // Couleur de fin du dégradé lumineux
}) => {
  // Calcul des rayons en fonction de la taille du SVG
  const radiusOuter = size/1.5;  // Rayon du cercle extérieur (prend la moitié de la taille du SVG)
  const radiusInner = radiusOuter - strokeWidth;  // Rayon du cercle intérieur, avec un petit ajustement
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width={size} height={size}>
      {/* Définition des filtres pour l'effet lumineux */}
      <defs>
        <filter id="blue-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation={glowSize} result="blurred" />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceAlpha" />
          </feMerge>
        </filter>
        <linearGradient id="blue-glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: borderColorStart, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: borderColorEnd, stopOpacity: 0 }} />
        </linearGradient>
      </defs>

      {/* Cercle extérieur : bord lumineux */}
      <circle cx="100" cy="100" r={radiusOuter} fill="none" stroke="url(#blue-glow)" strokeWidth={strokeWidth} filter="url(#blue-glow)" />
      
      {/* Cercle intérieur : dégradé bleu */}
      <circle cx="100" cy="100" r={radiusInner} fill="none" stroke="url(#blue-glow-gradient)" strokeWidth={strokeWidth * 2} />
    </svg>
  );
};

function Sphere({ size = 300, uniquy,...rest}) {
  // Générer les lignes de la sphère
  const rows = [];
  const nfois = 5;
  uniquy = uniquy || tl_rend(0,999999999)
  for (let i = 0; i < 180; i += (9*nfois)) {
    rows.push(<div className="line" style={{ transform: `rotateX(${i}deg)` }} key={uniquy+i}></div>);
  }
  for (let i = 0; i < 180; i+= (9*nfois)) {
    rows.push(<div className="line" style={{ transform: `rotateY(${i}deg)` }} key={uniquy*2+i}></div>);
  }
  
  return (
    <div className="shield" style={{ width: `${size}px`, height: `${size}px` }} {...rest}>
      <div className="shield-wrapper">
        <div className="sphere">
          {rows} {/* Insertion des lignes générées ici */}
        </div>
      </div>
    </div>
  );
}


// Composant pour shield-alt-left
const ShieldAltLeft = ({width=80,height=200,className,...rest}) => {
  return (
    <shield-alt-left className={className} style={{"width":`${width}px`,"height":`${height}px`}} {...rest}>
      <div className="shield-alt-wrapper">
        <div className="shield-alt">
          <div className="glow"></div>
        </div>
        <div className="effect-allure">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`allure-child al-${index + 1}`}
              style={{ '--i': index }}
            ></span>
          ))}
        </div>
      </div>
    </shield-alt-left>
  );
};

// Composant pour shield-alt-right
const ShieldAltRight = ({width=80,height=200,className,...rest}) => {
  return (
    <shield-alt-right className={className} style={{"width":`${width}px`,"height":`${height}px`}} {...rest}>
      <div className="shield-alt-wrapper">
        <div className="effect-allure">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`allure-child al-${index + 1}`}
              style={{ '--i': index }}
            ></span>
          ))}
        </div>
        <div className="shield-alt">
          <div className="glow"></div>
        </div>
      </div>
    </shield-alt-right>
  );
};

const Sturn = ({ className = '', width = 90,wunity="px", height = 10, hunity="px", ...rest }) => {
  return (
    <div className={`sturn ${className}`} style={{ height: `${height}${hunity}`, width: `${width}${wunity}` }} {...rest}>
      <div className="sturn-star-container">
        {[...Array(10)].map((_, index) => (
          <i key={index} className="bx bxs-star sturn-star" style={{ '--i': index }}></i>
        ))}
      </div>
    </div>
  );
}

const SingleSlash = ({ className = '', width = 150,wunity="px", height = 'fit-content', hunity="", ...rest }) => {
    // "singleslash-setEffect"
    return (
    <div className={`singleslashC ${className}`} style={{ height: `${height}${hunity}`, width: `${width}${wunity}` }} {...rest}>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="singleslash" style={{ '--i': index }}></div>
        ))}
      </div>
  );
}

function Bolt ({n=1, className=""}) {
  return (
    <div className={"bolt d-flex ai-center "+className} data-qt={-n}>-{n}<i className="bx bx-bolt" /></div>
  )
}

function Icon ({base='bx',ico="bx-star", className='', iconClass='', children, ...rest}) {
  
  return (
    <div className={className} {...rest}><i className={iconClass+` ${base} `+ico} />{children}</div>
  )
}

function ExpandableSection({
  title = "Section",
  titleClassName="",
  initiallyOpen = true,
  children,
  className = "",
  iconClass = "",
  contentClassName = "",
  style = {},
  editMode=false,
  actionNotice=true,
  noticeClassName="",
  isClickable=true,
  duration = 500, // durée de l'animation (ms)
  ...rest
}) {
  const [open, setOpen] = useState(initiallyOpen);
  const [height, setHeight] = useState(initiallyOpen ? "auto" : 0);
  const contentRef = useRef(null);

  // gère la hauteur animée
  useEffect(() => {
    const updateHeight = () => {
      const el = contentRef.current;
      if (!el) return;

      // Calculer la hauteur en fonction du contenu actuel
      if (open) {
        setHeight("auto"|| el.scrollHeight); // hauteur calculée de façon dynamique
      } else {
        setHeight(0); // hauteur réduite quand fermé
      }
    };

    // Initial update of height
    updateHeight();

    // Ajouter un écouteur pour redimensionner la fenêtre
    window.addEventListener("resize", updateHeight);

    // Nettoyer l'écouteur lors du démontage du composant
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [open]);
  
  // useEffect(() => {
  //   // On s'assure de réactualiser la hauteur chaque fois que le contenu change de mise en page
  //   // (par exemple : changement de colonnes, ou autres changements de layout)
  //   const handleResizeLayout = async () => {
  //     const el = contentRef.current;
  //     if (!el) return;
  //     setHeight(0);
  //     await sleep(duration);
  //     setHeight("auto");
  //     await sleep(duration);
  //     if (open){ 
  //       setHeight(el.scrollHeight); // Recalcul de la hauteur en fonction du layout actuel
  //     }
  //     else {
  //       setHeight(0)
  //     };
  //   };

  //   // Appeler immédiatement la fonction pour la première mise en page
  //   // handleResizeLayout();

  //   // Ajouter un événement pour réactualiser la hauteur si la disposition change (par ex. grid)
  //   window.addEventListener("resize", handleResizeLayout);

  //   return () => {
  //     window.removeEventListener("resize", handleResizeLayout);
  //   };
  //   // eslint-disable-next-line
  // }, [editMode,open]); // Chaque fois que le contenu change, on réajuste la hauteur.

  return (
    <div className={`expandable-section ${className}`} style={style} {...rest}>
      <div
        className="expandable-header d-flex ai-center jc-between pv-1 ph-2 mt-3"
        onClick={() => isClickable?setOpen(!open):""}
      >
        <span style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
          <span className={"span-ico d-inline-block "+iconClass} style={{transform: `rotate(${open ? 90 : 0}deg)`}} >
            ▶
          </span>
          <span className={"expandable-title "+titleClassName}>
            {title}
          </span>
        </span>
        <small className={""+noticeClassName}>
          {actionNotice?(open ? "Cliquer pour replier" : "Cliquer pour afficher"):""}
        </small>
      </div>

      <div
        ref={contentRef}
        className={"expandable-content " + contentClassName}
        style={{
          height: height, // La hauteur recalculée à chaque changement de disposition
          transition: `height ${duration}ms ease, opacity ${duration * 2}ms ease`,
          opacity: open ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function BurgerToggle({
  className="",
  defaultOpen = false,
  onToggle
}) {
  const [open, setOpen] = useState(defaultOpen);
  const toggleRef = useRef(null);
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     // if ((toggleRef.current && !toggleRef.current.parentElement?.parentElement?.querySelector(".position-absolute").contains(event.target))) {
  //     //   console.log(toggleRef.current.parentElement?.parentElement?.querySelector(".position-absolute"))
  //       if ((event.currentTarget !== toggleRef.current || toggleRef.current.contains(event.currentTarget))) {
  //         setOpen(false);
  //         onToggle?.(false);
  //       }
  //     // }
  //   };
  //   window.addEventListener("mousedown", handleClickOutside);
  //   return () => window.removeEventListener("mousedown", handleClickOutside);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [toggleRef.current]);
  
  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);
  
  const toggle = () => {
    const next = !open;
    setOpen(next);
    onToggle?.(next);
  };

  return (
    <button ref={toggleRef}
      className={`burger${className ? (" "+className) : ""}${open ? " open" : ""}`}
      onClick={toggle}
      aria-pressed={open}
      aria-label="Toggle menu"
    >
      <span />
      <span />
      <span />
    </button>
  );
}


function FloatingButton ({ children,className='', style={}, onClick=() => {}, onFocus=() => {}, onMouseOver=() => {}, onMouseOut=() => {}, ...rest}) {
  return (
    <div className={"floatingButton "+className} style={style} onFocus={onFocus} onMouseOver={onMouseOver} onClick={onClick} onMouseOut={onMouseOut} {...rest}>{children}</div>
  )
}



export {PanelTogglerBtn, FloatingButton, BurgerToggle, FuturisticShield,Sturn,Sphere,ShieldAltLeft, ShieldAltRight, SingleSlash, Bolt, Icon, ExpandableSection};
