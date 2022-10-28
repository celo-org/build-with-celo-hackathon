import { Box, FormLabel, Input } from "@chakra-ui/react";

const TextInput = ({
  label,
  placeholder,
  onChange,
  type,
  w,
  value,
  defaultValue,
  color,
  border,
  borderColor,
  bg,
  isReadOnly
}) => {
  return (
    <Box mt="20px">
      <FormLabel
        color={color || "brand.primary"}
        fontSize="14px"
        fontWeight="300"
      >
        {label}
      </FormLabel>
      <Input
        bg={bg || "brand.white"}
        fontSize="14px"
        h="55px"
        w={w}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        defaultValue={defaultValue}
        border={border}
        borderColor={borderColor}
        focusBorderColor="#15F4CB"
        _focus={{ border: "0.1px solid #15F4CB" }}
        color={color}
        isReadOnly={isReadOnly}
      />
    </Box>
  );
};

export default TextInput;
