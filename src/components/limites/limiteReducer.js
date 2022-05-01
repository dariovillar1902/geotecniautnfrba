export const limiteReducer = (state = [], action) => {
    switch (action.type) {
        case 'add':
            return [...state, action.payload];

        case 'delete':
            return state.filter(limite => limite.id !== action.payload);

        case 'toggle':
            return state.map(limite =>
                (limite.id === action.payload)
                    ? { ...limite, done: !limite.done }
                    : limite
            )

        case 'toggle-old':
            return state.map(limite => {
                if (limite.id === action.payload) {
                    return {
                        ...limite,
                        done: !limite.done
                    }
                } else {
                    return limite;
                }
            })

        default:
            return state;
    }
}