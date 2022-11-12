import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getProject } from '../web3/Relic'
import { useGlobalState } from '../store'
import ProjectDetails from "../components/ProjectDetails"
import ProjectBackers from '../components/ProjectBackers'
import BackProject from "../components/BackProject"
import UpdateProject from '../components/UpdateProject'
import DeleteProject from '../components/DeleteProject'



const Project = () => {

    const { id } = useParams()
    const [loaded, setLoaded] = useState(false)
    const [project] = useGlobalState('project')
    const [backers] = useGlobalState('backers')

    useEffect(() => {
        getProject(id)

    },)

    return (
        <div className="flex flex-col lg:w-4/5 w-full mx-auto px-5">
            <div className="my-5"></div>
            <ProjectDetails  project={project}/>
            <div className="my-5"></div>
            {backers.length > 0 ? <ProjectBackers backers={backers} /> : null}

            <BackProject project={project} />
            <UpdateProject project={project} />
            <DeleteProject project={project} />

            <div className="my-5"></div>
        </div>
    )
}

export default Project