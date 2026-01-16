import { useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import "./Contact.css";
const Contact = () => {
    const refProp = useRef(null);
    useScrollReveal(refProp, 'visible');
    return (
        <section id="contact">
        <div ref={refProp} className="xf-scale glass-card">
            <h2 className='mb-3'>Contactez-moi</h2>
            <p className='contact-item'>Prêt à donner vie à votre projet ? Contactez-moi pour discuter de vos idées.</p>
            <p className='contact-item'><i className="bx bx-envelope icon"></i>: amadouaboubakar439@gmail.com</p>
            <p className='contact-item'><i className="bx bx-phone-call icon"></i>: +229 01 52 62 41 75</p>
            <p className='contact-item'><i className="bx bxl-whatsapp icon"></i>: +229 01 52 62 41 75</p>
            <p className='contact-item'><i className="bx bxl-linkedin icon"></i>: linkedin.com/in/amadouaboubakar</p>
            <p className='contact-item'><i className="bx bxl-discord icon"></i>: @anelka</p>
            <p className='contact-item'><i className="bx bxl-telegram icon"></i> @Abougaelle</p>
        </div>
        </section>
    );
};

export default Contact;