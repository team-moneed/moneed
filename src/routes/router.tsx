import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SelectCategory from "../components/create/SelectCategory";
import SelectLevel from "../components/create/SelectLevel";
import Comments from "../pages/Community/Comments";
import Community from "../pages/Community/Community";
import Main from "../pages/Main/Main";

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
                path: "/comment/:postId",
                element: <Comments />,
            },
            {
                path: "/selectCategory",
                element: <SelectCategory />,
            },
            {
                path: "/posts/:searchKeyword",
                element: <Community />,
            },
        ],
    },
]);

export default router;
