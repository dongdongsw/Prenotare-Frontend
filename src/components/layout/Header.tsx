import {Fragment, useEffect, useRef, useState} from "react";
import { LoginData } from "../../commons/commonsData";
import { useMutation } from "@tanstack/react-query";
import {apiClient} from "../../http-commons";
import { AxiosError, AxiosResponse } from "axios";

function Header(){
    const [login, setLogin] = useState<boolean>(false);
    const [id,setId] = useState<string>("");
    const [pwd,setPwd] = useState<string>("");
    
    const idRef = useRef<HTMLInputElement>(null);
    const pwdRef = useRef<HTMLInputElement>(null);

    const {mutate:loginOk} = useMutation({
        mutationFn: async() =>{
            const res : AxiosResponse<LoginData> = await apiClient.get(`/user/login/${id}/${pwd}`)
            return res?.data
        },
        onSuccess:(data:LoginData)=>{
            if(data?.msg === 'NOID'){
                alert("아이디가 존재하지 않습니다.");
                setId('');
                setPwd('');
                idRef.current?.focus();
            }
            else if(data?.msg === 'NOPWD'){
                alert("비밀번호가 일치하지 않습니다.");
                setPwd('');
                pwdRef.current?.focus();
            }
            else if(data?.msg === 'OK' && data.id && data.name){
                window.sessionStorage.setItem('id',data?.id);
                window.sessionStorage.setItem('name',data?.name);
                setLogin(true);
                window.location.reload();
            }
        },
        onError: (error:AxiosError) => {
            console.log("loginError",error?.message);
        }
    });

    useEffect(()=>{
        if(sessionStorage.getItem("id")){
            setLogin(true)
        }
    }, [])

    const userLogin= () =>{
        if(!id || id.trim() === ""){
            idRef.current?.focus()
            return
        }
        if(!pwd || pwd.trim() === ""){
            pwdRef.current?.focus()

            return
        }
        loginOk() 
    }

    const userLogout = () => {
        window.sessionStorage.clear();
        setId('');
        setPwd('');
        setLogin(false);
        window.location.reload();
    }


    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container px-5">
                    <a className="navbar-brand" href={"/"}>Prenotare</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation"><span
                        className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><a className="nav-link" href={"/"}>Home</a></li>
                            <li className="nav-item"><a className="nav-link" href={"/room/list"}>회의실</a></li>
                            {
                                login?(
                                    <li className="nav-item"><a className="nav-link" href="contact.html">마이페이지</a></li>
                                ):(
                                    <li className="nav-item"><a className="nav-link" href="contact.html"></a></li>
                                )
                            }
                        </ul>
                        {
                                !login?(
                                    <div className={"login ms-4"} style={{"color":"white"}}>
                                        ID : <input type={"text"} size={10} className={"form-text"} ref={idRef} value={id} onChange={(e:any)=>setId(e.target.value)}/>
                                        &nbsp;
                                        PW : <input type={"password"} size={10} className={"form-text"} ref={pwdRef} value={pwd} onChange={(e:any)=>setPwd(e.target.value)}/>
                                        &nbsp;
                                        <button className={"btn-sm btn-primary"} onClick={userLogin}>로그인</button>

                                    </div>):(
                                    <div className={"login"} style={{"color":"white"}}>
                                        {window.sessionStorage.getItem("name")}님 로그인 중입니다.
                                        <button className={"btn-sm btn-danger"} onClick={userLogout}> 로그아웃 </button>
                                    </div>
                                )

                            }
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default Header;