import { createPortal } from 'react-dom';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { Heading, Text } from '@chakra-ui/react';

import styles from './style.module.scss';

export default function EmailSentModal({ email }) {
  return createPortal(
    <div className={styles.container}>
      <HiOutlineMailOpen fontSize={'2.5rem'} color="#346DF1" />
      <Heading as="h1">Check your email</Heading>
      <Text>
        We sent a magic link to <b>{email}</b>. Check your inbox
        where you will find a button to login to Sacuda.
      </Text>
    </div>,
    document.body
  );
}
