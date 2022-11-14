import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sustain/common/app/providers/user_provider.dart';

class IndividualCard extends ConsumerWidget {
  const IndividualCard({
    required this.title,
    required this.context,
    required this.selectedCardIndex,
    required this.callbackFunction,
    required this.individualCardIndex,
    required this.type,
    super.key,
  });

  final String title;
  final BuildContext context;
  final int selectedCardIndex; // the card that has been tapped
  final int individualCardIndex; // pretty much the id of each card
  final Function callbackFunction;
  final String type;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return GestureDetector(
      onTap: () {
        callbackFunction(individualCardIndex);
        type == 'RoomCard'
            ? ref.read(userProvider.notifier).editHouseSize(individualCardIndex)
            : ref
                .read(userProvider.notifier)
                .editResidents(individualCardIndex);
      },
      child: Card(
        color: individualCardIndex == selectedCardIndex
            ? Colors.yellow // selected card color
            : Theme.of(context).cardColor, // unselected card color
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text(
            title,
            style: Theme.of(context).textTheme.bodyText1,
          ),
        ),
      ),
    );
  }
}
