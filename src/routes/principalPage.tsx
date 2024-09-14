import React, { useEffect, useRef } from "react";
import "../css/principalPage.css";

const PrincipalPage: React.FC = () => {
  const slidersRef = useRef<HTMLDivElement[]>([]);
  const buttonNextRef = useRef<HTMLImageElement | null>(null);
  const buttonBeforeRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const sliders = slidersRef.current;
    const buttonNext = buttonNextRef.current;
    const buttonBefore = buttonBeforeRef.current;

    if (!sliders.length || !buttonNext || !buttonBefore) return;

    let currentIndex = 0;

    const changePosition = (add: number) => {
      sliders[currentIndex].classList.remove('professionals__body--show');

      currentIndex = (currentIndex + add + sliders.length) % sliders.length;

      sliders[currentIndex].classList.add('professionals__body--show');
    };

    const handleNextClick = () => changePosition(1);
    const handleBeforeClick = () => changePosition(-1);

    buttonNext.addEventListener('click', handleNextClick);
    buttonBefore.addEventListener('click', handleBeforeClick);

    return () => {
      buttonNext.removeEventListener('click', handleNextClick);
      buttonBefore.removeEventListener('click', handleBeforeClick);
    };
  }, []);

  return (
    <>
      <header className="hero">
        <nav className="nav__container">
          <div className="nav-logo">
            <img src="src\images\logo3.png" alt="Logo" className="navbar-logo" />
          </div>

          <ul className="nav__link nav__link--menu">
            <li className="nav__items">
              <a href="#" className="nav__links">Inicio</a>
            </li>
            <li className="nav__items">
              <a href="#" className="nav__links">Agendar cita</a>
            </li>
            <li className="nav__items">
              <a href="#" className="nav__links">Sobre nosotros</a>
            </li>
            <li className="nav__items">
              <a href="#" className="nav__links">Nuestros servicios</a>
            </li>
          </ul>

          <div className="nav__buttons">
            <a href="login.tsx" className="nav__button--login">Iniciar sesión</a>
            <a href="#" className="nav__button--register">Registrarse</a>
          </div>

          <div>
            <img src="src\images\fondo.jpg" alt="Imagen" className="nav__img" />
          </div>
        </nav>

        <section className="hero__container container">
          <h1 className="hero__title">Bienvenido a un espacio de apoyo y comprensión</h1>
          <p className="hero__paragraph">
            En nuestra unidad de salud mental-Aurea, estamos aquí para acompañarte en cada paso hacia el bienestar, porque tu salud mental es tan importante como tu salud física.
          </p>
        </section>
      </header>

      <main>
        <section className="about">
          <h2 className="subtitle">¿Quiénes somos?</h2>
          <p className="about__paragraph">
            En la Unidad de Salud Mental Aurea, somos un equipo de profesionales dedicados a proporcionar un espacio seguro y de apoyo para el bienestar emocional y psicológico de nuestros pacientes. Entendemos que la salud mental es tan crucial como la salud física, y trabajamos con compromiso y empatía para acompañarte en tu proceso de crecimiento y recuperación.
          </p>
          <div className="about__main">
            <article className="about__icons">
              <img src="./images/mision2.jpg" alt="Icono de Layouts" className="about__icon" />
              <h3 className="about__title">Misión</h3>
              <p className="about__paragraph">
                Proveer servicios integrales de salud mental de alta calidad, con un enfoque humano y ético, para promover el bienestar psicológico y emocional de nuestros pacientes. Nos comprometemos a ofrecer atención personalizada, basada en la evidencia, y a colaborar con la comunidad para mejorar la salud mental colectiva.
              </p>
            </article>
            <article className="about__icons">
              <img src="images/vision2.jpg" alt="Icono de Animaciones" className="about__icon" />
              <h3 className="about__title">Visión</h3>
              <p className="about__paragraph">
                Ser líderes en la región en el cuidado de la salud mental, reconocidos por nuestra excelencia en atención clínica, innovación en tratamientos y compromiso con la prevención y promoción de la salud mental. Aspiramos a crear un entorno donde cada persona pueda alcanzar su máximo potencial emocional y psicológico.
              </p>
            </article>
          </div>
        </section>

        <section className="knowledge">
  <div className="knowledge__container container">
    <div className="knowledge__content">
      <div className="knowledge__texts">
        <h2 className="subtitle">Portafolio de servicios </h2>
        <p className="knowledge__paragraph">
          En la Unidad de Salud Mental Aurea, estamos comprometidos con tu bienestar emocional y psicológico. Nuestro catálogo de servicios está diseñado para ofrecerte una amplia gama de soluciones que se adaptan a tus necesidades individuales. Desde terapia individual hasta programas de apoyo grupal, encontrarás opciones cuidadosamente seleccionadas para acompañarte en cada etapa de tu camino hacia una vida más plena y equilibrada.
        </p>
        <p>Explora nuestro catálogo y descubre cómo podemos ayudarte a alcanzar el bienestar que mereces.</p>
      </div>
      <img src="images/2.avif" alt="portadolio" className="knowledge__image" />
    </div>
  </div>
</section>


        <section className="professionals">
          <div className="professionals__container container">
            <img
              src="images/izquierda.svg"
              alt="Flecha izquierda"
              className="professionals__arrow"
              id="before"
              ref={buttonBeforeRef}
            />

            <section className="professionals__body professionals__body--show" data-id="1" ref={(el) => el && slidersRef.current.push(el)}>
              <div className="professionals__texts">
                <h2 className="subtitle">Caudia Mendoza</h2>
                <h1 className="professionals__course">Terapeuta familiar</h1>
                <p className="professionals__review">En nuestra clínica, los terapeutas familares ayudan a mejorar la comunicación y resolver conflictos entre los miembros de la famila. A través de sesiones de terapia, brindan apoyo para fortalecer las relaciones y promover el bienestar emociogal de toda la famiia.</p>
              </div>
              <figure className="professionals__picture">
                <img src="images/CLAU.jfif" alt="medico 1" className="professionals__img" />
              </figure>
            </section>

            <section className="professionals__body" data-id="2" ref={(el) => el && slidersRef.current.push(el)}>
              <div className="professionals__texts">
                <h2 className="subtitle">Daniel Reyes</h2>
                <h1 className="professionals__course">Psiquiatra</h1>
                <p className="professionals__review">En nuestra clínica, los psiquiatras son médicos especializados en el diagnóstico, tratamiento y prevención de trastornos mentales y emocionales.
                Utilizan una combinación de terapias, incluyendo la medicación y el asesoramiento, para ayudar a los pacientes a mejorar su salud mental y su bienestar general.</p>
              </div>
              <figure className="professionals__picture">
                <img src="images/Da.jpg" alt="medico 2" className="professionals__img" />
              </figure>
            </section>

            <section className="professionals__body" data-id="3" ref={(el) => el && slidersRef.current.push(el)}>
              <div className="professionals__texts">
                <h2 className="subtitle">Luis Rojas</h2>
                <h1 className="professionals__course">Psicólogo</h1>
                <p className="professionals__review">Los psicólogos son profesionales especializados en ayudar a las personas a entender y manejar sus emociones y comportamientos. Utilizan diversas técnicas terapéuticas basadas en la evidencia para abordar problemas emocionales y mentales, apoyando a los pacientes en su camino hacia el bienestar y una mejor calidad de vida.</p>
              </div>
              <figure className="professionals__picture">
                <img src="images/lu.jpg" alt="Karen Arteaga" className="professionals__img" />
              </figure>
            </section>

            <section className="professionals__body" data-id="4" ref={(el) => el && slidersRef.current.push(el)}>
              <div className="professionals__texts">
                <h2 className="subtitle">Gloria Carrascal</h2>
                <h1 className="professionals__course">Psicólogo</h1>
                <p className="professionals__review">Especialistas en salud mental que se centran en comprender el comportamiento humano y los procesos mentales. Utlizan técnicas de terapia para ayudar a las personas a enfrentar problemas como la ansiedad, la depresión, el estrés y otros desafíos emocionales, proporcionando apoyo y orientación para mejorar su calidad de vida.</p>
              </div>
              <figure className="professionals__picture">
                <img src="images/Glo.jpg" alt="Kevin Ramirez" className="professionals__img" />
              </figure>
            </section>

            <img
        src="images/izquierda.svg"
        alt="Flecha izquierda"
        className="professionals__arrow"
        id="before"
        ref={buttonBeforeRef}
      />
      <img
        src="images/derecha.svg"
        alt="Flecha derecha"
        className="professionals__arrow"
        id="next"
        ref={buttonNextRef}
      />
          </div>
        </section>
      </main>
    </>
  );
};

export default PrincipalPage;
