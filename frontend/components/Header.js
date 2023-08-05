import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAccount, useConnect } from 'wagmi';
import { Search } from '@web3uikit/icons';
import styles from "@/styles/Home.module.css";

import logo from '../public/assets/blurLogo.png'

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const { address, isConnected } = useAccount();

  const { connect, connectors } = useConnect();

  useEffect(() => {
    if(!isConnected) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])
  
  return (
    <section className={styles.header}>
      <section className={styles.logo}>
        <Link href="/">
          <Image src={logo} alt="blur" width="70" height=""/>
        </Link>
      </section>

      <section className={styles.nav}>
        <section className={styles.nav_items}>
          <p>COLLECTIONS</p>
          <Link href='/portfolio' className={styles.link}>
            <p>PORTFOLIO</p>
          </Link>
          <p>AIRDROP</p>
        </section>

        <section className={styles.searchSection}>
          <section>
            <span>
              <Search fontSize="25px" />
            </span>
            <input 
              placeholder="search collections"
              disabled=""
              className={styles.inputField}
            />
            <span></span>
          </section>
        </section>

        {isLoggedIn ? (
          <section>
            {connectors.map((connector) => (
              <button
               disabled={!connector.ready}
               key={connector.id}
               onClick={() => connect({ connector })}
               className={styles.connect_btn}
              >
                CONNECT BUTTON
              </button>
            ))}
          </section>
        ) : (
          <section className={styles.loggedIn_section}>
            {isLoggedIn ? address?.slice(0,8) : ""}
          </section>
        )}

      </section>
    </section>
  )
}

export default Header
