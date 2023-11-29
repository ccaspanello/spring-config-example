import {useEffect, useState} from "react";
import {Payload} from "../../models/Payload.ts";
import axios from "axios";
import {Card} from "primereact/card";

interface ServiceCardProps{
    endpoint: string;
}
const ServiceCard = (props: ServiceCardProps) => {

    const [payload, setPayload] = useState<Payload>({instance: "", message: "", serviceName: ""});

    useEffect(() => {
        axios.get<Payload>(props.endpoint)
            .then(res => setPayload(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <Card className="m-3" title={payload.serviceName} subTitle={payload.instance}>
            <div>{payload.message}</div>
        </Card>
    )

}

export default ServiceCard;