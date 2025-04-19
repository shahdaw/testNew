import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://ecommerce-node4.onrender.com/auth/sendcode`,
        { email }
      );
      toast.success("تم إرسال الكود إلى بريدك الإلكتروني.");
      // ممكن بعد النجاح تنتقل لصفحة Reset Password
      navigate("/auth/reset-password");
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء الإرسال.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>نسيت كلمة المرور</h2>
      <form onSubmit={handleSendCode}>
        <input
          type="email"
          placeholder="أدخل بريدك الإلكتروني"
          className="form-control my-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          إرسال الكود
        </button>
      </form>
    </div>
  );
}
