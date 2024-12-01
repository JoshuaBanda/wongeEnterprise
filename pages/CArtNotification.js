import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

const CartNotification = ({ handleDisplayCart }) => {
    const [displayCart, setDisplayCart] = useState(false);

    const styles = {
        container: {
            position: 'fixed',
            top: '80%',
            left: '0px',
            border: '1px solid #666',
            zIndex: 20,
            padding: '15px',
        },
    };

    const variants = {
        grow: { scale: 1.2 },
        shrink: { scale: 1 },
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayCart(prev => !prev);
        }, 2000); // Change the interval time as needed

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            onClick={handleDisplayCart}
            style={styles.container}
            variants={variants}
            animate={displayCart ? "grow" : "shrink"}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
            <FaShoppingCart color={displayCart ? `rgba(0,0,139)` : "coral"} />
        </motion.div>
    );
};

export default CartNotification;
