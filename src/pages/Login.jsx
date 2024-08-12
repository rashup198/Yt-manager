import loginImg from "../assets/Images/login.jpg"; // Replace with an image relevant to YouTube or content creation
import Template from "../componets/core/auth/LoginForm";

function Login() {
  return (
    <Template
      title="Welcome Back, Creator"
      description1="Manage your content, collaborate with editors, and stay connected with your audience."
      description2="Your next big video is just a few clicks away. Sign in to streamline your workflow and maximize your reach."
      image={loginImg}
      formType="login"
    />
  );
}

export default Login;
