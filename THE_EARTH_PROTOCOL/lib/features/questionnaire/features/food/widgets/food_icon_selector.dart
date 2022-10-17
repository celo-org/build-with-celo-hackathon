import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class FoodIconSelector extends StatelessWidget {
  const FoodIconSelector({
    required this.title,
    super.key,
  });

  final String title;

  @override
  Widget build(BuildContext context) {
    FaIcon foodIconSelector;

    switch (title) {
      case "Meat":
        {
          foodIconSelector = const FaIcon(
            FontAwesomeIcons.bone,
            color: Colors.white,
          );
        }
        break;

      case "Pescatarian":
        {
          foodIconSelector = const FaIcon(
            FontAwesomeIcons.fish,
            color: Colors.white,
          );
        }
        break;
      case "Vegetarian":
        {
          foodIconSelector = const FaIcon(
            FontAwesomeIcons.canadianMapleLeaf,
            color: Colors.white,
          );
        }
        break;
      case "Vegan":
        {
          foodIconSelector = const FaIcon(
            FontAwesomeIcons.leaf,
            color: Colors.white,
          );
        }
        break;
      default:
        {
          // Its never going to reach the default statement. So I just put a dummy icon.
          foodIconSelector = foodIconSelector = const FaIcon(
            FontAwesomeIcons.bowlFood,
            color: Colors.white,
          );
        }
        break;
    }

    return foodIconSelector;
  }
}
