import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SelectStockType from "../components/create/SelectStockType";
import Comments from "../pages/Community/Comments";
import Community from "../pages/Community/Community";
import WritePost from "../pages/Community/WritePost";
import Main from "../pages/Main/Main";
import Mypage from "../pages/Mypage/Mypage";
import MyPost from "../pages/Mypage/MyPost";
import MyProfile from "../pages/Mypage/MyProfile";
import ShortformList from "../pages/Shortform/ShortformList";
import OnBoarding from "../pages/onBoarding/OnBoarding";
import ShortformDetail from "../pages/Shortform/ShortformDetail";
import Mycomment from "../pages/Mypage/Mycomment";
import SearchStocktype from "../pages/Community/SearchStocktype";

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Main />,
            },
            {
                path: "/community",
                element: <Community />,
            },
            {
                path: "/writepost/:stocktype",
                element: <WritePost />,
            },
            {
                path: "/writepost",
                element: <WritePost />,
            },
            {
                path: "/community/:stocktype",
                element: <Community />,
            },
            {
                path: "/comment/:postId",
                element: <Comments />,
            },
            {
                path: "/selectStockType",
                element: <SelectStockType />,
            },
            {
                path: "/posts/:searchKeyword",
                element: <Community />,
            },
            {
                path: "/shortform",
                element: <ShortformList />,
            },
            {
                path: "/mypage",
                element: <Mypage />,
            },
            {
                path: "myprofile",
                element: <MyProfile />,
            },
            {
                path: "mypost",
                element: <MyPost />,
            },
            {
                path: "mycomment",
                element: <Mycomment />,
            },
            {
                path: "searchstocktype",
                element: <SearchStocktype />,
            },
        ],
    },
    {
        path: "/onboarding",
        element: <OnBoarding />,
    },
    {
        path: "/shortformdetail",
        element: <ShortformDetail />,
    },
]);

export default router;
