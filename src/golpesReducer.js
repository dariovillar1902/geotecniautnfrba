export const golpesReducer = (state = [], action) => {
    switch (action.type) {
        case 'add':
            return [...state, action.payload];

        case 'delete':
            return state.filter(golpes => golpes.id !== action.payload);

        case 'toggle':
            return state.map(golpes =>
                (golpes.id === action.payload)
                    ? { ...golpes, done: !golpes.done }
                    : golpes
            )

        case 'toggle-old':
            return state.map(golpes => {
                if (golpes.id === action.payload) {
                    return {
                        ...golpes,
                        done: !golpes.done
                    }
                } else {
                    return golpes;
                }
            })

        default:
            return state;
    }
}