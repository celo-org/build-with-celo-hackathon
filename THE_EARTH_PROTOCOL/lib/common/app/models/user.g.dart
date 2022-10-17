// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

// ignore: non_constant_identifier_names
_$_UserModel _$$_UserModelFromJson(Map<String, dynamic> json) => _$_UserModel(
      userId: json['userId'] as String? ?? 'MakeThisIdUnique',
      timestamp: json['timestamp'] as String? ?? 'today',
      journeyModes: (json['journeyModes'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          const [],
      jounrneyTimeHours: json['jounrneyTimeHours'] as int? ?? 0,
      jounrneyTimeMinutes: json['jounrneyTimeMinutes'] as int? ?? 0,
      houseSize: json['houseSize'] as int? ?? 0,
      residents: json['residents'] as int? ?? 0,
      shortFlights: json['shortFlights'] as int? ?? 0,
      mediumFlights: json['mediumFlights'] as int? ?? 0,
      longFlights: json['longFlights'] as int? ?? 0,
      foodType: json['foodType'] as String? ?? '',
      carbonFootprint: json['carbonFootprint'] as int? ?? 0,
    );

// ignore: non_constant_identifier_names
Map<String, dynamic> _$$_UserModelToJson(_$_UserModel instance) =>
    <String, dynamic>{
      'userId': instance.userId,
      'timestamp': instance.timestamp,
      'journeyModes': instance.journeyModes,
      'jounrneyTimeHours': instance.jounrneyTimeHours,
      'jounrneyTimeMinutes': instance.jounrneyTimeMinutes,
      'houseSize': instance.houseSize,
      'residents': instance.residents,
      'shortFlights': instance.shortFlights,
      'mediumFlights': instance.mediumFlights,
      'longFlights': instance.longFlights,
      'foodType': instance.foodType,
      'carbonFootprint': instance.carbonFootprint,
    };
