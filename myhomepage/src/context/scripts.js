/*======================================================================================================================
컴포넌트에서 공통으로 사용하는 기능을 작성한다.

- 여러 UI 태그에서 반복적으로 사용하는 기능인가?
======================================================================================================================*/
//========== 로딩 관련 함수 ==========
/**
 *
 * @param message
 * @returns {JSX.Element}
 */
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
/**
 * 로딩 후 데이터가 존재하지 않을 경우
 * @param message
 * @returns {JSX.Element}
 */
export const renderNoData = (message = '데이터가 없습니다.') => {
    return (
        <div className="no-data">
            <p>{message}</p>
        </div>
    )
}
/**
 * 로딩 상태 관리 래퍼 함수
 * abc 해당하는 데이터 가져오기 기능을 수행하고,
 * 데이터가 무사히 들어오면 로딩을 멈춘다.
 * @param abc
 * @param setLoading
 * @returns {Promise<void>}
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
/**
 * 위 두 개 대체 가능하다.
 * @param navigate
 * @param path
 */
export const goToPage = (navigate, path) => {
    navigate(path);
}
/**
 * 뒤로 가기 기능
 * @param navigate
 * @param confirmMessage
 */
export const goBack = (navigate, confirmMessage = null) => {
    if (confirmMessage) {
        if (window.confirm(confirmMessage)) navigate(-1);
    } else navigate(-1);
}
/*
export const pageClickHandler = (navigate, basePath) => {
    return (id) => {
        navigate(`${basePath}/${id}`);
    }
}
 */


//========== API fetch 관련 함수 ==========
/*
const API_URL           : scripts.js 내부에서만 사용 가능한 상태
export const API_URLS   : 내부, 외부에서도 사용 가능한 상태
 */
/**
 *
 * @type {string}
 */
const API_URL = 'http://localhost:8085'
export  const API_URLS = {
    AUTH :`${API_URL}/api/auth`,
    BOARD :`${API_URL}/api/board`,
    PRODUCT :`${API_URL}/api/product`,
    EMAIL :`${API_URL}/api/email`
}
/**
 *
 * @param axios
 * @param setProducts
 * @param setLoading
 * @returns {Promise<void>}
 */
export  const fetchAllProducts= async (axios, setProducts, setLoading= null) => {
    try{
        const res = await axios.get(`${API_URLS.PRODUCT}/all`);
        setProducts(res.data || []);
    } catch (error) {
        alert("데이터를 가져올 수  없습니다.");
    } finally {
        if(setLoading) setLoading(false);
        // if(setLoading==="Y") setLoading("N");
    }
}
/**
 *
 * @param axios
 * @param id
 * @param setProduct
 * @param navigate
 * @param setLoading
 * @returns {Promise<void>}
 */
export  const fetchProductDetail= async (axios, id, setProduct, navigate, setLoading= null) => {
    try{
        const res = await axios.get(`${API_URLS.PRODUCT}/${id}`);
        setProduct(res.data || []);
    } catch (error) {
        alert("상품 정보를 불러올 수 없습니다.");
        navigate("/products"); // App.js 에서 Route 내부에 작성한 프론트엔드 게시물 전체보는 경로 설정
    } finally {
        if(setLoading) setLoading(false);
    }
}
/**
 *
 * @param axios
 * @param setBoards
 * @param setLoading
 * @returns {Promise<void>}
 */
export  const fetchAllBoards = async (axios, setBoards, setLoading= null) => {
    try{
        const res = await axios.get(`${API_URLS.BOARD}/all`);
        setBoards(res.data || []);
    } catch (error) {
        alert("데이터를 가져올 수  없습니다.");
    } finally {
        if(setLoading) setLoading(false);
    }
}
/**
 *
 * @param axios
 * @param setBoards
 * @param setLoading
 * @returns {Promise<void>}
 */
export  const fetchAllPopularBoards = async (axios, setBoards, setLoading= null) => {
    try{
        const res = await axios.get(`${API_URLS.BOARD}/popular`);
        setBoards(res.data || []);
    } catch (error) {
        alert("데이터를 가져올 수  없습니다.");
    } finally {
        if(setLoading) setLoading(false);
    }
}
/**
 *
 * @param axios
 * @param id
 * @param setBoard
 * @param navigate
 * @param setLoading
 * @returns {Promise<void>}
 */
export  const fetchBoardDetail= async (axios, id, setBoard, navigate, setLoading= null) => {
    try{
        const res = await axios.get(`${API_URLS.BOARD}/${id}`);
        setBoard(res.data || []);
    } catch (error) {
        alert("게시물 정보를 불러올 수 없습니다.");
        navigate("/board"); // App.js 에서 Route 내부에 작성한 프론트엔드 게시물 전체보는 경로 설정
    } finally {
        if(setLoading) setLoading(false);
    }
}
/**
 *
 * @param axios
 * @param id
 * @param navigate
 * @returns {Promise<void>}
 */
export const deleteProduct = async (axios, id, navigate) => {
    try {
        const res = await axios.delete(`${API_URLS.PRODUCT}/${id}`);
        alert("상품이 삭제되었습니다.");
        navigate("/products");
    } catch (e) {
        alert("상품 삭제 에러");
    }
}


//========== 포맷 관련 함수 ==========
/**
 *
 * @param dateString
 * @returns {string}
 */
export const formatDate = (dateString) => {
    if(!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
        year: 'numeric',
        month: 'long',
        date: 'numeric'
    });
}
/**
 *
 * @param price
 * @returns {string}
 */
export const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price)+"원";
}

//========== 게시글 관련 함수 ==========
/**
 *
 * @param axios
 * @param formData
 * @param navigate
 * @returns {Promise<*>}
 */
export const boardSave = async (axios, formData, navigate) => {
    try {
        const res = await axios.post(`${API_URLS.BOARD}`, formData);
        alert("글이 작성되었습니다.");
        navigate('/board');
        return res
    } catch (err) {
        console.error("글쓰기 실패:", err);
        alert("글 작성에 실패했습니다.");
        throw err;
    }
}