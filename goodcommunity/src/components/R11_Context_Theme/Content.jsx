import {useContext} from "react";
import {ThemeContext} from "../../Main_Theme";
import {darkTheme, lightTheme} from "./themeStyles";

const Content = () => {
    const {isDark} = useContext(ThemeContext);
    const theme = isDark ? darkTheme : lightTheme;

    return (
        <main style={theme.content.container}>
            <h2 style={theme.content.text}>본문 내용</h2>
            <p style={theme.content.text}>현재 모드 : {isDark?'다크 모드':'라이트모드'}</p>
            <p style={theme.content.text}>Context를 사용하면 props 전달 없이 테마 정보를 바로 가져올 수 있다.</p>
        </main>
    );
};

export default Content;