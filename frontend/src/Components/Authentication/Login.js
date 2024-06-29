import React from "react";
import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast} from "@chakra-ui/react";
// import { useToast } from "@chakra-ui/toast";
import axios from "../../http";
import { useState } from "react";
import { useHistory } from "react-router";
import { ChatState } from "../../Context/ChatProvider";


const Login = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [picLoading,setPicLoading]=useState(false);

    const toast = useToast();
    const history=useHistory();
    const { setUser } = ChatState()

    const submitHandler = async() => {
        setPicLoading(true);
    if ( !email || !password ) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "api/user/login",
        {
          
          email,
          password,
          
        },
        config
      );
      console.log(JSON.stringify(data));
      toast({
        title: "login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
    };

    return (
        <VStack spacing="5px">
            
            <FormControl id="email" isRequired >
                <FormLabel>
                    Email
                </FormLabel>
                <Input 
                placeholder="Enter Your Email"
                value={email}
                onChange={
                    //thats how you take input
                    function (event) {
                        setEmail(event.target.value);
                    }
                }
                />
            </FormControl>
            <FormControl id="password"isRequired>
                <FormLabel>
                    Password
                </FormLabel>
                <InputGroup >
                    <Input
                        
                        type={show ? "text":"password"}
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={
                            //thats how you take input
                            function (event) {
                                setPassword(event.target.value);
                            }
                        }
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={function () {setShow(!show);}}>
                            {show ? "Hide": "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                
                colorScheme="blue"
                color="white"
                width="100%"
                style={{marginTop: 15}}
                onClick={submitHandler}
                isLoading={picLoading}>Login</Button>
            <Button
                colorScheme="red"
                variant="solid"
                width="100%"
                style={{marginTop: 15}}
                onClick={()=>{
                    setEmail("guest@example.com");
                    setPassword("123456");
                }}>Get guest user</Button>
        </VStack>
    )
}

export default Login