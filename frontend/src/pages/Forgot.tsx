import React from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";


const Forgot: React.FC = () => {
const { register, handleSubmit } = useForm();
const onSubmit = async (d: any) => {
await api.post("/auth/forgot-password", d);
alert("Reset link sent!");
};


return (
<div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-10">
<h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
<input {...register("email")} placeholder="Email" className="w-full border p-2 rounded" />
<button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Send Reset Link</button>
</form>
</div>
);
};
export default Forgot;