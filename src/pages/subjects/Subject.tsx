import { useEffect, useState } from 'react'
import { TaskInterFace } from '../../types/interface'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiTrophyCup } from "react-icons/gi";
import cls from "./subject.module.scss"
import http from '../../server/http';
import { useAppSelector } from '../../hooks/hook';
import { useNavigate } from 'react-router-dom';

function Subject() {

  const [arr, setArr] = useState<TaskInterFace[]>([])
  let id = useAppSelector(state => state.langId.id);

  
  let token = useAppSelector(state => state.islogged.token)
  
   let navigate = useNavigate()
  
  
   const handleClick = (taskid:number) =>{
     const task = arr.find(task => task.id === taskid);
     navigate(`/languages/${id}/problem`,{ state:task})
     
   }




  useEffect(() => {
    http.get(`/section/by-language-id/${id}`, {
      headers: {
        Authorization: `Bearer ` +
          `${token}`
      }
    })
      .then(response => setArr(response.data.data))
  }, [id, token]);

  const [isActive, setIsActive] = useState(true);

 

  return (
    <div className={cls.subject}>
      <div className={cls.box}>
        {arr.map((task, index) => {
          return (
            <div className={cls.card} key={index}  onClick= {() => handleClick(task.id)}>
              <div className={cls.title}>
                <h3>{task.title}</h3>
                <div> 
                  
                  <i className={cls.filledIcon}><AiFillStar /></i>
                  <i className={cls.filledIcon}><AiFillStar /></i>
                  <i className={cls.filledIcon}><AiFillStar /></i>
                  <i className={cls.filledIcon}><AiFillStar /></i>
                  <i className={cls.unfilled}><AiOutlineStar /></i>

                </div>
              </div>

              <p className={cls.text} >{task.description}</p>
              <div className={cls.task}>
                <i className={cls.trophy}><GiTrophyCup /></i>
                <p>Task</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className={cls.pagination}>
        <div onClick={() => setIsActive(true)} className={cls.arrows}>{`<<`}</div>
        <div className={isActive ? cls.active : ""} onClick={() => setIsActive(true)}>1</div>
        <div className={isActive ? "" : cls.active} onClick={() => setIsActive(false)}>2</div>
        <div onClick={() => setIsActive(false)} className={cls.arrows}>{">>"}</div>

      </div>

    </div>
  )
}

export default Subject