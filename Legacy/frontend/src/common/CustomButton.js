import { Button } from "@chakra-ui/react";

const CustomButton = ({ children, bg, color, onClick, border, mr, hover, w, mt, hoverColor, isLoading, pos, right, mb, m, d, ml, borderColor, disabled, h, float }) => (
  <Button
    w={w || "170px"}
    h="55px"
    bg={bg}
    color={color}
    height={h}
    mr={mr}
    _hover={{ bg: hover, border: border, color: hoverColor || 'brand.primary' }}
    borderRadius="8px"
    onClick={onClick}
    border={border}
    borderColor={borderColor}
    mt={mt}
    fontWeight="medium"
    type="submit"
    isLoading={isLoading}
    pos={pos}
    right={right}
    mb={mb}
    display={d}
    m={m}
    float={float}
    ml={ml}
    cursor="pointer"
    disabled={disabled}
  >
    {children}
  </Button>
);

export default CustomButton;
