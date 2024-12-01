import { useState, useEffect, useRef } from "react";
import Cart from "./Cart";
import ImageSlider from "./AllProductsImageSlider";
import JewelryImageSlider from "./JewelryImageSlider";
import AvonImageSlider from "./AvonImageSlider";
import Greetings from "./Greetings";
import Intro from "./Intro";
import HomeCirclePictures from "./HomeCirclePictures";
import { FaSpinner } from "react-icons/fa";
import DisplayImages from "./DisplayImages";
import PhoneAnimation from './animation/Animation.json';

const Buy = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSlider, setActiveSlider] = useState(0); // Track active slider index
    const containerRef = useRef(null); // Reference to the parent container

    const addTocart = (cartItem) => {
        setCart((prevCart) => {
            const itemExists = prevCart.some(item => item.id === cartItem.id);
            return itemExists ? prevCart : [...prevCart, cartItem];
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
    };

    // Simulate loading state (replace with actual data fetching later)
    useEffect(() => {
        const loadData = async () => {
            // Simulate a delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoading(false);
        };
        
        loadData();
    }, []);

    // If loading, return spinner and avoid rendering other components
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <FaSpinner className="spinner" style={{ fontSize: '3rem', animation: 'spin 1s infinite' }} />
            </div>
        );
    }

    // Functions to disable parent scroll when interacting with child sliders
    const preventParentScroll = (e) => {
        // Disable scrolling on the parent container
        containerRef.current.style.overflowX = 'hidden';
    };

    const enableParentScroll = () => {
        // Re-enable scrolling on the parent container
        containerRef.current.style.overflowX = 'auto';
    };

    // Update active slider based on scroll position
    const handleSliderScroll = () => {
        const container = containerRef.current;
        const containerWidth = container.offsetWidth; // Container width
        const scrollPosition = container.scrollLeft; // Current scroll position

        // Calculate which slider is active based on the scroll position
        const index = Math.floor(scrollPosition / containerWidth);
        setActiveSlider(index);
    };

    return (
        <div>
            <Greetings />
            <Intro />
            <HomeCirclePictures />
            <Cart 
                addTocart={addTocart} 
                cart={cart} 
                removeFromCart={removeFromCart} 
            />

            <div 
                ref={containerRef}
                style={{
                    display: 'flex',           // Arrange items in a row
                    overflowX: 'auto',         // Enable horizontal scrolling
                    gap: '10px',               // Space between sliders
                    padding: '50px 0',         // Padding around the content
                    width: '100%',             // Ensure the container takes up full width
                    scrollBehavior: 'smooth',  // Optional: Smooth scrolling when navigating
                    WebkitOverflowScrolling: 'touch', // Mobile scrolling behavior
                    backgroundColor:'rgb(216, 216, 216,0.1)',
                }}
                onScroll={handleSliderScroll} // Update active slider on scroll
            >
                {/* Hiding scrollbar using global CSS style */}
                <style>
                    {`
                        /* Hides scrollbar in WebKit browsers like Chrome, Safari */
                        div::-webkit-scrollbar {
                            display: none;
                        }
                        /* Hides scrollbar in Firefox */
                        div {
                            scrollbar-width: none;
                        }
                    `}
                </style>

                {/* Add touch event handlers to prevent parent scrolling */}
                <div 
                    style={{ flex: '0 0 auto', width: '280px' }}
                    onTouchStart={preventParentScroll}
                    onTouchEnd={enableParentScroll}
                >
                    <ImageSlider addTocart={addTocart} cart={cart} />
                </div>

                <div 
                    style={{ flex: '0 0 auto', width: '280px' }}
                    onTouchStart={preventParentScroll}
                    onTouchEnd={enableParentScroll}
                >
                    <AvonImageSlider addTocart={addTocart} cart={cart} />
                </div>

                <div 
                    style={{ flex: '0 0 auto', width: '280px' }}
                    onTouchStart={preventParentScroll}
                    onTouchEnd={enableParentScroll}
                >
                    <JewelryImageSlider addTocart={addTocart} cart={cart} />
                </div>
            </div>

            {/* Dot indicator for active slider */}
            <div style={{
                display: 'flex', 
                justifyContent: 'center', 
                gap: '8px', 
                marginTop: '15px', 
                paddingBottom: '20px',
            }}>
                {[0, 1, 2].map(index => (
                    <div
                        key={index}
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: activeSlider === index ? '#007bff' : '#ccc',
                            transition: 'background-color 0.3s ease',
                        }}
                    />
                ))}
            </div>

            <DisplayImages />
            <div style={{ marginBottom: "150px" }} />
        </div>
    );
};

export default Buy;
