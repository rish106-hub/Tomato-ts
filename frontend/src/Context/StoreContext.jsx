import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = import.meta.env.VITE_API_URL || "https://tomato-ts-qmzk.onrender.com"
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredFoodList, setFilteredFoodList] = useState([])
    const currency = "INR";
    const deliveryCharge = 50;

    const saveCart = async (newCartItems, authToken = token) => {
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        if (authToken) {
            await axios.post(url + "/api/cart/set", { cartData: newCartItems }, { headers: { token: authToken } });
        }
    }

    const addToCart = async (itemId, quantity = 1) => {
        const currentQuantity = Number(cartItems[itemId]) || 0;
        const newCartItems = { ...cartItems, [itemId]: currentQuantity + quantity };
        await saveCart(newCartItems);
    }

    const removeFromCart = async (itemId, quantity = 1) => {
        const currentQuantity = Number(cartItems[itemId]) || 0;
        const nextQuantity = Math.max(0, currentQuantity - quantity);
        const newCartItems = { ...cartItems };
        if (nextQuantity > 0) {
            newCartItems[itemId] = nextQuantity;
        } else {
            delete newCartItems[itemId];
        }
        await saveCart(newCartItems);
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            try {
              if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) totalAmount += Number(itemInfo.price) * Number(cartItems[item]);
            }  
            } catch (error) {
                
            }
            
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (authToken) => {
        const rawToken = typeof authToken === "string" ? authToken : authToken?.token;
        const response = await axios.get(url + "/api/cart/get", { headers: { token: rawToken } });
        const serverCart = response.data.cartData || {};
        const savedCart = JSON.parse(localStorage.getItem('cartItems') || "{}");
        const mergedCart = { ...serverCart };
        for (const [itemId, quantity] of Object.entries(savedCart)) {
            const parsedQuantity = Number(quantity);
            if (parsedQuantity > 0) {
                mergedCart[itemId] = Math.max(Number(mergedCart[itemId]) || 0, parsedQuantity);
            }
        }
        await saveCart(mergedCart, rawToken);
    }

    // Search functionality
    const filterFoodItems = (query) => {
        if (!query || query.trim() === "") {
            setFilteredFoodList(food_list)
            return
        }

        const filtered = food_list.filter(item => {
            const searchTerm = query.toLowerCase().trim()
            return (
                item.name.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm)
            )
        })
        setFilteredFoodList(filtered)
    }

    useEffect(() => {
        filterFoodItems(searchQuery)
    }, [searchQuery, food_list])

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            
            // Load cart from localStorage first
            const savedCart = localStorage.getItem('cartItems');
            console.log('StoreContext - Loading cart from localStorage:', savedCart);
            if (savedCart) {
                try {
                    const parsedCart = JSON.parse(savedCart);
                    console.log('StoreContext - Parsed cart:', parsedCart);
                    setCartItems(parsedCart);
                } catch (error) {
                    console.error('Error parsing cart from localStorage:', error);
                }
            } else {
                console.log('StoreContext - No cart found in localStorage');
            }
            
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    }, [])

    const contextValue = {
        url,
        food_list,
        filteredFoodList,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        saveCart,
        searchQuery,
        setSearchQuery,
        filterFoodItems,
        currency,
        deliveryCharge
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;
