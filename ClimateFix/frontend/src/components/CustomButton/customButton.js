import { Button } from "@chakra-ui/react";

const CustomButton = ({ bg, color, children, border, hoverBg, hoverColor, onClick, m, p, w, mx, disabled }) => {
  return (
    <Button type="submit" background={bg} color={color} borderRadius="4rem" p="8px 24px" _hover={{ bg: hoverBg, color: hoverColor}} border={border} style={{ transition: "all 0.9s ease" }} fontSize="14px" mx={mx} margin={m} w={w} padding={p} disabled={disabled} onClick={onClick} >
      {children}
    </Button>
  );
};

export default CustomButton;
