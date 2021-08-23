
import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actionType from './action'
class ToDos extends Component {



    render(){
        const {note,notes,onActive,onAdd,onChange,onDelete,onReset}= this.props
        const taskDone =notes.filter( note => note.active===false).length
        return (
          <div>
              <div>
                  <p>Add new note</p>
                  <button onClick = {onReset}>Reset</button>
                  <input type="text"   onChange = { event => onChange(event.target.value)} value={note.text} ></input> <button onClick  = {onAdd} >add</button>
                  <p>{note.text}</p>
              </div>
              <p> { notes.length>0 &&taskDone===notes.length? 'wow! mission accomplished, no pending task': `Total task:${notes.length}, completed task ${taskDone}`}</p>

            <h3> Notess</h3>
            <div>
                <ol>
                    {notes.map( note => <li  key = {note.id} >
                            <p onClick ={ ()=>onActive(note.id)} className = {note.active?'':'inactive-text'} >{note.text}</p>  
                            <button onClick={(id) => onDelete(note.id)}>Delete</button>
                        </li> )}
                </ol>
        </div> 
      
          </div>
        );
    
      }
}



const mapStateToProps = state =>{
    return {
       note:state.note,
        notes: state.notes
    }
  }
  
  const mapDispatchToProps = dispatch =>{
      return {
        onChange:  (value) =>dispatch({type: actionType.ONCHANGE, value:value}),
        onAdd:  () =>dispatch({type: actionType.ADD}),
        onActive: (id) =>dispatch({type: actionType.ACTIVE,itemId:id}),
        onStore:  () =>dispatch({type: actionType.STORE}),
        onDelete: (id) =>dispatch({type: actionType.DELETE, itemId:id}),
        onReset: () =>dispatch({type: actionType.RESET})
      }
  }

export default connect(mapStateToProps,mapDispatchToProps )(ToDos);

