import { useState,useEffect } from "react";
import { Table,Form,Row,Col,Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { Toast, toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { FaTimes } from "react-icons/fa";

const ProfileScreen = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setconfirmPassword]=useState("");

    const dispatch=useDispatch();
  
    const  {userInfo}=useSelector((state)=>state.auth);

    const [updateprofile,{isLoading:loadingUpdateProfile}]=useProfileMutation();
    const {data:orders,isLoading,error}=useGetMyOrdersQuery();

    useEffect(()=>{
        if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    },[userInfo,userInfo.name,userInfo.email]);

    const submitHandler=async (e)=>{
        e.preventDefault();
       if(password!=confirmPassword){
        toast.error('Password do not match');
       }else{
        try{
             const res=await updateprofile({_id:userInfo._id,name,email,password}).unwrap();
             dispatch(setCredentials(res));
             toast.success('Profile updated successfully');
        }catch(err){
toast.error(err?.data?.message ||  err?.error);
        }
       }
    };

    return (
    <Row>
        <Col md={3}>
           <h2>User profile</h2>
           <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="my-2">
                <Form.Label>email Address</Form.Label>
                <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="password" className="my-2">
                <Form.Label>password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmpassword" className="my-2">
                <Form.Label>confirmPassword</Form.Label>
                <Form.Control
                type="password"
                placeholder="Enter confirmpassword"
                value={confirmPassword}
                onChange={(e)=>setconfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">update</Button>
            {loadingUpdateProfile && <Loader/>}
           </Form>
            </Col>
        <Col md={9}>
            <h2>MY Orders</h2>
            {isLoading?<Loader/>:error?(<Message variant='danger'>
            {error?.data?.message || error.error}
            </Message>):(
                <Table striped hover responsive className="table-sm">
                    <thead>
                        <tr>
                         <th>ID</th>   
                         <th>DATE</th>   
                         <th>TOTAL</th>   
                         <th>PAID</th>   
                         <th>DELIVEREED</th>   
                         <th></th>   
   
                        </tr>
                    </thead>
                    <tbody>
                     {orders.map((order)=>(
                        <tr Key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>${order.totalPrife}</td>
                            <td>
                                {order.isPaid?(
                                order.paidAt.substring(0,10)
                            ):(
                                <FaTimes style={{color:'red'}}/>
                            )}
                            </td>

                            <td>
                                {order.isDelivered?(
                                order.deliveredAt.substring(0,10)
                            ):(
                                <FaTimes style={{color:'red'}}/>
                            )}
                            </td>

                            <td>
                             <LinkContainer to={`/order/${order._id}`}>
                                <Button className="btn-sm" variant="light">
                                Details
                            </Button>
                            </LinkContainer>   
                            </td>

                        </tr>
                     ))}

                    </tbody>
                </Table>
            )}
        </Col>
        </Row>
    );
};

export default ProfileScreen;
