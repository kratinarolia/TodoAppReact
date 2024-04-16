import logo from './logo.svg';
import'./App.css';
import { useState } from 'react';
import TodoListItem from './TodoListItem.js';
import style from './my-style.module.css';

var count = 1

function App() 
{
  const [editingFlag, setEditingFlag ] = useState (-1)
  const [selectedFilter, setSelectedFilter] = useState ("incomplete")
  var [todo, setTodo] = useState([
  {
    id: count++,
    title: "Complete our HW",
    completed: false
  },
  {
    id: count++,
    title: "Complete assigment",
    completed: true
  },
  {
    id: count++,
    title: "Revice our daily work",
    completed: false
  },
  {
    id: count++,
    title: "Need to go to the shoping ",
    completed: false
  }
  ])

  const addTodo = () =>
  {
    console.log("Add todo")

    const todoText = document.getElementById("todoInput").value
    let todoObject =
    {
      id: count++,       //integer
      title:todoText,   //datatype string
      completed: false       // boollean
    }
    console.log (" todoText: "+todoText)
    todo.push (todoObject)
    setTodo([...todo])     //spreader operator[...todo]
  }


  console.log("Length of Todo",todo.length)
  const deleteTodo =(id) =>
  {
    console.log("Delete todo id", id)
    todo = todo.filter(todoTemp =>
      {
        if (id === todoTemp.id)
        {
          return false
        }
        else
        {
          return true
        }
      })
      setTodo([...todo])
  }

  const checkedChange = (id) =>
  {
    console.log("checkedChange id: ", id)
    todo = todo.map(todoTemp =>
      {
        if (id=== todoTemp.id)
        {
          //updated completed property
          todoTemp.completed = !todoTemp.completed
        }
        return todoTemp
      })
      setTodo([...todo])
  }

  const editTodo = (id) =>
  {
    console.log("editTodo")
    setEditingFlag(id)
  }

  const saveEditedTodo = (id)=>                                                         
  {
    console.log("saveEditedTodo")
    let updatedTodoText = document.getElementById("editingTodo").value
    todo = todo.map(todoTemp =>
      {
        if(todoTemp.id === id)
        {
          todoTemp.title = updatedTodoText
        }
        return todoTemp
      })
     setTodo([...todo])
     setEditingFlag(-1) 
  }

  // const divStyle ={
  //   backgroundColor: "#A7F24E",
  //       margin: "10px",
  //       padding:"10px"
  //     }


  const handleFilter =(filterType) =>
  {
    // console.log("Filter clicked")
    switch(filterType)
    {
      case "incomplete":
        console.log("incomplete executed")
        setSelectedFilter("incomplete")
        break;
      case "completed":
        console.log("complete executed")  
        setSelectedFilter("completed") 
        break;
      case "all":
        console.log("all executed")
        setSelectedFilter("all")
        break;
      default:  
    }

  }

  return (
    // <div style ={ divStyle}>
      <div id='parentDiv'>    
        <h1 className={style.header}>Todo App</h1>
        <div>
          <label onClick={()=>handleFilter("incomplete")}>Incomplete</label> |
          <label onClick={()=>handleFilter("completed")}>Completed</label> |
          <label onClick={()=>handleFilter("all")}>All</label>
        </div>
        <input id= "todoInput" type = "text" placeholder='Add your todo here...'/>
        <button onClick={addTodo}>Add</button><br/>
        {
          todo.map(todoTemp =>                    //map work:-itrate or updated array return 
            {
              switch(selectedFilter)
              {
                case "incomplete":
                  if(!todoTemp.completed)
                  {
                    return <TodoListItem
                      todoTemp={todoTemp}
                      editingFlag={editingFlag}
                      checkedChange={checkedChange}
                      deleteTodo={deleteTodo}
                      saveEditedTodo={saveEditedTodo}
                      editTodo={editTodo}/>  
                  }
                  break;
                case "completed":
                  if(todoTemp.completed)
                  {
                    return <TodoListItem
                      todoTemp={todoTemp}
                      editingFlag={editingFlag}
                      checkedChange={checkedChange}
                      deleteTodo={deleteTodo}
                      saveEditedTodo={saveEditedTodo}
                      editTodo={editTodo}/>  
                  }
                  break;
                case "all":
                
                  return <TodoListItem
                    todoTemp={todoTemp}
                    editingFlag={editingFlag}
                    checkedChange={checkedChange}
                    deleteTodo={deleteTodo}
                    saveEditedTodo={saveEditedTodo}
                    editTodo={editTodo}/>  
                
                break;
              }

            })
        }
      </div>
    );
}
export default App;
