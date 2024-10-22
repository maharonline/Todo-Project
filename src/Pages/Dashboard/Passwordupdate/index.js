import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { auth } from '../../../config/firebase';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
// import style from "../../../sass/passwordupdate.module.scss";

const { Title } = Typography;

export default function PasswordUpdate() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState(""); // State for current password
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPassword || !confirmPassword) {
            return window.toastify("Please Enter your Password ", "error");
        }
        if (newPassword !== confirmPassword) {
            return window.toastify("Passwords do not match", "error");
        }

        setIsLoading(true);
        const user = auth.currentUser;

        if (user) {
            const credential = EmailAuthProvider.credential(user.email, currentPassword); // Create credential
            try {
                // Re-authenticate user
                await reauthenticateWithCredential(user, credential);
                // Update password
                await updatePassword(user, newPassword);
                window.toastify("Password Updated Successfully.", "success");
            } catch (error) {
                if (error.code === 'auth/requires-recent-login') {
                    window.toastify("Please re-login to update your password", "error");
                } else {
                    window.toastify("Something Went Wrong While Changing Password", "error");
                }
                console.error("Updation Password Error=>", error);
            }
        } else {
            window.toastify("No Such User Logged In", "info");
        }
        setIsLoading(false);
    }

    return (
        <main >
            <div >
                <Form onSubmitCapture={handleSubmit}>
                    <Title level={3} className='text-center'>Password Update</Title>
                    <Row gutter={[0]} >
                        <Col span={24} >
                            <Input.Password 
                                placeholder='Current Password' 
                                name='currentPassword' 
                                onChange={e => setCurrentPassword(e.target.value)} // Handle current password input
                            />
                        </Col>
                        <Col span={24} >
                            <Input.Password 
                                placeholder='New Password' 
                                name='newPassword' 
                                onChange={e => setNewPassword(e.target.value)} 
                            />
                        </Col>
                        <Col span={24} >
                            <Input.Password 
                                placeholder='Confirm New Password' 
                                name='confirmPassword' 
                                onChange={e => setConfirmPassword(e.target.value)} 
                            />
                        </Col>
                        <Col span={24} >
                            <Button 
                                className='w-100' 
                                type='primary' 
                                htmlType='submit' 
                                loading={isLoading} 
                                size='large'
                            >
                                Update
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    );
}
