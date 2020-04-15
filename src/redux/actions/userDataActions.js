export const SET_DATA = "SET_DATA";
export const RESET_DATA = "RESET_DATA";

export const setData = (data) => ({
   type: SET_DATA,
   data: data
});

export const resetData = () => ({
    type: RESET_DATA
});
