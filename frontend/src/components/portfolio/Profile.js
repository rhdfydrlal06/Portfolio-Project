import React, {useState} from 'react';
import axios from "axios";
import {BACKEND_URL} from "../../Env";

const EditProfile = ({ data, setEditProfile, isClicked }) => {
    const [name, setName]   = useState(data.name);
    const [comments,setComments]    = useState(data.comments);
    const profile_id    = data.id;

    const requestSaveProfile = async () => {
        try {
            await axios.post(
                BACKEND_URL + '/edit/profile',
                { name, comments, profile_id }
            );
        } catch (e) {
            console.log(e);
        }
    }

    if (isClicked){
        requestSaveProfile();
        setEditProfile(false);
    }

    return (
        <main className="form-input">
            <div className="form-floating">
                <input type="text" className="form-control"  placeholder="이름" defaultValue={name} onChange={e => setName(e.target.value)} />
                <label htmlFor="floatingInput">이름</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" placeholder="한 줄 소개" defaultValue={comments} onChange={e => setComments(e.target.value)} />
                <label htmlFor="floatingInput">한 줄 소개</label>
            </div>
        </main>
    );
    
}


const Profile = ({ profileData, editProfile, setEditProfile, handleEditProfile, isClicked, setIsClicked }) => {
    const handleProfileSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsClicked(prevState => (!prevState));
    }
    return (
        <div className="awards-portfolio">
            <h3>프로필</h3>
            {
                editProfile ?
                Array.from(profileData).map(profile => {
                    return (
                        <div key={`profile_${profile.id}_edit`}>
                            <EditProfile data={profile} setEditProfile={setEditProfile} isClicked={isClicked} />
                        </div>
                    )
                }) : 
                Array.from(profileData).map(profile => {
                    return (
                        <div key={`profile_${profile.id}`}>
                            <h5>{profile.name}</h5>
                            <p>{profile.comments}</p>
                        </div>
                    )
                })
            }
            {editProfile ?
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button className="btn btn-outline-primary" onClick={handleProfileSubmit} type="submit">완료</button>
                </div>:
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button className="btn btn-outline-primary" onClick={handleEditProfile} type="button">수정</button>
                </div>
            }
        </div>
    );
    
}

export default Profile;