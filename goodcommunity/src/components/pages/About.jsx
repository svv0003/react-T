import {useNavigate} from "react-router-dom";

const About = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>소개 페이지</h1>
            <p>우리를 소개합니다.</p>
            <button onClick={() => navigate('/')}>홈으로 이동</button>

        </div>
    );
};

export default About;