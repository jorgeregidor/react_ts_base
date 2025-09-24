import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth'
import AuthTitle from "./../../components/LayoutAuth/AuthTitle";

const ForgotPassword = () => {
  const  { isLogged } = useAuth()
  const [requested, setRequested] = useState(false)
  const { forgotPassword } = useAuth()
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [serverError, setServerError] = useState(undefined);
  //const { onUserChange } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged()) navigate('/dashboard')
}, [isLogged, navigate])

  

  const onSubmit = async (user) => {
      setServerError();
      const result  = await forgotPassword(user)
      console.log(result)
      if (result?.error) {
        setServerError(result?.error);
      } else {
        setRequested(true)
      }

  };
  return (
    <>
        <div className='flex justify-center w-full'>
          <div className='flex flex-col items-center w-full'>
            <AuthTitle title={t('forgot_password.title')}/>
            <div className='h-[50px] pt-4 text-sm text-red-600'>
              {errors.email && (
                <p>
                  {errors.email?.message}{" "}
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
          {!requested &&
            <>
              <div className="relative group">
                <input
                  className={`border rounded-lg w-full  pt-8 pb-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500  ${!errors.email ? "border-gray-300" : "border-red-600"}`}
                  id="email"
                  type="email"
                  {...register("email", {
                    required: t('forgot_password.errors.email.blank'),
                  })}
                  
                />
                <label
                  className={`absolute top-2 left-4 text-sm transition-all duration-300 pointer-events-none group-focus-within:text-blue-500  ${!errors.email ? "text-gray-300" : "text-red-600"}`}
                  htmlFor="email"
                >
                  {t('forgot_password.labels.email')}
                </label>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="submit"
                onClick={()=> {setServerError()}}
              >
                {t('forgot_password.labels.submit')}
              </button>
            </>
          }
          { requested && 
            <>
              <div className='h-min-[50px] p-4 mb-20 text-sm text-blue-500 text-center border border-blue-500 rounded-lg bg-blue-100'>
                    {t("forgot_password.requested")}
              </div>
            </>
          }
          <div
            className="flex justify-center bg-gray-400 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={()=> navigate("/login")}
          >
             {t('forgot_password.labels.back')}
          </div>
          
        </form>
    </>
  );
};

export default ForgotPassword;
