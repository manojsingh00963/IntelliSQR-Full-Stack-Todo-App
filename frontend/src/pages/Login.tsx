import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const Login: React.FC = () => {
const { register, handleSubmit } = useForm();
const { login } = useAuth();


const onSubmit = (d: any) => login(d.email, d.password);


return (
<div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-10">
<h2 className="text-2xl font-bold text-center mb-4">Login</h2>
<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
<input {...register("email")} placeholder="Email" className="w-full border p-2 rounded" />
<input {...register("password")} type="password" placeholder="Password" className="w-full border p-2 rounded" />
<button className="w-full bg-blue-600 text-white py-2 rounded hover:cursor-pointer hover:bg-blue-700">Login</button>
</form>
<Link to="/forgot" className="block mt-4 text-center text-blue-600">Forgot Password?</Link>
</div>
);
};
export default Login;