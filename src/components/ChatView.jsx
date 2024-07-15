import React, { useEffect, useRef } from 'react'
import Layout from './Layout'
import '../styles/chat-view.css'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'

const ChatView = () => {
    const [chatData, setChatData] = React.useState([])
    const [darkMode, setDarkMode] = React.useState(false)
    const [isSmallScreen, setIsSmallScreen] = React.useState(window.innerWidth < 768)

    const { id } = useParams()
    const location = useLocation();
    const { name } = location.state || {};

    const chaiView = useRef(null)

    const scrollToBottom = () => {
        chaiView.current.scrollTop = chaiView.current.scrollHeight
    }


    useEffect(() => {
        window.innerWidth < 768 ? setIsSmallScreen(true) : setIsSmallScreen(false)
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                setIsSmallScreen(true)
            } else {
                setIsSmallScreen(false)
            }
        })
        axios.get('https://devapi.beyondchats.com/api/get_chat_messages?chat_id=' + id).then((response) => {
            setChatData(response.data)
        })

        scrollToBottom()
    }, [id])

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('light-mode')
        } else {
            document.body.classList.remove('light-mode')
        }
    }, [darkMode])
    return (
        <Layout>
            <div className='chat-view'>
                <div className="chat-bg">
                    <div className="sender-profile">
                        <div className="sender-info">
                            <div className="back-btn" onClick={() => window.history.back()}>
                                <i className="fas fa-arrow-left"></i>
                            </div>
                            <div className="sender-pic">
                                {name[0]}
                            </div>
                            <div className="sender-name">
                                <h3>{name}</h3>
                                <p>Online</p>
                            </div>
                        </div>
                        <div className="sender-options">
                            <div className="color-theme" onClick={() => setDarkMode(!darkMode)}>
                                {darkMode ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
                            </div>
                            <i className="fas fa-ellipsis-v"></i>
                        </div>

                    </div>
                    <div ref={chaiView} className="chat-bubble">

                        {chatData.data && chatData.data.map((message) => {
                            if (message.sender_id == 1) {
                                return (<>
                                    <div className="current-date">
                                        {new Date(message.created_at).toDateString()}
                                    </div>
                                    <div className='right-message'>
                                        <p>{message.message}</p>
                                    </div>
                                </>
                                )
                            }
                            else return (
                                <div className='left-message'>
                                    <p>{message.message}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="chat-input">
                        <div className="emoji">
                            <i className="far fa-smile"></i>
                        </div>
                        <input type="text" placeholder="Message" />
                        <div className="link">
                            <i className="fas fa-paperclip"></i>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ChatView