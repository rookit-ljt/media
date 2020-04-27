const initialState = {
    userData:{}
};


const login = (state = initialState, action) =>
{
    switch (action.type)
    {
        case 'INIT_USER_DATA':
        {
            const { userData } = action.payload;
            return { ...state, userData };
        }
        default:
            return state;
    }
}

export default login