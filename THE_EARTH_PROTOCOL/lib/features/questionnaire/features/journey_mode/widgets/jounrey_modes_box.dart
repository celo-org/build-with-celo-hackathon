import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sustain/common/app/providers/user_provider.dart';
import 'package:sustain/features/questionnaire/features/journey_mode/widgets/transport_icon.dart';

class JourneyModesBox extends ConsumerStatefulWidget {
  const JourneyModesBox({
    required this.title,
    super.key,
  });

  final String title;

  @override
  JourneyModesBoxState createState() => JourneyModesBoxState();
}

class JourneyModesBoxState extends ConsumerState<JourneyModesBox> {
  bool isTicked = false;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(15.0),
      child: Stack(
        children: [
          GestureDetector(
            behavior: HitTestBehavior.opaque,
            onTap: () {
              setState(() {
                isTicked = !isTicked;
              });
              isTicked
                  ? ref.read(userProvider.notifier).addJourneyMode(widget.title)
                  : ref
                      .read(userProvider.notifier)
                      .removeJourneyMode(widget.title);
            },
            child: SizedBox(
              child: Column(
                children: [
                  Container(
                    decoration: BoxDecoration(
                        border: Border.all(
                          color: Theme.of(context).primaryColor,
                        ),
                        color: Theme.of(context).primaryColor,
                        borderRadius:
                            const BorderRadius.all(Radius.circular(20))),
                    height: 80,
                    width: 80,
                    child: Center(
                      // TransportIcon returns the respective widget according to the title
                      child: TransportIconSelector(title: widget.title),
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    widget.title,
                    style: Theme.of(context).textTheme.bodyText1,
                  ),
                ],
              ),
            ),
          ),
          isTicked
              ? const Positioned(
                  top: 5,
                  right: 8,
                  child: Icon(
                    Icons.done,
                    color: Colors.white,
                  ),
                )
              : Positioned(
                  top: 5,
                  right: 8,
                  child: Container(),
                ),
        ],
      ),
    );
  }
}
