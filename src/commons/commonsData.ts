export interface RoomData{
    totalpage:number;
    curpage:number;
    startPage:number;
    endPage:number;
    list:RoomItem[];
    reList:mypageReserveItem[];
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
    endTime:string;
    reserveDate:string;
}

export interface mypageReserveItem{

    no:number;
    status:string;
    reserveDate: string;   // LocalDate → string
    startTime: string;
    endTime: string;
    createdAt: string;

    users:{
        no:number;
    }

    room:{
        name:string;
        no:number;
        personnel:number;
        thumbnail:string;
        content:string;
    }
    
    
    
}