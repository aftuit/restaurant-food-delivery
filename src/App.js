import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import DeliveryTerm from "./Pages/DeliveryTerm/DeliveryTerm";
import Order from "./Pages/Order/Order";
import AuthAdminPanel from "./Pages/AdPanel/AuthAdminPanel";
import ItemPage from "./Pages/ItemPage/ItemPage";
import NotFound from "./Pages/NotFound/NotFound";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import {FoodsProvider} from "./Context/foodsContext";
import {LoginProvider} from "./Context/loginContext";
import {RouteProvider} from "./Context/routeContext";
import {CartProvider} from "./Context/cartContext";
import {SearchProvider} from "./Context/searchContext";
import {LangProvider} from "./Context/localization";
import {CartIdProvider} from "./Context/cartIds";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import {useLocation, Navigate} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./mainStyle.scss";

function App() {
    const [visible, setVisible] = React.useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        scrolled > 300 ? setVisible(true) : setVisible(false);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    window.addEventListener("scroll", toggleVisible);

    const location = useLocation();

    React.useEffect(() => {
        scrollToTop();
    }, [location.pathname]);

    return (
        <div className="App ">
            {!window.location.href.includes("admin") && (
                <div
                    className="up-arrow border-color text-green"
                    onClick={scrollToTop}
                    style={{display: visible ? "flex" : "none"}}
                >
                    <KeyboardArrowUpOutlinedIcon/>
                </div>
            )}
            <LoginProvider>
                <LangProvider>
                    <FoodsProvider>
                        <RouteProvider>
                            <CartProvider>
                                <SearchProvider>
                                    <CartIdProvider>
                                        {!window.location.href.includes("admin") && <Navbar/>}
                                        <div className="routes-wrap bg-dark">
                                            <Routes>
                                                <Route exact path="/" element={<Home/>}/>
                                                <Route exact path="/cart" element={<Cart/>}/>
                                                <Route exact path="*" element={<NotFound/>}/>
                                                <Route
                                                    exact
                                                    path="/order"
                                                    element={
                                                        JSON.parse(
                                                            window.localStorage.getItem("saved__cart__items")
                                                        )?.length > 0 ? (
                                                            <Order/>
                                                        ) : (
                                                            <Navigate to="/cart"/>
                                                        )
                                                    }
                                                />
                                                <Route exact path="/delivery-term" element={<DeliveryTerm/>}/>
                                                <Route exact path="/access/:path/:id" element={<ItemPage/>}/>
                                                <Route exact path="/admin-panel/*" element={<AuthAdminPanel/>}/>
                                            </Routes>
                                        </div>
                                        {!window.location.href.includes("admin") && <Footer/>}
                                    </CartIdProvider>
                                </SearchProvider>
                            </CartProvider>
                        </RouteProvider>
                    </FoodsProvider>
                </LangProvider>
            </LoginProvider>
        </div>
    );
}

export default App;
