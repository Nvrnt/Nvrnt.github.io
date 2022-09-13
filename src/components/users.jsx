import React, {useState} from "react";
import api from "../api"
import 'bootstrap/dist/css/bootstrap.min.css'

 const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (tableRow) => {
     setUsers(prevState=>prevState.filter(user=>user!==tableRow))
    }
    
    const renderPhrase = () => {
      if (users.length > 4 || users.length == 1) {
     return  `${users.length} человек тусанет с тобой сегодня`
      } else if (users.length <=4 && users.length > 1) {
     return   `${users.length} человека тусанет с тобой сегодня`
      } else {
     return  <span className="badge rounded-pill bg-danger">Никто не тусанёт с тобой сегодня</span>
      }   
    }

  console.log(users)
  let person = users.map((user) => {
  return <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.qualities.map((quality) => {
              const setColor = () => {
                let color = `badge m-1 bg-${quality.color}`
               return color
              }
              return <span key={quality._id} className= {setColor()}>{quality.name}</span>
            })}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td><button className ="badge rounded-pill bg-danger" 
            onClick = {() => handleDelete(user)}>Удалить</button></td>
         </tr>;
});

let classes = "badge rounded-pill "
classes+=users.length===0?"bg-danger":"bg-primary"
if (users.length > 0) {
return (
  <>
  <span className={classes}>{renderPhrase()}</span>
  
   <table className = "table table-bordered">
   <thead>
    <tr>
      <th scope="col">Имя</th>
      <th scope="col">Качества</th>
      <th scope="col">Профессия</th>
      <th scope="col">Встретился раз</th>
      <th scope="col">Оценка</th>
    </tr>
  </thead>
  <tbody>
     {person}
  </tbody>
</table>
</>
)
} else {
  return (
  <>
  <span className={classes}>{renderPhrase()}</span>
  </>
  )
}
}
export default Users

