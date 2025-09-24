import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";

const ChangePasswordForm = () =>{
    const [serverError, setServerError] = useState<string | undefined>(undefined);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const {userData} = useAuth();
    const {updatePassword} = useUser();

    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data: any) => {
      setServerError(undefined);
      data = {...data, id: userData?.id}
      const result  = await updatePassword(data)
      console.log(result)
      if (result?.error) {
        setServerError(t(result.error));
      } else {
        setSuccess(t('my_account.change_password.success'))
        reset()
      }
    }

    return (
        <>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative group pb-2">
            <input
              className={`border rounded-lg w-full pt-8 pb-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500  ${!errors.old_password ? "border-gray-300" : "border-red-600"}`}
              id="old_password"
              type="password"
              {...register("old_password", {
                required: t('my_account.change_password.errors.old_password.blank'),
              })}
              onChange={()=>setDisabled(false)}
            />
            <label
              className={`absolute top-2 left-4 text-sm transition-all duration-300 pointer-events-none group-focus-within:text-blue-500  ${!errors.old_password ? "text-gray-300" : "text-red-600"}`}
              htmlFor="old_password"
            >
               {t('my_account.change_password.labels.old_password')}
            </label>
          </div>
          <div className="relative group pb-2">
            <input
              className={`border rounded-lg w-full pt-8 pb-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500  ${!errors.password ? "border-gray-300" : "border-red-600"}`}
              id="password"
              type="password"
              {...register("password", {
                required: t('my_account.change_password.errors.password.blank'),
                minLength: {
                  value: 8,
                  message:  t('my_account.change_password.errors.password.format')
                }})}
              onChange={()=>setDisabled(false)}
            />
            <label
              className={`absolute top-2 left-4 text-sm transition-all duration-300 pointer-events-none group-focus-within:text-blue-500  ${!errors.password ? "text-gray-300" : "text-red-600"}`}
              htmlFor="password"
            >
               {t('my_account.change_password.labels.password')}
            </label>
          </div>
          <div className="relative group pb-2">
            <input
              className={`border rounded-lg w-full pt-8 pb-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500  ${!errors.password_confirmation ? "border-gray-300" : "border-red-600"}`}
              id="password_confirmation"
              type="password"
              {...register("password_confirmation", {
                required: t('my_account.change_password.errors.password_confirmation.blank'),
                validate: (value) => {
                  if (watch('password') != value) {
                    return t('my_account.change_password.errors.password_confirmation.different');
                  }
              }})}
              onChange={()=>setDisabled(false)}
            />
            <label
              className={`absolute top-2 left-4 text-sm transition-all duration-300 pointer-events-none group-focus-within:text-blue-500  ${!errors.password_confirmation ? "text-gray-300" : "text-red-600"}`}
              htmlFor="password_confirmation"
            >
               {t('my_account.change_password.labels.password_confirmation')}
            </label>
          </div>
          <div className="my-2">
            <div className='text-sm text-red-600 '>
                {errors.old_password && (
                <p>
                    {errors.old_password?.message?.toString()}{" "}
                </p>
                )}
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
            <div className='text-sm text-blue-600'>
                {success && (
                <p>
                    {success}{" "}
                </p>
                )}
            </div>
          </div>
          <button
              className={` ${ disabled ? 'bg-blue-200':'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-4 px-6 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"`}
              type="submit"
              onClick={()=> {setServerError(undefined)}}
            >
              {t('my_account.change_password.labels.submit')}
          </button>
        </form>
        </>
    )
}

export default ChangePasswordForm;


        