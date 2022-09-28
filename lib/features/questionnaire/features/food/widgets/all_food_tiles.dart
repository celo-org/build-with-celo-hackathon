import 'package:flutter/material.dart';
import 'package:sustain/features/questionnaire/features/food/widgets/custom_food_tiles.dart';

class AllFoodTiles extends StatefulWidget {
  const AllFoodTiles({super.key});

  @override
  State<AllFoodTiles> createState() => _AllFoodTilesState();
}

class _AllFoodTilesState extends State<AllFoodTiles> {
  int selectedFoodTileIndex = 0; // 0 -> nothing is selected yet

  callback(currentIndividualFoodTileIndex) {
    setState(() {
      selectedFoodTileIndex = currentIndividualFoodTileIndex;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        CustomFoodTile(
          title: 'Meat',
          subtitle: 'A serving of meat, every other day on average',
          callbackFunction: callback,
          selectedFoodTileIndex: selectedFoodTileIndex,
          individualFoodTileIndex: 1,
        ),
        CustomFoodTile(
          title: 'Pescatarian',
          subtitle: 'A serving of fish or seafood, every other day on average',
          callbackFunction: callback,
          selectedFoodTileIndex: selectedFoodTileIndex,
          individualFoodTileIndex: 2,
        ),
        CustomFoodTile(
          title: 'Vegetarian',
          subtitle: 'No meat, but eggs & dairy products eaten',
          callbackFunction: callback,
          selectedFoodTileIndex: selectedFoodTileIndex,
          individualFoodTileIndex: 3,
        ),
        CustomFoodTile(
          title: 'Vegan',
          subtitle: 'No meat, dairy, eggs or other animal products eaten',
          callbackFunction: callback,
          selectedFoodTileIndex: selectedFoodTileIndex,
          individualFoodTileIndex: 4,
        ),
      ],
    );
  }
}
