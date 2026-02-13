import {apiClient} from "../../http-commons";
import {useMutation, useQueryClient} from "@tanstack/react-query";

function useRoomDelete(){
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async(no:number) => {
            return await apiClient.delete(`/room/delete?no=${no}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["room_list"]});
        }
    });
    return mutation;
}

export default useRoomDelete;