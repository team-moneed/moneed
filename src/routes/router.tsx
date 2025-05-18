import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import SelectStockType from '../components/create/SelectStockType';
import PostDetail from '../pages/Community/PostDetail';
import Community from '../pages/Community/Community';
import ShortformList from '../pages/Shortform/ShortformList';
import OnBoarding from '../pages/onBoarding/OnBoarding';
import KakaoRedirectHandler from '../pages/onBoarding/KakaoRedirectHandler';
import ShortformDetail from '../pages/Shortform/ShortformDetail';
import SearchStocktype from '../pages/Community/SearchStocktype';
import WelcomePage from '../pages/onBoarding/WelcomePage';
import Main from '@/pages/Main/Main';

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <Main />,
            },
            {
                path: '/community',
                element: <Community />,
            },
            {
                path: '/community/:stocktype',
                element: <Community />,
            },
            {
                path: '/post/:stocktype/:postId',
                element: <PostDetail />,
            },
            {
                path: '/posts/:searchKeyword',
                element: <Community />,
            },
            {
                path: '/shortform',
                element: <ShortformList />,
            },
            {
                path: '/searchstocktype',
                element: <SearchStocktype />,
            },
            {
                path: '/welcome',
                element: <WelcomePage />,
            },
        ],
    },
    {
        path: '/onboarding',
        element: <OnBoarding />,
    },
    {
        path: '/oauth2/callback/kakao',
        element: <KakaoRedirectHandler />,
    },
    {
        path: '/shortformdetail',
        element: <ShortformDetail />,
    },
    {
        path: '/selectStockType',
        element: <SelectStockType />,
    },
]);

export default router;
