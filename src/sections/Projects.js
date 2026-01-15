import { useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import "./Projects.css";

const projectsData = [
  {
    id: 1,
    name: "Projet Innovant 1",
    image: "https://picsum.photos/250/150?random=2",
    description: "Une solution digitale révolutionnaire."
  },
  {
    id: 2,
    name: "Projet Innovant 2",
    image: "https://picsum.photos/250/150?random=3",
    description: "Développement d'une plateforme interactive."
  },
  {
    id: 3,
    name: "Projet Innovant 3",
    image: "https://picsum.photos/250/150?random=4",
    description: "Stratégie marketing digitale réussie."
  }
];

/**
 * ProjectBuilder component
 */
function ProjectBuilder({ project, ...rest }) {
  return (
    <div className="project-card" {...rest}>
      <div className="project-locked-project">
        <img
          src={project.image}
          alt={`Aperçu ${project.name}`}
        />
        <div className="project-locked-overlay"></div>
      </div>

      <div className="project-profile-row">
        <div className="project-profile-info">
            <span className="project-name">{project.name}</span>
            <span className="project-badge"><i className="bx bxs-badge-check gradient-icon-accent"></i></span>
        </div>
      </div>

      <div className="project-desc">
        {project.description}
      </div>
    </div>
  );
}

const Projects = () => {
  const refProp = useRef(null);
  useScrollReveal(refProp, 'visible');

  return (
    <section id="projects">
      <div ref={refProp} className="xf-slide-left glass-card">
        <h2 className="mb-3">Mes Projets</h2>
        
        <div
          className="projects-grid"
        >
          {projectsData.map((project) => (
            <ProjectBuilder
              key={project.id}   // ✅ clé unique ici
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
