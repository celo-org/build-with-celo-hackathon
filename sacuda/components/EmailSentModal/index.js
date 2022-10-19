import { createPortal } from 'react-dom';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { Heading, Text } from '@chakra-ui/react';

import styles from './style.module.scss';

export default function EmailSentModal({ email }) {
  return createPortal(
    <div className={styles.container}>
      <HiOutlineMailOpen fontSize={'2.5rem'} color="#346DF1" />
      <Heading as="h1">Revisa tu correo</Heading>
      <Text>
        Te enviamos un link mágico a <b>{email}</b>. Revisa tu bandeja de entrada
        donde encontrarás un botón para iniciar sesión en Sacuda.
      </Text>
    </div>,
    document.body
  );
}
