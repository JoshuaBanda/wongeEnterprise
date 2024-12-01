import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Greetings = () => {
    const [greetings, setGreetings] = useState(true);
  
    useEffect(() => {
        const timer = setTimeout(() => {
            setGreetings(false);
        }, 6000);
  
        return () => clearTimeout(timer);
    }, []);

    return (  
        <>
            {greetings && (
                <motion.div
                    style={{
                        position: "absolute",
                        zIndex: 10,
                        color: "#666",
                        fontSize: "20px", // Adjusted font size for mobile
                        display: "block",
                        margin: "20px 20px 20px 0px", // Reduced margin for mobile
                        border: "1px solid #666",
                        borderRadius: "3px",
                        padding: "10px", // Adjusted padding for mobile
                        backgroundColor: "rgba(250,250,250,0.8)",
                        width: "80%", // Increased width for mobile
                        maxWidth: "250px", // Set a max width for larger screens
                        paddingLeft:'10%'
                    }}
                    initial={{ x: -500, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 1 }}
                    exit={{
                        x: 100,
                        opacity: 0,
                        scale: 0.5,
                        transition: { duration: 3 }
                    }}
                >
                    Welcome.
                </motion.div>
            )}
        </>
    );
}
 
export default Greetings;
