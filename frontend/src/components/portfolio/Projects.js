import React, {useState} from 'react';
import axios from "axios";
import {BACKEND_URL} from "../../Env";

const EditProject = ({ data, setEditProject, isClicked, setProjectData, sessionId }) => {
    const [name, setName]               = useState(data.project_name);
    const [details,setDetails]          = useState(data.project_details);
    const [startDate,setStartDate]      = useState(data.project_start_date);
    const [endDate,setEndDate]          = useState(data.project_end_date);
    const project_id                    = data.id;

    const requestSaveProject = async () => {
        try {
            await axios.post(
                BACKEND_URL + '/edit/project',
                { name, details, startDate, endDate, project_id }
            );
        } catch (e) {
            console.log(e);
        }
    }

    const requestDeleteProject = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await axios.post(
                BACKEND_URL + '/delete/project',
                { project_id }
            );
            const res = await axios.post(BACKEND_URL + '/portfolio/main/projects', {sessionId});
            const data = res.data.data.projects;
            setProjectData(data);
        } catch (e) {
            console.log(e);
        }
    }


    if (isClicked){
        requestSaveProject();
        setEditProject(false);
    }

    return (
        <main className="form-input">
            <div className="form-floating">
                <input type="text" className="form-control"  placeholder="프로젝트 주제" defaultValue={name} onChange={e => setName(e.target.value)} />
                <label htmlFor="floatingInput">프로젝트 주제</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" placeholder="프로젝트 내용" defaultValue={details} onChange={e => setDetails(e.target.value)} />
                <label htmlFor="floatingInput">프로젝트 내용</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control"  placeholder="시작 날짜" defaultValue={startDate} onChange={e => setStartDate(e.target.value)} />
                <label htmlFor="floatingInput">시작 날짜</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" placeholder="종료 날짜" defaultValue={endDate} onChange={e => setEndDate(e.target.value)} />
                <label htmlFor="floatingInput">종료 날짜</label>
            </div>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                <button className="btn btn-outline-primary" onClick={requestDeleteProject} type="button">삭제</button>
            </div>
        </main>
    );
    
}


const Projects = ({ projectData, editProject, setEditProject, handleEditProjects, isClicked, setIsClicked, setProjectData, sessionId }) => {
    const handleProjectSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsClicked(prevState => (!prevState));
    }
    const requestAddProject = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await axios.post(BACKEND_URL + '/add/project', {sessionId});
        const res = await axios.post(BACKEND_URL + '/portfolio/main/projects', {sessionId});
            const data = res.data.data.projects;
            setProjectData(data);
        
    }
    return (
        <div className="projects-portfolio">
            <h3>프로젝트</h3>
            {
                editProject ?
                Array.from(projectData).map(project => {
                    return (
                        <div key={`project_${project.id}_edit`}>
                            <EditProject data={project} setEditProject={setEditProject} isClicked={isClicked} sessionId={sessionId} setProjectData={setProjectData} />
                        </div>
                    )
                }) : 
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
            {editProject ?
            <div>
                <div>
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <button className="btn btn-outline-primary" onClick={requestAddProject} type="button">추가</button>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <button className="btn btn-outline-primary" onClick={handleProjectSubmit} type="submit">완료</button>
                    </div>
                </div>
            </div>:
            <div className="btn-group" role="group" aria-label="Basic outlined example">
                <button className="btn btn-outline-primary" onClick={handleEditProjects} type="button">수정</button>
            </div>
            }
        </div>
    );
    
}

export default Projects;