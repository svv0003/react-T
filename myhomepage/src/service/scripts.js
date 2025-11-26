/*======================================================================================================================
컴포넌트에서 공통으로 사용하는 기능을 작성한다.

- 여러 UI 태그에서 반복적으로 사용하는 기능인가?
======================================================================================================================*/
/*****************************************
                로딩 관련 함수
 *****************************************/
/**
 * 로딩 상태 ui 컴포넌트 함수
 * @param message           초기값 = 로딩중
 * @returns {JSX.Element}   인자값으로 전달받은 message가 존재한다면 인자값을 활용한 ui를 반환한다.
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
 * 로딩 후 데이터가 존재하지 않을 경우 보여주는 ui 컴포넌트 함수
 * @param message           초기값 = 로딩중
 * @returns {JSX.Element}   인자값으로 전달받은 message가 존재한다면 인자값을 활용한 ui를 반환한다.
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

/*****************************************
          네비게이트 관련 함수
 *****************************************/
/*
export const navigateToBoard = (navigate, boardId) => {
    navigate(`/board/${boardId}`);
}
export const navigateToProduct = (navigate, productId) => {
    navigate(`/product/${productId}`);
}
 */
/**
 * 위 두 함수를 대체 가능한 페이지 이동 함수
 * @param navigate  인자값으로 들어오는 기능 활용한다.
 * @param path      인자값으로 들어오는 경로 활용하여 페이지 이동 처리한다.
 * @ 만일 path 자리에 -1을 작성하면 뒤로가기 버튼으로 사용 가능하여 아래 함수 대체 가능하다.
 */
export const goToPage = (navigate, path) => {
    navigate(path);
}
/*
export const goBack = (navigate, confirmMessage = null) => {
    if (confirmMessage) {
        if (window.confirm(confirmMessage)) navigate(-1);
    } else navigate(-1);
}
 */
/*
export const pageClickHandler = (navigate, basePath) => {
    return (id) => {
        navigate(`${basePath}/${id}`);
    }
}
 */



/*****************************************
               포맷 관련 함수
*****************************************/
/**
 * 날짜 포멧팅 함수
 * @param dateString    백엔드로 가져오거나 작성해놓은 특정 날짜 데이터를 매개변수(인자값)으로 가져온다.
 * @returns {string}    맥엔드로 가져오거나 작성해놓은 특정 날짜가 null 값으로 존재하지 않은 경우
 * @'-' 형태로 존재하지 않는 날짜입니다. 대신 표기한다.
 * @ 특정 날짜 데이터를 dateString 으로 가져와 사용할 수 있다면 날짜를 한국기준으로 포멧팅하여 반환한다.
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
 * 가격 포멧팅 함수
 * @param dateString    백엔드로 가져오거나 작성해놓은 특정 가격 데이터를 매개변수(인자값)으로 가져온다.
 * @returns {string}    맥엔드로 가져오거나 작성해놓은 특정 가격이 null 값으로 존재하지 않은 경우
 * @ '-' 형태로 존재하지 않는 가격입니다. 대신 표기한다.
 * @ 특정 가격 데이터를 price로 가져와 사용할 수 있다면 가격을 한국 기준으로 포멧팅하여 반환한다.
 * @ 만일 한국이 아닌 전세계를 기준으로 사용한다면 추후 locales는 국가 지정이 아닌 IP 사용하여 조회된 지역으로 설정할 것이다.
 * @return new Intl.NumberFormat("특정나라 IP 조회 후 해당 국가 기준으로 설정").format(price);
 * ex) 넷플릭스, 유튜브, 구글 결제 등 다양한 회사에서 사용한다.
 */
export const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price)+"원";
}


/*****************************************
            입력 관련 함수
 *****************************************/
/**
 * input 태그 상태관리 함수
 * @param e         특정 input에 이벤트(=행동)이 감지되면 동작한다.
 * @param setData   백엔드로 전달할 formData는 setter를 이용하여 데이터 변환을 추가 적용한다.
 * @logic { name, value }               e.target 행동이 감지된 input 타겟의 name과 value 데이터를 가져와서 name=Key, value=데이터 가져온다.
 * @logic p => ({ ...p, [name]:value }  기존에 존재하던 formData를 p 변수명 내부에 그대로 복제하여 담아둔 후 변화가 감지된 Key의 데이터를 p 변수에 추가하고, Key명칭이 존재한다면 데이터 수정, Key 명칭이 존재하지 않는다면 K:V 추가한다.
 *                                      변화된 p 전체 데이터는 setter 이용해서 formData에 저장한다.
 * @id          js 상태관리할 때 주로 사용한다.
 * @name        백엔드로 데이터 주고 받을 때 사용한다.
 * @className   스타일 설정할 때 사용한다.
 */
export const handleInputChange = (e, setData) => {
    // id 키 명칭에 해당하는 데이터를 가져오길 원한다면 name 대신 id 활용한다.
    const {name, value} = e.target;
    setData(p => ({
        ...p, [name]: value,
    }));
}


/*****************************************
            유효성 관련 함수
 *****************************************/
const regexPw= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const regexPhone = /^01[0-9]{8,9}$/;
export const validatePassword = (password) => {
    // 비밀번호 존재하지 않다면 유효성 검사 취소한다.
    if(!password) return true;
    return regexPw.test(password);
}
export const validatePhone = (phone) => {
    // 연락처가 존재하지 않다면 유효성 검사 취소한다.
    if(!phone) return true;
    return regexPhone.test(phone);
}

/*==========================================================
            다음 주소창 생성
==========================================================*/
export const openAddressPopup = (setFormData) => {
    new window.daum.Postcode({
        oncomplete: function (data) {
            var addr = '';

            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if( data.userSelectedType === 'R') { //사용자가 도로명 주소를 사용할 경우 Road
                addr = data.roadAddress;
            } else { // === 'J' Jibun 을 선택했을 경우 지번주소를 가져온다.
                addr = data.jibunAddress;
            }

            setFormData(p => ({
                ...p,
                memberPostCode : data.zonecode,
                memberAddress : addr
            }))

            /*
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById('address').value = addr;
            위 코드를 React에서는 아래처럼 작성한다.
            memberPostCode : data.zonecode,
            memberAddress : addr
             */
            document.getElementById("detailAddress")?.focus();
        }
    }).open();
}















