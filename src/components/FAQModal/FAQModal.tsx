import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';

type UseDisclosureReturn = ReturnType<typeof useDisclosure>;

function FAQModal(props?: Partial<UseDisclosureReturn>) {
  return (
    <Modal
      isOpen={props?.isOpen}
      placement='bottom-center'
      onOpenChange={() => props?.onOpenChange?.()}
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>FAQ</ModalHeader>
        <ModalBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
          </p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default FAQModal;
