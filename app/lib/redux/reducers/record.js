const initialState = {
    userRecord:{}
};


const record = (state = initialState, action) =>
{
    switch (action.type)
    {
        case 'INIT_USER_RECORD':
        {
            const { userRecord } = action.payload;

            return { ...state, userRecord };
        }
        default:
            return state;
    }
}

export default record