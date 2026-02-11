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
    personnel:string;
    thumbnail:string;
    images:string;
    status:string;
    hit:number;
    opentime:string;
    closetime:string;
    createdAt:string;
    updatedAt:string;
}