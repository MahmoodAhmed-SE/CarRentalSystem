import Footer from "../Components/Footer";
import Header from "../Components/Header";

const AboutUs = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Header />
      </div>
      <div className="row text-center" style={{ minHeight: "500px" }}>
        <p style={{ maxWidth: "70%", margin: "auto" }}>
          This project is made for the purpose of showcasing our Full-Stack
          Development skills using the popular <strong>MERN</strong> stack (
          <b>M</b>ongoDB, <b>E</b>xpress, <b>R</b>eact, <b>N</b>ode). Project
          contributors are, Mahmood Al-Dhahli, Salim Al-Muqbali, Yousuf Al-Badi.
          This project represents an online platform for renting cars. The
          system provides accessibility and time efficiency for consumers, as
          well as, increases revenue for companies.
        </p>
      </div>
      <div className="row">
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
