import {useToast} from "../../context/ToastContext.tsx";
import {useNavigate} from "react-router-dom";
import {InputText} from "primereact/inputtext";
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {ConfigDetail} from "../../models/ConfigDetail.tsx";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";

interface ConfigurationFormProps {
    serviceName?: string;
}

const ConfigurationForm = (props: ConfigurationFormProps) => {

    const navigate = useNavigate();
    const toast = useToast();

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [configDetail, setConfigDetail] = useState<ConfigDetail>({name: "", yaml: ""});

    useEffect(() => {
        console.log("props.serviceName", props.serviceName)
        if (props.serviceName) {
            axios.get<ConfigDetail>(`/api/config-service/config/${props.serviceName}`)
                .then(res => {
                    setIsEdit(true);
                    setConfigDetail(res.data)
                })
                .catch(err => console.log(err))
        }
    }, [])

    const doTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfigDetail({...configDetail, name: e.currentTarget.value});
    }

    const doTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setConfigDetail({...configDetail, yaml: e.currentTarget.value});
    }

    const onClickCancel = () => {
        navigate('/configuration')
    }

    const onClickSave = () => {
        const headers = {
            'Content-Type': 'application/text',
        };
        axios.put(`/api/config-service/config/${configDetail.name}`, configDetail.yaml, {headers: headers})
            .then(_res => {
                toast.showToast({severity: 'success', summary: 'Saved configuration for: ' + configDetail.name})
                navigate('/configuration')
            })
            .catch(err => toast.showToast({severity: 'error', summary: 'Unexpected error', detail: err.message}))
    }

    return (
        <>
            <div className="flex flex-column gap-2 m-5">
                <label htmlFor="serviceName">Service Name</label>
                <InputText id="serviceName" value={configDetail.name} onChange={doTextChange} disabled={isEdit}/>
                <small id="username-help">Enter the name of the service [spring.application.name]
                </small>
                <label htmlFor="yaml">YAML Config</label>
                <InputTextarea value={configDetail?.yaml} onChange={doTextAreaChange} style={{height: '320px'}}/>
                <div className="flex gap-2 justify-content-end">
                    <Button label="Cancel" size="small" severity="secondary" onClick={onClickCancel}/>
                    <Button label="Save" size="small" severity="info" onClick={onClickSave}/>
                </div>
            </div>
        </>
    )
}
export default ConfigurationForm;