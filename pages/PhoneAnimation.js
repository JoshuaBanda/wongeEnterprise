import animationData from "./animation/Animation.json";
import Lottie from 'lottie-react';

export default function PhoneAnimation({ style }) {
  return (
    <div style={{ ...styles.container, ...style }}>
      <Lottie animationData={animationData} style={styles.animation} />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    // No specific position styles here
    padding: '10px',
  },
  animation: {
    width: '80%', // Adjusts width for mobile responsiveness
    maxWidth: '150px', // Max width for larger screens
  },
};
