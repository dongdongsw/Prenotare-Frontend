export interface RoomData{
    totalpage:number;
    curpage:number;
    startPage:number;
    endPage:number;
    list:RoomItem[];
}

export interface RoomItem{
    no:number;
    name:string;
    content:string;
    personnel:number;
    thumbnail:string;
    images:string;
    status:string;
    hit:number;
    opentime:string;
    closetime:string;
    createdAt:string;
    updatedAt:string;
    imageList:string[];
}

export interface LoginData{
    no:number;
    id:string;
    name:string;
    msg:string;
    role:string;
}

export interface reserveData{
    users_no:number;
    room_no:number;
    startTime:string;
    endtTime:string;
    reserveDate:string;
}