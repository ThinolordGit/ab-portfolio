import './App.css';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About/>
      <Services/>
      <Projects/>
      <Testimonials />
      <Contact/>
    </div>
  );
}

export default App;
