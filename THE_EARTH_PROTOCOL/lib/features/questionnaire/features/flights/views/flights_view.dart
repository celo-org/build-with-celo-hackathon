import 'package:flutter/material.dart';
import 'package:introduction_screen/introduction_screen.dart';
import 'package:sustain/features/questionnaire/features/flights/widgets/custom_flight_tile.dart';

PageViewModel flightsView(PageDecoration pageDecoration) {
  return PageViewModel(
    titleWidget: Column(
      children: [
        Image.asset('lib/common/assets/flights.png'),
        Text(
          'Your Flights',
          style: pageDecoration.titleTextStyle,
        )
      ],
    ),
    bodyWidget: Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          'How many one-way flights do you take each year? Remember to double for return flights.',
          style: pageDecoration.bodyTextStyle,
        ),
        const SizedBox(height: 50),
        Column(
          children: const [
            CustomFlightTile(
              title: 'Short',
              subtitle: 'Up to 3 hours long',
              count: 0,
            ),
            CustomFlightTile(
              title: 'Medium',
              subtitle: '3-6 hours long',
              count: 0,
            ),
            CustomFlightTile(
              title: 'Long',
              subtitle: '6+ hours',
              count: 0,
            ),
          ],
        ),
      ],
    ),
    decoration: pageDecoration,
  );
}
