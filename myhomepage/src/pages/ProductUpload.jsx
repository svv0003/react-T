import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import axios from "axios";
import {handleImageChange, handleInputChange, handleProfileChange, handleProfileClick} from "../service/scripts";


const ProductUpload = () => {
    const fileInputRef = useRef(null);
    const [productImage, setImage] = useState('/static/img/default.png');
    const [productFile, setFile] = useState(null);
    const [isUploading, setUploading] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        productName :'',
        productCode :'',
        category :'',
        price :'',
        stockQuantity :'',
        description :'',
        manufacturer :'',
        imageUrl :'',
    });
    const [errors, setErrors] = useState({});
    const categories = [
        '전자제품','가전제품','의류','식품','도서','악세사리','스포츠','완구','가구','기타'
    ]
    /*
    기존 변수명은 모두 setFormData 사용했지만
    이 컴포넌트에서는 setProduct 변수명 사용한다.
     */
    const handleChange = (e) => {
        const {name, value} = e.target;
        handleInputChange(e, setProduct)
        // 입력 시 해당 필드의 에러 메세지 제거
        if(errors[name]) {
            setErrors(p => ({
                ...p, [name]:''
            }));
        }
    };
    // 폼 유효성 검사
    const validateForm = () => {
        const newErrors = {};
        if(!product.productName.trim()){
            newErrors.productName='상품명을 입력하세요.';
        }
    }
    // 폼 제출
    const handleSubmit = async (e) => {
        e.preventDefault();
        /*
            if(!validateForm()){
                return;
            }
         */
        setLoading(true);
        // 백엔드 연결 시도
        try{
            const r = await  axios.post(
                'http://localhost:8085/api/product',product
            );
            if(r.data.success){
                alert(r.data.message);
                navigate("/")
            }
        } catch (err) { // 백엔드 연결 실패
            console.error(err);

            if(err.r?.data?.message){
                alert(err.r.data.message);
            } else{
                alert("상품 등록에 실패했습니다. 다시 시도해주세요.");
            }
        }finally{
            setLoading(false); // 상품 등록을 성공, 실패 이후 loading 중단
        }
    }
    // 폼 내용 취소
    const handleCancel = () => {
        if(window.confirm("작성 중인 내용이 사라집니다. 작성을 취소하시겠습니까?")) {
            navigate("/");
        }
    }
    // const handleProfileClick = () => {
    //     fileInputRef.current?.click();   // 숨겨진 input 클릭 트리거
    // };
    const uploadImage = async (file) => {
        setUploading(true);
        try {
            const uploadFormData = new FormData();
            uploadFormData.append("file", file);
            uploadFormData.append("productName", product.productName);
            const res = await axios.post('/api/auth/product-image', uploadFormData, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            });
            if(res.data.success === true) {
                alert("제품 이미지가 업데이트 되었습니다.");
                setImage(res.data.imageUrl);
                product.imageUrl = res.data.imageUrl;
            } 
        }catch (error) {
            alert(error);
            // 실패 시 원래 이미지로 복구
            setImage('/static/img/default.png');
        } finally {
            setUploading(false);
        }
    }

    return(
        <div className="page-container">
            <div className="product-upload-container">
                <h2>상품 등록</h2>
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label htmlFor="productName">
                            상품명<span className="required">*</span>
                        </label>
                        <input
                            type={"text"}
                            id="productName"
                            name="productName"
                            value={product.productName}
                            onChange={handleChange}
                            placeholder="상품명을 입력하세요."
                            maxLength="200"
                        />
                        {errors.productName &&(
                            <span className="error">{errors.productName}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="productCode">
                            상품코드<span className="required">*</span>
                        </label>
                        <input
                            type={"text"}
                            id="productCode"
                            name="productCode"
                            value={product.productCode}
                            onChange={handleChange}
                            placeholder="상품코드를 입력하세요."
                            maxLength="200"
                        />
                        {errors.productCode &&(
                            <span className="error">{errors.productCode}</span>
                        )}
                        <small className="form-hint">
                            영문, 대문자, 숫자, 하이픈(-) 만 사용 가능
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">
                            카테고리<span className="required">*</span>
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={product.category}
                            onChange={handleChange}>
                            <option value="">카테고리를 선택하세요.</option>
                            {categories.map(category => (
                                <option key={category}
                                        value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {errors.category &&(
                            <span className="error">{errors.category}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">
                            가격<span className="required">*</span>
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="가격 (원)"
                            min="0"
                        />
                        {errors.price &&(
                            <span className="error">{errors.price}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="stockQuantity">
                            재고수량<span className="required">*</span>
                        </label>
                        <input
                            type="number"
                            id="stockQuantity"
                            name="stockQuantity"
                            value={product.stockQuantity}
                            onChange={handleChange}
                            placeholder="재고 수량"
                            min="0"
                        />
                        {errors.stockQuantity &&(
                            <span className="error">{errors.stockQuantity}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="manufacturer">
                            제조사
                        </label>
                        <input
                            type="text"
                            id="manufacturer"
                            name="manufacturer"
                            value={product.manufacturer}
                            onChange={handleChange}
                            placeholder="제조사 명을 입력하세요."
                            maxLength="100"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">
                            제품 이미지
                        </label>
                        <div className="profile-image-container" onClick={() => handleProfileClick(fileInputRef)}>
                            <img src={productImage}
                                 className="profile-image"
                                 alt="product image"/>
                            <div className="profile-image-overlay">
                                {isUploading ? "업로드 중..." : '이미지 변경'}
                            </div>
                            <input type="file" ref={fileInputRef}
                                   onChange={(e) => handleImageChange(e, setImage, uploadImage)}
                                   accept="image/*"
                                   style={{ display: 'none' }}
                                   multiple
                            />
                            <span className="form-hint">이미지를 클릭하여 변경할 수 있습니다.(최대 5MB)</span>
                        </div>
                        {/*<input*/}
                        {/*    type="url"*/}
                        {/*    id="imageUrl"*/}
                        {/*    name="imageUrl"*/}
                        {/*    value={product.imageUrl}*/}
                        {/*    onChange={handleChange}*/}
                        {/*    maxLength="500"*/}
                        {/*/>*/}
                        {/*<small className="form-hint">*/}
                        {/*    상품 이미지의 URL 을 입력하세요.*/}
                        {/*</small>*/}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">
                            상품설명
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="상품에 대한 설명을 입력하세요"
                            rows="5"
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit"
                                className="btn-submit"
                                disabled={loading}>
                            {loading ? '등록 중...' : '등록' }
                        </button>
                        <button type="button"
                                className="btn-cancel"
                                onClick={handleCancel}
                                disabled={loading}>
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export  default ProductUpload;