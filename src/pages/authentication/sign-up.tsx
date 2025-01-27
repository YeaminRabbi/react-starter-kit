import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useRegisterUserMutation } from "../../features/api/apiSlice";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Clear errors before submission

    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirm_password: "Passwords do not match!",
      }));
      return;
    }

    if (!acceptTerms) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        acceptTerms: "You must accept the terms and conditions!",
      }));
      return;
    }

    try {
      const response = await registerUser({
        name,
        email,
        password,
        confirm_password: confirmPassword,
      }).unwrap();


        if (response?.status === 200) {
            navigate("/login?account=true"); 
        }
    } catch (err: any) {
      console.error("Registration error:", err);

      if (err?.data?.errors) {
        setErrors(err.data.errors); // Populate backend errors into the state
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="my-6 flex items-center gap-x-1 lg:my-0">
        <img
          alt="Form Builder"
          src="https://techstringit.com/setting-images/01JB7ME64HNQN9FPA9BYQYPMQ2.png"
          className="mr-3 h-12"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          React Form Builder
        </span>
      </div>
      <Card
        horizontal
        className="w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl text-center">
          Create a Free Account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="name">Your name</Label>
            <TextInput
              id="name"
              name="name"
              placeholder="Enter your name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your email</Label>
            <TextInput
              id="email"
              name="email"
              placeholder="name@company.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Your password</Label>
            <TextInput
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <TextInput
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirm_password && (
              <p className="text-red-600 text-sm">{errors.confirm_password}</p>
            )}
          </div>
          <div className="mb-6 flex items-center gap-x-3">
            <Checkbox
              id="acceptTerms"
              name="acceptTerms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <Label htmlFor="acceptTerms">
              I accept the&nbsp;
              <a href="#" className="text-primary-700 dark:text-primary-200">
                Terms and Conditions
              </a>
            </Label>
            {errors.acceptTerms && (
              <p className="text-red-600 text-sm">{errors.acceptTerms}</p>
            )}
          </div>
          <div className="mb-7">
            <Button
              type="submit"
              className="w-full lg:w-auto"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create account"}
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Already have an account?&nbsp;
            <a href="/login" className="text-primary-600 dark:text-primary-300">
              Login to account
            </a>
          </p>
        </form>
       
      </Card>
    </div>
  );
};

export default SignUpPage;
