import { Fragment } from "react/jsx-runtime";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import {useRef, useState} from "react";
import "./RoomDetail.css"
import {useMutation, useQuery} from "@tanstack/react-query";
import { RoomItem, reserveData } from "../../commons/commonsData";
import { useParams } from "react-router";
import {apiClient} from "../../http-commons";


function RoomDetail(){
    const [dates, setDate] = useState<Date | null>();
    const {no} = useParams();
    const [starttime, setStartTime] = useState<string>("");
    const [endtime, setEndtime] = useState<string>("");
    const [dates, setDate] = useState<Date | null>();

    const mutation = useMutation({
        mutationFn: async() => {
            return await apiClient.post(`/room/detail`, {
                room_no:no,
                users_no:window.sessionStorage.getItem("no"),
                starttime:starttime,
                endtime:endtime
            })
        },
        onSuccess: async (data) => {
            console.log(data);

        },
        onError: async (error) => {
            console.log(error);
        }

    })

    const {isLoading, isError, error, data} = useQuery<RoomItem>({
        queryKey:['room_detail', no],
        queryFn: async() => {
            const res = await apiClient.get(`/room/detail/${no}`);
            console.log(res.data);
            return res.data;
        }
    })

    if(isLoading) {
        return <h1 className={"text-center"}>Loading ...</h1>
    }
    if(isError) {
        return <h1 className={"text-center"}>Error발생 : {error?.message}</h1>
    }



    const color =
        data?.status === "AVAILABLE"
            ?"bg-primary"
            :"bg-warning";

    const roomStatus =
        data?.status === "AVAILABLE"
            ?"이용 가능"
            :"이용 불가";

   
    const Time = (open:string, close:string)=>{
        const result: string[] = [];

        let start = new Date(`1970-01-01T${open.slice(0,5)}:00`);
        let end = new Date(`1970-01-01T${close.slice(0,5)}:00`);

        while(start <= end){
            result.push(
                start.toTimeString().slice(0,5)
            )
            start.setHours(
                start.getHours() + 1
            )
        }
        return result;
    }
    
    const timeArr = data?Time(data?.opentime, data?.closetime) : [];
    console.log("open:", data?.opentime);
    console.log("close:", data?.closetime);
    console.log("timeArr:", timeArr);

    const getImageUrl = (img:string)=>{
        if(!img){
            return "";
        }
        const clean = img.trim();
        if(clean.startsWith("http")){
            return img
        }
        return `http://localhost:9090/${clean}`
    }

    const {mutate:reserve} = mutation;

    return(
        <Fragment>
             <section className="py-5">
                <div className="container px-5 my-5">
                    <div className="row gx-5">
                        <header className="mb-4" style={{"position": "relative"}}>
                                    <h1 className="fw-bolder mb-1">
                                        {data?.name} | {data?.personnel}명
                                        {
                                            window.sessionStorage.getItem('role')==="ROLE_ADMIN" && (
                                                <button type="button" className="btn btn-danger" style={{"position":"absolute","top":"10%", "left":"95%"}}>삭제</button>
                                            )
                                        }
                                    </h1>
                                    <div className="text-muted fst-italic mb-2">등록날짜 : {data?.createdAt}</div>
                                    <div className={`badge ${color} text-decoration-none link-light`}>{roomStatus}</div>
                                </header>

                        <div className="col-lg-7">
                            <article>

                                <p className="fs-5 mb-4">{data?.content}</p>
                                {
                                    

                                    data?.imageList?.map((image:string, index:number)=>{
                                        
                                    return (
                                            <figure className="mb-4" key={index}>
                                                <img className="img-fluid rounded" src={getImageUrl(image)} alt="..." />
                                            </figure>
                                    )
                                    })
                                }
                            </article>
                        </div>
                        <div className="col-lg-5" style={{"backgroundColor":"#fff", "borderRadius":"15px", "boxShadow":"0 8px 24px rgba(0,0,0,0.06)"}}>
                            <div className="d-flex align-items-center mt-lg-4 mb-4">
                                <div className="ms-12">
                                    <div className="fw-bold">날짜 선택</div>
                                </div>
                            </div>
                            <Flatpickr
                                onChange={(dates) => setDate(dates[0])}
                                options={{
                                    inline: true,
                                    dateFormat: "Y-m-d",
                                }}
                                render={(_, ref) => (
                                    <input ref={ref} style={{ display: "none" }} />
                                )}
                                />
                            <div className="d-flex align-items-center mt-lg-4 mb-4">
                                <div className="ms-12">
                                    <div className="fw-bold">시간 선택 | 이용 시작 시간 : {data?.opentime} 이용 종료 시간 : {data?.closetime}</div>
                                </div>
                            </div>
                            {
                                timeArr?.slice(0, -1).map((time:string,index:number)=>
                                    <button type="button" style={{"color":"white"}} className="btn btn-info my-2 px-2 me-1" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Top popover"
                                            key={index}  onClick={() => {
                                                            setStartTime(time);
                                                            setEndtime(timeArr[index + 1]);
                                                        }}>
                                        {time} ~ {timeArr[index + 1]}
                                    </button>
                                )
                            }
                            <div className="d-grid gap-2 my-4">
                                <button className="btn btn-info" type="button" style={{"color":"white"}} onClick={()=>reserve}>예약하기</button>
                            </div>
                    </div>
                        {/* 댓글 */}
                        <section>
                            <div className="card bg-light  my-4">
                                <div className="card-body" >
                                    
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