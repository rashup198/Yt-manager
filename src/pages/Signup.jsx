import signupImg from "../assets/Images/singnup.jpg"; 
import Template from "../componets/core/auth/SignUpform";

function Signup() {
  return (
    <Template
      title="Join the Creator Community!"
      description1="Sign up today to manage your videos, collaborate with editors, and grow your channel."
      description2="Take control of your content and connect with your audience like never before."
      image={signupImg}
      formType="signup"
    />
  );
}

export default Signup;
