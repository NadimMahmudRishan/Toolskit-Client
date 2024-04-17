import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../Pages/Shared/Footer/Footer";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Main = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 300) {
            setShowBackToTop(true);
        } else {
            setShowBackToTop(false);
        }
    };

    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
            {showBackToTop && (
                <Fab
                    size="small"
                    aria-label="scroll back to top"
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        backgroundColor: '#CC3333',
                        '&:hover': {
                            backgroundColor: '#CC3333',
                        }
                    }}
                    onClick={handleBackToTop}
                >

                    <KeyboardArrowUpIcon sx={{ color: 'white' }} />
                </Fab>
            )}
        </div>
    );
};

export default Main;
