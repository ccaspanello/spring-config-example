import {useParams} from "react-router-dom";
import ConfigurationForm from "./ConfigurationForm.tsx";

const ConfigurationEditPage = () => {

    const {serviceName} = useParams();

    return (
        <>
            <div className="font-medium text-2xl text-900 m-4">Edit Configuration</div>
            <ConfigurationForm serviceName={serviceName}/>
        </>
    )
}
export default ConfigurationEditPage;