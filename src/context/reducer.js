export const blogState={
    SETUSER:"Set-User",
    SETMODE:"Set-Mode"
}
export const reducer=(state,action)=>{
    if(action.type===blogState.SETUSER){
       return{
         ...state,
         user:action.user       
       }
    }
    else if(action.type===blogState.SETMODE){
       return{
         ...state,
         mode:action.mode       
       }
    }
}