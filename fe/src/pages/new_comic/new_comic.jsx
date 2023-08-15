import './style.css';
import {FaHome} from "react-icons/fa"
import React,{useState} from "react"
function NewComic() {
  const AvatarImage='./avatar'
  const Username="tkl"
  const [input,setInput]=useState()
  const [selects,setSelects]=useState()
  const[Name,setName]=useState("")
  const[Author,setAuthor]=useState("")
  const[In_Progress, setIProg]=useState(true);
  const[Complete, setComplete]=useState(true);
  const[Drop, setDrop]=useState(true);
  const [value, setValue] = useState("") //description
  const[file,setFiles]= useState()
  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const handleResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `250px`;
  }
  return (
    
    <div className="App">
    
    <div className='Logo_background'></div>
    
    <div className='Gray_after'></div>
    <div className='Newcomics'>New Comics</div>
    
    
    <div className='Name'>Name</div>
    <input type="text" className="Nameinput" value={Name} onChange={(e)=>setName(e.target.value)}/>
    <div className='Author'>Author</div>
    <input type="text" className="Authorinput" value={Author} onChange={(e)=>setAuthor(e.target.value)}/>
    <div className='Type'>Type</div>
    <select value ={selects} onChange={(e)=>setSelects(e.target.value)}> 
            <option>Action</option>
            <option>Comedy</option>
            <option>Romance</option>
    </select>
    <div className='Date'>Date</div>
    <input type='Date' className='Dateinput'/>
    <div className='Status'>Status</div>
    
     
    <div className='Drop'> Drop</div>
    <div className='Description'> Description</div>
    
    <textarea value={value} onChange={handleChange} onInput={handleResize} className='commentbox'/>
    
    <div className='Cover'>Cover</div>
    <input className='Input_file' type='file' value ={file} onChange={(e)=>setFiles(e.target.value)}/>
    
    <button className='ButtonSave'>Save</button>
    <button className='ButtonCancel'>Cancel</button>
    
    <div className='Nav_menu'>
        <button className='Nav_button' ><FaHome/>Trang chủ</button>&nbsp;&nbsp;
        <button className='Nav_button' >Thể Loại</button>&nbsp;&nbsp;
        <button className='Nav_button'  >Trang chủ</button>
    </div>
    
    <input type="text"  placeholder='Nhập từ khóa tìm kiếm...' value ={input} onChange={(e)=>setInput(e.target.value)} />
    
    <div className="Logo">COMICSWORLD</div>
    
    
      <div className="Avatar">
        <img src={require(AvatarImage+'.jpg')} alt={"Avatar Image"}  class="rounded"/> 
      </div>
      
      <button className='Username'>{Username}</button>
      
    
    <input  className="checkbox1" type='checkbox' value={In_Progress} /> 
    <div className='inProgress'> In progress</div>
    <input className="checkbox2" type='checkbox' value={Complete} /> 
    <div className='Complete'> Complete</div>
    <input className="checkbox3" type='checkbox' value={Drop} />
    </div>
    
    
    
  );
}

export default NewComic;
