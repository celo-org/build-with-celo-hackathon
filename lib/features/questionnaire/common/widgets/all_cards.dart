import 'package:flutter/material.dart';
import 'package:sustain/features/questionnaire/common/widgets/individual_card.dart';

class AllCards extends StatefulWidget {
  const AllCards({required this.cardType, super.key});

  final String cardType; // room card or residents card

  @override
  State<AllCards> createState() => _AllCardsState();
}

class _AllCardsState extends State<AllCards> {
  int selectedCardIndex =
      0; // 0 indicates that none of the cards have been selected.

  callback(currentIndividualCardIndex) {
    setState(() {
      selectedCardIndex = currentIndividualCardIndex;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Wrap(
      children: [
        IndividualCard(
          title: widget.cardType == 'RoomCard' ? '1 room' : '1 person',
          context: context,
          selectedCardIndex: selectedCardIndex,
          callbackFunction: callback,
          individualCardIndex: 1,
        ),
        IndividualCard(
          title: widget.cardType == 'RoomCard' ? '2 rooms' : '2 people',
          context: context,
          selectedCardIndex: selectedCardIndex,
          callbackFunction: callback,
          individualCardIndex: 2,
        ),
        IndividualCard(
          title: widget.cardType == 'RoomCard' ? '3 rooms' : '3 people',
          context: context,
          selectedCardIndex: selectedCardIndex,
          callbackFunction: callback,
          individualCardIndex: 3,
        ),
        IndividualCard(
          title: widget.cardType == 'RoomCard' ? '4 rooms' : '4 people',
          context: context,
          selectedCardIndex: selectedCardIndex,
          callbackFunction: callback,
          individualCardIndex: 4,
        ),
        IndividualCard(
          title: widget.cardType == 'RoomCard' ? '5 rooms' : '5 people',
          context: context,
          selectedCardIndex: selectedCardIndex,
          callbackFunction: callback,
          individualCardIndex: 5,
        ),
        IndividualCard(
          title: widget.cardType == 'RoomCard' ? '6 rooms' : '6 people',
          context: context,
          selectedCardIndex: selectedCardIndex,
          callbackFunction: callback,
          individualCardIndex: 6,
        ),
      ],
    );
  }
}
