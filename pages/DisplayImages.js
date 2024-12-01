import { useState, useEffect } from "react";
import Image from 'next/image';

const DisplayImages = ({ transitionTime = 9000 }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Array of images
    const images = ['/0.jpg', '/1.jpg','/fresh4.jpg','/fresh2.jpg' ];

    const texts = [
        ["Illuminate Your", "Glow"],
        ["Unleash Inner", "Beauty"],
        ["Elevate Your", "Elegance"],
        ["Enjoy our", "Remote Delivery"],
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentImageIndex((prev) => (prev + 1) % texts.length);
        }, transitionTime);

        return () => clearTimeout(timer);
    }, [currentImageIndex, transitionTime]);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleTouchStart = () => {
        clearTimeout(); // Stop the automatic transition
    };

    const handleTouchEnd = () => {
        setTimeout(() => {
            setCurrentImageIndex((prev) => (prev + 1) % texts.length);
        }, transitionTime);
    };

    return (
        <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ 
                position: 'relative', 
                width: '100%', 
                maxWidth: '100%', 
                height: '50vh', // Responsive height
                margin: '65px auto', 
                overflow: 'hidden',
                borderRadius: '0px', // Rounded corners for a softer look
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)', // Subtle shadow
            }}
        >
            {texts.map((text, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: currentImageIndex === index ? 1 : 0,
                        transition: 'opacity 3s ease',
                        pointerEvents: currentImageIndex === index ? 'auto' : 'none',
                    }}
                >
                    {isLoading && <p style={{ textAlign: "center", color: "#888" }}>Loading...</p>}
                    <Image
                        src={images[index]} 
                        alt={`Decorative image related to ${text.join(' ')}`} // Descriptive alt text
                        width={800} 
                        height={450} 
                        priority={index === 0}
                        onLoad={handleImageLoad}
                        quality={70}
                        style={{
                            borderRadius: '0px',
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                            display: 'block',
                        }}
                    />
                    {/* Overlay for shading effect */}
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black
                        borderRadius: '0px',
                        zIndex: 2, // Positioning above the image but below text
                    }}></div>
                    <div style={{
                        position: "absolute",
                        bottom: "10%",
                        right: "5%",
                        color: "white", // Changed to white for better contrast
                        zIndex: 3,
                        textShadow: "2px 2px 4px rgba(0,0,0,0.7)", // Darker shadow for better readability
                        fontSize: "40px", // Responsive font size
                        fontWeight: "bold",
                        fontFamily: "'Dancing Script', cursive",
                    }}>
                        {text.map((line, i) => (
                            <div key={i} style={{ textAlign: "right" }}>{line}</div>
                        ))}
                    </div>
                </div>
            ))}
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px"
            }}>
                {texts.map((_, index) => (
                    <div key={index} style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: currentImageIndex === index ? "rgb(179, 57, 86)" : "lightgray",
                        margin: "0 5px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                    }} 
                    onClick={() => setCurrentImageIndex(index)} // Allow manual image change
                    />
                ))}
            </div>
        </div>
    );
}

export default DisplayImages;
