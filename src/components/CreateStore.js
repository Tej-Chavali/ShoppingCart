export const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
                let incrementValue = parseInt(action.count_Value);
                if (incrementValue < action.quantity_default) {
                    incrementValue = incrementValue + 1;
                }
                return incrementValue;
    
        case 'DECREMENT':
                let decrementValue = parseInt(action.count_Value);
                if (decrementValue > 1) {
                    decrementValue = decrementValue - 1;
                }
                return decrementValue;
    
        default:
                return action.count_Value;
    }

}