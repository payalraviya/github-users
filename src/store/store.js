import { createStore } from 'vuex'

const CART_STORAGE_KEY = 'cart_items'
const CART_EXPIRY_KEY = 'cart_expiry'

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    localStorage.setItem(CART_EXPIRY_KEY, Date.now().toString())
}

const loadCartFromLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]')
    const expiry = parseInt(localStorage.getItem(CART_EXPIRY_KEY), 10)
    if (Date.now() - expiry > 30 * 60 * 1000) {
        localStorage.removeItem(CART_STORAGE_KEY)
        localStorage.removeItem(CART_EXPIRY_KEY)
        return []
    }
    return cart
}

const store = createStore({
    state: {
        cart: loadCartFromLocalStorage()
    },
    mutations: {
        ADD_TO_CART(state, product) {
            state.cart.push(product)
            saveCartToLocalStorage(state.cart)
        },
        SET_CART(state, cart) {
            state.cart = cart
        },
        REMOVE_FROM_CART(state, index) {
            state.cart.splice(index, 1)
            saveCartToLocalStorage(state.cart)
        }
    },
    actions: {
        addToCart({ commit }, product) {
            commit('ADD_TO_CART', product)
        },
        loadCart({ commit }) {
            const cart = loadCartFromLocalStorage()
            commit('SET_CART', cart)
        },
        removeItem({ commit }, index) {
            commit('REMOVE_FROM_CART', index)
        },
        updateCartItemQuantity({ commit, state }, { item, index }) {
            const updatedCart = [...state.cart]
            updatedCart[index].qty = item.qty
            commit('SET_CART', updatedCart)
            saveCartToLocalStorage(updatedCart)
        }
    },
    getters: {
        cartItems: (state) => state.cart
    }
})

export default store
