import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./Spinning";

export function Login() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const postData = async (event) => {
        event.preventDefault(); // Prevent default form submission
        if (name === 'tiongebanda') {
            setLoading(true);
            setTimeout(() => {
                setLoading(false); // Stop loading
                router.push('/ManageProducts'); // Redirect after timeout
            }, 1500);
        } else {
            alert('Invalid credentials'); // Handle invalid input
        }
    };

    return (
        <div style={containerStyle}>
            <div style={formContainerStyle}>
                <h2 style={titleStyle}>Enter credentials</h2>
                {loading ? (
                    <div style={loadingContainerStyle}>
                        <Spinner />
                        <p style={loadingTextStyle}>Loading...</p>
                    </div>
                ) : (
                    <form onSubmit={postData}>
                        <label style={labelStyle}>verify password</label>
                        <input
                            style={inputStyle}
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        
                        <button
                            style={buttonStyle}
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Login;

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff',
    margin: 0,
};

const formContainerStyle = {
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    padding: "40px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "85%",
    maxWidth: "400px",
    textAlign: "center",
};

const titleStyle = {
    marginBottom: "20px",
    color: "#666",
    fontSize: "24px",
    fontWeight: "600",
};

const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    color: "#555",
    fontSize: "14px",
};

const inputStyle = {
    border: "1px solid #666",
    borderRadius: "5px",
    height: "35px",
    padding: "0 10px",
    width: "100%",
    marginBottom: "20px",
    fontSize: "14px",
    transition: "border-color 0.3s ease",
};

const buttonStyle = {
    width: "30%",
    padding: "10px",
    backgroundColor: "rgba(60, 60, 60, 0.5)",
    border: "none",
    borderRadius: "5px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
};

const loadingContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const loadingTextStyle = {
    color: "green",
    fontFamily: "Roman, serif",
    fontSize: "18px",
    marginTop: "10px",
};

// Responsive adjustments
const mediaQueries = `
    @media (max-width: 768px) {
        .formContainer {
            padding: 20px;
            width: 90%;
        }
    }

    @media (max-width: 480px) {
        .formContainer {
            padding: 15px;
            width: 100%;
        }

        .title {
            font-size: 20px;
        }
    }
`;

