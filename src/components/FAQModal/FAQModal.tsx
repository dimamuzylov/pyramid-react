import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { useContext } from 'react';
import { ContractContext } from '../../context/ContractContext';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../LanguageSelector';

type UseDisclosureReturn = ReturnType<typeof useDisclosure>;

const FAQ_QUESTIONS_EMPTY_ARRAY = Array.from(
  { length: 6 },
  (_, index) => index + 1
);

const FAQ_PARAGRAPHS_EMPTY_ARRAY = Array.from(
  { length: 4 },
  (_, index) => index + 1
);

function FAQModal(props?: Partial<UseDisclosureReturn>) {
  const { config } = useContext(ContractContext);
  const referralsProgram = config?.referralsProgram || [];
  const { t } = useTranslation();

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
          <div>FAQ</div>
          <LanguageSelector className='mx-auto' />
        </ModalHeader>
        <ModalBody>
          <h3
            className='font-semibold'
            dangerouslySetInnerHTML={{ __html: t('faq.title') }}
          ></h3>
          {FAQ_PARAGRAPHS_EMPTY_ARRAY.map((key) => (
            <p key={key} className='text-xs'>
              {t(`faq.paragraphs.${key}`)}
            </p>
          ))}
          <h3 className='font-semibold'>{t('faq.referralsTableTitle')}</h3>
          <Table aria-label={t('faq.referralsTableTitle')}>
            <TableHeader>
              <TableColumn>
                {t('faq.referralsTableHeader.referralsCount')}
              </TableColumn>
              <TableColumn>
                {t('faq.referralsTableHeader.dailyPercent')}
              </TableColumn>
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
          <Accordion isCompact>
            {FAQ_QUESTIONS_EMPTY_ARRAY.map((key) => (
              <AccordionItem
                key={key}
                aria-label={t(`faq.questions.${key}.question`)}
                title={t(`faq.questions.${key}.question`)}
              >
                <div
                  className='text-xs'
                  dangerouslySetInnerHTML={{
                    __html: t(`faq.questions.${key}.answer`),
                  }}
                ></div>
              </AccordionItem>
            ))}
          </Accordion>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default FAQModal;
