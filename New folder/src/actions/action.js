
export const Loginhandler=(data0)=>{
	return (dispatch)=>{
		const loginsend=({
			method:'POST',
			headers:{'Content-Type':'application/json','Origin':`${process.env.REACT_APP_HOST_URL}`},
			body:JSON.stringify({username:data0.loginemail,password:data0.loginpassword})
		});
		async function Senddata(){
			const a=await fetch(`${process.env.REACT_APP_HOST_URL}/user/api/login`,loginsend);
			return await a.json();
			
		}
		Senddata().then((response)=>{
			if(response.ok){
				dispatch({
					type:'LOGIN_USER',
					payload:response
				});
			}
			dispatch({
				type:'LOGIN_USER',
				payload:response
			});
		});
	}
}
export const Registerhandler=(data1)=>{
	return (dispatch)=>{
		const registersend=({
			method:'POST',
			headers:{'Content-Type':'application/json','Origin':`${process.env.REACT_APP_HOST_URL}`},
			body:JSON.stringify(data1)
		});
		async function Registerdata(){
			const b=await fetch(`${process.env.REACT_APP_HOST_URL}/user/api/new`,registersend)
			return await b.json();
		}
		Registerdata().then((response)=>{
			if(response.ok){
				dispatch({
					type:'REGISTER_USER',
					payload:response
				});
			}
				dispatch({
					type:'REGISTER_USER',
					payload:response
			});
		});
	}
}

export const GetAllTodo=(data3)=>{
	return(dispatch)=>{
		const apply=({
			method:'GET',
			headers:{'Content-Type':'application/json','Origin':`${process.env.REACT_APP_HOST_URL}`,'authorization':data3},
		});
		async function GetTodo(){
			const c=await fetch(`${process.env.REACT_APP_HOST_URL}/getall/`,apply);
			return await c.json();
		}
		GetTodo().then((response)=>{
			if(response.ok){
				dispatch({
					type:'Todo_List',
					payload:response
				})}
				dispatch({
					type:'Todo_List',
					payload:response
				});
		});
	}
}

export const LogoutHandler=(data3)=>{
	return(dispatch)=>{
		const apply=({
			method:'GET',
			headers:{'Content-Type':'application/json','Origin':`${process.env.REACT_APP_HOST_URL}`,'authorization':data3.authorization},
		});
		async function GetTodo(){
			const c=await fetch(`${process.env.REACT_APP_HOST_URL}/logout`,apply);
			return await c.json();
		}
		GetTodo().then((response)=>{
			if(response.status==="OK"){
				dispatch({
					type:'LOGOUT',
					payload:response
				})}
				dispatch({
					type:'LOGOUT',
					payload:response
				});
		});
	}
}

export const GetSingleTodo=(data4)=>{
	return(dispatch)=>{
		const otpsend=({
			method:'POST',
			headers:{'Content-Type':'application/json','Origin':`${process.env}`},
			body:JSON.stringify(data4)
		});
		async function GetSingle(){
			const c=await fetch(`${process.env.REACT_APP_HOST_URL}/user/api/otp`,otpsend);
			return await c.json();
		}
		GetSingle().then((response)=>{
			if(response.ok){
				dispatch({
					type:'OTP_Handler',
					payload:response
				})}
				dispatch({
					type:'OTP_Handler',
					payload:response
				});
		});
	}
}

export const CreateTodoItem=(data5)=>{
	return(dispatch)=>{	
		const addtodo=({
			method:'POST',
			headers:{'Content-Type':'application/json','Origin':`${process.env.REACT_APP_HOST_URL}`},
			body:JSON.stringify(data5)
		});
		async function UpdateTodo(){
			const c=await fetch(`${process.env.REACT_APP_HOST_URL}/create/${data5.todoID}`,addtodo);
			return await c.json();
		}
		UpdateTodo().then((response)=>{
			if(response.ok){
				dispatch({
					type:'ADD_TODO',
					payload:response
				})}
				dispatch({
					type:'ADD_TODO',
					payload:response
				});
			});
	}
}
export const DeleteTodoItem=(data6)=>{
	return(dispatch)=>{
		const a=({
			method:'DELETE',
			headers:{'Content-Type':'application/json','Origin':`${process.env.REACT_APP_HOST_URL}`,'authorization':data6.authorization},
		});
		async function DeleteItem(){
			const c=await fetch(`${process.env.REACT_APP_HOST_URL}/delete/${data6.todoid}`,a);
			return await c.json();
		}
		DeleteItem().then((response)=>{
			if(response.ok){
				dispatch({
					type:'DELETE_TODO',
					payload:response
				})}
				dispatch({
					type:'DELETE_TODO',
					payload:response
				});
			});
	}
}

export const PutTodoItem=(data7)=>{
	return(dispatch)=>{
		const a=({
			method:'PUT',
			headers:{'Content-Type':'application/json','Origin':`${process.env.REACT_APP_HOST_URL}`},
			body:JSON.stringify({authorization:data7.authorization,name:data7.name})
		});
		async function UpdateAccounts(){
			const c=await fetch(`${process.env.REACT_APP_HOST_URL}/put/${data7.todoid}`,a);
			return await c.json();
		}
		UpdateAccounts().then((response)=>{
			sessionStorage.setItem("Accounts",JSON.stringify(response));

			if(response.ok){
				dispatch({
					type:'UPDATE_TODO',
					payload:response
				})}
				dispatch({
					type:'UPDATE_TODO',
					payload:response
				});
			});
	}
}
export const OTPVerify=(data8)=>{
	return(dispatch)=>{
		const a=({
			method:'DELETE',
			headers:{'Content-Type':'application/json','Origin':`${process.env.REACT_APP_HOST_URL}`},
			body:JSON.stringify(data8)
		});
		async function DeleteUser(){
			const c=await fetch(`${process.env.REACT_APP_HOST_URL}/user/api/delete`,a);
			return await c.json();
		}
		DeleteUser().then((response)=>{
			if(response.ok){
				setTimeout(()=>{
					window.location=`${process.env.REACT_APP_HOST_URL}/register`;
				},3000)
			}dispatch({
				type:'DELETE_ACCOUNT_ERROR',
				payload:response
			});				
		});
	}
}
export const OTPHandler=(data9)=>{
	return(dispatch)=>{
		const a=({
			method:'GET',
			headers:{'Content-Type':'application/json','Origin':`${process.env.REACT_APP_HOST_URL}`,'authorization':data9.authorization},
		});
		async function AccountsUser(){
			const c=await fetch(`${process.env.REACT_APP_HOST_URL}/user/account/details`,a);
			return await c.json();
		}
		OTPHandler().then((response)=>{
			if(response.ok){
				dispatch({
					type:'GET_ALL_ACCOUNT',
					payload:response
				})
			}
		});
	}
}

export const EmptyState = ()=>{
	return(dispatch)=>{
		dispatch({
			type:'EMPTY',
			payload:null
		})
	}
}
