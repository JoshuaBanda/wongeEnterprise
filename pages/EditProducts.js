import axios from "axios";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Spinner from "./Spinning";

const EditProducts = () => {
    const [shopItems, setShopItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState('');
    const [editForm, setEditForm] = useState({ name: '', price: '', description: '' });

    useEffect(() => {
        const fetchShop = async () => {
            const { data, error } = await supabase
                .from('shoptable')
                .select();
            if (error) {
                setError('failed to fetch, try again later...');
                console.error("error fetching data", error);
            }
            if (data) {
                setLoading(false);
                setShopItems(data);
            }
        };
        fetchShop();
    }, []);

    const handleDelete = async (itemId, publicId) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        setDeletingId(itemId);
        try {
            await axios.delete(`https://wongebackend.onrender.com/shops/${itemId}/photos/${encodeURIComponent(publicId)}`);
            await axios.delete(`https://wongebackend.onrender.com/shops/${itemId}`);
            setShopItems(prevItems => prevItems.filter(item => item.id !== itemId));
            setMessage("Item deleted successfully.");
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to delete item.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleEditClick = (item) => {
        setEditingId(item.id);
        setEditForm({ name: item.name, price: item.price.toString(), description: item.description });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prevForm => ({
            ...prevForm,
            [name]: name === 'price' ? (parseFloat(value) >= 0 ? value : '') : value,
        }));
    };

    const handleEditSubmit = async (itemId) => {
        if (isNaN(editForm.price) || editForm.price <= 0) {
            setMessage("Price must be a positive number.");
            return;
        }

        try {
            const updatedItem = { ...editForm, price: parseFloat(editForm.price) };
            setShopItems(prevItems => prevItems.map(item => (item.id === itemId ? { ...item, ...updatedItem } : item)));
            await axios.put(`https://wongebackend.onrender.com/shops/${itemId}`, updatedItem);
            setMessage("Item updated successfully.");
        } catch (error) {
            setMessage("Failed to update item.");
        } finally {
            setEditingId(null);
        }
    };

    if (loading) return <Spinner />;
    if (error) return <p>{error}</p>;

    return (
        <div style={containerStyle}>
            {message && <p style={messageStyle}>{message}</p>}
            <div style={itemsContainerStyle}>
                {shopItems.map((item) => (
                    <div key={item.id} style={itemStyle}>
                        <div style={imageContainerStyle}>
                            {item.url ? (
                                <img src={item.url} alt={item.name} style={imageStyle} />
                            ) : (
                                <p>No image available</p>
                            )}
                        </div>
                        <div style={infoContainerStyle}>
                            <div>
                                {editingId === item.id ? (
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={editForm.name} 
                                        onChange={handleEditChange} 
                                        placeholder="Product Name" 
                                        style={inputStyle}
                                    />
                                ) : (
                                    <h3 style={titleStyle}>
                                        {item.name} <span style={idStyle}>[ID: {item.id}]</span>
                                    </h3>
                                )}
                            </div>
                            <div>
                                {editingId === item.id ? (
                                    <input 
                                        type="number" 
                                        name="price" 
                                        value={editForm.price} 
                                        onChange={handleEditChange} 
                                        placeholder="Price" 
                                        style={inputStyle}
                                    />
                                ) : (
                                    <p style={priceStyle}>MK{item.price.toFixed(2)}</p>
                                )}
                            </div>
                            <div>
                                {editingId === item.id ? (
                                    <textarea 
                                        name="description" 
                                        value={editForm.description} 
                                        onChange={handleEditChange} 
                                        placeholder="Description" 
                                        style={textareaStyle}
                                    />
                                ) : (
                                    <p style={descriptionStyle}>{item.description}</p>
                                )}
                            </div>
                            <div>
                                {editingId === item.id ? (
                                    <>
                                        <button onClick={() => handleEditSubmit(item.id)} style={buttonStyle(false)}>Save</button>
                                        <button onClick={() => setEditingId(null)} style={buttonStyle(false)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditClick(item)} style={buttonStyle(false)}>Edit</button>
                                        <button 
                                            style={buttonStyle(deletingId === item.id)} 
                                            onClick={() => handleDelete(item.id, item.publicId)} 
                                            disabled={deletingId === item.id}
                                        >
                                            {deletingId === item.id ? "Deleting..." : "Delete"}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginBottom: "120px" }}></div>
        </div>
    );
};

const containerStyle = {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "white",
    maxWidth: "600px",
    margin: "0 auto",
    marginTop: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
};

const messageStyle = {
    color: '#3B7A57',
};

const itemsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Two items per row
    gap: '15px', // Space between items
    marginTop: '20px',
};

const itemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottom: '1px solid #ccc',
    padding: '10px 0',
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    marginBottom: '10px',
};

const imageContainerStyle = {
    marginRight: '15px',
};

const infoContainerStyle = {
    flex: 1,
};

const imageStyle = {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '5px',
};

const titleStyle = {
    color: "#666",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};

const idStyle = {
    fontSize: "0.8em",
    color: "#aaa",
    fontWeight: "normal",
};

const priceStyle = {
    color: '#3B7A57',
    fontWeight: 'bold',
};

const descriptionStyle = {
    color: "#666",
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

const textareaStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'none',
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

const buttonStyle = (isDeleting) => ({
    backgroundColor: isDeleting ? "#d9534f" : "#5cb85c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: isDeleting ? "not-allowed" : "pointer",
    margin: "0 5px",
});

export default EditProducts;
