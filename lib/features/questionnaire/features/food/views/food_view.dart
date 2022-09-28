import 'package:flutter/material.dart';
import 'package:introduction_screen/introduction_screen.dart';
import 'package:sustain/features/questionnaire/features/food/widgets/all_food_tiles.dart';

PageViewModel foodView(PageDecoration pageDecoration) {
  return PageViewModel(
    titleWidget: Column(
      children: [
        Image.asset('lib/common/assets/food.png'),
        Text(
          'Food Tracking',
          style: pageDecoration.titleTextStyle,
        )
      ],
    ),
    bodyWidget: Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          'Which of the following best describes your average daily food consumption?',
          style: pageDecoration.bodyTextStyle,
        ),
        const SizedBox(height: 50),
        const AllFoodTiles(), // might have to remove const later
      ],
    ),
    decoration: pageDecoration,
  );
}
