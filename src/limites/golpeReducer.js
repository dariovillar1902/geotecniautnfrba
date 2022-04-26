export const golpeReducer = (state = [], action) => {
    switch (action.type) {
        case 'add':
            return [...state, action.payload];

        case 'delete':
            return state.filter(golpe => golpe.id !== action.payload);

        case 'toggle':
            return state.map(golpe =>
                (golpe.id === action.payload)
                    ? { ...golpe, done: !golpe.done }
                    : golpe
            )

        case 'toggle-old':
            return state.map(golpe => {
                if (golpe.id === action.payload) {
                    return {
                        ...golpe,
                        done: !golpe.done
                    }
                } else {
                    return golpe;
                }
            })

        default:
            return state;
    }
}