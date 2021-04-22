import { React, useState } from "react";
import { motion } from "framer-motion";
import "../styles/ContactCard.scss";
import { sleep } from "../utils/utils.js";
export default function ContactCard({ deviceType = "mobile" }) {
  const [is_idle, setIdle] = useState(true);
  const [is_on_process, setOnProcess] = useState(false);
  const [is_on_success, setOnSuccess] = useState(false);
  const [is_on_failed, setOnFailed] = useState(false);
  const sendMessage = async (e) => {
    const ret = true;
    e.preventDefault();

    setIdle(false);
    await sleep(200);
    setOnProcess(true);

    await sleep(2000);

    setOnProcess(false);
    setOnFailed(!ret);
    setOnSuccess(ret);

    await sleep(1500);

    setOnFailed(false);
    setOnSuccess(false);

    console.log(ret ? "Success" : "Failed");

    // Show Result

    // Then delay
    await sleep(1000);

    //Go back to idle
    setIdle(true);
  };
  return (
    <form
      className={
        deviceType === "mobile"
          ? "contactForm contactForm-mobile"
          : "contactForm"
      }
      onSubmit={(e) => sendMessage(e)}
    >
      <motion.div
        className="sContainer"
        animate={
          is_idle
            ? {}
            : deviceType === "mobile"
            ? { height: "100%", borderRadius: "8px 8px 8px 8px" }
            : { width: "100%", borderRadius: "8px 8px 8px 8px" }
        }
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.87, 0.07, 0.37, 0.97],
        }}
      >
        <motion.div
          className="idle"
          initial={{ opacity: 1, pointerEvents: "auto" }}
          animate={
            is_idle
              ? { opacity: 1, pointerEvents: "auto" }
              : { opacity: 0, pointerEvents: "none" }
          }
          transition={{ duration: 0.8 }}
        >
          <h1>Contact</h1>
          <p>Any questions or remarks? Just Write me a message :)</p>
        </motion.div>
        <motion.div
          className="onProcess"
          initial={{ opacity: 0, pointerEvents: "none" }}
          animate={is_on_process ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            animate={{ y: ["-10%", "10%", "-10%"] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            <i className="ri-message-2-line"></i>
          </motion.div>
          <h3>Please Wait</h3>
        </motion.div>

        <motion.div
          className="onSuccess"
          initial={{ opacity: 0, pointerEvents: "none" }}
          animate={is_on_success ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <div>
            <i className="ri-chat-smile-line"></i>
          </div>
          <h3>Thank You for contact with me</h3>
        </motion.div>

        <motion.div
          className="onFailed"
          initial={{ opacity: 0, pointerEvents: "none" }}
          transition={{ delay: 1 }}
          animate={
            is_on_failed
              ? { opacity: 1, pointerEvents: "auto" }
              : { opacity: 0, pointerEvents: "none" }
          }
        >
          <div>
            <i className="ri-chat-delete-line"></i>
          </div>
          <h3>Something Went wrong :(</h3>
        </motion.div>
      </motion.div>
      <div className="mContainer">
        <input
          placeholder="Your name"
          type="text"
          name="name"
          id="user_name"
        ></input>
        <textarea placeholder="Write your message"></textarea>
        <input type="submit" value="Send" />
      </div>
    </form>
  );
}
