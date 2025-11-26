// 마이페이지
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";
import AuthContext, {useAuth} from "../context/AuthContext";
import {renderLoading} from "../service/scripts";
/*
default export = AuthContext
        export = {useAuth}
 */
import {boardSave, goToPage, formatDate} from "../service/scripts";


/*
로그인 상태만 접근 허용
유저 정보 가져오기
수정하기 버튼 클릭 생성

 */

const MyPage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, loading } = useAuth();

    /*
    if (!isAuthenticated) {
        return (
            <div style={{textAlign: 'center', padding: '100px', color: 'red'}}>
                <h2>로그인이 필요합니다!</h2>
                <button onClick={() => navigate('/login')}>로그인 하러 가기</button>
            </div>
        );
    };
    =================================================================================
     */
    useEffect(() => {
        if (!isAuthenticated && !loading) navigate("/login");
    }, [loading, isAuthenticated, navigate]);

    const handleClick = () => {
        navigate("/mypage/edit");
    }

    if(loading) return renderLoading("로딩중");

    if(!user) return null;

    return (
        <div className="page-container">
            <h1>마이페이지</h1>
            <div className="mypage-container">
                <div className="mypage-section">
                    <h2>회원 정보</h2>

                    <div className="info-group">
                        <div className="info-item">
                            <span className="info-label">이메일</span>
                            <span className="info-value">{user.memberEmail || '-'}</span>
                        </div>

                        <div className="info-item">
                            <span className="info-label">이름</span>
                            <span className="info-value">{user.memberName || '-'}</span>
                        </div>

                        <div className="info-item">
                            <span className="info-label">전화번호</span>
                            <span className="info-value">{user.memberPhone || '-'}</span>
                        </div>

                        <div className="info-item">
                            <span className="info-label">주소</span>
                            <span className="info-value">
                                {user.memberAddress ? (
                                    <>
                                        ({user.memberPostcode || '-'}) {user.memberAddress}
                                        {user.memberDetailAddress && ` ${user.memberDetailAddress}`}
                                    </>
                                ) : '-'}
                            </span>
                        </div>

                        <div className="info-item">
                            <span className="info-label">가입일</span>
                            <span className="info-value">
                                {user.memberCreatedAt
                                    ?
                                    new Date(user.memberCreatedAt).toLocaleDateString('ko-KR')
                                    :
                                    '-'}
                            </span>
                        </div>
                    </div>

                    <div className="mypage-actions">
                        <button
                            className="button btn-edit"
                            onClick={handleClick}
                        >
                            회원정보 수정
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPage;