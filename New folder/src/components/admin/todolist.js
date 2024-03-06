import React,{useEffect,useState,useRef} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import './todo.css';
import AOS from 'aos';
import {GetAllTodo,PutTodoItem,CreateTodoItem,DeleteTodoItem, EmptyState} from '../../actions/action.js';
import {useSelector,useDispatch} from 'react-redux';
import ReactDOM from 'react-dom';

const TodoHandler=(props)=>{
	AOS.init();
	const [getState,setStateHandler]=useState('');
	const [refreshState,setRefreshState]=useState('fa fa-refresh');
	const [getTodo,settodo]=useState([]);
	const [puttodo,setputtodo] = useState([])
	const [getInputStyle,setInputStyle]=useState({});
	const [temptodo_id,settempid] =useState('')
	const [editable,seteditable] = useState("false")
	const [editMode,setEditMode] = useState("false")

	const [DeleteStyle,setDeleteStyle]=useState({});
	const dispatcher=useDispatch();
	const inputRef=useRef();

	const selector=useSelector(state=>state.crudHandler)

	useEffect(()=>{
		if(selector.delete_todo.status=="OK"){
			setTimeout(()=>{
				document.getElementById(selector.delete_todo.id).remove()			
				dispatcher(EmptyState())
			})
		}
		else if(selector.todo_list.status==="OK"){
			const filters = selector.todo_list.todo_list.filter(items=>{delete items['id']})
			settodo([...selector.todo_list.todo_list])
			dispatcher(EmptyState())			
		}else if(selector.add_todo.status == "OK"){
			const update_items = selector.add_todo
			update_items['todo_id']=Math.round(Math.random()*100000000).toString()

			console.log(update_items)
			settodo(previous=>[...previous,update_items])
		}else if(selector.update_todo.status == "OK"){
			
			seteditable("false")
			document.getElementById(selector.update_todo.todo_id).childNodes[0].removeAttribute("class")
		}

	},[selector])
	useEffect(()=>{
		if(navigator.userAgent.toString().toLowerCase().match(/android|iphone/g)){
			setInputStyle({width:'85%',fontSize:'5vw',border:'1px solid blue',outline:'1px solid blue'});
			ReactDOM.findDOMNode(inputRef.current).style.cssText="width:85%;font-size:5vw;border:1px solid blue;outline:1px solid blue";
		}
		dispatcher(GetAllTodo(localStorage.getItem('authorization')));
	},[])


	function DeleteTodo(e){
		let delete_id = null
		delete_id=e.target.parentElement.parentElement.getAttribute('id');
		if (delete_id == null){
			delete_id = e.target.parentElement.getAttribute("id")
		}
		settempid(delete_id)
		dispatcher(DeleteTodoItem({authorization:localStorage.getItem('authorization'),'todoid':delete_id}))
	}	
	function UpdateTodo(e){
		e.target.parentElement.parentElement.childNodes[0].setAttribute("class","editable-border")
		if(e.target.getAttribute("class").includes("fa-edit")){
			e.target.setAttribute("class","fa fa-refresh")
		}else{
			e.target.setAttribute("class","fa fa-edit")
			const parentHandler=e.target.parentElement.parentElement
			dispatcher(PutTodoItem({authorization:localStorage.getItem('authorization'),
				'todoid':parentHandler.getAttribute('id'),
				'name':parentHandler.childNodes[0].innerHTML}))
		}
		seteditable("true")

		
	}	
	function CreateTodo(e){

		if(inputRef.current.value != ""){
			const creater=document.createElement("div");
			document.querySelector('.card-body').scrollTo({top:100000});
			dispatcher(CreateTodoItem({authorization:localStorage.getItem('authorization'),'todoID':Math.round(Math.random()*10000000),'name':inputRef.current.value}));
			inputRef.current.value="";
		}
	}
	//const updater=useSelector(state=>state.crudHandler.add_todo)
	return(
				<div id="main_todo">
					<div className="card" id="todcard">
						<div className="card-header">
							<center><h4>TodoList</h4>
							<div className="form-group">
								<input type="text"
									ref={inputRef}
									style={getInputStyle}
								 placeholder="Item Name" id="todinput"/>
								<a className="btn btn-default"><i className="fa fa-plus"
								 data-toggle="tooltip" title="add" data-placement="top"
								 onClick={CreateTodo}></i></a>
							</div></center>
						</div>
						<div className="card-body">
							<ul className="list-group d-flex">
								{getTodo?.map(todo=>{
									return(
										<li className="list-group-item" key={todo.todo_id} id={todo.todo_id} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
											<span suppressContentEditableWarning={true} contentEditable={editable == "true" ? "true": "false"} style={{width:'200px',wordBreak:'break-all'}}>{todo.name}</span>
											<div className='edit-delete-buttons d-flex align-items-center'>
												<i onClick={UpdateTodo}  data-toggle="tooltip" title="edit" data-placement="top" className={"fa fa-edit"} ></i>
												<i onClick={DeleteTodo}  data-toggle="tooltip" title="delete" data-placement="top" className="fa fa-trash"></i>
												</div>												
										</li>
									)
								})}								
							</ul>

						</div>
					</div>
				</div>
		);
}
export default TodoHandler;