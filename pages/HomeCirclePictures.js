import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import { useRouter } from "next/router";

const HomeCirclePictures = () => {
    const router = useRouter();
    const imageUrls = ['nicklace2.jpg', '2.jpg', 'perfume.jpg', 'happycustomer.jpg'];
    const imageText = ['Jewelry', 'Lotion', 'Perfumes', 'Happy customers',];

    return (
        <div>
        <motion.p
        initial={{y:-100}}
        animate={{y:0}}
        transition={{type:'spring',stiffness:500}}
        style={{
            marginLeft:"15%",
            marginTop:'40px',
            fontSize:'24px',
            color:'#666'
        }}
        >
        Our stock
        </motion.p>
            
        <motion.div
            style={{
                position: "relative",
                margin: "0 auto",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                flexWrap: "wrap", // Allow wrapping to the next row
                padding: "20px",
                overflowX: "hidden", // Prevent horizontal scrolling
                maxWidth: "100vw",
                boxSizing: "border-box",
            }}
        >
        
            {
                imageUrls.map((url, index) => (
                    <div key={index} style={{ textAlign: "center", margin: "10px", flex: "0 1 calc(50% - 20px)" }}> {/* Adjusted for two items per row */}
                        <Image
                            src={`/${url}`} 
                            alt={imageText[index]} 
                            width={90} // Adjust width for mobile
                            height={90} // Adjust height for mobile
                            layout="fixed" 
                            style={{
                                border: "1px solid silver",
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                            quality={80}
                            priority
                            onClick={() => {
                                router.push("/AllProducts"); 
                            }}
                        />
                        <motion.i
                            style={{
                                color: "#4a2c2a",
                                fontSize: "12px", 
                                display: "block",
                                marginTop: "5px",
                            }}
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
                        >
                            {imageText[index]}
                        </motion.i>
                    </div>
                ))
            }
        </motion.div>
        </div>
    );
}

export default HomeCirclePictures;
