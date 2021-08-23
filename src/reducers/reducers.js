import * as actionType from '../toDos/action'
const reducer = (state= initialState,action) => {
    switch(action.type){
        case actionType.ONCHANGE:

            const newNote = {
                text:action.value,
                active:true,
                id:state.notes.length+1
            }
            return {...state,note:newNote}


        case actionType.ADD:
           if(state.note.text){
            return {...state,notes:state.notes.concat(state.note),  note:{text:''}}
           }
           return state
     
        case actionType.DELETE:
            const modifiedNotes = []
            // filter didn't use to to reset id, otherwise id canbe reapreated when creating id using notes length
            state.notes.forEach( note => {
                if(note.id===action.itemId) return
                const modifiedNote = {
                    text: note.text,
                    active:note.active,
                    id:modifiedNotes.length+1
                }
                modifiedNotes.push(modifiedNote)
            })
            return { ...state, notes:modifiedNotes}

         case actionType.RESET:
            return initialState
        
        case actionType.ACTIVE:
            const modifiedActive = state.notes.map( note=>{
                if(note.id===action.itemId) return { text:note.text, active:!note.active, id:note.id}
                return note
            })
            return {...state,notes:modifiedActive}

         default:
    }
    return state
}

const initialState = {
    note:{text:''},
    
    notes:[
        { text:'note1',
        active:true,
        id:1
        },
        { text:'note2',
        active:true,
        id:2
        }
    ]
}


export default reducer