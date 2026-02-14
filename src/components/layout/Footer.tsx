import {Fragment} from "react";

function Footer(){
    return (
        <Fragment>
            <footer className="bg-dark py-4 mt-auto">
                <div className="container px-5">
                    <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                        <div className="col-auto">
                            <div className="small m-0 text-white">서동현 fishman4535@gmail.com</div>
                        </div>
                        <div className="col-auto">
                            <a className="link-light small" href="https://github.com/dongdongsw">GitHub 바로가기</a>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}

export default Footer;