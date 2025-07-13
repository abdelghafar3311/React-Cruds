
/*
  * name is name product you want create it
  * typeData is what kind data, Is from array or object - data is your data create
  * compare is array type and is basics data
  * result is must be object make from data and setData
*/

const useComparison = ({name,typeData,compare}) => {
    let states = false;
    let message = "";
    if(typeData === "object") 
    {
        const exists = compare.some(items => items.name.toLowerCase() === name.toLowerCase());
        if(exists){
            states = true;
            message = "Warning name already exists in database";
        } else {
            states = false;
            message = "Success Work";
        }
    } else if(typeData === "array") 
    {
        let error = false;
        let index = [];
        let main_state_error = false
        for(let i_one = 0;i_one < name.length ; i_one++) {
            for(let i_two = 0;i_two < name.length; i_two++) {
                if(i_one !== i_two) {
                    if(name[i_one].name.toLowerCase() === name[i_two].name.toLowerCase()) {
                        error = true;
                        index.push(i_two);
                    }
                }
            }
        }

        if(error === false) {
            for(let i = 0;i < name.length;i++) {
                for(let i_t = 0;i_t < compare.length;i_t++) {
                    if(name[i] === compare[i_t]) {
                        main_state_error = true;
                        index.push(i);
                    }
                }
            }

            if(main_state_error) {
                states = main_state_error;
                message = {mes: "! Some names in exists in main database",index: index};
            } else {
                states = main_state_error;
                message = {mes: "Success Process",index: index};
            }
            
        } else {
            states = error;
            message = {mes: "! Some names is repeated and this not allow", index: index};
        }
        
        // next work is compare array in array ,ok.
    }else if(typeData === "change") {
        // states = true;
        // the problem  is name when change findIndex change to this name and make it is 
        const findNameFormData = compare.findLastIndex(items => items.name === name.nameRight)
        const exists = compare.some(items => items.name.toLowerCase() === name.nameChange.toLowerCase());
        const typeExists = compare[findNameFormData === -1? 0 : findNameFormData].name === name.nameChange;
        // console.log("type exists: ",typeExists);
        // console.log("exists: " , exists);
        // console.log("find index: " , findNameFormData);
        // message = `Name: ${compare[findNameFormData === -1? 0 : findNameFormData].name}`
        if(exists){
            if(typeExists) {
                states = false;
                message = "Success Change Work";
            } else {
                states = true;
                message = "Warning name already exists in database";
            }
            
        } else {
            states = false;
            message = "Success Change Work";
        }
        // here problem

    } else {
        states = true;
        message = "typeData is required"
        throw new Error("typeData is required");  
    }

    return {states,message}
}

/**
 * to work make useState value type object (error && message)
 * then put in result
*/

export default useComparison;