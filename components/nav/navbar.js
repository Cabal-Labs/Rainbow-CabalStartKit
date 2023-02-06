import React from "react";
import styles from "../../styles/navbar.module.css"

export default function Navbar() {
  return (
    <nav className={styles["navbar"]}>
      <img onClick={ () => { window.open("https://caballabs.com/", "_blank")}} className={styles["logo"]} src="logo192.png" alt="logo" />
      <div className={styles["links"]}>
        <div onClick={ () => { window.open("https://discord.gg/Jv9Za474", "_blank")}} className={styles['outlinelightbtn']}>
          <span className={styles['text13']}>
            <span>Join The Cabal</span>
          </span>
        </div>
      </div>
    </nav>
  );
}
