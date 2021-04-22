import "./styles/App.scss";
import "./styles/SocialSection.scss";
import "./styles/WorkSection.scss";
import "./styles/AboutSection.scss";
import logo from "./assets/logo.svg";
import avatar from "./assets/avatar.jpg";
import SocialCard from "./cards/SocialCard";
import ContactCard from "./cards/ContactCard";
import SectionHead from "./SectionHead";
import ProjectCard from "./cards/ProjectCard";
import { useInView, InView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import SwipeDown from "./components/SwipeDown";
import Hamburger from "./components/Hamburger";

function App() {
  const [deviceType, setDeviceType] = useState("desktop");
  const [showNav, setNav] = useState(true);

  const updateDeviceType = (width) => {
    if (width >= 768) {
      setDeviceType("desktop");
      return;
    }
    setDeviceType("mobile");
  };
  // const [showNav, setNav] = useState(true);

  // const [scrollDir, setScrollDir] = useState("scrolling down");

  // useEffect(() => {
  //   const threshold = 0;
  //   let lastScrollY = window.pageYOffset;
  //   let ticking = false;

  //   const updateScrollDir = () => {
  //     const scrollY = window.pageYOffset;

  //     if (Math.abs(scrollY - lastScrollY) < threshold) {
  //       ticking = false;
  //       return;
  //     }
  //     setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up");
  //     setNav(!(scrollY > lastScrollY));
  //     console.log(showNav);
  //     lastScrollY = scrollY > 0 ? scrollY : 0;
  //     ticking = false;
  //   };

  //   const onScroll = () => {
  //     if (!ticking) {
  //       window.requestAnimationFrame(updateScrollDir);
  //       ticking = true;
  //     }
  //   };

  //   window.addEventListener("scroll", onScroll);

  //   return () => window.removeEventListener("scroll", onScroll);
  // }, [scrollDir]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      updateDeviceType(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        updateDeviceType(window.innerWidth);
      });
    };
  });

  const [showSlider, setSlider] = useState(true);

  return (
    <>
      <AnimatePresence>
        {true ? (
          <motion.nav
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "tween",
              ease: "easeOut",
            }}
            exit={{
              y: -10,
              opacity: 0,
            }}
            className={`${deviceType === "mobile" ? "mobile-nav" : ""}`}
          >
            {deviceType !== "mobile" ? (
              <>
                <button>About</button>
                <button>Workz</button>
                <button>Social</button>
                <button>Contact</button>
              </>
            ) : (
              <Hamburger
                onClick={() => {
                  setNav(!showNav);
                }}
                show={showNav}
              />
            )}
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showNav && deviceType === "mobile" ? (
          <motion.div
            className="mobile-nav-container"
            initial={{
              y: "-100%",
            }}
            animate={{
              y: "0%",
            }}
            exit={{
              y: "-100%",
            }}
          >
            <button>About</button>
            <button>Workz</button>
            <button>Social</button>
            <button>Contact</button>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <InView
        as="div"
        onChange={(inView, entry) => setSlider(inView)}
        delay={100}
        trackVisibility={true}
        threshold={1}
      >
        <section>
          <div className="bg"></div>
          <div className="bg2"></div>
          <motion.img
            className="logo"
            src={logo}
            alt="Logo"
            initial={{ filter: "unset" }}
            animate={{
              filter: "drop-shadow(0px 0px 20px #a1c3ff71)",
            }}
          />
          <p className="logo-down">
            <span className="separator">Student</span>{" "}
            <span className="separator">.</span> Noob Gamer
          </p>
          <AnimatePresence>{showSlider ? <SwipeDown /> : null}</AnimatePresence>
        </section>
      </InView>

      <section className="about-section">
        <div
          className={`${
            deviceType === "mobile"
              ? "about-container-mobile"
              : "about-container"
          }`}
        >
          <div className="sidebar-container">
            <div className="img-wrapper"></div>
          </div>
          <div className="main-container">
            <div>
              <h1>About Me</h1>
              <p>
                Heeeeelo I am Sourav Gain. I love to explore new technologies.{" "}
                <br></br>I am pursuing BCA from <br></br>
                <span>EMINENT COLLEGE OF MANAGEMENT AND TECHNOLOGY.</span>
              </p>
              <button className="cv-btn">
                <i className="ri-file-list-2-line"></i>
                Get CV
              </button>
            </div>
          </div>
        </div>

        <div className="bg3"></div>
        <div className="bg4"></div>
      </section>

      <section className="work-section">
        <div className="head-container">
          <div className="section-head">
            <h1>Projects</h1>
            <p>Here are some of my projects which I done recently</p>
          </div>
        </div>
        <div
          className={
            deviceType !== "mobile"
              ? "projectContainer"
              : "projectContainer-mobile"
          }
        >
          <ProjectCard deviceType={deviceType} />
        </div>
      </section>

      <section className="social_section">
        {/* <SectionHead sectionName="WorkZ" /> */}
        <div className="head-container">
          <div className="section-head">
            <h1>Social</h1>
            <p>Connect with me though social media</p>
          </div>
        </div>
        <div className="container">
          <div className="grid">
            <SocialCard
              logo="ri-telegram-line"
              heading="Send Message"
              expanded={true}
              subtext="Send message into my telegram account. Kek Bye"
            />
            <SocialCard
              logo="ri-youtube-line"
              heading="My Videos"
              subtext="Check out my YT channel where I upload tutorial videos and gaming."
            />
            <SocialCard
              logo="ri-github-line"
              heading="Follow Me"
              subtext="Follow me on github so that you can get my recent activity."
            />
            <SocialCard
              logo="ri-paypal-line"
              heading="Support Plox"
              subtext="If you like my work. Feel free to donate me. That will help a lot :)"
            />
          </div>
        </div>
      </section>
      <section className="contact-section">
        <div className="contactContainer">
          <ContactCard deviceType={deviceType} />
        </div>
      </section>
    </>
  );
}

export default App;
