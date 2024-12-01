import style from '../styles/Photos.module.css';
import { useState, useEffect, useRef } from 'react';
import { supabase } from "../supabaseClient";
import { FaChevronLeft, FaChevronRight, FaPaperPlane, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';

const PerfumeImageSlider = ({ addTocart, cart }) => {
    const [shopItems, setShopItems] = useState([]); // Store full product items
    const [currentIndex, setCurrentIndex] = useState(0);
    const startX = useRef(0); // For touch start position
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    // Fetch perfume items from Supabase
    useEffect(() => {
        const fetchShop = async () => {
            const { data, error } = await supabase
                .from('shoptable')
                .select()
                .eq('type', 'Perfume');
            
            if (error) {
                setError('Failed to fetch, try again later...');
                setLoading(false);
                console.error("Error fetching data", error);
                return;
            }

            setShopItems(data || []);
            setLoading(false);
        };

        fetchShop();
    }, []);

    // Navigate to the next image
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % shopItems.length);
    };

    // Navigate to the previous image
    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + shopItems.length) % shopItems.length);
    };

    // Handle swipe gestures on mobile
    const handleTouchStart = (e) => {
        startX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        const currentX = e.touches[0].clientX;
        const diffX = startX.current - currentX;
        if (Math.abs(diffX) > 50) {
            diffX > 0 ? nextImage() : prevImage();
            startX.current = currentX; // Reset start position
        }
    };

    // Display loading or error message
    if (loading) return <Spinner animation="border" variant="primary" />;
    
    if (error) {
        return (
            <div>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    // Don't render if there are no items to display
    if (shopItems.length === 0) return null;

    const currentItem = shopItems[currentIndex];

    return (
        <div 
            className={style.slidercontainer}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            <motion.i
                style={{
                    color: "#4a2c2a",
                    fontSize: "17px",
                    display: "block",
                    marginTop: "10px",
                    paddingLeft: "20px",
                    paddingBottom: "2%"
                }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 1000, delay: 2 }}
            >
                Perfume
            </motion.i>

            <motion.div
                className={style.imageWrapper}
                initial={{ x: 1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 120, delay: 1 }}
            >
                <img
                    src={currentItem.url}
                    className={style.sliderimage}
                    alt={`Perfume ${currentItem.name}`}
                    onClick={() => router.push("/Perfume")}
                />

                {/* Overlay icons */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
                    <div onClick={() => addTocart({
                        id: currentItem.id,
                        name: currentItem.name,
                        price: currentItem.price,
                        url: currentItem.url,
                    })}>
                        <FaShoppingCart className={style.carticon} />
                    </div>
                </div>
                <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
                    <a href={`https://wa.me/265886198551?text=${encodeURIComponent(`Is ${currentItem.name} priced at Mk ${currentItem.price} available?`)}`}>
                        <FaPaperPlane className={style.sendicon} />
                    </a>
                </div>

                {/* Next Image Transition */}
                {shopItems.length > 1 && (
                    <motion.img
                        key={currentItem.id} // Unique key for smoother transitions
                        src={shopItems[(currentIndex + 1) % shopItems.length].url}
                        className={style.nextImage}
                        alt="Next Slide"
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 0.9 }}
                        transition={{ type: 'spring', stiffness: 500, delay: 2 }}
                    />
                )}

                {/* Price Overlay */}
                <div className={style.overlayContainer}>
                    <div className={style.overlayPrice}>
                        {`Mk ${currentItem.price}`}
                    </div>
                </div>
            </motion.div>

            {/* Navigation Controls */}
            <div className={style.navigation}>
                <FaChevronLeft onClick={prevImage} />
                <FaChevronRight onClick={nextImage} />
            </div>

        </div>
    );
};

export default PerfumeImageSlider;
