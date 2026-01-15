import { useRef, useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import "./Services.css";

const servicesData = [
  {
    id: 1,
    title: "Marketing Digital",
    description: "Stratégies complètes pour accroître votre visibilité en ligne et atteindre vos objectifs commerciaux.",
    likes: 42,
    comments: 8
  },
  {
    id: 2,
    title: "Développement Web",
    description: "Création de sites web modernes, responsives et performants adaptés à vos besoins.",
    likes: 35,
    comments: 12
  },
  {
    id: 3,
    title: "Conseil Entrepreneurial",
    description: "Accompagnement personnalisé pour développer votre entreprise et optimiser vos processus.",
    likes: 28,
    comments: 6
  }
];

const Services = () => {
    const refProp = useRef(null);
    useScrollReveal(refProp, 'visible');
    const [services, setServices] = useState(servicesData);

    const handleLike = (id) => {
      setServices(prev => prev.map(service =>
        service.id === id ? { ...service, likes: service.likes + 1 } : service
      ));
    };

    const handleComment = (id) => {
      // Pour simplicité, juste incrémenter
      setServices(prev => prev.map(service =>
        service.id === id ? { ...service, comments: service.comments + 1 } : service
      ));
    };

    return (
        <section id="services">
        <div ref={refProp} className="xf-slide-right glass-card">
            <h2 className='mb-3'>Mes Services</h2>
            <div className="services-grid">
              {services.map(service => (
                <div key={service.id} className="service-post">
                  <h3 className='mb-1 gradient-color'>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-actions">
                    <button className="action-btn" onClick={() => handleLike(service.id)}>
                      <i className="bx bx-heart" style={{color: '#ff6b6b'}}></i>
                      <span>{service.likes}</span>
                    </button>
                    <button className="action-btn" onClick={() => handleComment(service.id)}>
                      <i className="bx bx-message-rounded" style={{color: '#4ecdc4'}}></i>
                      <span>{service.comments}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </div>
        </section>
    );
};

export default Services;