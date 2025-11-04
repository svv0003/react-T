import {useParams} from "react-router-dom";

const UserProfile = () => {
    const {userId} = useParams();
    return (
        <div>
            <h1>사용자 프로필</h1>
            <p>사용자 ID : {userId}</p>

        </div>
    );
};

export default UserProfile;