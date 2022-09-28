import 'package:flutter/material.dart';

class IndividualCard extends StatelessWidget {
  const IndividualCard({
    required this.title,
    required this.context,
    required this.selectedCardIndex,
    required this.callbackFunction,
    required this.individualCardIndex,
    super.key,
  });

  final String title;
  final BuildContext context;
  final int selectedCardIndex; // the card that has been tapped
  final int individualCardIndex; // pretty much the id of each card
  final Function callbackFunction;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        callbackFunction(individualCardIndex);
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
