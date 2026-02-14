import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {Fragment, useState} from "react";
import { apiClient } from "../../http-commons";
import { mypageReserveItem} from "../../commons/commonsData";
import { useNavigate } from "react-router";
import PagePrint from "../../commons/PagePrint";

function Mypage(){
    const queryClient = useQueryClient();
    const no = Number(window.sessionStorage.getItem('no'));
    const nav = useNavigate();
    const [curpage, setCurpage] = useState<number>(1);
    
    const {mutate:reserveCancel} = useMutation({
        mutationFn: async(no:number) => {
            return await apiClient.delete(`/mypage/reserve/cancel/${no}`);
        },
        onSuccess: async (res)=>{
            queryClient.invalidateQueries({
                queryKey: ["my_room", curpage, no]
            });
            if(res.data === "SUCCESS"){
                alert("예약 취소가 완료되었습니다.")
            }
        },
        onError: async () =>{
                alert("예약 취소가 실패하였습니다.")
        }
    })

    const {isLoading, isError, error, data} = useQuery({
        queryKey:["my_room", curpage, no],
        queryFn: async() => {
            const res = await apiClient.get(`/mypage/list/${curpage}/${no}`)
            return res.data
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
            <section style={{"height": "100%", "minHeight":"80.7vh"}}>
                <div className="container px-5 my-5">
                    <div className="row gx-5 justify-content-start">
                        <div className="col-lg-8 col-xl-12">
                            {
                                data?.reList && data?.reList.map((reserve:mypageReserveItem, index:number)=>{
                                    const getImageUrl = (img:string)=>{
                                        if(!img){
                                            return "";
                                        }
                                        if(img.startsWith("http")){
                                            return img
                                        }
                                        return `http://localhost:9090/${img}`
                                    }

                                    const color =
                                        reserve.status === "RESERVATION"
                                            ? "bg-warning"
                                            : "bg-danger";

                                    return(
                                        <div className="card mb-3" key={index} style={{"maxWidth": "100%", "cursor":"pointer", "position": "relative"}} 
                                            onClick={() => 
                                            nav(`/room/detail/${reserve.room.no}`)}>
                                            {
                                                reserve.status==="RESERVATION"?(

                                                <button type="button" className="btn btn-warning" style={{"position":"absolute", "top":"5%", "right":"1%"}}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        reserveCancel(reserve.no)
                                                    }}>예약 취소
                                                </button>
                                                ):(
                                                 <button type="button" className="btn btn-danger" style={{"position":"absolute", "top":"5%", "right":"1%"}}
                                                   disabled>취소 완료
                                                   </button>
                                                )
                                            }
                                            <div className="row g-0">
                                                <div className="col-md-4">
                                                    <img src={getImageUrl(reserve?.room.thumbnail)} className="img-fluid rounded-start" alt="..." style={{"minHeight":"304px"}}/>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{reserve.room.name}</h5>
                                                        <div className={`badge ${color} bg-gradient rounded-pill mb-2`}>{reserve.status}</div>
                                                        <p className="card-text" style={{"textOverflow":"ellipsis", "overflow":"hidden", "whiteSpace":"nowrap"}}>{reserve.room.content}</p>
                                                        <p className="card-text"><small className="text-body-secondary">최대 이용 인원 : {reserve.room.personnel}</small></p>
                                                        <p className="card-text"><small className="text-body-secondary">예약일 : {reserve.reserveDate}</small></p>
                                                        <p className="card-text"><small className="text-body-secondary" style={{"marginBottom":"0rem"}}>예약 시간 : {reserve.startTime} ~ {reserve.endTime}</small></p>
                                                        <p className="card-text"><small className="text-body-secondary">예약 등록일 : {reserve.createdAt}</small></p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    )
                                }
                                )
                            }
                            
                        </div>
                    </div>
                    <nav aria-label="Page navigation example">
                    {
                        data &&
                        <PagePrint data={data} setCurpage={setCurpage} />
                    }
                    </nav>
                </div>
            </section>
        </Fragment>
    )
}

export default Mypage;