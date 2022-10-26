import { Box, FormLabel, Input } from "@chakra-ui/react";

const TextInput = ({ placeholder, type, label, defaultValue, border, borderColor, color, isReadOnly, onChange, value }) => {
  return (
    <Box>
      <FormLabel color="brand.dark" fontSize="14px" fontWeight="300" mt="20px">
        {label}
      </FormLabel>
      <Input
        type={type}
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
    </Box>
  );
};

export default TextInput;
