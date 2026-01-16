import { useEffect, useState } from "react";
import "./Navbar.css";
import { usePublicUri } from "../hooks/TlHooks";
import { BurgerToggle } from "../widgets/Widgets";

const Navbar = () => {
  const [active, setActive] = useState(window.location.hash || "#hero");
  useEffect(() => {
    const onHashChange = () => {
      setActive(window.location.hash || "#hero");
    };
    // console.log(window.location.hash)
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const [menuActive,setMenuActive] = useState(false);
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo"><div className="d-flex ai-center gap-3">
                    <img loading='lazy' src={usePublicUri("img/pp2.jpg")} alt={"Amadou Aboubakar Presention-p"} className="avis-avatar" />
                    <div className="fcol ai-start">
                        <span className="avis-name">AMADOU Aboubakar</span>
                        <span className="color-white">Portfolio</span>
                    </div>
                </div></div>
        <div className="content-wrapper">
            <div className="d-flex ai-center jc-between w-100 show-mobile" style={{zIndex: "inherit"}}>
                <BurgerToggle defaultOpen={menuActive} onToggle={setMenuActive} />
                <div className="d-flex ai-center gap-3">
                    <div className="fcol ai-end">
                        <span className="avis-name">AMADOU Aboubakar</span>
                        <span className="color-white">Portfolio</span>
                    </div>
                    <img loading='lazy' src={usePublicUri("img/pp2.jpg")} alt={"Amadou Aboubakar Presention-p"} className="avis-avatar" />
                </div>
            </div>
            {<div className={"nav-menu flex-col position-absolute "+(menuActive ? "active" : "")}>
                <div className="nav-items"><button type="button" onClick={ (e) => { window.location.href = `/${e.currentTarget.dataset?.to}` }} data-to="#hero" className={active === "#hero" ? "active" : ""}>Accueil</button></div>
                <div className="nav-items"><button type="button" onClick={ (e) => { window.location.href = `/${e.currentTarget.dataset?.to}` }} data-to="#about" className={active === "#about" ? "active" : ""}>À propos</button></div>
                <div className="nav-items"><button type="button" onClick={ (e) => { window.location.href = `/${e.currentTarget.dataset?.to}` }} data-to="#services" className={active === "#services" ? "active" : ""}>Services</button></div>
                <div className="nav-items"><button type="button" onClick={ (e) => { window.location.href = `/${e.currentTarget.dataset?.to}` }} data-to="#projects" className={active === "#projects" ? "active" : ""}>Projets</button></div>
                <div className="nav-items"><button type="button" onClick={ (e) => { window.location.href = `/${e.currentTarget.dataset?.to}` }} data-to="#testimonials" className={active === "#testimonials" ? "active" : ""}>Témoignages</button></div>
                <div className="nav-items"><button type="button" onClick={ (e) => { window.location.href = `/${e.currentTarget.dataset?.to}` }} data-to="#contact" className={active === "#contact" ? "active" : ""}>Contact</button></div>
            </div>}
            <div className="nav-menu hide-mobile">
                <div className="nav-items"><button type="button" onClick={ (e) => { window.location.href = `/${e.currentTarget.dataset?.to}` }} data-to="#hero" className={active === "#hero" ? "active" : ""}>Accueil</button></div>
                <div className="nav-items"><button type="button" onClick={ (e) => { window.location.href = `/${e.currentTarget.dataset?.to}` }} data-to="#about" className={active === "#about" ? "active" : ""}>À propos</button></div>
                <div className="nav-items"><button type="button" onClick={ (e) => { window.location.href = `/${e.currentTarget.dataset?.to}` }} data-to="#services" className={active === "#services" ? "active" : ""}>Services</button></div>
                <div className="nav-items"><button type="button" onClick={ (e) => { window.location.href = `/${e.currentTarget.dataset?.to}` }} data-to="#projects" className={active === "#projects" ? "active" : ""}>Projets</button></div>
                <div className="nav-items"><button type="button" onClick={ (e) => { window.location.href = `/${e.currentTarget.dataset?.to}` }} data-to="#testimonials" className={active === "#testimonials" ? "active" : ""}>Témoignages</button></div>
                <div className="nav-items"><button type="button" onClick={ (e) => { window.location.href = `/${e.currentTarget.dataset?.to}` }} data-to="#contact" className={active === "#contact" ? "active" : ""}>Contact</button></div>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
