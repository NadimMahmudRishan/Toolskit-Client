import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { Box, LinearProgress } from "@mui/material";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            console.error('Error signing in:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logOut = async () => {
        setLoading(true);
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        createUser,
        signIn,
        loading,
        logOut,
    };

    if (loading) {
        return <Box sx={{ width: '100%' }}>
            <LinearProgress color="error" />
        </Box>
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
