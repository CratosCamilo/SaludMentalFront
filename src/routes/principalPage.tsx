import React, { useState, useEffect, useRef } from "react";
import "../css/principalPage.css";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";


var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const professionals = [
  {
    id: 1,
    name: "Ana Gomez",
    title: "Consulta y diagnósticos",
    review: "Ana Gómez se dedica a realizar evaluaciones psicológicas detalladas y precisas. Su experiencia en diagnósticos permite ofrecer a los pacientes un entendimiento claro de sus condiciones y la mejor ruta a seguir hacia su tratamiento y bienestar.",
    image: "images/Ana Gomez.jpg",
  },
  {
    id: 2,
    name: "Carlos Pérez",
    title: "Psicoterapia",
    review: "Esta especializado en ayudar a las personas a entender y manejar sus emociones y comportamientos. Utiliza diversas técnicas terapéuticas basadas en la evidencia para abordar problemas emocionales y mentales, apoyando a los pacientes en su camino hacia el bienestar y una mejor calidad de vida.",
    image: "images/Carlos Perez.jpg",
  },
  {
    id: 3,
    name: "Eugenio Hurtado",
    title: "Psicoterapia",
    review: "Con un enfoque centrado en el paciente, Eugenio Hurtado se especializa en brindar apoyo psicológico a aquellos que enfrentan desafíos emocionales. Su metodología combina técnicas tradicionales y enfoques modernos, fomentando un espacio seguro para la sanación y el autodescubrimiento.",
    image: "images/Eugenio Hurtado.jpg",
  },
  {
    id: 4,
    name: "Maria Lopez",
    title: "Emergencias",
    review: "Con una sólida formación en atención de emergencias, María López está preparada para abordar situaciones críticas en salud mental. Su dedicación y habilidad para escuchar permiten ofrecer un refugio seguro en momentos de angustia.",
    image: "images/Maria Lopez.jpg",
  },
  {
    id: 5,
    name: "Jessica Dulcey",
    title: "Emergencias",
    review: "Jessica Dulcey es una experta en manejo de crisis y emergencias psicológicas. Su rápida intervención y enfoque empático son cruciales para ayudar a las personas en momentos de necesidad, brindando apoyo inmediato y efectivo..",
    image: "images/Jessica Dulcey.jpg",
  },
  {
    id: 6,
    name: "Pedro Pe",
    title: "Consulta y diagnósticos",
    review: "Pedro Pe ofrece un enfoque integral en la evaluación y diagnóstico de trastornos mentales. Su compromiso es proporcionar a cada paciente un plan de acción claro que les permita avanzar hacia una vida más plena y satisfactoria.",
    image: "images/Pedro Pe.jpg",
  },
  {
    id: 7,
    name: "Polimardo Buenardopolis",
    title: "Tratamientos",
    review: "Polimardo Buenardopolis se especializa en diseñar tratamientos personalizados para cada paciente. Su experiencia en diversas modalidades terapéuticas asegura que cada persona reciba el apoyo necesario para abordar sus desafíos y alcanzar sus objetivos de salud mental.",
    image: "images/Polimardo Buenardopolis.jpg",
  },
  {
    id: 8,
    name: "Luis Ramirez",
    title: "Tratamientos",
    review: "Luis Ramírez se especializa en ofrecer tratamientos integrales y adaptados a las necesidades de cada paciente. Con un enfoque basado en la evidencia, trabaja en colaboración con los pacientes para desarrollar estrategias efectivas que promuevan su bienestar emocional y psicológico, ayudándoles a superar obstáculos y alcanzar una vida más equilibrada.",
    image: "images/Luis Ramirez.jpg",
  },
];

const PrincipalPage: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [identification, setIdentification] = useState("");  // Para número de identificación
  const [names, setNames] = useState("");  // Para nombres completos
  const [surnames, setSurnames] = useState("");  // Para apellidos
  const [email, setEmail] = useState("");  // Para el correo electrónico
  const [cellphoneNumber, setCellphoneNumber] = useState("");  // Para el número de celular
  const [idEps, setIdEps] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);


  const auth = useAuth();
  const navigate = useNavigate();
  const slidersRef = useRef<HTMLDivElement[]>([]);
  const buttonNextRef = useRef<HTMLImageElement | null>(null);
  const buttonBeforeRef = useRef<HTMLImageElement | null>(null);
  if (auth.isAuthenticated) {
    const userP = auth.getUser();
    const roleId = userP?.roleId // o auth.getUser?.roleId dependiendo de tu estructura
    switch (roleId) {
      case 1: // Admin
        navigate("/admin/dashboard");
        break;
      case 2: // Operador
        navigate("/secretary/calendar");
        break;
      case 3: // Paciente
        navigate("/Doctor/dashboard");
        break;
      case 4: // Paciente
        navigate("/Patient/dashboard");
        break;
      default:

        break;
    }
  }

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

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const json = await response.json();
        auth.saveUser(json);
        // Asegúrate de que el roleId está disponible
        const userP = auth.getUser();
        const roleId = userP?.roleId // o auth.getUser?.roleId dependiendo de tu estructura
        switch (roleId) {
          case 1: // Admin
            navigate("/admin/dashboard");
            break;
          case 2: // Operador
            navigate("/secretary/calendar");
            break;
          case 3: // Paciente
            navigate("/Doctor/dashboard");
            break;
          case 4: // Paciente
            navigate("/Patient/dashboard");
            break;
          default:

            break;
        }
      } else {
        const json = await response.json();
        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
      setErrorResponse("Ocurrió un error al intentar iniciar sesión.");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Identification: identification,
          Names: names,
          Surnames: surnames,
          Email: email,
          Password: password,
          Address: address,
          CellphoneNumber: cellphoneNumber,
          IdEps: idEps,
        }),
      });

      if (response.ok) {
        setIdentification("");
        setNames("");
        setSurnames("");
        setEmail("");
        setPassword("");
        setAddress("");
        setCellphoneNumber("");
        setIdEps("");
        setErrorResponse("");
        setIsRegistered(true);
        const json = await response.json();
        auth.saveUser(json);

      } else {
        const json = await response.json();
        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
      setErrorResponse("Ocurrió un error al intentar registrarse.");
    }
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === professionals.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? professionals.length - 1 : prevIndex - 1
    );
  };



  return (
    <>

      <header className="hero">

        <nav className="nav__container">
          <div className="nav-logo">
            <img src="../images/logo333.png" alt="Logo" className="navbar-logo" />
          </div>
          <ul className="nav__link">
            <li className="nav_items"><a href="#" className="nav_links">Inicio</a></li>
            <li className="nav_items"><a href="#" className="nav_links">Agendar cita</a></li>
            <li className="nav_items"><a href="#" className="nav_links">Sobre nosotros</a></li>
            <li className="nav_items"><a href="#" className="nav_links">Nuestros servicios</a></li>
          </ul>
          <div className="nav__buttons">
            <a href="#" className="nav__button--login" onClick={handleLoginClick}>Iniciar sesión</a>
            <a href="#" className="nav__button--register" onClick={handleRegisterClick}>Registrarse</a>
          </div>
          <div>
            <img src="./images/fondo.jpg" alt="Imagen" className="nav__img" />
          </div>
        </nav>
        <section className="hero__container container">
          <h1 className="hero__title">Bienvenido a un espacio de apoyo y comprensión</h1>
          <p className="hero__paragraph">
            En nuestra unidad de salud mental-Aurea, estamos aquí para acompañarte en cada paso hacia el bienestar.
          </p>
        </section>
      </header>

      {showLoginModal && (
        <div className="modal">
          <div className="modal__content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="username">Usuario:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button">Iniciar sesión</button>
              {errorResponse && <p className="error">{errorResponse}</p>}
            </form>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className="modal">
          <div className="modal__content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            {isRegistered ? (
              <div className="success-message">
                <h2>Registro realizado con éxito</h2>
                <button
                  onClick={() => {
                    setShowRegisterModal(false);
                    setShowLoginModal(true);
                  }}
                  className="login-button"
                >
                  Iniciar sesión
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit}>
                <div className="form-group">
                  <label htmlFor="idNumber">Número de identificación:</label>
                  <input
                    type="text"
                    id="idNumber"
                    value={identification}
                    onChange={(e) => setIdentification(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="names">Nombres:</label>
                  <input
                    type="text"
                    id="names"
                    value={names}
                    onChange={(e) => setNames(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="surnames">Apellidos:</label>
                  <input
                    type="text"
                    id="surnames"
                    value={surnames}
                    onChange={(e) => setSurnames(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Dirección:</label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cellphoneNumber">Número de Celular:</label>
                  <input
                    type="text"
                    id="cellphoneNumber"
                    value={cellphoneNumber}
                    onChange={(e) => setCellphoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="epsType">Tipo de EPS:</label>
                  <select
                    id="epsType"
                    value={idEps}
                    onChange={(e) => setIdEps(e.target.value)}
                    required
                  >
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="colsanitas">Colsanitas</option>
                    <option value="salud">Salud</option>
                    <option value="sura">Sura</option>
                    <option value="particular">Particular</option>
                  </select>
                </div>
                <button type="submit" className="register-button">Registrarse</button>
                {errorResponse && <p className="error">{errorResponse}</p>}
              </form>
            )}
          </div>
        </div>
      )}


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

        <section className="professionals__section">
          <h2 className="professionals__title">Conoce a Nuestros Profesionales</h2>
          <Slider {...settings}>
            {professionals.map((professional) => (
              <div key={professional.id} className="professional__card">
                <img src={professional.image} alt={professional.name} className="professional__image" />
                <h3 className="professional__name">{professional.name}</h3>
                <p className="professional__title">{professional.title}</p>
                <p className="professional__review">{professional.review}</p>
              </div>
            ))}
          </Slider>
        </section>
      </main>

    </>
  );
};

export default PrincipalPage;