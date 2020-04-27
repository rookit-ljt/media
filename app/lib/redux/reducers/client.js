const initialState = {
    socket:{},
    room:'',
    userName:'',
    meetingId:'',
    meetingTitle:'',
};
const client = (state = initialState, action) =>
{
    switch (action.type)
    {
        case 'GET_SOCKET_IO_CONNECTION':
        {

            const { socket,room,userName,meetingId,meetingTitle} = action.payload;
            console.log('我进来了'+socket)

            return { ...state, socket:socket,room:room,userName:userName,meetingId:meetingId,meetingTitle:meetingTitle};
        }
        default:
            return state;
    }
}

export default client