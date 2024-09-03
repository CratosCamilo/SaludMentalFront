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

    if (!sliders || !buttonNext || !buttonBefore) return;

    let value: number;

    const changePosition = (add: number) => {
      const currentTestimony = document.querySelector('.professionals__body--show')?.dataset.id;
      if (currentTestimony) {
        value = Number(currentTestimony);
        value += add;

        sliders[Number(currentTestimony) - 1].classList.remove('professionals__body--show');
        if (value === sliders.length + 1 || value === 0) {
          value = value === 0 ? sliders.length : 1;
        }

        sliders[value - 1].classList.add('professionals__body--show');
      }
    };

    buttonNext.addEventListener('click', () => changePosition(1));
    buttonBefore.addEventListener('click', () => changePosition(-1));

    return () => {
      buttonNext.removeEventListener('click', () => changePosition(1));
      buttonBefore.removeEventListener('click', () => changePosition(-1));
    };
  }, []);

  return (
    <>
      <header className="hero">
        <nav className="nav__container">
          <div className="nav-logo">
            <img src="images/logo3.png" alt="Logo" className="navbar-logo" />
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
            <img src="images/fondo.jpg" alt="Imagen" className="nav__img" />
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
              <img src="images/shapes.svg" alt="Icono de Layouts" className="about__icon" />
              <h3 className="about__title">Nuestra misión</h3>
              <p className="about__paragraph">
                Proveer servicios integrales de salud mental de alta calidad, con un enfoque humano y ético, para promover el bienestar psicológico y emocional de nuestros pacientes. Nos comprometemos a ofrecer atención personalizada, basada en la evidencia, y a colaborar con la comunidad para mejorar la salud mental colectiva.
              </p>
            </article>
            <article className="about__icons">
              <img src="images/paint.svg" alt="Icono de Animaciones" className="about__icon" />
              <h3 className="about__title">Visión</h3>
              <p className="about__paragraph">
                Ser líderes en la región en el cuidado de la salud mental, reconocidos por nuestra excelencia en atención clínica, innovación en tratamientos y compromiso con la prevención y promoción de la salud mental. Aspiramos a crear un entorno donde cada persona pueda alcanzar su máximo potencial emocional y psicológico.
              </p>
            </article>
          </div>
        </section>

        <section className="knowledge">
          <div className="knowledge__container container">
            <div className="knowledge__texts">
              <h2 className="subtitle">Portafolio de servicios </h2>
              <p className="knowledge__paragraph">
                En la Unidad de Salud Mental Aurea, estamos comprometidos con tu bienestar emocional y psicológico. Nuestro catálogo de servicios está diseñado para ofrecerte una amplia gama de soluciones que se adaptan a tus necesidades individuales. Desde terapia individual hasta programas de apoyo grupal, encontrarás opciones cuidadosamente seleccionadas para acompañarte en cada etapa de tu camino hacia una vida más plena y equilibrada.
              </p>
              <p>Explora nuestro catálogo y descubre cómo podemos ayudarte a alcanzar el bienestar que mereces.</p>
              <a href="#" className="cta">Ver más</a>
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
                <h2 className="subtitle">Médico 1</h2>
                <h1 className="professionals__course">Terapeuta familiar</h1>
                <p className="professionals__review">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut est esse, asperiores eaque totam nulla repudiandae quasi, deserunt culpa exercitationem blanditiis laborum veniam laboriosam saepe reiciendis dolorem. Cum, ratione voluptatum!</p>
              </div>
              <figure className="professionals__picture">
                <img src="images/Gatitoconporro.png" alt="medico 1" className="professionals__img" />
              </figure>
            </section>

            <section className="professionals__body" data-id="2" ref={(el) => el && slidersRef.current.push(el)}>
              <div className="professionals__texts">
                <h2 className="subtitle">Médico 2</h2>
                <h1 className="professionals__course">Psiquiatra</h1>
                <p className="professionals__review">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut est esse, asperiores eaque laborum veniam laboriosam saepe reiciendis dolorem. Cum, ratione voluptatum!</p>
              </div>
              <figure className="professionals__picture">
                <img src="images/medico2.jpg" alt="medico 2" className="professionals__img" />
              </figure>
            </section>

            <section className="professionals__body" data-id="3" ref={(el) => el && slidersRef.current.push(el)}>
              <div className="professionals__texts">
                <h2 className="subtitle">Médico 3</h2>
                <h1 className="professionals__course">Psicólogo</h1>
                <p className="professionals__review">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut est esse, niam laboriosam saepe reiciendis dolorem. Cum, ratione voluptatum!</p>
              </div>
              <figure className="professionals__picture">
                <img src="images/face3.jpg" alt="Karen Arteaga" className="professionals__img" />
              </figure>
            </section>

            <section className="professionals__body" data-id="4" ref={(el) => el && slidersRef.current.push(el)}>
              <div className="professionals__texts">
                <h2 className="subtitle">Médico 4</h2>
                <h1 className="professionals__course">Psicólogo</h1>
                <p className="professionals__review">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut est esse, niam laboriosam saepe reiciendis dolorem. Cum, ratione voluptatum!</p>
              </div>
              <figure className="professionals__picture">
                <img src="images/medico4.jpg" alt="Kevin Ramirez" className="professionals__img" />
              </figure>
            </section>

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
