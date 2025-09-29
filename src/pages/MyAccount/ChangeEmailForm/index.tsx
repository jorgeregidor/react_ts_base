import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Input from "../../../components/forms/Input";
import Button from "../../../components/forms/Button";
import UserContext from "../../../contexts/UserContext";
import useUpdateEmail from "../../../hooks/user/useUpdateEmail";
import showError from "../../../lib/messages/ShowError";
import showSuccess from "../../../lib/messages/ShowSuccess";

const ChangeEmailForm = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const { error, loading, updateEmail } = useUpdateEmail();

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
    data = { ...data, id: userData?.id };
    await updateEmail(data);
    if (error) {
      showError(t(error));
    } else {
      showSuccess(t("my_account.change_email.requested"));
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
          </div>
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={disabled || loading}
          className={disabled ? "bg-blue-200" : ""}
        >
          {t("my_account.change_email.labels.submit")}
        </Button>
      </form>
    </>
  );
};

export default ChangeEmailForm;
