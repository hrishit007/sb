import { LOGIN,LOGOUT } from "../constants";
import * as api from '../api';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   measurementId: import.meta.env.VITE_MEASUREMENT_ID
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const auth = getAuth(app);

export const login= (formData,history,onInvalidCredentials)=>async(dispatch)=>{
    console.log('Working');
    try {
        
        const { data } = await api.signIn(formData);

        dispatch({ type: LOGIN, data });
        history.push('/');
        
    } catch (error) {
        console.log(error);
        console.log(error.response);
        const errorMessage=error.response.data.message;
        switch (errorMessage) {
            case 'Invalid Credentials':
                onInvalidCredentials();
                break;
        
            default:
                break;
        }
    }
    
}

// export const signup=(formData)=>{
//     const {email,password}=formData;
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in 
//             const user = userCredential.user;
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//         });


// }

export const signup= (formData,history)=>async(dispatch)=>{
    console.log('Working');
    history.push('/');
    
}