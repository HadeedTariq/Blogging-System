let userData=JSON.parse(localStorage.getItem('user-info'))
export const initialState={
    user:userData?userData:null,
    mode:{
        backgroundColor:"white",
        color:"black"
    }
}