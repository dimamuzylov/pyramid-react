import { useDisclosure } from '@nextui-org/modal';
import Button from '../Button';
import FAQModal from '../FAQModal';
import { HTMLAttributes } from 'react';

type FAQProps = HTMLAttributes<unknown>;

function FAQ(props?: FAQProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button variant='light' onPress={onOpen} className={props?.className}>
        FAQ
      </Button>
      <FAQModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

export default FAQ;
