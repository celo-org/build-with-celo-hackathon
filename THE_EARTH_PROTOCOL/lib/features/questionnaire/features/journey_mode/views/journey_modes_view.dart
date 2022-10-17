import 'package:flutter/material.dart';
import 'package:introduction_screen/introduction_screen.dart';
import 'package:sustain/features/questionnaire/features/journey_mode/widgets/jounrey_modes_box.dart';

PageViewModel journeyModesView(PageDecoration pageDecoration) {
  return PageViewModel(
    // title: "Journey Mode",
    titleWidget: Column(
      children: [
        Image.asset('lib/common/assets/journey_mode.png'),
        Text(
          'Journey Mode',
          style: pageDecoration.titleTextStyle,
        )
      ],
    ),
    // body:
    //     "Select the transport mode you use most frequently. Choose at least one",
    bodyWidget: Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          'Select the transport mode you use most frequently. Choose at least one.',
          style: pageDecoration.bodyTextStyle,
        ),
        const SizedBox(height: 50),
        SizedBox(
          // height: 200,
          child: Column(
            children: [
              Wrap(
                children: const [
                  JourneyModesBox(title: 'Car'),
                  JourneyModesBox(title: 'Bus'),
                  JourneyModesBox(title: 'Train'),
                  JourneyModesBox(title: 'Carpool'),
                  JourneyModesBox(title: 'Motorbike'),
                  JourneyModesBox(title: 'Walk'),
                ],
              ),
            ],
          ),
        ),
      ],
    ),
    decoration: pageDecoration,
  );
}
