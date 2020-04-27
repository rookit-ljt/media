
const initialState = {
    info:{}
};


const my = (state = initialState, action) =>
{
    switch (action.type)
    {
        case 'INIT_MY_DATA':
        {
            const info = action.payload.myData.data
            return { ...state, info };
        }

        case 'UPDATA_USRE_DATA':{
            const info = action.payload.myData.info;
            return { ...state, info };
        }
        default:
            return state;
    }
}

export default my