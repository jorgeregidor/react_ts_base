import { useForm } from "react-hook-form";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth'
import AuthTitle from "./../../components/LayoutAuth/AuthTitle";

const ResetPassword = () => {
  const { validPasswordToken, resetPassword } = useAuth()
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(true);
  const [validToken, setValidToken] = useState(false);
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const [searchParams] = useSearchParams()
  const navigate = useNavigate();

  const onLoad = useCallback(async () => {
    if (loading) {
      setServerError(undefined);
      const email = searchParams.get('email') || ''
      const token = searchParams.get('token') || ''
      const result  = await validPasswordToken({email, token})
      console.log(result)
      if (result?.error) {
        setServerError(result?.error);
      } else {
        setValidToken(true)
      }
      setLoading(false)
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);
  

  const onSubmit = async (data: any) => {
      setServerError(undefined);
      const result  = await resetPassword({...data, email: searchParams.get('email'), token: searchParams.get('token')})
      console.log(result)
      if (result?.error) {
        setServerError(result?.error);
      } else {
        navigate("/dashboard")
      }

  };

  useEffect(()=>{
    onLoad()
  },[onLoad])


//<img src={Logo} alt="Logo" className="w-30 h-30 absolute top-4 left-4" />
  return (
      <>
      {!loading && <>
        <div className='flex justify-center w-full'>
          <div className='flex flex-col items-center w-full'>
            <AuthTitle title={t('reset_password.title')}/>
            <div className='h-[50px] pt-4 text-sm text-red-600'>
              {errors.password && (
                <p>
                  {errors.password?.message?.toString()}{" "}
                </p>
              )}
              {errors.password_confirmation && (
                <p>
                  {errors.password_confirmation?.message?.toString()}{" "}
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
        {validToken &&<form className="bg-white rounded-lg p-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative group">
            <input
              className={`border rounded-lg w-full pt-8 pb-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500  ${!errors.email ? "border-gray-300" : "border-red-600"}`}
              id="password"
              type="password"
              {...register("password", {
                required: t('reset_password.errors.password.blank'),
                minLength: {
                  value: 8,
                  message:  t('reset_password.errors.password.format')
                }
              })}
            />
            <label
              className={`absolute top-2 left-4 text-sm transition-all duration-300 pointer-events-none group-focus-within:text-blue-500  ${!errors.email ? "text-gray-300" : "text-red-600"}`}
              htmlFor="password"
            >
               {t('reset_password.labels.password')}
            </label>
          </div>
          <div className="relative group">
            <input
              className={`border rounded-lg w-full pt-8 pb-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500  ${!errors.password_confirmation ? "border-gray-300" : "border-red-600"}`}
              id="password_confirmation"
              type="password"
              {...register("password_confirmation", {
                required: t('reset_password.errors.password_confirmation.blank'),
                validate: (value) => {
                  if (watch('password') != value) {
                    return t('reset_password.errors.password_confirmation.different');
                  }
              }})}
            />
            <label
              className={`absolute top-2 left-4 text-sm transition-all duration-300 pointer-events-none group-focus-within:text-blue-500  ${!errors.password_confirmation ? "text-gray-300" : "text-red-600"}`}
              htmlFor="password_confirmation"
            >
               {t('reset_password.labels.password_confirmation')}
            </label>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="submit"
            onClick={()=> {setServerError(undefined)}}
          >
             {t('reset_password.labels.submit')}
          </button>  
        </form>}
      </>}
      </>
  );
};

export default ResetPassword;
