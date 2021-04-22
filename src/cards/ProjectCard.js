import { React, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NumberSelectors from "./subComponents/NumberSelectors";
import Shrp from "./subComponents/Shrp";
import { sleep } from "../utils/utils";

export default function ProjectCard({ deviceType }) {
  const [isRight, setRight] = useState(true);
  const [pos, setPos] = useState(0);

  const [cards, setCard] = useState([
    {
      title: "Title 1",
      info:
        "Skyhawk recovery project (SHRP) is a android custom recovery project which is based on Letest TWRP.",
      logo: <Shrp />,
      show: true,
      color: "blue",
      btns: [
        {
          name: "Download",
          url: "google.com",
        },
        {
          name: "Source",
          url: "google.com",
        },
      ],
    },

    {
      title: "Title 2",
      info: "A detailed Explanation 2",
      logo: null,
      show: false,
      color: "red",
      btns: [
        {
          name: "Download",
          url: "google.com",
        },
      ],
    },
    {
      title: "Title 3",
      info: "A detailed Explanation 3",
      logo: null,
      show: false,
      color: "green",
      btns: [
        {
          name: "Download",
          url: "google.com",
        },
      ],
    },
    {
      title: "Title 4",
      info: "A detailed Explanation4",
      logo: null,
      show: false,
      color: "yellow",
      btns: [
        {
          name: "Download",
          url: "google.com",
        },
      ],
    },
  ]);

  let i = 0;

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     nextCard();
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // });

  const changeCard = async (title, p) => {
    const newState = cards.map((item) => {
      item.show = item.title === title ? true : false;
      return item;
    });

    setRight(p < pos ? true : false);
    await sleep(100);
    setCard(newState);
    setPos(p);
  };

  const nextCard = async () => {
    const newState = cards;
    let newPos = pos + 1;

    if (newPos >= newState.length) {
      newPos = 0;
    }
    newState[pos].show = false;
    newState[newPos].show = true;
    setRight(false);
    await sleep(100);
    setCard(newState);
    setPos(newPos);
  };

  const previousCard = async () => {
    const newState = cards;
    let newPos = pos - 1;

    if (newPos < 0) {
      newPos = newState.length - 1;
    }
    newState[pos].show = false;
    newState[newPos].show = true;
    setRight(true);
    await sleep(100);
    setCard(newState);
    setPos(newPos);
  };

  return (
    <>
      <div className="numberSelectors">
        {cards.map((item) => {
          return (
            <NumberSelectors
              onClick={() => changeCard(item.title, cards.indexOf(item))}
              number={++i}
              active={item.show}
            />
          );
        })}
      </div>
      <div className="mContainer-project">
        <i
          onClick={() => previousCard()}
          className="ri-arrow-left-s-line m-btn prev"
        ></i>
        <AnimatePresence>
          <motion.div
            className={`project-card ${cards[pos].color}-bg`}
            initial={{
              x: isRight ? "-20%" : "20%",
              opacity: 0,
              position: "absolute",
            }}
            animate={{ x: 0, opacity: 1, position: "absolute" }}
            exit={{
              x: isRight ? "20%" : "-20%",
              opacity: 0,
              position: "absolute",
            }}
            key={cards[pos].title}
          >
            <div className="sContainer-pCard">
              <div className={`project-box ${cards[pos].color}-bg`}>
                <div className={`logo-box ${cards[pos].color}-border`}>
                  {cards[pos].logo}
                </div>
              </div>
              <div className="btn-container">
                {cards[pos].btns.map((item) => {
                  return (
                    <a
                      className={`${cards[pos].color}-a`}
                      href={item.url}
                      target="blank"
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="mContainer-pCard">
              <h1>{cards[pos].title}</h1>
              <p>{cards[pos].info}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <i
          onClick={() => nextCard()}
          className="ri-arrow-right-s-line m-btn next"
        ></i>
      </div>
    </>
  );
}