import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Input from "../../../../components/forms/Input";
import Button from "../../../../components/forms/Button";

interface CancelAccountModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const CancelAccountModal = ({
  showModal,
  setShowModal,
}: CancelAccountModalProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const { cancelAccount } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const goBack = () => {
    reset();
    setShowModal(false);
  };

  const onSubmit = async () => {
    setServerError(undefined);
    const result = await cancelAccount();
    if (result?.error) {
      setServerError(t(result.error));
    } else {
      navigate("/sign_up");
    }
  };

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
                    <div className="pb-2 mx-4">
                      <Input
                        id="delete_key"
                        type="text"
                        register={register}
                        label={t(
                          "my_account.cancel_account.modal.labels.delete_key",
                        )}
                        error={errors.delete_key}
                        validation={{
                          required: t(
                            "my_account.cancel_account.modal.errors.delete_key.blank",
                          ),
                          validate: (value: string) => {
                            if (
                              value !=
                              t("my_account.cancel_account.modal.delete_key")
                            ) {
                              return t(
                                "my_account.cancel_account.modal.errors.delete_key.format",
                              );
                            }
                          },
                        }}
                      />
                    </div>
                    <div className="my-2 mx-4">
                      <div className="text-sm text-red-600 ">
                        {errors.delete_key && (
                          <p>{errors.delete_key?.message?.toString()} </p>
                        )}
                        {serverError && <p>{t(serverError)}</p>}
                      </div>
                    </div>
                    <div className="flex w-full justify-end p-4 pt-0">
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => goBack()}
                        className="w-full mr-1"
                      >
                        {t("my_account.cancel_account.modal.labels.back")}
                      </Button>
                      <Button
                        type="submit"
                        variant="danger"
                        onClick={() => setServerError(undefined)}
                        className="w-full ml-1"
                      >
                        {t("my_account.cancel_account.modal.labels.submit")}
                      </Button>
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
  );
};

export default CancelAccountModal;
