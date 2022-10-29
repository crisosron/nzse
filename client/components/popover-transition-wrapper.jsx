import { Fragment } from 'react'
import { Transition } from '@headlessui/react'

// See https://headlessui.com/react/transition
const PopoverTransitionWrapper = ({ children, show }) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
      show={show}
    >
      { children }
    </Transition>
  );
}

export default PopoverTransitionWrapper;