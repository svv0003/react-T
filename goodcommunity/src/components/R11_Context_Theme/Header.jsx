import {useContext} from "react";
import {ThemeContext} from "../../Main_Theme";
import {commonStyles, darkTheme, lightTheme} from "./themeStyles";

const Header = () => {
    const {isDark, toggleTheme} = useContext(ThemeContext);
    const theme = isDark ? darkTheme : lightTheme;

    return (
        <header style={theme.header.container}>
            <h1>웹사이트</h1>
            <button
                onClick={toggleTheme}
                style={{...commonStyles.button, ...theme.header.button }}>
                {isDark ?'라이트모드':'다크모드'}
            </button>
        </header>
    );
};

export default Header;