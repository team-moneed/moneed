import { createBrowserRouter } from "react-router-dom";
import App from "../App";
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
        ],
    },
]);

export default router;
