import React, { useEffect } from 'react'
import ChatList from './ChatList'
import ChatView from './ChatView'
import '../styles/layout.css'

const Layout = ({ children }) => {

    const [isSmallScreen, setIsSmallScreen] = React.useState(window.innerWidth < 768)

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='layout_wrapper'>
            {!isSmallScreen && <ChatList />}
            {children}
        </div>
    )
}

export default Layout