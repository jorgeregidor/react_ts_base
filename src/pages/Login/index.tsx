import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth'
import AuthTitle from "./../../components/LayoutAuth/AuthTitle";
import useLogin from "../../hooks/auth/useLogin";
import Input from "../../components/forms/Input";
import Button from "../../components/forms/Button";

const Login = () => {
  const  { isLogged } = useAuth()
  const [logged, setLogged] = useState(isLogged())
  const { data,error, loading, login } = useLogin()
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (logged) navigate('/dashboard')
}, [logged, navigate])

  useEffect(() => {
    if (loading) return;
    if (error) {
      console.log(error)
      setServerError(t(error))
    }
    if (data && !error) setLogged(true)
  }, [loading, error])
  

  const onSubmit = async (data: any) => {
      setServerError(undefined);
      await login(data);
  };

  return (
    
    <>
        <div className='flex justify-center w-full'>
          <div className='flex flex-col items-center w-full'>
            <AuthTitle title={t('login.title')}/>
            <div className='h-[50px] pt-4 text-sm text-red-600'>
              {errors.email && (
                <p>
                  {String(errors.email?.message)}{" "}
                </p>
              )}
              {errors.password && (
                <p>
                  {String(errors.password?.message)}{" "}
                </p>
              )}
              {serverError && (
                <p>
                  {serverError}
                </p>
              )}
            </div>
          </div>
        </div>
        <form className="bg-white rounded-lg p-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="email"
            type="email"
            register={register}
            label={t('login.labels.email')}
            error={errors.email}
            validation={{
              required: t('login.errors.email.blank'),
            }}
          />
          <Input
            id="password"
            type="password"
            register={register}
            label={t('login.labels.password')}
            error={errors.password}
            validation={{
              required: t('login.errors.password.blank'),
            }}
          />
          <Link
            className="text-blue-500 hover:text-blue-800 text-center block"
            to="/forgot_password"
          >
             {t('login.labels.forgot_password')}
          </Link>
          <Button
            type="submit"
            variant="primary"
          >
            {t('login.labels.sign_in')}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/sign_up")}
          >
            {t('login.labels.sign_up')}
          </Button>
          
        </form>
    </>
  );
};

export default Login;
