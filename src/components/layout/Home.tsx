import { useQuery } from '@tanstack/react-query';
import {Fragment} from 'react'
import { RoomData, RoomItem } from '../../commons/commonsData';
import { apiClient } from '../../http-commons';
import { Link } from 'react-router';

function Home(){

    const {isLoading, isError, error, data} = useQuery<RoomData>({
        queryKey:['room_top3'],
        queryFn: async() => {
            const res = await apiClient.get(`/main/hitTop3`)
           
            return res.data;
        },
        staleTime: 0,
        refetchOnMount: 'always'
    })

    if(isLoading) {
        return <h1 className={"text-center"}>Loading ...</h1>
    }
    if(isError) {
        return <h1 className={"text-center"}>Error발생 : {error?.message}</h1>
    }

    return (
        <Fragment>
            <header className="bg-dark py-5">
                <div className="container px-5">
                    <div className="row gx-5 align-items-center justify-content-center">
                        <div className="col-lg-8 col-xl-7 col-xxl-6">
                            <div className="my-5 text-center text-xl-start">
                                <h1 className="display-5 fw-bolder text-white mb-2">Prenotare<br/>회의실 예약을 가장 간단하게</h1>
                                <p className="lead fw-normal text-white-50 mb-4">공간을 찾고, 선택하고, 바로 예약하세요.<br/>
                                    회사와 팀을 위한 스마트 회의실 예약 플랫폼</p>
                                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                    <a className="btn btn-outline-light btn-lg px-4" href="/room/list">구경하기</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                            <img className="img-fluid rounded-3 my-5" src="/imgs/Main.jpeg" alt="..."/>
                        </div>
                    </div>
                </div>
            </header>


        <div className="py-5 bg-light" id="features">
            <div className="container px-5 my-5">
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-10 col-xl-7">
                        <div className="text-center">
                            <div className="fs-4 mb-4 fst-italic">
                                "사용자가 편하게 사용할 수 있는 서비스를 만드는 것이<br/> 
                                제가 가장 중요하게 생각하는 개발입니다."
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                
                                <div className="fw-bold">
                                    서동현
                                    <span className="fw-bold text-primary mx-1">/</span>
                                    Web Developer
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section className="py-5">
            <div className="container px-5 my-5">
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-8 col-xl-6">
                        <div className="text-center">
                            <h2 className="fw-bolder">조회수 Top 3</h2>
                            <p className="lead fw-normal text-muted mb-5">지금 가장 많은 관심을 받고 있는 회의실 룸 입니다.</p>
                        </div>
                    </div>
                </div>
                <div className="row gx-5">
                    {
                        data?.list && data?.list.map((room:RoomItem, index:number) =>{
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

                        
                        return(
                            <div className="col-lg-4 mb-5">
                                <div className="card h-100 shadow border-0">
                                    <img className="card-img-top" src={getImageUrl(room.thumbnail)} style={{"height": "282px", "width": "376px"}}/>
                                    <div className="card-body p-4">
                                        <div className={`badge ${color} bg-gradient rounded-pill mb-2`}>{roomStatus}</div>
                                        <Link className="text-decoration-none link-dark stretched-link" to={`/room/detail/${room.no}`}><h5
                                            className="card-title mb-3">{room.name}</h5></Link>
                                        
                                    </div>
                                    <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                                        <div className="d-flex align-items-end justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className="small">
                                                    <div className="fw-bold">최대 이용 인원 : {room.personnel}</div>
                                                    <div className="text-muted">이용 시간
                                                        : {room.opentime} ~ {room.closetime} | 조회수 : {room.hit}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}
                        )
                    }
                    
                </div>

            </div>
        </section>
    </Fragment>
)
}

export default Home;