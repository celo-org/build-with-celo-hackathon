import 'package:flutter/material.dart';
import 'package:introduction_screen/introduction_screen.dart';
import 'package:sustain/features/questionnaire/common/widgets/all_cards.dart';

PageViewModel houseRoomsView(PageDecoration pageDecoration) {
  return PageViewModel(
    titleWidget: Column(
      children: [
        Image.asset('lib/common/assets/home.png'),
        Text(
          'House Size',
          style: pageDecoration.titleTextStyle,
        )
      ],
    ),
    bodyWidget: Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          'How big is the property?',
          style: pageDecoration.bodyTextStyle,
        ),
        const SizedBox(height: 50),
        // ignore: prefer_const_constructors
        AllCards(cardType: 'RoomCard'),
      ],
    ),
    decoration: pageDecoration,
  );
}
