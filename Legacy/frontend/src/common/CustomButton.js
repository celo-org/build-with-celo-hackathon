import { Button } from "@chakra-ui/react";

const CustomButton = ({ children, bg, color, onClick, border, mr, hover, w, mt, hoverColor, isLoading, pos, right, mb, m, d, ml, borderColor }) => (
  <Button
    w={w || "170px"}
    h="55px"
    bg={bg}
    color={color}
    mr={mr}
    fontWeight="400px"
    _hover={{ bg: hover, border: border, color: hoverColor || 'brand.primary' }}
    borderRadius="8px"
    onClick={onClick}
    border={border}
    borderColor={borderColor}
    mt={mt}
    type="submit"
    isLoading={isLoading}
    pos={pos}
    right={right}
    mb={mb}
    display={d}
    m={m}
    ml={ml}
    cursor="pointer"
  >
    {children}
  </Button>
);

export default CustomButton;
