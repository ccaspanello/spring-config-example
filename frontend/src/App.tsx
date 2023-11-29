import {Route, Routes} from "react-router-dom";
import Header from "./components/Header.tsx";
import ConfigurationListPage from "./pages/configuration/ConfigurationListPage.tsx";
import {ToastProvider} from "./context/ToastContext.tsx";
import DashboardPage from "./pages/dashboard/DashboardPage.tsx";
import ConfigurationCreatePage from "./pages/configuration/ConfigurationCreatePage.tsx";
import ConfigurationEditPage from "./pages/configuration/ConfigurationEditPage.tsx";

function App() {

    return (
        <>
            <ToastProvider>
                <Header/>
                <Routes>
                    <Route path="/" element={<DashboardPage/>}/>
                    <Route path="/configuration" element={<ConfigurationListPage/>}/>
                    <Route path="/configuration/create" element={<ConfigurationCreatePage/>}/>
                    <Route path="/configuration/edit/:serviceName" element={<ConfigurationEditPage/>}/>
                </Routes>
            </ToastProvider>
        </>
    )
}

export default App
