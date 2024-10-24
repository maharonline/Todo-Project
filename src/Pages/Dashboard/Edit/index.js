import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useParams } from 'react-router-dom'
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { firestore } from 'config/firebase'

const {Title}=Typography


const inititalstate = { title: "", msg: "", description: "" }
export default function Edit() {
    const {uid}=useParams()
    const [state,setstate]=useState(inititalstate)
    const[isLoading,setisLoading]=useState(false)

    const handleChange=(e)=>setstate(s=>({...s,[e.target.name]:e.target.value}))

    const readData=useCallback(async()=>{
        console.log(uid);
        
        if(!uid) return
        const docRef = doc(firestore, "Todo", uid);
        const docSnap = await getDoc(docRef);

        const todo = docSnap.data()

        const tala=todo.title
        console.log(tala);
        

        setstate(s => ({ ...s, ...todo }))


        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");

        }
    },[uid])

    useEffect(()=>{
        readData()
    },[readData])

    const handleSubmit=async(e)=>{
        e.preventDefault()

        const{title,msg,description,DateCreated}=state
        setisLoading(true)

        const formdata={title,msg,description,DateCreated:DateCreated,UpdatingDate:serverTimestamp()}
        try {
            const docRef = doc(firestore, 'Todo', uid);

            // Update the timestamp field with the value from the server
            await updateDoc(docRef, formdata
            );
            window.toastify("Editing Done Successfully","success")
        } catch (e) {
            console.error("Error adding document: ", e);
          }
          setisLoading(false)


    }
  return (
    <main className='flex justify-center items-center'>
            <div className="card p-md-4 p-5"  style={{maxWidth:"600px",border:"1px solid rgb(79 70 229)"}}>
                <Title style={{color:'rgb(79 70 229)'}} level={2} className='text-center'>Edit Todo</Title>

                <Form layout='vertical' onSubmitCapture={handleSubmit}>
                    <Row gutter={[16]}>

                        <Col span={24}>
                            <FormItem label="Title" required labelCol={{ span: 24 }}  wrapperCol={{ span: 24 }} style={{ marginBottom: 8,}}>
                                <Input type='text' placeholder='Title' name='title' value={state.title} onChange={handleChange} />
                            </FormItem>
                        </Col>

                        <Col span={24}>
                            <FormItem label="Message" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} style={{ marginBottom: 8, }}>
                                <Input type='text' placeholder='Message' name='msg' value={state.msg} onChange={handleChange} />
                            </FormItem>
                        </Col>

                        <Col span={24}>
                            <FormItem label="Description" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} style={{ marginBottom: 8 }}>
                                <Input.TextArea rows={5} type='text' placeholder='Description' name='description' value={state.description} spellCheck="false" onChange={handleChange} />
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <Button style={{backgroundColor:'rgb(79 70 229)'}} type='primary' className='mt-2' size='large' block loading={isLoading} onClick={handleSubmit} >Update</Button>
                        </Col>
                    </Row>
                </Form>
            </div>

        </main>
  )
}
