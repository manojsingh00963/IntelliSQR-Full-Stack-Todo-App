import React from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";


const Reset: React.FC = () => {
const { register, handleSubmit } = useForm();
const [params] = useSearchParams();


const email = params.get("email");
const token = params.get("token");


const onSubmit = async (d: any) => {
await api.post("/auth/reset-password", {
email,
token,
newPassword: d.password,
});
alert("Password reset successful!");
};


return (
<div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-10">
<h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
<input {...register("password")} type="password" placeholder="New Password" className="w-full border p-2 rounded" />
<button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Reset</button>
</form>
</div>
);
};


export default Reset;