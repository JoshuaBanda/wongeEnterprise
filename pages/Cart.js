import React, { useState } from "react";
import { FaAngleDoubleLeft, FaArrowLeft, FaPaperPlane, FaShoppingCart, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from 'next/image';

const Cart = ({ addTocart, cart, removeFromCart }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [displayCart, setDisplayCart] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const styles = {
    // Fixed cart icon without background
    cartIcon: {
      position: 'fixed',
      top: '0px',  // Adjust this value to move it closer to the top of the screen
      right: '55px',  // Move the icon to the top-right
      zIndex: 2000,  // Ensure it's above everything else
      padding: '10px',
      cursor: 'pointer',  // Removed background and border
    },
    // Cart overlay (full screen)
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dimmed background
      zIndex: 1000,  // Overlay above the content
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '20px',
    },
    // Cart content inside the overlay
    container: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '90%',
      maxWidth: '600px',
      overflowY: 'auto',
      position: 'relative', // Make container relative so the paper plane can position itself inside it
    },
    // Close button for the overlay
    closeButton: {
      position: 'absolute',
      top: '25px',
      right: '20px',
      background: 'rgba(255, 255, 255,)',
      border: 'none',
      padding: '10px',
      borderRadius: '50%',
      cursor: 'pointer',
      color:'coral',
      fontSize:'30px'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '24px',
      color: '#666',
      marginBottom: '20px',
    },
    list: {
      listStyleType: 'none',
      padding: '0',
      margin: '0',
    },
    listItem: {
      padding: '10px',
      backgroundColor: '#f9f9f9',
      margin: '5px 0',
      borderRadius: '4px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
    },
    emptyMessage: {
      color: '#aaa',
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: '20px',
    },
    paperPlaneContainer: {
      position: 'absolute',  // Changed to absolute to position it within the container
      top: '10px',
      right: '10px',  // Positioned at the far right of the container
      zIndex: 1,
    },
    deleteIcon: {
      color: 'rgb(210, 43, 43)',
      cursor: 'pointer',
    },
    cartItemImage: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      marginRight: '10px',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background
      zIndex: 1001,  // Ensures modal is above everything else
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      width: '80%',
      maxWidth: '400px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    modalHeader: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#333',
    },
    modalFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
    confirmButton: {
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
  };

  const formatCart = (cart) => {
    return cart.map(item => `ID: ${item.id}, Name: ${item.name}, Price: MK${item.price}`).join('\n');
  };

  const sendWhatsAppMessage = () => {
    const message = `Hello! Here are my cart items:\n${formatCart(cart)}`;
    window.open(`https://wa.me/265886198551?text=${encodeURIComponent(message)}`);
    setShowWhatsAppModal(false);
  };

  const confirmWhatsAppSend = () => {
    setShowWhatsAppModal(true);
  };

  const confirmDelete = (itemId) => {
    setItemToDelete(itemId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmation = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete);
      setItemToDelete(null);
    }
    setShowDeleteModal(false);
  };

  const handleDisplayCart = () => {
    setDisplayCart(prev => !prev);
  };

  const handleBounceAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setIsAnimating(true);
      }, 9000); // Pause before restarting
    }, 9000); // Bounce duration
  };

  return (
    <>
      {/* Cart Icon */}
      <motion.div 
        onClick={() => {
          handleDisplayCart();
          handleBounceAnimation();
        }}
        style={styles.cartIcon}
        initial={{ x: 5, y: 0 }}
        animate={{ x: 0, y: isAnimating ? [5, 0, 5] : 0 }}  // Bouncing effect
        transition={{ type: 'bezier', repeat: isAnimating ? Infinity : 0, repeatType: "reverse", duration: 2 }}
        aria-label="Shopping Cart"
      >
        <FaShoppingCart color="rgba(60, 60, 60, 1)" size={30} />
      </motion.div>

      {/* Full Screen Cart Overlay */}
      {displayCart && (
        <div style={styles.overlay}>
          {/* Close button */}
          <button style={styles.closeButton} onClick={() => setDisplayCart(false)}>
            <FaAngleDoubleLeft/>
          </button>

          <div style={styles.container}>
            <motion.div
              initial={{ y: 30, opacity: 0, x: -30 }}
              animate={{ y: [0, -15], x: [-10, 10], opacity: 1 }}
              transition={{ type: 'bezier', repeat: Infinity, repeatType: "reverse", delay: 2 }}
              style={styles.paperPlaneContainer}
            >
              <FaPaperPlane
                style={{ color: 'coral', fontSize: '40px', cursor: 'pointer' }}
                onClick={confirmWhatsAppSend}
              />
            </motion.div>
            <h1 style={styles.header}>
              Your Cart
              <div>
                <motion.div
                  initial={{ x: -10 }}
                  animate={{ x: 110 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                  style={styles.icon}>
                  <FaShoppingCart />
                </motion.div>
              </div>
            </h1>

            <i style={{ color: "#666", fontSize: "16px", display: "block", marginBottom: "20px" }}>
              {'You have added ' + cart.length + ' item(s) to your cart.'}
            </i>

            <ul style={styles.list}>
              {cart.map(item => (
                <li key={item.id} style={styles.listItem}>
                  {item.url ? (
                    <Image 
                      src={item.url}
                      alt={item.name} 
                      width={50} 
                      height={50} 
                      style={styles.cartItemImage} 
                    />
                  ) : (
                    <div style={styles.cartItemImage}>No Image</div>
                  )}
                  {item.name}
                  <i style={{ color: "#666", fontSize: "16px", margin: '10px' }}>
                    MK{item.price}
                  </i>
                  <FaTrash style={styles.deleteIcon} onClick={() => confirmDelete(item.id)} />
                </li>
              ))}
            </ul>

            {/* Modal for WhatsApp confirmation */}
            {showWhatsAppModal && (
              <div style={styles.modal}>
                <div style={styles.modalContent}>
                  <div style={styles.modalHeader}>Confirm Send</div>
                  <p>You want to order the products in your cart 👌🤞</p>
                  <div style={styles.modalFooter}>
                    <button style={styles.confirmButton} onClick={sendWhatsAppMessage}>Yes, Send</button>
                    <button style={styles.cancelButton} onClick={() => setShowWhatsAppModal(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal for delete confirmation */}
            {showDeleteModal && (
              <div style={styles.modal}>
                <div style={styles.modalContent}>
                  <div style={styles.modalHeader}>Confirm Deletion</div>
                  <p>Are you sure you want to delete this item?</p>
                  <div style={styles.modalFooter}>
                    <button style={styles.confirmButton} onClick={handleDeleteConfirmation}>Yes, Delete</button>
                    <button style={styles.cancelButton} onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
