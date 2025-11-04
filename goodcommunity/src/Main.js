import {BrowserRouter, Routes, Route, Link, useNavigate, useParams}  from 'react-router-dom';
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import UserProfile from "./components/pages/UserProfile";
import NotFound from "./components/pages/NotFound";

// App.js 나 Main.js 는 경로나 세션, 보안 설정 자바스크립트
function Main (){
    return(
        <BrowserRouter>
            <nav>
                <Link to="/">홈</Link>
                <Link to="/about">소개</Link>
                <Link to="/contact">연락처</Link>
                <Link to="/user/123">사용자 프로필</Link>
            </nav>


            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/user/:userId" element={<UserProfile />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>

    )


}

export  default Main;