import {Fragment, useState} from "react";
import { Link } from "react-router";
import {RoomData, RoomItem} from "../../commons/commonsData";
import {useQuery} from "@tanstack/react-query";
import {apiClient} from "../../http-commons";
import PagePrint from "../../commons/PagePrint";


function RoomList(){

    const [curpage, setCurpage] = useState<number>(1);
    const {isLoading, isError, error, data} = useQuery<RoomData>({
        queryKey: ['room_list' + curpage],
        queryFn: async()=>{
            const res = await apiClient.get(`/room/list/${curpage}`);

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



    return(
        <Fragment>
            <section className="py-5">
                <div className="container px-5">
                    <h2 className="fw-bolder fs-5 mb-4" style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center" }}>
                        <p>회의실 목록</p>
                        <a className="btn btn-outline-primary s-5 mb-4" href={"/room/insert"}>룸 만들기</a>
                    </h2>

                    <div className="row gx-5">
                        {

                            data?.list && data?.list.map((room: RoomItem, index: number) => {
                                    const color =
                                        room.status === "AVAILABLE"
                                            ? "bg-primary"
                                            : "bg-warning";

                                    const roomStatus =
                                        room.status === "AVAILABLE"
                                            ? "이용 가능"
                                            : "이용 불가";

                                    const getImageUrl = (img:string)=>{
                                        if(!img){
                                            return "";
                                        }
                                        if(img.startsWith("http")){
                                            return img
                                        }
                                        return `http://localhost:9090/${img}`
                                    }

                                    return (
                                        <Fragment key={index}>
                                            <div className="col-lg-4 mb-5">
                                                <div className="card h-100 shadow border-0">
                                                    <img className="card-img-top" src={getImageUrl(room.thumbnail)} alt="..."
                                                         style={{"height": "282px", "width": "376px"}}/>
                                                    <div className="card-body p-4">
                                                        {/* 방 이용 가능한 상태 넣기 */}
                                                        <div
                                                            className={`badge ${color} bg-gradient rounded-pill mb-2`}>{roomStatus}</div>
                                                        <Link className="text-decoration-none link-dark stretched-link"
                                                              to={`/room/detail/${room.no}`}>
                                                            <div className="h5 card-title mb-3">{room.name}</div>
                                                        </Link>
                                                    </div>
                                                    <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                                                        <div className="d-flex align-items-end justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="small">
                                                                    <div className="fw-bold">최대 이용 인원 : {room.personnel}</div>
                                                                    <div className="text-muted">이용 시간
                                                                        : {room.opentime} ~ {room.closetime}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )
                                }
                            )
                        }
                    </div>
                    {/* 페이지 네이션 넣기 */}
                    <nav aria-label="Page navigation example">
                        {
                            data &&
                            <PagePrint data={data} setCurpage={setCurpage}/>
                        }
                    </nav>
                </div>
            </section>

        </Fragment>
    )
}

export default RoomList;