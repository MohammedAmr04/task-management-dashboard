import LoginButton from "../components/shared/LoginButton";

const LoginPage = () => {
  return (
    <main className="bg-background h-screen flex justify-center items-center">
      <div className="shadow bg-card px-6 py-8 rounded-lg max-w-md text-center">
        <h1 className="text-xl text-primary font-semibold text-foreground mb-4">
          Welcome! Please log in to continue
        </h1>
        <div className="mt-6 w-38 mx-auto flex justify-center">
          <LoginButton />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
