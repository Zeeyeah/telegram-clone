import React, { useEffect, useState } from 'react'
import '../styles/chat-list.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ChatList = () => {
    const { id } = useParams()
    const [hamburgerOpen, setHamburgerOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [chatsList, setChatsList] = useState([])
    const [page, setPage] = useState(1)

    const loadmoreref = React.useRef(null)

    useEffect(() => {
        axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=' + page).then((res) => {
            let tempdata = res.data.data
            setChatsList((prev) => [...prev, ...tempdata.data])
            console.log('page', id);
        })
    }, [page])
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('light-mode')
        } else {
            document.body.classList.remove('light-mode')
        }
    }, [darkMode])

    useEffect(() => {
        console.log('triggered');
        let observer;

        if (page < 80) {
            observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            }, { rootMargin: "0px 0px 100px 0px" });

            if (loadmoreref.current) {
                observer.observe(loadmoreref.current);
            }
        }

        return () => {
            if (observer && loadmoreref.current) {
                observer.unobserve(loadmoreref.current);
            }
        };
    }, [chatsList]);

    function getRandomValue() {
        return Math.floor(Math.random() * 150);
    }

    function getRandomColor() {
        const r = getRandomValue();
        const g = getRandomValue();
        const b = getRandomValue();
        return `rgb(${r}, ${g}, ${b})`;
    }

    function getRandomGradient() {
        const randomColor1 = getRandomColor();
        const randomColor2 = getRandomColor();
        return `linear-gradient(45deg, ${randomColor1}, ${randomColor2})`;
    }
    const navigate = useNavigate()

    return (
        <div className='chat-list'>
            <div className="chat-header">
                <div className={`hamburger ${hamburgerOpen ? 'open' : ''}`}>
                    <div className="hamburger-icon" onClick={() => setHamburgerOpen(!hamburgerOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="hamburger-content">
                        <div className="hamburger-profile">
                            <div className="hamburger-profile-icon">
                                B
                            </div>
                            <h4>Ziya</h4>
                            <p>+91 7993095402</p>
                            <div onClick={() => setDarkMode(!darkMode)} className={`hamburger-theme ${darkMode ? 'dark' : ''}`}>
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="moon">
                                        <path id="moon_2" d="M24.3215 44C29.5406 44 34.5459 41.9267 38.2363 38.2363C41.9267 34.5459 44 29.5406 44 24.3215C44 16.3484 39.4197 9.19966 32.3278 6.11302C32.0778 6.00409 31.8009 5.97297 31.533 6.02371C31.2651 6.07445 31.0187 6.2047 30.8259 6.3975C30.6331 6.59029 30.5029 6.83668 30.4521 7.10457C30.4014 7.37245 30.4325 7.64941 30.5415 7.89935C31.3557 9.76881 31.7858 12.1633 31.7858 14.8216C31.7858 24.1756 24.1756 31.7858 14.8216 31.7858C12.1633 31.7858 9.76881 31.3557 7.89935 30.5415C7.64941 30.4325 7.37245 30.4014 7.10457 30.4521C6.83668 30.5029 6.59029 30.6331 6.3975 30.8259C6.2047 31.0187 6.07445 31.2651 6.02371 31.533C5.97297 31.8009 6.00409 32.0778 6.11302 32.3278C9.19966 39.4197 16.3484 44 24.3215 44Z" fill="#FBFBFB" />
                                        <circle id="sun-ball" cx="24.5" cy="24.5" r="15.5" fill="#FBFBFB" />
                                        <g id="sun-rays">
                                            <circle id="Ellipse" cx="24.5" cy="3.5" r="2.5" fill="#FBFBFB" />
                                            <circle id="Ellipse_2" cx="39.5" cy="9.5" r="2.5" fill="#FBFBFB" />
                                            <circle id="Ellipse_3" cx="46.5" cy="24.5" r="2.5" fill="#FBFBFB" />
                                            <circle id="Ellipse_4" cx="40.5" cy="39.5" r="2.5" fill="#FBFBFB" />
                                            <circle id="Ellipse_5" cx="24.5" cy="46.5" r="2.5" fill="#FBFBFB" />
                                            <circle id="Ellipse_6" cx="9.5" cy="39.5" r="2.5" fill="#FBFBFB" />
                                            <circle id="Ellipse_7" cx="3.5" cy="24.5" r="2.5" fill="#FBFBFB" />
                                            <circle id="Ellipse_8" cx="10.5" cy="9.5" r="2.5" fill="#FBFBFB" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <ul className="hamburger-list">
                            <li>
                                <i className="far fa-user"></i>
                                Profile
                            </li>
                            <span></span>
                            <li>
                                <i className="far fa-bookmark"></i>
                                Saved Messages
                            </li>
                            <li>
                                <i className="far fa-address-book"></i>
                                Contacts
                            </li>
                            <li>
                                <i className="far fa-comments"></i>
                                Stories
                            </li>
                            <li>
                                <i className="far fa-moon"></i>
                                Night Mode
                            </li>
                            <li>
                                <i className="far fa-question-circle"></i>
                                Help
                            </li>
                            <li>Telegram Clone 1.0</li>
                        </ul>
                    </div>
                </div>
                <h2>Telegram</h2>
                <div className="search-icon">
                    <i className="fa fa-search"></i>
                </div>
            </div>

            <div onClick={() => hamburgerOpen && setHamburgerOpen(false)} className="chats">
                {chatsList.length > 0 && chatsList.map((item) => {
                    const randomGradient = getRandomGradient();
                    const date = new Date(item.created_at);

                    const hours = ('0' + date.getHours()).slice(-2);
                    const minutes = ('0' + date.getMinutes()).slice(-2);

                    const formattedTime = `${hours}:${minutes}`;
                    return (
                        <div className={`chat-item ${id == item.id ? 'open' : ''}`} onClick={() => !hamburgerOpen && navigate(`/chat/${item.id}`, { state: { name: item.creator.name ? item.creator.name : 'Ziya' } })}>
                            <div className="chat-profile" style={{ background: randomGradient }}>
                                {item.creator.name === null ? 'Z' : item.creator.name[0]}
                            </div>
                            <div className="chat-info">
                                <div className="chat-name">{item.creator.name === null ? 'Ziya' : item.creator.name}</div>
                                <div className="recent-msg">Lorem, ipsum dolor sit amet consect.</div>
                            </div>
                            <div className="chat-details">
                                <div className="chat-time">{formattedTime}</div>
                                <div className="chat-msg-count">{item.msg_count} </div>
                            </div>
                        </div>
                    )
                })}
                {page < 80 && <div className='loading' ref={loadmoreref}></div>}
            </div>
        </div>
    )
}

export default ChatList