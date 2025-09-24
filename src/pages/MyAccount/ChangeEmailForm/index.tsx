import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";

const ChangeEmailForm = () =>{
    const [serverError, setServerError] = useState<string | undefined>(undefined);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const {userData} = useAuth();
    const {updateEmail} = useUser();

    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data: any) => {
      setServerError(undefined);
      data = {...data, id: userData?.id}
      const result  = await updateEmail(data)
      console.log(result)
      if (result?.error) {
        setServerError(t(result.error));
      } else {
        setSuccess(t('my_account.update_email.success'))
      }
    }

    return (
        <>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative group pb-2">
                <input
                  className={`border rounded-lg w-full  pt-8 pb-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500  ${!errors.email ? "border-gray-300" : "border-red-600"}`}
                  id="email"
                  type="email"
                  {...register("email", {
                    required: t('my_account.change_email.errors.email.blank'),
                  })}
                  onChange={()=>{setDisabled(false); }}
                  defaultValue={userData?.email}
                  
                />
                <label
                  className={`absolute top-2 left-4 text-sm transition-all duration-300 pointer-events-none group-focus-within:text-blue-500  ${!errors.email ? "text-gray-300" : "text-red-600"}`}
                  htmlFor="email"
                >
                  {t('my_account.change_email.labels.email')}
                </label>
            </div>
            <div className="my-2">
              <div className='text-sm text-red-600 '>
                  {errors.email && (
                  <p>
                      {errors.email?.message?.toString()}{" "}
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
                {t('my_account.change_email.labels.submit')}
            </button>
        </form>
        </>
    )
}

export default ChangeEmailForm;


        