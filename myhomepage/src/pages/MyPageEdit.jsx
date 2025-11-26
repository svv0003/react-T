import {useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AuthContext, {useAuth} from "../context/AuthContext";
import {handleInputChange, openAddressPopup, validatePassword, validatePhone} from "../service/scripts";
import {fetchMyPageEdit} from "../service/ApiService";


/*
과제 1: 새로 작성한 비밀번호와 비밀번호 확인이 일치하는지 여부 기능 완성
과제 2: 핸드폰번호 css 다른 input 창과 동일하게 스타일 작성
과제 3: 참고해서 주소검색 창 띄우기

function daumPostCode(){
    new daum.Postcode({
        oncomplete: function (data) {
            var addr = '';

            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if( data.userSelectedType === 'R') { //사용자가 도로명 주소를 사용할 경우 Road
                addr = data.roadAddress;
            } else { // === 'J' Jibun 을 선택했을 경우 지번주소를 가져온다.
                addr = data.jibunAddress;
            }

            document.getElementById('postcode').value = data.zonecode;
            document.getElementById('address').value = addr;
            document.getElementById("detailAddress").focus();
        }
    }).open();
}
document.querySelector("#searchAddress").addEventListener("click",daumPostCode);
            <label for="memberAddress">주소</label>
            <div class="signUp-input-area">
                <input type="text" name="memberAddress" placeholder="우편번호" maxlength="6" id="postcode">
                <button type="button" id="searchAddress">검색</button>
            </div>
            <div class="signUp-input-area">
                <input type="text" name="memberAddress" placeholder="도로명/지번 주소" id="address">
            </div>
            <div class="signUp-input-area">
                <input type="text" name="memberAddress" placeholder="상세 주소" id="detailAddress">
            </div>
*/


const MyPageEdit = () => {
    const navigate = useNavigate();
    const {user, isAuthenticated} = useAuth();
    const [formData, setFormData] = useState({
        memberName: '',
        memberEmail: '',
        memberPhone: '',
        memberPassword: '',
        memberPostCode:'',
        memberAddress: '',
        memberDetailAddress: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [validation, setValidation] = useState({
        memberPhone: true,
        newPassword: true,
        confirmPassword: true,
    })
    const [messages, setMessages] = useState({
        memberPhone: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) navigate("/login");
    }, [isAuthenticated, navigate]);
    /*
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    업로드, 업데이트와 같은 모든 사이트에서 활용하는 공통 기능
    scripts.js 에서 상태관리하여 재사용한다.
    setter로 값을 추가하면서 추가된 값이 일치하는가 확인한다.
    formData에 내장된 새 비밀번호와 비밀번호 확인이 일치하는지 체크한다.
     */
    const handleCheckChange = (e) => {
        const {name, value} = e.target;
        handleInputChange(e, setFormData)
        /*
        if(name === "newPassword"){
            const isMatch = value === formData.confirmPassword;
            setValidation(prev => ({
                ...prev,
                confirmPassword: isMatch
            }));
            setMessages((prev => ({
                ...prev,
                confirmPassword: formData.confirmPassword
                ? (isMatch ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다.")
                : ""
            })))
        }
        if(name === "confirmPassword"){
            const isMatch = value === formData.newPassword;
            setValidation(prev => ({
                ...prev,
                confirmPassword: isMatch
            }));
            setMessages((prev => ({
                ...prev,
                confirmPassword: formData.confirmPassword
                ? (isMatch ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다.")
                : ""
            })))
        }
         */
    }

    useEffect(() => {
        const isMatch = formData.newPassword === formData.confirmPassword;
        const isInput = formData.confirmPassword.length > 0;

        setValidation(prev => ({ ...prev, confirmPassword: isInput ? isMatch : true }));
        setMessages(prev => ({
            ...prev,
            confirmPassword: isInput
                ? (isMatch ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다.")
                : ""
        }));
    }, [formData.newPassword, formData.confirmPassword]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // 비밀번호 수정하는 경우
        if(formData.newPassword || formData.confirmPassword) {
            if (!formData.memberPassword) {
                alert("현재 비밀번호를 입력해주세요.");
                return;
            }
            if(!validatePassword(formData.newPassword)) {
                alert("비밀번호 형식이 올바르지 않습니다.");
                return;
            }
            if (formData.newPassword !== formData.confirmPassword) {
                alert("새 비밀번호가 일치하지 않습니다.");
                return;
            }
            console.log("비밀번호 체크 완료")
        }
        // setIsSubmitting(true);
        /*
        마이페이지에서 수정하기 버튼을 클릭했을 때처럼 어떻게 작동하는지 확인하기 위해
        백엔드 없이 QA 진행한 것이고, 삭제 예정이다.
         */
        // setTimeout(() => {
        //     setIsSubmitting(false);
        //     alert("회원정보가 수정되었습니다.");
        //     navigate("/mypage");
        // }, 1000);
        fetchMyPageEdit(axios, formData, navigate, setIsSubmitting);
    }
    /*
    게시물 작성, 수정, 상품 업로드, 수정, 회원정보 수정 동시에 사용할 것이다.
    인자값은 message, navigate, path
     */
    const handleCancel = () => {
        if(window.confirm("수정 취소할거임?")) {
            navigate("/mypage")
        }
    }


    return (
        <div className="page-container">
            <h1>회원정보 수정</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <span className="required">*</span>이름
                    <input type="text"
                           name="memberName"
                           value={user?.memberName}
                           placeholder={user?.memberName}
                           readOnly
                           disabled
                    />
                    <span className="form-hint">이름은 변경할 수 없습니다.</span>
                </label>
                <label>
                    <span className="required">*</span>이메일
                    <input type="text"
                           name="memberEmail"
                           value={user?.memberEmail}
                           placeholder={user?.memberEmail}
                           readOnly
                           disabled
                    />
                    <span className="form-hint">이메일은 변경할 수 없습니다.</span>
                </label>
                {/*
                type=number
                int byte short long과 같은 숫자 자료형은
                맨 앞의 0을 생략하고, - 입력 안 되기 때문에
                주민등록번호 00년생~09년생의 경우 앞자리 0 생략된다.
                */}
                <label>
                    <span className="required">*</span>연락처
                    <input type="text"
                           name="memberPhone"
                           value={formData.memberPhone}
                           placeholder={user?.memberPhone}
                           onChange={handleCheckChange}
                    />
                </label>
                <label>
                    <span className="required">*</span>현재 비밀번호
                    <input type="password"
                           name="memberPassword"
                           value={formData.memberPassword}
                           placeholder="영문, 숫자 포함 8자 이상"
                           onChange={handleCheckChange}
                    />
                </label>
                <label>
                    <span className="required">*</span>새 비밀번호
                    <input type="password"
                           name="newPassword"
                           value={formData.newPassword}
                           placeholder="영문, 숫자 포함 8자 이상"
                           onChange={handleCheckChange}
                    />
                </label>
                <label>
                    <span className="required">*</span>새 비밀번호 확인
                    <input type="password"
                           name="confirmPassword"
                           value={formData.confirmPassword}
                           placeholder="영문, 숫자 포함 8자 이상"
                           onChange={handleCheckChange}
                    />
                    <span className={`signUp-message ${formData.confirmPassword ? 'confirm' : 'error'}`}>
                        {messages.confirmPassword}
                    </span>
                </label>
                <label>
                    주소 :
                    <div className="signUp-input-area">
                        <input type="text"
                               id="memberPostCode"
                               name="memberPostCode"
                               value={formData.memberAddress}
                               placeholder="주소 검색을 클릭하세요"
                               onClick={() => openAddressPopup(setFormData)}
                               readOnly
                        />
                        <button
                            type="button"
                            onClick={() => openAddressPopup(setFormData)}>
                            주소검색
                        </button>
                    </div>
                    <div className="signUp-input-area">
                        <input type="text"
                               id="memberAddress"
                               name="memberAddress"
                               value={formData.memberAddress}
                               placeholder="도로명/지번 주소"
                               onClick={() => openAddressPopup(setFormData)}
                               readOnly/>
                    </div>
                    <div className="signUp-input-area">
                        <input type="text"
                               id="memberDetailAddress"
                               name="memberDetailAddress"
                               value={formData.memberDetailAddress}
                               placeholder="상세 주소를 입력하세요."
                               onChange={handleCheckChange}
                               required/>
                    </div>
                </label>
                <div className="form-buttons">
                    <button className="btn-submit" disabled={isSubmitting}>
                        {isSubmitting ? '수정 중...' : '수정 완료'}
                    </button>
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={handleCancel}
                        disabled={isSubmitting}>
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MyPageEdit;