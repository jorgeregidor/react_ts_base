import { useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import useAuth from "../../../../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const CancelAccountModal = ({showModal, setShowModal}) => {
    const { t } = useTranslation()
    const { navigate } = useNavigate()
    const [serverError, setServerError] = useState(undefined)
    const { cancelAccount } = useAuth()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()

    const goBack = () => {
        reset()
        setShowModal(false)
    }


    
    const onSubmit = async () => {
        setServerError();
        const result  = await cancelAccount()
        if (result?.error) {
            setServerError(t(result.error));
        } else {
            navigate("/sign_up")
        }
    }

      
    return (
        <>
        {showModal &&  
            (<>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto m-4 max-w-2xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-grey-200 rounded-t">
                            <h3 className="text-base font-semibold text-red-500">
                                {t("my_account.cancel_account.modal.title")}
                            </h3>
                        </div>
                        <>
                            <div className="relative p-6 flex-auto">
                                <p className="my-4 text-grey-500 text-base leading-relaxed">
                                    {t("my_account.cancel_account.modal.text")}
                                </p>
                                <p className="my-4 text-grey-500 text-base leading-relaxed">
                                    {t("my_account.cancel_account.modal.confirmation")}
                                </p>
                            </div>

                            <form className="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="relative group pb-2 mx-4">
                                    <input
                                    className={`border rounded-lg w-full  pt-8 pb-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500  ${!errors.delete_key ? "border-gray-300" : "border-red-600"}`}
                                    id="delete_key"
                                    type="text"
                                    {...register("delete_key", {
                                        required: t('my_account.cancel_account.modal.errors.delete_key.blank'),
                                        validate: (value) => {
                                            if (value != t('my_account.cancel_account.modal.delete_key')) {
                                              return t('my_account.cancel_account.modal.errors.delete_key.format');
                                            }
                                        }
                                    })}
                                    
                                    />
                                    <label
                                    className={`absolute top-2 left-4 text-sm transition-all duration-300 pointer-events-none group-focus-within:text-blue-500  ${!errors.delete_key ? "text-gray-300" : "text-red-600"}`}
                                    htmlFor="delete_key"
                                    >
                                    {t('my_account.cancel_account.modal.labels.delete_key')}
                                    </label>
                                </div>
                                <div className="my-2 mx-4">
                                    <div className='text-sm text-red-600 '>
                                        {errors.delete_key && (
                                        <p>
                                            {errors.delete_key?.message}{" "}
                                        </p>
                                        )}
                                        {serverError && (
                                        <p>
                                            {t(serverError)}
                                        </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex w-full justify-end p-4 pt-0">
                                    <button
                                        className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4  mr-1 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"`}
                                        type="button"
                                        onClick={() => goBack()}
                                    >
                                        {t('my_account.cancel_account.modal.labels.back')}
                                    </button>
                                    <button
                                        className={`w-full bg-red-500 hover:bg-red-700 text-white font-bold py-4  ml-1 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"`}
                                        type="submit"
                                        onClick={() => setServerError()}
                                    >
                                        {t('my_account.cancel_account.modal.labels.submit')}
                                    </button>
                                </div>
                            </form>
                        </>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
        </>
    )
}

export default CancelAccountModal