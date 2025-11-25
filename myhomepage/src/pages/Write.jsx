// 글쓰기
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {boardSave, goToPage} from "../context/scripts";

/*
user?.memberName
user 객체가 존재하면 user.memberName 반환하고,
user가 null 또는 undefined라면 에러 없이 undefined 반환한다.

const name = user.memberName; 형식은 user null인 경우 에러 발생한다.

------
let name;
if (user) {
    name = user.memberName;
} else {
    name = undefined;
}
------
user ? user.memberName : undefined
 */
const Write = () => {
    // form 데이터 내부 초기값
    // 작성자 -> 나중에 로그인한 아이디로 박제 변경불가하게
    // react-router-dom 에 존재하는 path 주소 변경 기능 사용
    const navigate = useNavigate();
    const { user, isAuthenticated, loading } = useAuth();


    const [formData, setFormData] = useState({
    title: '',
    content: '',
    writer: user?.memberName || '',
    })

    // 로그인 안 했거나 로딩 중이면 접근 차단 (가장 안전)
    if (loading) {
        return <div>로딩 중</div>;
    }

    if (!isAuthenticated) {
        return (
            <div style={{textAlign: 'center', padding: '100px', color: 'red'}}>
                <h2>로그인이 필요합니다!</h2>
                <button onClick={() => navigate('/login')}>로그인 하러 가기</button>
            </div>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); //제출 일시 중지
        boardSave(axios, {...formData, writer:user?.memberName}, navigate);
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        if (name !== 'writer') { // 작성자는 수정 불가!
            setFormData(p => ({ ...p, [name]: value }));
        }
    }

    // ok를 할 경우 게시물 목록으로 돌려보내기   기능이 하나이기 때문에 if 다음 navigate 는 {} 생략 후 작성
    const handleCancel = () => {
        if (window.confirm("작성을 취소하시겠습니까?"))  goToPage(navigate, '/board');
    }

    return(
        <div className="page-container">
        {isAuthenticated ? (
            <>
                <h1>글쓰기</h1>
                <form onSubmit={handleSubmit}>
                    {/* 로그인 상태에 따라 다른 메뉴 표시 */}
                    <label>작성자 :
                        <input type="text"
                               id="writer"
                               name="writer"
                               className="writer-input"
                               value={user?.memberName}
                               placeholder={user.memberName}
                               disabled
                        />
                    </label>
                    <label>제목 :
                        <input type="text"
                               id="title"
                               name="title"
                               value={formData.title}
                               onChange={handleChange}
                               placeholder="제목을 입력하세요."
                               maxLength={200}
                               required
                        />
                    </label>
                    <label>내용 :
                        <textarea
                               id="content"
                               name="content"
                               value={formData.content}
                               onChange={handleChange}
                               placeholder="내용을 입력하세요."
                               rows={15}
                               required
                        />
                    </label>
                    <div className="form-buttons">
                        <button type="submit"
                                className="btn-submit">
                            작성하기
                        </button>
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={handleCancel}
                        >
                            돌아가기
                        </button>
                    </div>
                </form>
            </>
            )
        :
            (goToPage(navigate, '/board'))
        }
        </div>
    )
}




















// 소괄호 내에는 js 작성불가 단순 html 만 작성 가능        지양
const 소괄호 = (props) => (
    <div className="page-container">
        <h1>글쓰기</h1>
        {/*
        예외적으로 js가 필요할 경우
        html 내부에서 js 를 작성가능
        정말 급할 때 이외에는 추천하지 않는 방법
        Parent 에서 매개변수로 props 를 전달받고,
        전달받은 props 데이터 변수명칭을 단순히 사용하기만 할 때 사용
        */}
        <p>새 게시물 작성 폼</p>
        <p>{props}</p>
    </div>
);
// { 시작하고 return 전에 js 사용 가능 가장 많이 사용하는 형태
// {}
const 중괄호 = () => {
    // js 기능 작성 가능 하다
    return(
        <div className="page-container">
            <h1>글쓰기</h1>
            <p>새 게시물 작성 폼</p>
        </div>
    )

};
export default Write;