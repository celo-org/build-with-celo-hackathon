import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:sustain/common/app/views/bottom_navigation_bar.dart';
import 'package:sustain/common/utils/media_query.dart';
import 'package:sustain/features/carbon_estimate/widgets/carbon_circle.dart';

class CarbonEstimateView extends StatelessWidget {
  const CarbonEstimateView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).primaryColor,
      body: Column(
        children: [
          SizedBox(
            height: SizeData.screenHeight * 0.28,
            width: 200,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Your average monthly carbon footprint is',
                  style: Theme.of(context)
                      .textTheme
                      .headline6!
                      .copyWith(color: Colors.white),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 20),
                RichText(
                  text: TextSpan(
                    style: Theme.of(context)
                        .textTheme
                        .headline2!
                        .copyWith(color: Colors.white),
                    children: [
                      const TextSpan(
                        text: '156 kg CO',
                      ),
                      WidgetSpan(
                        child: Transform.translate(
                          offset: const Offset(0.0, 0.0),
                          child: Text(
                            '2',
                            style: Theme.of(context)
                                .textTheme
                                .subtitle1!
                                .copyWith(color: Colors.white),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border.all(color: Colors.white),
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(40),
                  topRight: Radius.circular(40),
                ),
              ),
              // color: Colors.white,
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Text(
                      textAlign: TextAlign.center,
                      'Here is how your emissions compare with the global average',
                      style: Theme.of(context).textTheme.bodyText1,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      // textBaseline: TextBaseline.alphabetic,
                      children: [
                        CarbonCircle(
                          caption: 'YOU',
                          carbonFootprint: '156',
                          containerSize: SizeData.screenWidth * 0.3,
                          color: Theme.of(context).primaryColor,
                        ),
                        CarbonCircle(
                          caption: 'GLOBAL AVERAGE',
                          carbonFootprint: '432',
                          containerSize: SizeData.screenWidth * 0.45,
                          color: Theme.of(context).highlightColor,
                        ),
                      ],
                    ),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        foregroundColor: Colors.white,
                        backgroundColor: Theme.of(context).primaryColor,
                        minimumSize: const Size.fromHeight(60),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10), // <-- Radius
                        ),
                      ),
                      onPressed: () {
                        Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                                builder: (BuildContext context) =>
                                    const BottomNav()));
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Start Reducing',
                            style: Theme.of(context)
                                .textTheme
                                .headline6!
                                .copyWith(color: Colors.white, fontSize: 21),
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
        ],
      ),
    );
  }
}
