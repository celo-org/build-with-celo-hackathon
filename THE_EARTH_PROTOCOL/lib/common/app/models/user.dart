import 'package:freezed_annotation/freezed_annotation.dart';

part 'user.freezed.dart';
part 'user.g.dart';

// flutter pub run build_runner build --delete-conflicting-outputs

// Uuid _uuid = Uuid();

@freezed
abstract class UserModel with _$UserModel {
  // ignore: invalid_annotation_target
  @JsonSerializable(explicitToJson: true)
  const factory UserModel({
    @Default('MakeThisIdUnique') final String userId, // unique
    @Default('today') final String timestamp, // change later.
    @Default([]) final List<String> journeyModes, // aka car, walk, carpool
    @Default(0) final int jounrneyTimeHours, // number of hours
    @Default(0) final int jounrneyTimeMinutes, // number of minutes
    @Default(0) final int houseSize, // aka number of rooms
    @Default(0) final int residents, // number of residents
    @Default(0) final int shortFlights, // number of short flights
    @Default(0) final int mediumFlights, // number of medium flights
    @Default(0) final int longFlights, // number of long flghts
    @Default('') final String foodType, // vegan, veg, non-veg etc. (any one)
    @Default(0) final int carbonFootprint, // calculated after questions.
  }) = _UserModel;

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);
}
