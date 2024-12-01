import { useEffect, useState } from "react";
import Image from 'next/image';
import Spinner from "./Spinning";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";
import { FaWhatsapp, FaShoppingCart, FaPaperPlane } from "react-icons/fa";

const Avon = () => {
    const [shopItems, setShopItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [messageToSend, setMessageToSend] = useState("");

    // Shuffle function to randomize the array
    const shuffleArray = (array) => {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
        }
        return shuffledArray;
    };

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const { data, error } = await supabase
                .from('shoptable')
                .select()
                .eq('type','Avon');
                if (error) throw error;
                setShopItems(shuffleArray(data));
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
                console.error("Error fetching data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchShop();
    }, []);

    const toggleCart = (item) => {
        setCart((prevCart) => {
            const itemExists = prevCart.some(cartItem => cartItem.id === item.id);
            if (itemExists) {
                return prevCart.filter(cartItem => cartItem.id !== item.id);
            } else {
                return [...prevCart, item]; // Add item with its id and details
            }
        });
    };

    const isInCart = (itemId) => {
        return cart.some(item => item.id === itemId);
    };

    const handleWhatsAppClick = () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const itemList = cart.map(item => `- ${item.name}: MK${item.price ? item.price.toFixed(2) : "N/A"} (ID: ${item.id})`).join('\n');
        const message = `Here are the items in your cart:\n${itemList}\n\nAre they available?`;

        setMessageToSend(message);
        setShowModal(true);
    };

    const sendWhatsAppMessage = () => {
        window.open(`https://wa.me/265886198551?text=${encodeURIComponent(messageToSend)}`);
        setShowModal(false);
    };

    if (loading) return <Spinner />;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

    return (
        <>
            <h3 style={{ textAlign: "center", fontSize: "2em", color: "#666", margin: "80px 0px 0px 0px", fontWeight: "bold" }}>
                Avon
            </h3>

            <div className="products-container">
                {shopItems.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 500, delay: 1 }}
                        className="product-card"
                    >
                        {/* Image Rendering */}
                        {item.url ? (
                            <Image
                                src={item.url}
                                alt={item.name}
                                width={350}
                                height={200}
                                layout="responsive"
                                style={{ maxHeight: "300px", paddingTop: "20px" }}
                                quality={90}
                                priority
                            />
                        ) : (
                            <div style={{ height: '250px', backgroundColor: '#ccc', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                No Image Available
                            </div>
                        )}

                        <div className="product-details">
                            <h3>{item.name}</h3>
                            <p>MK{item.price ? item.price.toFixed(2) : "N/A"}</p>

                            {/* Description with fixed height */}
                            <div className="product-description">
                                <p>{item.description}</p>
                            </div>

                            <div className="product-actions">
                                {/* Add to Cart Button */}
                                <div onClick={() => toggleCart(item)}>
                                    <FaShoppingCart
                                        style={{
                                            color: isInCart(item.id) ? 'rgba(0,0,139)' : 'black',
                                            cursor: 'pointer',
                                        }}
                                        fontSize={24}
                                    />
                                </div>

                                {/* WhatsApp Button */}
                                <div onClick={handleWhatsAppClick}>
                                    <FaPaperPlane style={{ color: "black", paddingLeft: "10px", cursor: 'pointer' }} fontSize={27} />
                                </div>
                            </div>
                        </div>
                        <hr />
                    </motion.div>
                ))}
            </div>

            {/* Modal for confirmation */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>Confirm Sending Message</h4>
                        <p>Are you sure you want to order the following?</p>
                        
                        {/* Displaying cart items with images in the modal */}
                        <div className="cart-items-container">
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item">
                                    {/* Display Image */}
                                    {item.url ? (
                                        <Image
                                            src={item.url}
                                            alt={item.name}
                                            width={50}
                                            height={50}
                                            style={{ borderRadius: '5px', marginRight: '10px' }}
                                        />
                                    ) : (
                                        <div style={{ width: '50px', height: '50px', backgroundColor: '#ccc', borderRadius: '5px', marginRight: '10px' }} />
                                    )}

                                    {/* Display Item Details */}
                                    <div>
                                        <p><strong>{item.name}</strong></p>
                                        <p>MK{item.price ? item.price.toFixed(2) : "N/A"} (ID: {item.id})</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="modal-actions">
                            <button onClick={sendWhatsAppMessage}>Yes, Send</button>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .products-container {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr); /* Always 2 items per row */
                    gap: 20px;
                    padding: 20px;
                }

                .product-card {
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    text-align: center;
                    transition: transform 0.3s ease;
                }

                .product-card:hover {
                    transform: scale(1.05);
                }

                .product-details {
                    padding: 15px 0;
                }

                .product-actions {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                }

                /* Fixed height for description, show only 4 lines */
                .product-description {
                    display: -webkit-box;
                    -webkit-line-clamp: 4; /* Limit to 4 lines */
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    height: 6em; /* Adjust this value for 4 lines */
                    padding-bottom: 1rem; /* Space for better layout */
                    text-align: left;
                }

                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                .modal-content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    min-width: 300px;
                    max-width: 500px;
                    overflow-y: auto;
                    max-height: 80vh;
                }

                .cart-items-container {
                    max-height: 300px;
                    overflow-y: auto;
                    margin-bottom: 20px;
                }

                .cart-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;
                    padding: 5px;
                    border-bottom: 1px solid #ddd;
                }

                .modal-actions {
                    display: flex;
                    justify-content: space-between;
                }

                .modal-actions button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                }

                .modal-actions button:nth-child(1) {
                    background-color: blue;
                    color: white;
                }

                .modal-actions button:nth-child(2) {
                    background-color: red;
                    color: white;
                }
            `}</style>
            <div style={{marginBottom:'300px'}}>h</div>
        </>
    );
};

export default Avon;
