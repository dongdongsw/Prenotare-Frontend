import {Fragment} from "react";

function Mypage(){

    return(
        <Fragment>
            <section style={{"height": "80.7vh"}}>
                <div className="container px-5 my-5">
                    <div className="row gx-5 justify-content-start">
                        <div className="col-lg-8 col-xl-12">
                            <div className="card mb-3" style={{"maxWidth": "100%"}}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src="/imgs/Main.jpeg" className="img-fluid rounded-start" alt="..."/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <p className="card-text">This is a wider card with supporting text below as a natural
                                                lead-in to additional content. This content is a little bit longer.</p>
                                            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins
                                                ago</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </Fragment>
    )
}

export default Mypage;