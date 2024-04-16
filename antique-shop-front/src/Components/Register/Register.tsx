import  { useState } from 'react';
import { useAuth } from '../../ContextApi/AuthContextApi';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import backImg from '../../Images/bg-sign-in-basic.f327db1d0e4b00ba3c81.jpeg';

export function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const context = useAuth();
    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await context?.apiService.register(username, password);
            if (response?.data.success) {
                toast.success("Registration successful");
                navigate("/")
            }
        } catch (error) {
            toast.error("Registration failed");
            console.error('Error registering:', error);
        }
    };

    return (
        <>
            <div className="Auth-form-container" style={{ backgroundImage: `url(${backImg})` }}>
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Register</h3>
                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                className="form-control mt-1"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}
