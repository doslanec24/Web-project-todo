import { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import Row from '../components/Row';
import { useUser } from '../context/useUser';

const url='http://localhost:3000'

function Home() {
  const{user}=useUser()
  const[task,setTask]=useState('');
  const[tasks,setTasks]=useState([]);

  useEffect(()=>{
    axios.get(url)
      .then(response=>{
        setTasks(response.data)
      }).catch(error=>{
        alert(error.response.data.error ? error.response.data.error: error)
      })
  },[])

  const addTask=()=>{
    const headers = { Authorization: `Bearer ${user.token}` }
    axios.post(url+'/create',{
      description: task
    },{headers})
    .then(response=>{
      setTasks([...tasks,{id: response.data.id,description: task}])
      setTask('');
    }).catch(error=>{
      alert(error.response.data.error ? error.response.data.error: error)
    })
    
  }

  const deleteTask = (id) => {
    const headers = { Authorization: `Bearer ${user.token}` }
    axios.delete(url+'/delete/'+id,{headers})
      .then(response=>{
        const withoutRemoved = tasks.filter((item)=>item.id !== id)
        setTasks(withoutRemoved)
      }).catch(error=>{
        alert(error.response.data.error ? error.response.data.error:error)
      })
  }

  return (
    <div id='container'>
      <h1>Todos</h1>
      <form>
        <input value={task} 
        onKeyDown={e => {if(e.key ==='Enter'){
          e.preventDefault()
          addTask()
        }}} 
        onChange={e => setTask(e.target.value)} 
        placeholder='Add new task'>
        </input>
      </form>
      <ul>
        {
          tasks.map(item =>(
            <Row key={item.id} item={item} deleteTask={deleteTask}/>
          ))
        }
      </ul>
    </div>
  );
}

export default Home;
