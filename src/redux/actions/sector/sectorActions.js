import { addSector, deleteSector, getSectors, updateSector } from "../../../api";
import { ADD_SECTOR_SUCCESS, DELETE_SECTOR_SUCCESS, GET_SECTORS_FAILURE, GET_SECTORS_REQUEST, GET_SECTORS_SUCCESS, UPDATE_SECTOR_SUCCESS } from "../../actionsType/sector";

export const  fetchSectorsRequest =()=>({
    type: GET_SECTORS_REQUEST
});

export const fetchSectorsSuccess=(sectosr)=>({
    type:GET_SECTORS_SUCCESS,
    payload: sectosr
});

export const fetchSectorsFailure=(error)=>({
    type: GET_SECTORS_FAILURE,
    payload: error
});
export const updateSectorSuccess=(sector)=>({
    type: UPDATE_SECTOR_SUCCESS,
    payload: sector,
})

export const deleteSectorSuccess=(sector)=>({
    type: DELETE_SECTOR_SUCCESS,
    payload: sector,
})

export const addSectorSuccess=(sector)=>({
    type: ADD_SECTOR_SUCCESS,
    payload: sector,
})

export const GetSectors=()=>{
    return async (dispatch)=>{
        dispatch(fetchSectorsRequest());
        try{
            const response = await getSectors();
            const data=response.data;
            dispatch(fetchSectorsSuccess(data));
        } catch(error){
            dispatch(fetchSectorsFailure(error.message));
        }
    }
}
export const AddSector = (newSector) => {
    return async (dispatch) => {
      dispatch(fetchSectorsRequest());
      try {
        const response = await addSector(newSector);
        const data = response.data;
        dispatch(addSectorSuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchSectorsFailure(errorMessage));
      }
    };
  };
  
  
  export const UpdateSector = (id,updatedSector) => {
    return async (dispatch) => {
      dispatch(fetchSectorsRequest());
      try {
        const response = await updateSector(id ,updatedSector);
        const data = response.data;
        dispatch(updateSectorSuccess(data));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchSectorsFailure(errorMessage));
      }
    };
  };
  
  export const DeleteSector = (id) => {
    return async (dispatch) => {
      dispatch(fetchSectorsRequest());
      try {
        await deleteSector(id);
        dispatch(deleteSectorSuccess(id));
      } catch (error) {
        const errorMessage = error.response?.status === 500 ? 'Server Error' : error.message;
        dispatch(fetchSectorsFailure(errorMessage));
      }
    };
  };