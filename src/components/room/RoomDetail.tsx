import { Fragment } from "react/jsx-runtime";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { useState } from "react";
import "./RoomDetail.css"


function RoomDetail(){
    const [date, setDate] = useState<Date | null>(null);

    return(
        <Fragment>
             <section className="py-5">
                <div className="container px-5 my-5">
                    <div className="row gx-5">
                        <header className="mb-4">
                                    <h1 className="fw-bolder mb-1">Welcome to Blog Post!</h1>
                                    <div className="text-muted fst-italic mb-2">January 1, 2023</div>
                                    <a className="badge bg-secondary text-decoration-none link-light" href="#!">Web Design</a>
                                    <a className="badge bg-secondary text-decoration-none link-light" href="#!">Freebies</a>
                                </header>
                        
                        <div className="col-lg-7">
                            <article>
                                
                                <p className="fs-5 mb-4">소개</p>
                                <figure className="mb-4"><img className="img-fluid rounded" src="https://dummyimage.com/900x400/ced4da/6c757d.jpg" alt="..." /></figure>
                                <figure className="mb-4"><img className="img-fluid rounded" src="https://dummyimage.com/900x400/ced4da/6c757d.jpg" alt="..." /></figure>
                                <figure className="mb-4"><img className="img-fluid rounded" src="https://dummyimage.com/900x400/ced4da/6c757d.jpg" alt="..." /></figure>
                                <figure className="mb-4"><img className="img-fluid rounded" src="https://dummyimage.com/900x400/ced4da/6c757d.jpg" alt="..." /></figure>
                            </article>
                        </div>
                        <div className="col-lg-5">
                            <div className="d-flex align-items-center mt-lg-1 mb-4">
                                <div className="ms-12">
                                    <div className="fw-bold">날짜 선택</div>
                                </div>
                            </div>
                            <Flatpickr
                                onChange={([d]) => setDate(d)}
                                options={{
                                    inline: true,
                                    dateFormat: "Y-m-d",
                                }}
                                render={(_, ref) => (
                                    <input ref={ref} style={{ display: "none" }} />
                                )}
                                />

                        </div>
                        {/* 댓글 */}
                        <section>
                            <div className="card bg-light">
                                <div className="card-body">
                                    
                                    <form className="mb-4"><textarea className="form-control" rows={3} placeholder="Join the discussion and leave a comment!"></textarea></form>
                                    
                                    <div className="d-flex mb-4">
                                        
                                        <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                        <div className="ms-3">
                                            <div className="fw-bold">Commenter Name</div>
                                            If you're going to lead a space frontier, it has to be government; it'll never be private enterprise. Because the space frontier is dangerous, and it's expensive, and it has unquantified risks.
                                            
                                            <div className="d-flex mt-4">
                                                <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                                <div className="ms-3">
                                                    <div className="fw-bold">Commenter Name</div>
                                                    And under those conditions, you cannot establish a capital-market evaluation of that enterprise. You can't get investors.
                                                </div>
                                            </div>
                                            
                                            <div className="d-flex mt-4">
                                                <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                                <div className="ms-3">
                                                    <div className="fw-bold">Commenter Name</div>
                                                    When you put money directly to a problem, it makes a good headline.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="d-flex">
                                        <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                        <div className="ms-3">
                                            <div className="fw-bold">Commenter Name</div>
                                            When I look at the universe and all the ways the universe wants to kill us, I find it hard to reconcile that with statements of beneficence.
                                        </div>
                                    </div>
                                </div>
                                {/* 페이지 네이션 넣기 */}
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </section>
                    </div>
                </div>
            </section>

        </Fragment>
    )
}

export default RoomDetail;