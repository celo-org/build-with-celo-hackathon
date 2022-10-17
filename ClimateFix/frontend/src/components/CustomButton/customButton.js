import { Button } from "@chakra-ui/react";

const CustomButton = ({ bg, color, children, border, hoverBg, hoverColor, m, p, w }) => {
  return (
    <Button background={bg} color={color} borderRadius="4rem" p="8px 24px" _hover={{ bg: hoverBg, color: hoverColor}} border={border} style={{ transition: "all 0.9s ease" }} fontSize="14px" margin={m} w={w} padding={p}>
      {children}
    </Button>
  );
};

export default CustomButton;
