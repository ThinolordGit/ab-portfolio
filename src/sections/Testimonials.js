import { useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Testimonials.css';

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <span 
        key={i+"star"}>
        <i
        className={`bx ${i < rating ? "bxs-star" : "bx-star"} rate-star`}
        ></i>
    </span>
  ));
};

const testimonialsData = [
  {
    id: 1,
    name: "Client Satisfait 1",
    avatar: "https://picsum.photos/100/100?random=10",
    testimonial: "AMADOU a transformé notre présence en ligne. Ses stratégies ont doublé nos ventes en quelques mois.",
    rating: 5
  },
  {
    id: 2,
    name: "Client Satisfait 2",
    avatar: "https://picsum.photos/100/100?random=11",
    testimonial: "Professionnel, créatif et efficace. Je recommande vivement ses services.",
    rating: 5
  },
  {
    id: 3,
    name: "Client Satisfait 3",
    avatar: "https://picsum.photos/100/100?random=12",
    testimonial: "Un entrepreneur digital d'exception. Résultats au-delà de nos attentes.",
    rating: 4
  }
];


/**
 * TestiCardBuilder component
 * 
 * @param props - React.HTMLAttributes<HTMLElement>
 */
function TestiCardBuilder ({testimonial,...rest}) {
 return (
  <div className="avis-card" {...rest}>
    <div className="avis-row">
        <img loading='lazy' src={testimonial.avatar} alt={testimonial.name} className="avis-avatar" />
        <div className="avis-col">
            <span className="avis-name">{testimonial.name}</span>
            <div className="avis-stars-row">
                <div className="stars">
                    {renderStars(testimonial.rating)}
                </div>
                {testimonial.time && <span class="avis-time">il y a 2h</span>}
            </div>
        </div>
    </div>
    <div className="avis-text">"{testimonial.testimonial}"</div>
  </div>
 );
}

const Testimonials = () => {
    const refProp = useRef(null);
    useScrollReveal(refProp, 'visible');

    return (
        <section id="testimonials">
        <div ref={refProp} className="xf-slide-right glass-card">
            <h2 className='mb-3'>Témoignages</h2>
            <div className="testimonials-grid">
              {testimonialsData.map(testimonial => (
                <TestiCardBuilder  key={testimonial.id+testimonial.name} testimonial={testimonial} />
              ))}
            </div>
        </div>
        </section>
    );
};

export default Testimonials;