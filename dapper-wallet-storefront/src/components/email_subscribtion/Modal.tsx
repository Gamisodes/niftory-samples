import { Dialog, Transition } from "@headlessui/react"
import { Fragment, PropsWithChildren } from "react"

interface IModalProps extends PropsWithChildren {
  isOpen: boolean
  title?: string
  closeModal?: () => void
  openModal?: () => void
}
export default function MyModal({ title, isOpen, closeModal, children }: IModalProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto font-dosis">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full relative max-w-md transform-gpu rounded-2xl text-white bg-purple p-6 text-left align-middle shadow-xl transition-all">
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className="font-bangers text-3xl font-medium leading-6 text-white text-center"
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
