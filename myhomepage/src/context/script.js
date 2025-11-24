/*======================================================================================================================
컴포넌트에서 공통으로 사용하는 기능을 작성한다.

- 여러 UI 태그에서 반복적으로 사용하는 기능인가?
======================================================================================================================*/
//========== 로딩 관련 함수 ==========
import * as path from "node:path";

export const renderLoading = (message = '로딩중') => {

    return (
        <div className="page-container">
            <div className="loading-container">
                <div className="loading-spinner">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}
/*
로딩 후 데이터가 존재하지 않을 경우
 */
export const renderNoData = (message = '데이터가 없습니다.') => {
    return (
        <div className="np-data">
            <p>{message}</p>
        </div>
    )
}

/*
로딩 상태 관리 래퍼 함수
abc 해당하는 데이터 가져오기 기능을 수행하고,
데이터가 무사히 들어오면 로딩을 멈춘다.
 */
export const withLoading = async (abc, setLoading) => {
    if (setLoading) setLoading(true);
    try {
        await abc();
    } finally {
        if (setLoading) setLoading(false);
    }
}


//========== 네비게이트 관련 함수 ==========
/*
export const navigateToBoard = (navigate, boardId) => {
    navigate(`/board/${boardId}`);
}
export const navigateToProduct = (navigate, productId) => {
    navigate(`/product/${productId}`);
}
 */
// 위 두 개 대체 가능하다.
export const goToPage = (navigate, path) => {
    navigate(path);
}
export const goBack = (navigate, confirmMessage = null) => {
    if (confirmMessage) {
        if (window.confirm(confirmMessage)) navigate(-1);
    } else navigate(-1);
}
export const pageClickHandler = (navigate, basePath) => {
    return (id) => {
        navigate(`${basePath}/${id}`);
    }
}

