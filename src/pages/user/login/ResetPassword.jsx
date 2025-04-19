import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { state } = useLocation();
  const [email, setEmail] = useState(state?.email || "");
  const [password, setPassword] = useState(""); // ✅ بدل newPassword
  const [code, setCode] = useState("");         // ✅ الاسم منطبق على الـ API
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("https://ecommerce-node4.onrender.com/auth/forgotPassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,   // ✅ مطابق تمامًا للـ API
          code,       // ✅ مطابق تمامًا للـ API
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("تم تعيين كلمة المرور بنجاح. سيتم تحويلك لتسجيل الدخول...");
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      } else {
        setError(data.message || "حدث خطأ أثناء تعيين كلمة المرور.");
      }
    } catch (err) {
      setError("فشل الاتصال بالخادم.");
    }
  };

  return (
    <div className="container">
      <h2>إعادة تعيين كلمة المرور</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="الكود"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور الجديدة"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">تحديث كلمة المرور</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
