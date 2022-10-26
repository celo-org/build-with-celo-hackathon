import {
  Box,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons'

const TextInput = ({
  placeholder,
  label,
  defaultValue,
  border,
  borderColor,
  color,
  isReadOnly,
  hideIcon,
  value,
  onChange
}) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(() => !show);
  return (
    <Box>
      <FormLabel color="brand.dark" fontSize="14px" fontWeight="300" mt="20px">
        {label}
      </FormLabel>
      <InputGroup>
        <Input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          defaultValue={defaultValue}
          border={border}
          h="48px"
          borderColor={borderColor}
          focusBorderColor="#65D593"
          _focus={{ border: "0.1px solid #65D593" }}
          color={color}
          isReadOnly={isReadOnly}
          fontSize="14px"
          onChange={onChange}
          value={value}
        />
        {!hideIcon && (
          <InputRightElement
            border="transparent"
            onClick={handleShow}
            cursor="pointer"
            bgColor="transparent"
            position="absolute"
            right="6px"
            top="5px"
            data-testid="togglePasswordIcon"
          >
            {show ? (
              <ViewIcon boxSize="1.2em" color="#a2adbe" />
            ) : (
              <ViewOffIcon boxSize="1.2em" color="#a2adbe" />
            )}
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
};

export default TextInput;
