import { useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import "./About.css";
import { usePublicUri } from '../hooks/TlHooks';

const About = () => {
  const refProp = useRef(null);
  useScrollReveal(refProp, 'visible');
  return (
    <section id="about">
      <div ref={refProp} className="xf-scale glass-card">
        <div className="fcol ai-center gap-4 w-100">
          <h2 className='mb-2'>À propos de moi</h2>
          <img loading='lazy' src={usePublicUri("img/pp2.jpg")} alt="Amadou Aboubakar About" className='avatar about-avatar show-it-mobile' />
          <div className="w-100 d-flex gap-1 ai-end">
            <div className="fcol">
              <p>Avec plus de 10 ans d'expérience dans le domaine digital, je suis passionné par l'innovation et l'entrepreneuriat. Mon parcours m'a conduit à créer des solutions numériques qui transforment les entreprises et les individus.</p>
              <p>Expert en marketing digital, développement web et stratégies de croissance, je m'engage à fournir des services de haute qualité qui dépassent les attentes de mes clients.</p>
            </div>
            <img loading='lazy' src={usePublicUri("img/pp2.jpg")} alt="Amadou Aboubakar About" className='avatar about-avatar hide-it-mobile' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;