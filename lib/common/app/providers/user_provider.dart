import 'dart:collection';
import 'dart:developer';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sustain/common/app/models/user.dart';
import 'package:sustain/common/utils/media_query.dart';

final userProvider = StateNotifierProvider<UserProvider, UserModel>((ref) {
  return UserProvider(ref);
});

class UserProvider extends StateNotifier<UserModel> {
  // the userModel given to super has no values. so it uses defaults.
  UserProvider(this.ref) : super(const UserModel());

  final Ref ref; // not using right now

  // journey Mode

  void addJourneyMode(String newJourneyMode) {
    state =
        state.copyWith(journeyModes: [...state.journeyModes, newJourneyMode]);
  }

  void removeJourneyMode(String journeyModeToBeRemoved) {
    state = state.copyWith(
        journeyModes: state.journeyModes
            .where((journeyMode) => journeyMode != journeyModeToBeRemoved)
            .toList());
  }

  // Jounrey Time

  void editJourneyTime({int? hours, int? minutes}) {
    state = state.copyWith(
        jounrneyTimeHours: hours ?? state.jounrneyTimeHours,
        jounrneyTimeMinutes: minutes ?? state.jounrneyTimeMinutes);
  }

  // House Size

  void editHouseSize(int houseSize) {
    state = state.copyWith(houseSize: houseSize);
  }

  // Residents

  void editResidents(int residents) {
    state = state.copyWith(residents: residents);
  }

  // Flights

  void editFlights({int? shortFlights, int? mediumFlights, int? longFlights}) {
    state = state.copyWith(
        shortFlights: shortFlights ?? state.shortFlights,
        mediumFlights: mediumFlights ?? state.mediumFlights,
        longFlights: longFlights ?? state.longFlights);
  }

  // Food tracking

  void editFoodType(String foodType) {
    state = state.copyWith(foodType: foodType);
  }

  int calculateCarbonFootprint() {
    int journeyRelatedCarbonFootprint = calculateJourneyCarbonFootprint();
    int houseRelatedCarbonFootprint = calculateHouseCarbonFootprint();
    int flightsCarbonFootprint = calculateFlightsCarbonFootprint();
    int foodTrackingCarbonFoorprint = calculateFoodTrackingCarbonFootprint();

    // formula for the time being
    int result = journeyRelatedCarbonFootprint +
        houseRelatedCarbonFootprint +
        flightsCarbonFootprint +
        foodTrackingCarbonFoorprint;

    log('final result:   $result');
    return result;
  }

  int calculateJourneyCarbonFootprint() {
    int calculateJourneyModeCarbonFootprint() {
      // assign carbon points to each mode of transport
      final Map<String, int> map = HashMap();
      final modesOfTranport = {
        'Car': 100,
        'Bus': 30,
        'Train': 20,
        'Carpool': 40,
        'Motorbike': 80,
        'Walk': 0
      };
      map.addEntries(modesOfTranport.entries);
      int result = 0;
      for (String item in state.journeyModes) {
        result += map[item]!;
      }
      log('journeyMode(not directly used):  $result');
      return result;
    }

    int journeyModeCarbonFootprint = calculateJourneyModeCarbonFootprint();
    int journeyTimeInMintues =
        state.jounrneyTimeHours * 60 + state.jounrneyTimeMinutes;
    double result = journeyModeCarbonFootprint * journeyTimeInMintues * 0.01;
    log('journeyTime:    $result');
    return result.round();
  }

  int calculateHouseCarbonFootprint() {
    double result = 0;
    if (state.residents != 0) {
      result = (state.houseSize / state.residents) * 100;
    }
    log('houseCarbon:   $result');
    return result.round();
  }

  int calculateFlightsCarbonFootprint() {
    double result = state.shortFlights * 50 +
        state.mediumFlights * 100 +
        state.longFlights * 200;
    log('flightsCarbon:    $result');
    return result.round();
  }

  int calculateFoodTrackingCarbonFootprint() {
    // assign carbon points for each foot type
    int result = 0;
    final Map<String, int> map = HashMap();
    final typesOfFood = {
      'Meat': 100,
      'Pescatarian': 60,
      'Vegetarian': 40,
      'Vegan': 30,
    };
    map.addEntries(typesOfFood.entries);
    if (state.foodType != '') {
      result = map[state.foodType]!;
    }
    log('foodTypeCarbon:    $result');
    return result;
  }

  List<double> calculateSizeOfContainers(
      int yourCarbonFootprint, int globalCarbonFootprint) {
    // using denominator to get the correct ratio of size between the 2 paramaters.
    int denominator = yourCarbonFootprint + globalCarbonFootprint;
    double sizeOfYours = yourCarbonFootprint / denominator;
    log('sizeYours:  $sizeOfYours');
    double sizeOfGlobal = globalCarbonFootprint / denominator;
    log('sizeOfGlobal:  $sizeOfGlobal');

    // the next 2 lines are used to just round the decimal to 2 places
    // eg: 2.45678932 => 2.45
    String sizeOfYoursStringRounded = sizeOfYours.toStringAsFixed(2);
    double sizeOfYoursRounded = double.parse(sizeOfYoursStringRounded);
    log('sizeYoursRounded:  $sizeOfYoursRounded');

    // the next 2 lines are used to just round the decimal to 2 places
    // eg: 2.45678932 => 2.45
    String sizeOfGlobalStringRounded = sizeOfGlobal.toStringAsFixed(2);
    double sizeOfGlobalRounded = double.parse(sizeOfGlobalStringRounded);
    log('sizeGlobalRounded:  $sizeOfGlobalRounded');

    // now we have the ratio's. eg: 0.4 : 0.6 (yours : global)

    // why we need min size is explained later
    const double minSize =
        0.4; // this corresponds in the UI to 0.4 % of screen width

    // so lets add are rounded size as final size, but wait they are not ready
    // to be returned as the final answer. onre more check is left
    double finalSizeOfYours = sizeOfYoursRounded;
    double finalSizeOfGlobal = sizeOfGlobalRounded;

    // this is the check. we need to make sure that one of them does not have
    // a ratio that is too small. example: 0.2 : 0.8
    // the circle with the 0.2 ratio will be way too small, the text might
    // even protrude out of the circle. so if its smaller than the  min size
    // variiable, then we use the minsize variable instead.
    if (sizeOfYoursRounded < minSize) {
      finalSizeOfYours = minSize;
      // but wait there's a catch. If sizeOfYoursRounded : sizeOfGlobalRounded
      // is 0.2 : 0.8, but our minSize is 0.4 then 0.2 will be replaced by 0.4
      // right? then wont the new ratio be 0.4: 0.8. but that does not add up to 1
      // thats why we scrap the 0.8 and replace with 1 - 0.4, which is 0.6.
      finalSizeOfGlobal = 1 - minSize;
    }

    if (finalSizeOfGlobal < minSize) {
      finalSizeOfGlobal = minSize;
      finalSizeOfYours = 1 - minSize;
    }

    // get screen width, but not all of it. leaving some padding
    // therefore our circle's wont just go all the way upto the horizontal
    // limits of the  screen. we subtract a  total of 110. looks nice like that.
    double screenToWorkWith = SizeData.screenWidth - 45 - 30 - 20 - 15;
    log('screenToWorkWith:   $screenToWorkWith');

    // now that final ratio's are calculated. lets work with them

    double yourCircleSize = screenToWorkWith * finalSizeOfYours;
    double globalCircleSize = screenToWorkWith * finalSizeOfGlobal;

    log('yourCircleSize:  $yourCircleSize');
    log('globalCircleSize:  $globalCircleSize');

    return [yourCircleSize, globalCircleSize];
  }
}
