import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useUser from "../../../hooks/useUser";
import Input from "../../../components/forms/Input";
import Button from "../../../components/forms/Button";
import UserContext from "../../../contexts/UserContext";

const ChangeEmailForm = () => {
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const { updateEmail } = useUser();

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserContextProvider");
  }

  const { userData } = context;

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const email = watch("email");

  useEffect(() => {
    setDisabled(!email || email.trim() === "");
  }, [email]);

  const onSubmit = async (data: any) => {
    setServerError(undefined);
    data = { ...data, id: userData?.id };
    const result = await updateEmail(data);
    if (result?.error) {
      setServerError(t(result.error));
    } else {
      setSuccess(t("my_account.change_email.requested"));
    }
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-2">
          <Input
            id="email"
            type="email"
            register={register}
            label={t("my_account.change_email.labels.email")}
            error={errors.email}
            validation={{
              required: t("my_account.change_email.errors.email.blank"),
            }}
            defaultValue={userData?.email}
          />
        </div>
        <div className="my-2">
          <div className="text-sm text-red-600 ">
            {errors.email && <p>{errors.email?.message?.toString()} </p>}
            {serverError && <p>{t(serverError)}</p>}
          </div>
          <div className="text-sm text-blue-600">
            {success && <p>{success} </p>}
          </div>
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={disabled}
          onClick={() => setServerError(undefined)}
          className={disabled ? "bg-blue-200" : ""}
        >
          {t("my_account.change_email.labels.submit")}
        </Button>
      </form>
    </>
  );
};

export default ChangeEmailForm;
