import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthTitle from "./../../components/LayoutAuth/AuthTitle";
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth'

const SignUp = () => {
  const  { isLogged } = useAuth()
  const [logged, setLogged] = useState(isLogged())
  const { signUp } = useAuth()
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  const [serverError, setServerError] = useState(undefined);
  //const { onUserChange } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('isLogged', logged)
    if (logged) navigate('/dashboard')
}, [logged, navigate])

  

  const onSubmit = async (user) => {
      setServerError();
      const result  = await signUp(user)
      console.log(result)
      if (result?.error) {
        setServerError(result?.error);
      } else {
        setLogged(true)
      }

  };
//<img src={Logo} alt="Logo" className="w-30 h-30 absolute top-4 left-4" />
  return (
    <>
        <div className='flex justify-center w-full'>
          <div className='flex flex-col items-center w-full'>
            <AuthTitle title={t('sign_up.title')}/>
            <div className='h-[50px] pt-4 text-sm text-red-600'>
              {errors.email && (
                <p>
                  {errors.email?.message}{" "}
                </p>
              )}
              {errors.password && (
                <p>
                  {errors.password?.message}{" "}
                </p>
              )}
              {errors.password_confirmation && (
                <p>
                  {errors.password_confirmation?.message}{" "}
                </p>
              )}
              {serverError && (
                <p>
                  {t(serverError)}
                </p>
              )}
            </div>
          </div>
        </div>
        <form className="bg-white rounded-lg p-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative group">
            <input
              className={`border rounded-lg w-full  pt-8 pb-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500  ${!errors.email ? "border-gray-300" : "border-red-600"}`}
              id="email"
              type="email"
              {...register("email", {
                required: t('sign_up.errors.email.blank'),
              })}
              
            />
            <label
              className={`absolute top-2 left-4 text-sm transition-all duration-300 pointer-events-none group-focus-within:text-blue-500  ${!errors.email ? "text-gray-300" : "text-red-600"}`}
              htmlFor="email"
            >
              {t('sign_up.labels.email')}
            </label>
          </div>
          <div className="relative group">
            <input
              className={`border rounded-lg w-full pt-8 pb-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500  ${!errors.email ? "border-gray-300" : "border-red-600"}`}
              id="password"
              type="password"
              {...register("password", {
                required: t('sign_up.errors.password.blank'),
                minLength: {
                  value: 8,
                  message:  t('sign_up.errors.password.format')
                }
              })}
            />
            <label
              className={`absolute top-2 left-4 text-sm transition-all duration-300 pointer-events-none group-focus-within:text-blue-500  ${!errors.email ? "text-gray-300" : "text-red-600"}`}
              htmlFor="password"
            >
               {t('sign_up.labels.password')}
            </label>
          </div>
          <div className="relative group">
            <input
              className={`border rounded-lg w-full pt-8 pb-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500  ${!errors.password_confirmation ? "border-gray-300" : "border-red-600"}`}
              id="password_confirmation"
              type="password"
              {...register("password_confirmation", {
                required: t('sign_up.errors.password_confirmation.blank'),
                validate: (value) => {
                  if (watch('password') != value) {
                    return t('sign_up.errors.password_confirmation.different');
                  }
              }})}
            />
            <label
              className={`absolute top-2 left-4 text-sm transition-all duration-300 pointer-events-none group-focus-within:text-blue-500  ${!errors.password_confirmation ? "text-gray-300" : "text-red-600"}`}
              htmlFor="password_confirmation"
            >
               {t('sign_up.labels.password_confirmation')}
            </label>
          </div>
          <Link
            className="text-blue-500 hover:text-blue-800 text-center block"
            to="/forgot_password"
          >
             {t('login.labels.forgot_password')}
          </Link>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="submit"
            onClick={()=> {setServerError()}}
          >
             {t('login.labels.sign_up')}
          </button>
          <div
            className="flex justify-center bg-gray-400 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={()=> navigate("/login")}
          >
             {t('sign_up.labels.login')}
          </div>
          
        </form>
        </>
  );
};

export default SignUp;
