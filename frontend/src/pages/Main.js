import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";

import Awards from "../components/portfolio/Awards";
import Schools from "../components/portfolio/Schools";
import Projects from "../components/portfolio/Projects";
import Certificates from "../components/portfolio/Certificates";
import Profile from "../components/portfolio/Profile";
import { FullPage, LeftSide, RightSide } from '../styles/MainStyle';
import {BACKEND_URL} from "../Env";

const Main = ({ sessionId }) => {
    const templateStyle                                     = {width: '60vw'}
    const [awardData, setAwardData]                         = useState({});
    const [schoolData, setSchoolData]                       = useState({});
    const [certificateData, setCertificateData]             = useState({});
    const [projectData, setProjectData]                     = useState({});
    const [profileData, setProfileData]                     = useState({});

    const [editProfile, setEditProfile]                     = useState(false);
    const [editSchool, setEditSchool]                       = useState(false);
    const [editAward, setEditAward]                         = useState(false);
    const [editProject, setEditProject]                     = useState(false);
    const [editCertificate, setEditCertificate]             = useState(false);

    const [isSchoolClicked, setIsSchoolClicked]             = useState(false);
    const [isAwardClicked, setIsAwardClicked]               = useState(false);
    const [isCertificateClicked, setIsCertificateClicked]   = useState(false);
    const [isProjectClicked, setIsProjectClicked]           = useState(false);
    const [isProfileClicked, setIsProfileClicked]           = useState(false);
    
    // get Data from Flask
    useEffect(()=>{
        // Default roaded data
        const fetchPortfolio = async () => {
            const res = await axios.post(BACKEND_URL + '/portfolio/main', {sessionId});
            const data = res.data.data.portfolio;
            setAwardData(data.awards);
            setSchoolData(data.schools);
            setCertificateData(data.certificates);
            setProjectData(data.projects);
            setProfileData(data.profile);
        }
        fetchPortfolio();

        // After edit reroad data
        const fetchProfile = async () => {
            const res = await axios.post(BACKEND_URL + '/portfolio/main/profile', {sessionId});
            const data = res.data.data.profile;
            setProfileData(data);
            setIsProfileClicked(false);
            
        }
        const fetchAwards = async () => {
            const res = await axios.post(BACKEND_URL + '/portfolio/main/awards', {sessionId});
            const data = res.data.data.awards;
            setAwardData(data);
            setIsAwardClicked(false);
        }
        const fetchSchools = async () => {
            const res = await axios.post(BACKEND_URL + '/portfolio/main/schools', {sessionId});
            const data = res.data.data.schools;
            setSchoolData(data);
            setIsSchoolClicked(false);
        }
        const fetchCertificates = async () => {
            const res = await axios.post(BACKEND_URL + '/portfolio/main/certificates', {sessionId});
            const data = res.data.data.certificates;
            setCertificateData(data);
            setIsCertificateClicked(false);
        }
        const fetchProjects = async () => {
            const res = await axios.post(BACKEND_URL + '/portfolio/main/projects', {sessionId});
            const data = res.data.data.projects;
            setProjectData(data);
            setIsProjectClicked(false);
        }
        if(editSchool && isSchoolClicked){
            fetchSchools();
        }
        if(editAward && isAwardClicked){
            fetchAwards();
        }
        if(editCertificate && isCertificateClicked){
            fetchCertificates();
        }
        if(editProfile && isProfileClicked){
            fetchProfile();
        }
        if(editProject && isProjectClicked){
            fetchProjects();
        }
    }, [sessionId, editSchool, editAward, editCertificate, editProfile, editProject, 
        setSchoolData, setAwardData, setCertificateData, setProfileData, setProjectData, 
        isProjectClicked, isSchoolClicked, isAwardClicked, isProfileClicked, isCertificateClicked,
        setIsProjectClicked, setIsSchoolClicked, setIsAwardClicked, setIsProfileClicked, setIsCertificateClicked]);

    // Set the "Edit<->Read" State's status 
    const handleEditProfile         = () => {setEditProfile(prevState => (!prevState))};
    const handleEditAwards          = () => {setEditAward(prevState => (!prevState))};
    const handleEditSchools         = () => {setEditSchool(prevState => (!prevState))};
    const handleEditCertificates    = () => {setEditCertificate(prevState => (!prevState))};
    const handleEditProjects        = () => {setEditProject(prevState => (!prevState))};
    
    return (
        
        <FullPage>
            {sessionId === null && <Redirect to="/login" />}
            <h1 className="text-center">My Portfolio</h1>
            <br />
            <LeftSide>
                <div className="card text-center" style={{width: '28vw'}}>
                    <div className="card-body">
                        <Profile
                        profileData={profileData}
                        editProfile={editProfile}
                        setEditProfile={setEditProfile}
                        handleEditProfile={handleEditProfile}
                        isClicked={isProfileClicked}
                        setIsClicked={setIsProfileClicked} />
                    </div>
                </div>
            </LeftSide>
            <RightSide>
                <div className="card text-center" style={templateStyle}>
                    <div className="card-body">
                        <Schools
                        schoolData={schoolData}
                        editSchool={editSchool}
                        setEditSchool={setEditSchool}
                        handleEditSchools={handleEditSchools}
                        isClicked={isSchoolClicked}
                        setIsClicked={setIsSchoolClicked}
                        setSchoolData={setSchoolData}
                        sessionId={sessionId} />
                    </div>
                </div> 

                <div className="card text-center" style={templateStyle}>
                    <div className="card-body">
                        <Awards
                        awardData={awardData}
                        editAward={editAward}
                        setEditAward={setEditAward}
                        handleEditAwards={handleEditAwards}
                        isClicked={isAwardClicked}
                        setIsClicked={setIsAwardClicked}
                        setAwardData={setAwardData}
                        sessionId={sessionId} />
                    </div>
                </div>

                <div className="card text-center" style={templateStyle}>
                    <div className="card-body">
                        <Projects
                        projectData={projectData}
                        editProject={editProject}
                        setEditProject={setEditProject}
                        handleEditProjects={handleEditProjects}
                        isClicked={isProjectClicked}
                        setIsClicked={setIsProjectClicked}
                        setProjectData={setProjectData}
                        sessionId={sessionId} />
                    </div>
                </div>

                <div className="card text-center" style={templateStyle}>
                    <div className="card-body">
                        <Certificates
                        certificateData={certificateData}
                        editCertificate={editCertificate}
                        setEditCertificate={setEditCertificate}
                        handleEditCertificates={handleEditCertificates}
                        isClicked={isCertificateClicked}
                        setIsClicked={setIsCertificateClicked}
                        setCertificateData={setCertificateData}
                        sessionId={sessionId} />
                    </div>
                </div>
            </RightSide>
        </FullPage>
    );
    
}

export default Main;