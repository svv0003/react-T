/*****************************************
 백엔드 API fetch 관련 함수
 *****************************************/
/*
const API_URL           : scripts.js 내부에서만 사용 가능한 상태
export const API_URLS   : 내부, 외부에서도 사용 가능한 상태
 */
const API_URL = 'http://localhost:8085'
const API_URLS = {
    AUTH :`${API_URL}/api/auth`,
    BOARD :`${API_URL}/api/board`,
    PRODUCT :`${API_URL}/api/product`,
    EMAIL :`${API_URL}/api/email`
}
/**
 * GET -> 전체 제품 데이터를 가져오는 함수
 * @param axios             fetch 향상된 기능으로 백엔드 연결 시 사용한다.
 * @param setProducts       매개변수에서는 데이터가 존재하지 않은 비어있는 변수명으로, res.data 백엔드 데이터를 ui 컴포넌트로 가져가서 활용한다.
 * @param setLoading        백엔드 데이터를 가져오기 전까지 로딩중 표기한다.
 * @returns {Promise<void>} 백엔드 데이터를 제대로 가져왔는지에 대한 유무를 통하여 결과를 반환한다.
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
 * GET -> 상세 제품 데이터를 가져오는 함수
 * @param axios             fetch 향상된 기능으로 백엔드 연결 시 사용한다.
 * @param id                URL 주소에 표기된 id = 제품번호를 이용해서 특정 제품번호의 전체 데이터를 가져올 수 있도록 활용한다.
 * @param setProduct        매개변수에서는 데이터가 존재하지 않은 비어있는 변수명으로, res.data 백엔드 데이터를 ui 컴포넌트로 가져가서 활용한다.
 * @param navigate          특정 제품번호의 제품이 존재하지 않을 경우 제품목록 페이지로 이동시킨다.
 * @param setLoading        백엔드 데이터를 가져오기 전까지 로딩중 표기한다.
 * @returns {Promise<void>} 백엔드 데이터를 제대로 가져왔는지에 대한 유무를 통하여 결과를 반환한다.
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
 * GET -> 전체 게시물 데이터를 가져오는 함수
 * @param axios             fetch 향상된 기능으로 백엔드 연결 시 사용한다.
 * @param setBoards         매개변수에서는 데이터가 존재하지 않은 비어있는 변수명으로, res.data 백엔드 데이터를 ui 컴포넌트로 가져가서 활용한다.
 * @param setLoading        백엔드 데이터를 가져오기 전까지 로딩중 표기한다.
 * @returns {Promise<void>} 백엔드 데이터를 제대로 가져왔는지에 대한 유무를 통하여 결과를 반환한다.
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
 * GET -> 전체 인기 게시물 데이터를 가져오는 함수
 * @param axios             fetch 향상된 기능으로 백엔드 연결 시 사용한다.
 * @param setBoards         매개변수에서는 데이터가 존재하지 않은 비어있는 변수명으로, res.data 백엔드 데이터를 ui 컴포넌트로 가져가서 활용한다.
 * @param setLoading        백엔드 데이터를 가져오기 전까지 로딩중 표기한다.
 * @returns {Promise<void>} 백엔드 데이터를 제대로 가져왔는지에 대한 유무를 통하여 결과를 반환한다.
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
 * GET -> 상세 게시물 데이터를 가져오는 함수
 * @param axios             fetch 향상된 기능으로 백엔드 연결 시 사용한다.
 * @param id                URL 주소에 표기된 id = 게시물번호 이용해서 특정 게시물의 전체 데이터를 가져올 수 있도록 활용한다.
 * @param setBoard          매개변수에서는 데이터가 존재하지 않은 비어있는 변수명으로, res.data 백엔드 데이터를 ui 컴포넌트로 가져가서 활용한다.
 * @param navigate          특정 게시물 번호의 게시물이 존재하지 않을 경우 게시물 목록 페이지로 이동시킨다.
 * @param setLoading        백엔드 데이터를 가져오기 전까지 로딩중 표기한다.
 * @returns {Promise<void>} 백엔드 데이터를 제대로 가져왔는지에 대한 유무를 통하여 결과를 반환한다.
 */
export  const fetchBoardDetail= async (axios, id, setBoard, navigate, setLoading= null) => {
    try{
        const res = await axios.get(`${API_URLS.BOARD}/all`);
        setBoard(res.data || []);
    } catch (error) {
        alert("게시물 정보를 불러올 수 없습니다.");
        navigate("/board"); // App.js 에서 Route 내부에 작성한 프론트엔드 게시물 전체보는 경로 설정
    } finally {
        if(setLoading) setLoading(false);
    }
}

/**
 * DELETE -> 일부 제품을 삭제하는 함수
 * @param axios             fetch 향상된 기능으로 백엔드 연결 시 사용한다.
 * @param id                URL 주소에 표기된 id = 제품번호를 이용해서 특정 제품번호의 전체 데이터를 가져올 수 있도록 활용한다.
 * @param navigate          특정 제품번호의 제품이 삭제되어 존재하지 않을 경우 제품목록 페이지로 이동시킨다.
 * @returns {Promise<void>} 백엔드 데이터를 제대로 가져왔는지에 대한 유무를 통하여 결과를 반환한다.
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


/*****************************************
            게시글 관련 함수
 *****************************************/
/**
 * POST -> 게시물 데이터 저장하는 함수
 * @param axios             fetch 향상된 기능으로 백엔드 연결 시 사용한다.
 * @param formData          게시물에 관련된 변수들을 formData 명칭으로 한 번에 모아서 백엔드로 전달한다.
 * @param navigate          게시글이 성공적으로 DB에 저장되면, 게시물을 확인할 수 있도록 게시물 목록페이지로 이동한다.
 * @returns {Promise<*>}    백엔드 결과 유무에 따른 결과를 반환한다.
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


/*****************************************
 유저 백엔드 관련 함수
 *****************************************/
const API_AUTH_URL = "http://localhost:8085/api/auth";
/**
 * 회원가입 백엔드 함수
 * @param axios
 * @param formData
 * @returns {Promise<void>}
 */

export const fetchSignup = async (axios, formData) => {
    // 필수 항목 체크
    if (!formData.memberName) {
        alert('이름을 입력해주세요.')
        return; // 돌려보내기 하위기능 작동x
    }
    // DB에 저장할 데이터만 전송
    // body 형태로 전달하기
    // requestBody requestParam
    //    body         header
    const signupData = {
        memberName:formData.memberName,
        memberEmail:formData.memberEmail,
        memberPassword:formData.memberPw,
        memberAddress: formData.memberAddress + formData.memberDetailAddress,
        memberPhone: formData.memberPhone,
    }
    try {
        const res = await axios.post(API_URLS.AUTH + "/signup", signupData);
        if (res.data === "success" || res.status === 200) {
            console.log("res.data   : ", res.data);
            console.log("res.status : ", res.status);
            alert('회원가입이 완료되었습니다.');
            window.location.href = "/";
        } else if (res.data === "duplicate")
            alert("이미 가입된 이메일 입니다.");
        else
            alert("회원가입에 실패하였습니다.");
    } catch (err) {
        alert("회원가입 중 문제가 발생했습니다.");
        console.error(err);
    }
}

/*
로그인
로그인 상태 확인
*/
/**
 * 마이페이지 조회
 */
export const fetchMyPage = () => {

}
/**
 * 마이페이지 수정
 */
export const fetchMyPageEdit = (axios, formData, navigate, setIsSubmitting) => {
    // 수정내용 키:데이터를 모두 담아갈 변수이름
    const updateData = {
        memberName: formData.memberName,
        memberEmail: formData.memberEmail,
        memberPhone: formData.memberPhone,
        memberAddress: formData.memberAddress + formData.memberDetailAddress,
        newPassword: formData.newPassword || null,
        memberPassword: formData.memberPassword || null,
    }
    try {
        const res = axios.put(API_URLS.AUTH + "/update", updateData);
        if (res.data === "success" || res.status === 200) {
            alert("회원정보가 수정되었습니다.")
        } else if(res.data ==="wrongPassword"){
            alert("현재 비밀번호가 일치하지 않습니다.")
        } else {
            alert("회원정보 수정에 실패했습니다.")
        }
    } catch (err) {
        alert("회원정보 수정 중 문제가 발생했습니다.")
    } finally {
        setIsSubmitting(false);
    }
}
