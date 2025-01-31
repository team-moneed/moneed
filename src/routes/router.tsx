import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SelectStockType from "../components/create/SelectStockType";
import PostDetail from "../pages/Community/PostDetail";
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
import EditPost from "../pages/Community/EditPost";
import WelcomePage from "../pages/onBoarding/WelcomePage";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
        element: <App />,
        errorElement: <ErrorPage />,
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
                path: "/editpost/:stocktype",
                element: <EditPost />,
            },
            {
                path: "/community/:stocktype",
                element: <Community />,
            },
            {
                path: "/post/:stocktype/:postId",
                element: <PostDetail />,
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
                path: "/myprofile",
                element: <MyProfile />,
            },
            {
                path: "/mypost",
                element: <MyPost />,
            },
            {
                path: "/mycomment",
                element: <Mycomment />,
            },
            {
                path: "/searchstocktype",
                element: <SearchStocktype />,
            },
            {
                path: "/welcome",
                element: <WelcomePage />,
            },
        ],
    },
    {
        path: "/onboarding",
        element: <OnBoarding />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/shortformdetail",
        element: <ShortformDetail />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/selectStockType",
        element: <SelectStockType />,
        errorElement: <ErrorPage />,
    },
]);

export default router;
