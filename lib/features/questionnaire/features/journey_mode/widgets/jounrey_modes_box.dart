import 'package:flutter/material.dart';
import 'package:sustain/features/questionnaire/features/journey_mode/widgets/transport_icon.dart';

class JourneyModesBox extends StatelessWidget {
  const JourneyModesBox({
    required this.title,
    super.key,
  });

  final String title;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(15.0),
      child: SizedBox(
        child: Column(
          children: [
            Container(
              decoration: BoxDecoration(
                  border: Border.all(
                    color: Theme.of(context).primaryColor,
                  ),
                  color: Theme.of(context).primaryColor,
                  borderRadius: const BorderRadius.all(Radius.circular(20))),
              height: 80,
              width: 80,
              child: Center(
                // TransportIcon returns the respective widget according to the title
                child: TransportIconSelector(title: title),
              ),
            ),
            const SizedBox(height: 5),
            Text(
              title,
              style: Theme.of(context).textTheme.bodyText1,
            ),
          ],
        ),
      ),
    );
  }
}
