export function createAction(type) {
    return (value) => ({
        type,
        value,
    })
}

export function createReducer(initialState,cb) {
    return (state = initialState, action) => {
        const switchableObject = cb(state, action);
        if (switchableObject.hasOwnProperty(action.type)) {
            if (typeof switchableObject[action.type] !== 'function') {
                throw new TypeError('Object value in create reducer callback object must be function')
            } else {
                const value = switchableObject[action.type]();
                return value !== undefined ? value : state;
            }
        }
        return state;
    }
}
