import { Button, Col, Form, Input, Progress, Row } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore, storage } from '../../../config/firebase';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


const initialstate = { firstname: "", lastname: "", email: "" }
export default function EditProfile() {
    const { uid } = useParams();
    const [state, setstate] = useState(initialstate)
    const [file, setFile] = useState({})
    const [progress,setprogress]=useState("")

    const handleChange = (e) => setstate(s => ({ ...s, [e.target.name]: e.target.value }))

    const readData = useCallback (async () => {
        if (!uid) return
        const docRef = doc(firestore, "Users", uid);
        const docSnap = await getDoc(docRef);

        const todo = docSnap.exists() ? docSnap.data() : {}; 
setstate(s => ({ ...s, ...todo }));


        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");

        }
    }, [uid])

    useEffect(() => {
        readData()
    }, [readData])


    const handleSubmit = (e) => {
        e.preventDefault();
        const {firstname,lastname,email}=state

        let formdata = { firstname,lastname,email, UpdatingTime: serverTimestamp() }

        if (file.name) {
            uploadFileData(formdata)
        }
        else {
            createDocument(formdata)
        }

    }

    const uploadFileData = (formdata) => {

        const fileName = uid + "-" + file.name

        const storageRef = ref(storage, `Users-images/${fileName}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress1 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress1 + '% done');
                setprogress(Math.floor(progress1))

            },
            (error) => {
                console.log(error);

            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    const data = { ...formdata, photo: { url: downloadURL, imageName: fileName } }
                    createDocument(data)
                });
            }
        );
    }

    const createDocument=async(formdata)=>{
        try {
            const docRef = doc(firestore, 'Users', uid);

            // Update the timestamp field with the value from the server
            await updateDoc(docRef, formdata);
            window.toastify("Profile Updating Successfully","success")
        } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    return (
        <main style={{display:'flex',justifyContent:"center",alignItems:"center",minHeight:'100vh',flexDirection:'column' }}>
            <div style={{maxWidth:'500px',border:"1px solid black", padding:"20px 20px"}}>
                <Form onSubmitCapture={handleSubmit}>
                    <Row>

                        <Col span={24}>
                            <FormItem label='First Name' style={{ marginBottom: 8 }} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                <Input type='text' name='firstname'  value={state.firstname} onChange={handleChange} />
                            </FormItem>
                        </Col>

                        <Col span={24}>
                            <FormItem label='Last Name' style={{ marginBottom: 8 }} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                <Input type='text' name='lastname' value={state.lastname} onChange={handleChange} />
                            </FormItem>
                        </Col>

                        <Col span={24}>
                            <FormItem label='Email' style={{ marginBottom: 8 }} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                                <Input type='email' name='email' value={state.email} onChange={handleChange} disabled />
                            </FormItem>
                        </Col>
                        <Col span={24}>
                        <Input type='file' onChange={e => { setFile(e.target.files[0]) }}/>
                        {file && progress ? <Progress percent={progress} percentPosition={{ align: 'start', type: 'outer' }} /> : ""}
                        </Col>
                        <Col span={24}>
                            <Button type='primary' size='large' htmlType='submit' onSubmit={handleSubmit} className='w-full bg-indigo-600 mt-3'>Update Profile</Button>
                        </Col>

                    </Row>
                </Form>
            </div>
        </main>
    );
}
