import React from "react";
import { Button, Checkbox, Form, Input, notification } from "antd";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    // Gọi API
    axios
      .post("http://localhost:8080/api/v1/employees/login", values)
      .then((res) => {
        if (res.data.status === 200) {
          if (res.data.data.Role === 0) {
            // CHuyển trang
            navigate("/manager-user");
            localStorage.setItem("userInfo", JSON.stringify(res.data.data));
            // Hiển thị thông báo
            notification.success({
              message: res.data.message,
            });
          } else {
            // CHuyển trang
            navigate("/");
            localStorage.setItem("userInfo", JSON.stringify(res.data.data));
            // Hiển thị thông báo
            notification.success({
              message: res.data.message,
            });
          }
        }
      })
      .catch((err) => console.log(err));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="form-container">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="Email"
          rules={[
            {
              required: true,
              message: "Email không được phép để trống.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="Password"
          rules={[
            {
              required: true,
              message: "Mật khẩu không được phép để trống.",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
