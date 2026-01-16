import { useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import "./Hero.css";
import { usePublicUri } from '../hooks/TlHooks';

const Hero = () => {
    const refProp = useRef(null);
    useScrollReveal(refProp, 'visible');
    return (
        <section id="hero">
            <div className="spacer"></div>
            <div ref={refProp} className="xf-reveal glass-card">
                <div className="d-flex hero-row ai-start gap-4">
                    {/* <img loading='lazy' src="https://picsum.photos/300/300?random=1" alt="Amadou Aboubakar" className='avatar' /> */}
                    <img loading='lazy' src={usePublicUri("img/pp.jpg")} alt="Amadou Aboubakar Presentation" className='avatar' />
                    <div className="fcol flex-1">
                        <h1 className='mb-2 gradient-color'>AMADOU Aboubakar</h1>
                        <h2 className='mb-3 first'>Media-Buyer & Entrepreneur Digital</h2>
                        <p className='mt-2'>Transformant les idées en réalités numériques innovantes. Spécialisé dans le marketing digital, le développement web et les stratégies entrepreneuriales.</p>
                        <div className="row w-100"><button className="main-btn mt-2"> <i className="bx bx-download"></i> Télécharger mon CV</button></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;