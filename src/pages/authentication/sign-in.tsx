import { Button, Card, Label, TextInput } from "flowbite-react";
import { FC, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../features/api/apiSlice";

const SignInPage: FC = function () {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loginUser, { isLoading }] = useLoginUserMutation();

  // Check for the token on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
      if (token) {
        navigate("/dashboard"); // Redirect to the dashboard if token exists
      }
  }, [navigate]);

  useEffect(() => {
    if (searchParams.get("account") === "true") {
      setMessage("Account created successfully");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null); // Clear any previous success message
    setErrorMessage(null); // Clear any previous error message

    try {
      const response = await loginUser({ email, password }).unwrap();
      if (response?.status === 200) {
        const token = response.data.access_token;
        localStorage.setItem("authToken", `Bearer ${token}`); // Store the token in localStorage
        navigate("/dashboard");
      }
      else if(response?.status === 401){
        setErrorMessage(response?.message);
      }
    } catch (error: any) {
      // Handle known error messages or fallback to a generic one
      if (error?.data?.message) {
        setErrorMessage(error.data.message);
      } else if (error?.error) {
        setErrorMessage(error.error); // Handle specific Redux RTK Query errors
      } else {
        setErrorMessage("An unknown error occurred. Please try again.");
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
        className="w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl text-center">
          Sign in to your account
        </h1>
        {message && (
          <p className="mb-4 text-center text-sm font-medium text-green-600 dark:text-green-400">
            {message}
          </p>
        )}
       
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your email</Label>
            <TextInput
              id="email"
              name="email"
              placeholder="name@company.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
              required
            />
          </div>
          {errorMessage && (
            <p className="mb-4 text-left text-sm font-medium text-red-600 dark:text-red-400">
              {errorMessage}
            </p>
          )}
          <div className="mb-6">
            <Button type="submit" className="w-full lg:w-auto" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login to your account"}
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Not registered?&nbsp;
            <a href="/register" className="text-primary-600 dark:text-primary-300">
              Create account
            </a>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
