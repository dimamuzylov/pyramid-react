import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { Input } from '@nextui-org/input';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import { useContext } from 'react';
import { ContractContext } from '../../context/ContractContext';
import Icon from '../Icon';
import { useTonAddress } from '@tonconnect/ui-react';
import { environment } from '@environment';

type UseDisclosureReturn = ReturnType<typeof useDisclosure>;

function ReferralModal(props?: Partial<UseDisclosureReturn>) {
  const userFriendlyAddress = useTonAddress();
  const { config } = useContext(ContractContext);
  const referralsProgram = config?.referralsProgram || [];

  return (
    <Modal
      isOpen={props?.isOpen}
      placement='bottom-center'
      onOpenChange={() => props?.onOpenChange?.()}
      scrollBehavior='inside'
      isDismissable={false}
      className='pb-10'
    >
      <ModalContent>
        <ModalHeader className='flex items-center gap-1'>
          <div>Invite Friends</div>
        </ModalHeader>
        <ModalBody>
          <Input
            variant='bordered'
            readOnly
            value={
              environment.telegramWebAppUrl + '?startapp=' + userFriendlyAddress
            }
            endContent={
              <button className='focus:outline-none' type='button'>
                <Icon icon='Copy' className='w-5 h-5' />
              </button>
            }
            type='text'
          />
          <Table aria-label='Number of invitations (Daily percentage)'>
            <TableHeader>
              <TableColumn>Number of referrals</TableColumn>
              <TableColumn>Percentage</TableColumn>
            </TableHeader>
            <TableBody>
              {referralsProgram.map(({ referralsCount, percent }, index) => (
                <TableRow key={index}>
                  <TableCell>{referralsCount}</TableCell>
                  <TableCell>{percent}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ReferralModal;
