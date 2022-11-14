import 'package:flutter/material.dart';
import 'package:introduction_screen/introduction_screen.dart';
import 'package:sustain/features/questionnaire/common/widgets/all_cards.dart';

PageViewModel residentsView(PageDecoration pageDecoration) {
  return PageViewModel(
    titleWidget: Column(
      children: [
        Image.asset('lib/common/assets/people.png'),
        Text(
          'Residents',
          style: pageDecoration.titleTextStyle,
        )
      ],
    ),
    bodyWidget: Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          'How many people live in your household?',
          style: pageDecoration.bodyTextStyle,
        ),
        const SizedBox(height: 50),
        // ignore: prefer_const_constructors
        AllCards(cardType: 'ResidentsCard'),
      ],
    ),
    decoration: pageDecoration,
  );
}
