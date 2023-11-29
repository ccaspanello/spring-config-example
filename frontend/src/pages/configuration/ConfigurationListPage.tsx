import {DataTable} from "primereact/datatable";
import {useEffect, useState} from "react";
import axios from "axios";
import {Column} from "primereact/column";
import {Config} from "../../models/Config.tsx";
import {Button} from "primereact/button";
import {useToast} from "../../context/ToastContext.tsx";
import {useNavigate} from "react-router-dom";

const ConfigurationListPage = () => {

    const navigate = useNavigate();
    const toast = useToast();

    const [configs, setConfigs] = useState<Config[]>([]);

    useEffect(() => {
        fetchList();
    }, [])

    const fetchList = () => {
        axios.get<Config[]>('/api/config-service/configs')
            .then(res => setConfigs(res.data))
            .catch(err => console.error(err))
    }

    const onClickCreate = () => {
        navigate('/configuration/create')
    }

    const onClickEdit = (config: Config) => {
        navigate(`/configuration/edit/${config.name}`)
    }

    const onClickDelete = (config: Config) => {
        axios.delete(`/api/config-service/config/${config.name}`)
            .then(_res => {
                toast.showToast({ severity: 'success', summary: "Delete Successful", detail: config.name})
                fetchList()
            })
            .catch(err => console.error(err))
    }

    const tableHeader = () => {
        return (
            <div className="flex justify-content-between pt-3">
                <div className="font-medium text-2xl text-900">Configuration Management</div>
                <Button size="small" label="Add Service" severity="info" onClick={onClickCreate} />
            </div>
        )
    }

    const actionsBody = (config: Config) => {
        return (
            <div className="flex gap-1">
                <Button icon="pi pi-pencil" severity="info" onClick={() => onClickEdit(config)} />
                <Button icon="pi pi-trash" severity="danger" onClick={() => onClickDelete(config)} />
            </div>
        )
    }

    return (
        <DataTable value={configs} header={tableHeader}>
            <Column header="Actions" body={actionsBody} />
            <Column header="Service Name" field="name" />
            <Column header="Consul Key" field="id" />
        </DataTable>
    )
}
export default ConfigurationListPage;