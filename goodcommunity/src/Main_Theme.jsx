import {createContext, useState} from "react";
import Header from "./components/R11_Context_Theme/Header";
import Contact from "./components/pages/Contact";
import Footer from "./components/R11_Context_Theme/Footer";


// 테마를 위한 Context 생성
const ThemeContext = createContext();

// 부모 컴포넌트 (전체 최상위 앱)
const Main_Theme = () => {
    // 다크모드                                            on/off     상태
    // 초기값은 다크모드가 false 꺼진 상태
    const [isDark, setIsDark] = useState(false);

    // 테마 전환 함수
    const toggleTheme = () => {
        setIsDark(!isDark); // 현재상태의 반대로 값 설정하기
    }
    return (
        // Context로 isDark와 toggleTheme 함수를 모든 하위 컴포넌트에서
        // 사용하고 싶은 곳에서 사용할 수 있도록 제공하겠다.
        <ThemeContext.Provider value={{isDark, toggleTheme}}>
            <div style={{
                minHeight:'100vh',
                backgroundColor:isDark ? '#222' :'#fff',
                          color : isDark ? '#fff' : '#222',
                padding         : '20px'
            }}>
                <Header/>
                <Contact />
                <Footer/>

            </div>
        </ThemeContext.Provider>
    );
};

export default Main_Theme;