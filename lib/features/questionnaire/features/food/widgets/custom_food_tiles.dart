import 'package:flutter/material.dart';
import 'package:sustain/features/questionnaire/features/food/widgets/food_icon_selector.dart';

class CustomFoodTile extends StatelessWidget {
  const CustomFoodTile({
    required this.title,
    required this.subtitle,
    required this.callbackFunction,
    required this.individualFoodTileIndex,
    required this.selectedFoodTileIndex,
    super.key,
  });

  final String title;
  final String subtitle;
  final Function callbackFunction;
  final int selectedFoodTileIndex;
  final int individualFoodTileIndex;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        callbackFunction(individualFoodTileIndex);
      },
      child: ListTile(
        leading: Container(
          decoration: BoxDecoration(
              border: Border.all(
                color: Theme.of(context).primaryColor,
              ),
              color: Theme.of(context).primaryColor,
              borderRadius: const BorderRadius.all(Radius.circular(10))),
          height: 50,
          width: 50,
          child: Center(
            child: FoodIconSelector(title: title),
          ),
        ),
        title: Text(
          title,
          style: Theme.of(context).textTheme.bodyText2,
        ),
        subtitle: Text(
          subtitle,
          style: Theme.of(context).textTheme.subtitle1,
        ),
        trailing: Container(
          decoration: BoxDecoration(
              border: Border.all(
                color: individualFoodTileIndex == selectedFoodTileIndex
                    ? Theme.of(context).primaryColor
                    : Colors.grey[300]!,
                width: 2,
              ),
              borderRadius: const BorderRadius.all(Radius.circular(10))),
          height: 30,
          width: 30,
          child: individualFoodTileIndex == selectedFoodTileIndex
              ? const Icon(Icons.check)
              : Container(),
        ),
      ),
    );
  }
}
