import { Link, NavLink } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <>
            <div className="">
                <Link to="/">
                    <div>
                        홈
                    </div>
                </Link>
                <Link to="/community">
                    <div>
                        커뮤니티
                    </div>
                </Link>
            </div>
        </>
    );
};

export default NavigationBar;