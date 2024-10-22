import React, { useCallback, useEffect, useState } from 'react';
import { firestore } from '../../config/firebase';
import { collection, deleteDoc, doc, getDocs, query,  updateDoc, where } from 'firebase/firestore';
import { useAuthContext } from '../../context/AuthContext';
import { Image, Tag, Table, Row, Col, Typography} from 'antd';  // Import Table from Ant Design
import { Link } from 'react-router-dom';


const {Title}=Typography

export default function TodoTable() {
  const { user } = useAuthContext();
  const [documents, setDocuments] = useState([]);

  const readDocument = useCallback(async () => {
    if (!user?.uid) return;  // Ensure user is authenticated

    const q = query(collection(firestore, 'Todo'), where('userId', '==', user.uid));
    const array = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      array.push({ ...data, key: doc.id });  // Add the document ID as the 'key' field
    });
    setDocuments(array);
  }, [user?.uid]);

  useEffect(() => {
    readDocument();
  }, [readDocument]);

  // HandleCOmplete

  const handleComplete=async(todo)=>{
    try {
      await updateDoc(doc(firestore, "Todo", todo.id), {status:"Completed"});
      window.toastify("Updated Successfully", "success")

    } catch (e) {
      console.error("updated the tode : ", e);
    }

    const update=documents.map((check,index)=>{
      if(check.id===todo.id){
        return ({...check,status:"Completed"})
      }
      else{
        return check
      }
    })
    setDocuments(update) 

  }

  // HandleDelete
  const handleDelete=async(todo)=>{
    try{
      await deleteDoc(doc(firestore, "Todo", todo.id));
      const filterDocument=documents.filter(check=>check.id!==todo.id)   
      window.toastify("Successfully Deleted","success")  
      setDocuments(filterDocument)
    }
    catch(e){
      console.log(e);
      
    }

  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Image',
      dataIndex: 'photo',
      render: (photo) => (
        <Image
          src={photo?.url}
          width={50}
          height={50}
          alt=""
          // style={{ maxHeight: 30 }}
          className='rounded-full object-cover'
          
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Message',
      dataIndex: 'msg',
      key: 'msg',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Complete' ? 'green' : 'red'}>
          {status?status.toUpperCase(): 'UNKNOWN'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, doc) => (
        <>
          <Link onClick={() => handleComplete(doc)} key={`update-${doc.key}`} className='text-green-500 text-decoration-none' disabled={doc.status === 'Completed'}>Complete</Link> |
          <Link to={`/dashboard/edit/${doc.id}`} className='text-red-600 text-decoration-none'>Edit</Link> |
          <Link onClick={() => handleDelete(doc)} key={`update-${doc.key}`} className='text-info text-decoration-none'>Delete</Link> 
          </>
      )}
  ];

  return (
    <main>
      <div className='container'>
        <Row >
          <Col span={24}>
          <Title level={3} className='mt-5 text-center'>Todo Detail</Title>
          </Col>
        </Row>

        <Row >
          <Col span={24}>
          <div  className='px-10 '>

      <Table dataSource={documents} columns={columns} scroll={{ x: 'max-content' }} />
          </div>
          </Col>
        </Row>
      </div>
    </main>
  );
}
