import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:introduction_screen/introduction_screen.dart';
import 'package:sustain/common/app/providers/user_provider.dart';

PageViewModel journeyTimeView(
    PageDecoration pageDecoration, BuildContext context) {
  return PageViewModel(
    // title: "Journey Mode",
    titleWidget: Column(
      children: [
        Image.asset('lib/common/assets/journey_time.png'),
        Text(
          'Journey Time',
          style: pageDecoration.titleTextStyle,
        )
      ],
    ),
    bodyWidget:
        Column(crossAxisAlignment: CrossAxisAlignment.center, children: [
      Text(
        'On average how much time per day do you spend travelling?',
        style: pageDecoration.bodyTextStyle,
      ),
      const SizedBox(height: 50),
      const JourneyTimeSelectionSlider(
        title: 'Hours:   ',
      ),
      // const SizedBox(height: 50),
      const JourneyTimeSelectionSlider(
        title: 'Minutes:',
      ),
    ]),
    decoration: pageDecoration,
  );
}

class JourneyTimeSelectionSlider extends ConsumerStatefulWidget {
  const JourneyTimeSelectionSlider({required this.title, super.key});

  final String title;

  @override
  JourneyTimeSelectionSliderState createState() =>
      JourneyTimeSelectionSliderState();
}

class JourneyTimeSelectionSliderState
    extends ConsumerState<JourneyTimeSelectionSlider> {
  int _value = 0;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(15.0),
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                Text(
                  widget.title,
                  style: Theme.of(context).textTheme.bodyText1,
                ),
                const SizedBox(width: 20),
                Text(
                  _value.toString(),
                  style: Theme.of(context).textTheme.bodyText1,
                ),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              mainAxisSize: MainAxisSize.max,
              children: [
                const Icon(
                  Icons.timelapse,
                  size: 40,
                ),
                Expanded(
                  child: Slider(
                      value: _value.toDouble(),
                      min: 0.0,
                      max: widget.title == 'Minutes:' ? 60.0 : 23.0,
                      divisions: 10,
                      activeColor: Colors.green,
                      inactiveColor: Colors.green[200],
                      label: _value.toString(),
                      onChanged: (double newValue) {
                        setState(() {
                          _value = newValue.round();
                        });
                        // update here
                        String trimmedTitle = widget.title.trim();
                        trimmedTitle == 'Hours:'
                            ? ref.read(userProvider.notifier).editJourneyTime(
                                  hours: _value,
                                )
                            : ref.read(userProvider.notifier).editJourneyTime(
                                  minutes: _value,
                                );
                      },
                      semanticFormatterCallback: (double newValue) {
                        return '${newValue.round()} dollars';
                      }),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
