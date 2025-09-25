import { ReactNode } from "react";

interface ModalProps {
  closeModal: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ closeModal, title, children }: ModalProps) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto m-4 max-w-2xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-grey-200 rounded-t">
              <h3 className="text-base font-semibold text-red-500">{title}</h3>
              <button
                onClick={closeModal}
                className="ml-auto bg-transparent border-0 text-gray-500 hover:text-gray-700 text-xl leading-none outline-none focus:outline-none"
              >
                <span className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </span>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
