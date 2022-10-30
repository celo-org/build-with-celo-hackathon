import { Route, Routes } from 'react-router-dom';
import Page404 from '../components/errors/404';
import MainLayout from '../components/Layout';
import Home from './Home';
import Payment from './Payment';


export const routes = [
    "Markets",
    "Cryptocurrencies", 
    "News", 
    "Wallets"
]
export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
            </Route>
            <Route path="/payment" element={<MainLayout />}>
                <Route index element={<Payment />} />
            </Route>
            <Route path="*" element={<Page404/>} />
        </Routes>
    )
}