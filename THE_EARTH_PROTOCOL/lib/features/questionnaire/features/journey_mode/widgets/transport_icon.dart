import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class TransportIconSelector extends StatelessWidget {
  const TransportIconSelector({
    required this.title,
    super.key,
  });

  final String title;

  @override
  Widget build(BuildContext context) {
    FaIcon transportIcon;

    switch (title) {
      case "Car":
        {
          transportIcon = const FaIcon(
            FontAwesomeIcons.car,
            color: Colors.white,
          );
        }
        break;

      case "Bus":
        {
          transportIcon = const FaIcon(
            FontAwesomeIcons.bus,
            color: Colors.white,
          );
        }
        break;
      case "Train":
        {
          transportIcon = const FaIcon(
            FontAwesomeIcons.train,
            color: Colors.white,
          );
        }
        break;
      case "Carpool":
        {
          transportIcon = const FaIcon(
            FontAwesomeIcons.taxi,
            color: Colors.white,
          );
        }
        break;
      case "Motorbike":
        {
          transportIcon = const FaIcon(
            FontAwesomeIcons.motorcycle,
            color: Colors.white,
          );
        }
        break;
      case "Walk":
        {
          transportIcon = const FaIcon(
            FontAwesomeIcons.personWalking,
            color: Colors.white,
          );
        }
        break;
      default:
        {
          // Its never going to reach the default statement. So I just put a dummy icon.
          transportIcon = transportIcon = const FaIcon(
            FontAwesomeIcons.car,
            color: Colors.white,
          );
        }
        break;
    }

    return transportIcon;
  }
}
