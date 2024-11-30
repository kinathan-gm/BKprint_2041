import classNames from "classnames/bind";
import styles from './AuthLayout.module.css'
import { asset } from "../../../assets/asset";

const clx = classNames.bind(styles);

function AuthLayout({children}){
    return (
        <div className={clx('wrapper')}>
            <div className={clx('image-container')}>
                <img className={clx('side-img')} src={asset.imagebk} alt="bach khoa"/>
            </div>
            <div className={clx('content')}>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout;