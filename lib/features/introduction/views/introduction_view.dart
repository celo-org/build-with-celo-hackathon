import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:sustain/common/utils/media_query.dart';
import 'package:sustain/features/questionnaire/features/all_questions/views/all_questions_view.dart';

class IntroductionView extends StatelessWidget {
  const IntroductionView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          SizedBox(
            height: SizeData.screenHeight,
            child: Stack(
              children: [
                Image.asset(
                  'lib/common/assets/background_leaf.jpg',
                ),
                Align(
                  alignment: Alignment.center,
                  child: Column(
                    children: [
                      const SizedBox(height: 100),
                      Image.asset(
                        'lib/common/assets/mother-earth-day.png',
                        height: 100,
                      )
                    ],
                  ),
                ),
                Positioned.fill(
                  child: Align(
                    alignment: Alignment.bottomCenter,
                    child: Container(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        border: Border.all(
                          color: Colors.white,
                        ),
                        borderRadius: const BorderRadius.only(
                          topLeft: Radius.circular(20),
                          topRight: Radius.circular(20),
                        ),
                      ),
                      width: SizeData.screenWidth,
                      height: SizeData.screenHeight * 0.6,
                      child: Padding(
                        padding: const EdgeInsets.all(25.0),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Welcome to Sustain',
                              style: Theme.of(context).textTheme.headline4,
                            ),
                            // const SizedBox(height: 50),
                            Text(
                              'We\'ve designed this app to help you track, reduce & remove CO2 emissions from your daily life and take part in sustainability challenges with your colleagues.',
                              style: Theme.of(context).textTheme.bodyText1,
                            ),
                            // const SizedBox(height: 50),
                            Text(
                              'To get you up and running , we\'ll start with six simple questions to calculate your carbon footprint from travel and food choices!',
                              style: Theme.of(context).textTheme.bodyText1,
                            ),
                            // const SizedBox(height: 50),
                            ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                foregroundColor: Colors.white,
                                backgroundColor: Theme.of(context).primaryColor,
                                minimumSize: const Size.fromHeight(60),
                                shape: RoundedRectangleBorder(
                                  borderRadius:
                                      BorderRadius.circular(10), // <-- Radius
                                ),
                              ),
                              onPressed: () {
                                // Navigator.of(context).pop();
                                Navigator.pushReplacement(
                                    context,
                                    MaterialPageRoute(
                                        builder: (BuildContext context) =>
                                            const AllQuestions()));
                              },
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    'Let\'s go',
                                    style: Theme.of(context)
                                        .textTheme
                                        .headline6!
                                        .copyWith(
                                            color: Colors.white, fontSize: 21),
                                  ),
                                  const SizedBox(width: 15),
                                  const FaIcon(
                                    FontAwesomeIcons.arrowRight,
                                    size: 20,
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          )
          // some text block on a white background
        ],
      ),
    );
  }
}
