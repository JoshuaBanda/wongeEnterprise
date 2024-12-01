import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import PhoneAnimation from './PhoneAnimation';
import Image from 'next/image';

const images = [
    { src: '/fresh2.jpg', alt: 'Elegant background for Wonge Enterprise' },
    { src: '/fresh3.jpg', alt: 'Another elegant background' },
    { src: '/fresh4.jpg', alt: 'Yet another beautiful view' },
];

const Intro = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 18000); // Change image every 18 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.container} role="region" aria-label="Introduction Section">
            <div style={styles.imageContainer}>
                {images.map((image, index) => (
                    <div
                        key={image.src}
                        style={{
                            ...styles.image,
                            opacity: currentImageIndex === index ? 1 : 0,
                            transition: 'opacity 1s ease-in-out',
                        }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            layout="fill"
                            objectFit="cover"
                            quality={80}
                            priority
                        />
                    </div>
                ))}
            </div>
            <div style={styles.contentWrapper}>
                <div style={styles.textContainer}>
                    <p style={styles.text}>
                        Your appearance has a voice that is quite faster and louder than your tongue sometimes.
                        <div style={{ padding: '5px' }} />
                        Trust us to grow with you on your elegance journey.
                    </p>
                    <PhoneAnimation style={styles.phoneAnimation} />
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        marginTop: '70px', // Adjust this based on the navbar height
        marginLeft: '20px',
        marginRight: '20px',
        position: 'relative',
        padding: '20px',
        backgroundColor: 'rgba(0,0,0,0.9)',
        boxShadow: '0 2px 8px rgba(255, 255, 255, 0.025)',
        maxWidth: '1500px',
        overflow: 'hidden',
        borderRadius: '10px',
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transition: 'opacity 1s ease-in-out', // Smooth fade transition
    },
    contentWrapper: {
        padding: '20px',
        position: 'relative',
        borderRight: '1.5px solid white',
        borderBottom: '1.5px solid white',
        borderRadius: '10px',
    },
    textContainer: {
        position: 'relative',
        maxWidth: '90%',
        color: '#fff',
        padding: '10px',
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        margin: '-35px 0 -10px -20px',
        borderBottom: '5px solid rgba(255,255,255,0.9)',
        borderRadius: '10px',
    },
    text: {
        fontFamily: 'Roman, serif',
        fontSize: '18px',
        lineHeight: '1.5',
        margin: '0 0 10px 0',
    },
    orderText: {
        color: '#fff',
        fontSize: '20px',
        display: 'block',
        marginTop: '10px',
    },
    whatsappLink: {
        marginLeft: '10px',
        textDecoration: 'none',
        color: 'rgba(165, 42, 42, 1)',
        transition: 'color 0.3s',
        '&:hover': {
            color: '#ffcc00',
        },
    },
    phoneAnimation: {
        position: 'absolute',
        bottom: '-60px',
        right: '-120px',
    },
};

// Responsive adjustments for mobile
const mediaQueries = `
    @media (max-width: 768px) {
        .container {
            margin-top: 30px;
            padding: 15px;
        }
        .contentWrapper {
            padding: 15px;
            border: none;
        }
        .text {
            font-size: 16px;
        }
        .orderText {
            font-size: 18px;
        }
        .whatsappLink {
            margin-left: 8px;
        }
    }

    @media (max-width: 480px) {
        .container {
            margin-top: 20px;
            padding: 10px;
        }
        .text {
            font-size: 14px;
        }
        .orderText {
            font-size: 16px;
        }
        .whatsappLink {
            margin-left: 5px;
        }
    }
`;

export default Intro;
