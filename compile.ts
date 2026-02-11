interface typeCheck{
    isError:boolean,
    type:string
}
function typeChecking(value:string, type:string):typeCheck{
    switch(type){
        case"Integer":
            return{
                isError:!(/^\d+\.?\d*$/.test(value)),
                type:type
            };
        case"String":
            return{ 
                isError:!(/^("|').*?("|')$/.test(value)),
                type:type
            };
        case"Boolean":
            return{
                isError:!(/^true|false$/.test(value)),
                type:type
            }
        case"Array":
            return{
                isError:!(/^\[.*\]$/.test(value)),
                type:type
            }
        case"Hash":
            return{
                isError:!(/^\{.*\}$/.test(value)),
                type:type
            }
        case "[]":
            return{
                isError:!(/^\[.*\]$/.test(value)),
                type:type
            }
        case "{}":
            return{
                isError:!(/^\{.*\}^/.test(value)),
                type:type
            }
        default:
            return{
                isError:true,
                type:type
            };
    }
}
export {typeChecking, typeCheck};