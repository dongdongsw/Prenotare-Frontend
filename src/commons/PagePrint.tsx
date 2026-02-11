import {RoomData} from "./commonsData";
import {FC} from "react";

interface pagePrintProps{
    data: RoomData;
    setCurpage:(page:number) => void;
}

const PagePrint:FC<pagePrintProps> = ({data, setCurpage})=>{
    const {curpage, totalpage, startPage, endPage} = data;
    const pageArr = [];

    const prev = () => setCurpage(startPage - 1);
    const pageChange = (page:number) => setCurpage(page);
    const next = () => setCurpage(endPage + 1);

    if(startPage > 1){
        pageArr.push(
            <li className="page-item">
                <a className="page-link nav-link" onClick={prev}>&laquo;</a>
            </li>
        );
    }
    for(let i = startPage; i < totalpage; i++){
        pageArr.push(
            <li className={i === curpage ? 'page-item active' : 'page-item'}>
                <a className="page-link nav-link" onClick={()=>pageChange(i)}>
                    {i}
                </a>
            </li>
        )
    }

    if(endPage < totalpage){
        pageArr.push(
            <li className="page-item">
                <a className="page-link nav-link" onClick={next}>&raquo;</a>
            </li>
        )
    }

    return (
        <ul className="pagination justify-content-center" style={{"cursor":"pointer"}}>
            {pageArr}
        </ul>
    )
}

export default PagePrint;