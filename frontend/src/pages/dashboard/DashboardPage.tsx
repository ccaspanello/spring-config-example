import ServiceCard from "./ServiceCard.tsx";

const DashboardPage = () => {

    return (
        <>
            <ServiceCard endpoint='/api/message-service/payload' />
            <ServiceCard endpoint='/api/user-service/payload' />
        </>
    )
}
export default DashboardPage;