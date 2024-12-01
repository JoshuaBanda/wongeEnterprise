import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FaBars, FaUser, FaHome, FaSprayCan, FaGem, FaEllipsisH, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FaEllipsis, FaHandHoldingDollar, FaJar } from 'react-icons/fa6';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons/faSeedling';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

// Animation variants for the sidebar links
const linkVariants = {
  initial: { opacity: 0, x: -100 }, // Adjusted for left-side movement
  animate: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.3,
      type: 'spring', stiffness: 80,
    },
  }),
};

function AnimatedWord({ iconsize, fsize }) {
  const letterVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeInOut',
        staggerChildren: 0.2,
      },
    },
  };

  const letterChildVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: [0, 20, 0],
      transition: {
        duration: 1,
        ease: 'easeOut',
        yoyo: Infinity,
      },
    },
  };

  return (
    <motion.h1 variants={letterVariants} initial="initial" animate="animate">
      <motion.span
        animate={{
          scale: [1, 1.2],
        }}
        transition={{
          type: 'spring',
          stiffness: 70,
          duration: 1,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <FontAwesomeIcon icon={faSeedling} style={{ fontSize: iconsize }} color="coral" />
      </motion.span>
      {Array.from('wonge').map((letter, index) => (
        <motion.span
          key={index}
          variants={letterChildVariants}
          style={{
            color: 'rgba(60, 60, 60, 1)',
            display: 'inline-block',
            cursor: 'pointer',
            textShadow: '0 -3px 2px rgba(0,0,0,0.3)',
            fontFamily: 'Roman, serif',
            fontSize: fsize,
          }}
          whileHover={{ scale: 1.2, color: 'coral' }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}

function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [headerAnimationKey, setHeaderAnimationKey] = useState(0); // Key for header animation
  const [sidebarAnimationKey, setSidebarAnimationKey] = useState(0); // Key for sidebar animation

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) setSidebarAnimationKey((prevKey) => prevKey + 1); // Update key when opening
      return !prev;
    });
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleHomeClick = useCallback(() => {
    setHeaderAnimationKey((prevKey) => prevKey + 1); // Update key for header animation
  }, []);

  const checkScreenSize = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', checkScreenSize);

    // Event listener to close the sidebar if clicked outside
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      const menuButton = document.getElementById('menuButton');
      if (sidebar && !sidebar.contains(event.target) && !menuButton.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [checkScreenSize, closeSidebar]);

  return (
    <div style={navbarStyles}>
      {/* Menu button on the left */}
      <button id="menuButton" onClick={toggleSidebar} style={buttonStyles} aria-label="Toggle menu">
        <FaBars style={menuIconStyles} />
      </button>

      <div style={headingContainerStyles}>
        <div>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: -60 }}
            transition={{ type: 'spring', stiffness: 70, duration: 1, repeat: 2, repeatType: 'reverse' }}
          >
            <AnimatedWord iconsize={`30px`} fsize={`35px`} key={headerAnimationKey} />
          </motion.div>
        </div>
      </div>

      <div style={iconContainerStyles}>
        <nav style={userNavStyles}>
          <Link href="/Login">
            <FaUser style={iconStyles} />
          </Link>
        </nav>

        {/* Sidebar */}
        <nav
          id="sidebar"
          style={{ ...sidebarStyles, display: isOpen ? 'block' : 'none' }}
          role="navigation"
          aria-expanded={isOpen}
        >
          <motion.div initial="initial" animate={isOpen ? 'animate' : 'initial'}>
            <span
              style={{
                position: 'relative',
                top: '-10px',
                width: '100%',
                height: '120px',
                border: '1px solid white',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.5)',
              }}
            >
              <AnimatedWord iconsize={`45px`} fsize={`40px`} key={sidebarAnimationKey} />
            </span>

            {/* Sidebar Links */}
            <motion.div variants={linkVariants} custom={0} style={{ marginTop: '20px' }}>
              <Link
                href="/"
                style={{ ...sidebarLinkStyles, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
                onClick={() => {
                  handleHomeClick();
                  closeSidebar();
                }}
              >
                Home
                <FaHome style={{ fontSize: '25px', marginLeft: 'auto' }} />
              </Link>
            </motion.div>

            <motion.div variants={linkVariants} custom={1}>
              <Link
                href="/Avon"
                style={{ ...sidebarLinkStyles, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
                onClick={closeSidebar}
              >
                Lotion
                <FaJar style={{ fontSize: '25px', marginLeft: 'auto' }} />
              </Link>
            </motion.div>

            <motion.div variants={linkVariants} custom={2}>
              <Link
                href="/Perfume"
                style={{ ...sidebarLinkStyles, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
                onClick={closeSidebar}
              >
                Perfume
                <FaSprayCan style={{ fontSize: '25px', marginLeft: 'auto' }} />
              </Link>
            </motion.div>

            <motion.div variants={linkVariants} custom={3}>
              <Link
                href="/Jewelry"
                style={{ ...sidebarLinkStyles, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
                onClick={closeSidebar}
              >
                Jewelry
                <FaGem style={{ fontSize: '25px', marginLeft: 'auto' }} />
              </Link>
            </motion.div>

            <motion.div variants={linkVariants} custom={4}>
              <Link
                href="/AllProducts"
                style={{ ...sidebarLinkStyles, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
                onClick={closeSidebar}
              >
                Others
                <FaEllipsis style={{ fontSize: '25px', marginLeft: 'auto' }} />
              </Link>
            </motion.div>
          </motion.div>
        </nav>
      </div>
    </div>
  );
}

const navbarStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 30px',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '60px',
  backgroundColor: '#fff',
  zIndex: 1000,
  boxShadow: '10px 2px 10px rgba(0, 0, 0, 0.05)',
};

const headingContainerStyles = {
  position: 'relative',
  textAlign: 'center',
};

const iconContainerStyles = {
  display: 'flex',
  alignItems: 'center',
};

const userNavStyles = {
  position: 'fixed',
  right: '15px',
  padding: '4px',
  border: '1px solid rgba(225, 228, 231, 0.5)',
  borderRadius: '50%',
  backgroundColor: 'rgba(225, 228, 231, 0.8)',
};

const iconStyles = {
  color: 'rgba(60, 60, 60, 1)',
  fontSize: '18px',
};

const buttonStyles = {
  display: 'block',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  position: 'relative',
  left: '-15px',
};

const menuIconStyles = {
  fontSize: '25px',
  color: 'rgba(60, 60, 60, 1)',
};

const sidebarStyles = {
  position: 'fixed',
  top: 0,
  left: 0, // Sidebar now on the left
  height: '100%',
  width: '250px',
  backgroundColor: 'rgba(255, 255, 255, 0.3)', 
  boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.8)', 
  boxShadow:'inset -2px 0px 3px 0px rgba(0,0,0,0.3),inset -4px 0px 5px 0px rgba(255,255,255,0.5)',
  padding: '20px',
  zIndex: 1000,
  backdropFilter: 'blur(10px)', 
  borderRadius: '2px',
};

const sidebarLinkStyles = {
  position: 'relative',
  top: '-20px',
  display: 'block',
  margin: '4px 0',
  fontSize: '1.8rem',
  color: 'rgba(60, 60, 60, 1)',
  textDecoration: 'none',
  padding: '10px 15px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255)',
  boxShadow: '-2px -7px 5px rgba(0,0,0,0.3)',
  transition: 'background-color 0.3s',
  textShadow: '-1px -1px 1px rgba(0,0,0,0.5)',
};

export default Navbar;
