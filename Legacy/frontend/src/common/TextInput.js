import { Box, FormLabel, Input } from "@chakra-ui/react";

const TextInput = ({ label, placeholder, onChange, type, w, value, defaultValue }) => {
    return (
        <Box mt="20px">
            <FormLabel color="brand.primary" fontSize="14px" fontWeight="300">{label}</FormLabel>
            <Input bg="brand.white" fontSize="14px" h="55px" w={w} placeholder={placeholder} value={value} onChange={onChange} type={type} defaultValue={defaultValue} />
        </Box>
    )
}

export default TextInput;
