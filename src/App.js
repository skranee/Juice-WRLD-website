import React, {useContext, useEffect, useState} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import UNavigate from "./components/navigation.jsx";
import MainPage from "./main page/mainpage.jsx";
import NewsPage from "./news page/newspage.jsx";
import HelpCenter from "./help group/help center/mainpage_hc.jsx";
import MessagePage from "./help group/help message/messagepage.jsx";
import Notifications from "./notifications/notifications.jsx";
import Registration from "./registration/registration.jsx";
import Login from "./log in/login.jsx";
import AlbumsExplore from "./explore albums/albumsExplore.jsx";
import GBGRPage from "./explore albums/GBGR page/gbgrpage.jsx";
import DRFLPage from "./explore albums/DRFL page/drflpage.jsx";
import LNDPage from "./explore albums/LND page/lndpage.jsx";
import FDPage from "./explore albums/FD page/fdpage.jsx";
import WODPage from "./explore albums/WOD page/wodpage.jsx";
import Gallery from "./gallery page/gallery.jsx";
import {Context} from "./index.js";
import {observer} from 'mobx-react-lite'
import ProfilePage from "./profilepage/profilepage.jsx";
import AdminHelpPage from "./help group/help center/help_admin.jsx";
import IndexStore from "./indexStore.js";
import {Provider} from 'mobx-react'

function App() {
    const {store} = useContext(Context)
    const [repliesData, setRepliesData] = useState([])
    const [messagesData, setMessagesData] = useState([])
    const [newsData, setNewsData] = useState([])
    const location = useLocation()

    useEffect(() => {
        if(localStorage.getItem('token')){
            store.checkAuth()
        }
    }, [location.pathname])

    const getReplies = async () => {
        if(localStorage.getItem('role') === 'user') {
            setRepliesData(await store.getAllAnswers());
        }
        else {
            setMessagesData(await store.getAllMessages())
        }
    }

    const getNews = async () => {
        setNewsData(await store.getNews());
    }

    if(store.isLoading) {
        getNews();
        getReplies();
        return <div className="loader"></div>
    }

    return (
        <>
            <Provider indexStore={IndexStore}>
            {/*{console.log(store.isAuth)}  /!*!!!*!/*/}
                <UNavigate />
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/mainpage' element={<MainPage />} />
                    <Route path='/news' element={<NewsPage newsData={newsData} />} />
                    <Route path='/gallery' element={<Gallery />} />
                    <Route path='/helpcenter' element={store.user.role === 'admin' ? <AdminHelpPage messages={messagesData} /> : <HelpCenter /> } />
                    <Route path='helpmessage' element={<MessagePage data={store.user.role === 'admin' ? messagesData : repliesData} />} />
                    {store.user.role === 'user' &&
                        <Route path='/notifications' element={<Notifications repliesData={repliesData} />} />}
                    <Route path='/registrationpage' element={<Registration />} />
                    <Route path='/loginpage' element={<Login />} />
                    <Route path='/albums' element={<AlbumsExplore />} />
                    <Route path='/albumgbgr' element={<GBGRPage />} />
                    <Route path='/albumdrfl' element={<DRFLPage />} />
                    <Route path='/albumlnd' element={<LNDPage />} />
                    <Route path='/albumfd' element={<FDPage />} />
                    <Route path='/albumwod' element={<WODPage />} />
                    <Route path='/profile' element={<ProfilePage />} />
                </Routes>
            </Provider>
        </>
    );
}

export default observer(App);
