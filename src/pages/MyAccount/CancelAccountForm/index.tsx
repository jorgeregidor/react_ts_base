import { useState } from "react";
import { useTranslation } from "react-i18next";
import CancelAccountModal from "./CancelAccountModal";

const CancelAccountForm = () =>{
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation();

    return (
        <>
          <button
              className={`bg-red-200 hover:bg-red-500 text-white font-bold py-4 px-6 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-400"`}
              onClick={()=> { setShowModal(true)}}
            >
              {t('my_account.cancel_account.button')}
          </button>
          <CancelAccountModal
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </>
    )
}

export default CancelAccountForm;


        