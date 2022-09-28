import 'package:flutter/material.dart';
import 'package:introduction_screen/introduction_screen.dart';
import 'package:sustain/features/carbon_estimate/views/carbon_estimate_view.dart';
import 'package:sustain/features/questionnaire/features/flights/views/flights_view.dart';
import 'package:sustain/features/questionnaire/features/food/views/food_view.dart';
import 'package:sustain/features/questionnaire/features/house_rooms/views/house_rooms_view.dart';
import 'package:sustain/features/questionnaire/features/journey_mode/views/journey_modes_view.dart';
import 'package:sustain/features/questionnaire/features/journey_time/views/journey_time_view.dart';
import 'package:sustain/features/questionnaire/features/residents/views/people_count_view.dart';

class AllQuestions extends StatefulWidget {
  const AllQuestions({super.key});

  @override
  State<AllQuestions> createState() => _AllQuestionsState();
}

class _AllQuestionsState extends State<AllQuestions> {
  final introKey = GlobalKey<IntroductionScreenState>();

  // when you press get started this runs.
  void _onIntroEnd(context) {
    Navigator.pushReplacement(
        context,
        MaterialPageRoute(
            builder: (BuildContext context) => const CarbonEstimateView()));
  }

  @override
  Widget build(BuildContext context) {
    // all 3 pages in the  intro screen use this page decoration for their style
    final pageDecoration = PageDecoration(
      titleTextStyle:
          const TextStyle(fontSize: 28.0, fontWeight: FontWeight.w700),
      bodyTextStyle:
          Theme.of(context).textTheme.bodyText1!.copyWith(fontSize: 19),
      bodyPadding: const EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 16.0),
      pageColor: Colors.white,
      imagePadding: EdgeInsets.zero,
    );

    // Next, Done and Back button are created with this
    Widget button({required String title}) {
      return SizedBox(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              if (title == 'Back') ...[
                Icon(
                  Icons.arrow_back,
                  color: Theme.of(context).primaryColor,
                  size: 20,
                ),
                const SizedBox(width: 15),
              ],
              Text(
                title,
                style: Theme.of(context).textTheme.headline6!,
              ),
              if (title != 'Back') ...[
                const SizedBox(width: 15),
                Icon(
                  Icons.arrow_forward,
                  color: Theme.of(context).primaryColor,
                  size: 20,
                ),
              ]
            ],
          ),
        ),
      );
    }

    return Scaffold(
      body: IntroductionScreen(
        key: introKey,
        globalBackgroundColor: Colors.white,
        pages: [
          journeyModesView(pageDecoration),
          journeyTimeView(pageDecoration, context),
          houseRoomsView(pageDecoration),
          residentsView(pageDecoration),
          flightsView(pageDecoration),
          foodView(pageDecoration),
        ],
        showBackButton: false,
        skipOrBackFlex: 0,
        nextFlex: 0,
        back: button(title: 'Back'),
        onDone: () => _onIntroEnd(context),
        next: button(title: 'Next'),
        done: button(title: 'Next'),
        curve: Curves.fastLinearToSlowEaseIn,
        // controlsMargin: const EdgeInsets.all(16),
        // controlsPadding: const EdgeInsets.fromLTRB(8.0, 4.0, 8.0, 4.0),
        dotsDecorator: DotsDecorator(
          size: const Size(10.0, 10.0),
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(25.0)),
          ),

          // lighter version of the primary color for non active dots
          color: const Color(0xFFc2efd8),
          activeColor: Theme.of(context).primaryColor,
          activeSize: const Size(20.0, 10.0),
          activeShape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(25.0)),
          ),
        ),
      ),
    );
  }
}
