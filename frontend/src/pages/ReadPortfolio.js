import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import { FullPage, LeftSide, RightSide } from '../styles/MainStyle';
import {BACKEND_URL} from "../Env";


const ReadPortfolio = ({ sessionId, readWhos }) => {
    const templateStyle                                     = {width: '60vw'}
    const [awardData, setAwardData]                         = useState({});
    const [schoolData, setSchoolData]                       = useState({});
    const [certificateData, setCertificateData]             = useState({});
    const [projectData, setProjectData]                     = useState({});
    const [profileData, setProfileData]                     = useState({});
    
    // get Data from Flask
    useEffect(()=>{
        // Default roaded data
        const fetchPortfolio = async () => {
            const res = await axios.post(BACKEND_URL + '/portfolio/main', {"sessionId": readWhos });
            const data = res.data.data.portfolio;
            setAwardData(data.awards);
            setSchoolData(data.schools);
            setCertificateData(data.certificates);
            setProjectData(data.projects);
            setProfileData(data.profile);
        }
        fetchPortfolio();

    }, [readWhos, setSchoolData, setAwardData, setCertificateData, setProfileData, setProjectData]);

    return (
        
        <FullPage>
            {sessionId === null && <Redirect to="/login" />}
            <h1 className="text-center">My Protfolio</h1>
            <br />
            <LeftSide>
                <div className="card text-center" style={{width: '28vw'}}>
                    <div className="card-body">
                        <h3>프로필</h3>
                        {
                            Array.from(profileData).map(profile => {
                            return (
                                <div key={`profile_${profile.id}`}>
                                    <h5>{profile.name}</h5>
                                    <p>{profile.comments}</p>
                                </div>
                            )
                            })
                        }
                    </div>
                </div>
            </LeftSide>
            <RightSide>
                <div className="card text-center" style={templateStyle}>
                    <div className="card-body">
                        <h3>학력</h3>
                        {
                            Array.from(schoolData).map(school => {
                                return (
                                    <div key={`school_${school.id}_read`}>
                                        <h5>{school.name}</h5>
                                        <h6>{school.major}</h6>
                                        <p>{school.status}</p>
                                    </div>
                                    
                                )
                            })
                        }
                    </div>
                </div> 

                <div className="card text-center" style={templateStyle}>
                    <div className="card-body">
                        <h3>수상이력</h3>
                        {
                            Array.from(awardData).map(award => {
                                return (
                                    <div key={`award_${award.id}`}>
                                        <h5>{award.awards}</h5>
                                        <p>{award.awards_details}</p>
                                    </div>
                                    
                                )
                            })
                        }
                    </div>
                </div>

                <div className="card text-center" style={templateStyle}>
                    <div className="card-body">
                        <h3>프로젝트</h3>
                        {
                            Array.from(projectData).map(project => {
                                return (
                                    <div key={`project_${project.id}`}>
                                        <h5>{project.project_name}</h5>
                                        <h6>{project.project_details}</h6>
                                        <p>{project.project_start_date} ~ {project.project_end_date}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="card text-center" style={templateStyle}>
                    <div className="card-body">
                        <h3>자격증</h3>
                        {
                            Array.from(certificateData).map(certificate => {
                                return (
                                    <div key={`certificate_${certificate.id}`}>
                                        <h5>{certificate.cert_name}</h5>
                                        <h6>{certificate.cert_from}</h6>
                                        <p>{certificate.cert_date}</p>
                                    </div>
                                    
                                )
                            })
                        }
                    </div>
                </div>
            </RightSide>
        </FullPage>
    );
    
}

export default ReadPortfolio;