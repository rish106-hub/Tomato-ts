import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
import { buildRestaurantsFromFoods, fallbackFoods, normalizeMarketplaceFoods } from "../data/marketplace";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = import.meta.env.VITE_API_URL || "https://tomato-ts-qmzk.onrender.com";
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFoodList, setFilteredFoodList] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const currency = "INR";
    const deliveryCharge = 50;

    // Cart is always synced to server when token exists; no localStorage dependency
    const syncCartToServer = async (newCartItems, authToken) => {
        if (!authToken) return;
        try {
            await axios.post(url + "/api/cart/set", { cartData: newCartItems }, { headers: { token: authToken } });
        } catch (e) {
            console.error("Cart sync failed:", e);
        }
    };

    const addToCart = async (itemId, quantity = 1) => {
        const newCartItems = { ...cartItems, [itemId]: (Number(cartItems[itemId]) || 0) + quantity };
        setCartItems(newCartItems);
        await syncCartToServer(newCartItems, token);
    };

    const removeFromCart = async (itemId, quantity = 1) => {
        const current = Number(cartItems[itemId]) || 0;
        const next = Math.max(0, current - quantity);
        const newCartItems = { ...cartItems };
        if (next > 0) newCartItems[itemId] = next;
        else delete newCartItems[itemId];
        setCartItems(newCartItems);
        await syncCartToServer(newCartItems, token);
    };

    const clearCart = async () => {
        setCartItems({});
        await syncCartToServer({}, token);
    };

    const getTotalCartAmount = () => {
        let total = 0;
        for (const [id, qty] of Object.entries(cartItems)) {
            if (qty > 0) {
                const item = food_list.find(p => p._id === id);
                if (item) total += Number(item.price) * Number(qty);
            }
        }
        return total;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            const normalizedFoods = normalizeMarketplaceFoods(response.data.data || []);
            setFoodList(normalizedFoods);
            setRestaurants(buildRestaurantsFromFoods(normalizedFoods));
        } catch (error) {
            console.error("Food list fetch failed, using fallback:", error);
            setFoodList(fallbackFoods);
            setRestaurants(buildRestaurantsFromFoods(fallbackFoods));
        }
    };

    const loadCartData = async (authToken) => {
        const rawToken = typeof authToken === "string" ? authToken : authToken?.token;
        if (!rawToken) return;
        try {
            const response = await axios.get(url + "/api/cart/get", { headers: { token: rawToken } });
            setCartItems(response.data.cartData || {});
        } catch (e) {
            console.error("Load cart failed:", e);
        }
    };

    const logout = () => {
        setToken("");
        setCartItems({});
        localStorage.removeItem("token");
    };

    // Search
    const filterFoodItems = (query) => {
        if (!query?.trim()) { setFilteredFoodList(food_list); return; }
        const term = query.toLowerCase().trim();
        setFilteredFoodList(food_list.filter(item =>
            item.name.toLowerCase().includes(term) ||
            item.category.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term) ||
            item.restaurantName?.toLowerCase().includes(term) ||
            item.restaurantArea?.toLowerCase().includes(term) ||
            item.cuisines?.some(c => c.toLowerCase().includes(term))
        ));
    };

    useEffect(() => { filterFoodItems(searchQuery); }, [searchQuery, food_list]);

    useEffect(() => {
        const init = async () => {
            await fetchFoodList();
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        };
        init();
    }, []);

    const contextValue = {
        url, food_list, filteredFoodList, menu_list, restaurants,
        cartItems, addToCart, removeFromCart, clearCart, getTotalCartAmount,
        token, setToken, logout, loadCartData, setCartItems,
        searchQuery, setSearchQuery, filterFoodItems,
        currency, deliveryCharge,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
