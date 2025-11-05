import {useContext} from "react";
import {ThemeContext} from "../../Main_Theme";
import {darkTheme, lightTheme} from "./themeStyles";
const Footer = () => {
    const {isDark} = useContext(ThemeContext);
    const theme = isDark ? darkTheme : lightTheme;
    return (
        <footer style={theme.footer.container}>
        <p style={theme.footer.text}>&copy;  2025 - {isDark ? '다크 모드' : '라이트 모드'}</p>
        </footer>
    );
};
export default Footer;