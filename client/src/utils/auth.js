export const isLoggedIn = () => {
    let token = localStorage.getItem("token");
    
    if (!token) return false;  // no token → not logged in
    
    try {
        let payload = JSON.parse(atob(token.split('.')[1])); // decode token
        let expiry = payload.exp;                            // get expiry time
        
        if (Date.now() >= expiry * 1000) {  // check if expired
            localStorage.removeItem("token"); // clean up expired token
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}