import style from '../styles/Photos.module.css';
import { useState, useRef, useEffect } from 'react';
import { supabase } from "../supabaseClient";
import { FaShoppingCart, FaPaperPlane, FaTimes, FaCartPlus } from 'react-icons/fa';  // Import FaTimes for the close icon
import { motion } from 'framer-motion';
import Spinner from './Spinning';

const ImageSlider = ({ addTocart, cart }) => {
    const [shopItems, setShopItems] = useState([]); // Store full product items (id, name, url, price, etc.)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); // Store selected product for modal
    const startX = useRef(0);  // For swipe functionality

    useEffect(() => {
        const fetchShop = async () => {
            const { data, error } = await supabase
                .from('shoptable')
                .select();
            if (error) {
                console.error("Fetch error: ", error);
                setError('Failed to fetch products, please try again later.');
                setLoading(false);
                return;
            }
            if (data) {
                const shuffledItems = shuffleArray(data); // Shuffle the entire data array
                setShopItems(shuffledItems);
                setCurrentIndex(0); // Start with the first item after shuffling
                setLoading(false);
            }
        };
        fetchShop();
    }, []);  // Empty dependency array ensures this runs only once when the component mounts.

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % shopItems.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + shopItems.length) % shopItems.length);
    };

    const handleTouchStart = (e) => {
        startX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        const currentX = e.touches[0].clientX;
        const diffX = startX.current - currentX;
        if (Math.abs(diffX) > 50) {
            diffX > 0 ? nextImage() : prevImage();
            startX.current = currentX;
        }
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    if (loading) return (
        <div className={style.loadingOverlay}>
            <Spinner />
        </div>
    );
    if (error) {
        return (
            <div className={style.errorContainer}>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className={style.retryButton}>Retry</button>
            </div>
        );
    }

    const currentItem = shopItems[currentIndex]; // Get the current item based on the shuffled index.

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
                    marginTop: "10px",
                    paddingLeft: "20px",
                }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
            >
                All
            </motion.i>

            <motion.div
                className={style.imageWrapper}
                initial={{ x: 1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 120, delay: 0.5 }}
            >
                <img
                    src={currentItem.url} // Directly use the URL from the current shuffled item
                    className={style.sliderimage}
                    alt={`Image of ${currentItem?.name || 'product'}`}
                    onClick={() => openModal(currentItem)} // Open modal with current product
                />

                <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
                    <a href={`https://wa.me/265886198551?text=${encodeURIComponent(`Is ${currentItem.name} priced at Mk ${currentItem.price} available?`)}`}>
                        <FaPaperPlane className={style.sendicon} />
                    </a>
                </div>

                {shopItems.length > 1 && (
                    <motion.img
                        key={currentItem.url} // Use the item's URL as the key to avoid mismatched updates
                        src={shopItems[(currentIndex + 1) % shopItems.length].url}
                        className={style.nextImage}
                        alt="Next Slide"
                        initial={{ x: 180, opacity: 0 }}
                        animate={{ x: 0, opacity: 0.9 }}
                        exit={{ x: -1000, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 100, duration: 0.2 }}
                    />
                )}

                {shopItems.length > 0 && (
                    <div className={style.overlayContainer}>
                        <div className={style.overlayPrice}>
                            {`Mk ${currentItem.price}`}
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Modal for displaying product details */}
            {isModalOpen && selectedProduct && (
                <div className={style.modalOverlay} onClick={closeModal}>
                    <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                        <img src={selectedProduct.url} alt={selectedProduct.name} className={style.modalImage} />
                        <h2>{selectedProduct.name}</h2>
                        <p>{selectedProduct.description}</p>
                        <p>Price: Mk {selectedProduct.price}</p>

                        {/* Add to Cart button inside the modal */}
                        <button
                            className={style.modalAddToCartButton}
                            onClick={() => {
                                addTocart({
                                    id: selectedProduct.id,
                                    name: selectedProduct.name,
                                    price: selectedProduct.price,
                                    url: selectedProduct.url,
                                });
                                closeModal(); // Optionally close the modal after adding to cart
                            }}
                        >
                            <FaCartPlus fontSize={24} color='#666'/>
                        </button>

                        {/* Close Icon in the top-right corner */}
                        <button className={style.modalCloseButton} onClick={closeModal}>
                            <FaTimes />
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ImageSlider;
