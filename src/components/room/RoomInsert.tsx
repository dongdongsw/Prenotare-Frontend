import {Fragment, useRef, useState} from "react";
import {RoomItem, RoomData} from "../../commons/commonsData";
import {useQuery, useMutation} from "@tanstack/react-query";
import apiClient from "../../http-commons";

function RoomInsert() {
    const [name, setName] = useState<string>("");
    const [personnel, setPersonnel] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [opentime, setOpentime] = useState<string>("");
    const [closetime, setClosetime] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [imageList, setImageList] = useState<File[]>([]);

    const nameRef = useRef<HTMLInputElement>(null);
    const personnelRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const opentimeRef = useRef<HTMLInputElement>(null);
    const closetimeRef = useRef<HTMLInputElement>(null);
    const thumbnailRef = useRef<HTMLInputElement>(null);
    const imageListRef = useRef<HTMLInputElement>(null);

    const {mutate:RoomInsert} = useMutation({
        mutationFn: async () => {
            const res = await apiClient.post(`/room/insert`, {
                name,
                personnel,
                content,
                opentime,
                closetime
            });
            return res;
        }
    })

    // 이벤트 처리
    const insert=():void=>{
        if(!name.trim()){
            return nameRef.current?.focus();
        }
        if(!personnel.trim()){
            return personnelRef.current?.focus();
        }
        if(!content.trim()){
            return contentRef.current?.focus();
        }
        if(!opentime.trim()){
            return opentimeRef.current?.focus();
        }
        if(!closetime.trim()){
            return closetimeRef.current?.focus();
        }
        if(!thumbnail){
            return thumbnailRef.current?.focus();
        }
        if(!imageList){
            return imageListRef.current?.focus();
        }
        RoomInsert()
    }

    return(
        <Fragment>
            <section className="py-5 ">
                <div className="container px-5 col-md-9">
                    <div className="rounded-4 py-5 px-4 px-md-5 mb-2" style={{"backgroundColor":"#fff", "borderRadius":"15px", "boxShadow":"0 8px 24px rgba(0,0,0,0.06)"}}>
                        <div className="text-center mb-5">

                            <h1 className="fw-bolder">새로운 회의실 룸 만들기</h1>
                            <p className="lead fw-normal text-muted mb-0">이미지는 필수로 업로드 하셔야 합니다!</p>
                        </div>
                        <div className="row gx-5 justify-content-center">
                            <div className="col-lg-8 col-xl-7">
                                <form id="contactForm" data-sb-form-api-token="API_TOKEN">

                                    <div className="mb-4 row">
                                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">회의실 이름</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="inputPassword" placeholder="A회의실 룸"
                                                ref={nameRef} onChange={(e)=>setName(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="mb-4 row">
                                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">최대 인원</label>
                                        <div className="col-sm-10">
                                            <input type="number" className="form-control" id="inputPassword" placeholder="4"
                                                ref={personnelRef} onChange={(e)=>{setPersonnel(e.target.value)}}/>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">소개</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" ref={contentRef}
                                                  rows={3} placeholder="회의실에 대한 설명을 작성해주세요." onChange={(e) => setContent(e.target.value)}></textarea>
                                    </div>
                                    <div className="mb-4 row">
                                        <label htmlFor="inputPassword" className="col-sm-3 col-form-label">오픈/종료 시간</label>
                                        <div className="col-sm-4">
                                            <input type="time" className="form-control" id="inputPassword" placeholder="4"
                                                ref={opentimeRef} onChange={e => setOpentime(e.target.value)}/>
                                        </div>
                                        ~
                                        <div className="col-sm-4">
                                            <input type="time" className="form-control" id="inputPassword" placeholder="4"
                                                ref={closetimeRef} onChange={(e)=> setClosetime(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="mb-4 row">
                                        <label htmlFor="formFile" className="col-form-label col-sm-3">대표 사진 업로드</label>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="file" id="formFile" ref={thumbnailRef}
                                                onChange={
                                                    (e)=> {
                                                        if (e.target.files) {
                                                            setThumbnail(e.target.files[0])
                                                        }
                                                    }
                                                }
                                            />

                                        </div>
                                    </div>
                                    <div className="mb-4 row">
                                        <label htmlFor="formFile" className="col-form-label col-sm-3">상세 이미지 업로드</label>
                                        <div className="col-sm-9">
                                            <input className="form-control" type="file" id="formFileMultiple" multiple ref={imageListRef}
                                                onChange={
                                                    (e)=> {
                                                        if(e.target.files){
                                                            setImageList(Array.from(e.target.files))
                                                        }
                                                    }
                                                }
                                            />
                                        </div>
                                    </div>
                                </form>
                                <div className="d-grid gap-3 d-md-flex justify-content-md-center m-5">
                                    <button type="button" className="btn btn-outline-primary" onClick={insert}>작성</button>
                                    <button type="button" className="btn btn-outline-primary">취소</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </Fragment>
    )
}

export default RoomInsert;